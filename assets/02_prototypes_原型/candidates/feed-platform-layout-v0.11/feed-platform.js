'use strict';
// 灰阶交互示例；文案同步 PRD v1.58，产品信息及自选服务交互保持不变。不连接真实服务。
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const e=escapeHTML, clone=v=>JSON.parse(JSON.stringify(v));
const T=[
 {id:'product',name:'产品图文卡',kind:'配置图文、关联产品'},
 {id:'topic',name:'机动类专题',kind:'配置图文、填写落地页'},
 {id:'ranking',name:'榜单卡片',kind:'选择已有榜单，内容沿用榜单选基'},
 {id:'theme',name:'板块投资',auto:true,kind:'内容由系统生成'},
 {id:'watch',name:'自选服务',auto:true,kind:'内容由系统生成'}
], scenes=['近期表现不错','开放申购','提高单日申购限额','创新高','进入低估值区域'];
const watchRules={
 '近期表现不错':{
  brief:'近1周、近1月或近3月跑赢自身业绩比较基准，满足任一门槛即触发。每轮5个自然日。',
  details:['近1周跑赢至少0.5个百分点；近1月至少1.5个百分点；近3月至少5个百分点。按同期滚动期间比较，等于门槛也达标。',
   '多项达标时，按近3月、近1月、近1周选一个展示，不按期间拆卡。跑赢不等于基金上涨。',
   '5天内，近1周、近1月和近3月全部不达标时提前停止；之后再次达标，重新计算5天。满5天仍达标不自动续期。即使改为另一个比较期间达标，也不延长本轮结束日期。',
   '部分期间缺数据，其他期间达标仍可推荐；全部无法确认时暂停。查不到收益数据不代表基金不符合跑赢标准。数据恢复后，仍达标且本轮5天未结束，就继续推荐，不从恢复当天重新计算5天。'],
  example:'您关注的示例基金，近1月跑赢业绩比较基准1.8个百分点。', note:'近1月与1.8个百分点仅为示例。'
 },
 '开放申购':{
  brief:'基金从“暂停申购”恢复为“开放申购”时触发。每轮5个自然日。',
  details:['必须确认暂停到开放的状态变化；一直开放，或只能查到当前可申购，不触发。',
   '系统确认恢复当天为第1天。期间再次暂停则提前停止，持续开放不延长。',
   '之后再次从暂停变为开放，更新原场景卡并重新计算5天，不同时保留两张提醒。'],
  example:'您关注的示例基金已恢复申购。', note:'申购状态由系统提供，此处为场景文案示例。'
 },
 '提高单日申购限额':{
  brief:'单日累计申购限额原先低于10,000元，本次提高时触发。每轮5个自然日。',
  details:['比较单日累计限额，不是单笔限额。原限额低于10,000元，提高到任何更高金额或不限额均可触发。',
   '原限额为10,000元或更高、金额不变或降低，不触发。缺少有效的调整前后限额，也不触发。',
   '系统确认提高当天为第1天；期间限额降低或暂停申购则提前停止。',
   '再次提高时重新比较本次前后金额，符合条件才更新原卡并重算5天；金额不变不续期。'],
  example:'您关注的示例基金，单日累计申购限额由5,000元提高至8,000元。', note:'金额仅为示例，使用系统提供的单日累计申购限额。'
 },
 '创新高':{
  brief:'复权净值创成立以来、近3年、近1年或近6月新高，任一期间满足即触发。每轮3个自然日。',
  details:['适用于成立满6个月、有足够历史数据的自选非货币基金；不同份额分别判断。',
   '用最新公布的复权净值，与该净值日期之前的历史复权净值比较。高于所比较期间此前最高值才算创新高，持平不算。按净值日期计算期间，历史不足的期间不判断。',
   '同时满足时，按成立以来、近3年、近1年、近6月选一个。文案写实际创新高日期，注明复权口径。',
   '新的净值日期再次创新高，更新原卡并重算3天；重复取得同一日期不延长。随后回落不提前结束。',
   '最新公布的复权净值不可用时，不用旧净值重新触发。恢复后只判断最新有效的复权净值，不补发过去的提醒。'],
  example:'9月8日，示例基金净值创近一年新高。', note:'采用复权净值口径。日期及期间仅为示例。'
 },
 '进入低估值区域':{
  brief:'跟踪指数PE-TTM的近5年历史分位低于30%时触发。每轮5个自然日。',
  details:['适用于有明确跟踪指数且估值有效的自选指数基金；ETF联接使用对应跟踪指数。',
   '当前及历史统一使用滚动PE（PE-TTM）。分位等于或高于30%不符合；指数历史不足5年或PE-TTM非正时不触发。',
   '升至30%或以上则提前停止；之后再次降至30%以下，重新计算5天。持续低于30%不自动续期。',
   '推荐期间数据无效则暂停。查不到估值数据，不代表估值分位已回升到30%或以上。数据恢复后，分位仍低于30%且本轮5天未结束，就恢复推荐，结束日期不变。',
   '不同基金即使跟踪同一指数也分别生成卡片，不合并。'],
  example:'您关注的示例基金，其跟踪指数PE-TTM处于近5年28%分位。', note:'28%分位仅为示例，不是PE为28倍。'
 }
};
const modes=['常规推荐','探索推荐','置顶展示'], template=id=>T.find(t=>t.id===id)||T[0];
// 产品类型与字段来自 2026-09-10 用户确认截图；名称、代码、分类和所有数值仅为演示。
const productTypes=[
 {
  "id": "public",
  "name": "场外公募",
  "fields": [
   {
    "id": "return1y",
    "name": "近1年收益率"
   },
   {
    "id": "return6m",
    "name": "近6月收益率"
   },
   {
    "id": "returnSince",
    "name": "成立以来收益率"
   },
   {
    "id": "return3y",
    "name": "近3年收益率"
   },
   {
    "id": "drawdown1y",
    "name": "近1年最大回撤"
   },
   {
    "id": "drawdownSince",
    "name": "成立以来最大回撤"
   },
   {
    "id": "manager",
    "name": "基金经理"
   },
   {
    "id": "risk",
    "name": "风险等级"
   },
   {
    "id": "limit",
    "name": "单日限购金额"
   }
  ]
 },
 {
  "id": "launch",
  "name": "首发基金（ETF和场外）",
  "fields": [
   {
    "id": "risk",
    "name": "风险等级"
   },
   {
    "id": "offerEnd",
    "name": "结束募集日期"
   },
   {
    "id": "proposedManager",
    "name": "拟任基金经理"
   },
   {
    "id": "fundType",
    "name": "基金类型"
   },
   {
    "id": "initialAmount",
    "name": "起投金额"
   }
  ]
 },
 {
  "id": "private",
  "name": "私募基金-权益",
  "fields": [
   {
    "id": "return1y",
    "name": "近一年收益率"
   },
   {
    "id": "returnSince",
    "name": "成立以来收益率"
   },
   {
    "id": "term",
    "name": "产品期限"
   },
   {
    "id": "minimum",
    "name": "起购金额"
   },
   {
    "id": "risk",
    "name": "风险等级"
   }
  ]
 },
 {
  "id": "privateMoney",
  "name": "私募产品-货币型",
  "fields": [
   {
    "id": "annual7d",
    "name": "七日年化收益率"
   },
   {
    "id": "income10k",
    "name": "万份收益"
   },
   {
    "id": "minimum",
    "name": "起购金额"
   },
   {
    "id": "risk",
    "name": "风险等级"
   }
  ]
 },
 {
  "id": "asset7",
  "name": "资管计划-7天盈",
  "fields": [
   {
    "id": "annual7d",
    "name": "七日年化收益率"
   },
   {
    "id": "income10k",
    "name": "万份收益"
   },
   {
    "id": "term",
    "name": "产品期限"
   },
   {
    "id": "minimum",
    "name": "起购金额"
   },
   {
    "id": "risk",
    "name": "风险等级"
   }
  ]
 },
 {
  "id": "assetFixed",
  "name": "资管计划-固收",
  "fields": [
   {
    "id": "feeBenchmark",
    "name": "业绩报酬计提基准"
   },
   {
    "id": "term",
    "name": "产品期限"
   },
   {
    "id": "minimum",
    "name": "起购金额"
   },
   {
    "id": "risk",
    "name": "风险等级"
   }
  ]
 },
 {
  "id": "trustFixed",
  "name": "信托-固收",
  "fields": [
   {
    "id": "benchmark",
    "name": "业绩比较基准"
   },
   {
    "id": "term",
    "name": "产品期限"
   },
   {
    "id": "minimum",
    "name": "起购金额"
   },
   {
    "id": "risk",
    "name": "风险等级"
   }
  ]
 },
 {
  "id": "plan",
  "name": "基金投顾（普通产品）",
  "fields": [
   {
    "id": "name",
    "name": "组合名称"
   },
   {
    "id": "code",
    "name": "组合代码"
   },
   {
    "id": "return1y",
    "name": "近一年收益率"
   },
   {
    "id": "returnSince",
    "name": "成立以来收益率"
   },
   {
    "id": "volatility",
    "name": "年化波动率"
   },
   {
    "id": "drawdownSince",
    "name": "成立以来最大回撤"
   },
   {
    "id": "drawdown1y",
    "name": "近一年最大回撤"
   },
   {
    "id": "risk",
    "name": "风险等级"
   },
   {
    "id": "minimum",
    "name": "起购金额"
   },
   {
    "id": "suggestedHold",
    "name": "建议持有时长"
   },
   {
    "id": "equityWeight",
    "name": "权益类仓位"
   }
  ]
 },
 {
  "id": "target",
  "name": "基金投顾（目标盈）",
  "fields": [
   {
    "id": "targetAnnual",
    "name": "目标止盈年化收益率"
   },
   {
    "id": "referencePeriod",
    "name": "参考运作周期"
   }
  ]
 },
 {
  "id": "reverse",
  "name": "通用回购逆回购",
  "fields": [
   {
    "id": "interestDays",
    "name": "计息天数"
   },
   {
    "id": "annualYield",
    "name": "年化收益率"
   },
   {
    "id": "yield10k",
    "name": "万元收益"
   },
   {
    "id": "availableDate",
    "name": "可用日"
   }
  ]
 },
 {
  "id": "quoted",
  "name": "报价回购",
  "fields": [
   {
    "id": "investTerm",
    "name": "投资期限"
   },
   {
    "id": "agreedAnnual",
    "name": "约定年化收益率"
   },
   {
    "id": "minimum",
    "name": "起购金额"
   }
  ]
 }
];
const typeNames=Object.fromEntries(productTypes.map(t=>[t.id,t.name]));
const products=[
 {id:'P001',name:'私募产品甲（示例）',type:'private',values:{return1y:'+5.20%',returnSince:'+8.10%',term:'12个月',minimum:'100万元',risk:'R3（示例）'}},
 {id:'P002',name:'私募产品乙（示例）',type:'private',values:{return1y:'+3.60%',returnSince:'+6.80%',term:'24个月',minimum:'100万元',risk:'R3（示例）'}},
 {id:'F001',name:'公募基金甲（示例）',type:'public',values:{return1y:'+5.20%',return6m:'+2.30%',returnSince:'+8.10%',return3y:null,drawdown1y:'-3.10%',drawdownSince:'-4.20%',manager:'经理甲',risk:'R3（示例）',limit:'1,000元'}},
 {id:'F002',name:'公募基金乙（示例）',type:'public',values:{return1y:'+3.60%',return6m:'+1.20%',returnSince:'+6.80%',return3y:'+7.10%',drawdown1y:'-2.60%',drawdownSince:'-4.10%',manager:'经理乙',risk:'R3（示例）',limit:'2,000元'}},
 {id:'A001',name:'普通投顾甲（示例）',type:'plan',kyp:'追求收益',values:{return1y:'+5.20%',returnSince:'+8.10%',volatility:'8.00%',drawdownSince:'-4.20%',drawdown1y:'-3.10%',risk:'R3（示例）',minimum:'1,000元',suggestedHold:'1年以上',equityWeight:'60%'}},
 {id:'A002',name:'普通投顾乙（示例）',type:'plan',kyp:'稳进增值',values:{return1y:'+3.60%',returnSince:'+6.80%',volatility:'4.00%',drawdownSince:'-2.20%',drawdown1y:'-1.10%',risk:'R2（示例）',minimum:'1,000元',suggestedHold:'6个月以上',equityWeight:'20%'}},
 {id:'N001',name:'首发基金甲（示例）',type:'launch',values:{risk:'R3（示例）',offerEnd:'2026-10-10',proposedManager:'经理丙',fundType:'股票型（示例）',initialAmount:'100元'}},
 {id:'M001',name:'私募货币产品甲（示例）',type:'privateMoney',values:{annual7d:'1.80%',income10k:'0.49元',minimum:'100万元',risk:'R1（示例）'}},
 {id:'S001',name:'7天盈甲（示例）',type:'asset7',values:{annual7d:'1.90%',income10k:'0.52元',term:'7天',minimum:'1万元',risk:'R2（示例）'}},
 {id:'S002',name:'固收资管甲（示例）',type:'assetFixed',values:{feeBenchmark:'3.00%',term:'180天',minimum:'30万元',risk:'R2（示例）'}},
 {id:'T001',name:'固收信托甲（示例）',type:'trustFixed',values:{benchmark:'3.00%',term:'12个月',minimum:'100万元',risk:'R2（示例）'}},
 {id:'G001',name:'目标盈甲（示例）',type:'target',values:{targetAnnual:'3.00%',referencePeriod:'92–365天'}},
 {id:'R001',name:'通用回购逆回购甲（示例）',type:'reverse',values:{interestDays:'3天',annualYield:'1.80%',yield10k:'1.48元',availableDate:'2026-09-14'}},
 {id:'Q001',name:'报价回购甲（示例）',type:'quoted',values:{investTerm:'7天',agreedAnnual:'1.80%',minimum:'1,000元'}},
 {id:'A003',name:'普通投顾丙（示例）',type:'plan',kyp:'灵活使用',values:{return1y:'+1.50%',returnSince:'+2.00%',volatility:'1.00%',drawdownSince:'-0.50%',drawdown1y:'-0.30%',risk:'R1（示例）',minimum:'100元',suggestedHold:'按需持有',equityWeight:'0%'}},
 {id:'A004',name:'普通投顾丁（示例）',type:'plan',kyp:'养老保障',values:{return1y:'+4.00%',returnSince:'+7.00%',volatility:'5.00%',drawdownSince:'-4.00%',drawdown1y:'-2.00%',risk:'R3（示例）',minimum:'1,000元',suggestedHold:'长期持有',equityWeight:'40%'}}
];
const emptySlots=()=>Array.from({length:2},()=>({source:'system',field:'',name:'',value:''}));
const demoSlots=()=>[{source:'custom',field:'',name:'名称示例一',value:'内容示例一'},{source:'custom',field:'',name:'名称示例二',value:'内容示例二'}];
const fieldPool=d=>productTypes.find(t=>t.id===d.product?.type)?.fields||[];
const systemValue=(d,id)=>{const v=id==='name'?d.product?.name:id==='code'?d.product?.id:d.product?.values?.[id];return v===null||v===undefined||v===''?'--':String(v)};
const topicDestination=d=>d.landing?.trim()?'运营配置的落地页：'+d.landing.trim():'待填写落地页地址';
const productDestination=d=>d.landing?.trim()?'配置的跳转地址：'+d.landing.trim():'所选产品详情页';
const productKyp=d=>d.product?.type==='plan'?'<div class="product-kyp"><span>产品 KYP</span><strong>'+e(d.product.kyp||'--')+'</strong><small>系统提供 · 固定展示</small></div>':'';
function slotContent(d,slot){
 if(slot.source==='custom')return {name:slot.name||'待填写名称',value:slot.value||'待填写内容'};
 const f=fieldPool(d).find(f=>f.id===slot.field);
 return {name:f?.name||'待选择字段',value:f?systemValue(d,f.id):'—'};
}

