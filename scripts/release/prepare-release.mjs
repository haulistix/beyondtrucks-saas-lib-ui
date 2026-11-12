import fs from 'node:fs'
import path from 'node:path'

const packageJsonPath = path.resolve(
  process.env.PACKAGE_JSON_PATH || 'package.json'
)
const packageJsonRaw = fs.readFileSync(packageJsonPath, 'utf8')
const packageJson = JSON.parse(packageJsonRaw)
const currentVersion = packageJson.version

if (typeof currentVersion !== 'string') {
  throw new Error('package.json version must be a string')
}

const versionMatch = currentVersion.match(
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/
)

if (!versionMatch) {
  throw new Error(`Unsupported version format: ${currentVersion}`)
}

const repoName = process.env.RELEASE_REPO_NAME || 'release'
const commitMessage = (process.env.RELEASE_COMMIT_MESSAGE || '').trim()
const releaseTitle = (
  commitMessage.split('\n')[0] || `Release v${currentVersion}`
).trim()
const archiveName = `${repoName}-v${currentVersion}.zip`

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${currentVersion}\n`)
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `archive_name=${archiveName}\n`)
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `release_title=${releaseTitle}\n`
  )
}

console.log(
  JSON.stringify(
    {
      version: currentVersion,
      archiveName,
      releaseTitle,
    },
    null,
    2
  )
)
