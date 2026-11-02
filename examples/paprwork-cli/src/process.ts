import { execFile, spawn } from 'node:child_process';

export interface ExecResult {
  code: number;
  stdout: string;
  stderr: string;
}

export interface ProcessRunner {
  exec(command: string, args: string[]): Promise<ExecResult>;
  spawn(command: string, args: string[], cwd: string): Promise<number>;
}

export function defaultRunner(): ProcessRunner {
  return {
    exec(command, args) {
      return new Promise((resolve) => {
        execFile(command, args, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
          const status = (error as { status?: number } | null)?.status;
          resolve({
            code: error ? (typeof status === 'number' ? status : 1) : 0,
            stdout: String(stdout ?? ''),
            stderr: String(stderr ?? ''),
          });
        });
      });
    },
    spawn(command, args, cwd) {
      return new Promise((resolve) => {
        const child = spawn(command, args, { cwd, stdio: 'inherit' });
        child.on('error', () => resolve(1));
        child.on('exit', (code) => resolve(code ?? 1));
      });
    },
  };
}
