export interface ParsedArgv {
  command: string;
  flags: Record<string, string | boolean>;
}

const BOOLEAN_FLAGS = new Set(['help', 'h', 'version', 'v', 'force', 'print-only']);

export function parseArgv(argv: string[]): ParsedArgv {
  const tokens = argv.slice(2);
  const flags: Record<string, string | boolean> = {};
  const rest: string[] = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index]!;
    if (token === '--') {
      rest.push(...tokens.slice(index + 1));
      break;
    }
    if (token.startsWith('--')) {
      const eq = token.indexOf('=');
      if (eq !== -1) {
        flags[token.slice(2, eq)] = token.slice(eq + 1);
        continue;
      }
      const key = token.slice(2);
      const next = tokens[index + 1];
      if (!BOOLEAN_FLAGS.has(key) && next && !next.startsWith('-')) {
        flags[key] = next;
        index += 1;
      } else {
        flags[key] = true;
      }
      continue;
    }
    if (token.startsWith('-') && token.length === 2) {
      flags[token.slice(1)] = true;
      continue;
    }
    rest.push(token);
  }

  return { command: rest[0] ?? 'help', flags };
}

export function flagString(flags: Record<string, string | boolean>, name: string, fallback = ''): string {
  const value = flags[name];
  return typeof value === 'string' ? value : fallback;
}

export function flagBoolean(flags: Record<string, string | boolean>, name: string): boolean {
  return flags[name] === true || flags[name] === 'true';
}
