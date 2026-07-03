<template>
  <div class="mobile-spec-demo-container py-6">
    <!-- 12大交互准则下拉选择器 -->
    <div class="relative w-full max-w-xl mx-auto mb-8">
      <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider text-center">
        Select Interaction Principle / 选择测试准则
      </label>
      <select 
        v-model="activeScene" 
        class="w-full p-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-xs font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-md appearance-none"
      >
        <option v-for="scene in scenes" :key="scene.id" :value="scene.id">
          {{ scene.icon }} {{ scene.num }}. {{ scene.title }}
        </option>
      </select>
      <!-- 下拉箭头 -->
      <div class="absolute right-4 bottom-3.5 pointer-events-none text-slate-500 text-xs">
        ▼
      </div>
    </div>

    <!-- 主展示区域：左右对比 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-items-center">
      
      <!-- ==================== 左侧：规范级设计 (OK) ==================== -->
      <div class="flex flex-col items-center w-full">
        <div class="flex items-center gap-2 mb-4">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">规范推荐 (Mobile Spec OK)</span>
        </div>
        
        <!-- 模拟手机外壳 -->
        <div class="phone-wrapper relative w-[310px] h-[580px] bg-slate-900 border-[10px] border-slate-950 rounded-[40px] shadow-2xl overflow-hidden flex flex-col text-slate-100 font-sans select-none">
          <!-- 手机刘海 -->
          <div class="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
            <div class="w-3 h-3 rounded-full bg-slate-900 mr-8"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
          </div>
          <!-- 手机状态栏 -->
          <div class="h-8 bg-slate-950 flex justify-between items-end px-6 text-[10px] text-slate-400 z-20 pb-1">
            <span>12:00</span>
            <div class="flex items-center gap-1.5 pb-0.5">
              <span class="w-3 h-2 bg-slate-500/30 inline-block relative rounded-sm overflow-hidden">
                <span class="absolute left-0 bottom-0 top-0 bg-slate-300 w-4/5"></span>
              </span>
              <span class="w-4.5 h-2.5 border border-slate-500 rounded-sm p-0.5 inline-block relative">
                <span class="block h-full bg-slate-300 w-3/4 rounded-2xs"></span>
              </span>
            </div>
          </div>

          <!-- 手机内容展示区 -->
          <div class="flex-1 bg-slate-950 overflow-hidden relative flex flex-col justify-between text-left">
            
            <!-- 1. 触控容错性 (OK) -->
            <div v-if="activeScene === 'touch'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">通知中心</h4>
                <p class="text-[9px] text-slate-500 leading-normal">列表右侧的小图标，通过扩展透明点击热区至 44px，易于点击且配有按压反馈。</p>
                <div class="space-y-2 mt-3">
                  <div v-for="item in 3" :key="item" class="p-2.5 bg-slate-900 border border-slate-850 rounded-xl flex justify-between items-center">
                    <span class="text-[10px] text-slate-300">系统报警事件 #0{{ item }}</span>
                    <!-- 大点击区域：通过 CSS 扩展热区，视觉保持精细 -->
                    <div class="flex gap-1">
                      <button 
                        @click="triggerOkToast(`编辑通知 #0${item}`)"
                        class="w-10 h-10 -my-3 flex items-center justify-center text-xs bg-slate-850/50 hover:bg-slate-800 rounded-full active:scale-90 transition-transform cursor-pointer"
                      >
                        ✏️
                      </button>
                      <button 
                        @click="triggerOkToast(`删除通知 #0${item}`)"
                        class="w-10 h-10 -my-3 flex items-center justify-center text-xs bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-full active:scale-90 transition-transform cursor-pointer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. 物理工效学拇指区 (OK) -->
            <div v-if="activeScene === 'thumb'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">导航设置</h4>
                <p class="text-[9px] text-slate-500 leading-normal">高频操作按钮完全置于屏幕底部的黄金操作区，方便单手持机点按。</p>
                <div class="mt-4 p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                  <div class="text-[9px] text-slate-400">终点：公司写字楼</div>
                  <div class="text-[9px] text-slate-500">距离: 12公里 | 预计 25分钟</div>
                </div>
              </div>
              <div class="pb-2 space-y-2">
                <div class="flex justify-end pr-1">
                  <button @click="triggerOkToast('定位当前位置')" class="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer">🎯</button>
                </div>
                <!-- 底部高频主操作大按钮 (大拇指区) -->
                <button 
                  @click="triggerOkToast('启动导航')" 
                  class="w-full h-12 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  🚀 启动导航 (大拇指区)
                </button>
              </div>
            </div>

            <!-- 3. 功能剪裁 20/80 律 (OK) -->
            <div v-if="activeScene === 'snipping'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">极速记事</h4>
                <p class="text-[9px] text-slate-500 leading-normal">首屏直出高频功能，剪裁80%不常用高级编辑排版设置，突出录入与消费。</p>
                <!-- 极简录入流 -->
                <div class="mt-4 space-y-2">
                  <div class="p-3 bg-slate-900 border border-slate-850 rounded-xl text-[10px] text-slate-300">
                    💡 20/80法则：移动端要学会通过减少以实现增加。
                  </div>
                  <div class="p-3 bg-slate-900 border border-slate-850 rounded-xl text-[10px] text-slate-300">
                    💡 今日点子：重构移动端侧边栏。
                  </div>
                </div>
              </div>
              <button 
                @click="triggerOkToast('一键新建记事')" 
                class="w-full h-12 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                ➕ 新建记事 (极速直出)
              </button>
            </div>

            <!-- 4. “僚机”低中断心智 (OK) -->
            <div v-if="activeScene === 'sidekick'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">Linear 僚机端</h4>
                <p class="text-[9px] text-slate-500 leading-normal">不要求在手机上规划复杂的项目，只做通知查看和截图直达 Bug 收集。</p>
                <div class="mt-4 p-4 border border-dashed border-slate-700 bg-slate-900/60 rounded-xl text-center space-y-2">
                  <span class="text-2xl block">📸</span>
                  <span class="text-[9px] text-slate-400 block">点击上传应用截图</span>
                  <button 
                    @click="simulateScreenshotUpload" 
                    class="px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[9px] rounded-lg cursor-pointer"
                  >
                    模拟上传截图
                  </button>
                </div>
                <div v-if="okScreenshotData" class="mt-3 p-2.5 bg-slate-900 border border-blue-900/20 rounded-lg text-[9px] text-slate-300 space-y-1">
                  <div><strong>智能感知上下文：</strong></div>
                  <div>- 崩溃机型: iPhone 15 Pro</div>
                  <div>- 系统版本: iOS 17.4</div>
                  <div>- 截图解析成功，Bug 报告已就绪。</div>
                </div>
              </div>
              <button 
                @click="triggerOkToast('Bug任务已录入')"
                :disabled="!okScreenshotData"
                class="w-full h-12 text-white font-bold text-xs rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                :class="okScreenshotData ? 'bg-blue-600 active:scale-95' : 'bg-slate-800 text-slate-500 cursor-not-allowed'"
              >
                🚀 快速流转任务
              </button>
            </div>

            <!-- 5. 渐进披露与降维 (OK) -->
            <div v-if="activeScene === 'disclosure'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">Airbnb 预订 (规范)</h4>
                <p class="text-[9px] text-slate-500 leading-normal">采用“一屏一任务”，先确认地点，再逐级确认日期和人数，消除决策过载。</p>
                
                <div class="mt-4 space-y-2">
                  <!-- 步骤一 -->
                  <div class="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex justify-between items-center">
                    <span class="text-[9px] text-slate-400">1. 入住地点</span>
                    <span class="text-[9px] text-blue-400 font-bold">{{ bookingStep >= 1 ? '北京' : '未选择' }}</span>
                  </div>
                  <!-- 步骤二 -->
                  <div v-if="bookingStep >= 1" class="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex justify-between items-center transition-opacity">
                    <span class="text-[9px] text-slate-400">2. 入住时间</span>
                    <span class="text-[9px] text-blue-400 font-bold">{{ bookingStep >= 2 ? '07月10日 - 12日' : '待选...' }}</span>
                  </div>
                  <!-- 步骤三 -->
                  <div v-if="bookingStep >= 2" class="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex justify-between items-center transition-opacity">
                    <span class="text-[9px] text-slate-400">3. 入住人数</span>
                    <span class="text-[9px] text-blue-400 font-bold">{{ bookingStep >= 3 ? '2位成人' : '待选...' }}</span>
                  </div>
                </div>
              </div>
              <button 
                @click="nextBookingStep" 
                class="w-full h-11 bg-blue-600 text-white font-bold text-xs rounded-xl active:scale-95 transition-transform cursor-pointer"
              >
                {{ bookingStep < 3 ? '继续下一步 ➔' : '✕ 确认预订' }}
              </button>
            </div>

            <!-- 7. 多模态与无障碍 (OK) -->
            <div v-if="activeScene === 'multisensory'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">滑动支付</h4>
                <p class="text-[9px] text-slate-500 leading-normal">滑块到头时触发振动反馈与成功的物理小动效，具备多感官确认感。</p>
                <!-- 模拟滑动轨道 -->
                <div class="w-full h-11 bg-slate-900 border border-slate-800 rounded-full mt-6 relative overflow-hidden flex items-center justify-center">
                  <span class="text-[9px] text-slate-500 font-bold" v-if="!okPaid">➔➔ 右滑支付 ➔➔</span>
                  <span class="text-[9px] text-emerald-400 font-bold" v-else>✓ 支付完成 (已微振确认)</span>
                  
                  <div 
                    @touchstart="startDrag"
                    @mousedown="startDrag"
                    class="absolute left-1 top-1 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-xs cursor-grab active:cursor-grabbing text-white transition-all shadow-md"
                    :style="{ transform: `translateX(${okSliderPos}px)` }"
                  >
                    💰
                  </div>
                </div>
              </div>
              <button @click="resetOkPayment" class="w-full h-9 bg-slate-900 border border-slate-850 text-slate-400 text-[9px] rounded-lg cursor-pointer">重置状态</button>
            </div>

            <!-- 8. 高频乐观 UI (OK) -->
            <div v-if="activeScene === 'optimistic'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">收藏博文</h4>
                <p class="text-[9px] text-slate-500 leading-normal">点击瞬间改变状态，网络延迟在后台隐藏。支持测试失败自动回滚与非侵入Toast。</p>
                <div class="mt-4 p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                  <div class="text-[10px] text-slate-300 font-bold">交互设计的未来演化趋势</div>
                  <div class="flex items-center gap-4 text-slate-500">
                    <button 
                      @click="toggleOkLike" 
                      class="flex items-center gap-1.5 text-[9px] font-bold cursor-pointer"
                      :class="[likeOkState ? 'text-red-500' : 'text-slate-400']"
                    >
                      <span class="text-xs transition-transform duration-200 inline-block" :class="[likeOkAnimating ? 'scale-150 rotate-[-15deg]' : 'scale-100']">❤️</span>
                      <span>{{ likeOkCount }}</span>
                    </button>
                  </div>
                </div>
                <div class="mt-4 p-2 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1.5">
                  <div class="text-[8px] text-slate-500 uppercase tracking-wider font-bold">测试设置</div>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" v-model="simulateNetworkError" class="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 w-3 h-3" />
                    <span class="text-[9px] text-slate-300">模拟后台同步失败 (测试乐观UI回退)</span>
                  </label>
                </div>
              </div>
              
              <!-- 提示层 -->
              <div class="pb-1">
                <div v-if="okToastText" class="px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-[9px] text-slate-300 flex items-center justify-between">
                  <span>{{ okToastText }}</span>
                </div>
              </div>
            </div>

            <!-- 9. 结构预判骨架屏 (OK) -->
            <div v-if="activeScene === 'loading'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">骨架屏加载</h4>
                <p class="text-[9px] text-slate-500 leading-normal">加载时显示带呼吸渐变扫光的骨架结构，提示页面排版，缓解等待焦虑。</p>
                <button @click="refreshOkList" class="mt-3 px-3 py-1.5 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600/20 text-[9px] font-bold rounded-lg transition-all w-full text-center cursor-pointer">🔄 刷新数据 (骨架屏)</button>
                
                <div class="space-y-2 mt-4">
                  <div v-if="okLoading" class="space-y-2">
                    <div v-for="i in 2" :key="i" class="border border-slate-850 bg-slate-900/40 rounded-xl p-2.5 space-y-1.5 animate-pulse relative overflow-hidden skeleton-shimmer">
                      <div class="w-16 h-2.5 bg-slate-800 rounded"></div>
                      <div class="w-full h-2.5 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                  <div v-else class="space-y-2">
                    <div v-for="item in listData" :key="item.id" class="border border-slate-850 bg-slate-900 rounded-xl p-2.5 text-[9px] text-slate-400">
                      <strong>{{ item.author }}</strong>: {{ item.content }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 10. 预测性场景自适应 (OK) -->
            <div v-if="activeScene === 'context'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">智能预测</h4>
                <p class="text-[9px] text-slate-500 leading-normal">根据午餐时间上下文与定位，输入框下方提供一键填写的快捷大热区标签。</p>
                
                <div class="mt-4 relative">
                  <input type="text" v-model="okSearchVal" placeholder="你要去哪/你想吃什么..." class="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-[9px] text-slate-200 outline-none" />
                </div>
                <div class="mt-2 space-y-1.5">
                  <span class="text-[8px] text-slate-500 block font-bold">💡 智能猜你想去/想吃 (点击一键填入)</span>
                  <div class="flex flex-wrap gap-1.5">
                    <button @click="okSearchVal = '🍔 麦当劳西单店 (午餐首选)'" class="px-2 py-1 bg-blue-950/30 text-blue-400 border border-blue-500/20 rounded text-[8px] cursor-pointer">🍔 麦当劳 (午餐首选)</button>
                    <button @click="okSearchVal = '🏢 智能定位: 公司写字楼'" class="px-2 py-1 bg-blue-950/30 text-blue-400 border border-blue-500/20 rounded text-[8px] cursor-pointer">🏢 定位: 公司写字楼</button>
                  </div>
                </div>
              </div>
              <button @click="okSearchVal = ''" class="w-full h-9 bg-slate-900 border border-slate-850 text-slate-400 text-[9px] rounded-lg cursor-pointer">清除输入</button>
            </div>

            <!-- 11. 交互节奏与无干扰容错 (OK) -->
            <div v-if="activeScene === 'rhythm'" class="flex-1 p-4 pt-6 flex flex-col justify-between relative">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">无干扰删除 (撤销)</h4>
                <p class="text-[9px] text-slate-500 leading-normal">点击删除待办时，直接以折叠动效隐去，并滑出带撤销按钮的 Toast 倒计时，不弹窗干扰。</p>
                <div class="mt-4 space-y-2">
                  <div 
                    v-for="todo in okTodoList" 
                    :key="todo.id" 
                    class="p-2.5 bg-slate-900 border border-slate-850 rounded-xl flex justify-between items-center transition-all duration-300 overflow-hidden"
                    :style="{ height: todo.deleted ? '0px' : '36px', opacity: todo.deleted ? '0' : '1', padding: todo.deleted ? '0px' : '10px', margin: todo.deleted ? '0px' : '' }"
                  >
                    <span class="text-[9px] text-slate-300">{{ todo.text }}</span>
                    <button @click="deleteOkTodo(todo.id)" class="text-red-400 text-[9px] cursor-pointer">🗑️</button>
                  </div>
                </div>
              </div>
              
              <!-- 底部倒计时撤销栏 -->
              <div class="pb-1 h-9">
                <Transition name="toast">
                  <div v-if="todoUndoItem" class="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[8px] text-slate-300 flex justify-between items-center">
                    <span>已标记删除 ({{ undoCountdown }}s)</span>
                    <button @click="undoDeleteTodo" class="text-blue-400 font-bold cursor-pointer">撤销 (Undo)</button>
                  </div>
                </Transition>
              </div>
            </div>



            <!-- Toast 提示底层 -->
            <div class="absolute bottom-2 left-4 right-4 z-40">
              <Transition name="toast">
                <div v-if="okGlobalToast" class="px-2.5 py-1.5 bg-blue-900/90 border border-blue-500/20 text-white rounded-lg text-[9px] shadow-lg text-center">
                  {{ okGlobalToast }}
                </div>
              </Transition>
            </div>

          </div>

          <!-- 底部手势指示条 -->
          <div class="h-6 bg-slate-950 flex justify-center items-center pb-1">
            <div class="w-24 h-1 bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- ==================== 右侧：不规范设计 (FAIL) ==================== -->
      <div class="flex flex-col items-center w-full">
        <div class="flex items-center gap-2 mb-4">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">不规范对比 (Bad Practice)</span>
        </div>
        
        <!-- 模拟手机外壳 -->
        <div class="phone-wrapper relative w-[310px] h-[580px] bg-slate-900 border-[10px] border-slate-950 rounded-[40px] shadow-2xl overflow-hidden flex flex-col text-slate-100 font-sans select-none">
          <!-- 手机刘海 -->
          <div class="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
            <div class="w-3 h-3 rounded-full bg-slate-900 mr-8"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
          </div>
          <!-- 手机状态栏 -->
          <div class="h-8 bg-slate-950 flex justify-between items-end px-6 text-[10px] text-slate-400 z-20 pb-1">
            <span>12:00</span>
            <div class="flex items-center gap-1.5 pb-0.5">
              <span class="w-3 h-2 bg-slate-500/30 inline-block relative rounded-sm overflow-hidden">
                <span class="absolute left-0 bottom-0 top-0 bg-slate-300 w-4/5"></span>
              </span>
              <span class="w-4.5 h-2.5 border border-slate-500 rounded-sm p-0.5 inline-block relative">
                <span class="block h-full bg-slate-300 w-3/4 rounded-2xs"></span>
              </span>
            </div>
          </div>

          <!-- 手机内容展示区 -->
          <div class="flex-1 bg-slate-950 overflow-hidden relative flex flex-col justify-between text-left">
            
            <!-- 1. 触控容错性 (FAIL) -->
            <div v-if="activeScene === 'touch'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">通知中心</h4>
                <p class="text-[9px] text-slate-500 leading-normal">列表右侧的小图标，没有做任何热区扩展，面积只有12px且紧贴。极其难以点击，容易触发错乱。</p>
                <div class="space-y-2 mt-3">
                  <div v-for="item in 3" :key="item" class="p-2.5 bg-slate-900 border border-slate-850 rounded-xl flex justify-between items-center">
                    <span class="text-[10px] text-slate-400">系统报警事件 #0{{ item }}</span>
                    <!-- 极小点击区域，无任何 margin / padding 扩展 -->
                    <div class="flex gap-0.5">
                      <button 
                        @click="triggerFailToast(`编辑通知 #0${item}`)"
                        class="text-[9px] p-0.5 bg-slate-850 border border-slate-800 rounded cursor-pointer"
                      >
                        ✏️
                      </button>
                      <button 
                        @click="triggerFailToast(`删除通知 #0${item}`)"
                        class="text-[9px] p-0.5 bg-slate-850 border border-slate-800 rounded cursor-pointer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. 物理工效学拇指区 (FAIL) -->
            <div v-if="activeScene === 'thumb'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-xs font-bold text-slate-200 mb-1">导航设置</h4>
                  <p class="text-[9px] text-slate-500 leading-normal">核心动作被生硬地放置在屏幕最右上的“困难区”，单手握持极难触达。</p>
                </div>
                <!-- 放置在右上角的最核心操作 -->
                <button 
                  @click="triggerFailToast('右上角启动导航')" 
                  class="bg-blue-600 text-white font-bold text-[9px] px-2 py-1 rounded cursor-pointer whitespace-nowrap active:opacity-75"
                >
                  启动导航
                </button>
              </div>
              <div class="mt-4 p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                <div class="text-[9px] text-slate-400">终点：公司写字楼</div>
                <div class="text-[9px] text-slate-500">距离: 12公里 | 预计 25分钟</div>
              </div>
              <!-- 底部无任何大拇指区按钮，空置 -->
              <div class="text-center py-6 border-t border-slate-900 text-slate-650 text-[9px] italic">
                (大拇指操作区无任何核心动作)
              </div>
            </div>

            <!-- 3. 功能剪裁 20/80 律 (FAIL) -->
            <div v-if="activeScene === 'snipping'" class="flex-1 p-4 pt-6 flex flex-col justify-between overflow-y-auto">
              <div class="space-y-3">
                <h4 class="text-xs font-bold text-slate-200 mb-1">记事本高级排版 (不规范)</h4>
                <p class="text-[9px] text-slate-500 leading-normal">直接平移PC端重度复杂的富文本排版和侧栏参数，控件过多完全堵死页面。</p>
                <!-- 错综复杂的编辑器控件 -->
                <div class="p-2.5 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                  <div class="text-[9px] text-slate-400 font-bold border-b border-slate-850 pb-1">文字选项</div>
                  <div class="grid grid-cols-4 gap-1.5">
                    <button class="p-1 bg-slate-800 text-[8px] rounded text-center">B 粗体</button>
                    <button class="p-1 bg-slate-800 text-[8px] rounded text-center">I 斜体</button>
                    <button class="p-1 bg-slate-800 text-[8px] rounded text-center">U 下划线</button>
                    <button class="p-1 bg-slate-800 text-[8px] rounded text-center">S 删除线</button>
                    <button class="p-1 bg-slate-800 text-[8px] rounded text-center">X² 上标</button>
                    <button class="p-1 bg-slate-800 text-[8px] rounded text-center">X₂ 下标</button>
                    <button class="p-1 bg-slate-800 text-[8px] rounded text-center">H1 标题</button>
                    <button class="p-1 bg-slate-800 text-[8px] rounded text-center">H2 副标</button>
                  </div>
                  <div class="text-[9px] text-slate-400 font-bold border-b border-slate-850 pb-1 pt-1">高阶选项</div>
                  <div class="space-y-1">
                    <div class="flex justify-between items-center text-[8px]">
                      <span>行高设置: 1.5</span>
                      <input type="range" class="w-16 h-1" />
                    </div>
                    <div class="flex justify-between items-center text-[8px]">
                      <span>字体选择: SourceHan</span>
                      <select class="text-[8px] bg-slate-950 border border-slate-800 rounded"><option>思源黑体</option></select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. “僚机”低中断心智 (FAIL) -->
            <div v-if="activeScene === 'sidekick'" class="flex-1 p-4 pt-6 flex flex-col justify-between overflow-y-auto">
              <div class="space-y-2.5">
                <h4 class="text-xs font-bold text-slate-200 mb-1">创建 Bug 任务</h4>
                <p class="text-[9px] text-slate-500 leading-normal">未对移动场景优化。强迫单手持机用户从虚拟键盘中打字输入长篇表单项。</p>
                <div class="space-y-2">
                  <div class="space-y-0.5">
                    <label class="text-[8px] text-slate-500 block">Bug详细描述 *</label>
                    <input type="text" placeholder="手动输入崩溃位置..." class="w-full p-1.5 bg-slate-900 border border-slate-850 rounded text-[9px]" />
                  </div>
                  <div class="space-y-0.5">
                    <label class="text-[8px] text-slate-500 block">复现步骤重现 *</label>
                    <input type="text" placeholder="手动输入操作路径..." class="w-full p-1.5 bg-slate-900 border border-slate-850 rounded text-[9px]" />
                  </div>
                  <div class="space-y-0.5">
                    <label class="text-[8px] text-slate-500 block">测试设备及系统版本 *</label>
                    <input type="text" placeholder="例如 iPhone 15, iOS 17.4..." class="w-full p-1.5 bg-slate-900 border border-slate-850 rounded text-[9px]" />
                  </div>
                </div>
              </div>
              <button @click="triggerFailToast('必须完整打字录入')" class="w-full h-11 bg-blue-600 text-white font-bold text-xs rounded-xl mt-3 active:opacity-75 cursor-pointer">创建任务 (强迫文本输入)</button>
            </div>

            <!-- 5. 渐进披露与降维 (FAIL) -->
            <div v-if="activeScene === 'disclosure'" class="flex-1 p-4 pt-6 flex flex-col justify-between overflow-y-auto">
              <div class="space-y-2.5">
                <h4 class="text-xs font-bold text-slate-200 mb-1">Airbnb 预订 (不规范)</h4>
                <p class="text-[9px] text-slate-500 leading-normal">没有做页面降维和披露排序，将所有字段在窄屏里一次性铺开，导致认知负荷过重。</p>
                
                <div class="p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                  <div class="space-y-1">
                    <span class="text-[8px] text-slate-500 block">1. 目的地城市</span>
                    <input type="text" value="北京" class="w-full p-1.5 bg-slate-950 border border-slate-800 rounded text-[9px]" />
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="space-y-1">
                      <span class="text-[8px] text-slate-500 block">2. 入住日期</span>
                      <input type="text" value="07-10" class="w-full p-1.5 bg-slate-950 border border-slate-800 rounded text-[9px]" />
                    </div>
                    <div class="space-y-1">
                      <span class="text-[8px] text-slate-500 block">3. 离店日期</span>
                      <input type="text" value="07-12" class="w-full p-1.5 bg-slate-950 border border-slate-800 rounded text-[9px]" />
                    </div>
                  </div>
                  <div class="space-y-1">
                    <span class="text-[8px] text-slate-500 block">4. 入住人数</span>
                    <select class="w-full p-1.5 bg-slate-950 border border-slate-800 rounded text-[9px]"><option>2位成人</option></select>
                  </div>
                </div>
              </div>
              <button @click="triggerFailToast('一键大面积提交确认')" class="w-full h-11 bg-blue-600 text-white font-bold text-xs rounded-xl cursor-pointer">✕ 立即提交预订</button>
            </div>


            <!-- 7. 多模态与无障碍 (FAIL) -->
            <div v-if="activeScene === 'multisensory'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">滑动支付</h4>
                <p class="text-[9px] text-slate-500 leading-normal">滑块到头后界面死板卡住，顶端突然弹出一行不易察觉的小红字，无物理触觉与波纹。</p>
                <!-- 模拟无反馈滑动轨道 -->
                <div class="w-full h-11 bg-slate-900 border border-slate-800 rounded-full mt-6 relative overflow-hidden flex items-center justify-center">
                  <span class="text-[8px] text-red-500 font-bold absolute top-1" v-if="failPaid">支付已提交 (无物理感)</span>
                  <span class="text-[9px] text-slate-500 font-bold" v-else>➔➔ 右滑支付 ➔➔</span>
                  
                  <div 
                    @touchstart="startDragFail"
                    @mousedown="startDragFail"
                    class="absolute left-1 top-1 w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-xs cursor-grab active:cursor-grabbing text-white transition-all shadow-md"
                    :style="{ transform: `translateX(${failSliderPos}px)` }"
                  >
                    💰
                  </div>
                </div>
              </div>
              <button @click="resetFailPayment" class="w-full h-9 bg-slate-900 border border-slate-850 text-slate-400 text-[9px] rounded-lg cursor-pointer">重置状态</button>
            </div>

            <!-- 8. 高频乐观 UI (FAIL) -->
            <div v-if="activeScene === 'optimistic'" class="flex-1 p-4 pt-6 flex flex-col justify-between relative">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">收藏博文</h4>
                <p class="text-[9px] text-slate-500 leading-normal">没有乐观UI，点击点赞按钮后直接弹现全局 Loading 强制等待网络同步，直到完成。</p>
                <div class="mt-4 p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                  <div class="text-[10px] text-slate-300 font-bold">交互设计的未来演化趋势</div>
                  <div class="flex items-center gap-4 text-slate-500">
                    <button 
                      @click="toggleFailLike" 
                      class="flex items-center gap-1.5 text-[9px] font-bold cursor-pointer"
                      :class="[likeFailState ? 'text-red-500' : 'text-slate-400']"
                    >
                      <span>❤️</span>
                      <span>{{ likeFailCount }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 同步阻断 Loading -->
              <div v-if="sceneTwoSimulating" class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
                <div class="w-7 h-7 border-2 border-slate-700 border-t-rose-500 rounded-full animate-spin mb-2"></div>
                <div class="text-[8px] text-slate-450">与网络端同步点赞...</div>
              </div>

              <div class="pb-1">
                <div v-if="failToastText" class="px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-[9px] text-slate-300 flex items-center justify-between">
                  <span>{{ failToastText }}</span>
                </div>
              </div>
            </div>

            <!-- 9. 结构预判骨架屏 (FAIL) -->
            <div v-if="activeScene === 'loading'" class="flex-1 p-4 pt-6 flex flex-col justify-between relative">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">菊花加载</h4>
                <p class="text-[9px] text-slate-500 leading-normal">加载时只在页面中央放置一个冰冷的旋转 Spinner，周边一片白屏，增加等待焦虑。</p>
                <button @click="refreshFailList" class="mt-3 px-3 py-1.5 bg-rose-600/10 border border-rose-500/30 text-rose-400 hover:bg-rose-600/20 text-[9px] font-bold rounded-lg transition-all w-full text-center cursor-pointer">🔄 刷新数据 (菊花Loading)</button>
                
                <div class="space-y-2 mt-4 h-40 relative">
                  <!-- 菊花等待 -->
                  <div v-if="failLoading" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-20">
                    <div class="w-6 h-6 border-2 border-slate-800 border-t-rose-500 rounded-full animate-spin mb-2"></div>
                    <span class="text-[7px] text-slate-500">正在载入数据...</span>
                  </div>
                  
                  <div v-if="!failLoading && listDataReady" class="space-y-2">
                    <div v-for="item in listData" :key="item.id" class="border border-slate-850 bg-slate-900 rounded-xl p-2.5 text-[9px] text-slate-400">
                      <strong>{{ item.author }}</strong>: {{ item.content }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 10. 预测性场景自适应 (FAIL) -->
            <div v-if="activeScene === 'context'" class="flex-1 p-4 pt-6 flex flex-col justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">智能预测</h4>
                <p class="text-[9px] text-slate-500 leading-normal">系统无任何情境预测。用户被迫点击输入框，调出系统键盘手动录入大段冗长地址。</p>
                
                <div class="mt-4">
                  <input type="text" v-model="failSearchVal" placeholder="手动打字输入地址..." class="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-[9px] text-slate-300 outline-none" />
                </div>
                <div class="mt-3 p-3 bg-slate-900/60 border border-slate-900 rounded text-[9px] text-slate-500 italic">
                  (无智能联想或根据时间/物理传感器进行的 Tag 快捷推荐)
                </div>
              </div>
              <button @click="triggerFailToast('必须点击并依靠手机键盘打字')" class="w-full h-9 bg-blue-600 text-white text-[9px] font-bold rounded-lg cursor-pointer">调出键盘录入</button>
            </div>

            <!-- 11. 交互节奏与无干扰容错 (FAIL) -->
            <div v-if="activeScene === 'rhythm'" class="flex-1 p-4 pt-6 flex flex-col justify-between relative text-left">
              <div>
                <h4 class="text-xs font-bold text-slate-200 mb-1">阻断确认弹窗</h4>
                <p class="text-[9px] text-slate-500 leading-normal">删除日程时立即弹出阻断性模态对话框确认，强行破坏用户原本连续的操作流。</p>
                <div class="mt-4 space-y-2">
                  <div 
                    v-for="todo in failTodoList" 
                    :key="todo.id" 
                    class="p-2.5 bg-slate-900 border border-slate-850 rounded-xl flex justify-between items-center"
                  >
                    <span class="text-[9px] text-slate-400">{{ todo.text }}</span>
                    <button @click="deleteFailTodo" class="text-red-400 text-[9px] cursor-pointer">🗑️</button>
                  </div>
                </div>
              </div>

              <!-- 阻断性弹窗 -->
              <div v-if="failTodoModalOpen" class="absolute inset-0 bg-black/60 flex items-center justify-center z-40 p-4">
                <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 w-full text-center space-y-3">
                  <div class="text-[10px] font-bold text-slate-200">警告！确定删除该待办？</div>
                  <p class="text-[8px] text-slate-500">删除后不可撤销，请谨慎处理。</p>
                  <div class="flex gap-2">
                    <button @click="failTodoModalOpen = false" class="flex-1 py-1.5 bg-slate-800 text-[9px] rounded text-slate-400 cursor-pointer">取消</button>
                    <button @click="confirmDeleteFailTodo" class="flex-1 py-1.5 bg-red-650 text-white text-[9px] rounded font-bold cursor-pointer">确定删除</button>
                  </div>
                </div>
              </div>
            </div>



            <!-- Toast 提示底层 -->
            <div class="absolute bottom-2 left-4 right-4 z-40">
              <Transition name="toast">
                <div v-if="failGlobalToast" class="px-2.5 py-1.5 bg-red-900/90 border border-red-500/20 text-white rounded-lg text-[9px] shadow-lg text-center">
                  {{ failGlobalToast }}
                </div>
              </Transition>
            </div>

          </div>

          <!-- 底部手势指示条 -->
          <div class="h-6 bg-slate-950 flex justify-center items-center pb-1">
            <div class="w-24 h-1 bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 10大交互场景定义
const scenes = [
  { id: 'touch', num: 1, icon: '🎯', title: '触控容错性 (Touch Target)' },
  { id: 'thumb', num: 2, icon: '🖐️', title: '物理工效学拇指区 (Thumb Zone)' },
  { id: 'snipping', num: 3, icon: '✂️', title: '功能剪裁 20/80 律 (20/80 Snipping)' },
  { id: 'sidekick', num: 4, icon: '✈️', title: '“僚机”低中断心智 (Sidekick)' },
  { id: 'disclosure', num: 5, icon: '👁️', title: '渐进披露与降维 (Progressive Disclosure)' },
  { id: 'multisensory', num: 6, icon: '🔊', title: '多模态与无障碍 (Multi-Sensory)' },
  { id: 'optimistic', num: 7, icon: '⚡', title: '高频乐观 UI (Optimistic UI)' },
  { id: 'loading', num: 8, icon: '⏱️', title: '结构预判骨架屏 (Skeleton & Pre-fetch)' },
  { id: 'context', num: 9, icon: '🧠', title: '预测性场景自适应 (Context-Aware)' },
  { id: 'rhythm', num: 10, icon: '🎵', title: '交互节奏与无干扰容错 (Undo over Confirm)' }
];

const activeScene = ref('touch');

// 全局 Toast
const okGlobalToast = ref('');
const failGlobalToast = ref('');

const triggerOkToast = (msg) => {
  okGlobalToast.value = `[操作成功] ${msg}`;
  setTimeout(() => {
    okGlobalToast.value = '';
  }, 2000);
};

const triggerFailToast = (msg) => {
  failGlobalToast.value = `[操作警告/误触] ${msg}`;
  setTimeout(() => {
    failGlobalToast.value = '';
  }, 2000);
};

// 准则四：僚机 (Linear)
const okScreenshotData = ref(false);
const simulateScreenshotUpload = () => {
  okScreenshotData.value = true;
  triggerOkToast('截图已接收，智能解析中...');
};

// 准则五：渐进披露 (Airbnb)
const bookingStep = ref(0);
const nextBookingStep = () => {
  if (bookingStep.value < 3) {
    bookingStep.value++;
    if (bookingStep.value === 1) triggerOkToast('目的地设定：北京');
    if (bookingStep.value === 2) triggerOkToast('日期已选：07.10 - 07.12');
    if (bookingStep.value === 3) triggerOkToast('人数已选：2位');
  } else {
    bookingStep.value = 0;
    triggerOkToast('订单已确认');
  }
};



// 准则七：多模态 (Slider)
const okSliderPos = ref(0);
const okPaid = ref(false);
const isDraggingOk = ref(false);

const failSliderPos = ref(0);
const failPaid = ref(false);
const isDraggingFail = ref(false);

const startDrag = (e) => {
  isDraggingOk.value = true;
  const startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  
  const moveHandler = (moveEv) => {
    if (!isDraggingOk.value) return;
    const currentX = moveEv.type === 'touchmove' ? moveEv.touches[0].clientX : moveEv.clientX;
    let diff = currentX - startX;
    if (diff < 0) diff = 0;
    if (diff > 230) diff = 230; // 限制滑道右端边界
    okSliderPos.value = diff;
  };
  
  const endHandler = () => {
    isDraggingOk.value = false;
    if (okSliderPos.value >= 200) {
      okSliderPos.value = 230;
      okPaid.value = true;
      triggerOkToast('💰 滑动支付成功! 成功触发系统触觉微振 [100ms]');
    } else {
      okSliderPos.value = 0;
    }
    window.removeEventListener('mousemove', moveHandler);
    window.removeEventListener('mouseup', endHandler);
    window.removeEventListener('touchmove', moveHandler);
    window.removeEventListener('touchend', endHandler);
  };

  window.addEventListener('mousemove', moveHandler);
  window.addEventListener('mouseup', endHandler);
  window.addEventListener('touchmove', moveHandler, { passive: true });
  window.addEventListener('touchend', endHandler);
};

const resetOkPayment = () => {
  okSliderPos.value = 0;
  okPaid.value = false;
};

// 不规范滑动
const startDragFail = (e) => {
  isDraggingFail.value = true;
  const startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  
  const moveHandler = (moveEv) => {
    if (!isDraggingFail.value) return;
    const currentX = moveEv.type === 'touchmove' ? moveEv.touches[0].clientX : moveEv.clientX;
    let diff = currentX - startX;
    if (diff < 0) diff = 0;
    if (diff > 230) diff = 230;
    failSliderPos.value = diff;
  };
  
  const endHandler = () => {
    isDraggingFail.value = false;
    if (failSliderPos.value >= 200) {
      failSliderPos.value = 230;
      failPaid.value = true;
      triggerFailToast('无动效无振动，生硬定格。');
    } else {
      failSliderPos.value = 0;
    }
    window.removeEventListener('mousemove', moveHandler);
    window.removeEventListener('mouseup', endHandler);
    window.removeEventListener('touchmove', moveHandler);
    window.removeEventListener('touchend', endHandler);
  };

  window.addEventListener('mousemove', moveHandler);
  window.addEventListener('mouseup', endHandler);
  window.addEventListener('touchmove', moveHandler, { passive: true });
  window.addEventListener('touchend', endHandler);
};

const resetFailPayment = () => {
  failSliderPos.value = 0;
  failPaid.value = false;
};

// 准则八：乐观 UI (Like)
const simulateNetworkError = ref(false);
const sceneTwoSimulating = ref(false);

const likeOkState = ref(false);
const likeOkCount = ref(99);
const likeOkAnimating = ref(false);
const okToastText = ref('');

const likeFailState = ref(false);
const likeFailCount = ref(99);
const failToastText = ref('');

const toggleOkLike = () => {
  // 乐观状态更新
  likeOkState.value = !likeOkState.value;
  likeOkCount.value = likeOkState.value ? 100 : 99;
  
  likeOkAnimating.value = true;
  setTimeout(() => { likeOkAnimating.value = false; }, 200);

  const isError = simulateNetworkError.value;
  setTimeout(() => {
    if (isError) {
      // 网络同步失败，回滚
      likeOkState.value = !likeOkState.value;
      likeOkCount.value = likeOkState.value ? 100 : 99;
      okToastText.value = '⚠️ 后台失败，本地数据已自动优雅回退';
      setTimeout(() => { okToastText.value = ''; }, 2500);
    }
  }, 1500);
};

const toggleFailLike = () => {
  if (sceneTwoSimulating.value) return;
  sceneTwoSimulating.value = true;
  const isError = simulateNetworkError.value;

  setTimeout(() => {
    sceneTwoSimulating.value = false;
    if (isError) {
      failToastText.value = '❌ 网络故障，操作失败';
      setTimeout(() => { failToastText.value = ''; }, 2000);
    } else {
      likeFailState.value = !likeFailState.value;
      likeFailCount.value = likeFailState.value ? 100 : 99;
    }
  }, 1800);
};

// 准则九：加载骨架屏
const okLoading = ref(false);
const failLoading = ref(false);
const listDataReady = ref(false);

const listData = [
  { id: 1, author: 'Linear Sidekick', content: '移动端做桌面端的Sidekick，截图直接流转。' },
  { id: 2, author: 'Notion 移动端', content: '舍弃80%高级功能，将首屏置为最近编辑与快速记录。' }
];

const refreshOkList = () => {
  okLoading.value = true;
  setTimeout(() => { okLoading.value = false; }, 1500);
};

const refreshFailList = () => {
  failLoading.value = true;
  listDataReady.value = false;
  setTimeout(() => {
    failLoading.value = false;
    listDataReady.value = true;
  }, 1800);
};

// 准则十：上下文感知
const okSearchVal = ref('');
const failSearchVal = ref('');

// 准则十一：交互节奏与撤销待办
const okTodoList = ref([
  { id: 1, text: '📅 上午10点 智慧防汛研讨会', deleted: false },
  { id: 2, text: '🚀 编写移动端设计规范', deleted: false }
]);
const todoUndoItem = ref(null);
const undoCountdown = ref(3);
let undoTimer = null;

const deleteOkTodo = (id) => {
  const item = okTodoList.value.find(t => t.id === id);
  if (item) {
    item.deleted = true;
    todoUndoItem.value = id;
    undoCountdown.value = 3;
    
    if (undoTimer) clearInterval(undoTimer);
    undoTimer = setInterval(() => {
      undoCountdown.value--;
      if (undoCountdown.value <= 0) {
        clearInterval(undoTimer);
        todoUndoItem.value = null;
        // 执行真实删除操作
        okTodoList.value = okTodoList.value.filter(t => t.id !== id);
      }
    }, 1000);
  }
};

const undoDeleteTodo = () => {
  if (undoTimer) clearInterval(undoTimer);
  if (todoUndoItem.value) {
    const item = okTodoList.value.find(t => t.id === todoUndoItem.value);
    if (item) item.deleted = false;
    todoUndoItem.value = null;
    triggerOkToast('待办项已成功撤销还原');
  }
};

const failTodoList = ref([
  { id: 1, text: '📅 上午10点 智慧防汛研讨会' }
]);
const failTodoModalOpen = ref(false);
const deleteFailTodo = () => {
  failTodoModalOpen.value = true;
};
const confirmDeleteFailTodo = () => {
  failTodoModalOpen.value = false;
  failTodoList.value = [];
  triggerFailToast('日程已删除 (无撤销选项)');
};


</script>

<style scoped>
/* 弹出卡片滑入滑出动画 */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
}

/* Toast 的淡入淡出过渡效果 */
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 呼吸扫光扫过骨架屏 CSS 实现 */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-shimmer::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.12) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s ease-in-out infinite;
  content: '';
}
</style>
