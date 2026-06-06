const scenes = document.querySelectorAll(".scene");
const panels = document.querySelectorAll("[data-panel]");
const dots = document.querySelectorAll("[data-dot]");

const emotionInput = document.getElementById("emotionInput");
const inputCount = document.getElementById("inputCount");
const inputError = document.getElementById("inputError");
const apiLoading = document.getElementById("apiLoading");
const submitEmotionBtn = document.getElementById("submitEmotion");
const miniCloth = document.getElementById("miniCloth");
const washerInsideScene = document.getElementById("washerInsideScene");
const washerDrumScene = document.getElementById("washerDrumScene");
const npcLine = document.getElementById("npcLine");
const roomShell = document.querySelector(".room-shell");
const basketHotspot = document.getElementById("basketHotspot");
const basketFocusProp = document.getElementById("basketFocusProp");
const basketFocusCue = document.getElementById("basketFocusCue");
const washerHotspot = document.getElementById("washerHotspot");
const sinkHotspot = document.getElementById("sinkHotspot");
const lineHotspot = document.getElementById("lineHotspot");
const detergentBottle = document.getElementById("detergentBottle");
const detergentImage = document.getElementById("detergentImage");
const detergentLabel = document.getElementById("detergentLabel");
const detergentPourFrame = document.getElementById("detergentPourFrameTop") || document.getElementById("detergentPourFrame");
const detergentTargetGlow = document.getElementById("detergentTargetGlow");
const detergentGoldGlow = document.getElementById("detergentGoldGlow");
const washerClothReact = document.getElementById("washerClothReact");
const microBubbleField = document.getElementById("microBubbleField");
const microFlash = document.getElementById("microFlash");
const cleanClothImage = document.getElementById("cleanClothImage");
const sentenceBuild = document.getElementById("sentenceBuild");
const cardTray = document.getElementById("cardTray");
const packReceiptBtn = document.getElementById("packReceiptBtn");
const dryingScene = document.getElementById("dryingScene");
const dryingEnterBtn = document.getElementById("dryingEnterBtn");
const dryingRackArea = document.getElementById("dryingRackArea");
const dryingTarget = document.getElementById("dryingTarget");
const dryingHungLayer = document.getElementById("dryingHungLayer");
const dryingCloth = document.getElementById("dryingCloth");
const dryingSparkles = document.getElementById("dryingSparkles");
const roomStage = document.querySelector(".room-stage");
const CLOTH_ASSET_VERSION = "202606061932";
const CLEAN_ASSET_VERSION = "202606061949";
const BUBBLE_ASSET_PATH = "assets/bubbles/";
const POP_SOUND_SRC = "../image/泡泡裂开声音.m4a";
const BG_MUSIC_SRC = "../Tidy_Little_Victories.mp3";
const clothAsset = fileName => `../素材照片文件夹/${fileName}?v=${CLOTH_ASSET_VERSION}`;
const cleanAsset = fileName => `../新照片素材/${fileName}?v=${CLEAN_ASSET_VERSION}`;
const washerInsideAsset = fileName => `../衣服进洗衣机/${fileName}?v=2026060706`;
const WASHER_DRUM_ASSET_VERSION = "2026060708";
const washerDrumFrames = Array.from(
  { length: 10 },
  (_, index) => `./assets/washer-drum/frame_${String(index + 1).padStart(2, "0")}.png?v=${WASHER_DRUM_ASSET_VERSION}`
);
const DETERGENT_ASSET_VERSION = "2026060707";
const detergentFrameAsset = (key, index) =>
  `./assets/detergent/frames/${key}/frame_${String(index).padStart(2, "0")}.png?v=${DETERGENT_ASSET_VERSION}`;
const detergentPourFrameAsset = (key, index) =>
  `./assets/detergent/padded-frames/${key}/frame_${String(index).padStart(2, "0")}.png?v=2026060709`;
const DRYING_ASSET_VERSION = "2026060710";
const dryingCutoutAsset = fileName => `./assets/drying/cutout/${fileName}?v=${DRYING_ASSET_VERSION}`;
const dryingClipSrc = dryingCutoutAsset("微信图片_20260607034739_39593_572.png");
const dryingFallbackClothes = [
  "微信图片_20260606191048_3162_1219.png",
  "微信图片_20260606191057_3163_1219.png",
  "微信图片_20260606191105_3164_1219.png",
  "微信图片_20260606191111_3165_1219.png",
  "微信图片_20260606191119_3166_1219.png",
  "微信图片_20260606191126_3167_1219.png",
  "微信图片_20260606191134_3168_1219.png",
  "微信图片_20260606191143_3169_1219.png"
].map(dryingCutoutAsset);
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
const bubblePopFrameImages = [];
const basketFocusFrames = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png"
].map(fileName => `../木桶/${fileName}?v=2026060705`);

