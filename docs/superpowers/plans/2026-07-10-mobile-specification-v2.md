# Mobile Specification V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new VitePress “移动端规范 V2” page with 24 interactive good/bad mobile UI comparisons, using Varlet for recommended examples and `@sneas/telephone` for synchronized Pixel/iPhone frames.

**Architecture:** Keep the existing page untouched. A Markdown route mounts one Vue workbench; typed content data drives two 12-item sections, while focused Vue components isolate device loading, comparison layout, and scenario rendering. Device Web Components load only after mount so VitePress SSR remains safe.

**Tech Stack:** VitePress 1.5, Vue 3.5, TypeScript, UnoCSS, `@varlet/ui` 3.19.3, `@sneas/telephone` 1.1.2, Node built-in test runner.

---

## File Map

- Modify `package.json` and `package-lock.json`: add the two runtime dependencies and a structural test script.
- Modify `docs/.vitepress/config.mts`: append V2 nav/sidebar entries without changing V1.
- Create `docs/guide/mobile-specification-v2.md`: route, introduction, ClientOnly workbench mount, full-width doc styling.
- Create `docs/components/mobile-spec-v2/mobile-spec-v2-data.ts`: typed content for 24 principles.
- Create `docs/components/mobile-spec-v2/MobileDeviceFrame.vue`: SSR-safe Web Component wrapper and CSS fallback.
- Create `docs/components/mobile-spec-v2/SpecComparison.vue`: synchronized good/bad device layout.
- Create `docs/components/mobile-spec-v2/SpecScenario.vue`: interactive scenario renderer for all 24 IDs.
- Create `docs/components/mobile-spec-v2/MobileSpecV2.vue`: workbench navigation, content and state reset.
- Create `docs/components/mobile-spec-v2/mobile-spec-v2.css`: styles scoped under `.mobile-spec-v2`.
- Create `tests/mobile-spec-v2.test.mjs`: structural contracts for route, menu, data count, dependencies and SSR-safe import.

### Task 1: Add dependency and route contract tests

**Files:**
- Create: `tests/mobile-spec-v2.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing structural test**

Create a Node test that reads repository files and asserts the intended contract before implementation:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('declares V2 dependencies and test script', async () => {
  const pkg = JSON.parse(await read('package.json'))
  assert.equal(pkg.dependencies['@varlet/ui'], '^3.19.3')
  assert.equal(pkg.dependencies['@sneas/telephone'], '^1.1.2')
  assert.equal(pkg.scripts['test:mobile-v2'], 'node --test tests/mobile-spec-v2.test.mjs')
})

test('keeps V1 and adds V2 navigation', async () => {
  const config = await read('docs/.vitepress/config.mts')
  assert.match(config, /移动端规范', link: '\/guide\/mobile-specification'/)
  assert.match(config, /移动端规范 V2', link: '\/guide\/mobile-specification-v2'/)
})

test('defines two complete principle groups', async () => {
  const data = await read('docs/components/mobile-spec-v2/mobile-spec-v2-data.ts')
  assert.match(data, /id: 'business'/)
  assert.match(data, /id: 'frontend'/)
  assert.equal((data.match(/sceneId:/g) ?? []).length, 24)
})

test('device package is imported only on the client', async () => {
  const frame = await read('docs/components/mobile-spec-v2/MobileDeviceFrame.vue')
  assert.match(frame, /onMounted/)
  assert.match(frame, /import\('@sneas\/telephone/)
  assert.doesNotMatch(frame, /^import .*@sneas\/telephone/m)
})

test('V2 route mounts the workbench without changing V1', async () => {
  const page = await read('docs/guide/mobile-specification-v2.md')
  assert.match(page, /<MobileSpecV2 \/>/)
  const v1 = await read('docs/guide/mobile-specification.md')
  assert.match(v1, /<MobileSpecDemo \/>/)
})
```

- [ ] **Step 2: Add the script without dependencies**

Add this key to `package.json` scripts:

```json
"test:mobile-v2": "node --test tests/mobile-spec-v2.test.mjs"
```

- [ ] **Step 3: Run the test and verify it fails for missing V2 files**

Run:

```powershell
& 'C:\Users\34037\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\mobile-spec-v2.test.mjs
```

Expected: dependency assertion and missing-file tests fail.

- [ ] **Step 4: Install the pinned compatible dependencies and update npm lockfile**

Run:

```powershell
& 'C:\Users\34037\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' dlx npm@11.4.2 install @varlet/ui@3.19.3 @sneas/telephone@1.1.2 --save
```

