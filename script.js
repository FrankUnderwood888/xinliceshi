const startButton = document.querySelector(".start-button");
const homePage = document.querySelector("#homePage");
const quizPage = document.querySelector("#quizPage");
const completePage = document.querySelector("#completePage");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const progressBar = document.querySelector(".progress-bar");
const questionTitle = document.querySelector("#questionTitle");
const optionButtons = document.querySelectorAll(".option-button");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const reviewButton = document.querySelector("#reviewButton");
const restartButton = document.querySelector("#restartButton");
const overallTitle = document.querySelector("#overallTitle");
const overallDescription = document.querySelector("#overallDescription");
const healthyPercent = document.querySelector("#healthyPercent");
const healthyBar = document.querySelector("#healthyBar");
const healthyDescription = document.querySelector("#healthyDescription");
const controlPercent = document.querySelector("#controlPercent");
const controlBar = document.querySelector("#controlBar");
const manipulationPercent = document.querySelector("#manipulationPercent");
const manipulationBar = document.querySelector("#manipulationBar");
const avoidancePercent = document.querySelector("#avoidancePercent");
const avoidanceBar = document.querySelector("#avoidanceBar");
const primaryRiskTitle = document.querySelector("#primaryRiskTitle");
const primaryRiskMeta = document.querySelector("#primaryRiskMeta");
const primaryRiskDescription = document.querySelector("#primaryRiskDescription");
const secondaryRiskTitle = document.querySelector("#secondaryRiskTitle");
const secondaryRiskMeta = document.querySelector("#secondaryRiskMeta");
const secondaryRiskDescription = document.querySelector("#secondaryRiskDescription");
const resultVisual = document.querySelector("#resultVisual");
const copySummaryButton = document.querySelector("#copySummaryButton");
const copyStatus = document.querySelector("#copyStatus");

function createOption(text, healthy, control, manipulation, avoidance) {
  return {
    text: text,
    scores: {
      healthy: healthy,
      control: control,
      manipulation: manipulation,
      avoidance: avoidance
    }
  };
}

function createQuestion(question, originalOptions, order) {
  return {
    question: question,
    options: order.map(function (originalIndex) {
      return originalOptions[originalIndex];
    })
  };
}

