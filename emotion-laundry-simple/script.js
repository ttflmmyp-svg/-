const scenes = document.querySelectorAll(".scene");
const panels = document.querySelectorAll("[data-panel]");
const dots = document.querySelectorAll("[data-dot]");

const emotionInput = document.getElementById("emotionInput");
const inputCount = document.getElementById("inputCount");
const inputError = document.getElementById("inputError");
const miniCloth = document.getElementById("miniCloth");
const npcLine = document.getElementById("npcLine");
const roomShell = document.querySelector(".room-shell");
const basketHotspot = document.getElementById("basketHotspot");
const washerHotspot = document.getElementById("washerHotspot");
const sinkHotspot = document.getElementById("sinkHotspot");
const lineHotspot = document.getElementById("lineHotspot");
const detergentBottle = document.getElementById("detergentBottle");
const detergentLabel = document.getElementById("detergentLabel");
const microBubbleField = document.getElementById("microBubbleField");
const microFlash = document.getElementById("microFlash");
const cleanClothImage = document.getElementById("cleanClothImage");
const sentenceBuild = document.getElementById("sentenceBuild");
const cardTray = document.getElementById("cardTray");
const packReceiptBtn = document.getElementById("packReceiptBtn");
const CLOTH_ASSET_VERSION = "202606061932";
const CLEAN_ASSET_VERSION = "202606061949";
const clothAsset = fileName => `../素材照片文件夹/${fileName}?v=${CLOTH_ASSET_VERSION}`;
const cleanAsset = fileName => `../新照片素材/${fileName}?v=${CLEAN_ASSET_VERSION}`;

