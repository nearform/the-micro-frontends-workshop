# The Micro Frontends Workshop

## Slideshow Presentation

[The Micro Frontends Workshop Slides](https://nearform.github.io/the-micro-frontends-workshop)

## Requirements

- Node LTS
- npm >= 7.24.2

## Installation and Running Exercises

- From the root of the project run `npm i`.
- To run an exercise, navigate to its folder and also run `npm start` from there.
- Run only `npm start` to run `step 1` exercise.
- Note that the `src/step-...` folders contain base code for solving exercises while the solutions can be found in the corresponding subdirectories within the `src/solutions` folder.

## Presenting

- From the root of the project run `npm start`.

## Maintaining Dependencies

### Next.js and `@module-federation/nextjs-mf` peer conflict

The Next.js apps (`src/**/nextApp`) use Next 16, but `@module-federation/nextjs-mf@8.8.76` (the latest release) declares `peerOptional next@"^12 || ^13 || ^14 || ^15"`. Because of this:

- Day-to-day `npm ci` and `npm install` work, because npm installs from `package-lock.json` without re-checking that peer range.
- Changing the `next` version (by hand or through Dependabot) fails with `ERESOLVE`. Dependabot can't regenerate the lockfile in this case, so its PRs change only `package.json`, and CI fails on `npm ci` with `Missing: next@x.y.z from lock file`.

When bumping `next`:

1. Bump it in **all six** `nextApp/package.json` files together (`src/step-0{2,3,4}-*/nextApp` and `src/solutions/step-0{2,3,4}-*/nextApp`), so the workshop steps and solutions don't drift apart.
2. Update `package-lock.json` by changing only the `next`, `@next/env` and `@next/swc-*` entries (`version`, `resolved`, `integrity`) and the `next` spec of each `nextApp` workspace. Take the values from `npm view <pkg>@<version> dist.tarball dist.integrity`, and check `npm view next@<version> optionalDependencies` for changed ranges (e.g. `sharp`). See PR #957 for an example.
3. Run `npm ci`, check that each `nextApp` resolves the new version (`node -p "require('next/package.json').version"` from inside the app folder), then run `npm run lint` and `npm run build`.

**Do not** work around the conflict by regenerating the lockfile with:

- `--force`: npm moves `next` into `nextApp/node_modules`, and `npm ci` then silently skips installing it. The lockfile looks valid, but the apps have no `next`.
- `--legacy-peer-deps`: npm drops required peers such as `hono` and `@rspack/core`.

CI only lints and builds the slides. It does not build the Next apps, so a broken install like the ones above passes CI.

Remove this section once `@module-federation/nextjs-mf` supports Next 16, or once the workshop stops using it.