// 题目数据：每个选项都有显示文字和四个维度的内部评分。
// order使用旧选项索引重排，确保选项文字和scores作为同一个对象一起移动。
const questions = [
  createQuestion("当你没有及时回复消息时，对方通常会怎样反应？", [
    createOption("正常等待，之后自然交流", 2, 0, 0, 0),
    createOption("连续追问，并要求你说明原因", 0, 2, 1, 0),
    createOption("突然变得冷淡，让你猜测他的情绪", 0, 0, 1, 2),
    createOption("表面上说没关系，但之后会反复提起", 0, 0, 2, 1)
  ], [1, 0, 3, 2]),
  createQuestion("当你尝试和对方讨论关系中的问题时，对方更常出现哪种反应？", [
    createOption("愿意听取你的感受，并一起讨论解决方法", 2, 0, 0, 0),
    createOption("认为你想得太多，要求你停止讨论", 0, 1, 1, 1),
    createOption("把问题转移到你的错误上，让你开始自我怀疑", 0, 1, 2, 0),
    createOption("暂时答应改变，但之后继续重复原来的行为", 0, 0, 1, 2)
  ], [2, 1, 3, 0]),
  createQuestion("当你和朋友或异性正常来往时，对方通常会怎样表现？", [
    createOption("尊重你的正常社交，并愿意讨论彼此的边界", 2, 0, 0, 0),
    createOption("要求你减少联系，甚至删除或屏蔽对方", 0, 2, 0, 0),
    createOption("暗示你的行为证明你不够爱他，让你产生内疚", 0, 1, 2, 0),
    createOption("当时不表达意见，之后却突然冷淡或疏远", 0, 0, 1, 2)
  ], [0, 3, 1, 2]),
  createQuestion("当两个人发生争执时，对方更常使用哪种方式？", [
    createOption("围绕具体问题讨论，并愿意听取不同意见", 2, 0, 0, 0),
    createOption("强调你必须服从他的决定，否则就是不尊重他", 0, 2, 1, 0),
    createOption("改变事情的说法，让最后的责任几乎全部落到你身上", 0, 0, 2, 0),
    createOption("拒绝沟通、失联或长时间冷处理", 0, 0, 0, 2)
  ], [1, 2, 0, 3]),
  createQuestion("对待手机、密码和个人隐私时，对方更接近哪种状态？", [
    createOption("尊重彼此隐私，有疑问时会直接沟通", 2, 0, 0, 0),
    createOption("经常要求查看你的手机、密码或聊天记录", 0, 2, 0, 0),
    createOption("通过怀疑和指责，让你主动证明自己的清白", 0, 1, 2, 0),
    createOption("对自己的信息十分保密，却回避解释这种差异", 0, 0, 1, 2)
  ], [3, 0, 2, 1]),
  createQuestion("当对方承诺改变某个问题时，接下来通常会发生什么？", [
    createOption("会提出具体办法，并通过行动逐渐兑现承诺", 2, 0, 0, 0),
    createOption("要求你先按照他的规则改变，但很少约束自己", 0, 2, 1, 0),
    createOption("冲突后会作出强烈承诺，但不久又重复原来的行为", 0, 0, 2, 1),
    createOption("使用模糊说法拖延，很少给出明确回应", 0, 0, 0, 2)
  ], [1, 3, 2, 0]),
  createQuestion("当你投入时间发展自己的工作、兴趣或朋友关系时，对方通常会怎样反应？", [
    createOption("支持你拥有独立生活，也愿意分享彼此的成长", 2, 0, 0, 0),
    createOption("认为这些事情影响了关系，希望你把大部分时间留给他", 0, 2, 0, 0),
    createOption("通过比较、讽刺或贬低，让你怀疑自己的能力和选择", 0, 0, 2, 0),
    createOption("当你关注他时很热情，当你忙自己的事情时就变得疏远", 0, 0, 1, 2)
  ], [0, 2, 3, 1]),
  createQuestion("当关系涉及金钱、礼物或共同支出时，对方更常出现哪种表现？", [
    createOption("愿意清楚讨论责任、能力和彼此能够接受的范围", 2, 0, 0, 0),
    createOption("希望掌握主要决定权，并严格限制你的使用方式", 0, 2, 0, 0),
    createOption("经常用过去的付出、礼物或花费要求你作出回报", 0, 1, 2, 0),
    createOption("需要承担责任时回避，但需要帮助时又会主动靠近", 0, 0, 1, 2)
  ], [3, 1, 0, 2]),
  createQuestion("当你明确拒绝某件让自己不舒服的事情时，对方通常会怎样反应？", [
    createOption("即使失望，也会尊重你的决定和边界", 2, 0, 0, 0),
    createOption("不断施压或追问，直到你改变决定", 0, 2, 1, 0),
    createOption("表现得非常委屈，并暗示你的拒绝伤害了他", 0, 0, 2, 0),
    createOption("立即变得冷淡，减少交流或暂时消失", 0, 0, 1, 2)
  ], [2, 0, 3, 1]),
  createQuestion("当你们谈到关系的未来时，对方更接近哪种表现？", [
    createOption("愿意根据现实情况共同讨论，并逐步落实计划", 2, 0, 0, 0),
    createOption("单方面决定未来安排，希望你按照他的计划行动", 0, 2, 0, 0),
    createOption("经常描述美好的未来来留住你，但实际行动很少", 0, 0, 2, 1),
    createOption("回避明确承诺，却又不愿意让你真正离开关系", 0, 0, 0, 2)
  ], [1, 2, 3, 0])
];

const totalQuestions = questions.length;
const dimensionKeys = ["healthy", "control", "manipulation", "avoidance"];
const optionLabels = ["A", "B", "C", "D"];
const maxDimensionScore = 20;

