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
const basketFocusProp = document.getElementById("basketFocusProp");
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
const BUBBLE_ASSET_PATH = "assets/bubbles/";
const POP_SOUND_SRC = "../image/泡泡裂开声音.m4a";
const BG_MUSIC_SRC = "../Tidy_Little_Victories.mp3";
const clothAsset = fileName => `../素材照片文件夹/${fileName}?v=${CLOTH_ASSET_VERSION}`;
const cleanAsset = fileName => `../新照片素材/${fileName}?v=${CLEAN_ASSET_VERSION}`;
const bubbleAsset = fileName => `${BUBBLE_ASSET_PATH}${fileName}`;
const bubblePopFrames = [
  "anim_bubble_pop_01.png",
  "anim_bubble_pop_02.png",
  "anim_bubble_pop_03.png",
  "anim_bubble_pop_04.png",
  "anim_bubble_pop_05.png",
  "anim_bubble_pop_06.png",
  "anim_bubble_pop_07.png"
].map(bubbleAsset);
const basketFocusFrames = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png"
].map(fileName => `../木桶/${fileName}?v=2026060705`);

const bubblePresets = {
  large: {
    idle: bubbleAsset("bubble_large_idle.png"),
    pressed: bubbleAsset("bubble_large_pressed.png")
  },
  medium: {
    idle: bubbleAsset("bubble_medium_idle.png"),
    pressed: bubbleAsset("bubble_medium_pressed.png")
  },
  small: {
    idle: bubbleAsset("bubble_small_idle.png"),
    pressed: bubbleAsset("bubble_small_idle.png")
  }
};

const popSound = new Audio(POP_SOUND_SRC);
popSound.preload = "auto";

const bgMusic = new Audio(BG_MUSIC_SRC);
bgMusic.loop = true;
bgMusic.preload = "auto";
bgMusic.volume = 0.36;
let bgMusicStarted = false;

const bubbleStageSlots = [
  { x: 49, y: 31, baseSize: 29, role: "hero", z: 8 },
  { x: 29, y: 42, baseSize: 24, role: "main", z: 7 },
  { x: 70, y: 45, baseSize: 24, role: "main", z: 7 },
  { x: 43, y: 59, baseSize: 22, role: "main", z: 7 },
  { x: 63, y: 66, baseSize: 21, role: "main", z: 7 },
  { x: 20, y: 28, baseSize: 15, role: "echo", z: 4 },
  { x: 80, y: 30, baseSize: 14, role: "echo", z: 4 },
  { x: 22, y: 63, baseSize: 16, role: "echo", z: 4 },
  { x: 80, y: 70, baseSize: 15, role: "echo", z: 4 }
];

