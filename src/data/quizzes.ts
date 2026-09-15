export interface LessonQuiz {
  prompt: string;
  options: Array<{ value: string; label: string }>;
  answers: string[];
  explanation: string;
}

export const quizzes: Record<string, LessonQuiz> = {
  'social-entertainment-landscape': {
    prompt: '做全球社交娱乐类别地图时，哪一组证据最先应该分开记录？',
    options: [
      { value: 'public', label: '公开产品表面、内部数据、访谈和运营假设' },
      { value: 'ranking', label: '只按应用商店排名推断全部经营结论' },
      { value: 'identity', label: '把不同公司与应用商店主体直接视为同一实体' },
    ],
    answers: ['public'],
    explanation: '先分层证据并保留实体差异，才能避免把公开描述或身份线索误当成内部事实。',
  },
  'sugo-product-ecosystem': {
    prompt: '画 SUGO 用户旅程时，哪项做法最能保护证据质量？',
    options: [
      { value: 'surface', label: '逐个记录可见产品面，并把未知的后台机制列成问题' },
      { value: 'payout', label: '从商店文案推断主播结算和公会分成' },
      { value: 'persona', label: '用单一用户画像代替用户、主播、房间等角色' },
    ],
    answers: ['surface'],
    explanation: '公开页面可以支持产品表面描述，但供给关系、结算和推荐机制需要内部数据或访谈交叉验证。',
  },
  'metrics-virtual-economy': {
    prompt: '一个可复现的指标定义至少要包含哪些字段？',
    options: [
      { value: 'grain', label: '事件、分母、时间窗、切片、排除条件和负责人' },
      { value: 'number', label: '一个看起来精确但没有来源的目标数字' },
      { value: 'label', label: '只写“活跃”“留存”等指标名称' },
    ],
    answers: ['grain'],
    explanation: '指标契约要锁定 grain（粒度）与分母；缺少这些字段，数字无法比较也不能稳定复算。',
  },
  'egypt-market-users': {
    prompt: '如何使用 Egypt Digital 2026 的数字而不把它们误当成产品用户数？',
    options: [
      { value: 'reach', label: '标注晚 2025 估算、ad reach 或 social identities，并提出内部验证请求' },
      { value: 'mau', label: '把社交媒体身份估算直接写成 SUGO MAU' },
      { value: 'average', label: '用全国平均替代城市、性别、渠道和设备切片' },
    ],
    answers: ['reach'],
    explanation: 'DataReportal 的估算是市场背景，不是 SUGO 的 DAU/MAU；产品基线必须回到内部数据。',
  },
  'language-culture-localization': {
    prompt: '处理埃及本地化文案时，哪个顺序最稳妥？',
    options: [
      { value: 'review', label: '先区分 MSA、埃及阿拉伯语、English、Arabizi，再做 native review 与 RTL QA' },
      { value: 'literal', label: '把中文逐字翻译成阿拉伯语后直接上线' },
      { value: 'dialect', label: '用一个方言版本覆盖法律、安全、账单和生命周期文案' },
    ],
    answers: ['review'],
    explanation: '不同场景需要不同语言层级；安全、法律、账单文本尤其需要可追溯的本地审核。',
  },
  'growth-relationship-retention': {
    prompt: '增长实验的第一条护栏应该是什么？',
    options: [
      { value: 'meaningful', label: '定义 time to first meaningful interaction，并同时观察安全信号' },
      { value: 'install', label: '只追求安装量，不记录首个房间或关系质量' },
      { value: 'claim', label: '用全国社交媒体规模推导 SUGO 的留存目标' },
    ],
    answers: ['meaningful'],
    explanation: '增长要和可感知的有效互动及安全指标绑定；安装量本身不能说明关系是否建立。',
  },
  'creator-room-supply': {
    prompt: '供给冷启动时，什么组合最适合先做成可观察的操作？',
    options: [
      { value: 'reliable', label: '可靠主播、明确排班、房间质检和安全升级路径' },
      { value: 'volume', label: '先追求主播数量，不关心房间是否按时开播' },
      { value: 'payout', label: '未经内部确认就承诺现金流出或公会佣金' },
    ],
    answers: ['reliable'],
    explanation: '供给的可用性与安全质量先于数量；结算、佣金和分层规则都是待验证机制。',
  },
  'monetization-risk-controls': {
    prompt: '虚拟商品经营诊断中，哪项必须保留为空或待核实？',
    options: [
      { value: 'ratio', label: 'coin/diamond 比例、付费聊天机制和主播 cash-out 规则' },
      { value: 'billing', label: '应用商店数字商品支付与退款政策入口' },
      { value: 'signals', label: '退款、chargeback、异常集中度等风险信号定义' },
    ],
    answers: ['ratio'],
    explanation: '公开商店政策不披露产品内部经济参数；不能编造比例、结算或付费路径。',
  },
  'trust-safety-regulation': {
    prompt: '安全事件升级矩阵的最小闭环是什么？',
    options: [
      { value: 'triage', label: '分类、证据保全、负责人、时限、升级与复盘' },
      { value: 'ban', label: '所有报告都立即永久封禁且不保留申诉路径' },
      { value: 'law', label: '把公开法律材料当作对 SUGO 适用性的最终法律意见' },
    ],
    answers: ['triage'],
    explanation: '事件流程需要可审计的处置链路；法律适用和平台执行仍需当地专业意见与内部确认。',
  },
  'management-data-collaboration': {
    prompt: '向数据团队提出一条可靠的 SQL/BI 需求时，哪项不可缺少？',
    options: [
      { value: 'grain', label: '问题、指标 grain、字段来源、时间窗、切片和验收样例' },
      { value: 'query', label: '一段没有业务问题或数据字典的复杂 SQL' },
      { value: 'dashboard', label: '先做漂亮 Dashboard，再决定口径和负责人' },
    ],
    answers: ['grain'],
    explanation: '经营协作从问题和口径开始；SQL 是可复现的表达方式，不是替代指标契约的装饰。',
  },
  'ninety-day-capstone': {
    prompt: 'Day 31–90 方案怎样避免伪造目标？',
    options: [
      { value: 'baseline', label: '写清 baseline 或 baseline-request，目标采用内部确认的方法' },
      { value: 'invent', label: '先填一个精确增长百分比让方案看起来完整' },
      { value: 'priorities', label: '列出超过三个优先事项并让团队同时启动' },
    ],
    answers: ['baseline'],
    explanation: '没有内部基线时保留 pending，并写清取数、目标设定和停止条件，方案仍然可执行。',
  },
};
