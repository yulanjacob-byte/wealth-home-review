(function(){
  'use strict';

  var personaView = 'newbie';
  var personaLabels = {
    newbie:'新开户无投资经验',
    high:'高客 / AI+',
    allocation:'多资产配置型',
    theme:'主题投资型'
  };

  function workbenchContent(){
    return '<div class="leadership-workbench-kicker">首页内容</div>' +
      '<h2>客群内容工作台</h2><p>切换中间推荐卡与精选推荐客群</p>' +
      '<div class="leadership-workbench-section-title">中间推荐卡<span>首屏模块</span></div>' +
      '<div class="leadership-workbench-list" role="group" aria-label="中间推荐卡展示状态">' +
        '<button type="button" data-leadership-card-view="household" aria-pressed="true"><span class="leadership-workbench-dot is-household"></span><span><strong>家庭稳健推荐</strong><small>长期资金与房贷场景</small></span><i aria-hidden="true"></i></button>' +
        '<button type="button" data-leadership-card-view="theme" aria-pressed="false"><span class="leadership-workbench-dot is-theme"></span><span><strong>主题投资提醒</strong><small>关注板块与关联基金</small></span><i aria-hidden="true"></i></button>' +
        '<button type="button" data-leadership-card-view="watchlist" aria-pressed="false"><span class="leadership-workbench-dot is-watchlist"></span><span><strong>自选机会提示</strong><small>自选基金与买入信号</small></span><i aria-hidden="true"></i></button>' +
      '</div>' +
      '<div class="leadership-workbench-section-title">精选推荐客群<span>Feed 内容</span></div>' +
      '<div class="leadership-workbench-list" role="group" aria-label="精选推荐客群">' +
        '<button type="button" data-leadership-persona="newbie" aria-pressed="true"><span class="leadership-workbench-dot is-newbie"></span><span><strong>新开户无投资经验</strong><small>投教 → 榜单 → 计划</small></span><i aria-hidden="true"></i></button>' +
        '<button type="button" data-leadership-persona="high" aria-pressed="false"><span class="leadership-workbench-dot is-high"></span><span><strong>高客 / AI+</strong><small>定制 → 提醒 → 观点</small></span><i aria-hidden="true"></i></button>' +
        '<button type="button" data-leadership-persona="allocation" aria-pressed="false"><span class="leadership-workbench-dot is-allocation"></span><span><strong>多资产配置型</strong><small>观点 → 榜单 → 配置</small></span><i aria-hidden="true"></i></button>' +
        '<button type="button" data-leadership-persona="theme" aria-pressed="false"><span class="leadership-workbench-dot is-persona-theme"></span><span><strong>主题投资型</strong><small>事件 → 榜单 → 选基</small></span><i aria-hidden="true"></i></button>' +
      '</div>' +
      '<div class="leadership-workbench-current"><span>中间推荐</span><strong data-leadership-view-label>家庭稳健推荐</strong><span>精选推荐</span><strong data-leadership-persona-label>新开户无投资经验</strong></div>';
  }

  function ensureWorkbench(){
    var workbench = document.querySelector('.leadership-workbench');
    if(!workbench || workbench.dataset.personaWorkbench === 'true') return;
    workbench.dataset.personaWorkbench = 'true';
    workbench.setAttribute('aria-label','首页内容工作台');
    workbench.innerHTML = workbenchContent();
    var viewLabel = workbench.querySelector('[data-leadership-view-label]');
    if(viewLabel && typeof MutationObserver === 'function'){
      new MutationObserver(function(){
        var current = workbench.querySelector('[data-leadership-card-view][aria-pressed="true"]');
        var labels = {household:'家庭稳健推荐',theme:'主题投资提醒',watchlist:'自选机会提示'};
        var next = current && labels[current.dataset.leadershipCardView];
        if(next && viewLabel.textContent !== next) viewLabel.textContent = next;
      }).observe(viewLabel,{childList:true,characterData:true,subtree:true});
    }
  }

  function removeMiddleRecommendationCtas(){
    document.querySelectorAll('.leadership-recommend-card .leadership-primary').forEach(function(button){
      button.remove();
    });
  }

  function ensureWatchlistOpportunityCard(){
    var stack = document.querySelector('.leadership-recommend-stack');
    if(!stack || stack.querySelector('[data-recommend-card="watchlist"]')) return;
    var avatarSource = document.querySelector('.leadership-recommend-avatar') || document.querySelector('.agent-hero-avatar');
    var avatar = avatarSource ? avatarSource.src : '';
    var card = document.createElement('article');
    card.className = 'leadership-recommend-card leadership-watchlist-card';
    card.dataset.recommendCard = 'watchlist';
    card.hidden = true;
    card.setAttribute('aria-hidden','true');
    card.innerHTML = '<header class="leadership-recommend-head"><img class="leadership-recommend-avatar" src="' + avatar + '" alt=""><h2 class="leadership-recommend-title">为您提炼自选基金近期亮点</h2>' +
      '<button class="leadership-ask-more" type="button" data-leadership-ask-more="watchlist">问更多<i class="iconfont icon-shixinjiantou-you" aria-hidden="true"></i></button></header>' +
      '<div class="leadership-recommend-body"><div class="leadership-insight"><span class="leadership-spark" aria-hidden="true"></span><span>您自选中的2只基金近期出现AI买入信号</span></div>' +
      '<div class="leadership-watchlist-list" aria-label="自选基金机会信号">' +
        '<div class="leadership-watchlist-row"><div class="leadership-watchlist-name"><strong>财通科技成长</strong><span>已加入自选87天</span></div><div class="leadership-watchlist-return"><strong>+11.78%</strong><span>近1月</span></div><div class="leadership-watchlist-target"><strong>8.78%</strong><span>目标止盈收益率</span></div><button type="button" data-leadership-watch-signal="财通科技成长">查看信号</button></div>' +
        '<div class="leadership-watchlist-row"><div class="leadership-watchlist-name"><strong>中欧医疗健康</strong><span>已加入自选87天</span></div><div class="leadership-watchlist-return"><strong>+7.78%</strong><span>近1月</span></div><div class="leadership-watchlist-target"><strong>8.78%</strong><span>目标止盈收益率</span></div><button type="button" data-leadership-watch-signal="中欧医疗健康">查看信号</button></div>' +
      '</div>' +
      '<button class="leadership-watchlist-more" type="button" data-leadership-watch-signal="国投瑞银美丽中国"><span>今日还有78只基金出现买入信号</span><strong>国投瑞银美丽中国</strong><em>目标止盈收益率 <b>8.78%</b></em><i class="iconfont icon-shixinjiantou-you" aria-hidden="true"></i></button>' +
      '</div>';
    stack.appendChild(card);
  }

  function selectCards(html, keys){
    if(typeof pickFeedCards === 'function') return pickFeedCards(html,keys);
    var template = document.createElement('template');
    template.innerHTML = html;
    return keys.map(function(key){
      var card = template.content.querySelector('[data-detail="' + key + '"]');
      return card ? card.outerHTML : '';
    }).join('');
  }

  function educationCard(){
    return '<article class="beginner-card guide-card" data-detail="leadershipNewbieGuide">' +
      '<div class="beginner-card-head"><strong>新手指南</strong><span>国金证券财富产品中心</span></div>' +
      '<div class="guide-layout"><div class="guide-visual strategy-visual" aria-hidden="true"><i></i><i></i><i></i></div>' +
      '<div class="guide-copy"><h3>第一次买基金，别只看历史业绩</h3><p>先了解期限、风险与流动性，再选择适合自己的产品。</p></div></div></article>';
  }

  function holidayFocusCard(){
    return '<article class="beginner-card leadership-holiday-focus-card" data-detail="leadershipHolidayPlan">' +
      '<div class="leadership-holiday-focus-head"><strong>国庆长假理财</strong><span>今日焦点</span></div>' +
      '<p class="leadership-holiday-focus-time">启动时间：2026年9月27日~9月29日</p>' +
      '<div class="leadership-holiday-focus-body"><ul>' +
        '<li>节前最后1天3点前</li><li>坐享节假日收益</li><li>节后第3天可赎回</li>' +
      '</ul><div class="leadership-holiday-calendar" aria-label="国庆长假理财时间安排">' +
        '<div class="leadership-holiday-week"><span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span></div>' +
        '<div class="leadership-holiday-days"><span>26</span><span>27</span><span>28</span><span class="is-buy">29</span><span class="is-holiday">30</span><span class="is-holiday">01</span><span class="is-holiday">02</span>' +
        '<span class="is-holiday">03</span><span class="is-holiday">04</span><span class="is-holiday">05</span><span class="is-holiday">06</span><span class="is-holiday">07</span><span class="is-holiday">08</span><span class="is-holiday">09</span>' +
        '<b>9月29日15点前买入</b></div></div></div>' +
      '<div class="plan-card-action"><button class="btn" type="button">查看计划</button></div></article>';
  }

  function renderNewbie(){
    if(typeof renderBeginnerFeed !== 'function') return '';
    var source = renderBeginnerFeed();
    return '<div class="beginner-feed leadership-persona-feed" data-leadership-persona-content="newbie">' +
      educationCard() + holidayFocusCard() + selectCards(source,['fund','coffee','starter']) + '</div>';
  }

  function advisorIdentity(copy){
    return '<div class="leadership-high-advisor"><span class="leadership-high-advisor-mark" aria-hidden="true">王</span>' +
      '<div class="leadership-high-advisor-copy"><strong>您的专属投顾 王阳</strong><span>' + copy + '</span></div></div>';
  }

  function renderHigh(){
    return '<div class="beginner-feed leadership-persona-feed leadership-high-feed" data-leadership-persona-content="high">' +
      '<article class="beginner-card leadership-high-service-card" data-detail="leadershipHighPlan">' +
        '<div class="beginner-card-head"><strong>量身定制理财计划</strong><span class="tag blue">投顾服务</span></div>' +
        '<div class="leadership-high-body">' + advisorIdentity('向您发起定制邀请，请您关注') +
          '<p class="leadership-high-quote">您有一笔理财即将到期。说说投资目标，我尽快为您梳理方案。</p>' +
          '<div class="leadership-high-fields"><div class="leadership-high-field"><strong>8.0%</strong><span>年化收益目标</span></div><div class="leadership-high-field"><strong>3年以上</strong><span>预期投资时长</span></div><div class="leadership-high-field"><strong>15%</strong><span>极限回撤幅度</span></div></div>' +
          '<div class="leadership-high-action"><button class="btn" type="button">获取专属方案</button></div>' +
        '</div></article>' +
      '<article class="beginner-card leadership-high-service-card" data-detail="leadershipHighReminder">' +
        '<div class="beginner-card-head"><strong>专属产品开售提醒</strong><span class="tag">产品提醒</span></div>' +
        '<div class="leadership-high-body">' + advisorIdentity('向您发来提醒，请您关注') +
          '<p class="leadership-high-quote">您此前关注的产品今日开放募集，适配信息与产品资料可由投顾为您进一步说明。</p>' +
          '<div class="leadership-high-fields"><div class="leadership-high-field"><strong>万象信托</strong><span>尊享5号资金信托计划</span></div><div class="leadership-high-field"><strong>30万</strong><span>起配金额</span></div><div class="leadership-high-field"><strong>R2</strong><span>中低风险</span></div></div>' +
          '<div class="leadership-high-action"><button class="btn" type="button">联系投顾获取资料</button></div>' +
        '</div></article>' +
      '<article class="beginner-card leadership-high-service-card" data-detail="leadershipHighView">' +
        '<div class="beginner-card-head"><strong>策略观点</strong><span class="tag blue">投顾解读</span></div>' +
        '<div class="leadership-high-body">' + advisorIdentity('向您发来一条市场信息，请您关注') +
          '<p class="leadership-high-quote">海外市场波动加剧，科技进入方向重新选择阶段，可结合现有持仓关注配置节奏。</p>' +
          '<div class="leadership-high-content"><div class="guide-visual" aria-hidden="true"><i></i><i></i><i></i></div><div><h3>海外主美股上市却带崩韩国股市？</h3><p>国金证券财富产品中心</p></div></div>' +
          '<div class="leadership-high-action"><button class="btn" type="button">联系他</button></div>' +
        '</div></article>' +
      '</div>';
  }

  function lowPositionCard(){
    return '<article class="beginner-card leadership-low-position-card" data-detail="leadershipLowPosition">' +
      '<div class="beginner-card-head"><strong>港股医药 估值底部或迎曙光</strong><span class="tag blue">资讯 23:07:52</span></div>' +
      '<div class="leadership-low-position-product"><strong>易方达港股通创新药C</strong><span>021921</span><em>首发募集中</em></div>' +
      '<div class="leadership-low-position-body"><ul>' +
        '<li>创新药BD出海订单金额同比大增40%</li>' +
        '<li>中国创新药销售订单金额占比突破49%</li>' +
        '<li>板块估值低于近5年80%以上的时间</li>' +
      '</ul><div class="leadership-low-position-chart" aria-label="中国创新药 license-out 预付款金额示意图">' +
        '<strong><span>中国创新药license-out</span><span>预付款金额</span></strong>' +
        '<div class="leadership-low-position-bars" aria-hidden="true">' +
          '<span><i style="height:58%"></i><b style="height:40%"></b></span>' +
          '<span><i style="height:88%"></i><b style="height:72%"></b></span>' +
          '<span><i style="height:44%"></i><b style="height:18%"></b></span>' +
        '</div></div></div>' +
      '<div class="plan-card-action"><button class="btn" type="button">查看详情</button></div></article>';
  }

  function renderAllocation(){
    if(typeof renderAllocationFeed !== 'function') return '';
    var source = renderAllocationFeed();
    return '<div class="allocation-feed leadership-persona-feed" data-leadership-persona-content="allocation">' +
      selectCards(source,['globalView','qdii','globalPlan']) + lowPositionCard() + '</div>';
  }

  function removeNonCurrentAi(html){
    var template = document.createElement('template');
    template.innerHTML = html;
    template.content.querySelectorAll('.theme-fund-item.is-ai').forEach(function(card){card.remove();});
    template.content.querySelectorAll('.theme-diagnosis-title img').forEach(function(image){image.remove();});
    template.content.querySelectorAll('.theme-diagnosis-title strong').forEach(function(title){title.textContent = '主题解读';});
    return template.innerHTML;
  }

  function renderTheme(){
    if(typeof renderThemeInvestorFeed !== 'function') return '';
    var source = renderThemeInvestorFeed();
    var cards = selectCards(source,['windEvent','techRank','cpoTheme','themeViewpoint']);
    return '<div class="theme-investor-feed leadership-persona-feed" data-leadership-persona-content="theme">' + removeNonCurrentAi(cards) + '</div>';
  }

  function renderPersona(){
    if(personaView === 'high') return renderHigh();
    if(personaView === 'allocation') return renderAllocation();
    if(personaView === 'theme') return renderTheme();
    return renderNewbie();
  }

  function applyPersona(shouldFocus){
    ensureWorkbench();
    ensureWatchlistOpportunityCard();
    removeMiddleRecommendationCtas();
    var feed = document.getElementById('feedContent');
    if(feed){
      feed.innerHTML = renderPersona();
      feed.dataset.leadershipPersonaView = personaView;
    }
    document.querySelectorAll('[data-leadership-persona]').forEach(function(button){
      var active = button.dataset.leadershipPersona === personaView;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    var label = document.querySelector('[data-leadership-persona-label]');
    if(label) label.textContent = personaLabels[personaView];
    if(shouldFocus){
      if(typeof setTab === 'function') setTab('feed',false);
      var appScroll = document.getElementById('appScroll');
      var tabModule = document.querySelector('.tab-module');
      if(appScroll && tabModule) appScroll.scrollTo({top:Math.max(0,tabModule.offsetTop - 12),behavior:'smooth'});
    }
  }

  function registerDetails(){
    if(typeof detailTemplates === 'undefined') return;
    detailTemplates.leadershipNewbieGuide = {title:'新手理财先看',tag:'投资者教育',cls:'blue',heading:'期限、风险与流动性',desc:'先理解资金使用时间和可承受波动，再选择适合自己的产品。',blocks:[['先看期限','确认这笔钱多久不用，避免短期资金进入长期产品。'],['再看风险','历史业绩不代表未来表现，选择前需完成风险测评与适当性校验。']]};
    detailTemplates.leadershipHighPlan = {title:'量身定制理财计划',tag:'投顾服务',cls:'blue',heading:'由专属投顾承接需求',desc:'提交目标后进入人工投顾服务链路，页面示例不代表自动推荐或自动交易。',blocks:[['需求信息','收益目标、投资时长和可承受回撤仅作沟通输入。'],['服务边界','关键结论、适当性与产品说明由持牌投顾人员承接。']]};
    detailTemplates.leadershipHighReminder = {title:'专属产品开售提醒',tag:'投顾服务',cls:'',heading:'关注产品状态与资料',desc:'由专属投顾进一步说明产品信息、准入要求和风险揭示。',blocks:[['提醒内容','示例展示产品名称、起配金额和风险等级。'],['服务边界','不因收到提醒自动获得准入，也不会直接触发交易。']]};
    detailTemplates.leadershipHighView = {title:'策略观点',tag:'投顾解读',cls:'blue',heading:'市场观点与人工沟通',desc:'运营内容用于辅助理解市场，投资决策仍需结合账户情况和风险承受能力。',blocks:[['内容来源','观点内容由运营配置并按流程审核。'],['人工承接','如需进一步讨论，可联系专属投顾。']]};
    detailTemplates.leadershipLowPosition = {title:'低位机会',tag:'市场观察',cls:'blue',heading:'港股医药阶段性观察',desc:'低估值和历史涨跌不代表未来收益，不构成个性化投资建议。',blocks:[['观察维度','结合估值、产业进展、产品风险与持有期限综合判断。'],['风险提示','主题相关产品波动较高，进入详情后仍需完成适当性校验。']]};
    detailTemplates.leadershipHolidayPlan = {title:'国庆长假理财',tag:'今日焦点',cls:'blue',heading:'节前资金安排时间提示',desc:'示意展示节前买入时间、假期收益安排与节后可赎回时间。',blocks:[['启动时间','2026年9月27日~9月29日。'],['时间提示','节前最后1天3点前完成买入，节后第3天可赎回，实际安排以产品公告为准。']]};
    detailTemplates.leadershipWatchSignal = {title:'自选基金机会信号',tag:'自选关注',cls:'blue',heading:'信号用于辅助观察',desc:'页面展示基于已配置指标生成的机会提示，不构成收益承诺或个性化投资建议。',blocks:[['观察维度','结合近期净值、目标止盈条件、持有期限和风险等级综合观察。'],['服务边界','只做机会提示，不会因信号出现自动买入、赎回或调仓。']]};
  }

  var leadershipAgentGuideKey = '';
  var leadershipAgentGuidePage = 0;
  var leadershipAgentLandingPage = 0;
  var leadershipAgentVoiceTimer = 0;
  var leadershipAgentGuides = {
    household:{
      label:'家庭闲置资金与房贷场景',
      hint:'继续追问资金期限、流动性或风险',
      landingGroups:[
        [
          {key:'householdMortgage',question:'提前还贷和继续理财，应该比较哪些指标？'},
          {key:'householdEmergency',question:'家庭应急资金一般需要预留多久？'},
          {key:'householdThreeYears',question:'如果3年内可能用钱，配置方案要怎么调整？'},
          {key:'householdDrawdown',question:'这类稳健方案可能出现多大的净值波动？'},
          {key:'householdTargetYield',question:'目标止盈和实际收益有什么区别？'}
        ],
        [
          {key:'householdRiskChange',question:'持有期间需要关注哪些风险变化？'},
          {key:'householdIncome',question:'收入不稳定时，应急资金需要怎么调整？'},
          {key:'householdInsurance',question:'家庭保障资金和理财资金应该怎么分开？'},
          {key:'householdMaturity',question:'稳健方案到期后，下一步资金如何安排？'},
          {key:'householdReview',question:'家庭资金计划多久复盘一次比较合适？'}
        ]
      ],
      groups:[
        [
          {key:'householdEmergency',question:'家庭应急资金一般需要预留多久？'},
          {key:'householdMortgage',question:'提前还贷和继续理财，应该比较哪些指标？'},
          {key:'householdThreeYears',question:'如果3年内可能用钱，配置方案要怎么调整？'}
        ],
        [
          {key:'householdDrawdown',question:'这类稳健方案可能出现多大的净值波动？'},
          {key:'householdTargetYield',question:'目标止盈和实际收益有什么区别？'},
          {key:'householdRiskChange',question:'持有期间需要关注哪些风险变化？'}
        ]
      ]
    },
    theme:{
      label:'算力板块与相关基金',
      hint:'继续追问板块驱动、基金集中度或风险',
      landingGroups:[
        [
          {key:'themeDriver',question:'算力板块近期上涨主要由什么驱动？'},
          {key:'themeConcentration',question:'如何判断相关基金的行业集中度？'},
          {key:'themeRiskSignal',question:'主题热度回落时，需要关注哪些风险信号？'},
          {key:'themeChase',question:'近期涨幅较高时还适合继续追吗？'},
          {key:'themePosition',question:'如何控制主题投资的持仓比例？'}
        ],
        [
          {key:'themeVsBroad',question:'主题基金和宽基基金有什么区别？'},
          {key:'themeValuation',question:'怎么看算力板块当前估值是否偏高？'},
          {key:'themePerformance',question:'如何判断主题基金的业绩是否可持续？'},
          {key:'themeManager',question:'基金经理风格变化会影响主题暴露吗？'},
          {key:'themeCorrelation',question:'多只主题基金会不会买到重复的持仓？'}
        ]
      ],
      groups:[
        [
          {key:'themeDriver',question:'算力板块近期上涨主要由什么驱动？'},
          {key:'themeConcentration',question:'如何判断相关基金的行业集中度？'},
          {key:'themeRiskSignal',question:'主题热度回落时，需要关注哪些风险信号？'}
        ],
        [
          {key:'themeChase',question:'近期涨幅较高时还适合继续追吗？'},
          {key:'themeVsBroad',question:'主题基金和宽基基金有什么区别？'},
          {key:'themePosition',question:'如何控制主题投资的持仓比例？'}
        ]
      ]
    },
    watchlist:{
      label:'自选基金与机会信号',
      hint:'继续追问信号依据、风险或持有周期',
      landingGroups:[
        [
          {key:'watchSignalMeaning',question:'我的自选基金近期出现了什么买入信号？'},
          {key:'watchSignalBasis',question:'买入信号主要参考哪些指标？'},
          {key:'watchTargetYield',question:'目标止盈收益率是不是收益承诺？'},
          {key:'watchAfterRise',question:'自选基金连续上涨后还适合关注吗？'},
          {key:'watchCompareRisk',question:'如何比较两只自选基金的风险？'}
        ],
        [
          {key:'watchActNow',question:'自选基金出现信号后应该马上买吗？'},
          {key:'watchSignalExpiry',question:'买入信号失效时会如何提醒？'},
          {key:'watchSignalPeriod',question:'持有多久才能判断信号是否有效？'},
          {key:'watchMultiFilter',question:'多只自选基金同时出现信号怎么筛？'},
          {key:'watchPosition',question:'如何控制自选基金的投入比例？'}
        ]
      ],
      groups:[
        [
          {key:'watchSignalBasis',question:'买入信号主要参考哪些指标？'},
          {key:'watchTargetYield',question:'目标止盈收益率是不是收益承诺？'},
          {key:'watchActNow',question:'自选基金出现信号后应该马上买吗？'}
        ],
        [
          {key:'watchCompareRisk',question:'如何比较两只自选基金的风险？'},
          {key:'watchMultiFilter',question:'多只自选基金同时出现信号怎么筛？'},
          {key:'watchPosition',question:'如何控制自选基金的投入比例？'}
        ]
      ]
    }
  };

  function registerLeadershipAgentFlows(){
    if(typeof agentQuestionFlows === 'undefined') return;
    Object.assign(agentQuestionFlows,{
      householdEmergency:{
        question:'家庭应急资金一般需要预留多久？',
        alternateQuestion:'家庭备用金留多少才比较合适？',
        answer:'应急资金没有统一答案，通常先覆盖一段时间的必要支出，再结合收入稳定性、家庭负担和医疗等突发需求调整。核心是保证需要时能较快取用，不应为了追求收益牺牲流动性。',
        basis:'你正在查看家庭长期资金安排，并主动询问应急资金期限。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      householdMortgage:{
        question:'提前还贷和继续理财，应该比较哪些指标？',
        alternateQuestion:'手里有闲钱，先还房贷还是继续配置？',
        answer:'可以把房贷实际成本、提前还款规则、家庭现金流和理财方案可能承受的波动放在一起比较。理财收益不是确定值，不能只用预期收益率与贷款利率做简单相减。',
        basis:'当前卡片带入了家庭闲置资金与房贷场景。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      householdThreeYears:{
        question:'如果3年内可能用钱，配置方案要怎么调整？',
        alternateQuestion:'未来3年有用款计划，长期配置要怎么缩短？',
        answer:'先把3年内可能使用的金额单独划出，并按具体用款时间分层；只有明确长期不用的部分再进入较长期配置。期限越不确定，越要提高可取用资金的比例并核对赎回到账规则。',
        basis:'你补充了3年内可能使用资金这一期限条件。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      householdDrawdown:{
        question:'这类稳健方案可能出现多大的净值波动？',
        alternateQuestion:'稳健配置是不是就不会亏损？',
        answer:'稳健不代表保本，也不代表净值只涨不跌。需要结合风险等级、历史最大回撤、底层资产和持有期限理解可能波动；进入正式方案后还应查看完整风险揭示。',
        basis:'你正在查看稳健配置场景，并主动追问净值波动。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      householdTargetYield:{
        question:'目标止盈和实际收益有什么区别？',
        alternateQuestion:'达到目标止盈年化收益率就一定能拿到吗？',
        answer:'目标止盈是方案运行中的目标条件，不等于收益承诺，也不代表一定在预期时间内达到。实际收益会受市场表现、持有时间、费用和退出时点影响，应以产品规则与实际净值为准。',
        basis:'当前方案展示了目标止盈年化收益率，你进一步询问其含义。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      householdRiskChange:{
        question:'持有期间需要关注哪些风险变化？',
        alternateQuestion:'方案买入后还要持续看什么？',
        answer:'可持续关注产品风险等级、净值与回撤、底层资产变化、开放与赎回安排，以及家庭自身的用款计划是否改变。若风险承受能力或资金用途变化，应重新评估是否继续持有。',
        basis:'你希望了解家庭配置在持有期间的持续管理重点。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      householdIncome:{
        question:'收入不稳定时，应急资金需要怎么调整？',
        alternateQuestion:'收入波动较大，备用金是不是要多留一些？',
        answer:'收入稳定性下降时，应急资金通常需要覆盖更长的必要支出周期，并优先保证随时可用。具体金额还要结合家庭固定支出、负债和其他可快速变现资产判断。',
        basis:'你补充了家庭收入不稳定这一现金流条件。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      householdInsurance:{
        question:'家庭保障资金和理财资金应该怎么分开？',
        alternateQuestion:'保险预算能不能和日常理财放在一起？',
        answer:'保障资金应先覆盖明确的保费和风险保障需求，避免因市场波动影响续保；理财资金再按使用期限和风险承受能力安排。两类资金目标不同，建议分别管理和复盘。',
        basis:'你正在梳理家庭保障与长期理财之间的资金边界。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      householdMaturity:{
        question:'稳健方案到期后，下一步资金如何安排？',
        alternateQuestion:'理财到期后是续投还是先留现金？',
        answer:'到期后先重新确认近期用款计划、产品风险变化和家庭现金流，再决定续投、分层或留作备用。不要默认自动沿用原方案，新的期限与风险条件可能已经不同。',
        basis:'你主动询问了稳健方案到期后的资金衔接。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      householdReview:{
        question:'家庭资金计划多久复盘一次比较合适？',
        alternateQuestion:'家庭理财方案需要多长时间检查一次？',
        answer:'可以定期复盘，并在收入、负债、家庭成员或重大用款计划变化时及时重评。复盘重点是资金期限、应急储备和风险承受能力，而不是只看短期收益。',
        basis:'你希望建立家庭资金计划的持续复盘机制。',
        action:'返回家庭稳健推荐',
        selector:'[data-recommend-card="household"]',
        target:'家庭稳健推荐'
      },
      themeDriver:{
        question:'算力板块近期上涨主要由什么驱动？',
        alternateQuestion:'算力行情升温应该看哪些产业信号？',
        answer:'可以从政策与产业投入、云厂商资本开支、订单与业绩兑现、资金关注度和估值变化几方面判断。短期价格上涨可能由多种因素共同驱动，不代表产业逻辑已经全部兑现。',
        basis:'你当前关注的是算力板块及其关联基金。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      themeConcentration:{
        question:'如何判断相关基金的行业集中度？',
        alternateQuestion:'怎么看一只基金对算力板块暴露有多高？',
        answer:'可查看前十大持仓、相关行业占比、个股集中度和报告期变化，并比较基金名称与实际持仓是否一致。行业暴露越集中，对主题涨跌通常越敏感，波动也可能更大。',
        basis:'当前主题卡已展示部分基金的板块持仓占比。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      themeRiskSignal:{
        question:'主题热度回落时，需要关注哪些风险信号？',
        alternateQuestion:'算力主题转弱前可能有哪些变化？',
        answer:'可以关注成交与资金热度是否持续下降、龙头业绩是否低于预期、估值与盈利是否明显背离，以及相关基金持仓是否过度集中。单一信号不能直接判断趋势，应结合多个维度观察。',
        basis:'你主动追问了主题热度回落时的风险识别。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      themeChase:{
        question:'近期涨幅较高时还适合继续追吗？',
        alternateQuestion:'主题已经涨了一段，还能不能参与？',
        answer:'不宜只根据近期涨幅决定。应先确认投资期限、可承受回撤、当前估值和主题在整体资产中的比例；若无法承受较大波动，应避免把短期热点当作确定性机会。',
        basis:'你关注到主题近期涨幅较高，并询问参与时点。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      themeVsBroad:{
        question:'主题基金和宽基基金有什么区别？',
        alternateQuestion:'主题基金为什么通常比宽基波动大？',
        answer:'主题基金聚焦特定产业或方向，收益和风险更依赖少数行业；宽基覆盖范围通常更广，分散程度相对更高。两者定位不同，不能只按阶段收益高低互相替代。',
        basis:'你正在比较主题投资与更分散的基金工具。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      themePosition:{
        question:'如何控制主题投资的持仓比例？',
        alternateQuestion:'主题基金在整体资产里放多少合适？',
        answer:'比例应结合整体资产、风险承受能力和最大可接受损失确定。可以先把主题投资作为组合中的卫星仓位，并设置观察与再平衡条件，避免单一主题过度集中。',
        basis:'你希望把主题投资放进整体组合，而不是只看单只产品。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      themeValuation:{
        question:'怎么看算力板块当前估值是否偏高？',
        alternateQuestion:'算力主题涨了以后，估值贵不贵怎么看？',
        answer:'可以把当前估值与自身历史区间、同类行业和盈利增速放在一起比较，同时关注市场预期是否已经提前反映。估值高不等于立即下跌，但会放大业绩不及预期时的波动。',
        basis:'你在关注算力板块时主动追问了估值位置。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      themePerformance:{
        question:'如何判断主题基金的业绩是否可持续？',
        alternateQuestion:'主题基金近期表现好，怎么判断是不是偶然？',
        answer:'可结合不同市场阶段的收益、最大回撤、同类排名稳定性和持仓变化判断，不宜只看单一周期。主题行情本身具有阶段性，历史表现不能作为未来收益保证。',
        basis:'你希望判断主题基金的阶段表现是否具有持续性。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      themeManager:{
        question:'基金经理风格变化会影响主题暴露吗？',
        alternateQuestion:'基金经理换仓后，主题属性会不会变？',
        answer:'会。基金经理的行业配置和选股风格变化可能降低或提高主题暴露，应结合定期报告和最新持仓持续观察，不能只依据基金名称判断当前投资方向。',
        basis:'你进一步关注了基金经理风格与主题持仓之间的关系。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      themeCorrelation:{
        question:'多只主题基金会不会买到重复的持仓？',
        alternateQuestion:'买几只算力基金能不能真正分散风险？',
        answer:'可能。多只同主题基金往往持有相似的龙头公司，需要比较前十大持仓、行业占比和重合度。基金数量增加不一定带来有效分散，关键看底层资产是否真正不同。',
        basis:'你希望通过多只主题基金分散风险。',
        action:'返回算力板块提醒',
        selector:'[data-recommend-card="theme"]',
        target:'算力板块提醒'
      },
      watchSignalMeaning:{
        question:'我的自选基金近期出现了什么买入信号？',alternateQuestion:'自选里的机会提示具体指什么？',
        answer:'当前页面示意了近期收益、目标止盈条件等指标的组合变化。它只是帮你从自选列表中快速找到值得继续观察的产品，不代表确定的买入时点。',
        basis:'你正在查看自选基金机会信号。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      },
      watchSignalBasis:{
        question:'买入信号主要参考哪些指标？',alternateQuestion:'这些自选信号是怎么得出的？',
        answer:'可结合近期净值趋势、回撤、业绩比较基准、目标止盈条件和持仓变化综合观察。单一指标不足以支持买入判断，还需要核对风险等级和资金期限。',
        basis:'你主动追问了自选机会信号的判断依据。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      },
      watchTargetYield:{
        question:'目标止盈收益率是不是收益承诺？',alternateQuestion:'到了目标止盈就一定能赚吗？',
        answer:'不是。目标止盈是预先设置的观察或处理条件，不代表一定能达到，也不构成收益承诺。实际结果仍会受市场、费用和买卖时点影响。',
        basis:'当前自选卡展示了目标止盈收益率。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      },
      watchAfterRise:{
        question:'自选基金连续上涨后还适合关注吗？',alternateQuestion:'涨了一段的自选基金还能不能看？',
        answer:'可以继续观察，但不宜只因为近期上涨就追入。应对照估值、回撤、底层持仓和自身可承受的波动，再判断它是否仍符合你的期限与风险要求。',
        basis:'你关注到自选基金的近期涨幅。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      },
      watchCompareRisk:{
        question:'如何比较两只自选基金的风险？',alternateQuestion:'两只自选基金应该怎么比？',
        answer:'可对比风险等级、历史最大回撤、波动率、前十大持仓与行业集中度，也要看它们与现有持仓是否重复。近期收益更高不代表风险更低。',
        basis:'自选机会卡同时展示了两只基金。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      },
      watchActNow:{
        question:'自选基金出现信号后应该马上买吗？',alternateQuestion:'看到买入信号后是不是要立即操作？',
        answer:'不需要。信号只是信息提示，应先核对资金使用时间、产品风险、当前估值和已有持仓。页面不会根据信号自动买入或调仓。',
        basis:'你询问了信号出现后的操作边界。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      },
      watchSignalExpiry:{
        question:'买入信号失效时会如何提醒？',alternateQuestion:'机会信号变化后首页会怎么显示？',
        answer:'当观察条件不再满足时，应更新信号状态或从机会卡移出，并保留更新时间。具体规则需以正式业务配置为准，不应将过期信号继续展示为有效机会。',
        basis:'你追问了自选信号的时效管理。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      },
      watchSignalPeriod:{
        question:'持有多久才能判断信号是否有效？',alternateQuestion:'这类信号需要观察多长时间？',
        answer:'不能用统一持有时长判断。需对照信号设定的观察周期、基金投资方向和市场环境，同时关注回撤与业绩基准。短期上涨不能证明信号长期有效。',
        basis:'你希望了解自选机会信号的观察周期。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      },
      watchMultiFilter:{
        question:'多只自选基金同时出现信号怎么筛？',alternateQuestion:'自选机会太多时先看哪些？',
        answer:'可先排除风险等级或期限不匹配的产品，再按持仓重复度、回撤、费用和信号更新时间筛选。信号数量多不代表需要同时买入多只基金。',
        basis:'你关注到当日有多只基金出现机会信号。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      },
      watchPosition:{
        question:'如何控制自选基金的投入比例？',alternateQuestion:'自选基金放多少仓位比较合适？',
        answer:'应结合整体资产、应急资金、投资期限和最大可承受损失设定上限。若两只基金持仓高度重合，还需合并计算主题暴露，避免因分开购买忽略集中风险。',
        basis:'你希望将自选机会放入整体组合中判断。',action:'返回自选机会提示',selector:'[data-recommend-card="watchlist"]',target:'自选机会提示'
      }
    });
  }

  function ensureLeadershipAgentLanding(){
    var sheetContent = document.querySelector('.agent-sheet-content');
    var questionView = sheetContent && sheetContent.querySelector('.agent-question-view');
    if(!sheetContent || !questionView) return null;
    var landing = document.getElementById('leadershipAgentLanding');
    if(landing) return landing;
    var heroSource = document.querySelector('.agent-hero-avatar');
    var voiceSource = document.querySelector('.agent-answer-view .agent-voice-input img');
    landing = document.createElement('div');
    landing.id = 'leadershipAgentLanding';
    landing.className = 'leadership-agent-landing';
    landing.hidden = true;
    landing.innerHTML = '<section class="leadership-agent-welcome">' +
      '<div class="leadership-agent-welcome-copy"><span>Hello~</span><strong>尊敬的AI服务体验官！</strong><small>有什么投资的问题，尽管问我！</small></div>' +
      '<img src="' + (heroSource ? heroSource.src : '') + '" alt="小宝"></section>' +
      '<section class="leadership-agent-question-card" aria-label="小宝推荐问题"><div data-leadership-landing-list></div>' +
      '<button class="leadership-agent-landing-change" type="button" data-leadership-landing-change><i class="iconfont icon-huanyihuan" aria-hidden="true"></i><span>换一换</span></button></section>' +
      '<div class="agent-mode-row" aria-label="回答模式"><button class="agent-mode-chip is-active" type="button"><i class="iconfont icon-guandian" aria-hidden="true"></i><span>深度思考</span></button>' +
      '<button class="agent-mode-chip" type="button"><i class="iconfont icon-biaodelianjie" aria-hidden="true"></i><span>业务办理</span></button></div>' +
      '<button class="agent-voice-input leadership-agent-landing-input" type="button" data-leadership-agent-voice><img src="' + (voiceSource ? voiceSource.src : '') + '" alt=""><span>发消息或按住说话…</span></button>';
    sheetContent.insertBefore(landing,questionView);
    return landing;
  }

  function renderLeadershipAgentLanding(){
    var guide = leadershipAgentGuides[leadershipAgentGuideKey];
    var list = document.querySelector('[data-leadership-landing-list]');
    if(!guide || !list) return;
    var questions = guide.landingGroups[leadershipAgentLandingPage] || guide.landingGroups[0];
    var sourceLabels = {household:'家庭资金规划',theme:'主题投资观察',watchlist:'自选机会观察'};
    list.innerHTML = questions.map(function(item,index){
      if(index === 0){
        return '<button class="leadership-agent-featured-question" type="button" data-leadership-landing-question="' + item.key + '" data-leadership-question="' + item.question + '">' +
          '<span class="leadership-agent-featured-avatar"><img src="' + (document.querySelector('.agent-hero-avatar') ? document.querySelector('.agent-hero-avatar').src : '') + '" alt=""></span>' +
          '<span><strong>' + item.question + '</strong><small>小宝推荐｜' + sourceLabels[leadershipAgentGuideKey] + '</small></span>' +
          '<i class="iconfont icon-shixinjiantou-you" aria-hidden="true"></i></button>';
      }
      return '<button class="leadership-agent-list-question" type="button" data-leadership-landing-question="' + item.key + '" data-leadership-question="' + item.question + '">' +
        '<span aria-hidden="true"></span><strong>' + item.question + '</strong><i class="iconfont icon-shixinjiantou-you" aria-hidden="true"></i></button>';
    }).join('');
    list.classList.remove('is-refreshing');
    requestAnimationFrame(function(){list.classList.add('is-refreshing');});
  }

  function ensureLeadershipAgentGuide(){
    var answerView = document.querySelector('.agent-answer-view');
    var conversation = answerView && answerView.querySelector('.agent-conversation');
    if(!answerView || !conversation) return null;
    var panel = document.getElementById('leadershipAgentFollowups');
    if(!panel){
      panel = document.createElement('section');
      panel.id = 'leadershipAgentFollowups';
      panel.className = 'leadership-agent-followups';
      panel.hidden = true;
      panel.innerHTML = '<header><div><strong>你还可以继续问</strong><small>小宝根据当前场景生成</small></div>' +
        '<button type="button" data-leadership-followup-change><i class="iconfont icon-huanyihuan" aria-hidden="true"></i><span>换一换</span></button></header>' +
        '<div class="leadership-agent-followup-list" data-leadership-followup-list></div>';
      conversation.insertAdjacentElement('afterend',panel);
    }
    return {panel:panel};
  }

  function renderLeadershipAgentFollowups(){
    var guide = leadershipAgentGuides[leadershipAgentGuideKey];
    var list = document.querySelector('[data-leadership-followup-list]');
    if(!guide || !list) return;
    var questions = guide.groups[leadershipAgentGuidePage] || guide.groups[0];
    list.innerHTML = questions.map(function(item,index){
      return '<button type="button" data-leadership-followup="' + item.key + '" data-leadership-question="' + item.question + '">' +
        '<span class="leadership-agent-followup-index">' + (index + 1) + '</span><span>' + item.question + '</span>' +
        '<i class="iconfont icon-shixinjiantou-you" aria-hidden="true"></i></button>';
    }).join('');
    list.classList.remove('is-refreshing');
    requestAnimationFrame(function(){list.classList.add('is-refreshing');});
  }

  function setLeadershipAgentGuide(key,showLanding){
    var guide = leadershipAgentGuides[key];
    var ui = ensureLeadershipAgentGuide();
    var landing = ensureLeadershipAgentLanding();
    if(!guide || !ui || !landing) return;
    leadershipAgentGuideKey = key;
    leadershipAgentGuidePage = 0;
    leadershipAgentLandingPage = 0;
    var layer = document.getElementById('agentLayer');
    if(layer){
      layer.classList.add('is-leadership-agent');
      layer.classList.toggle('is-leadership-agent-landing',!!showLanding);
      layer.dataset.view = showLanding ? 'questions' : 'answer';
    }
    landing.hidden = !showLanding;
    ui.panel.hidden = !!showLanding;
    var contextTag = document.getElementById('agentContextTag');
    if(contextTag) contextTag.textContent = 'AI投顾';
    var contextCopy = document.getElementById('agentContextCopy');
    if(contextCopy) contextCopy.textContent = '随叫随到，你的投资小帮手！';
    var voiceCopy = document.querySelector('.agent-answer-view [data-agent-voice] span');
    if(voiceCopy) voiceCopy.textContent = guide.hint;
    if(showLanding) renderLeadershipAgentLanding();
    else renderLeadershipAgentFollowups();
  }

  function resetLeadershipAgentGuide(){
    leadershipAgentGuideKey = '';
    leadershipAgentGuidePage = 0;
    leadershipAgentLandingPage = 0;
    clearTimeout(leadershipAgentVoiceTimer);
    var ui = ensureLeadershipAgentGuide();
    var landing = ensureLeadershipAgentLanding();
    if(ui){
      ui.panel.hidden = true;
    }
    if(landing) landing.hidden = true;
    var layer = document.getElementById('agentLayer');
    if(layer) layer.classList.remove('is-leadership-agent','is-leadership-agent-landing');
    var contextTag = document.getElementById('agentContextTag');
    if(contextTag) contextTag.textContent = '问小宝';
    var contextCopy = document.getElementById('agentContextCopy');
    if(contextCopy) contextCopy.textContent = '帮你理清资金安排和理财问题';
    var voiceCopy = document.querySelector('.agent-answer-view [data-agent-voice] span');
    if(voiceCopy) voiceCopy.textContent = '继续提问…';
  }

  registerLeadershipAgentFlows();
  ensureLeadershipAgentGuide();
  ensureLeadershipAgentLanding();

  var priorRenderPrototype = typeof renderPrototype === 'function' ? renderPrototype : null;
  if(priorRenderPrototype){
    renderPrototype = function(){
      priorRenderPrototype();
      requestAnimationFrame(function(){applyPersona(false);});
    };
  }

  registerDetails();
  applyPersona(false);

  document.addEventListener('click',function(event){
    var watchSignal = event.target.closest('[data-leadership-watch-signal]');
    if(watchSignal){
      event.preventDefault();
      event.stopImmediatePropagation();
      if(typeof openSubpage === 'function') openSubpage('leadershipWatchSignal');
      return;
    }
    var askMore = event.target.closest('[data-leadership-action="ask-household"],[data-leadership-action="ask-theme"],[data-leadership-ask-more="watchlist"]');
    if(askMore){
      var askGuideKey = askMore.dataset.leadershipAskMore || (askMore.dataset.leadershipAction === 'ask-theme' ? 'theme' : 'household');
      if(askGuideKey === 'watchlist' && typeof openAgentSheet === 'function') openAgentSheet();
      setLeadershipAgentGuide(askGuideKey,true);
      return;
    }
    var landingChange = event.target.closest('[data-leadership-landing-change]');
    if(landingChange){
      event.preventDefault();
      event.stopImmediatePropagation();
      var landingGuide = leadershipAgentGuides[leadershipAgentGuideKey];
      if(landingGuide){
        leadershipAgentLandingPage = (leadershipAgentLandingPage + 1) % landingGuide.landingGroups.length;
        renderLeadershipAgentLanding();
      }
      return;
    }
    var landingQuestion = event.target.closest('[data-leadership-landing-question]');
    if(landingQuestion){
      event.preventDefault();
      event.stopImmediatePropagation();
      var currentGuideKey = leadershipAgentGuideKey;
      if(typeof answerAgentQuestion === 'function') answerAgentQuestion(landingQuestion.dataset.leadershipLandingQuestion,landingQuestion.dataset.leadershipQuestion || landingQuestion.textContent.trim());
      setLeadershipAgentGuide(currentGuideKey,false);
      return;
    }
    var landingVoice = event.target.closest('[data-leadership-agent-voice]');
    if(landingVoice){
      event.preventDefault();
      event.stopImmediatePropagation();
      clearTimeout(leadershipAgentVoiceTimer);
      landingVoice.classList.add('is-listening');
      var landingVoiceCopy = landingVoice.querySelector('span');
      if(landingVoiceCopy) landingVoiceCopy.textContent = '正在聆听，请说出你的问题…';
      leadershipAgentVoiceTimer = setTimeout(function(){
        landingVoice.classList.remove('is-listening');
        if(landingVoiceCopy) landingVoiceCopy.textContent = '发消息或按住说话…';
        var voiceGuide = leadershipAgentGuides[leadershipAgentGuideKey];
        var firstQuestion = voiceGuide && voiceGuide.landingGroups[leadershipAgentLandingPage][0];
        if(firstQuestion && typeof answerAgentQuestion === 'function'){
          var voiceGuideKey = leadershipAgentGuideKey;
          answerAgentQuestion(firstQuestion.key,firstQuestion.question);
          setLeadershipAgentGuide(voiceGuideKey,false);
        }
      },700);
      return;
    }
    var change = event.target.closest('[data-leadership-followup-change]');
    if(change){
      event.preventDefault();
      event.stopImmediatePropagation();
      var guide = leadershipAgentGuides[leadershipAgentGuideKey];
      if(guide){
        leadershipAgentGuidePage = (leadershipAgentGuidePage + 1) % guide.groups.length;
        renderLeadershipAgentFollowups();
      }
      return;
    }
    var followup = event.target.closest('[data-leadership-followup]');
    if(followup){
      event.preventDefault();
      event.stopImmediatePropagation();
      if(typeof answerAgentQuestion === 'function') answerAgentQuestion(followup.dataset.leadershipFollowup,followup.dataset.leadershipQuestion || followup.textContent.trim());
      return;
    }
    if(event.target.closest('.bottom-assistant')) resetLeadershipAgentGuide();
    var control = event.target.closest('[data-leadership-persona]');
    if(!control) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    personaView = control.dataset.leadershipPersona;
    applyPersona(true);
  },true);
})();
