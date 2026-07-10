import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('nav and sidebar expose unified mobile experience entry', async () => {
  const config = await read('docs/.vitepress/config.mts')
  assert.match(config, /移动端体验规范/)
  assert.match(config, /\/guide\/mobile\//)
  assert.match(config, /\/guide\/mobile\/global/)
  assert.match(config, /water-keeper/)
  assert.match(config, /dispatcher/)
  assert.doesNotMatch(config, /移动端规范 V2/)
  assert.doesNotMatch(config, /mobile-specification-v2/)
})

test('role profiles cover five business roles', async () => {
  const data = await read('docs/components/mobile-experience/data/role-profiles.ts')
  for (const id of ['water-keeper', 'engineer', 'dispatcher', 'admin', 'public']) {
    assert.match(data, new RegExp(`id: '${id}'`))
  }
  assert.match(data, /核心权限|permissions/)
  assert.match(data, /数据视野|dataScope/)
  assert.match(data, /philosophy/)
})

test('engineer role expands multi-line field scenarios', async () => {
  const profile = await read('docs/components/mobile-experience/data/role-profiles.ts')
  const scenes = await read('docs/components/mobile-spec-v2/scenario-content.ts')
  const roleWb = await read('docs/components/mobile-experience/RoleSpecWorkbench.vue')
  assert.match(profile, /eng-workbench/)
  assert.match(profile, /uiNorm/)
  assert.match(profile, /businessScope/)
  assert.match(profile, /dataView/)
  assert.match(profile, /事件与消息驱动|事件驱动/)
  assert.match(profile, /用户回显|回显卡/)
  assert.match(roleWb, /mex-spec-banner/)
  assert.match(roleWb, /sceneUiNorm|uiNorm/)
  for (const id of ['eng-workbench', 'eng-construction', 'eng-install', 'eng-debug', 'eng-billing', 'eng-user-mgmt', 'eng-acceptance']) {
    assert.match(scenes, new RegExp(`'${id}'\\s*:`))
  }
  assert.match(scenes, /二级入口 · 全部业务|消息驱动/)
  assert.match(scenes, /当前用户（回显卡）/)
})

test('water-keeper expands patrol workorder alarm water-quality offline', async () => {
  const profile = await read('docs/components/mobile-experience/data/role-profiles.ts')
  const scenes = await read('docs/components/mobile-spec-v2/scenario-content.ts')
  assert.match(profile, /wk-workbench/)
  assert.match(profile, /工单发起|工单：/)
  assert.match(profile, /报警预警|水质/)
  assert.match(profile, /事件与消息驱动|事件驱动/)
  for (const id of ['wk-workbench', 'wk-patrol', 'wk-workorder', 'wk-alarm', 'wk-water-quality', 'wk-offline']) {
    assert.match(scenes, new RegExp(`'${id}'\\s*:`))
  }
  assert.match(scenes, /片区工作台|二级入口 · 片区台账/)
  assert.match(scenes, /确认并去巡查|转工单/)
  assert.match(scenes, /氨氮|mg\/L/)
})

test('global patterns drive comparison scenes', async () => {
  const data = await read('docs/components/mobile-experience/data/global-patterns.ts')
  assert.match(data, /layout-shell/)
  assert.match(data, /core-data/)
  assert.match(data, /offline-sync/)
  assert.equal((data.match(/sceneId:/g) ?? []).length >= 7, true)
})

test('workbenches reuse SpecComparison and Varlet good side', async () => {
  const globalWb = await read('docs/components/mobile-experience/GlobalSpecWorkbench.vue')
  const roleWb = await read('docs/components/mobile-experience/RoleSpecWorkbench.vue')
  const scenario = await read('docs/components/mobile-spec-v2/SpecScenario.vue')
  assert.match(globalWb, /SpecComparison/)
  assert.match(roleWb, /roleId/)
  assert.match(roleWb, /SpecComparison/)
  assert.match(scenario, /@varlet\/ui/)
  assert.match(scenario, /side === 'good'|side === \"good\"|side === 'good'/)
})

test('guide pages mount workbenches', async () => {
  const globalPage = await read('docs/guide/mobile/global.md')
  const rolePage = await read('docs/guide/mobile/roles/water-keeper.md')
  const index = await read('docs/guide/mobile/index.md')
  assert.match(globalPage, /GlobalSpecWorkbench/)
  assert.match(rolePage, /RoleSpecWorkbench/)
  assert.match(rolePage, /water-keeper/)
  assert.match(index, /分角色业务规范|五角色/)
})

test('legacy mobile guides redirect into new tree', async () => {
  const v1 = await read('docs/guide/mobile-specification.md')
  const v2 = await read('docs/guide/mobile-specification-v2.md')
  assert.match(v1, /已迁移/)
  assert.match(v2, /已迁移/)
  assert.match(v1, /\/guide\/mobile\/global/)
  assert.match(v2, /\/guide\/mobile\//)
})
