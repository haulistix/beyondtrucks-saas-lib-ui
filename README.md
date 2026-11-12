- 💪 Vue 3 Composition API
- 🔥 Written in TypeScript

## Build and Publish UI Artifacts Locally

Run these commands in this source repository. The default release checkout is the sibling directory `beyondtrucks-saas-lib-ui`.

```sh
# Preview existing dist/element-plus artifacts without building, network access, committing, or pushing
pnpm release:ui --dry-run

# Publish: preflight → commit source → build → copy artifacts → increment the release patch version → commit and push release
pnpm release:ui --message "fix: update input-select layout"
```

After preflight checks, the script stages all pending source changes, including non-ignored new files and deletions, and commits them before building. Both repositories use the same required `--message` summary. Invoking `$release-ui` generates this concise English summary from the actual changes; when running the command directly, supply the summary yourself. Review all source changes before running: they are included even if only some were previously staged. A clean source checkout is skipped without an empty commit. The source commit is local only; the script does not push the source repository.

The script copies the contents of `dist/element-plus/`, not the entire `dist/` directory. Copying preserves `.git`, `.github`, `scripts`, and `package.json` in the release checkout and does not delete extra target files. When artifacts have changed, the script increments only the release checkout's patch version (for example, `1.0.102` to `1.0.103`) and commits `package.json` together with the artifacts. The source checkout's package version is never changed. Unchanged artifacts do not create a release commit or increment the version, even when source changes were committed.

The source checkout must be a repository root on a branch without unresolved conflicts. The release checkout must be clean, on a branch with a remote upstream, and have no unpublished local commits. The script fetches the remote branch before the source commit and again after the build to check that the release checkout matches the remote; it never pulls or merges. If the remote has moved, synchronize the release checkout manually before retrying. A failed source commit stops the flow before building or publishing and leaves the source changes available. The script stops on build, copy, or push failures and never force-pushes, stashes user changes, or automatically rolls back. If a later stage fails, any successful source commit remains. If a release push fails after a commit has been created, the local release commit and incremented version also remain available; inspect both checkouts and resolve the Git state manually rather than rerunning the release command.

The release repository's GitHub Actions workflow reads the committed version to create its tag and Release. It no longer increments versions, commits, or pushes back to `master`. Only pushes that change `package.json` trigger a release, and an existing version tag is rejected. The local script does not install dependencies or wait for the workflow to finish.

One-time migration: commit and synchronize the release repository's updated workflow and metadata script before using this new flow. Those files are deliberately excluded from artifact copying. Committing only workflow/script changes does not trigger a release or modify the current package version.

```sh
# Reuse an existing build instead of rebuilding
pnpm release:ui --skip-build --message "fix: update UI"

# Use a release checkout outside the default location
pnpm release:ui --target /absolute/path/beyondtrucks-saas-lib-ui --message "fix: update input-select layout"

# Run local Git and file-protection tests without accessing GitHub
node --test scripts/__tests__/release-ui.test.mjs
```

Requirements: Node.js 20+, pnpm, Git, rsync, and Git push access to the release repository. Preview mode requires a complete existing `dist/element-plus` build. Run `pnpm build` first if those artifacts are missing.
