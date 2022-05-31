import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv' // eslint-disable-line
import fs from 'fs-extra' // eslint-disable-line
import trough2 from 'through2' // eslint-disable-line
import klaw from 'klaw' // eslint-disable-line

import gitdd, { handleGitdError } from 'gitdd' // eslint-disable-line

import docs from './wedia-doc.js'

dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url)) // eslint-disable-line

/**
 * Filter files depending on configuration
 * @param { String } - name of the source file
 *
 * @returns { Boolean } - true if src name matches the filter config, false otherwise
 */
const filter = (src) => {
  // Include all files if no DOC_TYPE
  if (!process.env.DOC_TYPE) {
    return true
  }

  // Always include non prefixed files or folders
  if (!src.includes('__')) {
    return true
  }

  // Returns true if file's or folder's name matches one of the DOC_TYPE
  const filters = process.env.DOC_TYPE.split(',')
  for (let i = 0; i < filters.length; i++) {
    if (src.includes(`__${filters[i]}_`)) {
      return true
    }
  }

  return false
}

/**
 * If DOC_TYPE is set, delete files that doesn't match the configuration
 * see : https://github.com/jprichardson/node-klaw
 */
async function deleteFiles() {
  // Delete nothing if no DOC_TYPE
  if (!process.env.DOC_TYPE) {
    return
  }

  const filters = process.env.DOC_TYPE.split(',')

  const deleteAction = trough2.obj((item, enc, next) => {
    // Do not delete non prefixed files
    if (!item.path.includes('__')) {
      next()
      return
    }

    let deleteFile = true

    for (let i = 0; i < filters.length; i++) {
      if (item.path.includes(`__${filters[i]}_`)) {
        deleteFile = false
      }
    }

    if (deleteFile) {
      fs.unlink(item.path, next)
    } else {
      next()
    }
  })

  klaw(path.resolve(__dirname, '../docs/docpress'))
    .pipe(deleteAction)
}

/**
 * Get local files instead of distant files
 * @todo: handle multiple projects documentation
 */
async function fetchLocalFiles(project) {
  try {
    await fs.copy(
      project.directory,
      path.resolve(__dirname, `../docs/docpress${!project.main ? `/${project.name}` : ''}`),
      { filter },
    )
  } catch (err) {
    console.error('Error copying local files : ', err)
  }
}

/**
 * Get the downloaded README.md and put it at the root
 * of the vuepress documentation folder to act as a homepage
 * @todo : handle prefixed homepage (i.e: __ps_README)
 */
async function generateHomePage() {
  await fs.remove(path.resolve(__dirname, '../docs/README.md'))

  try {
    await fs.move(
      path.resolve(__dirname, '../docs/docpress/README.md'),
      path.resolve(__dirname, '../docs/README.md'),
    )
  } catch (err) {
    console.error('Error moving README : ', err)
  }
}

/**
 * Retrieve files to build documentation
 * @returns {void}
 */
async function fetchFiles(project) {
  if (project.directory) {
    await fetchLocalFiles(project)
    if (project.main) {
      generateHomePage()
    }
    return
  }

  try {
    await gitdd(project.repository, {
      dir: 'docpress',
      out: path.resolve(__dirname, '../docs/docpress'),
      branch: project.branch,
    })
  } catch (err) {
    handleGitdError(err)
    return
  }

  if (project.main) {
    await generateHomePage()
  }

  deleteFiles()
}

await fs.remove(path.resolve(__dirname, '../docs/docpress'))

for (const doc of docs) {
  await fetchFiles(doc)
}
