---
name: package-consumer-support
description: 'Use when helping someone choose, install, configure, integrate, or troubleshoot a package from this repository in an application, including React, Emotion, Theme UI, or Styled Components setup and common errors.'
argument-hint: '[package name and app/framework]'
---

# Package Consumer Setup and Troubleshooting

Help consumers use packages from this repository in their own applications. Provide a working, package-specific setup and diagnose errors from evidence rather than guessing.

## Workflow

1. Identify the requested package and where it will run. Ask only for missing details that affect the answer: app framework, React version, package manager, styling engine/theme provider, whether they installed from a registry or a local clone, and the exact error or relevant build output.
2. Inspect the package's current `package.json`, exports/entry points, peer and runtime dependencies, build scripts, README, and source exports. Treat the manifest and source as authoritative when README examples disagree; this repository contains older README package names and setup examples.
3. Confirm the package's exact published `name` and version before giving an install command. Distinguish registry installation from consuming a local checkout. For workspace packages, explain that their build scripts and sibling workspace dependencies may require installing/building from the repository root.
4. Give a minimal setup for the user's stack: install command using their package manager, correct import path and exported symbols, required provider/configuration, and a small usage example. Do not add dependencies or framework configuration the package does not require.
5. Match styling engines and theme contexts. For Reflexbox, the default entry is Emotion; the generated `styled-components` entry is a separate adapter and must be paired with Styled Components' `ThemeProvider`. Theme UI uses the Emotion-compatible path. Check the selected package's manifest before assuming Emotion major versions are interchangeable; `@designstack/space` currently uses Emotion 10 packages while other packages use Emotion 11.
6. Verify the setup with the narrowest relevant check: resolve the import, render a minimal component, run the app's package/build command, or reproduce the reported error. If the consumer project is open and the user wants a fix, make the smallest change in that project and rerun the same check. Ask before changing their styling engine, framework, or major dependency versions.
7. Explain the result in practical terms: package/import used, why it matches their environment, what failed, the evidence for the cause, the fix, and how they can verify it. When asked for preventive guidance, include likely issues and remedies from the table below.

## Common Problems

| Symptom                                                 | Check                                                                                       | Typical resolution                                                                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Package or subpath cannot be resolved                   | Manifest `name`, `main`/`module`/`exports`, install source, and whether build output exists | Install the exact manifest package name; use a documented/generated subpath; build or link the local workspace when consuming a checkout |
| README install/import fails                             | Compare README examples to the current manifest and exports                                 | Prefer current package metadata and source exports; call out stale docs instead of repeating them                                        |
| React invalid-hook-call or duplicate React              | App and package React versions, peer dependency range, and dependency tree                  | Align React versions and deduplicate; do not install a second React copy as a package dependency                                         |
| Theme values are missing                                | Which provider is mounted and which styling-engine entry the component imports              | Pair the component adapter with its provider: Emotion/Theme UI with Emotion output, Styled Components with the Styled Components output  |
| Styles render differently or system props reach the DOM | Confirm the selected build entry, system package versions, and prop-forwarding behavior     | Use the correct adapter and compatible package versions; reproduce before changing source or adding forwarding filters                   |
| Emotion theme works in one package but not another      | Compare the packages' Emotion major versions and provider context                           | Use a compatible provider/runtime pair; explain incompatibilities and avoid assuming Emotion 10 and 11 share context                     |
| JSX or package source fails during build                | Package `prepare`/build script, Babel config inheritance, and root-only tooling             | Run the documented repository-root build when needed; add only the missing project transform/config supported by that build              |
| Works in development but fails in SSR/framework build   | Framework, bundler, server-rendering integration, and styling-engine SSR setup              | Follow the framework's integration for the selected engine and verify both server and client output                                      |

## Repository Package Map

Use this as a starting point, then verify the current manifests and exports:

- `@designstack/rebass`: primitive components such as `Box`, `Flex`, `Text`, `Heading`, `Button`, `Link`, `Image`, and `Card`.
- `@designstack/reflexbox`: layout primitives including `Box` and `Flex`; default Emotion entry, with a generated Styled Components adapter.
- `@designstack/forms`: themed form controls; depends on Reflexbox.
- `@designstack/layout`: grid/layout helpers; depends on Reflexbox.
- `@designstack/space`: responsive spacing applied to children; check its Emotion 10 dependency compatibility before integrating with Emotion 11 applications.
- `@designstack/preset` and `@designstack/preset-material`: theme objects, not React components.
- `@rebass/bundler`: repository build tooling, not an application UI package.

Package names and exports can change. Always verify this map against current `package.json` files before recommending commands or imports.