const riskMeta = {
  control: {
    name: "控制与占有倾向",
    shortName: "控制与占有",
    description: "当前答案中，限制社交、检查隐私、要求服从或掌握决定权等表现相对更加突出。需要观察对方是否尊重你的拒绝、隐私和独立选择。"
  },
  manipulation: {
    name: "情绪操纵与自我怀疑倾向",
    shortName: "情绪操纵",
    description: "当前答案中，内疚施压、责任转移、否定感受或让你反复证明自己的表现相对更加突出。需要区分具体事实与因为对方反应而产生的自我怀疑。"
  },
  avoidance: {
    name: "回避、冷处理与情绪拉扯倾向",
    shortName: "回避与拉扯",
    description: "当前答案中，突然冷淡、拒绝沟通、模糊承诺、失联或时近时远的表现相对更加突出。需要观察对方是否能够保持稳定、明确和持续的沟通。"
  }
};

// 当前题目编号：0 表示第一题，9 表示第十题。
let currentQuestionIndex = 0;

// 用户答案数组：保存每道题最新选择的选项编号，null表示尚未回答。
const answers = Array(totalQuestions).fill(null);

let autoAdvanceTimer = null;
let latestScores = null;
let latestPercentages = null;
let latestOverallStatus = null;
let latestRiskMessages = null;
let resultAnimationFrame = null;
let copyResetTimer = null;

function clearSelectedOptions() {
  optionButtons.forEach(function (button) {
    button.classList.remove("selected");
  });
}

// 自动跳转计时器：切题前先清除旧计时器，避免重复跳转。
function clearAutoAdvanceTimer() {
  if (autoAdvanceTimer !== null) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

// 更新按钮状态：根据题号和是否已有答案决定能否点击。
function updateNavigationButtons() {
  const hasAnswer = answers[currentQuestionIndex] !== null;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  prevButton.disabled = currentQuestionIndex === 0;
  nextButton.disabled = !hasAnswer;
  nextButton.textContent = isLastQuestion ? "完成测试" : "下一题";
}

// 题目渲染：更新题号、进度条、问题、选项和旧答案高亮。
function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const progressPercent = questionNumber * 10;
  const savedAnswer = answers[currentQuestionIndex];

  progressText.textContent = "第 " + questionNumber + " 题 / 共 " + totalQuestions + " 题";
  progressFill.style.width = progressPercent + "%";
  progressBar.setAttribute("aria-label", "当前进度 " + progressPercent + "%");
  questionTitle.textContent = currentQuestion.question;

  optionButtons.forEach(function (button, index) {
    button.textContent = optionLabels[index] + ". " + currentQuestion.options[index].text;
  });

  clearSelectedOptions();

  // 恢复之前选择的答案：返回已回答题目时继续高亮。
  if (savedAnswer !== null) {
    optionButtons[savedAnswer].classList.add("selected");
  }

  updateNavigationButtons();
}

function showQuestion(index) {
  clearAutoAdvanceTimer();
  currentQuestionIndex = index;
  homePage.classList.add("is-hidden");
  completePage.classList.add("is-hidden");
  quizPage.classList.remove("is-hidden");
  renderQuestion();
}

// 根据最新answers数组，从每个已选选项的scores对象重新计算四个维度原始分。
function calculateDimensionScores() {
  const scores = {
    healthy: 0,
    control: 0,
    manipulation: 0,
    avoidance: 0
  };

  answers.forEach(function (answerIndex, questionIndex) {
    if (answerIndex === null) {
      return;
    }

    const optionScores = questions[questionIndex].options[answerIndex].scores;

    dimensionKeys.forEach(function (key) {
      scores[key] += optionScores[key];
    });
  });

  return scores;
}

function clampPercentage(value) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

// 将原始分换算为百分比：百分比是内部观察分数，不代表现实概率。
function calculatePercentages(scores) {
  return {
    healthy: clampPercentage(scores.healthy / maxDimensionScore * 100),
    control: clampPercentage(scores.control / maxDimensionScore * 100),
    manipulation: clampPercentage(scores.manipulation / maxDimensionScore * 100),
    avoidance: clampPercentage(scores.avoidance / maxDimensionScore * 100)
  };
}