Expected: `package.json` and `package-lock.json` include both dependencies; no `pnpm-lock.yaml` is created.

- [ ] **Step 5: Commit dependency and failing contract test**

```powershell
git add package.json package-lock.json tests/mobile-spec-v2.test.mjs
git commit -m "test: define mobile specification v2 contracts"
```

### Task 2: Create the typed specification content

**Files:**
- Create: `docs/components/mobile-spec-v2/mobile-spec-v2-data.ts`
- Test: `tests/mobile-spec-v2.test.mjs`

- [ ] **Step 1: Define the shared types**

```ts
export type SpecAreaId = 'business' | 'frontend'
export type DeviceKind = 'pixel' | 'iphone'

export interface SpecPrinciple {
  id: string
  number: number
  title: string
  eyebrow: string
  summary: string
  rules: string[]
  recommend: string
  avoid: string
  sceneId: string
  checkpoints: string[]
}

export interface SpecArea {
  id: SpecAreaId
  index: string
  title: string
  shortTitle: string
  description: string
  principles: SpecPrinciple[]
}
```

- [ ] **Step 2: Add all business principles**

Export `businessPrinciples` with exactly these IDs in order:

```ts
[
  'role-task', 'priority', 'trustworthy-data', 'state-first',
  'field-operation', 'assisted-input', 'offline', 'alarm',
  'truthful-feedback', 'high-risk', 'recovery', 'audit'
]
```

Each object must contain concrete water-domain copy, 3-4 rules, one recommendation, one anti-pattern and 2-3 visual checkpoints.

- [ ] **Step 3: Add all frontend principles**

Export `frontendPrinciples` with exactly these IDs in order:

```ts
[
  'responsive', 'stable-shell', 'navigation', 'hierarchy',
  'touch', 'form', 'ui-states', 'feedback', 'actions',
  'crud-recovery', 'data-ui', 'role-density'
]
```

- [ ] **Step 4: Export the two workbench areas**

```ts
export const specAreas: SpecArea[] = [
  {
    id: 'business',
    index: '01',
    title: '产品与业务流程规范',
    shortTitle: '产品业务',
    description: '面向巡检、监测处置与管理决策的移动工作流。',
    principles: businessPrinciples,
  },
  {
    id: 'frontend',
    index: '02',
    title: '前端交互与 UI 体系',
    shortTitle: '前端体系',
    description: '面向首页、布局、列表、表单、CRUD 与状态反馈的工程规范。',
    principles: frontendPrinciples,
  },
]
```

- [ ] **Step 5: Run the structural test**

Expected: the “two complete principle groups” test passes; route/frame tests still fail.

- [ ] **Step 6: Commit the content model**

```powershell
git add docs/components/mobile-spec-v2/mobile-spec-v2-data.ts
git commit -m "feat: add mobile specification v2 content model"
```

### Task 3: Build the SSR-safe mobile device frame

**Files:**
- Create: `docs/components/mobile-spec-v2/MobileDeviceFrame.vue`
- Create: `docs/components/mobile-spec-v2/mobile-spec-v2.css`
- Test: `tests/mobile-spec-v2.test.mjs`

- [ ] **Step 1: Implement the wrapper contract**

Use props and state:

```ts
const props = withDefaults(defineProps<{
  device?: DeviceKind
  label: string
}>(), { device: 'pixel' })

const ready = ref(false)
const failed = ref(false)
const tagName = computed(() => props.device === 'iphone' ? 'iphone-16-max' : 'pixel-9-pro')
```

In `onMounted`, import only the selected modules and catch failure:

```ts
onMounted(async () => {
  try {
    await Promise.all([
      import('@sneas/telephone/pixel-9-pro.js'),
      import('@sneas/telephone/iphone-16-max.js'),
    ])
    ready.value = true
  } catch {
    failed.value = true
  }
})
```

Render `<component :is="tagName" mode="light">` when ready and a local `.device-fallback` with the same slot when failed. While loading, render a fixed aspect-ratio skeleton with `aria-label`.

- [ ] **Step 2: Add isolated frame styles**

Scope all selectors below `.mobile-spec-v2`. Set the frame width to `min(100%, 330px)`, stable Pixel/iPhone aspect ratios, an internal `.device-screen` with `height: 100%`, `overflow: auto`, `overscroll-behavior: contain`, and `background: #f6f8fb`.

- [ ] **Step 3: Run the device import test**

Expected: the SSR-safe dynamic import assertion passes.