const rules = [
  {
    type: "meltdown",
    label: "崩溃 / 发疯",
    keywords: ["崩溃", "疯了", "受不了", "炸了", "完蛋", "不行了", "破防"],
    cloth: "崩溃爆炸睡衣",
    emoji: "🥼",
    asset: clothAsset("7、崩溃睡衣.png"),
    cleanAsset: cleanAsset("崩溃睡衣.png"),
    detergentName: "先暂停洗衣液",
    softenerName: "没关系柔顺剂",
    bubbles: ["我真的受不了", "要炸了", "全都乱了", "我撑不住", "今天太过分"],
    result: "如果今天已经很满，先不要继续往里塞东西。停一下、喝水、坐稳，也算处理。"
  },
  {
    type: "anger",
    label: "愤怒",
    keywords: ["生气", "气死", "烦死", "讨厌", "火大", "无语", "不爽", "攻击"],
    cloth: "愤怒红袜子",
    emoji: "🧦",
    asset: clothAsset("2、愤怒袜子.png"),
    cleanAsset: cleanAsset("愤怒袜子.png"),
    detergentName: "消消气洗衣液",
    softenerName: "轻一点漂白剂",
    bubbles: ["凭什么", "太烦了", "我不想忍", "没人听我说", "这不公平"],
    result: "你的火气不是坏东西，它提醒你边界被碰到了。先把火放小一点，再决定怎么说。"
  },
  {
    type: "wronged",
    label: "委屈",
    keywords: ["委屈", "没人懂", "冤", "难受", "被误会", "想哭", "难过", "哭"],
    cloth: "委屈小毛巾",
    emoji: "🧣",
    asset: clothAsset("4、委屈毛衣.png"),
    cleanAsset: cleanAsset("委屈毛衣.png"),
    detergentName: "抱抱你洗衣液",
    softenerName: "不怪你柔顺剂",
    bubbles: ["没人懂我", "我也很努力了", "为什么怪我", "我有点想哭", "我说不出口"],
    result: "这份委屈值得被看见。就算暂时没人完全懂你，你也可以先站在自己这一边。"
  },
  {
    type: "anxiety",
    label: "焦虑",
    keywords: ["焦虑", "担心", "紧张", "害怕", "来不及", "压力"],
    cloth: "焦虑皱皱衬衫",
    emoji: "👔",
    asset: clothAsset("1、迷茫衬衫.png"),
    cleanAsset: cleanAsset("迷茫衬衫.png"),
    detergentName: "慢慢来洗衣液",
    softenerName: "先呼吸柔顺剂",
    bubbles: ["来不及了", "我会搞砸", "别人都比我快", "不能出错", "脑子停不下来"],
    result: "你不是太差，只是今天的脑内滚筒开得太久了。先让一件小事完成，就已经很好。"
  },
  {
    type: "tired",
    label: "疲惫",
    keywords: ["累", "困", "疲惫", "不想动", "撑不住", "耗尽", "没力气", "熬夜"],
    cloth: "疲惫软帽衫",
    emoji: "🧥",
    asset: clothAsset("3、疲惫外套.png"),
    cleanAsset: cleanAsset("疲惫外套.png"),
    detergentName: "休息一下洗衣液",
    softenerName: "充充电柔顺剂",
    bubbles: ["我好累", "不想再撑", "什么都不想做", "睡也睡不够", "电量太低"],
    result: "今天可以不追求满格电量。能把自己放回柔软一点的位置，也是一种完成。"
  },
  {
    type: "lost",
    label: "迷茫",
    keywords: ["迷茫", "不知道", "没方向", "混乱", "空", "怎么办", "无助", "不知道怎么办"],
    cloth: "迷路口袋 T 恤",
    emoji: "👕",
    asset: clothAsset("5、迷茫围巾.png"),
    cleanAsset: cleanAsset("迷茫围巾.png"),
    detergentName: "走一步洗衣液",
    softenerName: "会清楚柔顺剂",
    bubbles: ["我不知道", "没有方向", "选哪个都怕错", "好像卡住了", "看不清下一步"],
    result: "迷茫不是失败，它只是地图还没有刷新。先选一个最小的下一步，不用一次走完。"
  },
  {
    type: "lonely",
    label: "孤独",
    keywords: ["孤独", "一个人", "没人陪", "被丢下", "冷清", "没人理", "被忽略"],
    cloth: "孤独单只手套",
    emoji: "🧤",
    asset: clothAsset("6、孤独手套.png"),
    cleanAsset: cleanAsset("孤独手套.png"),
    detergentName: "有人在洗衣液",
    softenerName: "陪陪你柔顺剂",
    bubbles: ["只有我一个", "没人想起我", "我像被丢下", "想找人说话", "有点冷"],
    result: "孤独不代表你不重要。它只是今天的房间安静了一点，你依然值得被回应。"
  },
  {
    type: "overthinking",
    label: "内耗",
    keywords: ["内耗", "想太多", "自责", "怪我", "做不好", "反复", "纠结"],
    cloth: "内耗打结围巾",
    emoji: "🧶",
    asset: clothAsset("8、内耗线团.png"),
    cleanAsset: cleanAsset("内耗毛线团.png"),
    detergentName: "别拧巴洗衣液",
    softenerName: "放过自己柔顺剂",
    bubbles: ["是不是我的问题", "我又想多了", "我不够好", "早知道就好了", "停不下来"],
    result: "你不需要把每个细节都审判一遍。今天先把自己从反复播放里暂停出来。"
  }
];

const fallbackRule = {
  type: "default",
  label: "普通心事",
  cloth: "普通心事 T 恤",
  emoji: "👕",
  asset: clothAsset("1、迷茫衬衫.png"),
  cleanAsset: cleanAsset("迷茫衬衫.png"),
  detergentName: "慢慢来洗衣液",
  softenerName: "先呼吸柔顺剂",
  bubbles: ["今天有点重", "说不清楚", "先放一放", "慢慢来", "不用马上解决"],
  result: "这件心事已经被好好放进洗衣机了。它不必立刻消失，轻一点就很好。"
};