// 综合状态：按固定优先级判断，避免多个条件同时成立时结果随机。
function determineOverallStatus(percentages) {
  const highestRisk = Math.max(percentages.control, percentages.manipulation, percentages.avoidance);

  if (highestRisk >= 60) {
    return {
      key: "highRisk",
      title: "风险互动较集中",
      description: "当前答案中，某一种或多种风险互动出现得较为集中。建议重点关注这些行为是否持续、反复，并对你的判断、情绪、社交或生活产生明显影响。"
    };
  }

  if (percentages.healthy >= 70 && highestRisk < 30) {
    return {
      key: "protected",
      title: "保护因素较明显",
      description: "当前答案中，尊重、沟通与边界意识所占比例较高，关系中存在较明显的保护因素。但仍建议结合具体事件和长期行为持续观察。"
    };
  }

  if (percentages.healthy >= 50 && highestRisk < 50) {
    return {
      key: "foundation",
      title: "存在一定关系基础",
      description: "当前答案显示，这段关系中存在一定的沟通或边界基础，同时也出现了一些值得关注的风险信号。结果不能简单理解为完全健康或完全不健康。"
    };
  }

  if ((percentages.healthy >= 30 && percentages.healthy <= 49) || (highestRisk >= 40 && highestRisk <= 59)) {
    return {
      key: "mixed",
      title: "保护与风险模式交织",
      description: "当前答案中，保护因素与风险互动同时出现。某些情境可能能够正常沟通，而另一些情境则可能出现控制、情绪施压或回避。"
    };
  }

  return {
    key: "lowProtection",
    title: "保护因素相对较弱",
    description: "当前答案中，能够体现稳定沟通、边界和相互尊重的选项相对较少。关系中可能存在多种分散的风险信号，需要结合实际事件进一步观察。"
  };
}

function getHealthyDescription(percentage) {
  if (percentage >= 70) {
    return "关系中体现尊重、沟通和边界意识的回答较多。";
  }

  if (percentage >= 50) {
    return "关系中存在一定保护基础，但仍然需要结合风险维度判断。";
  }

  if (percentage >= 30) {
    return "保护因素与风险互动同时存在，表现可能不够稳定。";
  }

  return "当前答案中体现稳定沟通和边界尊重的选项相对较少。";
}

function getSecondaryLevel(percentage) {
  if (percentage >= 60) {
    return "多种风险互动都较为集中";
  }

  if (percentage >= 40) {
    return "次要风险也值得持续关注";
  }

  if (percentage >= 20) {
    return "存在轻度的次要风险信号";
  }

  return "次要风险信号目前较少";
}

// 主要提醒和次要提醒：处理风险维度最高值、并列和第二高风险。
function determineRiskMessages(percentages) {
  const riskKeys = ["control", "manipulation", "avoidance"];
  const riskItems = riskKeys.map(function (key) {
    return {
      key: key,
      percentage: percentages[key],
      name: riskMeta[key].name,
      shortName: riskMeta[key].shortName,
      description: riskMeta[key].description
    };
  });
  const highestRisk = Math.max(percentages.control, percentages.manipulation, percentages.avoidance);
  const highestItems = riskItems.filter(function (item) {
    return item.percentage === highestRisk;
  });
  let primary;
  let primaryKeys = [];

  if (highestRisk < 20) {
    primary = {
      type: "none",
      keys: [],
      title: "目前未出现特别集中的单一风险模式",
      meta: highestRisk + "%",
      description: "当前答案没有让某一种风险维度特别突出，但仍然需要结合具体事件和长期互动判断。"
    };
  } else if (highestItems.length === 3) {
    primaryKeys = highestItems.map(function (item) {
      return item.key;
    });
    primary = {
      type: "mixed",
      keys: primaryKeys,
      title: "控制、情绪操纵与回避模式交织",
      meta: highestItems.map(function (item) {
        return item.shortName;
      }).join(" + ") + "：" + highestRisk + "%",
      description: "当前答案中，三种风险维度同时处在最高位置，可能在不同情境中交替出现控制、情绪施压和回避拉扯。"
    };
  } else if (highestItems.length === 2) {
    primaryKeys = highestItems.map(function (item) {
      return item.key;
    });
    primary = {
      type: "mixed",
      keys: primaryKeys,
      title: "多种风险模式交织",
      meta: highestItems.map(function (item) {
        return item.shortName;
      }).join(" + ") + "：" + highestRisk + "%",
      description: "当前答案中，" + highestItems.map(function (item) {
        return item.shortName;
      }).join("和") + "两个风险维度并列突出，需要一起观察，而不是只看其中一种表现。"
    };
  } else {
    primaryKeys = [highestItems[0].key];
    primary = {
      type: highestItems[0].key,
      keys: primaryKeys,
      title: highestItems[0].name,
      meta: highestItems[0].percentage + "%",
      description: highestItems[0].description
    };
  }

  const secondaryCandidates = riskItems
    .filter(function (item) {
      return !primaryKeys.includes(item.key);
    })
    .sort(function (first, second) {
      return second.percentage - first.percentage;
    });
  const secondaryItem = secondaryCandidates[0];
  let secondary;

  if (!secondaryItem) {
    secondary = {
      title: "次要风险信号目前较少",
      meta: "无额外次要风险",
      description: "主要提醒已经覆盖当前并列的风险维度，暂时没有额外的次要风险需要单独列出。"
    };
  } else {
    secondary = {
      title: getSecondaryLevel(secondaryItem.percentage),
      meta: secondaryItem.shortName + "：" + secondaryItem.percentage + "%",
      description: secondaryItem.percentage < 20
        ? "当前次要风险分数较低，但仍可结合具体事件继续观察。"
        : secondaryItem.description
    };
  }

  return {
    primary: primary,
    secondary: secondary
  };
}