const detergentSetKeys = {
  breakdown: "0201dce8a4caa55e5671463c05475283",
  anger: "945434c52dfade93fc3829afdafcbd9e",
  sadness: "87aa475ae35708bb46fbfdafa8724e88",
  anxiety: "9418d7519b6c19f679208bad90ca0c21",
  fatigue: "84175d094b93353950b314cba996e242",
  confusion: "3c0bd9533f3b06478cfd8ff4678e5bca",
  loneliness: "9c21a52f239282a13d126c4b96b431ab",
  rumination: "e0308a70edb29fff7732fc21a1c522c6"
};

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
  { x: 49, y: 31, baseSize: 28, role: "hero", z: 8 },
  { x: 31, y: 48, baseSize: 22, role: "main", z: 7 },
  { x: 68, y: 47, baseSize: 22, role: "main", z: 7 },
  { x: 51, y: 65, baseSize: 20, role: "main", z: 7 }
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
    washerInsideAsset: washerInsideAsset("微信图片_20260607034230_231_1677.png"),
    detergentKey: detergentSetKeys.breakdown,
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
    washerInsideAsset: washerInsideAsset("微信图片_20260607034231_232_1677.png"),
    detergentKey: detergentSetKeys.anger,
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
    washerInsideAsset: washerInsideAsset("微信图片_20260607034224_227_1677.png"),
    detergentKey: detergentSetKeys.sadness,
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
    washerInsideAsset: washerInsideAsset("微信图片_20260607034221_225_1677.png"),
    detergentKey: detergentSetKeys.anxiety,
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
    washerInsideAsset: washerInsideAsset("微信图片_20260607034223_226_1677.png"),
    detergentKey: detergentSetKeys.fatigue,
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
    washerInsideAsset: washerInsideAsset("微信图片_20260607034228_230_1677.png"),
    detergentKey: detergentSetKeys.confusion,
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
    washerInsideAsset: washerInsideAsset("微信图片_20260607034226_228_1677.png"),
    detergentKey: detergentSetKeys.loneliness,
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
    washerInsideAsset: washerInsideAsset("微信图片_20260607034227_229_1677.png"),
    detergentKey: detergentSetKeys.rumination,
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
  washerInsideAsset: washerInsideAsset("微信图片_20260607034221_225_1677.png"),
  detergentKey: detergentSetKeys.anxiety,
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
  basketFocusTimer: null,
  apiStatus: "idle",
  apiResult: null,
  drumReady: false
};

let washerDrumFrameIndex = 0;
let coachTimer = null;
let stageMeter = null;
let stageMeterFill = null;
let stageMeterLabel = null;
let stageMotionButton = null;
let washerPointerActive = false;
let washerMotionActive = false;
let lastWasherMotion = null;
let lastWasherOrientation = null;

function haptic(pattern = 18) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

function showCoach(message, duration = 1700) {
  let coach = document.querySelector(".coach-toast");
  if (!coach) {
    coach = document.createElement("div");
    coach.className = "coach-toast";
    coach.setAttribute("role", "status");
    roomStage.appendChild(coach);
  }
  coach.textContent = message;
  coach.classList.add("show");
  window.clearTimeout(coachTimer);
  coachTimer = window.setTimeout(() => coach.classList.remove("show"), duration);
}

function ensureStageMeter() {
  if (stageMeter) return;
  stageMeter = document.createElement("div");
  stageMeter.className = "stage-meter";
  stageMeter.innerHTML = `
    <div class="stage-meter-copy">
      <b>滚筒蓄力</b>
      <span>点按或滑动滚筒</span>
    </div>
    <div class="stage-meter-track"><span></span></div>
    <button class="stage-motion-button" type="button">摇一摇</button>
  `;
  stageMeterFill = stageMeter.querySelector(".stage-meter-track span");
  stageMeterLabel = stageMeter.querySelector(".stage-meter-copy span");
  stageMotionButton = stageMeter.querySelector(".stage-motion-button");
  stageMotionButton.addEventListener("click", startWasherMotionMode);
  roomStage.appendChild(stageMeter);
}

