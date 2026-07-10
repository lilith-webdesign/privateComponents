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

test('V2 route mounts the workbench without changing V1', async () => {
  const page = await read('docs/guide/mobile-specification-v2.md')
  const v1 = await read('docs/guide/mobile-specification.md')

  assert.match(page, /<MobileSpecV2 \/>/)
  assert.match(v1, /<MobileSpecDemo \/>/)
})