function prefersReducedMotion() {
  return typeof window !== "undefined"
    && typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// 取消旧的百分比动画，避免返回修改后多组动画同时运行。
function cancelResultAnimation() {
  if (resultAnimationFrame !== null && typeof cancelAnimationFrame === "function") {
    cancelAnimationFrame(resultAnimationFrame);
  }

  resultAnimationFrame = null;
}

function updateDimension(percentElement, barElement, displayedPercentage, finalPercentage) {
  const displayed = clampPercentage(displayedPercentage);
  const finalValue = clampPercentage(finalPercentage ?? displayedPercentage);
  const progressbar = barElement.parentElement;

  percentElement.textContent = displayed + "%";
  barElement.style.width = displayed + "%";

  if (progressbar) {
    progressbar.setAttribute("aria-valuenow", String(finalValue));
  }
}

// 更新四条进度条的最终ARIA数值。
function updateResultBars(percentages) {
  updateDimension(healthyPercent, healthyBar, 0, percentages.healthy);
  updateDimension(controlPercent, controlBar, 0, percentages.control);
  updateDimension(manipulationPercent, manipulationBar, 0, percentages.manipulation);
  updateDimension(avoidancePercent, avoidanceBar, 0, percentages.avoidance);
}

// 结果页数字和进度条从0增长到最终百分比。
function animateResultPercentages(percentages) {
  cancelResultAnimation();
  updateResultBars(percentages);

  if (prefersReducedMotion() || typeof requestAnimationFrame !== "function") {
    updateDimension(healthyPercent, healthyBar, percentages.healthy, percentages.healthy);
    updateDimension(controlPercent, controlBar, percentages.control, percentages.control);
    updateDimension(manipulationPercent, manipulationBar, percentages.manipulation, percentages.manipulation);
    updateDimension(avoidancePercent, avoidanceBar, percentages.avoidance, percentages.avoidance);
    return;
  }

  const duration = 900;
  let startTime = null;

  function step(timestamp) {
    if (startTime === null) {
      startTime = timestamp;
    }

    const progress = Math.min(1, (timestamp - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);

    updateDimension(healthyPercent, healthyBar, percentages.healthy * eased, percentages.healthy);
    updateDimension(controlPercent, controlBar, percentages.control * eased, percentages.control);
    updateDimension(manipulationPercent, manipulationBar, percentages.manipulation * eased, percentages.manipulation);
    updateDimension(avoidancePercent, avoidanceBar, percentages.avoidance * eased, percentages.avoidance);

    if (progress < 1) {
      resultAnimationFrame = requestAnimationFrame(step);
      return;
    }

    updateDimension(healthyPercent, healthyBar, percentages.healthy, percentages.healthy);
    updateDimension(controlPercent, controlBar, percentages.control, percentages.control);
    updateDimension(manipulationPercent, manipulationBar, percentages.manipulation, percentages.manipulation);
    updateDimension(avoidancePercent, avoidanceBar, percentages.avoidance, percentages.avoidance);
    resultAnimationFrame = null;
  }

  resultAnimationFrame = requestAnimationFrame(step);
}

// 根据综合状态和主要风险，切换结果页抽象视觉。
function updateResultVisual(overallStatus, riskResult) {
  const visualClasses = [
    "visual-protected",
    "visual-foundation",
    "visual-mixed",
    "visual-control",
    "visual-manipulation",
    "visual-avoidance",
    "visual-low-protection"
  ];

  resultVisual.classList.remove(...visualClasses);

  if (overallStatus.key === "protected") {
    resultVisual.classList.add("visual-protected");
    return;
  }

  if (overallStatus.key === "foundation") {
    resultVisual.classList.add("visual-foundation");
    return;
  }

  if (overallStatus.key === "mixed") {
    resultVisual.classList.add("visual-mixed");
    return;
  }

  if (overallStatus.key === "lowProtection") {
    resultVisual.classList.add("visual-low-protection");
    return;
  }

  if (riskResult.primary.type === "control") {
    resultVisual.classList.add("visual-control");
  } else if (riskResult.primary.type === "manipulation") {
    resultVisual.classList.add("visual-manipulation");
  } else if (riskResult.primary.type === "avoidance") {
    resultVisual.classList.add("visual-avoidance");
  } else {
    resultVisual.classList.add("visual-mixed");
  }
}

// 根据当前最新结果生成可复制的纯文本摘要。
function buildResultSummary() {
  return [
    "关系中的黑暗模式测试",
    "",
    "综合状态：" + latestOverallStatus.title,
    "",
    "保护因素：",
    "健康沟通与边界：" + latestPercentages.healthy + "%",
    "",
    "风险维度：",
    "控制与占有：" + latestPercentages.control + "%",
    "情绪操纵与自我怀疑：" + latestPercentages.manipulation + "%",
    "回避、冷处理与情绪拉扯：" + latestPercentages.avoidance + "%",
    "",
    "主要提醒：" + latestRiskMessages.primary.title,
    "次要提醒：" + latestRiskMessages.secondary.title,
    "",
    "说明：",
    "本测试仅用于关系互动模式的自我观察，不构成心理诊断、法律意见或专业结论。请结合具体事件、行为频率和长期影响进行判断。"
  ].join("\n");
}

function resetCopyButtonState() {
  if (copyResetTimer !== null) {
    clearTimeout(copyResetTimer);
    copyResetTimer = null;
  }

  copySummaryButton.textContent = "复制结果摘要";
  copyStatus.textContent = "";
}

function copyTextWithFallback(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    return navigator.clipboard.writeText(text);
  }

  return new Promise(function (resolve, reject) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (copied) {
        resolve();
      } else {
        reject(new Error("copy command failed"));
      }
    } catch (error) {
      document.body.removeChild(textarea);
      reject(error);
    }
  });
}

