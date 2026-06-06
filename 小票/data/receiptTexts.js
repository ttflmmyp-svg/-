// ===== RECEIPT MODULE START: emotion-based healing copy =====
(function setupReceiptTexts(global) {
  const receiptTexts = {
    anxiety: {
      label: "焦虑",
      cloth: "焦虑衣服",
      texts: [
        "今天先洗一件小事就好。",
        "没做完的，也可以先晾一晾。",
        "未来不用现在一次想清。",
        "慢慢来，时间没有在追你。",
        "你已经在路上，不必立刻到达。"
      ]
    },
    anger: {
      label: "愤怒",
      cloth: "愤怒袜子",
      texts: [
        "有些不舒服，值得被听见。",
        "火气可以先散一散，话可以慢慢说。",
        "你的边界，不需要一再让步。",
        "生气不是坏事，它在替你报警。",
        "先把心里的热气放出来一点。"
      ]
    },
    fatigue: {
      label: "疲惫",
      cloth: "疲惫外套",
      texts: [
        "今天的你，已经很用力了。",
        "累了就先靠一会儿。",
        "外套太重，就先挂起来。",
        "不是停下就输了，是该充电了。",
        "今晚先把自己还给自己。"
      ]
    },
    sadness: {
      label: "委屈 / 难过 / 想哭",
      cloth: "委屈毛衣",
      texts: [
        "没被看见的努力，也算数。",
        "想哭就哭吧，眼泪会带走一点重。",
        "今天不用急着坚强。",
        "有些委屈，可以先放在这里。",
        "你的难过，不需要证明。"
      ]
    },
    confusion: {
      label: "迷茫 / 无助 / 不知道怎么办",
      cloth: "迷茫围巾",
      texts: [
        "看不清路时，先走一小步。",
        "答案会慢慢浮上来。",
        "卡住不是失败，只是还在转弯。",
        "风还没停，方向可以再等等。",
        "今天先不用知道全部答案。"
      ]
    },
    loneliness: {
      label: "孤独 / 被忽略 / 没人懂",
      cloth: "孤独手套",
      texts: [
        "没人听见时，也别弄丢自己。",
        "一个人的时候，也有微光。",
        "你不是透明的，只是暂时站在安静处。",
        "有些话，会慢慢遇到愿意听的人。",
        "先陪自己坐一会儿。"
      ]
    },
    breakdown: {
      label: "崩溃 / 发疯 / 破防",
      cloth: "崩溃睡衣",
      texts: [
        "绷不住了，就先松开一点。",
        "乱成一团，也可以慢慢洗。",
        "今天不用把自己修好。",
        "先呼吸，先落地，先回来。",
        "你撑到这里，已经很不容易。"
      ]
    },
    rumination: {
      label: "内耗 / 纠结 / 自责 / 想太多",
      cloth: "叠加线团效果",
      texts: [
        "别把每个结都系在自己身上。",
        "想不明白的，先放进风里。",
        "脑子太吵，就让它静一会儿。",
        "不必反复审判今天的自己。",
        "有些答案，会在你不追问时出现。"
      ]
    }
  };

  const defaultReceiptTexts = [
    "今天也辛苦了。",
    "洗一洗，慢慢来。",
    "没关系，先轻一点。",
    "把心事晾一晾。",
    "明天会再清爽一点。"
  ];

  function getReceiptContent(emotionKey, count = 2) {
    const entry = receiptTexts[emotionKey];
    const texts = entry ? entry.texts : defaultReceiptTexts;
    const shuffled = [...texts].sort(() => Math.random() - 0.5);

    return {
      label: entry?.label || "普通心事",
      cloth: entry?.cloth || "普通心事 T 恤",
      lines: shuffled.slice(0, count)
    };
  }

  global.ReceiptTextModule = {
    getReceiptContent
  };
})(window);
// ===== RECEIPT MODULE END =====
