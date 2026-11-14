/* M06 v0.1 processed-result preview, 2026-10-29. Ranking names and metric pairs are business-confirmed.
 * BOM: existing rank-card/rank-head/rank-row (project); C02 text-button-24
 * references/components.md section 2; icon-shixinjiantou-you (library-index);
 * existing embedded tokens CT1/CT4/CF3/CI1/CL1/CL2, font-num, s-*, r-16.
 * Existing 750px page shell, font assets and other modules remain unchanged.
 */
(() => {
  const style = document.createElement('style');
  style.id = 'm06-ranking-layout-style';
  style.textContent = `
    #metricContent .rank-card { cursor:default; box-shadow:none; border-radius:var(--r-16); }
    #metricContent .rank-card .card-body { padding:var(--s-20); }
    #metricContent .m06-heading { display:flex; align-items:center; gap:var(--s-16); padding-bottom:var(--s-12); }
    #metricContent .m06-heading h3 { margin:0; color:var(--CT1); font-size:28px; line-height:42px; font-weight:600; }
    #metricContent .m06-rules { flex-shrink:0; border:0; border-left:1px solid var(--CL1); padding:0 12px; min-height:52px; background:transparent; color:var(--CF3); font:500 24px/36px var(--font-sans); cursor:pointer; }
    #metricContent .m06-rule-note { margin:0 0 var(--s-12); color:var(--CT4); font-size:24px; line-height:36px; }
    #metricContent .m06-rule-note[hidden] { display:none; }
    #metricContent .rank-head, #metricContent .rank-row { grid-template-columns:minmax(0,1fr) 148px 148px; gap:var(--s-16); }
    #metricContent .rank-head { font-size:24px; line-height:36px; }
    #metricContent .rank-head span { text-align:right; }
    #metricContent .rank-head span:first-child { text-align:left; }
    #metricContent .rank-row { min-height:96px; }
    #metricContent .rank-name strong { font-size:28px; line-height:42px; font-weight:500; overflow-wrap:anywhere; }
    #metricContent .rank-value { text-align:right; font-family:var(--font-num); font-variant-numeric:tabular-nums; font-size:28px; line-height:28px; }
    #metricContent .m06-more { display:flex; justify-content:center; align-items:center; gap:0; width:100%; min-height:60px; padding:0; border:0; border-top:1px solid var(--CL2); background:transparent; color:var(--CT1); font:500 24px/36px var(--font-sans); cursor:pointer; }
    #metricContent .m06-more .iconfont { font-size:24px; color:var(--CI1); }
    #metricContent .m06-more:focus-visible, #metricContent .m06-rules:focus-visible { outline:2px solid var(--CF3); outline-offset:2px; }
    .subpage[data-detail-key^="m06-rank-"] .subpage-scroll { padding:0; background:var(--CB2); }
    .subpage[data-detail-key^="m06-rank-"] .detail-cta { display:none; }
    .m06-rank-summary { padding:var(--s-20) var(--s-24); border-bottom:1px solid var(--CL1); background:var(--CB1); }
    .m06-rank-summary strong { display:block; color:var(--CT1); font-size:28px; line-height:42px; font-weight:600; }
    .m06-rank-summary p { margin:var(--s-8) 0 0; color:var(--CT3); font-size:24px; line-height:36px; }
    .m06-rank-summary-meta { display:flex; justify-content:space-between; gap:var(--s-16); margin-top:var(--s-12); color:var(--CT4); font-size:20px; line-height:30px; }
    .m06-rank-table { margin-top:var(--s-16); border-top:1px solid var(--CL1); border-bottom:1px solid var(--CL1); background:var(--CB1); }
    .m06-rank-table-head, .m06-rank-table-row { display:grid; grid-template-columns:minmax(0,1fr) 156px 156px; gap:var(--s-12); align-items:center; padding:0 var(--s-24); }
    .m06-rank-table-head { position:sticky; z-index:1; top:0; min-height:72px; border-bottom:1px solid var(--CL1); color:var(--CT4); background:var(--CB1); font-size:24px; line-height:36px; }
    .m06-rank-table-head > span { text-align:left; }
    .m06-rank-sort { display:flex; align-items:center; justify-content:flex-end; gap:var(--s-4); min-height:48px; padding:0; border:0; background:transparent; color:var(--CT4); font:500 24px/36px var(--font-sans); cursor:pointer; }
    .m06-rank-sort .iconfont { opacity:0; color:var(--CF3); font-size:20px; transition:transform .18s ease; }
    .m06-rank-sort.is-active { color:var(--CF3); }
    .m06-rank-sort.is-active .iconfont { opacity:1; }
    .m06-rank-sort.is-desc .iconfont { transform:rotate(90deg); }
    .m06-rank-sort.is-asc .iconfont { transform:rotate(-90deg); }
    .m06-rank-sort:focus-visible { outline:2px solid var(--CF3); outline-offset:2px; border-radius:var(--r-8); }
    .m06-rank-table-row { min-height:112px; border-bottom:1px solid var(--CL2); }
    .m06-rank-table-row:last-child { border-bottom:0; }
    .m06-rank-fund { min-width:0; }
    .m06-rank-fund strong, .m06-rank-fund span { display:block; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
    .m06-rank-fund strong { color:var(--CT1); font-size:28px; line-height:42px; font-weight:500; }
    .m06-rank-fund span { margin-top:var(--s-4); color:var(--CT4); font-size:20px; line-height:30px; }
    .m06-rank-cell { color:var(--CT1); font-family:var(--font-num); font-variant-numeric:tabular-nums; font-size:28px; line-height:32px; font-weight:500; text-align:right; }
    .m06-rank-cell.is-rise { color:var(--CS1); }
    .m06-rank-risk { margin:var(--s-16) var(--s-24) var(--s-24); color:var(--CT4); font-size:20px; line-height:30px; }

    #metricContent .rank-value.is-rise { color:var(--CS1); }
    #metricContent .rank-value.is-fall, .m06-rank-cell.is-fall { color:var(--CS2); }
    .m06-demo-note { margin:0; padding:var(--s-12) var(--s-24); color:var(--CT4); font:400 20px/30px var(--font-sans); }
    .m06-state { padding:var(--s-32) var(--s-24); text-align:center; color:var(--CT4); font:400 24px/36px var(--font-sans); }
    .m06-state p { margin:0; }
    .m06-data-date { margin:var(--s-12) 0; color:var(--CT4); font:400 20px/30px var(--font-sans); }
    .m06-state.is-stale { padding:var(--s-12) var(--s-24); text-align:left; }
    .m06-rank-summary-meta { flex-wrap:wrap; }
    .m06-rank-sort span { overflow-wrap:anywhere; }
    .m06-rank-sort .iconfont { flex-shrink:0; }

/* Guojin C04: title-tab-bar.html .pillfix / .pill.pM, scoped to M06. */
/* The old leadership shell's overflow:hidden traps both sticky rows and can
   accumulate a hidden focus-scroll offset. Use the actual app scrollport. */
.tab-module:has(> [data-panel="metric"].is-active) { overflow:visible; }
/* Every grid boundary must allow shrinking. An auto track otherwise adopts the
   17-tab intrinsic width, moving both "全部" and numeric columns off-screen. */
.tab-module .tab-content[data-panel="metric"] { min-width:0; max-width:100%; grid-template-columns:minmax(0,1fr); }
#metricContent { min-width:0; width:100%; max-width:100%; grid-template-columns:minmax(0,1fr); }
#metricContent [data-m06-ranking-catalog] { display:flex; flex-direction:column; gap:var(--s-16); min-width:0; width:100%; max-width:100%; }
#metricContent .m06-navigation { display:grid; grid-template-columns:minmax(0,1fr) 112px; align-items:center; min-width:0; width:100%; max-width:100%; background:var(--CB1); border-radius:var(--r-16); padding:var(--s-8) 0; }
#metricContent .m06-navigation { position:sticky; top:var(--m06-main-tabs-height,100px); z-index:5; }
#metricContent .pillfix { display:flex; align-items:center; gap:16px; padding:0 16px 0 24px; overflow-x:auto; flex:1; min-width:0; scrollbar-width:none; -ms-overflow-style:none; overscroll-behavior-x:contain; touch-action:pan-x pan-y; cursor:grab; }
#metricContent .pillfix::-webkit-scrollbar { display:none; }
#metricContent .pillfix.is-dragging { cursor:grabbing; user-select:none; }
#metricContent .pill { display:inline-flex; align-items:center; justify-content:center; white-space:nowrap; flex:0 0 auto; border:0; font-family:var(--font-sans); cursor:pointer; }
#metricContent .pM { padding:8px 24px; border-radius:36px; font-size:28px; line-height:44px; }
#metricContent .pM.sel { background:var(--CB4); color:var(--CP0); font-weight:500; }
#metricContent .pM.un { background:var(--CB2); color:var(--CT4); font-weight:400; }
#metricContent .m06-all { width:112px; min-width:112px; min-height:88px; padding:0 var(--s-16); border:0; border-left:1px solid var(--CL1); background:var(--CB1); color:var(--CT1); font:500 28px/42px var(--font-sans); cursor:pointer; }
#metricContent .m06-navigation button:focus-visible, .m06-selector button:focus-visible { outline:2px solid var(--CF3); outline-offset:-4px; }
#metricContent .rank-head { min-height:88px; align-items:center; }
#metricContent .rank-head span { min-width:0; overflow-wrap:anywhere; }
#metricContent .m06-preview, #metricContent .rank-card, #metricContent .card-body { min-width:0; width:100%; max-width:100%; box-sizing:border-box; }
.m06-selector { position:absolute; inset:0; z-index:180; display:flex; align-items:flex-end; background:var(--CB19); }
.m06-selector[hidden] { display:none; }
.m06-selector-dialog { display:flex; flex-direction:column; width:100%; max-height:calc(100% - 176px); height:1120px; border-radius:var(--r-32) var(--r-32) 0 0; background:var(--CB1); overflow:hidden; color:var(--CT1); }
.m06-selector-head { flex:0 0 112px; display:grid; grid-template-columns:112px 1fr 112px; align-items:center; padding:0 var(--s-24); border-bottom:1px solid var(--CL1); }
.m06-selector-head h2 { grid-column:2; margin:0; text-align:center; font:600 36px/54px var(--font-sans); }
.m06-selector-close { grid-column:3; border:0; background:transparent; min-height:88px; padding:0; color:var(--CT4); font:400 28px/42px var(--font-sans); cursor:pointer; }
.m06-selector-body { flex:1; overflow-y:auto; min-height:0; overscroll-behavior:contain; display:flex; flex-direction:column; gap:var(--s-32); padding:var(--s-24); }
.m06-selector-footer { flex:0 0 auto; display:flex; flex-direction:column; gap:var(--s-16); padding:var(--s-16) var(--s-24) max(68px,env(safe-area-inset-bottom)); border-top:1px solid var(--CL1); background:var(--CB1); }
.m06-selector-status { margin:0; text-align:center; color:var(--CT4); font:400 24px/36px var(--font-sans); }
.m06-selector-total { font-family:var(--font-num); font-variant-numeric:tabular-nums; }
/* C01 button-深色主-XL: 92 / 36 / 46, components.md section 1. */
.m06-selector-confirm { height:92px; width:100%; border:0; border-radius:46px; padding:0 var(--s-24); background:var(--CN1); color:var(--CT6); font:500 36px/54px var(--font-sans); cursor:pointer; }
.m06-selector-confirm:active { background:var(--CN2); }
.m06-selector-confirm:disabled { opacity:.3; cursor:not-allowed; }
.m06-selector-group h3 { display:flex; align-items:center; justify-content:space-between; margin:0 0 var(--s-16); color:var(--CT1); font:500 32px/48px var(--font-sans); }
.m06-selector-count { color:var(--CT4); font:400 24px/36px var(--font-num); font-variant-numeric:tabular-nums; }
.m06-selector-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:var(--s-16); }
.m06-selector-option { display:flex; align-items:center; justify-content:space-between; gap:var(--s-8); min-height:96px; padding:var(--s-16) var(--s-20); border:1px solid var(--CL1); border-radius:var(--r-16); background:var(--CB2); color:var(--CT1); text-align:left; font:400 28px/42px var(--font-sans); cursor:pointer; }
.m06-selector-option[aria-pressed="true"] { border-color:var(--CL3); background:var(--CB4); color:var(--CP0); font-weight:500; }
/* Guojin C08: radio-checkbox.html exact listtick variant and SVG path. */
.m06-selector .listtick { width:40px; height:40px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex:0 0 auto; }
.m06-selector .listtick svg { display:none; color:var(--CF1); }
.m06-selector .listtick.on svg { display:block; }
/* BOM: reuse .m06-selector / dialog / head / close / body from original-navigation.css.
   Header action: guojin components.md Navigation secondary regular, 28/42 CT1.
   Existing fonts, CB19 overlay, CB1 surface, r-32 corners and s-24 spacing reused. */
.subpage.is-m06-ranking .subpage-head { grid-template-columns:88px minmax(0,1fr) 88px; flex-shrink:0; }
.subpage.is-m06-ranking #subpageMore { width:88px; min-height:60px; height:60px; padding:0 12px; color:var(--CT1); font:400 28px/42px var(--font-sans); letter-spacing:0; white-space:nowrap; }
.subpage.is-m06-ranking .m06-rank-summary { padding:var(--s-12) var(--s-24); }
.subpage.is-m06-ranking .m06-rank-summary-meta { margin:0; align-items:center; }
.subpage.is-m06-ranking .m06-rank-summary .m06-data-date { margin:0; font:400 20px/30px var(--font-sans); }
.m06-rank-order { margin:var(--s-8) 0 0; color:var(--CT4); font:400 20px/30px var(--font-sans); }
#m06-rule-sheet .m06-rule-dialog { height:auto; max-height:calc(100% - 176px); }
#m06-rule-sheet .m06-rule-body { flex:0 1 auto; padding-bottom:max(68px,env(safe-area-inset-bottom)); }
#m06-rule-sheet .m06-rule-body h3 { margin:0; font:500 28px/42px var(--font-sans); }
#m06-rule-sheet .m06-rule-body p { margin:0; color:var(--CT3); font:400 28px/42px var(--font-sans); overflow-wrap:anywhere; }

.subpage.is-m06-ranking .m06-rank-table { margin-top:0; }
.subpage.is-m06-ranking .m06-rank-order { margin:0; }
  `;
  document.head.append(style);
  const content = document.getElementById('metricContent');
  if (!content) return;

  const m06MetricProfiles = {
    return1y:{values:[26.83,22.56,19.74,17.32,15.68,13.94,12.71,11.46],format:value=>'+' + value.toFixed(2) + '%'},
    return6m:{values:[15.62,13.48,11.96,10.72,9.84,8.76,7.92,7.18],format:value=>'+' + value.toFixed(2) + '%'},
    return3y:{values:[68.32,61.47,55.86,49.72,44.18,39.64,35.28,31.76],format:value=>'+' + value.toFixed(2) + '%'},
    excess1y:{values:[12.86,10.42,9.76,8.58,7.92,7.36,6.84,6.21],format:value=>'+' + value.toFixed(2) + '%'},
    relativeExcess:{values:[11.72,10.38,9.64,8.91,8.26,7.74,7.18,6.62],format:value=>'+' + value.toFixed(2) + '%'},
    quota:{values:[50000,30000,20000,10000,5000,3000,2000,1000],format:value=>value >= 10000 ? (value / 10000) + '万元' : value + '元'},
    institutions:{values:[26,23,21,18,16,14,12,10],format:value=>value + '家'},
    positiveMonths:{values:[24,22,20,18,17,16,15,14],format:value=>value + '个月'},
    annualized:{values:[18.26,16.84,15.72,14.63,13.86,12.94,12.18,11.56],format:value=>'+' + value.toFixed(2) + '%'},
    maxDrawdown:{values:[16.42,18.25,14.78,19.36,17.64,15.92,18.86,16.98],format:value=>'-' + value.toFixed(2) + '%'},
    dividendTTM:{values:[6.82,6.35,5.96,5.62,5.38,5.14,4.92,4.76],format:value=>value.toFixed(2) + '%'},
    pePercentile:{values:[12.6,18.4,24.8,31.2,38.6,45.3,52.7,61.4],format:value=>value.toFixed(1) + '%'}
  };

  const m06ConfirmedCatalog = [
    {key:'qdiiQuota',title:'QDII额度榜',meta:'QDII',metrics:[['近1年收益率','return1y','desc'],['当日申购限额','quota','desc']],names:['易方达全球成长','广发全球科技精选','富国全球科技龙头','华宝油气LOF','南方原油','嘉实全球互联网','工银全球精选','华夏全球科技先锋']},
    {key:'institutionalFavor',title:'机构青睐榜',meta:'机构持仓',metrics:[['FOF机构持有家数','institutions','desc'],['近1年收益率','return1y','desc']],names:['易方达蓝筹精选混合','富国天惠成长混合','兴全合润混合','交银趋势优先混合','中欧时代先锋股票','景顺长城核心竞争力','汇添富价值精选混合','广发稳健增长混合']},
    {key:'indexEnhance',title:'指增超额榜',meta:'指数增强',metrics:[['近1年超额收益','excess1y','desc'],['近1年收益率','return1y','desc']],names:['国金沪深300指数增强','富国中证500指数增强','景顺长城沪深300增强','华夏中证500指数增强','招商中证1000指数增强','博时沪深300指数增强','国泰中证500指数增强','南方中证1000指数增强']},
    {key:'monthlyPositive',title:'月月正收益榜',meta:'稳健收益',metrics:[['连续正收益月数','positiveMonths','desc'],['近1年收益率','return1y','desc']],names:['国金惠安利率债','易方达稳健收益债券','广发聚鑫债券','富国稳健增强债券','南方中短债债券','中银稳健添利债券','招商安泰平衡混合','华夏睿磐泰利混合']},
    {key:'longRun',title:'长跑业绩榜',meta:'长期业绩',metrics:[['成立以来年化','annualized','desc'],['成立以来最大回撤','maxDrawdown','asc']],names:['富国天惠成长混合','兴全商业模式混合','交银定期支付双息平衡','汇添富价值精选混合','景顺长城核心竞争力','国泰估值优势混合','南方优选成长混合','易方达中小盘混合']},
    {key:'quantPerformance',title:'量化业绩榜',meta:'量化策略',metrics:[['近1年收益率','return1y','desc'],['相对基准超额收益','relativeExcess','desc']],names:['国金量化多因子','富国中证红利指数增强','景顺长城量化精选','华夏智胜先锋股票','招商量化精选股票','博时量化多策略股票','南方量化成长股票','广发量化多因子混合']},
    {key:'highDividendIndex',title:'高股息指数榜',meta:'红利指数',metrics:[['指数股息率TTM','dividendTTM','desc'],['近1年收益率','return1y','desc']],names:['国证红利指数基金','中证红利低波指数基金','上证红利指数基金','央企红利指数基金','红利质量指数基金','港股通高股息指数基金','沪深300红利指数基金','消费红利指数基金']},
    {key:'themePioneer',title:'主题先锋榜',meta:'主题投资',metrics:[['近1年收益率','return1y','desc'],['近6月收益率','return6m','desc']],names:['数字经济主题混合','创新药主题混合','高端制造主题混合','机器人产业主题混合','人工智能主题混合','新能源车主题混合','半导体主题混合','国防军工主题混合']},
    {key:'broadMarketA',title:'A股宽基榜',meta:'宽基指数',metrics:[['近1年收益率','return1y','desc'],['PE估值分位（近5年）','pePercentile','asc']],names:['沪深300指数基金','中证A500指数基金','中证500指数基金','中证1000指数基金','上证50指数基金','创业板指数基金','科创50指数基金','北证50指数基金']},
    {key:'techTheme',title:'科技主题榜',meta:'科技主题',metrics:[['近1年收益率','return1y','desc'],['近3年收益率','return3y','desc']],names:['易方达信息产业混合','广发科技精选混合','永赢科技成长混合','富国创新科技混合','华夏创新未来混合','南方科技创新混合','国泰智能装备股票','景顺长城科技创新混合']},
    {key:'consumerTheme',title:'消费主题榜',meta:'消费主题',metrics:[['近1年收益率','return1y','desc'],['近3年收益率','return3y','desc']],names:['易方达消费行业股票','汇添富消费行业混合','富国消费主题混合','景顺长城新兴消费混合','中欧消费主题股票','华夏消费升级混合','广发消费品精选混合','南方消费升级混合']},
    {key:'newEnergyTheme',title:'新能源主题榜',meta:'新能源主题',metrics:[['近1年收益率','return1y','desc'],['近3年收益率','return3y','desc']],names:['汇添富新能源精选混合','东方新能源汽车主题混合','华夏能源革新股票','富国清洁能源产业混合','广发新能源精选股票','中欧碳中和混合','南方新能源产业趋势混合','景顺长城新能源产业股票']},
    {key:'advancedManufacturingTheme',title:'高端制造主题榜',meta:'高端制造',metrics:[['近1年收益率','return1y','desc'],['近3年收益率','return3y','desc']],names:['广发高端制造股票','汇添富高端制造股票','富国高端制造行业股票','华夏高端制造混合','南方高端装备混合','景顺长城先进智造混合','中欧先进制造股票','国泰智能装备股票']},
    {key:'medicineTheme',title:'医药主题榜',meta:'医药主题',metrics:[['近1年收益率','return1y','desc'],['近3年收益率','return3y','desc']],names:['中欧医疗健康混合','易方达医疗保健行业混合','富国精准医疗混合','广发医疗保健股票','汇添富创新医药混合','南方医药创新股票','工银前沿医疗股票','华夏医药健康混合']},
    {key:'energyMaterialsTheme',title:'能源材料主题榜',meta:'能源材料',metrics:[['近1年收益率','return1y','desc'],['近3年收益率','return3y','desc']],names:['华宝资源优选混合','富国中证煤炭指数','国泰国证有色金属行业指数','汇添富中证能源指数','南方有色金属ETF联接','广发资源优选股票','易方达资源行业混合','嘉实资源精选股票']},
    {key:'utilitiesTheme',title:'公用事业主题榜',meta:'公用事业',metrics:[['近1年收益率','return1y','desc'],['近3年收益率','return3y','desc']],names:['广发中证全指电力公用事业ETF','华夏中证绿色电力ETF','富国中证绿色电力ETF','南方中证全指电力公用事业ETF','博时中证全指电力公用事业ETF','银华中证全指电力公用事业ETF','国泰中证环保产业ETF','嘉实国证绿色电力ETF']},
    {key:'financePropertyTheme',title:'金融地产主题榜',meta:'金融地产',metrics:[['近1年收益率','return1y','desc'],['近3年收益率','return3y','desc']],names:['华宝中证银行ETF联接','南方中证全指房地产ETF联接','国泰上证180金融ETF联接','易方达沪深300非银ETF联接','天弘中证银行ETF联接','招商中证银行指数','鹏华中证800地产指数','富国中证全指证券公司指数']}
  ];

  const m06SpecRows = [
  {
    "id": 1,
    "title": "QDII额度榜",
    "metrics": [
      "近1年收益率",
      "当日申购限额"
    ],
    "rule": "选择成立满1年的权益类、商品类QDII基金，当日申购上限须≥100元。不限额的基金也可入榜，限额显示“无限制”。当日暂停申购的基金不入榜。同一基金有多个份额时，只保留一个：有C类份额则保留C类，没有C类则保留A类。默认按近1年收益率从高到低排列；收益率相同时，申购限额较高的排在前面，“无限制”排在有限额度之前。缺少近1年收益率的基金不参与排名。申购、赎回信息采用商城数据，限额每日更新。"
  },
  {
    "id": 2,
    "title": "机构青睐榜",
    "metrics": [
      "FOF机构持有家数",
      "近1年收益率"
    ],
    "rule": "选择被FOF持有的基金，FOF持有家数为0的不入榜。持有家数只统计A类FOF；被持有基金的A、C份额分别统计，不合并。使用目前可取得的最新半年报或年报数据，按FOF机构持有家数排列。"
  },
  {
    "id": 3,
    "title": "指增超额榜",
    "metrics": [
      "近1年超额收益",
      "近1年收益率"
    ],
    "rule": "选择成立满1年的指数增强型基金，按近1年超额收益率从高到低排列。"
  },
  {
    "id": 4,
    "title": "月月正收益榜",
    "metrics": [
      "连续正收益月数",
      "近1年收益率"
    ],
    "rule": "选择成立超过5年的债券型基金，基金类型按Wind一级分类确定，包括纯债、固收+等。从最新完整自然月（最近一个已经结束的自然月）开始，逐月向前统计连续正收益月数；某月收益率严格大于0，才算正收益月。按连续正收益月数从多到少排列。"
  },
  {
    "id": 5,
    "title": "长跑业绩榜",
    "metrics": [
      "成立以来年化",
      "成立以来最大回撤"
    ],
    "rule": "选择成立超过5年，且最近5个完整自然年度中，每一年同类业绩排名都在前50%的基金。不足一个完整自然年度的数据不参与判断，“同类”按Wind二级分类确定。默认按成立以来年化收益从高到低排列。"
  },
  {
    "id": 6,
    "title": "量化业绩榜",
    "metrics": [
      "近1年收益率",
      "近1年相对基准超额收益"
    ],
    "rule": "选择Wind“基金概念类”中标为“量化基金—量化基金（主动型）”的基金，默认按近1年收益率从高到低排列。"
  },
  {
    "id": 7,
    "title": "高股息指数榜",
    "metrics": [
      "指数股息率TTM",
      "近1年收益率"
    ],
    "rule": "选择场外被动指数基金的C类份额，按所跟踪指数的股息率TTM从高到低排列。多只基金跟踪同一指数时，比较最新一期季报中的基金合并规模，只保留规模最大基金的C类份额。"
  },
  {
    "id": 8,
    "title": "主题先锋榜",
    "metrics": [
      "近1年收益率",
      "近6月收益率"
    ],
    "rule": "选择已被标记为8大赛道之一的基金，按近1年收益率从高到低排列。"
  },
  {
    "id": 9,
    "title": "A股宽基榜",
    "metrics": [
      "近1年收益率",
      "近5年PE估值分位"
    ],
    "rule": "选择跟踪指数在Wind中归为“规模指数”的基金，QDII类指数基金不入榜。要求指数成立超过5年，并有近5年PE估值数据；基金本身成立不足5年也可以入榜。默认按近1年收益率排列。"
  },
  {
    "id": 10,
    "title": "科技主题榜",
    "metrics": [
      "近1年收益率",
      "近3年收益率"
    ],
    "rule": "选择8大赛道中标为“科技TMT”的基金。成立不足3年或缺少近3年收益率的基金不入榜；其余按近1年收益率从高到低排列。"
  },
  {
    "id": 11,
    "title": "消费主题榜",
    "metrics": [
      "近1年收益率",
      "近3年收益率"
    ],
    "rule": "选择8大赛道中标为“消费服务”的基金。成立不足3年或缺少近3年收益率的基金不入榜；其余按近1年收益率从高到低排列。"
  },
  {
    "id": 12,
    "title": "新能源主题榜",
    "metrics": [
      "近1年收益率",
      "近3年收益率"
    ],
    "rule": "选择8大赛道中标为“新能源”的基金。成立不足3年或缺少近3年收益率的基金不入榜；其余按近1年收益率从高到低排列。"
  },
  {
    "id": 13,
    "title": "高端制造主题榜",
    "metrics": [
      "近1年收益率",
      "近3年收益率"
    ],
    "rule": "选择8大赛道中标为“高端制造”的基金。成立不足3年或缺少近3年收益率的基金不入榜；其余按近1年收益率从高到低排列。"
  },
  {
    "id": 14,
    "title": "医药主题榜",
    "metrics": [
      "近1年收益率",
      "近3年收益率"
    ],
    "rule": "选择8大赛道中标为“医药健康”的基金。成立不足3年或缺少近3年收益率的基金不入榜；其余按近1年收益率从高到低排列。"
  },
  {
    "id": 15,
    "title": "能源材料主题榜",
    "metrics": [
      "近1年收益率",
      "近3年收益率"
    ],
    "rule": "选择8大赛道中标为“能源材料”的基金。成立不足3年或缺少近3年收益率的基金不入榜；其余按近1年收益率从高到低排列。"
  },
  {
    "id": 16,
    "title": "公用事业主题榜",
    "metrics": [
      "近1年收益率",
      "近3年收益率"
    ],
    "rule": "选择8大赛道中标为“基础公用”的基金。成立不足3年或缺少近3年收益率的基金不入榜；其余按近1年收益率从高到低排列。"
  },
  {
    "id": 17,
    "title": "金融地产主题榜",
    "metrics": [
      "近1年收益率",
      "近3年收益率"
    ],
    "rule": "选择8大赛道中标为“金融地产”的基金。成立不足3年或缺少近3年收益率的基金不入榜；其余按近1年收益率从高到低排列。"
  }
];
/* Appended to the preserved M06 CSS/catalog by build.py.
 * Preview only: full local fixtures stand for processed upstream results.
 * Not a production API, screening engine, permission policy or cache policy.
 */
  const escapeM06Text = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const query = new URLSearchParams(location.search);
  const allowedStates = ['normal','short','long','empty','loading','error','partial','stale','no-date'];
  const scene = allowedStates.includes(query.get('m06State')) ? query.get('m06State') : 'normal';
  // Confirmed display formats; raw values remain unchanged for sorting.
  m06MetricProfiles.pePercentile.format = value => value.toFixed(2) + '%';
  m06MetricProfiles.quota.format = value => value===Infinity ? '无限制' : value>=10000 ? Number((value/10000).toFixed(2))+'万元' : value+'元';
  const pages = Object.fromEntries(m06ConfirmedCatalog.map((item,index) => {
    const rule = m06SpecRows[index];
    const metrics = item.metrics.map((metric,i) => ({label:rule.metrics[i],profile:metric[1],defaultDir:metric[2]}));
    const rows = item.names.map((name,i) => [name, item.meta + ' · 数据示意',
      m06MetricProfiles[metrics[0].profile].format(m06MetricProfiles[metrics[0].profile].values[i]),
      m06MetricProfiles[metrics[0].profile].values[i],
      m06MetricProfiles[metrics[1].profile].format(m06MetricProfiles[metrics[1].profile].values[i]),
      m06MetricProfiles[metrics[1].profile].values[i]]);
    if(item.key === 'qdiiQuota') {
      // Keep the screenshot first five unchanged; edge-case samples remain in complete results.
      rows[6][4] = '无限制'; rows[6][5] = Infinity;
      rows[7][2] = rows[6][2]; rows[7][3] = rows[6][3];
    }
    if(scene === 'long') {
      for(let i=0;i<4;i++) {
        const row = rows[rows.length-1].slice();
        row[0] = '演示基金' + (9+i);
        row[3] -= ['institutions','positiveMonths'].includes(metrics[0].profile) ? 1 : 0.2;
        row[2] = m06MetricProfiles[metrics[0].profile].format(row[3]);
        rows.push(row);
      }
    }
    if(scene === 'short') rows.splice(3);
    // Fixed dates belong only to these local demo results, never to a live request.
    const dataDate = ['no-date','loading','error'].includes(scene)||(scene==='partial'&&index===0)
      ? null : scene==='stale' ? '2026-10-29' : '2026-10-30';
    return [item.key,{key:item.key,title:rule.title,rule:rule.rule,metrics,rows,dataDate}];
  }));
  const keys = Object.keys(pages);
  const selectedKey = Object.hasOwn(pages,query.get('m06Key')) ? query.get('m06Key') : keys[0];
  const statuses = Object.fromEntries(keys.map((key,index)=>[key,
    scene === 'partial' ? (index===0 ? 'error' : 'normal') :
    ['empty','loading','error','stale'].includes(scene) ? scene : 'normal']));
  let activeM06Ranking = null;
  let returnScroll = 0;
  let returnTrigger = null;
/* Adapted from the user-referenced 20260914 prototype; original interaction preserved. */
  const m06NavigationCatalog=m06ConfirmedCatalog.map(item=>({...item,title:pages[item.key].title}));
  // New-version-only navigation; catalog, metrics and secondary renderer stay unchanged.
  const m06Groups = [
    {title:'特色榜单',keys:['qdiiQuota','institutionalFavor','indexEnhance','monthlyPositive','longRun','quantPerformance']},
    {title:'指数榜单',keys:['highDividendIndex','broadMarketA']},
    {title:'主题榜单',keys:['themePioneer','techTheme','consumerTheme','newEnergyTheme','advancedManufacturingTheme','medicineTheme','energyMaterialsTheme','utilitiesTheme','financePropertyTheme']}
  ];
  const m06StorageKey = 'wealth-home-figma-m06-multiselect-v2';
  const defaultM06Keys = m06NavigationCatalog.slice(0,5).map(item=>item.key);
  function normalizeM06Keys(keys){
    return Array.isArray(keys) ? m06NavigationCatalog.filter(item=>keys.includes(item.key)).map(item=>item.key) : [];
  }
  let selectedM06Keys = defaultM06Keys.slice();
  try {
    const saved = query.get('review-center')==='m06' ? [] : normalizeM06Keys(JSON.parse(localStorage.getItem(m06StorageKey)));
    if(saved.length) selectedM06Keys = saved;
  } catch (_) { /* File preview may disable storage; session state still works. */ }
  let selectedM06Key = selectedM06Keys[0];
  let draftM06Keys = [];
  let m06Selector = null;
  let m06ReturnFocus = null;
  let m06InertNodes = [];

  function revealM06Tab(){
    const rail = content.querySelector('.pillfix');
    const active = content.querySelector('[data-m06-select="'+selectedM06Key+'"]');
    if(!rail || !active || !rail.clientWidth) return;
    // Different positioned ancestors make offsetLeft subtraction unreliable.
    const railRect=rail.getBoundingClientRect(),scale=railRect.width/rail.clientWidth || 1;
    const start = rail.scrollLeft+(active.getBoundingClientRect().left-railRect.left)/scale;
    const end = start + active.offsetWidth;
    if(start < rail.scrollLeft + 24) rail.scrollLeft = Math.max(0,start - 24);
    else if(end > rail.scrollLeft + rail.clientWidth - 16) rail.scrollLeft = end - rail.clientWidth + 16;
  }

  function highlightM06Rank(key){
    if(!selectedM06Keys.includes(key)) return;
    selectedM06Key = key;
    content.querySelectorAll('[data-m06-select]').forEach(button=>{
      const active = button.dataset.m06Select===key;
      button.classList.toggle('sel',active);
      button.classList.toggle('un',!active);
      button.setAttribute('aria-current',String(active));
      button.setAttribute('tabindex',active?'0':'-1');
    });
    revealM06Tab();
  }

  function m06ScrollLayout(){
    const scroll=document.getElementById('appScroll');
    const nav=content.querySelector('.m06-navigation');
    const module=content.closest('.tab-module');
    const tabs=module?.querySelector('.main-tabs');
    if(module && module.scrollTop) module.scrollTop=0;
    const mainHeight=tabs?.offsetHeight || 0;
    content.style.setProperty('--m06-main-tabs-height',mainHeight+'px');
    if(nav) content.style.setProperty('--m06-navigation-height',nav.offsetHeight+'px');
    if(!scroll || !nav) return null;
    const rect=scroll.getBoundingClientRect();
    const scale=rect.width/scroll.clientWidth || 1;
    return {scroll,scale,top:rect.top+(mainHeight+nav.offsetHeight+8)*scale};
  }

  function selectM06Rank(key, focusTab){
    if(!selectedM06Keys.includes(key)) return;
    highlightM06Rank(key);
    requestAnimationFrame(()=>{
      const layout=m06ScrollLayout();
      const card=content.querySelector('[data-m06-preview-key="'+key+'"]');
      if(layout && card){
        const target=layout.scroll.scrollTop+(card.getBoundingClientRect().top-layout.top)/layout.scale;
        // Assign the actual scrollport, avoiding scrollIntoView on hidden ancestors
        // and the non-universal 'instant' ScrollBehavior option.
        layout.scroll.scrollTop=Math.max(0,target);
        highlightM06Rank(key);
      }
      if(focusTab) content.querySelector('[data-m06-select="'+key+'"]')?.focus({preventScroll:true});
    });
  }

  function syncM06Scroll(){
    const panel=content.closest('[data-panel="metric"]');
    if(!panel?.classList.contains('is-active')) return;
    const layout=m06ScrollLayout();
    if(!layout) return;
    const cards=Array.from(content.querySelectorAll('[data-m06-preview-key]'));
    if(!cards.length) return;
    let current=cards[0];
    cards.forEach(card=>{if(card.getBoundingClientRect().top<=layout.top+1) current=card;});
    if(layout.scroll.scrollHeight>layout.scroll.clientHeight && layout.scroll.scrollTop+layout.scroll.clientHeight>=layout.scroll.scrollHeight-2) current=cards[cards.length-1];
    if(current.dataset.m06PreviewKey!==selectedM06Key) highlightM06Rank(current.dataset.m06PreviewKey);
  }

  function refreshM06Draft(){
    m06Selector.querySelectorAll('[data-m06-sheet-select]').forEach(button=>{
      const active=draftM06Keys.includes(button.dataset.m06SheetSelect);
      button.setAttribute('aria-pressed',String(active));
      button.querySelector('.listtick').classList.toggle('on',active);
    });
    m06Selector.querySelector('.m06-selector-total').textContent=String(draftM06Keys.length);
    m06Selector.querySelector('.m06-selector-hint').textContent=draftM06Keys.length?'可多选，确定后在首页展示':'至少选择1个榜单';
    m06Selector.querySelector('.m06-selector-confirm').disabled=!draftM06Keys.length;
  }

  function commitM06Draft(){
    const next=normalizeM06Keys(draftM06Keys);
    if(!next.length) return;
    selectedM06Keys=next;
    if(!next.includes(selectedM06Key)) selectedM06Key=next[0];
    try {if(query.get('review-center')!=='m06') localStorage.setItem(m06StorageKey,JSON.stringify(next));} catch (_) {}
    observer.disconnect();
    mountM06Navigation();
    observer.observe(content,{childList:true,subtree:true});
    closeM06Selector(true);
    selectM06Rank(selectedM06Key,false);
  }

  function closeM06Selector(focusSelection){
    if(!m06Selector || m06Selector.hidden) return;
    m06Selector.hidden = true;
    draftM06Keys=[];
    m06InertNodes.forEach(([node,wasInert])=>{ node.inert=wasInert; });
    m06InertNodes=[];
    content.querySelector('.m06-all')?.setAttribute('aria-expanded','false');
    const target = focusSelection ? content.querySelector('[data-m06-select="'+selectedM06Key+'"]') : m06ReturnFocus;
    target?.focus({preventScroll:true});
  }

  function createM06Selector(){
    const host = content.closest('.phone');
    if(!host) return null;
    const layer = document.createElement('div');
    layer.className = 'm06-selector';
    layer.id = 'm06-all-selector';
    layer.dataset.m06PageKey='wealth-home-m06-ranking-selector';
    layer.hidden = true;
    // C08 listtick SVG reused verbatim, with semantic color rather than a literal.
    const tick = '<span class="listtick" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 20 20" fill="none"><path d="M3 10.5l4.5 4.5L17 4.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    layer.innerHTML = '<section class="m06-selector-dialog" role="dialog" aria-modal="true" aria-labelledby="m06-selector-title"><header class="m06-selector-head"><h2 id="m06-selector-title">全部榜单</h2><button type="button" class="m06-selector-close">关闭</button></header><div class="m06-selector-body">'+m06Groups.map((group,index)=>'<section class="m06-selector-group" aria-labelledby="m06-group-'+index+'"><h3 id="m06-group-'+index+'">'+group.title+'<span class="m06-selector-count">'+group.keys.length+'个</span></h3><div class="m06-selector-grid">'+group.keys.map(key=>'<button type="button" class="m06-selector-option" data-m06-sheet-select="'+key+'" aria-pressed="false"><span>'+escapeM06Text(pages[key].title)+'</span>'+tick+'</button>').join('')+'</div></section>').join('')+'</div><footer class="m06-selector-footer"><p class="m06-selector-status" aria-live="polite">已选 <span class="m06-selector-total">5</span> 个榜单<br><span class="m06-selector-hint">可多选，确定后在首页展示</span></p><button type="button" class="m06-selector-confirm">确定</button></footer></section>';
    host.append(layer);
    layer.addEventListener('click',event=>{
      if(event.target===layer || event.target.closest('.m06-selector-close')){
        event.preventDefault(); closeM06Selector(false); return;
      }
      if(event.target.closest('.m06-selector-confirm')){
        event.preventDefault(); commitM06Draft(); return;
      }
      const choice = event.target.closest('[data-m06-sheet-select]');
      if(choice){
        event.preventDefault();
        const key=choice.dataset.m06SheetSelect;
        draftM06Keys=draftM06Keys.includes(key)?draftM06Keys.filter(item=>item!==key):normalizeM06Keys(draftM06Keys.concat(key));
        refreshM06Draft();
      }
    });
    layer.addEventListener('keydown',event=>{
      if(event.key==='Escape'){
        event.preventDefault(); event.stopPropagation(); closeM06Selector(false);
      } else if(event.key==='Tab'){
        const buttons = Array.from(layer.querySelectorAll('button')).filter(button=>!button.disabled);
        const first = buttons[0], last = buttons[buttons.length-1];
        if(event.shiftKey && document.activeElement===first){ event.preventDefault(); last.focus(); }
        else if(!event.shiftKey && document.activeElement===last){ event.preventDefault(); first.focus(); }
      }
    });
    return layer;
  }

  function openM06Selector(){
    if(!m06Selector) m06Selector=createM06Selector();
    if(!m06Selector || !m06Selector.hidden) return;
    m06ReturnFocus=document.activeElement;
    draftM06Keys=selectedM06Keys.slice();
    refreshM06Draft();
    m06Selector.hidden=false;
    m06InertNodes=Array.from(m06Selector.parentElement.children).filter(node=>node!==m06Selector).map(node=>[node,node.inert]);
    m06InertNodes.forEach(([node])=>{node.inert=true;});
    content.querySelector('.m06-all')?.setAttribute('aria-expanded','true');
    const active=m06Selector.querySelector('[data-m06-sheet-select="'+selectedM06Key+'"]');
    requestAnimationFrame(()=>{
      active?.focus({preventScroll:true});
      const body=m06Selector.querySelector('.m06-selector-body');
      const rect=active?.getBoundingClientRect(), bodyRect=body.getBoundingClientRect();
      const scale=bodyRect.height/body.clientHeight || 1;
      if(rect && (rect.top<bodyRect.top || rect.bottom>bodyRect.bottom)) body.scrollTop+=(rect.top-bodyRect.top)/scale-24;
    });
  }

  function mountM06Navigation(){
    const selected=m06NavigationCatalog.filter(item=>selectedM06Keys.includes(item.key));
    content.innerHTML='<div data-m06-ranking-catalog data-m06-navigation="multiselect-v2"><div class="m06-navigation" id="m06RankingTabs"><nav class="pillfix" aria-label="已选榜单定位">'+selected.map(item=>'<button type="button" class="pill pM '+(item.key===selectedM06Key?'sel':'un')+'" id="m06-tab-'+item.key+'" data-m06-select="'+item.key+'" aria-controls="m06-preview-'+item.key+'" aria-current="'+(item.key===selectedM06Key)+'" tabindex="'+(item.key===selectedM06Key?'0':'-1')+'">'+escapeM06Text(item.title)+'</button>').join('')+'</nav><button class="m06-all" type="button" aria-label="选择展示榜单，已选'+selected.length+'个，共17个" aria-haspopup="dialog" aria-controls="m06-all-selector" aria-expanded="false">全部</button></div>'+selected.map(item=>'<section id="m06-preview-'+item.key+'" class="m06-preview" data-m06-preview-key="'+item.key+'" aria-labelledby="m06-tab-'+item.key+'">'+overviewCard(item.key,m06NavigationCatalog.findIndex(rank=>rank.key===item.key))+'</section>').join('')+'</div>';
    const rail=content.querySelector('.pillfix');
    content.querySelector('.m06-all').addEventListener('click',openM06Selector);
    let drag=null, suppressClickUntil=0;
    rail.addEventListener('click',event=>{
      event.preventDefault();event.stopPropagation();
      if(event.detail!==0 && Date.now()<suppressClickUntil){suppressClickUntil=0;return;}
      const button=event.target.closest('[data-m06-select]');
      if(button) selectM06Rank(button.dataset.m06Select,false);
    });
    rail.addEventListener('keydown',event=>{
      const keys=['ArrowLeft','ArrowRight','Home','End'];
      if(!keys.includes(event.key)) return;
      event.preventDefault();
      const index=selectedM06Keys.indexOf(selectedM06Key);
      const next=event.key==='Home'?0:event.key==='End'?selectedM06Keys.length-1:(index+(event.key==='ArrowRight'?1:-1)+selectedM06Keys.length)%selectedM06Keys.length;
      selectM06Rank(selectedM06Keys[next],true);
    });
    rail.addEventListener('wheel',event=>{
      const delta=event.deltaX || event.deltaY;
      if(!delta || rail.scrollWidth<=rail.clientWidth) return;
      const before=rail.scrollLeft;
      rail.scrollLeft+=delta*(event.deltaMode===1?28:event.deltaMode===2?rail.clientWidth:1);
      if(rail.scrollLeft!==before) event.preventDefault();
    },{passive:false});
    rail.addEventListener('pointerdown',event=>{
      suppressClickUntil=0;
      if(event.pointerType!=='mouse' || event.button!==0) return;
      drag={id:event.pointerId,x:event.clientX,left:rail.scrollLeft,scale:rail.getBoundingClientRect().width/rail.clientWidth || 1,moved:false};
    });
    rail.addEventListener('pointermove',event=>{
      if(!drag || event.pointerId!==drag.id) return;
      const delta=event.clientX-drag.x;
      if(Math.abs(delta)>5){
        if(!drag.moved) rail.setPointerCapture(event.pointerId);
        drag.moved=true;
        rail.classList.add('is-dragging');
        rail.scrollLeft=drag.left-delta/drag.scale;
        event.preventDefault();
      }
    });
    const finishDrag=()=>{
      const ended=drag;drag=null;
      if(ended?.moved)suppressClickUntil=Date.now()+400;
      if(ended && rail.hasPointerCapture(ended.id)) rail.releasePointerCapture(ended.id);
      rail.classList.remove('is-dragging');
    };
    rail.addEventListener('pointerup',finishDrag);
    rail.addEventListener('pointercancel',()=>{finishDrag();suppressClickUntil=0;});
    rail.addEventListener('lostpointercapture',finishDrag);
    rail.addEventListener('pointerleave',()=>{if(drag && !drag.moved)finishDrag();});
    requestAnimationFrame(()=>{m06ScrollLayout();revealM06Tab();});
  }

  document.addEventListener('click',event=>{
    if(event.target.closest('[data-tab="metric"]')) requestAnimationFrame(()=>{syncM06Scroll();revealM06Tab();});
  });
  let m06ScrollPending=false;
  document.getElementById('appScroll')?.addEventListener('scroll',()=>{
    if(m06ScrollPending) return;
    m06ScrollPending=true;
    requestAnimationFrame(()=>{m06ScrollPending=false;syncM06Scroll();});
  },{passive:true});
  window.addEventListener('resize',()=>{m06ScrollLayout();revealM06Tab();});


  // Reuse the existing M06 bottom-sheet shell; never rebuild/sort the list here.
  let m06RuleSheet=null, m06RuleInert=[];
  function closeM06Rules(restoreFocus=true) {
    if(!m06RuleSheet || m06RuleSheet.hidden) return;
    m06RuleSheet.hidden=true;
    m06RuleInert.forEach(([node,was])=>{node.inert=was;});
    m06RuleInert=[];
    const trigger=document.getElementById('subpageMore');
    trigger.setAttribute('aria-expanded','false');
    if(restoreFocus) trigger.focus({preventScroll:true});
  }
  function openM06Rules() {
    if(!activeM06Ranking) return;
    if(!m06RuleSheet) {
      m06RuleSheet=document.createElement('div');
      m06RuleSheet.id='m06-rule-sheet';
      m06RuleSheet.className='m06-selector';
      m06RuleSheet.hidden=true;
      document.getElementById('subpage').closest('.phone').append(m06RuleSheet);
      m06RuleSheet.addEventListener('click',event=>{
        if(event.target===m06RuleSheet || event.target.closest('[data-m06-rule-close]')) {
          event.preventDefault();event.stopPropagation();closeM06Rules();
        }
      });
      m06RuleSheet.addEventListener('keydown',event=>{
        if(event.key==='Escape') {
          event.preventDefault();event.stopPropagation();closeM06Rules();
        } else if(event.key==='Tab') {
          event.preventDefault();
          const close=m06RuleSheet.querySelector('[data-m06-rule-close]');
          const body=m06RuleSheet.querySelector('.m06-rule-body');
          (document.activeElement===close?body:close).focus({preventScroll:true});
        }
      });
    }
    if(!m06RuleSheet.hidden) return;
    const page=pages[activeM06Ranking.key];
    m06RuleSheet.dataset.m06RuleKey=page.key;
    m06RuleSheet.innerHTML='<section class="m06-selector-dialog m06-rule-dialog" role="dialog" aria-modal="true" aria-labelledby="m06-rule-title"><header class="m06-selector-head"><h2 id="m06-rule-title">榜单规则</h2><button type="button" class="m06-selector-close" data-m06-rule-close>关闭</button></header><div class="m06-selector-body m06-rule-body" tabindex="0"><h3>'+escapeM06Text(page.title)+'</h3><p>'+escapeM06Text(page.rule)+'</p></div></section>';
    m06RuleSheet.hidden=false;
    m06RuleInert=Array.from(m06RuleSheet.parentElement.children).filter(node=>node!==m06RuleSheet).map(node=>[node,node.inert]);
    m06RuleInert.forEach(([node])=>{node.inert=true;});
    document.getElementById('subpageMore').setAttribute('aria-expanded','true');
    m06RuleSheet.querySelector('.m06-rule-body').scrollTop=0;
    m06RuleSheet.querySelector('[data-m06-rule-close]').focus({preventScroll:true});
  }

  function orderedRows(page,selection) {
    if(selection.mode === 'default') return page.rows.slice();
    const valueIndex = selection.metricIndex === 0 ? 3 : 5;
    return page.rows.map((row,index)=>({row,index})).sort((a,b)=>{
      const av=a.row[valueIndex], bv=b.row[valueIndex];
      // Equal values retain fixture input order; no new business tie-break rule.
      if(av===bv) return a.index-b.index;
      const delta=av>bv ? 1 : -1;
      return selection.direction==='desc' ? -delta : delta;
    }).map(item=>item.row);
  }
  function orderLabel(page,selection) {
    if(selection.mode==='default') return '默认榜单顺序';
    const metric=page.metrics[selection.metricIndex];
    if(metric.profile==='maxDrawdown') return '当前按回撤幅度' + (selection.direction==='asc'?'从小到大':'从大到小');
    return '当前按' + metric.label + (selection.direction==='asc'?'从低到高':'从高到低');
  }
  function valueClass(page,index,text) {
    const profile=page.metrics[index].profile;
    if(!['return1y','return6m','return3y','annualized','excess1y','relativeExcess'].includes(profile)) return '';
    return String(text).startsWith('+') ? ' is-rise' : String(text).startsWith('-') ? ' is-fall' : '';
  }
  function dataDateMarkup(page) {
    const value=page.dataDate;
    if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)) return '';
    return '<p class="m06-data-date">数据日期：'+escapeM06Text(value)+'</p>';
  }
  function stateMarkup(key) {
    const status=statuses[key];
    const message=status==='stale'?'更新失败，当前展示上次数据':status==='loading'?'数据加载中':status==='empty'?'暂无符合条件的基金':'数据加载失败';
    return '<div class="m06-state'+(status==='stale'?' is-stale':'')+'" role="status" aria-live="polite" aria-busy="'+(status==='loading')+'"><p>'+message+'</p></div>';
  }
  function overviewBody(key) {
    const page=pages[key];
    if(!['normal','stale'].includes(statuses[key])) return (statuses[key]==='empty'?dataDateMarkup(page):'')+stateMarkup(key);
    // Preserve upstream order, including QDII ties; only take its prefix.
    return dataDateMarkup(page)+(statuses[key]==='stale'?stateMarkup(key):'')+'<div class="rank-head"><span>基金名称</span><span>'+escapeM06Text(page.metrics[0].label)+'</span><span>'+escapeM06Text(page.metrics[1].label)+'</span></div>'+page.rows.slice(0,5).map(row=>
      '<div class="rank-row"><div class="rank-name"><strong>'+escapeM06Text(row[0])+'</strong></div><span class="rank-value'+valueClass(page,0,row[2])+'">'+escapeM06Text(row[2])+'</span><span class="rank-value'+valueClass(page,1,row[4])+'">'+escapeM06Text(row[4])+'</span></div>').join('');
  }
  function overviewCard(key,index) {
    const page=pages[key];
    return '<article id="m06-card-'+key+'" class="rank-card" data-m06-layout="v0.1" data-m06-key="'+key+'"><div class="card-body"><div class="m06-heading"><h3>'+escapeM06Text(page.title)+'</h3><button class="m06-rules" type="button" data-m06-rule-toggle aria-controls="m06-rule-note-'+index+'" aria-expanded="false">榜单规则</button></div><p class="m06-rule-note" id="m06-rule-note-'+index+'" hidden>'+escapeM06Text(page.rule)+'</p><div id="m06-body-'+key+'">'+overviewBody(key)+'</div><button class="m06-more" type="button" data-m06-ranking-open="'+key+'">查看完整榜单<i class="iconfont icon-shixinjiantou-you" aria-hidden="true"></i></button></div></article>';
  }
  function renderM06Ranking() {
    if(!activeM06Ranking) return;
    const page=pages[activeM06Ranking.key], status=statuses[page.key];
    const hasData=['normal','stale'].includes(status);
    const rows=hasData?orderedRows(page,activeM06Ranking):[];
    const label=hasData&&activeM06Ranking.mode==='manual'?orderLabel(page,activeM06Ranking):'';
    const summary=label?'<section class="m06-rank-summary"><p class="m06-rank-order">'+escapeM06Text(label)+'</p></section>':'';
    const buttons=page.metrics.map((metric,index)=>{
      const on=index===activeM06Ranking.metricIndex;
      const cls=on?' is-active is-'+activeM06Ranking.direction:'';
      return '<button class="m06-rank-sort'+cls+'" type="button" data-m06-rank-sort="'+index+'" aria-label="按'+escapeM06Text(metric.label)+'排序'+(on?'，'+escapeM06Text(label):'')+'"><span>'+escapeM06Text(metric.label)+'</span><i class="iconfont icon-shixinjiantou-you" aria-hidden="true"></i></button>';
    }).join('');
    const body=hasData?'<section class="m06-rank-table"><div class="m06-rank-table-head"><span>基金名称</span>'+buttons+'</div>'+rows.map(row=>
      '<div class="m06-rank-table-row"><div class="m06-rank-fund"><strong>'+escapeM06Text(row[0])+'</strong><span>'+escapeM06Text(row[1])+'</span></div><span class="m06-rank-cell'+valueClass(page,0,row[2])+'">'+escapeM06Text(row[2])+'</span><span class="m06-rank-cell'+valueClass(page,1,row[4])+'">'+escapeM06Text(row[4])+'</span></div>').join('')+'</section>':stateMarkup(page.key);
    // App shared risk disclosure assets are pending; do not invent replacement copy.
    document.getElementById('subpageContent').innerHTML=summary+(status==='stale'?stateMarkup(page.key):'')+body;
  }
  function openM06RankingPage(key,trigger) {
    if(!Object.hasOwn(pages,key)) return;
    closeM06Rules(false);
    returnScroll=document.getElementById('appScroll')?.scrollTop||0;
    returnTrigger=trigger||null;
    activeM06Ranking={key,metricIndex:0,direction:pages[key].metrics[0].defaultDir,mode:'default'};
    const subpage=document.getElementById('subpage');
    subpage.classList.remove('is-newbie','is-wealth-menu','is-service-manager');
    subpage.classList.add('is-m06-ranking');
    subpage.dataset.detailKey='m06-rank-'+key;
    subpage.dataset.m06PageKey='wealth-home-m06-ranking-'+key;
    document.getElementById('subpageTitle').textContent=pages[key].title;
    const more=document.getElementById('subpageMore');
    more.textContent='规则';more.disabled=false;more.removeAttribute('aria-hidden');
    more.setAttribute('aria-haspopup','dialog');more.setAttribute('aria-controls','m06-rule-sheet');more.setAttribute('aria-expanded','false');more.setAttribute('aria-label','查看'+pages[key].title+'规则');
    renderM06Ranking();
    document.getElementById('subpageContent').scrollTop=0;
    subpage.classList.add('is-active');
    document.getElementById('subpageBack').focus({preventScroll:true});
  }
  function update() {
    observer.disconnect();
    document.querySelectorAll('[data-tab="metric"]').forEach(tab=>{
      const label=tab.querySelector('.main-tab-title')||tab.querySelector('span');
      if(label) label.textContent='自主选基';
    });
    content.closest('[data-panel="metric"]')?.querySelector(':scope > .pill-tabs')?.remove();
    content.dataset.m06PageKey='wealth-home-m06-ranking';
    if(!content.querySelector('[data-m06-navigation]')) mountM06Navigation();
    observer.observe(content,{childList:true,subtree:true});
  }
  document.addEventListener('click',event=>{
    if(event.target.closest('#subpageMore')&&activeM06Ranking) {
      event.preventDefault();event.stopImmediatePropagation();openM06Rules();return;
    }
    const back=event.target.closest('#subpageBack');
    if(back && document.getElementById('subpage').dataset.detailKey?.startsWith('m06-rank-')) {
      const savedScroll=returnScroll, trigger=returnTrigger;
      closeM06Rules(false);
      const more=document.getElementById('subpageMore');
      ['aria-haspopup','aria-controls','aria-expanded','aria-label'].forEach(name=>more.removeAttribute(name));
      activeM06Ranking=null;
      document.getElementById('subpage').classList.remove('is-m06-ranking');
      delete document.getElementById('subpage').dataset.m06PageKey;
      // Let the existing shared handler close the subpage and restore shared chrome.
      requestAnimationFrame(()=>{
        const scroller=document.getElementById('appScroll');
        if(scroller) scroller.scrollTop=savedScroll;
        if(trigger?.isConnected) trigger.focus({preventScroll:true});
      });
      return;
    }
    const sort=event.target.closest('[data-m06-rank-sort]');
    if(sort&&activeM06Ranking) {
      event.preventDefault(); event.stopImmediatePropagation();
      const index=Number(sort.dataset.m06RankSort), page=pages[activeM06Ranking.key];
      if(index!==0&&index!==1) return;
      if(index===activeM06Ranking.metricIndex) activeM06Ranking.direction=activeM06Ranking.direction==='desc'?'asc':'desc';
      else {activeM06Ranking.metricIndex=index; activeM06Ranking.direction=page.metrics[index].defaultDir;}
      activeM06Ranking.mode='manual';
      const scroller=document.getElementById('subpageContent'), top=scroller.scrollTop;
      renderM06Ranking(); scroller.scrollTop=top;
      scroller.querySelector('[data-m06-rank-sort="'+index+'"]').focus({preventScroll:true});
      return;
    }
    const open=event.target.closest('[data-m06-ranking-open]');
    if(open) {event.preventDefault(); event.stopImmediatePropagation(); openM06RankingPage(open.dataset.m06RankingOpen,open); return;}
    const toggle=event.target.closest('[data-m06-rule-toggle]');
    if(toggle) {
      event.preventDefault(); event.stopImmediatePropagation();
      const note=document.getElementById(toggle.getAttribute('aria-controls'));
      if(note) {note.hidden=!note.hidden; toggle.setAttribute('aria-expanded',String(!note.hidden));}
    }
  },true);
  const observer=new MutationObserver(update);
  update();
  if(query.get('m06')==='1'||query.has('m06State')||query.has('m06Key')) requestAnimationFrame(()=>{
    document.querySelector('.main-tab[data-tab="metric"]')?.click();
    if(query.get('m06Page')==='detail') {openM06RankingPage(selectedKey);if(query.get('m06Rules')==='1')openM06Rules();}
    else if(query.get('m06Picker')==='1') openM06Selector();
  });
})();
