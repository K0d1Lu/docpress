import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv' // eslint-disable-line
import fs from 'fs-extra' // eslint-disable-line

import gitdd, { handleGitdError } from 'gitdd' // eslint-disable-line

dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url)) // eslint-disable-line

async function fetchFiles() {
  fs.remove(path.resolve(__dirname, '../docs/docgen'))

  try {
    await gitdd(process.env.GIT_REPO, {
      dir: 'wedia-docgen',
      out: path.resolve(__dirname, '../docs/docgen'),
      branch: process.env.GIT_BRANCH,
    })
  } catch (err) {
    handleGitdError(err)
  }
}

fetchFiles()
