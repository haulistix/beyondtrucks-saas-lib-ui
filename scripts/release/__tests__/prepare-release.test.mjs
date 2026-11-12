import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const script = fileURLToPath(new URL('../prepare-release.mjs', import.meta.url))

function prepare(t, version) {
  const directory = mkdtempSync(join(tmpdir(), 'ui-release-metadata-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const packagePath = join(directory, 'package.json')
  const output = join(directory, 'output')
  const raw = `${JSON.stringify({ name: 'element-plus', version })}\n`
  writeFileSync(packagePath, raw)
  utimesSync(packagePath, 1_700_000_000, 1_700_000_000)
  const mtime = statSync(packagePath).mtimeMs
  const result = spawnSync(process.execPath, [script], {
    cwd: directory,
    encoding: 'utf8',
    env: {
      ...process.env,
      PACKAGE_JSON_PATH: packagePath,
      GITHUB_OUTPUT: output,
      RELEASE_REPO_NAME: 'ui-library',
      RELEASE_COMMIT_MESSAGE:
        'fix(tabs): align the header border\nAdditional details',
    },
  })
  assert.equal(readFileSync(packagePath, 'utf8'), raw)
  assert.equal(statSync(packagePath).mtimeMs, mtime)
  return { result, output }
}

test('reads the committed version without incrementing or rewriting package.json', (t) => {
  const { result, output } = prepare(t, '1.0.103')
  assert.equal(result.status, 0, result.stderr)
  assert.deepEqual(JSON.parse(result.stdout), {
    version: '1.0.103',
    archiveName: 'ui-library-v1.0.103.zip',
    releaseTitle: 'fix(tabs): align the header border',
  })
  assert.equal(
    readFileSync(output, 'utf8'),
    'version=1.0.103\narchive_name=ui-library-v1.0.103.zip\nrelease_title=fix(tabs): align the header border\n'
  )
})

for (const version of ['1.0.1-beta', '01.0.1', null, 12]) {
  test(`rejects invalid version ${JSON.stringify(version)} without changing package.json`, (t) => {
    const { result } = prepare(t, version)
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /version/)
  })
}