- [ ] **Step 4: Commit the device wrapper**

```powershell
git add docs/components/mobile-spec-v2/MobileDeviceFrame.vue docs/components/mobile-spec-v2/mobile-spec-v2.css
git commit -m "feat: add SSR-safe mobile device frame"
```

### Task 4: Build the comparison shell and workbench

**Files:**
- Create: `docs/components/mobile-spec-v2/SpecComparison.vue`
- Create: `docs/components/mobile-spec-v2/MobileSpecV2.vue`
- Modify: `docs/components/mobile-spec-v2/mobile-spec-v2.css`

- [ ] **Step 1: Implement `SpecComparison.vue`**

Accept `device`, `principle` and `resetKey`. Render two `MobileDeviceFrame` instances with “规范推荐” and “常见反例” headers. Pass `side="good"` and `side="bad"` to `SpecScenario`, keyed by `${principle.sceneId}-${side}-${resetKey}` so switching principles resets state.

- [ ] **Step 2: Implement workbench state**

```ts
const activeAreaId = ref<SpecAreaId>('business')
const activePrincipleId = ref(specAreas[0].principles[0].id)
const device = ref<DeviceKind>('pixel')
const resetKey = ref(0)

const activeArea = computed(() => specAreas.find(area => area.id === activeAreaId.value)!)
const activePrinciple = computed(() =>
  activeArea.value.principles.find(item => item.id === activePrincipleId.value)!
)

function selectArea(id: SpecAreaId) {
  activeAreaId.value = id
  activePrincipleId.value = specAreas.find(area => area.id === id)!.principles[0].id
  resetKey.value += 1
}
```

- [ ] **Step 3: Render accessible controls and content**

Use native segmented buttons for the two top-level areas, a `<select>` on narrow screens and a 12-item principle rail on desktop. Render title, summary, rules, recommendation, anti-pattern and checkpoints before the comparison. Use buttons for Pixel/iPhone selection and reset.

- [ ] **Step 4: Add responsive workbench styles**

At widths below 900px, stack text and comparison. Below 720px, hide the desktop rail, show the `<select>`, and stack good/bad devices. Avoid nested cards and keep section radii at 8px or less.

- [ ] **Step 5: Commit the workbench shell**

```powershell
git add docs/components/mobile-spec-v2/SpecComparison.vue docs/components/mobile-spec-v2/MobileSpecV2.vue docs/components/mobile-spec-v2/mobile-spec-v2.css
git commit -m "feat: add mobile specification v2 workbench"
```

### Task 5: Implement the 24 interactive scene pairs

**Files:**
- Create: `docs/components/mobile-spec-v2/SpecScenario.vue`
- Create: `docs/components/mobile-spec-v2/scenario-content.ts`
- Modify: `docs/components/mobile-spec-v2/mobile-spec-v2.css`

- [ ] **Step 1: Create typed scene presentation data**

Define `ScenarioContent` with `title`, `subtitle`, `metrics`, `fields`, `steps` and `actions`. Export a record containing all 24 scene IDs so common structures remain data-driven.

- [ ] **Step 2: Create reusable in-phone primitives**

Inside `SpecScenario.vue`, define template classes for status bar, app bar, section title, metric row, task row, form field, timeline, bottom action and inline feedback. Use semantic HTML and keep every interactive target at least 44px on the good side.

- [ ] **Step 3: Implement business scenes 1-6**

Add distinct conditional templates for `role-task`, `priority`, `trustworthy-data`, `state-first`, `field-operation`, and `assisted-input`. Each good scene must use at least one locally imported Varlet component (`Button`, `Chip`, `Tabs`, `Cell`, `Input` or `Progress`); each bad scene must visibly demonstrate its named anti-pattern.

- [ ] **Step 4: Implement business scenes 7-12**

Add `offline`, `alarm`, `truthful-feedback`, `high-risk`, `recovery`, and `audit`. Required interactions: advance sync state, acknowledge alarm, advance command receipt, open/confirm high-risk summary, choose a conflict version, and expand audit details.

- [ ] **Step 5: Implement frontend scenes 1-6**

Add `responsive`, `stable-shell`, `navigation`, `hierarchy`, `touch`, and `form`. Required interactions: toggle content width, trigger loading replacement, return to list, expand details, operate touch targets, and validate form input.

- [ ] **Step 6: Implement frontend scenes 7-12**