const themeScenes={
 customer:{name:'客户相关',area:'小宝服务区',title:'您新关注的「股票名称」所属概念，近期资金流入',metrics:['近3日累计涨跌幅','近3日累计资金净流入'],count:'同一客户、同一板块一张；符合条件的板块全部展示，不限制总张数。',rules:'客户近7个自然日浏览同一股票超过5次、近7个自然日新增自选该股票，或当前持有该股票，满足一种关联即可。板块近3个自然日累计涨幅超过3%，或累计资金净流入超过30亿元，满足其中一项即可；涨幅刚好3%、净流入刚好30亿元时，该项不算满足条件。还须有可展示的关联基金，才生成卡片。每天符合条件就继续推荐，不限制连续天数。取消一只股票自选后，仍有符合条件的浏览记录、持仓或其他关联股票，且板块表现和关联基金符合要求，就继续推荐。停止后再次符合条件可重新推荐，无需额外等待。',funds:'有1只即可生成，最多显示数仓排序前2只；没有基金则不展示。'},
 market:{name:'市场主线',area:'精选推荐',title:'市场主线｜板块名称',metrics:['10日涨幅','当前涨幅'],count:'每份精选列表最多一张。',rules:'近10个交易日平均热度排名前10，且近10个交易日累计涨幅不低于5%。第10名和涨幅刚好5%都符合。复用行情中心结果，按最新热度的最终唯一名次，选择首个至少有2只关联场外基金的板块；不从榜单外补入。',funds:'板块至少有2只关联场外基金才入选，显示数仓排序前2只；不足时继续检查原榜单后续名次。'},
 short:{name:'短期热点',area:'精选推荐',title:'短期热点｜板块名称',metrics:['5日涨幅','当前涨幅'],count:'每份精选列表最多一张。',rules:'热度排名前30，且近5个交易日累计涨幅不低于3%。第30名和涨幅刚好3%都符合。行情中心盘中更新结果，不额外增加平均热度要求；按最终唯一名次选择首个至少有2只关联场外基金的板块，不从榜单外补入。',funds:'板块至少有2只关联场外基金才入选，显示数仓排序前2只；不足时继续检查原榜单后续名次。'}
};
const themeInfo=d=>themeScenes[d.themeScene]||themeScenes.customer;
const themeAreas=d=>[themeInfo(d).area==='精选推荐'?'精选':'小宝服务区'];
function lockedThemeScene(c){const data=c?.formal||c?.draft?.data;return c?.fixedThemeScene||(data?.tpl==='theme'?(data.themeScene||'customer'):null)}
function invalidGroups(d){return d.scope==='指定客群'?d.groups.filter(g=>['已停用','已删除'].includes(S.groupStates?.[g])):[]}
function groupWarning(d){const names=invalidGroups(d);return names.length?'<div class="notice" role="status">所选客户分组已失效，请重新选择：'+names.map(e).join('、')+'。暂停向这些分组推荐，其他有效分组不受影响；不会自动改为全部客户。</div>':''}
function themeControls(d){const s=themeInfo(d),locked=lockedThemeScene(S.cards.find(c=>c.id===formCard));return row('板块场景',locked?'<div class="readonly" id="themeSceneReadonly">'+e(s.name)+'</div>':'<select id="themeScene" aria-label="板块场景">'+Object.entries(themeScenes).map(([id,v])=>'<option value="'+id+'" '+(id===(d.themeScene||'customer')?'selected':'')+'>'+v.name+'</option>').join('')+'</select>')+'<div class="readonly theme-rule"><strong>'+s.name+' · '+s.area+'</strong><p>'+s.rules.split('。').filter(Boolean).map(e).join('。</p><p>')+'。</p><p>'+s.funds+'</p><p>'+s.count+'</p></div><p class="help">'+(locked?'场景创建后不可更换。需要其他场景时，请新建配置；原配置是否继续使用由运营决定。':'新建时选择场景；首次保存草稿或提交审核后，场景固定。')+'目标客群和展示时间仍可按审核规则修改；系统生成内容只读。</p>';}
function themePreview(d){const s=themeInfo(d);return '<div class="theme-preview-host"><div class="small">'+s.name+'板块卡 · '+s.area+' · 结构示意</div><div class="preview theme-preview"><button class="text theme-sector" data-target="当前板块详情页"><h4>'+e(s.title)+'</h4><strong>板块名称</strong><div class="theme-metrics">'+s.metrics.map(m=>'<span><small>'+m+'</small><strong>指标值</strong></span>').join('')+'</div></button><p class="theme-reason">板块推荐理由</p>'+[1,2].map(i=>'<button class="text theme-fund" data-target="所点击基金的详情页"><strong>基金名称 '+i+'</strong><span>指标值<small>持仓占比</small></span><span>指标值<small>近1年</small></span></button>').join('')+'</div><p class="help">实际卡片内容由系统按已确定的场景规则生成，不同客户看到的内容可能不同。示例不代表固定推荐结果。</p><p class="small">'+s.funds+' 推荐理由缺失时隐藏；基金指标缺失显示“--”，不因此隐藏基金或整卡。</p></div>';}
function themeReviewChanges(c){if(c.draft?.data.tpl!=='theme'||!c.formal)return '';const a=c.formal,b=c.draft.data;return section('themeReviewChanges','当前设置与本次申请','<table class="comparison"><thead><tr><th>配置项</th><th>当前生效</th><th>本次申请</th></tr></thead><tbody>'+[['板块场景',themeInfo(a).name,themeInfo(b).name],['固定区域',areaText(a),areaText(b)],['目标客群',a.scope+(a.groups.length?'：'+a.groups.join('、'):''),b.scope+(b.groups.length?'：'+b.groups.join('、'):'')],['展示时间',a.start+' 至 '+(a.end||'长期'),b.start+' 至 '+(b.end||'长期')],['推荐方式',a.mode,b.mode]].map(r=>'<tr>'+r.map(v=>'<td>'+e(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table><p class="help">审核通过前按当前生效设置运行；通过后使用本次完整申请。已下线的配置仍保持下线。</p>');}

const KEY='wealth-feed-wireframe-v011';
const initialAreas=tpl=>['watch','theme'].includes(tpl)?['小宝服务区']:['精选'];
const areaText=d=>d.tpl==='theme'?themeInfo(d).area:d.tpl==='watch'?'小宝服务区':(d.tpl==='product'||d.tpl==='topic'||d.tpl==='ranking')?'精选推荐':d.areas.join('、');
const blank=()=>({tpl:'product',themeScene:'customer',slots:emptySlots(),title:'',bullets:[''],image:'',imageName:'',product:null,landing:'',areas:['精选'],scope:'全部客户',groups:[],start:(()=>{const d=new Date();d.setDate(d.getDate()+1);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')+'T09:00'})(),end:'',mode:modes[0],pinEnd:'',scenes:[...scenes]});
const demoImage='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="240" height="160" fill="#edf0f2"/><path d="M25 120 L65 95 L100 110 L140 60 L190 75 L220 35" fill="none" stroke="#9ca3ac" stroke-width="3"/><text x="30" y="145" font-size="12" fill="#777">Illustration sample</text></svg>');
const content=(tpl,title,extra={})=>({...blank(),tpl,title,bullets:['卡片介绍示例','第二条介绍示例'],...(!template(tpl).auto?{image:demoImage,imageName:'图文示例.svg'}:{}),...extra});
function seed(){
 const make=(id,data,state='已发布',author='运营 A')=>({id,state,formal:state==='草稿'?null:data,draft:state==='草稿'?{data,status:'编辑中',editor:author,submitter:null}:null,creator:author,created:'2026-09-01',history:[{at:'2026-09-01 09:00',by:author,text:state==='草稿'?'保存草稿':'发布卡片'}]});
 const cards=[
 make('C001',content('product','精选私募产品介绍',{product:products[0],slots:demoSlots()})),
 make('C002',content('product','公募产品介绍',{product:products[2],mode:modes[1],slots:[{source:'system',field:'return1y',name:'',value:''},{source:'custom',field:'',name:'展示名称示例',value:'展示内容示例'}]})),
 make('C003',content('product','普通基金投顾介绍',{product:products[4],slots:[{source:'system',field:'suggestedHold',name:'',value:''},{source:'system',field:'equityWeight',name:'',value:''}],landing:'app://topic/plan-example'})),
 make('C004',content('topic','本周精选专题',{landing:'app://topic/example',mode:modes[2],pinEnd:'2026-09-30T18:00'})),
 make('C005',content('theme','',{themeScene:'customer',areas:['小宝服务区']})),
 make('C006',content('watch','',{areas:['小宝服务区']})),
 make('C007',content('topic','新专题草稿',{landing:'app://topic/new-example'}),'草稿','运营 B')
 ];
 cards[0].draft={data:{...clone(cards[0].formal),title:'精选私募产品新介绍'},status:'待审核',editor:'运营 A',submitter:'运营 A',submittedAt:'2026-09-12T09:00:00+08:00'};
 cards[3].state='已下线';cards[3].draft={data:clone(cards[3].formal),status:'编辑中',editor:'运营 B',submitter:null};
 return {actor:'运营 A',cards,next:8,settings:{current:1,draft:null,history:[]}};
}
let S;try{S=JSON.parse(sessionStorage.getItem(KEY))||seed()}catch{S=seed()}
function persist(){try{sessionStorage.setItem(KEY,JSON.stringify(S));return true}catch{toast('浏览器未能保存演示数据，请减少图片大小后重试。');return false}}
function latest(){try{const value=JSON.parse(sessionStorage.getItem(KEY));if(value)S=value}catch{}}
const now=()=>new Date().toLocaleString('zh-CN',{hour12:false});
function log(c,text){c.history.push({at:now(),by:S.actor,text})}
const cardTitle=d=>d.tpl==='ranking'?'榜单卡片 · '+rankingName(d):template(d.tpl).auto?template(d.tpl).name+(d.tpl==='theme'?' · '+themeInfo(d).name:''):d.title||'未命名卡片';
let extraFilter={kind:'',author:'',from:'',to:''};
let route='',form=null,formCard=null,savedForm='',filter={state:'全部',query:'',tpl:'',mode:''},dialogCloser=null,returnFocus=null;
let timer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('#toast').classList.remove('show'),3500)}
function btn(label,action,primary=false,disabled=false){return '<button '+(primary?'class="primary" ':'')+'data-action="'+action+'" '+(disabled?'disabled':'')+'>'+label+'</button>'}
function closeModal(){if(dialogCloser){const fn=dialogCloser;dialogCloser=null;fn();return}$('#overlay').classList.remove('open');returnFocus?.focus?.()}
function modal(title,body,foot,wide=false){
 returnFocus=document.activeElement;dialogCloser=null;$('#dialogTitle').textContent=title;$('#dialogBody').innerHTML=body;$('#dialogFoot').innerHTML=foot;$('#dialog').classList.toggle('wide',wide);$('#overlay').classList.add('open');
 setTimeout(()=>$('#dialog').querySelector('input:not(:disabled),select:not(:disabled),button:not(:disabled)')?.focus(),0);
}
function confirmation(title,text,label,action){modal(title,'<p>'+e(text)+'</p>',btn('取消','close')+btn(label,'confirm',true));$('#dialogFoot [data-action=confirm]').onclick=()=>{closeModal();action()}}
function dirty(){return form&&JSON.stringify(form)!==savedForm}
function go(dest,force=false){
 if(!force&&dirty()){confirmation('离开编辑页面？','当前内容尚未保存，离开后本次未保存的内容将丢失。','离开',()=>go(dest,true));$('#dialogFoot [data-action=close]').textContent='继续编辑';return}
 form=null;formCard=null;route=dest;location.hash=dest;render();
}
function heading(title,sub,actions=''){return '<div class="heading"><div><h1>'+e(title)+'</h1><div class="small">'+sub+'</div></div><div class="buttons">'+actions+'</div></div>'}
function dataOf(c){return c.formal||c.draft?.data||blank()}
function draftLabel(c){return !c.formal?'—':c.draft?(c.draft.status==='待审核'?'待审核':'待提交审核'):'无修改稿'}
function statusLabel(c){return c.formal?c.state:c.draft?.status==='待审核'?'待审核':'草稿'}
function cardActions(c){const name=c.draft?.status==='待审核'?(c.formal?'查看修改稿':'查看申请'):c.draft?'继续编辑':'编辑';return '<button class="text" data-go="edit='+c.id+'">'+name+'</button> <button class="text" data-go="effects='+c.id+'">查看效果</button> <button class="text" data-more="'+c.id+'">更多⌄</button>'}
function renderList(){
 const list=S.cards.filter(c=>{const d=dataOf(c);return (filter.state==='全部'||statusLabel(c)===filter.state)&&(cardTitle(d).includes(filter.query)||template(d.tpl).name.includes(filter.query))&&(!filter.tpl||d.tpl===filter.tpl)&&(!filter.mode||d.mode===filter.mode)&&(!extraFilter.kind||(template(d.tpl).auto?'数据卡':'内容卡')===extraFilter.kind)&&(!extraFilter.author||(c.draft?.submitter||c.draft?.editor||c.creator)===extraFilter.author)&&(!extraFilter.from||d.start.slice(0,10)>=extraFilter.from)&&(!extraFilter.to||d.start.slice(0,10)<=extraFilter.to)});
 $('#app').innerHTML=heading('卡片管理','管理卡片内容、展示安排与推荐方式',btn('推荐设置'+(S.settings.draft?.status==='待审核'?' · 待审核':''),'settings')+btn('＋ 新建卡片','new',true))+
 '<div class="tablewrap"><div class="tabs">'+['全部','草稿','待审核','已发布','已下线'].map(s=>'<button data-tab="'+s+'" class="'+(filter.state===s?'active':'')+'">'+s+' '+S.cards.filter(c=>s==='全部'||statusLabel(c)===s).length+'</button>').join('')+'</div>'+
 '<div class="filters"><input id="search" placeholder="搜索卡片标题或模板名称" value="'+e(filter.query)+'"><label>推荐方式</label><select id="filterMode"><option value="">全部</option>'+modes.map(m=>'<option '+(m===filter.mode?'selected':'')+'>'+m+'</option>').join('')+'</select><label>模板</label><select id="filterTpl"><option value="">全部</option>'+T.map(t=>'<option value="'+t.id+'" '+(t.id===filter.tpl?'selected':'')+'>'+t.name+'</option>').join('')+'</select>'+btn('更多筛选','moreFilters')+btn('重置','reset')+'</div>'+
 '<table class="list"><thead><tr>'+['卡片名称','模板','卡片状态','修改稿状态','推荐方式','目标客群','展示区域','设定展示时间','创建人 / 时间','操作'].map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+list.map(c=>{const d=dataOf(c);return '<tr><td><div class="listtitle">'+e(cardTitle(d))+'</div><div class="small">'+c.id+(template(d.tpl).auto?' · 系统生成':'')+'</div></td><td>'+template(d.tpl).name+'</td><td><span class="tag">'+statusLabel(c)+'</span></td><td>'+draftLabel(c)+'</td><td>'+d.mode+'</td><td>'+e(d.scope)+groupWarning(d)+'</td><td>'+e(areaText(d))+'</td><td>'+e(d.start.replace('T',' '))+'<div class="small">'+(d.end?e(d.end.replace('T',' ')):'长期展示')+'</div></td><td>'+e(c.creator)+'<div class="small">'+e(c.created)+'</div></td><td>'+cardActions(c)+'</td></tr>'}).join('')+'</tbody></table>'+(list.length?'':'<div class="empty">没有符合条件的卡片，请调整筛选条件。<div style="margin-top:12px">'+btn('新建卡片','new')+'</div></div>')+'</div><p class="help">列表按运营创建的配置展示，不逐张列出为客户生成的卡片。不同板块场景分别新建配置。</p>';
 $('#search').oninput=ev=>{filter.query=ev.target.value;const pos=ev.target.selectionStart;renderList();$('#search').focus();$('#search').setSelectionRange(pos,pos)};
 $('#filterMode').onchange=ev=>{filter.mode=ev.target.value;renderList()};$('#filterTpl').onchange=ev=>{filter.tpl=ev.target.value;renderList()};
}

function moreFilters(){
 modal('更多筛选',row('内容生成方式','<select id="extraKind"><option value="">全部</option>'+['内容卡','数据卡'].map(v=>'<option '+(v===extraFilter.kind?'selected':'')+'>'+v+'</option>').join('')+'</select>')+
 row('提交人','<select id="extraAuthor"><option value="">全部</option>'+['运营 A','运营 B'].map(v=>'<option '+(v===extraFilter.author?'selected':'')+'>'+v+'</option>').join('')+'</select>')+
 row('展示开始日期','<div class="inline"><input id="extraFrom" type="date" value="'+e(extraFilter.from)+'">至<input id="extraTo" type="date" value="'+e(extraFilter.to)+'"></div>'),btn('取消','close')+btn('确定','applyFilters',true));
 $('#dialogFoot [data-action=applyFilters]').onclick=()=>{const from=$('#extraFrom').value,to=$('#extraTo').value;if(from&&to&&from>to){toast('结束日期不能早于开始日期。');return}extraFilter={kind:$('#extraKind').value,author:$('#extraAuthor').value,from,to};closeModal();renderList()};
}

function section(id,title,body,sub=''){return '<section class="section" id="'+id+'"><h2>'+title+'<span>'+sub+'</span></h2><div class="sectionbody">'+body+'</div></section>'}
function row(label,html){return '<div class="row"><div class="label">'+label+'</div><div>'+html+'</div></div>'}
function input(name,value,placeholder='',type='text'){return '<input type="'+type+'" data-field="'+name+'" value="'+e(value)+'" placeholder="'+e(placeholder)+'">'}
function autoDetails(d){
 if(d.tpl==='theme')return '<div class="readonly"><p>系统按已确定的场景规则生成板块投资卡片，统一使用常规推荐。</p><p>关联基金、基金顺序和推荐理由由数仓提供；标题和指标由系统生成，运营不逐张填写或选基金。</p></div>';
 return '<div class="readonly"><p>客户有该自选基金，并命中已启用场景且符合展示条件时，系统生成卡片，仅在小宝服务区展示。</p><p>多只基金或多个场景可分别生成卡片，不限制总数；同一客户、同一基金、同一场景只保留一张。客户已持有该基金不影响展示。</p></div>';
}
function watchSceneControls(d){
 return '<div class="watch-scene-intro">勾选即启用，可只保留其中一个场景。规则由系统执行，无需填写阈值或推荐天数。</div><div class="watch-scenes">'+scenes.map((s,i)=>{
  const on=d.scenes.includes(s),r=watchRules[s];
  return '<div class="watch-scene-item" data-scene-item="'+e(s)+'"><div class="watch-scene-heading"><label class="scene"><input type="checkbox" data-scene="'+e(s)+'" aria-describedby="watchBrief'+i+'" '+(on?'checked':'')+'>'+e(s)+'</label><span class="scene-status">'+(on?'已启用':'已关闭')+'</span></div><p class="watch-scene-brief" id="watchBrief'+i+'">'+e(r.brief)+'</p><details class="watch-rule-detail"><summary>查看规则</summary><ul>'+r.details.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul></details></div>';
 }).join('')+'</div><p class="help">已发布或已下线配置的开关调整须审核，通过前继续使用原设置。自然日包含周末和节假日，触发当天为第1天。</p>';
}
function watchScenePreview(name){
 const r=watchRules[name];
 return '<div class="preview watch-preview-card" role="button" tabindex="0" data-target="当前基金的产品详情页" aria-label="查看当前基金的产品详情页"><div class="small">'+e(name)+' · 文案示例</div><h4>'+e(r.example)+'</h4><div class="watch-preview-data">场景指标／图表位置示意<br><small>具体图表与完整布局待确认</small></div><p>'+e(r.note)+'</p><div class="watch-preview-bottom"><strong>示例基金名称</strong><button class="text" data-target="自选列表">更多 →</button></div></div>';
}
function watchPreview(d,preferred=''){
 const enabled=scenes.filter(s=>d.scenes.includes(s));
 if(!enabled.length)return '<div class="watch-preview-empty"><strong>当前未启用场景</strong><p>此配置不会生成自选服务卡片。启用任一场景后，可查看对应示例。</p></div>';
 const selected=enabled.includes(preferred)?preferred:enabled[0];
 return '<div class="watch-preview-host"><label class="watch-preview-picker">预览场景<select data-watch-preview aria-label="预览场景">'+enabled.map(s=>'<option '+(s===selected?'selected':'')+'>'+e(s)+'</option>').join('')+'</select></label><div class="help">仅切换预览，不改变启用设置。</div><div data-watch-preview-content>'+watchScenePreview(selected)+'</div><div class="small">一张卡片的场景示例；实际内容由系统生成，不代表客户固定看到的结果。</div></div>';
}
function watchReviewChanges(c){
 if(c.draft.data.tpl!=='watch'||!c.formal)return '';
 const a=c.formal,b=c.draft.data,rows=scenes.map(name=>[name,a.scenes.includes(name)?'启用':'关闭',b.scenes.includes(name)?'启用':'关闭']);
 rows.push(['目标客群',a.scope+(a.groups.length?'：'+a.groups.join('、'):''),b.scope+(b.groups.length?'：'+b.groups.join('、'):'')],['展示时间',a.start+' 至 '+(a.end||'长期展示'),b.start+' 至 '+(b.end||'长期展示')],['固定区域',areaText(a),areaText(b)],['推荐方式',a.mode,b.mode]);
 return section('watchReviewChanges','当前设置与本次申请','<p class="help">审核启用场景、目标客群和展示时间；不逐个客户核对系统生成的实时内容。审核通过前原设置继续生效。</p><table class="comparison"><thead><tr><th>配置项</th><th>当前生效</th><th>本次申请</th></tr></thead><tbody>'+rows.map(r=>'<tr'+(r[1]!==r[2]?' class="changed"':'')+'>'+r.map(v=>'<td>'+e(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table>');
}
function manualFields(d){
 return row('卡片标题',input('title',d.title,'填写客户看到的标题'))+
 row('左侧介绍','<div class="bullets">'+d.bullets.map((b,i)=>'<div class="bullet"><input data-bullet="'+i+'" value="'+e(b)+'" placeholder="填写一条介绍"><button type="button" class="text" data-remove-bullet="'+i+'" aria-label="删除第'+(i+1)+'条介绍">移除</button></div>').join('')+'</div><div class="help">'+btn('＋ 添加介绍','addBullet')+'</div>')+
 row('右侧图片','<input id="file" type="file" accept="image/*" hidden><button type="button" data-action="upload">'+(d.image?'更换图片':'选择图片')+'</button>'+(d.image?' <button class="text" data-action="removeImage">移除图片</button>':'')+'<div class="help">'+(d.imageName?e(d.imageName):'由运营上传，按上传图片展示。')+'</div>'+(d.image?'<div class="imagebox"><img alt="已选图片" src="'+e(d.image)+'"></div>':'')+'<div class="help">可选择本地图片预览；尺寸、大小与填写要求待确认。</div>')+
 (d.tpl==='topic'?row('落地页地址',input('landing',d.landing,'填写客户点击卡片后打开的地址')+'<div class="help">点击整卡打开填写的地址，可填写外部网站地址。</div><div class="destination-hint" id="topicDestinationHint">实际去向：'+e(topicDestination(d))+'</div>'):
 row('关联产品',btn(d.product?'更换产品':'搜索选择产品','products')+(d.product?'<div class="readonly chosen-product">'+e(d.product.name)+'<div class="small">'+e(d.product.id)+' · '+e(typeNames[d.product.type])+'</div></div>':'<div class="help">按名称或代码搜索已支持类型的产品，选择一款即可；选中后带出对应字段。</div>'))+
 '<div id="productKyp">'+productKyp(d)+(d.product?.type==='plan'?'<p class="help">客户卡片显示在产品名称下方，不占两个展示位，不提供编辑或关闭入口。以下分类与数值均为示例。</p>':'')+'</div>'+
 '<div id="displaySlots">'+renderSlots(d)+'</div>'+row('跳转地址（选填）',input('landing',d.landing,'留空时进入所选产品详情页')+'<div class="help">填写后整张卡片打开该地址；留空时打开所选产品详情页。</div><div class="destination-hint" id="destinationHint">实际去向：'+e(productDestination(d))+'</div>'));
}
function renderSlots(d){
 if(!d.product)return '<div class="readonly">选好关联产品后，配置底部两个展示位。</div>';
 return '<div class="field-note">两个展示位分别选择内容来源。系统字段按所选产品类型提供；字段清单已确认，当前数值均为示例。</div>'+
 d.slots.map((slot,i)=>{
 const fields=fieldPool(d),other=d.slots[1-i],v=slotContent(d,slot);
 return '<div class="slot-panel" data-slot-panel="'+i+'"><h3>展示位 '+(i+1)+'<span class="small">'+(i===0?'左侧':'右侧')+'</span></h3>'+
 '<div class="slot-sources" role="radiogroup" aria-label="展示位 '+(i+1)+' 内容来源">'+[['system','系统字段'],['custom','自定义输入']].map(([val,label])=>'<label><input type="radio" name="slotSource'+i+'" data-slot-source="'+i+'" value="'+val+'" '+(slot.source===val?'checked':'')+'>'+label+'</label>').join('')+'</div>'+
 (slot.source==='custom'?row('字段名称','<input data-slot-name="'+i+'" aria-label="展示位 '+(i+1)+' 字段名称" value="'+e(slot.name)+'" placeholder="填写客户看到的名称">')+
 row('展示内容','<input data-slot-value="'+i+'" aria-label="展示位 '+(i+1)+' 展示内容" value="'+e(slot.value)+'" placeholder="可填写数字、文字、日期或期限">')+
 '<p class="help">自定义内容不会随产品数据更新，请及时维护。只影响当前卡片。</p>':
 row('选择字段','<select data-slot-field="'+i+'" aria-label="展示位 '+(i+1)+' 系统字段" '+(!fields.length?'disabled':'')+'><option value="">'+(fields.length?'请选择系统字段':'字段清单待业务确认')+'</option>'+fields.map(f=>'<option value="'+f.id+'" '+(slot.field===f.id?'selected':'')+' '+(other.source==='system'&&other.field===f.id?'disabled':'')+'>'+f.name+(other.source==='system'&&other.field===f.id?'（另一展示位已选）':'')+'</option>').join('')+'</select>')+
 (fields.length?'<div class="field-value"><span class="small">系统数据 · 示例</span><strong>'+e(v.value)+'</strong>'+(slot.field&&v.value==='--'?'<div class="help">该字段暂无数据，客户侧显示 --。可以保留该字段并提交审核，不影响本卡其他内容。</div>':'')+'</div>':'<div class="help">本类型暂不提供系统字段示例，可切换自定义输入体验填写流程。</div>'))+'</div>';
 }).join('')+'<p class="help">演示说明：切换来源暂保留本位置已输入内容，最终保留方式与填写长度待确认；更换产品会清空两个位置。</p>';
}
function bindSlots(){
 $$('[data-slot-source]').forEach(el=>el.onchange=()=>{const i=Number(el.dataset.slotSource);form.slots[i].source=el.value;if(el.value==='system'&&form.slots[1-i].source==='system'&&form.slots[1-i].field===form.slots[i].field)form.slots[i].field='';$('#displaySlots').innerHTML=renderSlots(form);bindSlots();renderPreview()});
 $$('[data-slot-field]').forEach(el=>el.onchange=()=>{const i=Number(el.dataset.slotField),other=form.slots[1-i];if(other.source==='system'&&other.field===el.value&&el.value){toast('两个展示位不能选择同一个系统字段。');el.value=form.slots[i].field;return}form.slots[i].field=el.value;$('#displaySlots').innerHTML=renderSlots(form);bindSlots();renderPreview()});
 $$('[data-slot-name]').forEach(el=>el.oninput=()=>{form.slots[Number(el.dataset.slotName)].name=el.value;renderPreview()});
 $$('[data-slot-value]').forEach(el=>el.oninput=()=>{form.slots[Number(el.dataset.slotValue)].value=el.value;renderPreview()});
}
const rankingOptions=[{id:'demo-rank-1',name:'榜单示例一'},{id:'demo-rank-2',name:'榜单示例二'}];
const rankingName=d=>rankingOptions.find(x=>x.id===d.rankingId)?.name||'尚未选择榜单';
function rankingFields(d,c){
 return row('选择榜单','<select id="rankingId" aria-label="选择榜单" '+(c?.formal?'disabled':'')+'><option value="">请选择一个榜单</option>'+rankingOptions.map(x=>'<option value="'+x.id+'" '+(x.id===d.rankingId?'selected':'')+'>'+e(x.name)+'</option>').join('')+'</select><p class="help">一张配置对应一个榜单。此处使用演示选项，正式榜单由“榜单选基”提供。</p>')+
 '<p>基金名单、榜内排序和指标沿用所选榜单，无需重复填写。榜单数据正常更新无需重新审核。</p>'+
 (c?.formal?'<p class="help">已有配置能否更换榜单仍待确认，本次演示保留原榜单。目标客群和展示时间可正常修改并提交审核。</p>':'');
}

function renderEditor(id,isNew=false){
 const c=isNew?null:S.cards.find(x=>x.id===id);
 if(!isNew&&!c){go('list',true);toast('未找到该卡片，请从列表重新进入。');return}
 if(!form){form=clone(c?.draft?.data||c?.formal||blank());formCard=c?.id||null;savedForm=JSON.stringify(form)}
 const d=form,t=template(d.tpl),pending=c?.draft?.status==='待审核';
 if(d.tpl==='ranking'){d.areas=['精选'];d.mode='待确认';d.pinEnd='';}
 $('#app').innerHTML=heading(isNew?'新建卡片':pending?'查看审核申请':c.formal?'修改卡片':'编辑草稿',
 c?'<span class="tag">'+statusLabel(c)+'</span>　<span class="tag">'+draftLabel(c)+'</span>':'选模板后，页面会显示需要配置的内容。',
 (c?.formal?btn('查看已发布内容','current'):'')+btn('返回列表','back'))+
 '<div class="notice">'+(pending?'申请正在审核，暂不能编辑。审核通过前原内容和设置不变；卡片是否展示仍按当前状态判断。':c?.formal?'修改稿是本次修改、尚未生效的内容。审核通过后再更新已发布内容和设置；已下线的卡片仍保持下线。':d.tpl==='ranking'?'选择榜单并设置目标客群和展示时间，可保存草稿或提交审核。审核通过并发布成功后，符合展示条件才参与推荐。':t.auto?'系统按已确定的场景规则生成卡片，运营不用逐张填写。首次发布及发布后人工修改配置均须审核；系统正常更新数据无需重复审核。':'填写卡片内容和展示安排后提交审核。')+'</div>'+
 '<nav class="steps">'+['选择模板',d.tpl==='ranking'?'选择榜单':d.tpl==='watch'?'选择服务场景':d.tpl==='theme'?(lockedThemeScene(c)?'板块场景':'选择板块场景'):t.auto?'生成内容':'填写内容','选择客群','设置展示时间','推荐与展示'].map((n,i)=>'<a href="#" data-scroll="s'+i+'"><b>'+(i+1)+'</b>'+n+'</a>').join('')+'</nav><div class="columns"><div><div class="error" id="errors" role="alert"></div><fieldset '+(pending?'disabled':'')+'>'+
 section('s0','选择模板',row('卡片模板','<select id="template" '+(c?.formal||lockedThemeScene(c)?'disabled':'')+'>'+T.map(x=>'<option value="'+x.id+'" '+(x.id===d.tpl?'selected':'')+'>'+x.name+'</option>').join('')+'</select><div class="help">'+t.kind+'</div>'))+
 section('s1',d.tpl==='ranking'?'选择榜单':d.tpl==='watch'?'选择服务场景':d.tpl==='theme'?(lockedThemeScene(c)?'板块场景':'选择板块场景'):t.auto?'生成内容':'填写内容',d.tpl==='ranking'?rankingFields(d,c):t.auto?autoDetails(d)+(d.tpl==='watch'?watchSceneControls(d):d.tpl==='theme'?themeControls(d):''):manualFields(d),t.auto?'内容由系统生成':'运营配置')+
 section('s2','选择客群',row('目标客群','<div class="scope">'+['全部客户','指定客群'].map(v=>'<label><input type="radio" name="scope" value="'+v+'" '+(v===d.scope?'checked':'')+'>'+v+'</label>').join('')+'</div>'+(d.scope==='指定客群'?'<input id="groupSearch" placeholder="搜索已有客群名称或编号"><div class="groupbox">'+[...new Set(['G001 已有客群 A','G002 已有客群 B',...d.groups])].map(g=>'<div class="groupitem"><label><input type="checkbox" data-group="'+g+'" '+(d.groups.includes(g)?'checked':'')+'>'+e(g)+(S.groupStates?.[g]?'（'+e(S.groupStates[g])+'）':'（示例，规模 1,200 人）')+'</label></div>').join('')+'</div>':'')+'<div id="groupWarning">'+groupWarning(d)+'</div><div class="help">选择已有客户分组。分组被删除或停用后，仅暂停向该分组推荐，其他有效分组不受影响，不自动改为全部客户。名称、规模与状态为演示数据。</div>'))+
 section('s3','设置展示时间',row('开始时间',input('start',d.start,'','datetime-local'))+row('结束时间','<label class="radio"><input id="longTerm" type="checkbox" '+(!d.end?'checked':'')+'>长期展示</label>'+(d.end?'<div style="margin-top:12px">'+input('end',d.end,'','datetime-local')+'</div>':'<p class="help" id="longTermHelp">无需定期延长展示时间；卡片仍需符合内容、数据和客户展示条件。</p>')))+
 section('s4','推荐与展示',row('展示区域',d.tpl==='ranking'?'<div class="readonly fixed-area">精选推荐</div>':d.tpl==='watch'?'<div class="readonly fixed-area">小宝服务区</div><div class="help">全部自选服务场景仅在小宝服务区展示，不进入精选推荐。命中且符合条件的卡片全部展示，不限制数量；排序只决定先后。</div>':(d.tpl==='product'||d.tpl==='topic')?'<div class="readonly fixed-area">精选推荐</div><div class="help">'+(d.tpl==='topic'?'机动类专题仅在精选推荐展示，不在小宝服务区展示。':'产品图文卡仅在精选推荐展示，展示区域固定。')+'</div>':'<div class="readonly fixed-area">'+areaText(d)+'</div><div class="help">展示区域由所选场景固定，不提供切换。'+themeInfo(d).count+'</div>')+
 row('推荐方式',d.tpl==='ranking'?'<div class="readonly">待确认</div><p class="help">不影响本页保存和审核演示。实际推荐方式确认后补齐。</p>':t.auto?'<div class="readonly">常规推荐<div class="small">按所选场景生成内容，按未看过优先的规则排序。</div></div>':'<div class="choicegroup">'+modes.map((m,i)=>'<label class="choice"><span class="choose"><input type="radio" name="mode" value="'+m+'" '+(m===d.mode?'checked':'')+'>'+m+'</span><div class="help">'+['优先安排客户未看过的卡片','按未看过优先的顺序，在探索数量上限内选卡','最多展示 3 张，按本次置顶生效时间由新到旧选择'][i]+'</div></label>').join('')+'</div>')+
 (d.mode===modes[2]?row('置顶结束',input('pinEnd',d.pinEnd,'','datetime-local')+'<div class="help">置顶到期后自动转为常规推荐；展示时间已结束、卡片已下线或不符合展示条件时，不再向客户推荐。</div>'):'')+
 (t.auto?'<p class="help">'+(d.tpl==='watch'?'客户取消自选、对应场景关闭、配置下线或展示时间结束后，不再向客户推荐。':'小宝服务区仅展示自选服务卡和与客户相关的板块投资卡。')+'实际效果汇总方式待确认。</p>':''))+
 '</fieldset></div><aside class="aside"><div class="asidepanel"><h3>卡片结构预览</h3><div id="preview"></div><div class="help">灰阶结构示意，不代表最终 App 视觉。数据与图片均未接入真实服务。</div></div><div class="asidepanel"><h3>展示摘要</h3><dl class="summary"><div><dt>内容来源</dt><dd>'+t.kind+'</dd></div><div><dt>区域</dt><dd id="summaryAreas">'+areaText(d)+'</dd></div><div><dt>推荐方式</dt><dd id="summaryMode">'+d.mode+'</dd></div>'+(d.tpl==='watch'?'<div><dt>启用场景</dt><dd id="summaryScenes">'+d.scenes.length+' / 5</dd></div>':'')+'</dl></div></aside></div>';
 $('#footer').hidden=false;$('#footer').innerHTML='<span class="statusmsg">'+(pending?'申请人：'+e(c.draft.submitter):c?.draft?'已保留一份'+(c.formal?'修改稿':'草稿'):'保存后可从列表继续编辑')+'</span><div class="buttons">'+(pending?btn('撤回申请','withdraw'):
 (c?.formal&&c?.draft?btn('放弃修改','abandon'):'')+btn('保存草稿','save')+btn('提交审核','submit',true))+'</div>';
 renderPreview();bindEditor();
}
function previewMarkup(d,preferredScene=''){
 if(d.tpl==='watch')return watchPreview(d,preferredScene);
 if(d.tpl==='theme')return themePreview(d);
 const t=template(d.tpl);let inner;
 if(d.tpl==='ranking')inner='<div class="ranking-heading"><h4>'+e(rankingName(d))+'</h4></div><p>榜单说明</p><div class="rank-head"><span>基金名称</span><span>该榜指标一</span><span>该榜指标二</span></div>'+Array.from({length:5},(_,i)=>'<div class="rank-row"><span>基金示例 '+(i+1)+'</span><span>—</span><span>—</span></div>').join('')+'<div class="ranking-links"><span>查看完整榜单 ›</span></div>';
 else inner='<h4>'+e(d.title||'卡片标题')+'</h4><div class="previewcols"><ul>'+d.bullets.map(b=>'<li>'+e(b||'介绍内容')+'</li>').join('')+'</ul>'+(d.image?'<img src="'+e(d.image)+'" alt="上传图片预览">':'<div class="imageplaceholder">右侧图片</div>')+'</div>'+
 (d.tpl==='product'?'<div class="product-bottom"><div class="product-identity"><strong>'+e(d.product?.name||'已选产品名称')+'</strong>'+(d.product?.type==='plan'?'<small class="product-inline-kyp">'+e(d.product.kyp||'--')+'</small>':'')+'</div>'+d.slots.map(slot=>{const v=slotContent(d,slot);return '<div class="preview-slot"><strong>'+e(v.value)+'</strong><small>'+e(v.name)+'</small></div>'}).join('')+'</div>':'')+
 '<hr><button class="text destination-button" data-target="'+e(d.tpl==='topic'?topicDestination(d):productDestination(d))+'">整卡点击 → '+(d.tpl==='topic'?'落地页':d.landing?.trim()?'配置的跳转地址':'产品详情页')+'</button>';
 if(d.tpl==='topic'){
  inner=inner.replace(/<hr><button[\s\S]*?<\/button>$/,'');
  return '<div class="preview topic-preview" role="button" tabindex="0" aria-label="查看专题卡跳转去向" data-target="'+e(topicDestination(d))+'">'+inner+'</div><div class="help topic-preview-destination">整卡点击 → '+e(d.landing?.trim()||'待填写落地页地址')+'</div>';
 }
 return '<div class="preview">'+inner+'</div>'+(t.auto?'<div class="small">此处只举一张示例；实际内容由系统根据客户情况生成。</div>':'');
}
function renderPreview(){if(form&&$('#preview')){const preferred=$('#preview [data-watch-preview]')?.value;$('#preview').innerHTML=previewMarkup(form,preferred)}if(form&&$('#summaryScenes'))$('#summaryScenes').textContent=form.scenes.length+' / 5';if(form&&$('#destinationHint'))$('#destinationHint').textContent='实际去向：'+productDestination(form);if(form&&$('#topicDestinationHint'))$('#topicDestinationHint').textContent='实际去向：'+topicDestination(form)}

function bindEditor(){
 if($('#rankingId'))$('#rankingId').onchange=ev=>{form.rankingId=ev.target.value;renderPreview()};
 bindSlots();
 if($('#themeScene'))$('#themeScene').onchange=ev=>{if(lockedThemeScene(S.cards.find(c=>c.id===formCard))){toast('已有板块配置不可更换场景，请新建配置。');renderEditor(formCard,false);return}form.themeScene=ev.target.value;form.areas=themeAreas(form);renderEditor(formCard,!formCard);$('#themeScene').focus()};
 $$('[data-field]').forEach(el=>el.oninput=()=>{form[el.dataset.field]=el.value;renderPreview()});
 $$('[data-bullet]').forEach(el=>el.oninput=()=>{form.bullets[Number(el.dataset.bullet)]=el.value;renderPreview()});
 $('#template').onchange=ev=>{if(lockedThemeScene(S.cards.find(c=>c.id===formCard))){toast('已有板块配置的模板与场景固定，请新建其他配置。');renderEditor(formCard,false);return}const id=ev.target.value;form={...blank(),tpl:id,areas:initialAreas(id),start:form.start};renderEditor(formCard,!formCard)};
 $$('[name=scope]').forEach(el=>el.onchange=()=>{form.scope=el.value;renderEditor(formCard,!formCard)});
 $$('[name=mode]').forEach(el=>el.onchange=()=>{form.mode=el.value;renderEditor(formCard,!formCard)});
 $$('[data-scene]').forEach(el=>el.onchange=()=>{form.scenes=$$('[data-scene]:checked').map(x=>x.dataset.scene);el.closest('[data-scene-item]').querySelector('.scene-status').textContent=el.checked?'已启用':'已关闭';renderPreview()});
 $$('[data-group]').forEach(el=>el.onchange=()=>{form.groups=$$('[data-group]:checked').map(x=>x.dataset.group);$('#groupWarning').innerHTML=groupWarning(form)});
 $$('[data-area]').forEach(el=>el.onchange=()=>{form.areas=$$('[data-area]:checked').map(x=>x.dataset.area);$('#summaryAreas').textContent=form.areas.join('、')||'未选择'});
 $('#longTerm').onchange=ev=>{form.end=ev.target.checked?'':'2026-09-30T18:00';renderEditor(formCard,!formCard)};
 if($('#groupSearch'))$('#groupSearch').oninput=ev=>{const q=ev.target.value;$$('.groupitem').forEach(el=>el.hidden=!el.textContent.includes(q));};
 if($('#file'))$('#file').onchange=ev=>{const f=ev.target.files[0];if(!f)return;if(!f.type.startsWith('image/')){toast('请选择图片文件。');return}const reader=new FileReader();reader.onload=()=>{form.image=reader.result;form.imageName=f.name;renderEditor(formCard,!formCard)};reader.readAsDataURL(f)};
}
function chooseProduct(){
 let q='';const render=()=>{const found=products.filter(p=>!q||p.name.toLowerCase().includes(q.toLowerCase())||p.id.toLowerCase().includes(q.toLowerCase()));$('#productResults').innerHTML=found.map(p=>'<button class="productrow" data-product="'+p.id+'"><span>'+e(p.name)+'<br><small>'+p.id+' · '+e(typeNames[p.type])+'</small></span><span>'+(form.product?.id===p.id?'已选择':'选择')+'</span></button>').join('')||'<div class="empty">没有找到相关产品，请更换名称或代码。</div>'};
 modal('选择关联产品','<label for="productSearch" class="small">搜索关联产品</label><input id="productSearch" placeholder="输入产品名称或代码"><div class="help">支持 11 类产品，当前列表中的产品和数值均为示例，不代表实际在售产品范围。</div><div id="productResults"></div>',btn('取消','close'));render();$('#productSearch').oninput=ev=>{q=ev.target.value.trim();render()};
}

function issues(d,c,phase='edit'){
 const a=[],t=template(d.tpl);if(!t.auto&&d.tpl!=='ranking'&&!d.title.trim())a.push('请填写卡片标题。');
 if(d.tpl==='ranking'&&!rankingOptions.some(x=>x.id===d.rankingId))a.push('请选择一个榜单。');
 if(d.tpl==='ranking'&&c?.formal&&d.rankingId!==c.formal.rankingId)a.push('已有配置更换榜单规则待确认，本次演示请保留原榜单。');
 if(d.tpl==='product'&&!d.product)a.push('请选择关联产品。');
 if(d.tpl==='product'&&!d.bullets.some(v=>v.trim()))a.push('请填写左侧介绍。');
 if(d.tpl==='product'&&!d.image)a.push('请选择右侧图片。');
 if(d.tpl==='product'&&(d.areas.length!==1||d.areas[0]!=='精选'))a.push('产品图文卡仅在精选推荐展示。');
 if(d.tpl==='theme'&&(!themeScenes[d.themeScene]||JSON.stringify(d.areas)!==JSON.stringify(themeAreas(d))))a.push('请选择板块场景，展示区域由场景固定。');
 if(t.auto&&d.mode!==modes[0])a.push('板块投资、自选服务仅使用常规推荐。');
 if(d.tpl==='product'&&d.product){
  d.slots.forEach((slot,i)=>{if(slot.source==='system'&&!fieldPool(d).some(f=>f.id===slot.field))a.push('请选择展示位 '+(i+1)+' 的系统字段，或使用自定义输入。');if(slot.source==='custom'&&(!slot.name.trim()||!slot.value.trim()))a.push('请补全展示位 '+(i+1)+' 的字段名称与展示内容（演示检查）。');});
  if(d.slots.every(x=>x.source==='system')&&d.slots[0].field&&d.slots[0].field===d.slots[1].field)a.push('两个展示位不能选择同一个系统字段。');
 }
 if(d.tpl==='topic'&&!d.landing.trim())a.push('请填写落地页。');
 if(!d.areas.length)a.push('请选择展示区域。');
 if(lockedThemeScene(c)&&(d.tpl!=='theme'||d.themeScene!==lockedThemeScene(c)))a.push('已有板块配置不可更换场景；需要其他场景时请新建配置。');
 if(d.scope==='指定客群'&&!d.groups.length)a.push('请选择至少一个已有客群。');
 if(!d.start)a.push('请设置开始时间。');
 if(phase==='edit'&&!c?.formal&&d.start&&new Date(d.start)<new Date())a.push('新建卡片的开始时间不能早于当前时间。');
 if(d.end&&d.end<=d.start)a.push('结束时间需晚于开始时间。');
 if(d.end&&new Date(d.end)<=new Date())a.push('展示结束时间已过，请调整后再提交。');
 if(d.mode===modes[2]&&(!d.pinEnd||d.pinEnd<=d.start||new Date(d.pinEnd)<=new Date()))a.push('请设置有效的置顶结束时间。');
 return a;
}
function saveCard(action){
 if(form.tpl==='theme'){form.areas=themeAreas(form);form.mode=modes[0];form.pinEnd='';}
 if(form.tpl==='ranking'){form.areas=['精选'];form.mode='待确认';form.pinEnd='';}
 if(action==='publish'){toast('首次发布须提交审核，不能直接发布。');return}
 if(!['save','submit'].includes(action))return;
 latest();let c=S.cards.find(x=>x.id===formCard);
 if(c?.draft?.status==='待审核'){toast('该卡片已有待审核申请，不能再次保存或提交。请查看申请，撤回后再编辑。');form=null;render();return}
 const errors=action==='save'?[]:issues(form,c);
 if(errors.length){$('#errors').innerHTML=errors.map(e).join('<br>');$('#errors').scrollIntoView({block:'center'});return}
 if(!c){c={id:'C'+String(S.next++).padStart(3,'0'),state:'草稿',formal:null,draft:null,creator:S.actor,created:new Date().toLocaleDateString('sv-SE'),history:[]};S.cards.push(c);formCard=c.id}
 const snapshot=clone(form);
 if(snapshot.tpl==='theme'&&!c.fixedThemeScene)c.fixedThemeScene=snapshot.themeScene;
 c.draft={data:snapshot,status:action==='submit'?'待审核':'编辑中',editor:S.actor,submitter:action==='submit'?S.actor:null,submittedAt:action==='submit'?new Date().toISOString():null};log(c,action==='submit'?'提交审核':'保存草稿');
 if(!persist())return;savedForm=JSON.stringify(form);toast(action==='submit'?(c.formal?'已提交审核，原内容和设置不变。':'已提交首次发布审核，尚未发布。'):'草稿已保存。');go('edit='+c.id,true);
}
function contentDetails(d){
 const t=template(d.tpl),rows=[['卡片模板',t.name]];
 if(d.tpl==='ranking')rows.push(['所选榜单',rankingName(d)],['内容来源','榜单选基；基金名单、排序和指标按榜单规则更新，无需逐项审核实时数据。']);
 if(!t.auto&&d.tpl!=='ranking')rows.push(['卡片标题',d.title],['左侧介绍',d.bullets.join('\n')],['右侧图片',d.imageName||'未选择图片']);
 if(d.tpl==='product'){
  rows.push(['关联产品',d.product?d.product.name+' / '+d.product.id+' / '+typeNames[d.product.type]:'未选择']);
  if(d.product?.type==='plan')rows.push(['产品 KYP · 系统固定展示',(d.product.kyp||'--')+'（示例）\n显示在产品名称下方，不占两个可配置展示位，无需逐项核对实时数据。']);
  rows.push(['跳转地址（选填）',d.landing?.trim()||'未填写'],['整卡实际去向',productDestination(d)]);
  d.slots.forEach((slot,i)=>{const v=slotContent(d,slot);rows.push(['展示位 '+(i+1)+' · '+(slot.source==='system'?'系统字段':'自定义输入'),slot.source==='system'?'所选字段：'+v.name+'\n内容由系统提供，无需逐项核对实时数值。':'字段名称：'+v.name+'\n展示内容：'+v.value]);});
 }
 if(d.tpl==='topic')rows.push(['落地页地址 · 整卡点击打开',d.landing||'未填写']);
 if(d.tpl==='theme')rows.push(['板块场景',themeInfo(d).name],['生成条件 · 系统规则',themeInfo(d).rules],['关联基金 · 系统提供',themeInfo(d).funds]);
 if(d.tpl==='watch')rows.push(['已启用场景',scenes.filter(s=>d.scenes.includes(s)).join('、')||'未启用场景'],['已关闭场景',scenes.filter(s=>!d.scenes.includes(s)).join('、')||'无'],['场景内容','由系统生成；命中且符合条件的卡片全部展示，不限制数量。']);
 rows.push(['目标客群',d.scope+(d.scope==='指定客群'?'：'+d.groups.join('、'):'')],['展示区域',areaText(d)],['展示时间',d.start.replace('T',' ')+' 至 '+(d.end?.replace('T',' ')||'长期')],['推荐方式',d.mode]);
 if(d.mode===modes[2])rows.push(['置顶结束时间',d.pinEnd.replace('T',' ')]);
 return '<table class="content-detail"><thead><tr><th>配置项</th><th>内容</th></tr></thead><tbody>'+rows.map(([label,value])=>'<tr><td>'+e(label)+'</td><td>'+e(value)+(label==='右侧图片'&&d.image?'<br><img src="'+e(d.image)+'" alt="提交图片">':'')+'</td></tr>').join('')+'</tbody></table>';
}

function withdraw(c){if(c.draft?.status!=='待审核'){toast('申请状态已变化，请查看最新内容。');return}confirmation('撤回审核申请？','撤回成功后保留本次提交的内容，可继续编辑。已发布内容和卡片状态不变。','撤回申请',()=>{latest();c=S.cards.find(x=>x.id===c.id);if(c.draft?.status!=='待审核'){toast('该申请已处理，请查看最新状态。');go('edit='+c.id,true);return}c.draft.status='编辑中';c.draft.submitter=null;log(c,'撤回审核申请');persist();go('edit='+c.id,true);toast('已撤回，可继续编辑。')})}
function abandon(c){if(!c.draft||c.draft.status==='待审核'){toast('待审核申请请先撤回，再放弃修改。');return}confirmation('放弃本轮修改？','本轮修改将结束，历史记录保留，已发布内容不变。以后重新修改时，从已发布内容开始，不接着处理本轮修改。','放弃修改',()=>{latest();c=S.cards.find(x=>x.id===c.id);if(c.draft?.status==='待审核'){toast('申请已提交审核，请先撤回。');return}c.draft=null;log(c,'放弃本轮修改');persist();go('list',true);toast('已放弃本轮修改。')})}
function more(c){
 modal(cardTitle(dataOf(c)),'<div class="buttons">'+(c.formal?btn(c.state==='已下线'?'重新上线':'下线卡片',c.state==='已下线'?'online':'offline'):'')+btn('操作记录','history')+(c.formal&&c.draft?.status==='编辑中'?btn('放弃修改','moreAbandon'):'')+'</div><p class="help">卡片状态与修改稿状态分别管理。</p>',btn('关闭','close'));
 $('#dialogFoot').dataset.card=c.id;
 ['online','offline','history','moreAbandon'].forEach(a=>{const b=$('#dialogBody [data-action='+a+']');if(b)b.onclick=()=>{closeModal();if(a==='history'){modal('操作记录',c.history.map(h=>'<div class="logline">'+e(h.text)+'<div class="small">'+e(h.at)+' · '+e(h.by)+'</div></div>').join(''),btn('关闭','close'));return}if(a==='moreAbandon'){abandon(c);return}const offline=a==='offline';confirmation(offline?'下线卡片？':'重新上线？',offline?'下线后新开始加载的推荐不再包含这张卡。下线前已开始的加载可正常完成，客户已经加载的卡片继续保留。下线不会取消待审核申请。':'使用当前已发布内容和设置，无需重复审核；仍须符合展示时间、客户及场景条件。尚未审核通过的修改不用于本次上线。',offline?'下线':'重新上线',()=>{latest();c=S.cards.find(x=>x.id===c.id);if(!offline&&c.formal.end&&new Date(c.formal.end)<=new Date()){toast('展示时间已结束，请先修改展示时间并提交审核。');return}c.state=offline?'已下线':'已发布';log(c,offline?'人工下线':'人工上线');persist();render();toast(offline?'卡片已下线。':'卡片已上线（演示）。')})}});
}
const dateText=value=>{const d=new Date(value);return Number.isNaN(d.getTime())?'未记录':d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const submittedText=value=>{if(!value)return '未记录';const d=new Date(value);return Number.isNaN(d.getTime())?'未记录':dateText(d)+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
let reviewTimeDescending=true;
function cardReviewSummary(c){
 const d=c.draft.data;
 if(!c.formal)return '客户范围：'+(d.scope==='指定客群'?d.groups.join('、'):d.scope)+'；'+(d.end?'按设定时间展示':'长期展示');
 const fields=[['rankingId','所选榜单'],['title','标题'],['bullets','介绍'],['image','图片'],['product','关联产品'],['landing','跳转地址'],['slots','展示位'],['scope','目标客群'],['groups','目标客群'],['start','展示时间'],['end','展示时间'],['mode','推荐方式'],['pinEnd','置顶结束时间'],['scenes','自选场景开关']];
 const changed=[...new Set(fields.filter(([key])=>JSON.stringify(c.formal[key])!==JSON.stringify(d[key])).map(([,label])=>label))];
 return changed.length?'修改'+changed.join('、'):'本次内容与已发布内容相同，请核对完整申请。';
}
function renderReviews(){
 const pending=S.cards.filter(c=>c.draft?.status==='待审核').map(c=>({type:c.formal?'卡片修改':'首次发布',name:cardTitle(c.draft.data),tpl:template(c.draft.data.tpl).name,summary:cardReviewSummary(c),by:c.draft.submitter,at:c.draft.submittedAt,detail:c.id+' · '+statusLabel(c),action:'<button class="text" data-go="review='+c.id+'">查看申请</button>'}));
 if(S.settings.draft?.status==='待审核'){const d=S.settings.draft;pending.push({type:'推荐设置修改',name:'探索卡数量上限',tpl:'—',summary:'每份精选列表：'+S.settings.current+' 张 → '+d.value+' 张',by:d.submitter,at:d.submittedAt,detail:'待审核',action:'<button class="text" data-action="reviewSettings">查看申请</button>'})}
 pending.sort((a,b)=>{const x=Date.parse(a.at),y=Date.parse(b.at);if(!Number.isFinite(x))return Number.isFinite(y)?1:0;if(!Number.isFinite(y))return -1;return reviewTimeDescending?y-x:x-y});
 $('#app').innerHTML=heading('审核工作台','查看提交内容和展示设置，选择一份申请进行审核。')+
 '<div class="notice">当前演示身份：'+S.actor+'。提交人不能审核自己的申请，可在右上角切换演示身份体验审核。</div><div class="tablewrap"><table class="list review-list"><thead><tr><th>申请类型</th><th>卡片名称 / 设置事项</th><th>模板</th><th>申请摘要</th><th>提交人</th><th><button class="text" id="reviewTimeSort" aria-label="切换提交时间排序">提交时间 '+(reviewTimeDescending?'↓':'↑')+'</button></th><th>操作</th></tr></thead><tbody>'+
 pending.map(item=>'<tr><td><span class="tag">'+item.type+'</span></td><td><div class="listtitle">'+e(item.name)+'</div><div class="small">'+e(item.detail)+'</div></td><td>'+e(item.tpl)+'</td><td class="review-summary">'+e(item.summary)+'</td><td>'+e(item.by)+'</td><td class="review-time">'+e(submittedText(item.at))+'</td><td>'+item.action+'</td></tr>').join('')+
 '</tbody></table>'+(!pending.length?'<div class="empty">暂无待审核申请。</div>':'')+'</div><p class="help">系统自动更新的数据无需逐项核对。摘要用于快速了解申请，审核时查看本次提交的完整内容与设置。</p>';
 $('#reviewTimeSort').onclick=()=>{reviewTimeDescending=!reviewTimeDescending;renderReviews()};
}
function renderReview(id){
 const c=S.cards.find(x=>x.id===id);if(!c?.draft||c.draft.status!=='待审核'){go('reviews',true);toast('申请已处理，请查看最新列表。');return}
 const own=c.draft.submitter===S.actor;
 $('#app').innerHTML=heading('审核卡片申请','提交人：'+e(c.draft.submitter)+'　｜　提交时间：'+e(submittedText(c.draft.submittedAt))+'　｜　'+e(cardTitle(c.draft.data)),btn('返回工作台','reviewBack'))+
 '<div class="notice">'+(c.formal?'审核通过后使用本次提交的完整内容和设置；卡片当前为“'+c.state+'”，已下线卡片不会因通过修改申请自动上线。':'本次为首次发布审核，通过并发布成功后，按设置的展示时间和客户条件参与推荐。')+'</div>'+
 '<div class="columns"><div>'+watchReviewChanges(c)+themeReviewChanges(c)+section('reviewContent','本次提交内容',contentDetails(c.draft.data),'完整内容与展示设置')+'</div><aside class="aside"><div class="asidepanel"><h3>本次卡片预览</h3>'+previewMarkup(c.draft.data)+('<p class="help">'+(template(c.draft.data.tpl).auto?'数据仅为演示，实际内容根据客户情况生成。':c.draft.data.tpl==='ranking'?'审核所选榜单、目标客群和展示时间；正常榜单数据更新无需重复审核。':c.draft.data.tpl==='topic'?'审核本次填写的图文、落地页地址与展示设置。':'数据仅为演示；自定义输入需审核名称和内容。')+'</p></div></aside></div>')+
 (template(c.draft.data.tpl).auto?'<div class="notice">'+(c.draft.data.tpl==='theme'?'关联基金和推荐理由由数仓提供。':'场景内容根据业务数据与既定规则生成。')+'本页不要求人工核对系统自动展示的数据。</div>':'')+
 (own?'<div class="notice">这是你提交的申请，请由另一位审核人处理。</div>':'');
 $('#footer').hidden=false;$('#footer').innerHTML='<span class="statusmsg">审核操作仅为演示</span><div class="buttons">'+btn('撤回申请','reviewWithdraw')+btn('驳回','reject',false,own)+btn('审核通过','approve',true,own)+'</div>';
}
function reviewCard(id,approve){
 latest();const c=S.cards.find(x=>x.id===id);if(!c?.draft||c.draft.status!=='待审核'){toast('申请已处理，请查看最新状态。');go('reviews',true);return}
 if(c.draft.submitter===S.actor){toast('不能审核自己提交的申请。');return}
 if(approve){const errs=issues(c.draft.data,c,'review');if(errs.length){toast('暂不能通过：'+errs[0]+'请由运营调整后重新提交。');return}
 confirmation('通过审核？',c.formal?'通过后更新当前内容，已下线状态保持不变。':'通过后按设置的展示时间参与推荐。','审核通过',()=>finishReview(c.id,true));
 }else{modal('驳回申请','<label for="rejectReason">驳回原因</label><textarea id="rejectReason" placeholder="说明需要调整的内容" style="max-width:none;margin-top:8px"></textarea>',btn('取消','close')+btn('确认驳回','rejectConfirm',true));$('#dialogFoot [data-action=rejectConfirm]').onclick=()=>{const r=$('#rejectReason').value.trim();if(!r){toast('请填写驳回原因。');return}finishReview(c.id,false,r)}}
}
function finishReview(id,approve,reason=''){
 latest();const c=S.cards.find(x=>x.id===id);if(c?.draft?.status!=='待审核'||c.draft.submitter===S.actor){closeModal();go('reviews',true);toast('申请状态已变化，请查看最新内容。');return}
 if(approve){const wasPublished=!!c.formal;c.formal=clone(c.draft.data);c.draft=null;if(!wasPublished)c.state='已发布';log(c,'审核通过')}
 else{c.draft.status='编辑中';c.draft.submitter=null;log(c,'审核驳回：'+reason)}
 persist();closeModal();go('reviews',true);toast(approve?'审核已通过。':'已驳回，运营可修改后重新提交。');
}
function settings(review=false,unsavedValue=null){
 const s=S.settings,pending=s.draft?.status==='待审核',value=unsavedValue??s.draft?.value??s.current;
 const own=pending&&s.draft.submitter===S.actor;let currentInput=value;
 modal(review?'审核推荐设置':'推荐设置',
 '<p class="small">设置每份完整精选列表的探索卡数量上限。默认 1 张，可选 1、2、3 张；不足时按实际数量展示。</p><div class="split"><div class="readonly">当前生效设置<p><strong>'+s.current+' 张</strong></p></div><div class="readonly">'+(pending?'本次申请修改':'本次设置')+'<p>'+(pending?'<strong>'+value+' 张</strong>':'<select id="exploreCount">'+[1,2,3].map(n=>'<option value="'+n+'" '+(n===value?'selected':'')+'>'+n+' 张</option>').join('')+'</select>')+'</p></div></div>'+
 (pending?'<div class="notice" style="margin-top:16px">待审核 · 申请人：'+e(s.draft.submitter)+'<br>审核通过前，继续使用当前 '+s.current+' 张设置。</div>':'<p class="help">保存草稿不会生效。审核通过后，客户下次更新推荐时使用新上限；正在浏览的卡片保持原位。</p>')+
 (review&&own?'<p class="help">请由另一位审核人处理自己的申请。</p>':''),
 pending?(review?btn('驳回','settingsReject',false,own)+btn('审核通过','settingsApprove',true,own)+btn('撤回申请','settingsWithdraw'):btn('关闭','close')+btn('撤回申请','settingsWithdraw')):
 (s.draft?btn('放弃修改','settingsAbandon'):'')+btn('保存草稿','settingsSave')+btn('提交审核','settingsSubmit',true));
 if($('#exploreCount'))$('#exploreCount').onchange=()=>currentInput=Number($('#exploreCount').value);
 const initial=s.draft?.value??s.current;
 dialogCloser=()=>{if(!pending&&currentInput!==initial){confirmation('离开推荐设置？','当前修改尚未保存，离开后不会保留。','离开',()=>{$('#overlay').classList.remove('open')});$('#dialogFoot [data-action=close]').textContent='继续编辑';$('#dialogFoot [data-action=close]').onclick=ev=>{ev.stopPropagation();settings(false,currentInput)}}else $('#overlay').classList.remove('open')};
 $$('[data-action^=settings]').forEach(b=>b.onclick=()=>{
 const act=b.dataset.action;latest();const cur=S.settings,d=cur.draft;
 if(act==='settingsSave'||act==='settingsSubmit'){
 if(d?.status==='待审核'){toast('已有待审核申请，不能重复提交。请查看当前申请。');dialogCloser=null;settings();return}
 cur.draft={value:currentInput,status:act==='settingsSubmit'?'待审核':'编辑中',submitter:act==='settingsSubmit'?S.actor:null,submittedAt:act==='settingsSubmit'?new Date().toISOString():null};cur.history.push({at:now(),by:S.actor,text:act==='settingsSubmit'?'提交推荐设置审核':'保存推荐设置草稿'});
 }else if(act==='settingsWithdraw'){if(d?.status!=='待审核'){toast('申请已处理，请查看最新设置。');settings();return}d.status='编辑中';d.submitter=null}
 else if(act==='settingsAbandon'){dialogCloser=null;confirmation('放弃本轮设置修改？','当前生效设置不变，之后可重新修改。','放弃修改',()=>{latest();if(S.settings.draft?.status==='待审核'){toast('待审核申请请先撤回。');settings();return}S.settings.draft=null;persist();settings()});return}
 else{
 if(d?.status!=='待审核'){toast('申请已处理，请查看最新设置。');settings();return}
 if(d.submitter===S.actor){toast('不能审核自己提交的申请。');return}
 if(act==='settingsReject'){dialogCloser=null;modal('驳回推荐设置','<textarea id="settingsReason" placeholder="填写驳回原因" style="max-width:none"></textarea>',btn('取消','close')+btn('确认驳回','settingsRejectConfirm',true));$('#dialogFoot [data-action=settingsRejectConfirm]').onclick=()=>{const r=$('#settingsReason').value.trim();if(!r){toast('请填写驳回原因。');return}latest();if(S.settings.draft?.status!=='待审核'||S.settings.draft.submitter===S.actor){toast('申请状态已变化，请查看最新设置。');closeModal();return}S.settings.draft.status='编辑中';S.settings.draft.submitter=null;S.settings.history.push({at:now(),by:S.actor,text:'驳回推荐设置：'+r});persist();closeModal();render();toast('已驳回，可修改后重新提交。')};return}
 cur.current=d.value;cur.draft=null;cur.history.push({at:now(),by:S.actor,text:'审核通过推荐设置'});
 }
 persist();dialogCloser=null;closeModal();render();if(act==='settingsSave'||act==='settingsSubmit'||act==='settingsWithdraw')settings(false);toast(act==='settingsApprove'?'设置已生效。':act==='settingsSubmit'?'已提交审核。':'操作已保存。');
 });
}
function effectDates(days){
 const end=new Date();end.setHours(12,0,0,0);end.setDate(end.getDate()-1);
 const start=new Date(end);start.setDate(start.getDate()-days+1);
 return {from:dateText(start),to:dateText(end)};
}
function effectMetrics(exposure,clicks){return [exposure,clicks,exposure>0?(clicks/exposure*100).toFixed(2)+'%':'—']}
function renderEffects(id){
 const c=S.cards.find(x=>x.id===id);if(!c){go('list',true);return}
 const d=dataOf(c),isDraft=!c.formal,clock=new Date(),windowState=isDraft?'尚未发布':new Date(d.start)>clock?'未到开始时间':d.end&&new Date(d.end)<=clock?'展示时间已结束':'展示时间内';
 const states=[['complete','统计完成'],['noClicks','有曝光、无点击'],['noExposure','统计完成但无曝光'],['incomplete','统计未完成'],['failed','查询失败']];
 const requested=new URLSearchParams(location.search).get('effectState');
 let previewState=isDraft?'noHistory':states.some(([key])=>key===requested)?requested:'complete';
 $('#app').innerHTML=heading('查看效果',e(cardTitle(d))+'　｜　'+id,btn('返回列表','back'))+
 '<div class="notice demo-notice"><p>当前为效果详情演示，指标和数据截至日期均为示例。</p>'+(isDraft?'':'<details class="demo-controls"><summary>查看其他数据状态（演示）</summary><label for="effectState">演示状态</label><select id="effectState">'+states.map(([key,label])=>'<option value="'+key+'" '+(key===previewState?'selected':'')+'>'+label+'</option>').join('')+'</select><span>仅切换页面示例，不修改卡片设置。</span></details>')+'</div>'+
 section('effectCardInfo','卡片当前信息','<dl class="effect-meta"><div><dt>模板</dt><dd>'+template(d.tpl).name+'</dd></div><div><dt>卡片状态</dt><dd>'+statusLabel(c)+'</dd></div><div><dt>展示时间状态</dt><dd>'+windowState+'</dd></div><div><dt>当前推荐方式</dt><dd>'+e(d.mode)+'</dd></div></dl><p class="help">展示时间：'+e(submittedText(d.start))+' 至 '+(d.end?e(submittedText(d.end)):'长期展示')+'。'+(c.state==='已下线'?'卡片当前已下线，可查看保留的历史效果。':'当前卡片状态与下面所选期间的历史效果分别查看。')+'</p>'+(c.displayIssue?'<p class="notice">已取得的异常原因：'+e(c.displayIssue)+'</p>':''))+
 '<section class="effect-query" aria-label="统计范围"><div class="filters effect-filters"><label for="effectRange">日期范围</label><select id="effectRange"><option value="1">昨天</option><option value="7" selected>近 7 天</option><option value="30">近 30 天</option></select><label for="effectMode">推荐方式</label><select id="effectMode"><option>全部效果</option>'+modes.map(m=>'<option>'+m+'</option>').join('')+'</select><span class="small">均不含今天</span></div><div class="effect-range-meta"><span id="effectDateSummary"></span><span id="effectDataCutoff"></span></div></section>'+
 '<div id="effectDataStatus" class="effect-status" role="status" aria-live="polite"></div><div class="metricgrid" id="metrics"></div><p class="help" id="effectFormula"></p>'+
 section('dataNote','数据说明','<ul class="effect-notes"><li>内容更新、恢复推荐或重新上线，不清空历史曝光、点击和观看记录。</li><li>历史效果按卡片实际展示时的推荐方式保留；“全部效果”先合计曝光与有效点击，再计算点击率。</li><li>曝光量与有效点击量表示有效次数，不是客户人数。'+(template(d.tpl).auto?'一份配置生成多张客户卡片时，效果汇总方式仍待确认。':'')+'</li><li>数据每天几点更新、延迟记录及跨设备等细节仍待确认。缺失或查询失败不当作 0。</li></ul>');
 const update=()=>{
  const days=Number($('#effectRange').value),range=effectDates(days),mode=$('#effectMode').selectedIndex;
  const samples=[[240,12],[120,6],[80,4],[40,2]],sample=samples[mode];
  let values=effectMetrics(sample[0]*days,sample[1]*days),label='统计完成',message='当前显示所选日期与推荐方式的统计结果。',metricNote='示例数据',cutoff=range.to+'（示例日期）';
  if(previewState==='noClicks'){values=effectMetrics(sample[0]*days,0);message='当前范围内有曝光，没有有效点击。'}
  if(previewState==='noExposure'){values=effectMetrics(0,0);message='当前范围内暂无曝光，无法计算点击率。'}
  if(previewState==='incomplete'){values=['统计未完成','统计未完成','—'];label='统计未完成';message='曝光和有效点击尚未完成统计，暂不计算点击率。';metricNote='等待完整统计';cutoff='完整统计尚未提供';}
  if(previewState==='failed'){values=['—','—','—'];label='查询失败';message='未能取得当前范围的数据，请重新查询。';metricNote='暂未取得数据';cutoff='暂未取得';}
  if(previewState==='noHistory'){values=['—','—','—'];label='暂无历史效果';message='卡片尚未发布，暂无历史效果。';metricNote='尚未发布';cutoff='暂无历史数据';}
  $('#effectDateSummary').textContent='统计日期：'+range.from+' 至 '+range.to;
  $('#effectDataCutoff').textContent='数据截至：'+cutoff;
  $('#effectDataStatus').innerHTML='<div><span class="tag">'+label+'</span><span>'+message+'</span></div>'+(previewState==='failed'?'<button id="retryEffects" type="button">重新查询</button>':'');
  $('#metrics').innerHTML=['曝光量','有效点击量','点击率'].map((label,i)=>'<div class="metric"><span>'+label+'</span><strong class="'+(typeof values[i]==='string'&&values[i].length>8?'metric-message':'')+'">'+values[i]+'</strong><small class="small">'+metricNote+'</small></div>').join('');
  $('#effectFormula').textContent='点击率 = 有效点击量 ÷ 曝光量 × 100%，保留两位小数。无曝光或数据不完整时不计算。';
  if($('#retryEffects'))$('#retryEffects').onclick=()=>{previewState='complete';$('#effectState').value='complete';update();toast('重新查询成功（演示），日期与推荐方式保持不变。')};
 };
 $('#effectRange').onchange=update;$('#effectMode').onchange=update;
 if($('#effectState'))$('#effectState').onchange=()=>{previewState=$('#effectState').value;update()};
 update();
}
function render(){
 $('#toast').classList.remove('show');
 $('#actor').value=S.actor;$('#footer').hidden=true;$('#footer').innerHTML='';$('#navList').classList.toggle('active',!route.startsWith('review'));$('#navReviews').classList.toggle('active',route.startsWith('review'));
 const [page,id]=route.split('=');$('#crumb').textContent='推荐管理 / '+(page.startsWith('review')?'审核工作台':'卡片管理')+(page==='new'?' / 新建卡片':page==='edit'?' / 编辑卡片':page==='effects'?' / 查看效果':'');
 if(page==='new')renderEditor(null,true);else if(page==='edit')renderEditor(id);else if(page==='reviews')renderReviews();else if(page==='review')renderReview(id);else if(page==='effects')renderEffects(id);else renderList();
}
document.addEventListener('click',ev=>{
 const target=ev.target.closest('button,a,[data-target]');if(!target)return;
 if(target.dataset.go){ev.preventDefault();go(target.dataset.go);return}
 if(target.dataset.scroll){ev.preventDefault();document.getElementById(target.dataset.scroll)?.scrollIntoView({behavior:'smooth'});return}
 if(target.dataset.tab){filter.state=target.dataset.tab;renderList();return}
 if(target.dataset.more){more(S.cards.find(c=>c.id===target.dataset.more));return}
 if(target.dataset.target){toast('点击后进入：'+target.dataset.target+'（本线框不打开真实页面）');return}
 if(target.dataset.product){const next=products.find(p=>p.id===target.dataset.product),changed=form.product?.id!==next.id,hadProduct=!!form.product;form.product=clone(next);if(changed)form.slots=emptySlots();closeModal();renderEditor(formCard,!formCard);if(changed&&hadProduct)toast('已更换产品，请重新配置两个展示位并核对跳转地址。标题、介绍和图片已保留。');return}
 if(target.dataset.removeBullet!==undefined){form.bullets.splice(Number(target.dataset.removeBullet),1);if(!form.bullets.length)form.bullets=[''];renderEditor(formCard,!formCard);return}
 const a=target.dataset.action,c=S.cards.find(x=>x.id===formCard);
 if(a==='close')closeModal();else if(a==='new')go('new');else if(a==='back')go('list');else if(a==='reviewBack')go('reviews');else if(a==='reset'){filter={state:'全部',query:'',tpl:'',mode:''};extraFilter={kind:'',author:'',from:'',to:''};renderList()}
 else if(a==='moreFilters')moreFilters();else if(a==='settings')settings();else if(a==='reviewSettings')settings(true);
 else if(a==='addBullet'){form.bullets.push('');renderEditor(formCard,!formCard)}
 else if(a==='upload')$('#file').click();else if(a==='removeImage'){form.image='';form.imageName='';renderEditor(formCard,!formCard)}
 else if(a==='products')chooseProduct();else if(['save','submit','publish'].includes(a))saveCard(a);
 else if(a==='current')modal('已发布内容',contentDetails(c.formal)+'<h3>已发布内容预览</h3>'+previewMarkup(c.formal),btn('关闭','close'),true);
 else if(a==='withdraw')withdraw(c);else if(a==='abandon')abandon(c);
 else if(a==='reviewWithdraw')withdraw(S.cards.find(x=>x.id===route.split('=')[1]));
 else if(a==='approve'||a==='reject')reviewCard(route.split('=')[1],a==='approve');
});
$('#closeDialog').onclick=closeModal;
$('#actor').onchange=ev=>{const actor=ev.target.value;if(dirty()){ev.target.value=S.actor;toast('请先保存当前编辑内容，再切换演示身份。');return}S.actor=actor;persist();form=null;render();toast('已切换为'+actor+'（仅演示）。')};
document.addEventListener('change',ev=>{
 if(!ev.target.matches('[data-watch-preview]'))return;
 const host=ev.target.closest('.watch-preview-host');
 host.querySelector('[data-watch-preview-content]').innerHTML=watchScenePreview(ev.target.value);
});
document.addEventListener('keydown',ev=>{
 if((ev.key==='Enter'||ev.key===' ')&&ev.target.matches('.watch-preview-card')){ev.preventDefault();ev.target.click();return}
 if((ev.key==='Enter'||ev.key===' ')&&ev.target.matches('.topic-preview')){ev.preventDefault();ev.target.click();return}
 if(!$('#overlay').classList.contains('open'))return;
 if(ev.key==='Escape'){ev.preventDefault();closeModal()}
 if(ev.key==='Tab'){const els=$$('#dialog button:not(:disabled),#dialog input:not(:disabled),#dialog select:not(:disabled),#dialog textarea:not(:disabled)');if(!els.length)return;const first=els[0],last=els[els.length-1];if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus()}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus()}}
});
window.addEventListener('beforeunload',ev=>{if(dirty()){ev.preventDefault();ev.returnValue=''}});
window.addEventListener('hashchange',()=>{const next=decodeURIComponent(location.hash.slice(1))||'list';if(next!==route)go(next)});
route=decodeURIComponent(location.hash.slice(1))||'list';persist();render();
