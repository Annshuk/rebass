---
name: package-version-changelog
description: 'Use when choosing or applying semantic version bumps (major, minor, patch) for changed workspace packages, propagating bumps to dependent packages, updating internal dependency ranges, or updating package changelogs.'
argument-hint: '[changed package or release scope]'
---

# Package Version and Changelog Updates

Use this workflow after package changes when asked to release, bump versions, propagate dependency versions, or update changelogs.

## Repository Rules

- Treat each workspace package's `package.json` version as its source of truth. Do not infer package versions from the Lerna root version.
- Discover workspace globs from the root package manager and Lerna configuration. Build the internal dependency graph from package names in manifests, not folder names.
- Version publishable packages under `packages/*`. Do not version private tooling, docs, or examples unless explicitly requested; still inspect them as consumers when they depend on a changed package.
- Find every existing changelog (`CHANGELOG.md`, `CHANGELOG`, or equivalent) before editing. Update package changelogs where they exist and the root changelog when it records workspace releases. Do not create per-package changelogs unless repository convention requires them.
- Preserve user edits, existing headings, formatting, and unrelated entries. Never replace a changelog wholesale.

## Workflow

1. Inspect `git status`, the relevant diffs, root workspace configuration, affected package manifests, and all existing changelogs. Keep pre-existing and unrelated edits intact. If the comparison base or intended release scope is unclear, ask before deciding which changes belong in the release.
2. Identify directly changed packages from source, public exports, package metadata, build configuration, and tests. Separate actual package changes from changelog-only or generated-file changes.
3. Assign each directly changed package its highest applicable bump:
   - **Major:** an incompatible public API or behavior change, removed/renamed exports, changed default integration or entry point, or dropped compatibility.
   - **Minor:** a backward-compatible public feature, component, export, or capability.
   - **Patch:** a backward-compatible fix or package/build change that does not add a public capability.
   - Do not bump for changelog-only or generated-output-only changes. For test/docs-only changes, do not bump unless the user explicitly requests a release for every changed package.
4. Build the dependent-package graph from `dependencies`, `peerDependencies`, and `optionalDependencies`. Include `devDependencies` when the package is a build-time input to a publishable artifact. Traverse dependents transitively.
5. Propagate bumps through the graph so every affected publishable dependent is included. A dependent's bump must be at least the strongest bump from the changed packages it depends on; keep its own higher bump if applicable. Thus a major change propagates at least major, a minor at least minor, and a patch at least patch. Do not bump unrelated packages.
6. Calculate each new version from that package's current version using SemVer. For prereleases or invalid/nonstandard versions, stop and ask before changing them. Update internal dependency ranges to the new workspace package version, preserving the repository's range/workspace-protocol style. Do not change external dependency ranges unless requested.
7. Update all applicable changelogs. Group entries by package name and new version, summarize only verified changes, and place entries under the existing unreleased/current-release heading. If there is only a root changelog, include every bumped package there. Do not add duplicate entries or rewrite history.
8. Validate changed manifests as JSON, verify each internal dependency range resolves to the new package version, inspect the final diff, and run relevant package tests/build checks when available. Refresh the lockfile only when dependency declarations require it; use the repository's package manager and avoid lifecycle scripts when safe.
9. Report the package dependency chain, old and new versions, bump reasons, changelog files updated, and checks run. Do not commit, tag, publish, or create branches unless explicitly asked.

## Bump Precedence

When a package has multiple changes, choose the highest severity: `major > minor > patch`. When it depends on multiple changed packages, propagate the highest applicable severity. A package's own breaking change always takes precedence over a lower propagated bump.