Add `ui-states`, `feedback`, `actions`, `crud-recovery`, `data-ui`, and `role-density`. Required interactions: cycle UI state, trigger inline/Banner/Snackbar feedback, execute primary action, retry upload, inspect metric semantics, and switch role density.

- [ ] **Step 7: Import Varlet locally and contain overlays**

Use named imports from `@varlet/ui` and import `@varlet/ui/es/style`. Avoid global `app.use`. Configure Snackbar/Dialog actions as in-screen simulated layers when a library teleport would escape the frame.

- [ ] **Step 8: Add reduced-motion and small-screen guards**

Disable nonessential transitions inside `@media (prefers-reduced-motion: reduce)`. Ensure long labels wrap and no button text clips at the 300px inner screen width.

- [ ] **Step 9: Extend the structural test for scenario coverage**

Read `SpecScenario.vue` and assert every `sceneId` in the data file appears in the renderer or the typed scene record. Expected: 24 unique scene contracts.

- [ ] **Step 10: Run tests and commit scenes**

```powershell
& 'C:\Users\34037\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\mobile-spec-v2.test.mjs
git add docs/components/mobile-spec-v2 tests/mobile-spec-v2.test.mjs
git commit -m "feat: add mobile specification v2 comparison scenes"
```

### Task 6: Add the VitePress route and menus

**Files:**
- Create: `docs/guide/mobile-specification-v2.md`
- Modify: `docs/.vitepress/config.mts`
- Test: `tests/mobile-spec-v2.test.mjs`

- [ ] **Step 1: Create the Markdown route**

The page must contain a concise title and scope, then:

```md
<ClientOnly>
  <MobileSpecV2 />
</ClientOnly>

<script setup>
import MobileSpecV2 from '../components/mobile-spec-v2/MobileSpecV2.vue'
</script>
```

Add page-local CSS that widens `.vp-doc` only for this page through a wrapper class, without changing global VitePress layout.

- [ ] **Step 2: Add both nav entries**

Keep the existing item and append:

```ts
{ text: '移动端规范 V2', link: '/guide/mobile-specification-v2' }
```

Do the same in the “开发指南” sidebar group.

- [ ] **Step 3: Run the complete structural test**

Expected: all tests pass.

- [ ] **Step 4: Commit the route**

```powershell
git add docs/guide/mobile-specification-v2.md docs/.vitepress/config.mts tests/mobile-spec-v2.test.mjs
git commit -m "feat: publish mobile specification v2 page"
```

### Task 7: Build and browser-verify the V2 experience

**Files:**
- Modify only files implicated by observed failures.

- [ ] **Step 1: Run the production build**

Run through the temporary npm CLI because npm is not on the shell PATH:

```powershell
& 'C:\Users\34037\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' dlx npm@11.4.2 run docs:build
```

Expected: VitePress build exits 0 and generates `docs/.vitepress/dist/guide/mobile-specification-v2.html`.

- [ ] **Step 2: Start the development server**

```powershell
& 'C:\Users\34037\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' dlx npm@11.4.2 run docs:dev -- --host 127.0.0.1
```

Use an available port and keep the server running through QA.

- [ ] **Step 3: Verify desktop visual behavior**

Open `/privateComponents/guide/mobile-specification-v2` at 1440x900. Verify both devices are nonblank, Varlet styles render on the good side, text and controls do not overlap, and all 24 selectors can be visited.

- [ ] **Step 4: Verify mobile visual behavior**

At 390x844 verify the selector replaces the rail, devices stack, no horizontal page overflow occurs, labels wrap, and the inner device remains scrollable.

- [ ] **Step 5: Verify interactions and themes**

Exercise at least one interactive scene from each area, device switching, reset, VitePress dark theme and reduced-motion emulation. Confirm the old V1 page still renders.

- [ ] **Step 6: Re-run tests after visual fixes**

Run the Node test and production build again. Expected: both exit 0.

- [ ] **Step 7: Commit verified fixes**

```powershell
git add docs package.json package-lock.json tests/mobile-spec-v2.test.mjs
git commit -m "fix: polish mobile specification v2 responsive demos"
```

## Final Verification

- [ ] `node --test tests/mobile-spec-v2.test.mjs` passes.
- [ ] VitePress production build passes.
- [ ] V1 and V2 menu entries both work.
- [ ] Business and frontend areas each expose 12 distinct scenes.
- [ ] Pixel and iPhone frames render interactive slot content.
- [ ] Desktop/mobile screenshots show nonblank, unclipped, nonoverlapping UI.
- [ ] `git status --short` contains no unintended generated files.
