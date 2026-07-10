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
  assert.equal((data.match(/^    sceneId:/gm) ?? []).length, 24)
})

test('device package is imported only on the client', async () => {
  const frame = await read('docs/components/mobile-spec-v2/MobileDeviceFrame.vue')

  assert.match(frame, /onMounted/)
  assert.match(frame, /import\('@sneas\/telephone/)
  assert.doesNotMatch(frame, /^import .*@sneas\/telephone/m)
})

test('workbench synchronizes area, principle, device and reset state', async () => {
  const workbench = await read('docs/components/mobile-spec-v2/MobileSpecV2.vue')
  const comparison = await read('docs/components/mobile-spec-v2/SpecComparison.vue')

  assert.match(workbench, /activeAreaId/)
  assert.match(workbench, /activePrincipleId/)
  assert.match(workbench, /selectArea/)
  assert.match(workbench, /resetKey/)
  assert.match(workbench, /<SpecComparison/)
  assert.match(comparison, /<MobileDeviceFrame/)
  assert.match(comparison, /side="good"/)
  assert.match(comparison, /side="bad"/)
})

test('all 24 scenes have content and use Varlet on the recommended side', async () => {
  const data = await read('docs/components/mobile-spec-v2/mobile-spec-v2-data.ts')
  const sceneContent = await read('docs/components/mobile-spec-v2/scenario-content.ts')
  const renderer = await read('docs/components/mobile-spec-v2/SpecScenario.vue')
  const sceneIds = [...data.matchAll(/^    sceneId: '([^']+)'/gm)].map((match) => match[1])

  assert.equal(sceneIds.length, 24)
  for (const sceneId of sceneIds) {
    assert.match(sceneContent, new RegExp(`['\"]${sceneId}['\"]\\s*:`))
  }
  assert.match(renderer, /from '@varlet\/ui'/)
  assert.match(renderer, /<VarButton/)
  assert.match(renderer, /side === 'good'/)
})

test('V2 route mounts the workbench without changing V1', async () => {
  const page = await read('docs/guide/mobile-specification-v2.md')
  const v1 = await read('docs/guide/mobile-specification.md')

  assert.match(page, /<MobileSpecV2 \/>/)
  assert.match(v1, /<MobileSpecDemo \/>/)
})
