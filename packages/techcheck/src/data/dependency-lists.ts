import { DependencyType } from '../enums/dependency-type';

export type NodeRuntimeDependencyName = keyof NodeRuntimeDependencyTypes;
export const NODE_RUNTIME_DEPENDENCIES: NodeRuntimeDependencyName[] = [
  'node',
  'http_parser',
  'v8',
  'uv',
  'zlib',
  'ares',
  'modules',
  'openssl'
];

export interface NativeDependencyTypes {
  sass: DependencyType.NativeLib;
  sqlite: DependencyType.NativeLib;
}

export interface NodeRuntimeDependencyTypes {
  node: DependencyType.NodeRuntime;
  http_parser: DependencyType.NodeRuntime;
  v8: DependencyType.NodeRuntime;
  uv: DependencyType.NodeRuntime;
  zlib: DependencyType.NodeRuntime;
  ares: DependencyType.NodeRuntime;
  modules: DependencyType.NodeRuntime;
  openssl: DependencyType.NodeRuntime;
}

export type DependencyTypes = NativeDependencyTypes &
  NodeRuntimeDependencyTypes;

export type NativeDependencyName = keyof NativeDependencyTypes;
export const NATIVE_DEPENDENCIES: NativeDependencyName[] = ['sass', 'sqlite'];

export type DependencyName = keyof DependencyTypes;
