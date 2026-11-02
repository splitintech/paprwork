# paprwork

Local launcher for a pinned [Papr Work](https://github.com/Papr-ai/paprwork) checkout.

Papr Work does not ship a `bin`. Its own instructions are: clone the repo, use Node 24, then `npm start`. That opens the Electron desktop app. This launcher records the commit the Outreach Console was checked against and runs those same steps.

| | |
| --- | --- |
| Repository | https://github.com/Papr-ai/paprwork |
| Commit | `b34b6c4090adfb64109004d1a25645a3d3a2bd66` |
| Branch | `development` |
| Release baseline | 2.7.2 |
| Recorded | `outreach-engine/apps/papr/compatibility.json`, 2026-10-20 |

The Papr Work source stays in that checkout. This package does not vendor it. Papr Work is AGPL-3.0. This launcher is MIT.

## Commands

```bash
node --experimental-strip-types src/cli.ts version
node --experimental-strip-types src/cli.ts doctor
node --experimental-strip-types src/cli.ts checkout
node --experimental-strip-types src/cli.ts start --print-only
```

`checkout` clones into `~/Papr/src/paprwork` and detaches the pinned commit. `doctor` checks Node 24+ and that the checkout is that commit. `start` runs `npm start` only after `npm install` has been run in the checkout. Pass `--dir` to use another directory.

`start` opens the desktop app. Install dependencies yourself in the checkout first. The launcher does not print secrets.

## Test

```bash
npm test
```