function updateStageMeter(value = gameState.drum, label = "点按或滑动滚筒") {
  ensureStageMeter();
  stageMeter.style.setProperty("--meter", `${Math.max(0, Math.min(100, value))}%`);
  if (stageMeterFill) stageMeterFill.style.width = `${Math.max(0, Math.min(100, value))}%`;
  if (stageMeterLabel) stageMeterLabel.textContent = label;
}

function setStageMeterVisible(visible) {
  ensureStageMeter();
  stageMeter.classList.toggle("show", visible);
}

function stopWasherMotionMode() {
  if (!washerMotionActive) return;
  washerMotionActive = false;
  lastWasherMotion = null;
  lastWasherOrientation = null;
  window.removeEventListener("devicemotion", handleWasherMotion);
  window.removeEventListener("deviceorientation", handleWasherOrientation);
  if (stageMotionButton) {
    stageMotionButton.classList.remove("active");
    stageMotionButton.textContent = "摇一摇";
  }
}

async function startWasherMotionMode() {
  if (gameState.roomStep !== "washer" || gameState.drumReady) return;

  try {
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission !== "granted") {
        showCoach("没有获得动作传感器权限，先用点按/滑动也可以");
        return;
      }
    }

    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      await DeviceOrientationEvent.requestPermission().catch(() => "denied");
    }

    washerMotionActive = true;
    lastWasherMotion = null;
    lastWasherOrientation = null;
    window.addEventListener("devicemotion", handleWasherMotion, { passive: true });
    window.addEventListener("deviceorientation", handleWasherOrientation, { passive: true });
    if (stageMotionButton) {
      stageMotionButton.classList.add("active");
      stageMotionButton.textContent = "摇动中";
    }
    showCoach("摇动手机，滚筒会跟着加速");
  } catch (error) {
    showCoach("当前浏览器不支持陀螺仪，先用点按/滑动");
  }
}

function handleWasherMotion(event) {
  if (!washerMotionActive || gameState.roomStep !== "washer" || gameState.drumReady) return;
  const source = event.accelerationIncludingGravity || event.acceleration;
  if (!source) return;

  const current = {
    x: source.x || 0,
    y: source.y || 0,
    z: source.z || 0
  };

  if (!lastWasherMotion) {
    lastWasherMotion = current;
    return;
  }

  const delta =
    Math.abs(current.x - lastWasherMotion.x) +
    Math.abs(current.y - lastWasherMotion.y) +
    Math.abs(current.z - lastWasherMotion.z);

  lastWasherMotion = current;

  if (delta > 4.8) {
    addWasherDrumProgress(Math.min(7.5, (delta - 4.2) * 0.42));
  }
}

function handleWasherOrientation(event) {
  if (!washerMotionActive || gameState.roomStep !== "washer" || gameState.drumReady) return;
  const current = {
    alpha: event.alpha || 0,
    beta: event.beta || 0,
    gamma: event.gamma || 0
  };

  if (!lastWasherOrientation) {
    lastWasherOrientation = current;
    return;
  }

  const delta =
    Math.abs(current.alpha - lastWasherOrientation.alpha) * 0.12 +
    Math.abs(current.beta - lastWasherOrientation.beta) +
    Math.abs(current.gamma - lastWasherOrientation.gamma);

  lastWasherOrientation = current;

  if (delta > 9) {
    addWasherDrumProgress(Math.min(5.5, (delta - 8) * 0.22));
  }
}

function preloadWasherDrumFrames() {
  washerDrumFrames.forEach(src => {
    const image = new Image();
    image.src = src;
  });
}

function isWasherDrumActive() {
  return ["washer", "detergent", "microBubble"].includes(gameState.roomStep)
    || roomShell.classList.contains("pouring-detergent")
    || roomShell.classList.contains("detergent-poured");
}

function tickWasherDrum() {
  if (!washerDrumScene) return;
  if (!isWasherDrumActive()) {
    washerDrumScene.src = washerDrumFrames[0];
    return;
  }
  const step = gameState.roomStep === "washer"
    ? Math.max(1, Math.floor(1 + gameState.drum / 30))
    : 1;
  washerDrumFrameIndex = (washerDrumFrameIndex + step) % washerDrumFrames.length;
  washerDrumScene.src = washerDrumFrames[washerDrumFrameIndex];
}