// 复制结果摘要：优先使用剪贴板API，不支持时退回textarea方案。
async function copyResultSummary() {
  if (!latestPercentages || !latestOverallStatus || !latestRiskMessages) {
    copyStatus.textContent = "暂无可复制的结果。";
    return;
  }

  resetCopyButtonState();

  try {
    await copyTextWithFallback(buildResultSummary());
    copySummaryButton.textContent = "已复制";
    copyStatus.textContent = "结果摘要已复制";
  } catch (error) {
    copyStatus.textContent = "复制失败，请手动复制结果内容。";
  }

  copyResetTimer = setTimeout(function () {
    resetCopyButtonState();
  }, 2000);
}

// 渲染结果页：显示综合状态、四个维度、主要提醒和次要提醒。
function renderResult() {
  cancelResultAnimation();
  resetCopyButtonState();
  latestScores = calculateDimensionScores();
  latestPercentages = calculatePercentages(latestScores);
  latestOverallStatus = determineOverallStatus(latestPercentages);
  latestRiskMessages = determineRiskMessages(latestPercentages);

  overallTitle.textContent = latestOverallStatus.title;
  overallDescription.textContent = latestOverallStatus.description;
  healthyDescription.textContent = getHealthyDescription(latestPercentages.healthy);
  primaryRiskTitle.textContent = latestRiskMessages.primary.title;
  primaryRiskMeta.textContent = latestRiskMessages.primary.meta;
  primaryRiskDescription.textContent = latestRiskMessages.primary.description;
  secondaryRiskTitle.textContent = latestRiskMessages.secondary.title;
  secondaryRiskMeta.textContent = latestRiskMessages.secondary.meta;
  secondaryRiskDescription.textContent = latestRiskMessages.secondary.description;
  updateResultVisual(latestOverallStatus, latestRiskMessages);
  animateResultPercentages(latestPercentages);
}