const receiptLines = {
  anxiety: [
    "我允许自己今天只做一小步，也足够了。",
    "我允许暂时放下“必须完美”的念头。",
    "我允许大脑暂停彩排未来，让自己休息。",
    "我允许焦虑像衣服一样挂一会儿再理顺。",
    "我允许慢慢调整节奏，不必一次解决所有事情。"
  ],
  anger: [
    "我允许愤怒的情绪像热气腾腾的袜子一样先冷却。",
    "我允许自己说“不”，保护自己的边界。",
    "我允许情绪停留一会儿，再决定如何回应。",
    "我允许把愤怒当作力量的提醒，而不是负担。",
    "我允许愤怒之后轻轻舒展自己，像晾晒衣服一样。"
  ],
  tired: [
    "我允许自己休息，不必强行继续。",
    "我允许疲惫像厚重外套一样先挂起来。",
    "我允许暂停处理一切，让身体和心灵充电。",
    "我允许慢慢恢复，哪怕今天只做到一点点。",
    "我允许闭上眼睛，放下责任片刻。"
  ],
  wronged: [
    "我允许悲伤时，眼泪流淌成星河。",
    "我允许自己委屈，寻求温柔拥抱。",
    "我允许毛衣般的温暖安慰自己，不必坚强。",
    "我允许情绪像慢慢干的衣服一样，逐渐复原。",
    "我允许哭泣，它是心灵的清洗。"
  ],
  lost: [
    "我允许暂时迷茫，未来慢慢理清。",
    "我允许不清楚下一步，先选一个小方向。",
    "我允许思绪打结，但不会永远纠缠。",
    "我允许给自己时间，答案会慢慢出现。",
    "我允许放慢脚步，探索适合自己的道路。"
  ],
  lonely: [
    "我允许孤独像手套一样包裹我，让我温暖。",
    "我允许在无人理解时，依然温柔对待自己。",
    "我允许自己独处，发现内心的声音。",
    "我允许享受自己的陪伴，不必急于寻找认同。",
    "我允许与自己建立最坚定的联系。"
  ],
  meltdown: [
    "我允许情绪崩溃，它只是提醒我需要休息。",
    "我允许自己像睡衣一样松开防备，重整力量。",
    "我允许跌倒后慢慢站起来，不必完美。",
    "我允许混乱暂时存在，再一点点整理。",
    "我允许无力时，暂时躲进自己的小世界。"
  ],
  overthinking: [
    "我允许放下自责，不必揪住每个念头。",
    "我允许给自己空间，不被想法压垮。",
    "我允许缓慢思考，按自己的节奏前行。",
    "我允许接受不完美的自己，停止内耗。",
    "我允许一切如其所是，不必控制所有细节。"
  ],
  default: [
    "我允许今天的自己慢慢来。",
    "我允许这件心事先变轻一点。",
    "我允许自己不必立刻找到答案。",
    "我允许把今天收好，再继续往前走。"
  ]
};

const microThoughts = {
  anxiety: {
    harsh: [
      "我必须立刻把所有事都做好！",
      "只要有一点没完成，我就完蛋了！",
      "我现在绝对不能出错！"
    ],
    gentle: [
      "我可以先走好第一步",
      "一点点完成也算前进",
      "我允许自己慢慢呼吸"
    ]
  },
  anger: {
    harsh: [
      "凭什么所有人都这样对我！",
      "我现在真的一句话都不想忍了！",
      "这根本一点都不公平！"
    ],
    gentle: [
      "我可以先保护自己的边界",
      "愤怒也可以轻轻落地",
      "我可以晚一点再回应"
    ]
  },
  tired: {
    harsh: [
      "我真的一点力气都没有了！",
      "为什么我永远都休息不过来！",
      "我必须继续撑下去！"
    ],
    gentle: [
      "我可以先休息一下",
      "低电量也值得被照顾",
      "今天少做一点也可以"
    ]
  },
  lost: {
    harsh: [
      "我完全不知道自己在干什么！",
      "别人都在往前走，只有我卡在原地！",
      "我肯定选错了方向！"
    ],
    gentle: [
      "我可以先选一个小方向",
      "暂时看不清也没关系",
      "答案会慢慢浮出来"
    ]
  },
  wronged: {
    harsh: [
      "明明我已经很努力了，为什么没人看见！",
      "为什么受伤的总是我！",
      "我是不是不值得被理解！"
    ],
    gentle: [
      "我的努力值得被看见",
      "我可以先站在自己这边",
      "委屈也需要被抱一抱"
    ]
  },
  overthinking: {
    harsh: [
      "我是不是又做错了什么！",
      "我脑子里一直停不下来，快被自己烦死了！",
      "我必须把每个细节想清楚！"
    ],
    gentle: [
      "我可以放过自己一点",
      "想法很多也不等于错误",
      "我不必控制所有细节"
    ]
  },
  lonely: {
    harsh: [
      "好像根本没有人真的懂我！",
      "我就算消失了，也不会有人发现吧！",
      "我只能一直一个人吗！"
    ],
    gentle: [
      "我仍然值得被回应",
      "我可以先陪着自己",
      "安静也可以有温度"
    ]
  },
  meltdown: {
    harsh: [
      "我现在真的要炸了！",
      "我控制不住了，什么都不想管了！",
      "一切都已经乱到不行了！"
    ],
    gentle: [
      "我可以先停在这里",
      "混乱也会一点点散开",
      "现在休息不是失败"
    ]
  },
  default: {
    harsh: [
      "今天真的有点太重了！",
      "我不知道该怎么处理！",
      "我必须马上好起来！"
    ],
    gentle: [
      "我可以先把它放轻一点",
      "不用马上找到答案",
      "今天可以慢慢来"
    ]
  }
};

