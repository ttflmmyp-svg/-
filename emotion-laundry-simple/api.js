/**
 * DeepSeek API 模块 — 情绪分析
 * 把用户输入的情绪文本发给 DeepSeek，返回结构化的分析结果。
 * API 失败时抛出异常，由 script.js 降级到本地关键词匹配。
 */

// ============================================================
// 开发者在这里填你的 DeepSeek API Key（一次配好，所有人共用）
// ============================================================
const DEEPSEEK_API_KEY = "sk-797028fbbb4f406689e974dcba91dda4";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const API_TIMEOUT_MS = 10000;

const SYSTEM_PROMPT = `你是一个温柔、有同理心的情绪分析助手，你工作在一间名叫"把今天洗一下"的情绪洗衣房里。

用户会输入一段他们今天感受到的负面情绪文本。请你分析这段文本，并返回一个 JSON 对象。

## 情绪类型（emotionType）必须是以下之一：
- anxiety（焦虑/担忧/紧张/心慌/压力大）
- anger（愤怒/生气/不爽/被冒犯/烦躁）
- fatigue（疲惫/累/没力气/困/被掏空/不想动）
- confusion（迷茫/困惑/不知道怎么办/没有方向/卡住了）
- sadness（委屈/难过/想哭/伤心/失落/被误解）
- rumination（内耗/纠结/自责/想太多/反复复盘/后悔）
- loneliness（孤独/孤单/被忽略/没人理解/格格不入）
- breakdown（崩溃/破防/受不了了/要炸了/撑不住了）
- default（普通心事 / 以上类型都不明显匹配时使用）

## emotionLabel
情绪类型对应的中文标签，如"焦虑"、"愤怒"、"疲惫"、"迷茫"、"委屈"、"内耗"、"孤独"、"崩溃"、"普通心事"。

## intensity
1-100 的整数，表示情绪强烈程度。1=轻轻的不舒服，100=极度强烈。

## bubbleTexts
一个字符串数组，包含 5 句话，代表用户内心可能正在出现的负面自我对话或攻击性表达。这些话应该是：
- 口语化的、像一个人在脑子里对自己说的话
- 稍微夸张一点（因为这是"脏衣服"里的情绪噪音）
- 每句 2-8 个字左右
- 要贴合用户输入的具体内容，而不是泛泛的模板

## gentleReframes
一个字符串数组，包含 3 句温柔改写。把 bubbleTexts 里的攻击性/灾难化表达，改写成更温和、更准确、更有力量感的表达。每句 6-18 个字。

## receiptTitle
小票标题，格式如"今日焦虑洗涤单"、"今日疲惫洗涤单"。

## receiptResult
小票正文，2-4 句话，温柔、有共情、有力量。替换模板化的文案，让用户感到这些话是专门说给他们听的。可以引用用户输入中的具体细节。

## suggestion
今日护理建议，1-2 句话，一个具体的小行动建议。

## cleanIndex
55-95 之间的整数，代表"洗净指数"。根据情绪的复杂程度和输入详细程度浮动。

请只返回 JSON，不要有任何其他文字。`;

/**
 * 调用 DeepSeek API 分析用户情绪文本
 * @param {string} text - 用户输入的情绪文本
 * @returns {Promise<Object>} 结构化分析结果
 */
async function analyzeEmotion(text) {
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === "sk-xxxxxxxx") {
    throw new Error("API Key 未配置，请在 api.js 中填写 DEEPSEEK_API_KEY");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        response_format: { type: "json_object" }
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`API 返回错误 ${response.status}: ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("API 返回内容为空");
    }

    // 尝试解析 JSON
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      // 如果 JSON 解析失败，尝试用正则提取 JSON 块
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("无法解析 API 返回的 JSON");
      }
    }

    // 校验必填字段并补默认值
    const validTypes = ["anxiety", "anger", "fatigue", "confusion", "sadness", "rumination", "loneliness", "breakdown", "default"];
    if (!validTypes.includes(result.emotionType)) {
      result.emotionType = "default";
    }

    return {
      emotionType: result.emotionType || "default",
      emotionLabel: result.emotionLabel || "普通心事",
      intensity: Math.min(100, Math.max(1, Number(result.intensity) || 50)),
      bubbleTexts: Array.isArray(result.bubbleTexts) ? result.bubbleTexts.slice(0, 5) : [],
      gentleReframes: Array.isArray(result.gentleReframes) ? result.gentleReframes.slice(0, 3) : [],
      receiptTitle: result.receiptTitle || "今日洗护完成",
      receiptResult: result.receiptResult || "",
      suggestion: result.suggestion || "",
      cleanIndex: Math.min(95, Math.max(55, Number(result.cleanIndex) || 67))
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