function clearResult() {
  cancelResultAnimation();
  latestScores = null;
  latestPercentages = null;
  latestOverallStatus = null;
  latestRiskMessages = null;
  resetCopyButtonState();
  overallTitle.textContent = "综合状态";
  overallDescription.textContent = "你的结果将由四个维度共同生成。";
  updateDimension(healthyPercent, healthyBar, 0, 0);
  updateDimension(controlPercent, controlBar, 0, 0);
  updateDimension(manipulationPercent, manipulationBar, 0, 0);
  updateDimension(avoidancePercent, avoidanceBar, 0, 0);
  healthyDescription.textContent = "等待计算。";
  primaryRiskTitle.textContent = "等待计算";
  primaryRiskMeta.textContent = "0%";
  primaryRiskDescription.textContent = "完成测试后显示主要提醒。";
  secondaryRiskTitle.textContent = "等待计算";
  secondaryRiskMeta.textContent = "0%";
  secondaryRiskDescription.textContent = "完成测试后显示次要提醒。";
  resultVisual.className = "result-visual";
}

// 进入结果页面：只在第10题回答后点击“完成测试”时调用。
function showCompletePage() {
  clearAutoAdvanceTimer();
  renderResult();
  quizPage.classList.add("is-hidden");
  homePage.classList.add("is-hidden");
  completePage.classList.remove("is-hidden");
}

// 自动跳到下一题：第1题到第9题选择后执行，第10题不自动跳。
function scheduleAutoAdvance(questionIndex) {
  clearAutoAdvanceTimer();

  if (questionIndex >= totalQuestions - 1) {
    return;
  }

  autoAdvanceTimer = setTimeout(function () {
    autoAdvanceTimer = null;

    if (currentQuestionIndex === questionIndex) {
      showQuestion(questionIndex + 1);
    }
  }, 400);
}

// 点击“开始测试”后，隐藏首页并显示第一道题。
startButton.addEventListener("click", function () {
  showQuestion(0);
});

// 保存和修改答案：新答案覆盖旧答案，分数等到完成测试时重新计算。
optionButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const optionIndex = Number(button.dataset.optionIndex);

    clearSelectedOptions();
    button.classList.add("selected");
    answers[currentQuestionIndex] = optionIndex;
    updateNavigationButtons();
    scheduleAutoAdvance(currentQuestionIndex);
  });
});

// 返回上一题。
prevButton.addEventListener("click", function () {
  if (prevButton.disabled) {
    return;
  }

  showQuestion(currentQuestionIndex - 1);
});

// 手动进入下一题；第10题时进入结果页。
nextButton.addEventListener("click", function () {
  if (nextButton.disabled) {
    return;
  }

  clearAutoAdvanceTimer();

  if (currentQuestionIndex === totalQuestions - 1) {
    showCompletePage();
    return;
  }

  showQuestion(currentQuestionIndex + 1);
});

// 返回检查答案：回到第10题，并恢复之前选择的答案。
reviewButton.addEventListener("click", function () {
  showQuestion(totalQuestions - 1);
});

copySummaryButton.addEventListener("click", function () {
  copyResultSummary();
});

restartButton.addEventListener("click", function () {
  resetTest();
});

// 重新测试：清空答案、分数、百分比、提醒和计时器，再回到首页。
function resetTest() {
  clearAutoAdvanceTimer();
  answers.fill(null);
  currentQuestionIndex = 0;
  clearSelectedOptions();
  clearResult();
  quizPage.classList.add("is-hidden");
  completePage.classList.add("is-hidden");
  homePage.classList.remove("is-hidden");
}