const gameState = {
  userText: "",
  analysis: null,
  cloth: fallbackRule.cloth,
  emoji: fallbackRule.emoji,
  cleanIndex: 67,
  soap: 0,
  drum: 0,
  spin: 0,
  roomStep: "wide",
  receipt: null,
  microCards: [],
  poppedBubbles: 0,
  sentenceCards: [],
  buildCards: [],
  composedSentence: ""
};

function setScene(name) {
  scenes.forEach(scene => scene.classList.toggle("active", scene.dataset.scene === name));
  const group = name === "home" ? "home" : name === "receipt" ? "receipt" : "wash";
  dots.forEach(dot => dot.classList.toggle("active", dot.dataset.dot === group || (group === "wash" && dot.dataset.dot === "input")));
}

function setPanel(name) {
  panels.forEach(panel => panel.classList.toggle("active", panel.dataset.panel === name));
  if (["detergent", "microBubble", "recompose", "soap", "drum", "bubble", "spin", "hang"].includes(name)) {
    roomShell.classList.add("is-washing");
    const stepByPanel = {
      detergent: "detergent",
      microBubble: "microBubble",
      recompose: "recompose",
      soap: "sinkSoap",
      bubble: "sinkBubble",
      spin: "washerSpin",
      hang: "lineHang",
      drum: "washerSpin"
    };
    roomShell.dataset.roomStep = stepByPanel[name] || "wide";
    gameState.roomStep = stepByPanel[name] || "wide";
    const hints = {
      detergent: "洗涤剂准备好了，点一下瓶子开始倒入。",
      microBubble: "滚筒里冒出了 3 个想法泡泡，轻轻点破它们。",
      recompose: "洗好的词卡排出来了，拖动或点击，把今天重新摆一摆。",
      soap: "镜头拉到洗手池，先给这件心事涂一点肥皂。",
      bubble: "泡泡浮出来了，把那些重重的话戳掉。",
      spin: "回到洗衣机，长按把水分甩出去。",
      hang: "最后拉近到晾衣杆，把它晾起来。",
      drum: "回到洗衣机，让今天转一转。"
    };
    npcLine.textContent = hints[name] || "";
    dots.forEach(dot => dot.classList.toggle("active", dot.dataset.dot === "wash"));
  }
}

function setRoomStep(step) {
  gameState.roomStep = step;
  roomShell.dataset.roomStep = step;
  roomShell.classList.remove("is-washing");

  if (step === "wide") {
    npcLine.textContent = "点点脏衣篓，把今天放进去。";
  }
  if (step === "basket") {
    npcLine.textContent = "不用整理得很漂亮，乱糟糟也可以放进来。";
  }
  if (step === "cloth") {
    npcLine.textContent = "这件衣服准备好了，送去洗衣机吧。";
  }
  if (step === "washer") {
    npcLine.textContent = "投递成功，先给它倒一点洗涤剂。";
  }
  if (step === "detergent") {
    npcLine.textContent = "洗涤剂准备好了，点一下瓶子开始倒入。";
  }
  if (step === "microBubble") {
    npcLine.textContent = "泡泡会留在原地变成温和词卡。";
  }
  if (step === "recompose") {
    npcLine.textContent = "把这几张词卡重新排成一句你愿意带走的话。";
  }
}

function detectEmotion(text) {
  const normalized = text.toLowerCase();
  return rules.find(rule => rule.keywords.some(word => normalized.includes(word))) || fallbackRule;
}

function resetWashProgress() {
  gameState.soap = 0;
  gameState.drum = 0;
  gameState.spin = 0;
  gameState.microCards = [];
  gameState.poppedBubbles = 0;
  gameState.sentenceCards = [];
  gameState.buildCards = [];
  gameState.composedSentence = "";
  roomShell.classList.remove("show-clean-result", "show-recompose", "micro-complete");
  const soapMeter = document.getElementById("soapMeter");
  const spinMeter = document.getElementById("spinMeter");
  if (soapMeter) soapMeter.style.width = "0%";
  if (spinMeter) spinMeter.style.width = "0%";
  document.querySelectorAll(".stain").forEach(stain => stain.style.opacity = "1");
  miniCloth.classList.remove("visible");
  if (microBubbleField) microBubbleField.innerHTML = "";
  if (sentenceBuild) sentenceBuild.innerHTML = "";
  if (cardTray) cardTray.innerHTML = "";
}

