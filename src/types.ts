export type IgniteToolboxTool = {
  ignitePluginPath: Function
  setIgnitePluginPath: Function
  useYarn: Function
  loadIgniteConfig: Function
  saveIgniteConfig: Function
  setIgniteConfig: Function
  removeIgniteConfig: Function
  findIgnitePlugins: Function
  addModule: Function
  addAndroidPermission: Function
  removeModule: Function
  copyBatch: Function
  addComponentExample: Function
  addPluginComponentExample: Function
  removeComponentExample: Function
  removePluginComponentExample: Function
  addScreenExamples: Function
  addPluginScreenExamples: Function
  removeScreenExamples: Function
  removePluginScreenExamples: Function
  removeAndroidPermission: Function
  setDebugConfig: Function
  removeDebugConfig: Function
  patchInFile: Function
  generate: Function
  log: Function
  version: Function
  pluginOverrides: Function
}

export type IgniteRuntime = {
  run: (args: { pluginName: string; rawCommand: string; options: any }) => Promise<any>
}

export type IgniteToolbox = {
  ignite: IgniteToolboxTool
  runtime: IgniteRuntime
  filesystem: any
  print: any
  system: any
  prompt: any
  parameters: any
  strings: any
}

export type IgnitePlugin = {
  name: string
  directory: string
  commands: any[]
}

export type IgniteConfig = {
  generators?: string[]
}
