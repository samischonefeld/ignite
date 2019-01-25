import { GluegunToolbox } from 'gluegun'

export type IgniteTools = {
  ignitePluginPath: Function
  setIgnitePluginPath: Function
  useYarn: boolean
  loadIgniteConfig: Function
  saveIgniteConfig: Function
  setIgniteConfig: Function
  removeIgniteConfig: Function
  findIgnitePlugins: Function
  addModule: Function
  addAndroidPermission: Function
  removeModule: Function
  copyBatch: Function
  addPluginComponentExample: Function
  removePluginComponentExample: Function
  addPluginScreenExamples: Function
  removePluginScreenExamples: Function
  removeAndroidPermission: Function
  setDebugConfig: Function
  removeDebugConfig: Function
  patchInFile: Function
  log: Function
  pluginOverrides: string[]
  patching: {
    prependToFile
    insertInFile
    replaceInFile
    isInFile
  }
}

export interface IgniteToolbox extends GluegunToolbox {
  ignite: IgniteTools
}

export interface IgnitePlugin {
  name: string
  directory: string
  commands: any[]
}

export type IgniteConfig = {
  generators?: string[]
}