function prepareThrow() {
  const rule = gameState.analysis;
  const clothImage = document.getElementById("clothImage");
  const miniClothImage = document.getElementById("miniClothImage");
  document.getElementById("clothEmoji").textContent = rule.emoji;
  document.getElementById("clothName").textContent = rule.cloth;
  clothImage.src = rule.asset;
  clothImage.alt = rule.cloth;
  miniClothImage.src = rule.asset;
  miniClothImage.alt = rule.cloth;
  detergentLabel.textContent = rule.detergentName;
  document.getElementById("clothCard").setAttribute("aria-label", `把${rule.cloth}送去洗衣机`);
}

function getMicroThoughtSet() {
  const rule = gameState.analysis || fallbackRule;
  return microThoughts[rule.type] || microThoughts.default;
}

function playPopSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(620, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(980, ctx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.13);
  setTimeout(() => ctx.close(), 180);
}

function startMicroBubbles() {
  const thoughtSet = getMicroThoughtSet();
  gameState.poppedBubbles = 0;
  gameState.microCards = thoughtSet.harsh.slice(0, 3).map((harsh, index) => ({
    id: `heal-${index}`,
    harsh,
    gentle: thoughtSet.gentle[index]
  }));
  roomShell.classList.remove("micro-complete", "show-recompose", "show-clean-result");
  microBubbleField.innerHTML = "";

  gameState.microCards.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = "micro-bubble";
    button.type = "button";
    button.dataset.index = String(index);
    button.innerHTML = `
      <span class="burst-lines" aria-hidden="true"></span>
      <span class="bubble-shell" aria-hidden="true"></span>
      <span class="micro-card-face harsh">${card.harsh}</span>
      <span class="micro-card-face gentle">${card.gentle}</span>
    `;
    button.addEventListener("click", () => popMicroBubble(button, card));
    microBubbleField.appendChild(button);
  });

  setPanel("microBubble");
}

function popMicroBubble(button, card) {
  if (button.classList.contains("popped")) return;
  button.classList.add("popped");
  playPopSound();
  gameState.poppedBubbles += 1;
  npcLine.textContent = `“${card.gentle}”留了下来。`;

  if (gameState.poppedBubbles >= gameState.microCards.length) {
    setTimeout(completeMicroBubbles, 680);
  }
}

function completeMicroBubbles() {
  roomShell.classList.add("micro-complete");
  microFlash.classList.add("flash");
  npcLine.textContent = "滚筒里的光亮起来了，衣服和词卡正在变轻。";
  setTimeout(() => {
    microFlash.classList.remove("flash");
    showRecompose();
  }, 920);
}