const rules = [
  {
    type: "breakdown",
    label: "崩溃 / 发疯",
    keywords: ["崩溃", "破防", "发疯", "疯了", "绷不住", "受不了了", "受不了", "不行了", "心态爆炸", "爆炸了", "炸了", "裂开", "碎了", "麻了", "天塌了", "寄了", "彻底寄了", "毁灭吧", "想逃离", "想跑路", "精神状态", "cpu烧了", "大脑宕机", "红温", "情绪失控"],
    cloth: "崩溃睡衣",
    emoji: "🥼",
    asset: clothAsset("7、崩溃睡衣.png"),
    cleanAsset: cleanAsset("崩溃睡衣.png"),
    detergentName: "先暂停洗衣液",
    softenerName: "没关系柔顺剂",
    bubbles: ["要炸了", "不管了", "绷不住", "裂开了", "受不了"],
    result: "如果今天已经很满，先不要继续往里塞东西。停一下、喝水、坐稳，也算处理。"
  },
  {
    type: "anger",
    label: "愤怒",
    keywords: ["愤怒", "生气", "气死", "气炸", "火大", "烦死", "烦躁", "暴躁", "不爽", "无语", "服了", "离谱", "凭什么", "恶心", "晦气", "忍不了", "受不了", "想骂人", "想发火", "被坑", "背刺", "甩锅", "针对我", "队友摆烂", "组员划水", "攻击"],
    cloth: "愤怒袜子",
    emoji: "🧦",
    asset: clothAsset("2、愤怒袜子.png"),
    cleanAsset: cleanAsset("愤怒袜子.png"),
    detergentName: "消消气洗衣液",
    softenerName: "轻一点漂白剂",
    bubbles: ["凭什么", "忍够了", "气死了", "太离谱", "别惹我"],
    result: "你的火气不是坏东西，它提醒你边界被碰到了。先把火放小一点，再决定怎么说。"
  },
  {
    type: "sadness",
    label: "委屈 / 难过 / 想哭",
    keywords: ["委屈", "难过", "想哭", "哭了", "哭死", "哭", "心酸", "鼻酸", "泪目", "心碎", "失落", "低落", "沮丧", "emo", "被误会", "被冤枉", "没人理解", "没人懂", "不被在乎", "不被看见", "被否定", "我明明", "我已经很努力了", "我真的尽力了", "开心不起来", "破碎", "扎心", "冤", "难受"],
    cloth: "委屈毛衣",
    emoji: "🧣",
    asset: clothAsset("4、委屈毛衣.png"),
    cleanAsset: cleanAsset("委屈毛衣.png"),
    detergentName: "抱抱你洗衣液",
    softenerName: "不怪你柔顺剂",
    bubbles: ["好委屈", "没人懂", "没看见", "好难过", "想哭"],
    result: "这份委屈值得被看见。就算暂时没人完全懂你，你也可以先站在自己这一边。"
  },
  {
    type: "anxiety",
    label: "焦虑",
    keywords: ["焦虑", "慌", "心慌", "紧张", "不安", "担心", "害怕", "压力", "压力大", "压力山大", "来不及", "赶不上", "完蛋了", "完蛋", "要完了", "救命", "ddl", "deadline", "考试", "期末", "挂科", "绩点", "gpa", "保研", "考研", "实习", "面试", "怕失败", "怕做不好", "睡不着"],
    cloth: "焦虑衣服",
    emoji: "👔",
    asset: clothAsset("1、迷茫衬衫.png"),
    cleanAsset: cleanAsset("迷茫衬衫.png"),
    detergentName: "慢慢来洗衣液",
    softenerName: "先呼吸柔顺剂",
    bubbles: ["来不及", "完蛋了", "好慌", "要挂了", "救命"],
    result: "你不是太差，只是今天的脑内滚筒开得太久了。先让一件小事完成，就已经很好。"
  },
  {
    type: "fatigue",
    label: "疲惫",
    keywords: ["疲惫", "累", "好累", "累死", "累麻了", "困", "困死", "睡不醒", "没精神", "没力气", "没电", "电量不足", "被掏空", "熬夜", "通宵", "肝不动", "肝废了", "忙死", "连轴转", "不想动", "只想躺着", "躺平", "摆烂", "牛马", "脆皮大学生", "撑不住", "耗尽"],
    cloth: "疲惫外套",
    emoji: "🧥",
    asset: clothAsset("3、疲惫外套.png"),
    cleanAsset: cleanAsset("疲惫外套.png"),
    detergentName: "休息一下洗衣液",
    softenerName: "充充电柔顺剂",
    bubbles: ["好累", "没力气", "不想动", "没电了", "想躺着"],
    result: "今天可以不追求满格电量。能把自己放回柔软一点的位置，也是一种完成。"
  },
  {
    type: "confusion",
    label: "迷茫 / 无助 / 不知道怎么办",
    keywords: ["迷茫", "无助", "不知道怎么办", "不知道咋办", "不知道怎么选", "不知道怎么做", "不知道", "没有方向", "没方向", "找不到方向", "看不到未来", "不知所措", "没头绪", "毫无头绪", "懵", "懵了", "困惑", "混乱", "卡住了", "卡关", "不会了", "未来", "人生规划", "职业规划", "不知道意义", "不知道自己想要什么", "怎么办", "空"],
    cloth: "迷茫围巾",
    emoji: "👕",
    asset: clothAsset("5、迷茫围巾.png"),
    cleanAsset: cleanAsset("迷茫围巾.png"),
    detergentName: "走一步洗衣液",
    softenerName: "会清楚柔顺剂",
    bubbles: ["不知道", "卡住了", "没方向", "好迷茫", "怎么办"],
    result: "迷茫不是失败，它只是地图还没有刷新。先选一个最小的下一步，不用一次走完。"
  },
  {
    type: "loneliness",
    label: "孤独 / 被忽略 / 没人懂",
    keywords: ["孤独", "孤单", "寂寞", "一个人", "没人懂", "没人理解", "没人陪", "没人理我", "没人理", "没人回我", "没人找我", "被忽略", "被冷落", "被落下", "被抛下", "被丢下", "透明人", "没有存在感", "不被看见", "融不进去", "格格不入", "局外人", "被孤立", "被排挤", "不属于这里", "冷清"],
    cloth: "孤独手套",
    emoji: "🧤",
    asset: clothAsset("6、孤独手套.png"),
    cleanAsset: cleanAsset("孤独手套.png"),
    detergentName: "有人在洗衣液",
    softenerName: "陪陪你柔顺剂",
    bubbles: ["没人懂", "被忘了", "一个人", "没人陪", "好孤单"],
    result: "孤独不代表你不重要。它只是今天的房间安静了一点，你依然值得被回应。"
  },
  {
    type: "rumination",
    label: "内耗 / 纠结 / 自责 / 想太多",
    keywords: ["内耗", "精神内耗", "纠结", "好纠结", "自责", "愧疚", "后悔", "想太多", "反复想", "一直想", "反复复盘", "过度思考", "overthinking", "放不下", "想不开", "绕不出来", "脑子停不下来", "是不是我的错", "我是不是做错了", "我是不是很差", "如果当时", "早知道", "要是我", "左右为难", "拉扯", "拧巴", "怪我", "做不好", "反复"],
    cloth: "叠加线团效果",
    emoji: "🧶",
    asset: clothAsset("8、内耗线团.png"),
    cleanAsset: cleanAsset("内耗毛线团.png"),
    isOverlay: true,
    detergentName: "别拧巴洗衣液",
    softenerName: "放过自己柔顺剂",
    bubbles: ["想太多", "停不下", "又错了", "好纠结", "怪自己"],
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
    "今天先洗一件小事就好。",
    "没做完的，也可以先晾一晾。",
    "未来不用现在一次想清。",
    "慢慢来，时间没有在追你。",
    "你已经在路上，不必立刻到达。"
  ],
  anger: [
    "有些不舒服，值得被听见。",
    "火气可以先散一散，话可以慢慢说。",
    "你的边界，不需要一再让步。",
    "生气不是坏事，它在替你报警。",
    "先把心里的热气放出来一点。"
  ],
  fatigue: [
    "今天的你，已经很用力了。",
    "累了就先靠一会儿。",
    "外套太重，就先挂起来。",
    "不是停下就输了，是该充电了。",
    "今晚先把自己还给自己。"
  ],
  sadness: [
    "没被看见的努力，也算数。",
    "想哭就哭吧，眼泪会带走一点重。",
    "今天不用急着坚强。",
    "有些委屈，可以先放在这里。",
    "你的难过，不需要证明。"
  ],
  confusion: [
    "看不清路时，先走一小步。",
    "答案会慢慢浮上来。",
    "卡住不是失败，只是还在转弯。",
    "风还没停，方向可以再等等。",
    "今天先不用知道全部答案。"
  ],
  loneliness: [
    "没人听见时，也别弄丢自己。",
    "一个人的时候，也有微光。",
    "你不是透明的，只是暂时站在安静处。",
    "有些话，会慢慢遇到愿意听的人。",
    "先陪自己坐一会儿。"
  ],
  breakdown: [
    "绷不住了，就先松开一点。",
    "乱成一团，也可以慢慢洗。",
    "今天不用把自己修好。",
    "先呼吸，先落地，先回来。",
    "你撑到这里，已经很不容易。"
  ],
  rumination: [
    "别把每个结都系在自己身上。",
    "想不明白的，先放进风里。",
    "脑子太吵，就让它静一会儿。",
    "不必反复审判今天的自己。",
    "有些答案，会在你不追问时出现。"
  ],
  default: [
    "今天也辛苦了。",
    "洗一洗，慢慢来。",
    "没关系，先轻一点。",
    "把心事晾一晾。",
    "明天会再清爽一点。"
  ]
};

