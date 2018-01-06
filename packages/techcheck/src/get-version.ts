import { spawn } from 'child_process';
import { DependencyType } from './enums/dependency-type';
import {
  NATIVE_DEPENDENCIES,
  NODE_RUNTIME_DEPENDENCIES,
  NodeRuntimeDependencyName,
  DependencyName,
  NativeDependencyTypes,
  NativeDependencyName
} from './data/dependency-lists';

async function runCommand(command: string, args?: string[]): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let cmd = spawn(command, args);
    let messages = {
      out: new Buffer(''),
      error: new Buffer('')
    };
    cmd.stdout.on('data', data => {
      messages.out = Buffer.concat([
        messages.out,
        typeof data === 'string' ? new Buffer(data) : data
      ]);
    });
    cmd.stderr.on('data', data => {
      messages.error = Buffer.concat([
        messages.error,
        typeof data === 'string' ? new Buffer(data) : data
      ]);
    });
    cmd.on('close', () => {
      if (messages.error.length > 0) {
        reject(messages.error.toString());
      } else {
        resolve(messages.out.toString());
      }
    });
  });
}

interface ShellCommandInfo {
  command: string;
  args?: string[];
}

type ShellCommandMap = {
  [P in keyof NativeDependencyName]?: NativeDependencyName[P]
};

const SHELL_COMMANDS: {
  [K in keyof NativeDependencyTypes]?: ShellCommandInfo
} = {
  sqlite: {
    command: 'sqlite3',
    args: ['--version']
  },
  sass: {
    command: 'cat',
    args: ['/usr/local/lib/pkgconfig/libsass.pc']
  }
};

export async function runCommandByNativeDependencyName(
  name: NativeDependencyName
): Promise<string> {
  let info = SHELL_COMMANDS[name];
  if (!info) throw new Error(`Could not find command info for ${name}`);
  return runCommand(info.command, info.args);
}

export async function getDependencyType(
  name: DependencyName
): Promise<DependencyType> {
  if (NODE_RUNTIME_DEPENDENCIES.indexOf(name as NodeRuntimeDependencyName) >= 0)
    return DependencyType.NodeRuntime;
  if (NATIVE_DEPENDENCIES.indexOf(name as NativeDependencyName) >= 0)
    return DependencyType.NativeLib;
  throw new Error(`Could not identify dependency type of ${name}`);
}

export async function getVersion(
  name: NodeRuntimeDependencyName
): Promise<string>;
export async function getVersion(name: NativeDependencyName): Promise<string>;
export async function getVersion(name: DependencyName): Promise<string> {
  let typ = await getDependencyType(name);
  switch (typ) {
    case DependencyType.NativeLib:
      return await runCommandByNativeDependencyName(
        name as NativeDependencyName
      );
    case DependencyType.NodeRuntime:
      return process.versions[name as NodeRuntimeDependencyName];
    default:
      throw new Error(`Dependency ${name} is not yet supported`);
  }
}
