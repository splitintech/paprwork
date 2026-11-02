import { pathToFileURL } from 'node:url';

import { parseArgv } from './argv.ts';
import { dispatch, type RunOptions } from './commands.ts';

export async function run(argv: string[] = process.argv, options: RunOptions = {}) {
  return dispatch(parseArgv(argv), options);
}

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]!).href;

if (isMain) {
  void run().then((result) => {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    process.exit(result.exitCode);
  }).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : 'Unknown CLI failure.';
    process.stderr.write(`${message}\n`);
    process.exit(1);
  });
}