preloadWasherDrumFrames();
window.setInterval(tickWasherDrum, 130);

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
    if (name === "detergent") resetDetergentBottlePosition();
    setStageMeterVisible(false);
    dots.forEach(dot => dot.classList.toggle("active", dot.dataset.dot === "wash"));
  }
}

function setRoomStep(step) {
  gameState.roomStep = step;
  roomShell.dataset.roomStep = step;
  roomShell.classList.remove("is-washing");

  if (step === "wide") {
    roomShell.classList.remove("basket-focus-dismissed", "basket-input-ready");
    npcLine.textContent = "点点脏衣篓，把今天放进去。";
  }
  if (step === "basket") {
    npcLine.textContent = "不用整理得很漂亮，乱糟糟也可以放进来。";
  }
  if (step === "cloth") {
    npcLine.textContent = "这件衣服准备好了，送去洗衣机吧。";
  }
  if (step === "washer") {
    npcLine.textContent = "点按或滑动滚筒，让这件心事先转起来。";
    updateStageMeter(gameState.drum, "点按或滑动滚筒");
    setStageMeterVisible(true);
    showCoach("先让滚筒转满，再倒洗涤剂");
  } else {
    setStageMeterVisible(false);
    stopWasherMotionMode();
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
  if (step === "drying") {
    npcLine.textContent = "点一下晾衣架，再把衣服拖过去晾好。";
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
  gameState.apiStatus = "idle";
  gameState.apiResult = null;
  gameState.drumReady = false;
  stopWasherMotionMode();
  roomShell.classList.remove("show-clean-result", "show-recompose", "show-drying", "micro-complete", "cloth-inside-ready", "pouring-detergent", "detergent-target-hot", "detergent-poured");
  const soapMeter = document.getElementById("soapMeter");
  const spinMeter = document.getElementById("spinMeter");
  if (soapMeter) soapMeter.style.width = "0%";
  if (spinMeter) spinMeter.style.width = "0%";
  document.querySelectorAll(".stain").forEach(stain => stain.style.opacity = "1");
  miniCloth.classList.remove("visible");
  if (microBubbleField) microBubbleField.innerHTML = "";
  if (sentenceBuild) sentenceBuild.innerHTML = "";
  if (cardTray) cardTray.innerHTML = "";
  updateStageMeter(0, "点按或滑动滚筒");
  setStageMeterVisible(false);
}

function prepareThrow() {
  const rule = gameState.analysis;
  const clothImage = document.getElementById("clothImage");
  const miniClothImage = document.getElementById("miniClothImage");
  if (washerInsideScene) {
    washerInsideScene.src = rule.washerInsideAsset;
    washerInsideScene.alt = `${rule.cloth}进入洗衣机后的状态`;
  }
  if (detergentImage) {
    detergentImage.src = detergentFrameAsset(rule.detergentKey, 1);
    detergentImage.alt = rule.detergentName;
  }
  if (detergentPourFrame) {
    detergentPourFrame.src = detergentPourFrameAsset(rule.detergentKey, 1);
  }
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
  // API 成功时优先使用 DeepSeek 返回的个性化文案
  if (gameState.apiStatus === "success" && gameState.apiResult) {
    const api = gameState.apiResult;
    if (api.bubbleTexts && api.bubbleTexts.length && api.gentleReframes && api.gentleReframes.length) {
      return {
        harsh: api.bubbleTexts,
        gentle: api.gentleReframes
      };
    }
  }

  // fallback 到本地关键词匹配的固定文案
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
    if (bubblePopFrames.includes(src)) {
      bubblePopFrameImages[bubblePopFrames.indexOf(src)] = img;
    }
    if (img.decode) img.decode().catch(() => {});
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

function openBasketInputCard() {
  if (gameState.roomStep !== "basket") return;
  roomShell.classList.add("basket-focus-dismissed");
  window.setTimeout(() => {
    roomShell.classList.add("basket-input-ready");
    emotionInput.focus();
  }, 340);
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

  playBubblePopFrames(image, () => {
    button.dataset.state = "gone";
    button.classList.remove("is-popping");
    button.classList.add("is-gone");
    gameState.poppedBubbles += 1;
    if (gameState.poppedBubbles >= gameState.microCards.length) {
      setTimeout(completeMicroBubbles, 520);
    }
  });
}

function playBubblePopFrames(image, onComplete) {
  const frameDuration = 88;
  let frame = 0;
  let lastFrameTime = 0;

  const setFrame = index => {
    const cached = bubblePopFrameImages[index];
    image.src = cached ? cached.src : bubblePopFrames[index];
  };

  setFrame(frame);

  const tick = timestamp => {
    if (!lastFrameTime) lastFrameTime = timestamp;
    if (timestamp - lastFrameTime < frameDuration) {
      requestAnimationFrame(tick);
      return;
    }

    lastFrameTime = timestamp;
    frame += 1;
    if (frame >= bubblePopFrames.length) {
      onComplete();
      return;
    }

    setFrame(frame);
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}


function completeMicroBubbles() {
  roomShell.classList.add("micro-complete");
  microFlash.classList.add("flash");
  npcLine.textContent = "泡泡洗掉了，正在打印今天的小票。";
  setTimeout(() => {
    microFlash.classList.remove("flash");
    beginDryingBeforeReceipt();
  }, 920);
}

let dryingDrag = null;
let dryingEntered = false;
let dryingFinished = false;
let dryingSelectedCloth = null;

function getDryingSelectedCloth() {
  const input = window.dryingInput;
  const direct = input?.cloth || input?.selectedCloth;
  if (direct?.src) return { id: direct.id || "recognized_1", src: direct.src };

  if (Array.isArray(input?.clothes) && input.clothes.length) {
    const candidates = input.clothes.filter(item => item?.src);
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    if (picked) return { id: picked.id || "recognized_1", src: picked.src };
  }

  const rule = gameState.analysis || fallbackRule;
  const cleanSrc = rule.cleanAsset || cleanClothImage?.src;
  if (cleanSrc) return { id: rule.type || "clean_cloth", src: cleanSrc };

  const fallback = dryingFallbackClothes[Math.floor(Math.random() * dryingFallbackClothes.length)];
  return { id: "fallback_random", src: fallback };
}

function resetDryingScene() {
  dryingDrag = null;
  dryingEntered = false;
  dryingFinished = false;
  dryingSelectedCloth = getDryingSelectedCloth();
  dryingScene.classList.remove("entered");
  dryingTarget.classList.remove("hot");
  dryingSparkles.classList.remove("show");
  dryingHungLayer.innerHTML = "";
  dryingCloth.classList.remove("dragging", "done");
  dryingCloth.style.left = "";
  dryingCloth.style.top = "";
  dryingCloth.src = dryingSelectedCloth.src;
  dryingCloth.dataset.id = dryingSelectedCloth.id;
}

function beginDryingBeforeReceipt() {
  if (!dryingScene) {
    finishReceipt();
    return;
  }

  resetDryingScene();
  roomShell.classList.add("show-drying");
  setRoomStep("drying");
  npcLine.textContent = "把洗好的衣服晾起来，小票就会出来。";
}

function enterDryingScene() {
  if (dryingEntered || !dryingScene) return;
  dryingEntered = true;
  dryingScene.classList.add("entered");
}

function startDryingDrag(event) {
  if (!dryingEntered || dryingFinished || (event.button !== undefined && event.button !== 0)) return;
  dryingDrag = { item: event.currentTarget };
  dryingDrag.item.setPointerCapture(event.pointerId);
  dryingDrag.item.classList.add("dragging");
  moveDryingDrag(event);
  window.addEventListener("pointermove", moveDryingDrag);
  window.addEventListener("pointerup", endDryingDrag, { once: true });
}

function moveDryingDrag(event) {
  if (!dryingDrag) return;
  dryingDrag.item.style.left = `${event.clientX}px`;
  dryingDrag.item.style.top = `${event.clientY}px`;
  dryingTarget.classList.toggle("hot", isInsideDryingTarget(event.clientX, event.clientY));
}

function endDryingDrag(event) {
  if (!dryingDrag) return;
  window.removeEventListener("pointermove", moveDryingDrag);
  dryingTarget.classList.remove("hot");

  if (isInsideDryingTarget(event.clientX, event.clientY)) {
    hangDryingCloth();
  } else {
    resetDryingClothPosition();
  }
  dryingDrag = null;
}

function isInsideDryingTarget(clientX, clientY) {
  const rect = dryingRackArea.getBoundingClientRect();
  return clientX >= rect.left + rect.width * .02 &&
    clientX <= rect.left + rect.width * .96 &&
    clientY >= rect.top + rect.height * .22 &&
    clientY <= rect.bottom + rect.height * .28;
}

function resetDryingClothPosition() {
  dryingCloth.classList.remove("dragging");
  dryingCloth.style.left = "";
  dryingCloth.style.top = "";
}

function hangDryingCloth() {
  dryingFinished = true;
  dryingCloth.classList.remove("dragging");
  dryingCloth.classList.add("done");

  const slot = document.createElement("div");
  slot.className = "drying-hung-slot";

  const leftClip = document.createElement("img");
  leftClip.className = "drying-clip left";
  leftClip.src = dryingClipSrc;
  leftClip.alt = "";

  const rightClip = document.createElement("img");
  rightClip.className = "drying-clip right";
  rightClip.src = dryingClipSrc;
  rightClip.alt = "";

  const hung = document.createElement("img");
  hung.className = "drying-hung-cloth";
  hung.src = dryingSelectedCloth.src;
  hung.alt = "";

  slot.append(leftClip, rightClip, hung);
  dryingHungLayer.appendChild(slot);
  dryingSparkles.classList.add("show");

  setTimeout(finishDrying, 650);
}

function finishDrying() {
  const detail = {
    state: "receipt",
    completed: 1,
    total: 1,
    cloth: dryingSelectedCloth
  };
  window.dispatchEvent(new CustomEvent("receipt", { detail }));
  window.onDryingComplete?.(detail);
  roomShell.classList.remove("show-drying");
  finishReceipt();
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

  // API 成功时优先使用 DeepSeek 返回的个性化小票内容
  const apiSuccess = gameState.apiStatus === "success" && gameState.apiResult;
  const mainLine = composedLine
    || (apiSuccess && gameState.apiResult.receiptResult)
    || getRandomReceiptTexts(rule.type, 2).join("\n");

  gameState.cleanIndex = (apiSuccess && gameState.apiResult.cleanIndex)
    || Math.floor(48 + Math.random() * 38);

  gameState.receipt = {
    title: (apiSuccess && gameState.apiResult.receiptTitle) || `${rule.label}已洗护完成`,
    result: mainLine,
    emotion: rule.label,
    cloth: rule.cloth,
    cleanIndex: `${gameState.cleanIndex}%`,
    source: source ? `已收好：${source}` : "已收好：一件没有写明来源的心事",
    suggestion: (apiSuccess && gameState.apiResult.suggestion) || "",
    cards: gameState.microCards.map(card => card.gentle),
    composedSentence: composedLine,
    createdAt: new Date().toISOString()
  };

  document.getElementById("receiptTitle").textContent = gameState.receipt.title;
  document.getElementById("receiptCloth").textContent = gameState.receipt.cloth;
  document.getElementById("receiptEmotion").textContent = gameState.receipt.emotion;
  document.getElementById("receiptSource").textContent = gameState.receipt.source;
  document.getElementById("receiptResult").textContent = gameState.receipt.result
    + (gameState.receipt.suggestion ? `\n\n💡 ${gameState.receipt.suggestion}` : "");
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
  roomShell.classList.remove("show-recompose", "show-drying", "micro-complete", "pouring-detergent", "basket-focus-dismissed", "basket-input-ready");
  setScene("home");
  setRoomStep("wide");
});

basketHotspot.addEventListener("click", () => {
  if (gameState.roomStep === "wide") {
    roomShell.classList.remove("basket-focus-dismissed", "basket-input-ready");
    setRoomStep("basket");
    playBasketFocusAnimation();
  }
});

if (basketFocusProp) {
  basketFocusProp.addEventListener("click", openBasketInputCard);
}

if (basketFocusCue) {
  basketFocusCue.addEventListener("click", openBasketInputCard);
}

emotionInput.addEventListener("input", () => {
  inputCount.textContent = `${emotionInput.value.length} / 120`;
  inputError.textContent = "";
});

function findRuleByType(emotionType) {
  return rules.find(r => r.type === emotionType) || fallbackRule;
}

async function handleEmotionSubmit() {
  const text = emotionInput.value.trim();
  if (!text) {
    inputError.textContent = "先写一句今天想洗掉的东西。";
    emotionInput.focus();
    return;
  }

  gameState.userText = text;

  // 显示 loading 状态
  gameState.apiStatus = "loading";
  submitEmotionBtn.disabled = true;
  apiLoading.classList.add("show");
  inputError.textContent = "";

  try {
    // 尝试调用 DeepSeek API
    const apiResult = await analyzeEmotion(text);
    gameState.apiStatus = "success";
    gameState.apiResult = apiResult;

    // 用 API 返回的 emotionType 找到匹配的视觉资产规则
    const matchedRule = findRuleByType(apiResult.emotionType);
    gameState.analysis = {
      ...matchedRule,
      label: apiResult.emotionLabel || matchedRule.label
    };
    gameState.cloth = matchedRule.cloth;
    gameState.emoji = matchedRule.emoji;

    console.log("✅ DeepSeek API 分析成功:", apiResult.emotionType, apiResult.emotionLabel);
  } catch (err) {
    // API 失败 → fallback 到本地关键词匹配
    console.warn("⚠️ DeepSeek API 失败，使用本地关键词匹配:", err.message);
    gameState.apiStatus = "fallback";
    gameState.apiResult = null;
    gameState.analysis = detectEmotion(text);
    gameState.cloth = gameState.analysis.cloth;
    gameState.emoji = gameState.analysis.emoji;
  }

  // 隐藏 loading，继续流程
  gameState.apiStatus = gameState.apiStatus === "loading" ? "fallback" : gameState.apiStatus;
  apiLoading.classList.remove("show");
  submitEmotionBtn.disabled = false;
  resetWashProgress();
  roomShell.classList.remove("basket-input-ready");
  prepareThrow();
  setRoomStep("cloth");
}

submitEmotionBtn.addEventListener("click", handleEmotionSubmit);

function sendClothToWasher() {
  if (gameState.roomStep !== "cloth") {
    if (gameState.roomStep === "wide") npcLine.textContent = "先点脏衣篓，把今天放进去。";
    return;
  }
  roomShell.classList.remove("cloth-inside-ready");
  setRoomStep("washer");
  miniCloth.classList.add("visible");
  setTimeout(() => {
    roomShell.classList.add("cloth-inside-ready");
    miniCloth.classList.remove("visible");
    showCoach("点按滚筒，或者在滚筒上来回滑动");
  }, 680);
  updateStageMeter(0, "点按或滑动滚筒");
}

document.getElementById("clothCard").addEventListener("click", sendClothToWasher);
washerHotspot.addEventListener("click", sendClothToWasher);

function addWasherDrumProgress(amount) {
  if (gameState.roomStep !== "washer" || gameState.drumReady) return;
  gameState.drum = Math.min(100, gameState.drum + amount);
  updateStageMeter(gameState.drum, gameState.drum >= 100 ? "可以倒洗涤剂了" : "继续，让它转起来");
  haptic(8);
  if (gameState.drum >= 100) {
    gameState.drumReady = true;
    stopWasherMotionMode();
    npcLine.textContent = "滚筒热起来了，现在把洗涤剂倒进去。";
    showCoach("滚筒准备好了，去拖动洗涤剂瓶");
    setTimeout(() => setPanel("detergent"), 420);
  }
}

washerHotspot.addEventListener("pointerdown", event => {
  if (gameState.roomStep !== "washer") return;
  washerPointerActive = true;
  washerHotspot.setPointerCapture(event.pointerId);
  addWasherDrumProgress(16);
  event.preventDefault();
});

washerHotspot.addEventListener("pointermove", () => {
  if (washerPointerActive) addWasherDrumProgress(3.2);
});

["pointerup", "pointercancel", "pointerleave"].forEach(eventName => {
  washerHotspot.addEventListener(eventName, () => {
    washerPointerActive = false;
  });
});

let detergentDragging = false;
let detergentMoved = false;
let detergentPointerStart = { x: 0, y: 0 };
let detergentDragOffset = { x: 0, y: 0 };
let detergentPoint = { x: 68, y: 49 };
let detergentPourTimer = null;

function screenPointInRoom(event) {
  const rect = roomShell.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  };
}

function placeDetergentBottle(point) {
  detergentPoint = {
    x: Math.max(10, Math.min(90, point.x)),
    y: Math.max(12, Math.min(86, point.y))
  };
  detergentBottle.style.left = `${detergentPoint.x}%`;
  detergentBottle.style.top = `${detergentPoint.y}%`;
}

function resetDetergentBottlePosition() {
  detergentPoint = { x: 68, y: 49 };
  detergentBottle.style.left = "";
  detergentBottle.style.top = "";
  detergentBottle.classList.remove("is-dragging", "is-hot");
  roomShell.classList.remove("detergent-target-hot", "detergent-poured");
}

function isDetergentOverWasher(point) {
  return point.x > 36 && point.x < 65 && point.y > 40 && point.y < 66;
}

function playDetergentFrames(rule) {
  if (!detergentPourFrame) return;
  let frameIndex = 1;
  detergentPourFrame.src = detergentPourFrameAsset(rule.detergentKey, frameIndex);
  detergentPourTimer = window.setInterval(() => {
    frameIndex += 1;
    if (frameIndex > 6) {
      window.clearInterval(detergentPourTimer);
      detergentPourTimer = null;
      return;
    }
    detergentPourFrame.src = detergentPourFrameAsset(rule.detergentKey, frameIndex);
  }, 260);
}

function pourDetergent(event) {
  if (event) event.preventDefault();
  if (gameState.roomStep !== "detergent") return;
  if (roomShell.classList.contains("pouring-detergent")) return;
  const rule = gameState.analysis || fallbackRule;
  window.clearInterval(detergentPourTimer);
  resetDetergentBottlePosition();
  roomShell.classList.add("pouring-detergent");
  npcLine.textContent = `${rule.detergentName}倒入中，泡泡马上就来。`;
  playDetergentFrames(rule);
  setTimeout(() => {
    roomShell.classList.remove("pouring-detergent");
    roomShell.classList.add("detergent-poured");
  }, 1650);
  setTimeout(() => {
    roomShell.classList.remove("detergent-poured");
    startMicroBubbles();
  }, 2100);
}

function startDetergentDrag(event) {
  if (gameState.roomStep !== "detergent") return;
  if (roomShell.classList.contains("pouring-detergent")) return;
  detergentDragging = true;
  detergentMoved = false;
  detergentPointerStart = { x: event.clientX, y: event.clientY };
  const point = screenPointInRoom(event);
  detergentDragOffset = {
    x: detergentPoint.x - point.x,
    y: detergentPoint.y - point.y
  };
  detergentBottle.setPointerCapture(event.pointerId);
  detergentBottle.classList.add("is-dragging");
  event.preventDefault();
}

function moveDetergentDrag(event) {
  if (!detergentDragging) return;
  const distance = Math.hypot(event.clientX - detergentPointerStart.x, event.clientY - detergentPointerStart.y);
  if (distance > 5) detergentMoved = true;
  const point = screenPointInRoom(event);
  placeDetergentBottle({
    x: point.x + detergentDragOffset.x,
    y: point.y + detergentDragOffset.y
  });
  const isHot = isDetergentOverWasher(detergentPoint);
  detergentBottle.classList.toggle("is-hot", isHot);
  roomShell.classList.toggle("detergent-target-hot", isHot);
}

function endDetergentDrag(event) {
  if (!detergentDragging) return;
  detergentDragging = false;
  detergentBottle.releasePointerCapture(event.pointerId);
  detergentBottle.classList.remove("is-dragging");
  roomShell.classList.remove("detergent-target-hot");

  if (isDetergentOverWasher(detergentPoint) || !detergentMoved) {
    pourDetergent(event);
    return;
  }

  resetDetergentBottlePosition();
}

detergentBottle.addEventListener("pointerdown", startDetergentDrag);
detergentBottle.addEventListener("pointermove", moveDetergentDrag);
detergentBottle.addEventListener("pointerup", endDetergentDrag);
detergentBottle.addEventListener("pointercancel", endDetergentDrag);

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

if (dryingEnterBtn) {
  dryingEnterBtn.addEventListener("click", enterDryingScene);
}

if (dryingCloth) {
  dryingCloth.addEventListener("pointerdown", startDryingDrag);
}

packReceiptBtn.addEventListener("click", beginDryingBeforeReceipt);
document.getElementById("saveReceiptBtn").addEventListener("click", saveReceiptImage);

document.getElementById("restartBtn").addEventListener("click", () => {
  emotionInput.value = "";
  inputCount.textContent = "0 / 120";
  inputError.textContent = "";
  gameState.userText = "";
  gameState.analysis = null;
  gameState.receipt = null;
  resetWashProgress();
  roomShell.classList.remove("show-clean-result", "show-recompose", "show-drying", "micro-complete", "pouring-detergent", "basket-focus-dismissed", "basket-input-ready");
  if (cleanCloth) cleanCloth.classList.remove("hung");
  if (packReceiptBtn) packReceiptBtn.disabled = true;
  setScene("room");
  setRoomStep("wide");
});