function getRandomReceiptTexts(emotionKey, count = 2) {
  const texts = receiptLines[emotionKey] || receiptLines.default;
  return [...texts].sort(() => Math.random() - 0.5).slice(0, count);
}

const emotionBubbleTexts = {
  anxiety: ["来不及", "完蛋了", "好慌", "要挂了", "救命"],
  anger: ["凭什么", "忍够了", "气死了", "太离谱", "别惹我"],
  fatigue: ["好累", "没力气", "不想动", "没电了", "想躺着"],
  confusion: ["不知道", "卡住了", "没方向", "好迷茫", "怎么办"],
  sadness: ["好委屈", "没人懂", "没看见", "好难过", "想哭"],
  rumination: ["想太多", "停不下", "又错了", "好纠结", "怪自己"],
  loneliness: ["没人懂", "被忘了", "一个人", "没人陪", "好孤单"],
  breakdown: ["要炸了", "不管了", "绷不住", "裂开了", "受不了"],
  default: ["洗一洗", "没关系", "慢慢来", "会好的", "先呼吸"]
};

function getBubbleTextsByEmotion(emotionKey) {
  return emotionBubbleTexts[emotionKey] || emotionBubbleTexts.default;
}

const microThoughts = {
  anxiety: {
    gentle: [
      "我可以先走好第一步",
      "一点点完成也算前进",
      "我允许自己慢慢呼吸"
    ]
  },
  anger: {
    gentle: [
      "我可以先保护自己的边界",
      "愤怒也可以轻轻落地",
      "我可以晚一点再回应"
    ]
  },
  fatigue: {
    gentle: [
      "我可以先休息一下",
      "低电量也值得被照顾",
      "今天少做一点也可以"
    ]
  },
  confusion: {
    gentle: [
      "我可以先选一个小方向",
      "暂时看不清也没关系",
      "答案会慢慢浮出来"
    ]
  },
  sadness: {
    gentle: [
      "我的努力值得被看见",
      "我可以先站在自己这边",
      "委屈也需要被抱一抱"
    ]
  },
  rumination: {
    gentle: [
      "我可以放过自己一点",
      "想法很多也不等于错误",
      "我不必控制所有细节"
    ]
  },
  loneliness: {
    gentle: [
      "我仍然值得被回应",
      "我可以先陪着自己",
      "安静也可以有温度"
    ]
  },
  breakdown: {
    gentle: [
      "我可以先停在这里",
      "混乱也会一点点散开",
      "现在休息不是失败"
    ]
  },
  default: {
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
  composedSentence: "",
  basketFocusTimer: null
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
  const normalized = text.toLowerCase().replace(/\s/g, "");
  let bestRule = null;
  let bestScore = 0;

  rules.forEach((rule, priority) => {
    const score = rule.keywords.reduce((total, word) => {
      return normalized.includes(word.toLowerCase().replace(/\s/g, "")) ? total + 1 : total;
    }, 0);

    if (score > bestScore || (score === bestScore && score > 0 && bestRule && priority < bestRule.priority)) {
      bestRule = { ...rule, score, priority };
      bestScore = score;
    }
  });

  return bestRule || fallbackRule;
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
  const thoughtSet = microThoughts[rule.type] || microThoughts.default;
  return {
    harsh: getBubbleTextsByEmotion(rule.type),
    gentle: thoughtSet.gentle
  };
}

function getTextLength(text) {
  return Array.from(text || "").length;
}

function getBubbleTypeBySize(size, text) {
  const length = getTextLength(text);
  if (size >= 22 || length >= 4) return "large";
  if (size >= 15 || length >= 3) return "medium";
  return "small";
}

function buildAdaptiveBubbleCards(thoughtSet) {
  const harshTexts = thoughtSet.harsh.length ? thoughtSet.harsh : emotionBubbleTexts.default;
  const sortedByLength = [...harshTexts].sort((a, b) => getTextLength(b) - getTextLength(a));
  const echoTexts = [
    ...sortedByLength,
    ...harshTexts,
    ...sortedByLength.slice(0, 2)
  ];

  return bubbleStageSlots.map((slot, index) => {
    const text = index < harshTexts.length
      ? harshTexts[index]
      : echoTexts[(index - harshTexts.length) % echoTexts.length];
    const length = getTextLength(text);
    const lengthBoost = length >= 4 ? 4 : length >= 3 ? 2 : 0;
    const roleBoost = slot.role === "hero" ? 3 : slot.role === "main" ? 1 : 0;
    const size = Math.min(32, slot.baseSize + lengthBoost + roleBoost);

    return {
      ...slot,
      id: `b${index + 1}`,
      type: getBubbleTypeBySize(size, text),
      size,
      harsh: text,
      gentle: thoughtSet.gentle[index % thoughtSet.gentle.length]
    };
  });
}

function preloadBubbleImages() {
  [
    ...bubblePopFrames,
    ...basketFocusFrames,
    ...Object.values(bubblePresets).flatMap(preset => [preset.idle, preset.pressed])
  ].forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function playBasketFocusAnimation() {
  if (!basketFocusProp) return;
  let frame = 0;
  basketFocusProp.src = basketFocusFrames[frame];
  window.clearInterval(gameState.basketFocusTimer);
  gameState.basketFocusTimer = window.setInterval(() => {
    frame += 1;
    if (frame >= basketFocusFrames.length) {
      window.clearInterval(gameState.basketFocusTimer);
      gameState.basketFocusTimer = null;
      basketFocusProp.src = basketFocusFrames[basketFocusFrames.length - 1];
      return;
    }
    basketFocusProp.src = basketFocusFrames[frame];
  }, 170);
}

function startBackgroundMusic() {
  if (bgMusicStarted) return;
  bgMusic.play()
    .then(() => {
      bgMusicStarted = true;
    })
    .catch(() => {});
}

function bindBackgroundMusicUnlock() {
  ["pointerdown", "touchstart", "click", "keydown"].forEach(eventName => {
    document.addEventListener(eventName, startBackgroundMusic, { passive: true });
  });
}

function playPopSound() {
  if (popSound) {
    const sound = popSound.cloneNode();
    sound.volume = 0.86;
    sound.currentTime = 0;
    sound.play().catch(() => playFallbackPopSound());
    return;
  }
  playFallbackPopSound();
}

function playFallbackPopSound() {
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
  gameState.microCards = buildAdaptiveBubbleCards(thoughtSet);
  roomShell.classList.remove("micro-complete", "show-recompose", "show-clean-result");
  microBubbleField.innerHTML = "";

  gameState.microCards.forEach(card => {
    const preset = bubblePresets[card.type];
    const button = document.createElement("button");
    button.className = "micro-bubble";
    button.type = "button";
    button.dataset.state = "idle";
    button.dataset.id = card.id;
    button.dataset.role = card.role;
    button.dataset.length = String(getTextLength(card.harsh));
    button.style.setProperty("--x", `${card.x}%`);
    button.style.setProperty("--y", `${card.y}%`);
    button.style.setProperty("--size", `${card.size}%`);
    button.style.setProperty("--z", card.z);
    button.setAttribute("aria-label", `戳破泡泡：${card.harsh}`);
    button.innerHTML = `
      <img class="bubble-image" src="${preset.idle}" alt="">
      <span class="micro-card-face harsh">${card.harsh}</span>
    `;
    const image = button.querySelector(".bubble-image");
    button.addEventListener("pointerdown", () => pressMicroBubble(button, image, card));
    button.addEventListener("pointerleave", () => releaseMicroBubble(button, image, card));
    button.addEventListener("pointerup", () => popMicroBubble(button, image, card));
    button.addEventListener("click", event => event.preventDefault());
    microBubbleField.appendChild(button);
  });

  setPanel("microBubble");
}

function pressMicroBubble(button, image, card) {
  if (button.dataset.state !== "idle") return;
  button.classList.add("is-pressed");
  image.src = bubblePresets[card.type].pressed;
}

function releaseMicroBubble(button, image, card) {
  if (button.dataset.state !== "idle") return;
  button.classList.remove("is-pressed");
  image.src = bubblePresets[card.type].idle;
}

function popMicroBubble(button, image, card) {
  if (button.dataset.state !== "idle") return;
  button.dataset.state = "popping";
  button.disabled = true;
  button.classList.remove("is-pressed");
  button.classList.add("is-popping");
  playPopSound();
  npcLine.textContent = `“${card.harsh}”被戳破了。`;

  let frame = 0;
  image.src = bubblePopFrames[frame];

  const timer = window.setInterval(() => {
    frame += 1;
    if (frame >= bubblePopFrames.length) {
      window.clearInterval(timer);
      button.dataset.state = "gone";
      button.classList.remove("is-popping");
      button.classList.add("is-gone");
      gameState.poppedBubbles += 1;
      if (gameState.poppedBubbles >= gameState.microCards.length) {
        setTimeout(completeMicroBubbles, 520);
      }
      return;
    }
    image.src = bubblePopFrames[frame];
  }, 58);
}


function completeMicroBubbles() {
  roomShell.classList.add("micro-complete");
  microFlash.classList.add("flash");
  npcLine.textContent = "泡泡洗掉了，正在打印今天的小票。";
  setTimeout(() => {
    microFlash.classList.remove("flash");
    finishReceipt();
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
  const healingCards = gameState.microCards.slice(0, 3);
  gameState.sentenceCards = shuffleCards([
    { id: "base-me", text: "我" },
    { id: "base-feel", text: "但是我觉得" },
    ...healingCards.map(card => ({ id: card.id, text: card.gentle }))
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
  const composedLine = gameState.composedSentence || gameState.buildCards.map(card => card.text).join("");
  const receiptTextLines = getRandomReceiptTexts(rule.type, 2);
  const mainLine = composedLine || receiptTextLines.join("\n");
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
  let currentY = y;
  String(text).split("\n").forEach(paragraph => {
    const chars = Array.from(paragraph);
    let line = "";
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
    if (line) {
      ctx.fillText(line, x, currentY);
      currentY += lineHeight;
    }
  });
  return currentY;
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

preloadBubbleImages();
bindBackgroundMusicUnlock();

document.getElementById("startBtn").addEventListener("click", () => {
  startBackgroundMusic();
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
    playBasketFocusAnimation();
    setTimeout(() => emotionInput.focus(), 1220);
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
  if (gameState.roomStep === "microBubble") npcLine.textContent = "先把这些泡泡戳开，洗衣机会继续处理。";
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
