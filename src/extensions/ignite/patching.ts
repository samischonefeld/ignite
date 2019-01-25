// TODO: migrate to jetpack
import * as fs from 'fs'
import { IgniteToolbox } from '../../types'

export default (toolbox: IgniteToolbox) => {
  /**
   * Inserts a given bit of content to a given file at a matched location
   */
  const insertInFile = (filePath: string, findPattern: string, content: string, insertAfter: boolean = true) => {
    // read full file - Not a great idea if we ever touch large files
    const data = fs.readFileSync(filePath, 'utf-8')
    let newContents = ''
    // get the full line of first occurance
    const finder = new RegExp(`.*${findPattern}.*`, '')
    const matches = data.match(finder)

    // Quick error check
    if (matches === null) throw new Error(`'${findPattern}' was not found in file ${filePath}.`)

    if (insertAfter) {
      newContents = data.replace(finder, `${matches[0]}\n${content}`)
    } else {
      newContents = data.replace(finder, `${content}\n${matches[0]}`)
    }

    // overwrite file with modified contents
    fs.writeFileSync(filePath, newContents, 'utf-8')
  }

  const prependToFile = (filePath, prependString) => {
    const data = fs.readFileSync(filePath, 'utf-8')
    fs.writeFileSync(filePath, prependString + data, 'utf-8')
  }

  /**
   * Replaces a given bit of matched content in a given file
   *
   * @param {string}  filePath     The path to the file we'll be modifying.
   * @param {string}  findPattern  The string that will be replaced.
   * @param {string}  content      The content to replace matched string in file.
   */
  const replaceInFile = (filePath, findPattern, content) => {
    // read full file - Not a great idea if we ever touch large files
    let data = fs.readFileSync(filePath, 'utf-8')
    // get the full line of first occurance
    let finder = new RegExp(`.*${findPattern}.*`, '')
    let matches = data.match(finder)
    // Quick error check
    if (matches && matches.length > 0) {
      // replace contents
      const newContents = data.replace(finder, `${content}`)

      // overwrite file with modified contents
      fs.writeFileSync(filePath, newContents, 'utf-8')
    } else {
      console.warn(`${findPattern} not found`)
    }
  }

  /**
   * Identifies if
   *
   * @param  {string}  filePath     The path to the file we'll be scanning.
   * @param  {string}  findPattern  The string that identifies existence.
   * @return {boolean}              Boolean of success that findPattern was in file.
   */
  const isInFile = (filePath: string, findPattern: string) => {
    let data = fs.readFileSync(filePath, 'utf-8')
    let finder = new RegExp(`.*${findPattern}.*`, '')
    return !!data.match(finder)
  }

  return {
    prependToFile,
    insertInFile,
    replaceInFile,
    isInFile,
  }
}