function shuffleCards(cards) {
  return cards
    .map(card => ({ card, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.card);
}

function showRecompose() {
  const rule = gameState.analysis || fallbackRule;
  cleanClothImage.src = rule.cleanAsset;
  cleanClothImage.alt = `洗好的${rule.cloth}`;
  gameState.buildCards = [];
  gameState.sentenceCards = shuffleCards([
    { id: "base-me", text: "我" },
    { id: "base-feel", text: "但是我觉得" },
    ...gameState.microCards.map(card => ({ id: card.id, text: card.gentle }))
  ]);
  roomShell.classList.add("show-recompose");
  setPanel("recompose");
  renderRecomposeCards();
}

function renderRecomposeCards() {
  sentenceBuild.innerHTML = "";
  cardTray.innerHTML = "";

  if (!gameState.buildCards.length) {
    const placeholder = document.createElement("span");
    placeholder.className = "sentence-placeholder";
    placeholder.textContent = "把词卡放到这里";
    sentenceBuild.appendChild(placeholder);
  }

  gameState.buildCards.forEach(card => {
    sentenceBuild.appendChild(createWordCard(card, "build"));
  });

  gameState.sentenceCards.forEach(card => {
    cardTray.appendChild(createWordCard(card, "tray"));
  });

  gameState.composedSentence = gameState.buildCards.map(card => card.text).join("");
  packReceiptBtn.disabled = gameState.buildCards.length < 3;
}

function createWordCard(card, area) {
  const button = document.createElement("button");
  button.className = "word-card";
  button.type = "button";
  button.dataset.cardId = card.id;
  button.dataset.area = area;
  button.textContent = card.text;
  button.addEventListener("click", () => {
    if (button.dataset.dragged === "true") {
      button.dataset.dragged = "false";
      return;
    }
    moveWordCard(card.id, area === "tray" ? "build" : "tray");
  });
  button.addEventListener("pointerdown", event => beginCardDrag(event, card.id, area));
  return button;
}

function moveWordCard(cardId, targetArea, insertIndex = null) {
  const from = gameState.sentenceCards.findIndex(card => card.id === cardId);
  const fromBuild = gameState.buildCards.findIndex(card => card.id === cardId);
  let card = null;

  if (from >= 0) card = gameState.sentenceCards.splice(from, 1)[0];
  if (fromBuild >= 0) card = gameState.buildCards.splice(fromBuild, 1)[0];
  if (!card) return;

  const target = targetArea === "build" ? gameState.buildCards : gameState.sentenceCards;
  const safeIndex = insertIndex === null ? target.length : Math.max(0, Math.min(insertIndex, target.length));
  target.splice(safeIndex, 0, card);
  renderRecomposeCards();
}

function beginCardDrag(event, cardId, area) {
  const target = event.currentTarget;
  const startX = event.clientX;
  const startY = event.clientY;
  let dragging = false;
  target.setPointerCapture(event.pointerId);

  function move(pointerEvent) {
    const dx = pointerEvent.clientX - startX;
    const dy = pointerEvent.clientY - startY;
    if (!dragging && Math.hypot(dx, dy) > 10) {
      dragging = true;
      target.classList.add("dragging");
    }
    if (dragging) {
      target.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    }
  }

  function end(pointerEvent) {
    target.removeEventListener("pointermove", move);
    target.removeEventListener("pointerup", end);
    target.removeEventListener("pointercancel", end);
    target.classList.remove("dragging");
    target.style.transform = "";

    if (!dragging) return;
    target.dataset.dragged = "true";
    setTimeout(() => {
      target.dataset.dragged = "false";
    }, 180);

    const droppedOnBuild = document.elementFromPoint(pointerEvent.clientX, pointerEvent.clientY);
    const buildTarget = droppedOnBuild && droppedOnBuild.closest(".sentence-build");
    const trayTarget = droppedOnBuild && droppedOnBuild.closest(".card-tray");

    if (buildTarget) {
      const cards = Array.from(sentenceBuild.querySelectorAll(".word-card"));
      const insertIndex = cards.findIndex(cardEl => pointerEvent.clientX < cardEl.getBoundingClientRect().left + cardEl.offsetWidth / 2);
      moveWordCard(cardId, "build", insertIndex === -1 ? null : insertIndex);
    } else if (trayTarget || area === "build") {
      moveWordCard(cardId, "tray");
    }
  }

  target.addEventListener("pointermove", move);
  target.addEventListener("pointerup", end);
  target.addEventListener("pointercancel", end);
}

function finishReceipt() {
  const rule = gameState.analysis || fallbackRule;
  const source = gameState.userText.length > 42 ? `${gameState.userText.slice(0, 42)}...` : gameState.userText;
  const lines = receiptLines[rule.type] || receiptLines.default;
  const composedLine = gameState.composedSentence || gameState.buildCards.map(card => card.text).join("");
  const mainLine = composedLine || lines[Math.floor(Math.random() * lines.length)];
  gameState.cleanIndex = Math.floor(48 + Math.random() * 38);
  gameState.receipt = {
    title: `${rule.label}已洗护完成`,
    result: mainLine,
    emotion: rule.label,
    cloth: rule.cloth,
    cleanIndex: `${gameState.cleanIndex}%`,
    source: source ? `已收好：${source}` : "已收好：一件没有写明来源的心事",
    cards: gameState.microCards.map(card => card.gentle),
    composedSentence: composedLine,
    createdAt: new Date().toISOString()
  };

  document.getElementById("receiptTitle").textContent = gameState.receipt.title;
  document.getElementById("receiptCloth").textContent = gameState.receipt.cloth;
  document.getElementById("receiptEmotion").textContent = gameState.receipt.emotion;
  document.getElementById("receiptSource").textContent = gameState.receipt.source;
  document.getElementById("receiptResult").textContent = gameState.receipt.result;
  document.getElementById("cleanIndex").textContent = gameState.receipt.cleanIndex;
  setScene("receipt");
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = Array.from(text);
  let line = "";
  let currentY = y;
  chars.forEach(char => {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = char;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });
  if (line) ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

function storeReceipt() {
  if (!gameState.receipt) return;
  const saved = JSON.parse(localStorage.getItem("emotionLaundryReceipts") || "[]");
  saved.unshift(gameState.receipt);
  localStorage.setItem("emotionLaundryReceipts", JSON.stringify(saved.slice(0, 20)));
}

async function saveReceiptImage() {
  if (!gameState.receipt) return;
  storeReceipt();
  const toast = document.getElementById("receiptToast");
  const bg = document.getElementById("receiptBg");
  if (bg.decode) await bg.decode().catch(() => {});

  const canvas = document.createElement("canvas");
  canvas.width = 941;
  canvas.height = 1672;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 48px Microsoft YaHei, sans-serif";
  ctx.fillText(gameState.receipt.title, 470, 520);

  ctx.fillStyle = "#374151";
  ctx.font = "bold 42px Microsoft YaHei, sans-serif";
  wrapCanvasText(ctx, gameState.receipt.result, 470, 640, 500, 62);

  ctx.fillStyle = "#315b7d";
  ctx.font = "bold 28px Microsoft YaHei, sans-serif";
  ctx.fillText(`${gameState.receipt.emotion} / ${gameState.receipt.cloth} / ${gameState.receipt.cleanIndex}`, 470, 930);

  ctx.fillStyle = "#6b7280";
  ctx.font = "24px Microsoft YaHei, sans-serif";
  wrapCanvasText(ctx, gameState.receipt.source, 470, 1000, 500, 38);

  canvas.toBlob(blob => {
    if (!blob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `情绪洗衣小票-${Date.now()}.png`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }, "image/png");

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function showCleanResult() {
  const rule = gameState.analysis || fallbackRule;
  const cleanImage = document.getElementById("cleanClothImage");
  cleanImage.src = rule.cleanAsset;
  cleanImage.alt = `洗好的${rule.cloth}`;
  roomShell.classList.add("show-clean-result");
  npcLine.textContent = "洗护完成，点一下生成小票，把这次清洗收好。";
}

document.getElementById("startBtn").addEventListener("click", () => {
  setScene("room");
  if (!gameState.analysis) resetWashProgress();
  setRoomStep("wide");
});

document.querySelector("[data-action='backHome']").addEventListener("click", () => {
  roomShell.classList.remove("show-recompose", "micro-complete", "pouring-detergent");
  setScene("home");
  setRoomStep("wide");
});

basketHotspot.addEventListener("click", () => {
  if (gameState.roomStep === "wide") {
    setRoomStep("basket");
    setTimeout(() => emotionInput.focus(), 420);
  }
});

emotionInput.addEventListener("input", () => {
  inputCount.textContent = `${emotionInput.value.length} / 120`;
  inputError.textContent = "";
});

document.getElementById("submitEmotion").addEventListener("click", () => {
  const text = emotionInput.value.trim();
  if (!text) {
    inputError.textContent = "先写一句今天想洗掉的东西。";
    emotionInput.focus();
    return;
  }
  gameState.userText = text;
  gameState.analysis = detectEmotion(text);
  gameState.cloth = gameState.analysis.cloth;
  gameState.emoji = gameState.analysis.emoji;
  resetWashProgress();
  prepareThrow();
  setRoomStep("cloth");
});

function sendClothToWasher() {
  if (gameState.roomStep !== "cloth") {
    if (gameState.roomStep === "wide") npcLine.textContent = "先点脏衣篓，把今天放进去。";
    return;
  }
  setRoomStep("washer");
  miniCloth.classList.add("visible");
  setTimeout(() => setPanel("detergent"), 780);
}

document.getElementById("clothCard").addEventListener("click", sendClothToWasher);
washerHotspot.addEventListener("click", sendClothToWasher);

function pourDetergent() {
  if (gameState.roomStep !== "detergent") return;
  roomShell.classList.add("pouring-detergent");
  npcLine.textContent = `${gameState.analysis.detergentName}倒入中，泡泡马上就来。`;
  setTimeout(() => {
    roomShell.classList.remove("pouring-detergent");
    startMicroBubbles();
  }, 1450);
}

detergentBottle.addEventListener("click", pourDetergent);

let scrubbing = false;
const scrubArea = document.getElementById("scrubArea");

function addSoapProgress(amount) {
  const soapMeter = document.getElementById("soapMeter");
  if (!soapMeter) return;
  const wasComplete = gameState.soap >= 100;
  gameState.soap = Math.min(100, gameState.soap + amount);
  soapMeter.style.width = `${gameState.soap}%`;
  document.querySelectorAll(".stain").forEach(stain => {
    stain.style.opacity = String(Math.max(0, 1 - gameState.soap / 90));
  });
  if (!wasComplete && gameState.soap >= 100) {
    setTimeout(startMicroBubbles, 360);
  }
}

if (scrubArea) {
  scrubArea.addEventListener("pointerdown", event => {
    scrubbing = true;
    scrubArea.setPointerCapture(event.pointerId);
    addSoapProgress(12);
  });

  scrubArea.addEventListener("pointermove", () => {
    if (scrubbing) addSoapProgress(4);
  });

  scrubArea.addEventListener("pointerup", () => {
    scrubbing = false;
  });
}

document.querySelectorAll("[data-skip]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.skip === "microBubble") startMicroBubbles();
    setPanel(button.dataset.skip);
  });
});

const spinBtn = document.getElementById("spinBtn");
let spinTimer = null;

function startSpin() {
  if (spinTimer) return;
  spinBtn.textContent = "甩干中...";
  spinTimer = setInterval(() => {
    gameState.spin = Math.min(100, gameState.spin + 7);
    document.getElementById("spinMeter").style.width = `${gameState.spin}%`;
    if (gameState.spin >= 100) {
      stopSpin();
      setTimeout(() => setPanel("hang"), 240);
    }
  }, 90);
}

function stopSpin() {
  clearInterval(spinTimer);
  spinTimer = null;
  spinBtn.textContent = gameState.spin >= 100 ? "完成" : "按住甩干";
}

if (spinBtn) {
  spinBtn.addEventListener("pointerdown", startSpin);
  spinBtn.addEventListener("pointerup", stopSpin);
  spinBtn.addEventListener("pointerleave", stopSpin);
}

const cleanCloth = document.getElementById("cleanCloth");
if (cleanCloth) {
  cleanCloth.addEventListener("dragstart", event => {
    event.dataTransfer.setData("text/plain", "cloth");
  });
}

sinkHotspot.addEventListener("click", () => {
  if (gameState.roomStep === "microBubble") {
    npcLine.textContent = "现在先把滚筒里的 3 个泡泡戳开。";
  }
});

lineHotspot.addEventListener("click", () => {
  if (gameState.roomStep === "recompose") npcLine.textContent = "衣服已经晾好了，先把词卡摆成一句话。";
});

const hangZone = document.getElementById("hangZone");
if (hangZone) {
  hangZone.addEventListener("dragover", event => {
    event.preventDefault();
  });

  hangZone.addEventListener("drop", event => {
    event.preventDefault();
    if (cleanCloth) cleanCloth.classList.add("hung");
    setTimeout(showCleanResult, 700);
  });
}

const hangBtn = document.getElementById("hangBtn");
if (hangBtn) {
  hangBtn.addEventListener("click", () => {
    if (cleanCloth) cleanCloth.classList.add("hung");
    setTimeout(showCleanResult, 700);
  });
}

packReceiptBtn.addEventListener("click", finishReceipt);
document.getElementById("saveReceiptBtn").addEventListener("click", saveReceiptImage);

document.getElementById("restartBtn").addEventListener("click", () => {
  emotionInput.value = "";
  inputCount.textContent = "0 / 120";
  inputError.textContent = "";
  gameState.userText = "";
  gameState.analysis = null;
  gameState.receipt = null;
  resetWashProgress();
  roomShell.classList.remove("show-clean-result", "show-recompose", "micro-complete", "pouring-detergent");
  if (cleanCloth) cleanCloth.classList.remove("hung");
  if (packReceiptBtn) packReceiptBtn.disabled = true;
  setScene("room");
  setRoomStep("wide");
});
