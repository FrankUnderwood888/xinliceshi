const startButton = document.querySelector(".start-button");
const homePage = document.querySelector("#homePage");
const quizPage = document.querySelector("#quizPage");
const completePage = document.querySelector("#completePage");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const progressBar = document.querySelector(".progress-bar");
const questionTitle = document.querySelector("#questionTitle");
const optionButtons = document.querySelectorAll(".option-button");
const analysisStatus = document.querySelector("#analysisStatus");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const reviewButton = document.querySelector("#reviewButton");
const restartButton = document.querySelector("#restartButton");
const resultLoader = document.querySelector("#resultLoader");
const resultContent = document.querySelector("#resultContent");
const shadowLevel = document.querySelector("#shadowLevel");
const shadowProfileName = document.querySelector("#shadowProfileName");
const profileStrengthDescription = document.querySelector("#profileStrengthDescription");
const shadowDimensions = document.querySelector("#shadowDimensions");
const profileStrengthText = document.querySelector("#profileStrengthText");
const profileRiskText = document.querySelector("#profileRiskText");
const profileAdviceText = document.querySelector("#profileAdviceText");
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

function createOption(text, control, concealment, strategy, conflict, attachmentPattern) {
  return {
    text: text,
    scores: {
      control: control,
      concealment: concealment,
      strategy: strategy,
      conflict: conflict,
      attachmentPattern: attachmentPattern
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

// 题目数据：每个选项都有显示文字和五个维度的内部评分。
// order使用旧选项索引重排，确保选项文字和scores作为同一个对象一起移动。
const questions = [
  createQuestion("如果有人一直没有回复你的消息，你的第一反应更接近哪一种？", [
    createOption("我会继续发消息，想尽快确认到底怎么回事。", 3, 0, 1, 2, 2),
    createOption("我会先相信只是忙，继续做自己的事。", 0, 0, 0, 0, 0),
    createOption("我会先冷下来，之后减少主动联系。", 1, 2, 2, 1, 3),
    createOption("我会开始反复琢磨这件事，心里越来越不安。", 0, 3, 1, 2, 3)
  ], [1, 0, 3, 2]),
  createQuestion("如果你想认真谈一件让你介意的事，你更可能会怎么开口？", [
    createOption("我会先把自己的感受说清楚，再看这次沟通怎么继续。", 0, 0, 0, 0, 0),
    createOption("我会直接把话题抛出去，看看回应会不会跟上。", 2, 1, 1, 2, 2),
    createOption("我会先答应不再提，但心里还是会一直记着。", 1, 2, 2, 1, 3),
    createOption("我会把问题转到具体细节上，直到得到解释。", 1, 1, 3, 2, 2)
  ], [2, 1, 3, 0]),
  createQuestion("如果朋友聚会没有邀请你，你更容易出现哪种第一反应？", [
    createOption("我会觉得也许只是忘了，先不急着下结论。", 0, 0, 0, 0, 0),
    createOption("我会先不说什么，但心里会慢慢变冷。", 0, 3, 1, 2, 3),
    createOption("我会主动问清楚，确认是不是有什么误会。", 3, 0, 1, 2, 3),
    createOption("我会开始怀疑自己是不是被故意漏掉。", 1, 1, 3, 1, 3)
  ], [0, 3, 1, 2]),
  createQuestion("如果和人吵起来，你更可能先怎么处理这件事？", [
    createOption("我会把争执拉回具体问题，尽量把话说清楚。", 0, 0, 0, 0, 0),
    createOption("我会直接要求按我的想法来，不太愿意让步。", 3, 0, 1, 3, 2),
    createOption("我会先沉默或拉开距离，等自己冷静再说。", 0, 3, 0, 3, 3),
    createOption("我会反复分析谁该负责，把责任尽量厘清。", 1, 1, 3, 2, 2)
  ], [1, 2, 0, 3]),
  createQuestion("如果涉及手机、密码或个人隐私，你更接近哪种做法？", [
    createOption("我会尊重隐私，有疑问就直接沟通。", 0, 0, 0, 0, 0),
    createOption("我会先把自己的隐私收紧，不太想马上解释。", 1, 3, 2, 1, 3),
    createOption("我会开始怀疑、追问，想把细节都弄明白。", 2, 1, 3, 2, 2),
    createOption("我会要求看清楚，确认自己没有被隐瞒。", 3, 0, 1, 2, 3)
  ], [3, 0, 2, 1]),
  createQuestion("如果你答应过一件事要改，你更可能怎么处理后面的执行？", [
    createOption("我会先要求事情按我的节奏来，我自己未必马上调整。", 3, 1, 1, 2, 2),
    createOption("我会先把具体做法想清楚，然后尽量照着去做。", 0, 0, 0, 0, 0),
    createOption("我会当下很有决心，但过一阵又回到老样子。", 1, 2, 3, 1, 3),
    createOption("我会说一些缓冲的话，真正落实通常会拖一拖。", 0, 3, 1, 1, 3)
  ], [1, 3, 2, 0]),
  createQuestion("如果你最近把时间放在工作、兴趣或朋友身上，你更可能会怎么做？", [
    createOption("我会继续投入自己的生活，同时保持必要的联系。", 0, 0, 0, 0, 0),
    createOption("我会优先把时间留给关系，怕这边被冷落。", 3, 0, 1, 1, 3),
    createOption("我会在忙自己的事时自然变冷，先把联系放一放。", 0, 3, 1, 2, 3),
    createOption("我会忍不住比较自己和周围情况，甚至拿话压住不安。", 1, 1, 3, 2, 2)
  ], [0, 2, 3, 1]),
  createQuestion("如果遇到一起花钱或分担开支的事，你更接近哪种反应？", [
    createOption("我会把责任和边界说清楚，按能力来分担。", 0, 0, 0, 0, 0),
    createOption("我会希望自己来掌握主要决定和规则。", 3, 0, 1, 1, 2),
    createOption("我会记住自己付出的部分，并期待以后得到回报。", 2, 1, 3, 1, 2),
    createOption("我会在需要承担时先回避，但一有需要又会靠近。", 1, 3, 2, 1, 3)
  ], [3, 1, 0, 2]),
  createQuestion("如果你明确拒绝一件让自己不舒服的事，你更可能怎么反应？", [
    createOption("我会尊重自己的边界，也承认这次拒绝会带来失望。", 0, 0, 0, 0, 0),
    createOption("我会很受伤，甚至让人明显看出我的委屈。", 1, 1, 3, 1, 3),
    createOption("我会继续追问或施压，直到这件事被改掉。", 3, 0, 1, 3, 3),
    createOption("我会立刻冷下来，减少交流，让距离先拉开。", 0, 3, 1, 3, 3)
  ], [2, 0, 3, 1]),
  createQuestion("如果谈到未来安排，你更接近哪种做法？", [
    createOption("我会和另一边一起按现实慢慢讨论，把计划落地。", 0, 0, 0, 0, 0),
    createOption("我会直接替这段关系做规划，希望按我的计划往前走。", 3, 0, 1, 1, 3),
    createOption("我会说很多美好的未来，但先不急着落实。", 1, 2, 3, 1, 3),
    createOption("我会避免给明确承诺，但也不想真的结束。", 1, 3, 1, 2, 3)
  ], [1, 2, 3, 0])
];

const totalQuestions = questions.length;
const dimensionKeys = ["control", "concealment", "strategy", "conflict", "attachmentPattern"];
const optionLabels = ["A", "B", "C", "D"];

const riskMeta = {
  control: {
    name: "控制倾向",
    shortName: "控制",
    description: "当前答案中，通过掌控节奏、规则、回应或关系边界来获得安全感的倾向较明显。可以观察自己是否把安全感和控制权绑定在一起。"
  },
  concealment: {
    name: "情绪隐藏",
    shortName: "隐藏",
    description: "当前答案中，压住真实感受、延迟表达、沉默观察或冷却关系的倾向较明显。可以观察这种防御是否让问题长期无法被讨论。"
  },
  strategy: {
    name: "策略思维",
    shortName: "策略",
    description: "当前答案中，观察局势、判断筹码、使用信息差或选择时机影响结果的倾向较明显。可以区分保护自己和把关系过度博弈化。"
  },
  conflict: {
    name: "冲突反应",
    shortName: "冲突",
    description: "当前答案中，面对冒犯、拒绝、背叛或利益受损时快速防御、反击、切割或升级冲突的倾向较明显。"
  },
  attachmentPattern: {
    name: "关系模式",
    shortName: "关系",
    description: "当前答案中，在亲密、信任、依赖和边界之间反复确认、试探、靠近或抽离的倾向较明显。"
  }
};

function calculateMaxDimensionScores() {
  const maxScores = {};

  dimensionKeys.forEach(function (key) {
    maxScores[key] = questions.reduce(function (total, question) {
      const maxForQuestion = Math.max.apply(null, question.options.map(function (option) {
        return option.scores[key] || 0;
      }));

      return total + maxForQuestion;
    }, 0);
  });

  return maxScores;
}

const dimensionMaxScores = calculateMaxDimensionScores();

// 当前题目编号：0 表示第一题，9 表示第十题。
let currentQuestionIndex = 0;

// 用户答案数组：保存每道题最新选择的选项编号，null表示尚未回答。
const answers = Array(totalQuestions).fill(null);

let autoAdvanceTimer = null;
let latestScores = null;
let latestPercentages = null;
let latestOverallStatus = null;
let latestRiskMessages = null;
let latestShadowProfile = null;
let resultAnimationFrame = null;
let copyResetTimer = null;
let resultRevealTimer = null;
let questionTransitionTimer = null;
let statusFeedbackTimers = [];
let pendingStatusMessage = "";

const analysisMessages = [
  "选择已记录",
  "正在分析行为倾向",
  "人格线索更新中"
];

const personalityFragments = [
  "人格碎片已发现",
  "你在压力环境下的行为模式正在形成",
  "暗影样本已进入人格档案",
  "冲突情境中的决策线索已捕获"
];

function setAnalysisStatus(message) {
  if (analysisStatus) {
    analysisStatus.textContent = message;
  }
}

function clearStatusFeedbackTimers() {
  statusFeedbackTimers.forEach(function (timer) {
    clearTimeout(timer);
  });
  statusFeedbackTimers = [];
}

function queueStatusFeedback(message, delay, questionIndex) {
  const timer = setTimeout(function () {
    if (currentQuestionIndex === questionIndex) {
      setAnalysisStatus(message);
    }
  }, delay);

  statusFeedbackTimers.push(timer);
}

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

  clearStatusFeedbackTimers();

  if (questionTransitionTimer !== null) {
    clearTimeout(questionTransitionTimer);
    questionTransitionTimer = null;
  }

  quizPage.classList.remove("is-leaving");
  quizPage.classList.remove("answer-recorded");
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

  progressText.textContent = "暗影探索进度 · 人格档案建立中 " + progressPercent + "%";
  progressFill.style.width = progressPercent + "%";
  progressBar.setAttribute("aria-label", "暗影探索进度，当前 " + progressPercent + "%");
  questionTitle.textContent = currentQuestion.question;

  optionButtons.forEach(function (button, index) {
    button.textContent = optionLabels[index] + ". " + currentQuestion.options[index].text;
  });

  clearSelectedOptions();

  // 恢复之前选择的答案：返回已回答题目时继续高亮。
  if (savedAnswer !== null) {
    optionButtons[savedAnswer].classList.add("selected");
  }

  if (pendingStatusMessage) {
    setAnalysisStatus(pendingStatusMessage);
    pendingStatusMessage = "";
  } else if (savedAnswer !== null) {
    setAnalysisStatus("已恢复此前选择 · 可重新校准");
  } else {
    setAnalysisStatus("等待你的选择");
  }

  updateNavigationButtons();
}

function showQuestion(index) {
  clearAutoAdvanceTimer();
  currentQuestionIndex = index;
  homePage.classList.add("is-hidden");
  completePage.classList.add("is-hidden");
  quizPage.classList.remove("is-hidden");
  quizPage.classList.remove("is-entering");
  renderQuestion();

  requestAnimationFrame(function () {
    quizPage.classList.add("is-entering");

    setTimeout(function () {
      quizPage.classList.remove("is-entering");
    }, 360);
  });
}

// 根据最新answers数组，从每个已选选项的scores对象重新计算五维人格原始分。
function calculateDimensionScores() {
  const scores = {};

  dimensionKeys.forEach(function (key) {
    scores[key] = 0;
  });

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
  const percentages = {};

  dimensionKeys.forEach(function (key) {
    const maxScore = dimensionMaxScores[key] || 1;
    percentages[key] = clampPercentage(scores[key] / maxScore * 100);
  });

  return percentages;
}

function getOrderedDimensions(percentages) {
  return dimensionKeys.map(function (key) {
    return {
      key: key,
      percentage: percentages[key],
      name: riskMeta[key].name,
      shortName: riskMeta[key].shortName,
      description: riskMeta[key].description
    };
  }).sort(function (first, second) {
    return second.percentage - first.percentage;
  });
}

function getStabilityPercentage(percentages) {
  return clampPercentage(100 - getShadowIntensity(percentages));
}

// 综合状态：基于五维暗影强度判断，不再使用旧的单一风险维度。
function determineOverallStatus(percentages) {
  const intensity = getShadowIntensity(percentages);

  if (intensity >= 81) {
    return {
      key: "highRisk",
      title: "黑曜人格强度",
      description: "当前答案中，多项暗影反应强度较高。它不代表好坏，而说明你在压力、利益和关系冲突下更容易启动强防御或强策略模式。"
    };
  }

  if (intensity >= 61) {
    return {
      key: "highRisk",
      title: "深影模式启动",
      description: "当前答案显示，暗影反应在多个情境中较为集中。你可能更容易通过掌控、隐藏、策略或切割来维持安全感。"
    };
  }

  if (intensity >= 41) {
    return {
      key: "mixed",
      title: "策略人格显现",
      description: "当前答案显示，你在复杂情境中会明显调动观察、判断和自我保护机制，但仍保留一定调整空间。"
    };
  }

  if (intensity >= 21) {
    return {
      key: "foundation",
      title: "隐藏探索阶段",
      description: "当前答案显示，暗影倾向开始浮现，但整体仍与自我约束、边界判断和现实沟通并存。"
    };
  }

  return {
    key: "protected",
    title: "清醒观察状态",
    description: "当前答案显示，暗影反应整体较低。你更容易保留观察、沟通和边界判断，而不是迅速进入强防御模式。"
  };
}

function getHealthyDescription(percentage) {
  if (percentage >= 70) {
    return "暗影强度较低，当前选择中自我观察和边界判断较稳定。";
  }

  if (percentage >= 50) {
    return "暗影强度处于中间区域，既有防御倾向，也保留调整空间。";
  }

  if (percentage >= 30) {
    return "暗影反应开始集中，建议观察具体触发情境。";
  }

  return "暗影反应较强，高压情境下可能更容易启动防御、掌控或抽离。";
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

// 主要提醒和次要提醒：基于五维中最高和第二高的暗影维度。
function determineRiskMessages(percentages) {
  const riskItems = getOrderedDimensions(percentages);
  const highestRisk = riskItems[0].percentage;
  const highestItems = riskItems.filter(function (item) {
    return item.percentage === highestRisk;
  });
  let primary;
  let primaryKeys = [];

  if (highestRisk < 20) {
    primary = {
      type: "none",
      keys: [],
      title: "目前未出现特别集中的暗影维度",
      meta: highestRisk + "%",
      description: "当前答案没有让某一种暗影维度特别突出，但仍然可以继续观察具体情境下的反应模式。"
    };
  } else if (highestItems.length >= 3) {
    primaryKeys = highestItems.map(function (item) {
      return item.key;
    });
    primary = {
      type: "mixed",
      keys: primaryKeys,
      title: "多维暗影模式并行",
      meta: highestItems.map(function (item) {
        return item.shortName;
      }).join(" + ") + "：" + highestRisk + "%",
      description: "当前答案中，多个暗影维度同时处在最高位置，可能在不同情境中交替出现掌控、隐藏、策略、冲突或关系拉扯。"
    };
  } else if (highestItems.length === 2) {
    primaryKeys = highestItems.map(function (item) {
      return item.key;
    });
    primary = {
      type: "mixed",
      keys: primaryKeys,
      title: "多种暗影模式交织",
      meta: highestItems.map(function (item) {
        return item.shortName;
      }).join(" + ") + "：" + highestRisk + "%",
      description: "当前答案中，" + highestItems.map(function (item) {
        return item.shortName;
      }).join("和") + "两个暗影维度并列突出，需要一起观察，而不是只看其中一种表现。"
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
      description: "主要提醒已经覆盖当前并列的暗影维度，暂时没有额外的次要维度需要单独列出。"
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

function getLegacyDisplayPercentages(percentages) {
  return {
    healthy: getStabilityPercentage(percentages),
    control: percentages.control,
    manipulation: percentages.strategy,
    avoidance: percentages.concealment
  };
}

// 更新四条旧结果进度条的最终ARIA数值，数据来源已切换为五维模型。
function updateResultBars(percentages) {
  const displayPercentages = getLegacyDisplayPercentages(percentages);

  updateDimension(healthyPercent, healthyBar, 0, displayPercentages.healthy);
  updateDimension(controlPercent, controlBar, 0, displayPercentages.control);
  updateDimension(manipulationPercent, manipulationBar, 0, displayPercentages.manipulation);
  updateDimension(avoidancePercent, avoidanceBar, 0, displayPercentages.avoidance);
}

// 结果页数字和进度条从0增长到最终百分比。
function animateResultPercentages(percentages) {
  cancelResultAnimation();
  updateResultBars(percentages);
  const displayPercentages = getLegacyDisplayPercentages(percentages);

  if (prefersReducedMotion() || typeof requestAnimationFrame !== "function") {
    updateDimension(healthyPercent, healthyBar, displayPercentages.healthy, displayPercentages.healthy);
    updateDimension(controlPercent, controlBar, displayPercentages.control, displayPercentages.control);
    updateDimension(manipulationPercent, manipulationBar, displayPercentages.manipulation, displayPercentages.manipulation);
    updateDimension(avoidancePercent, avoidanceBar, displayPercentages.avoidance, displayPercentages.avoidance);
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

    updateDimension(healthyPercent, healthyBar, displayPercentages.healthy * eased, displayPercentages.healthy);
    updateDimension(controlPercent, controlBar, displayPercentages.control * eased, displayPercentages.control);
    updateDimension(manipulationPercent, manipulationBar, displayPercentages.manipulation * eased, displayPercentages.manipulation);
    updateDimension(avoidancePercent, avoidanceBar, displayPercentages.avoidance * eased, displayPercentages.avoidance);

    if (progress < 1) {
      resultAnimationFrame = requestAnimationFrame(step);
      return;
    }

    updateDimension(healthyPercent, healthyBar, displayPercentages.healthy, displayPercentages.healthy);
    updateDimension(controlPercent, controlBar, displayPercentages.control, displayPercentages.control);
    updateDimension(manipulationPercent, manipulationBar, displayPercentages.manipulation, displayPercentages.manipulation);
    updateDimension(avoidancePercent, avoidanceBar, displayPercentages.avoidance, displayPercentages.avoidance);
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
  } else if (riskResult.primary.type === "strategy") {
    resultVisual.classList.add("visual-manipulation");
  } else if (riskResult.primary.type === "concealment" || riskResult.primary.type === "attachmentPattern") {
    resultVisual.classList.add("visual-avoidance");
  } else if (riskResult.primary.type === "conflict") {
    resultVisual.classList.add("visual-low-protection");
  } else {
    resultVisual.classList.add("visual-mixed");
  }
}

function getShadowIntensity(percentages) {
  return clampPercentage(
    percentages.control * 0.22
    + percentages.concealment * 0.18
    + percentages.strategy * 0.22
    + percentages.conflict * 0.2
    + percentages.attachmentPattern * 0.18
  );
}

function determineShadowProfile(percentages) {
  const intensity = getShadowIntensity(percentages);
  const orderedDimensions = getOrderedDimensions(percentages);
  const topDimension = orderedDimensions[0];
  const secondDimension = orderedDimensions[1];
  const highDimensions = orderedDimensions.filter(function (item) {
    return item.percentage >= 65;
  });
  const allLow = orderedDimensions.every(function (item) {
    return item.percentage < 35;
  });
  const level = intensity <= 20 ? 1
    : intensity <= 40 ? 2
      : intensity <= 60 ? 3
        : intensity <= 80 ? 4
          : 5;
  const levelNames = ["清醒观察者", "隐藏探索者", "策略人格", "深影模式", "黑曜人格"];
  const typeProfiles = {
    clearBoundary: {
      name: "清醒边界者",
      description: "你的档案显示，暗影反应整体较低，更容易保留直接沟通、边界判断和协商空间。",
      strength: "优势在于关系中较稳定，不容易把普通分歧迅速升级为对抗。",
      risk: "需要注意的是，过度理解他人有时会压低自己的真实需求。",
      advice: "继续保留清晰边界，也允许自己在必要时更明确地表达不舒服和拒绝。"
    },
    deepObserver: {
      name: "深海观察者",
      description: "你的档案显示，你更习惯先观察和压住情绪，再决定是否表达真实感受。",
      strength: "优势在于判断力强，不容易被短期情绪带走，也能捕捉关系中的细节。",
      risk: "需要注意的是，过度沉默会让别人难以理解你的真实需求。",
      advice: "当你想抽离或沉默时，可以先记录触发点，再选择是否清楚表达。"
    },
    shadowStrategist: {
      name: "暗影策略家",
      description: "你的档案显示，你在复杂关系中更容易先判断局势、筹码和时机，再选择行动。",
      strength: "优势在于局势感强，能识别信息差和关键变量。",
      risk: "需要注意的是，策略感过强时，关系可能被你理解成一场需要赢的局。",
      advice: "在重要关系中，尝试区分保护自己和过度布局。"
    },
    orderController: {
      name: "秩序掌控者",
      description: "你的档案显示，你需要明确规则、稳定回应和可预测关系，混乱时会自然进入主导状态。",
      strength: "优势在于执行力强，能够推动问题解决并建立秩序。",
      risk: "需要注意的是，掌控需求过强可能压缩他人空间。",
      advice: "可以观察自己是在维护边界，还是正在把安全感完全交给控制权。"
    },
    coldDefender: {
      name: "冷面防御者",
      description: "你的档案显示，受伤或感到威胁时，你更容易关闭情绪出口，用冷静、疏离或切割保护自己。",
      strength: "优势在于危机中不容易崩溃，止损能力和边界感明显。",
      risk: "需要注意的是，冷处理可能让真正的问题无法被讨论。",
      advice: "在冷却关系前，可以先判断这是一种必要边界，还是未被表达的受伤。"
    },
    bladeResponder: {
      name: "利刃反击者",
      description: "你的档案显示，面对冒犯、背叛或不公平时，你更容易快速反击、施压或切断被动状态。",
      strength: "优势在于自我保护能力强，不容易被持续压制。",
      risk: "需要注意的是，强反击可能让普通分歧升级成对抗。",
      advice: "可以在反击前多停一秒，判断对方是真的越界，还是自己感到被威胁。"
    },
    fogRelation: {
      name: "迷雾关系者",
      description: "你的档案显示，你对关系变化敏感，既渴望确认，也容易通过试探、冷淡或反复确认寻找安全感。",
      strength: "优势在于能捕捉细微信号，也重视连接本身。",
      risk: "需要注意的是，过度试探会消耗双方的信任和耐心。",
      advice: "真正的安全感更适合来自清晰表达，而不是不断验证。"
    },
    obsidianIntegrator: {
      name: "黑曜整合者",
      description: "你的档案显示，多项暗影维度同时偏高，能掌控、隐藏、布局、反击，也能在关系中保持距离。",
      strength: "优势在于复杂环境适应力强，压力下有多种应对方式。",
      risk: "需要注意的是，如果缺少自我觉察，这套防御系统会让他人很难真正靠近。",
      advice: "建议把每一次强反应拆开看：它是在保护你，还是让关系失去修复空间。"
    },
    hiddenExplorer: {
      name: "隐藏探索者",
      description: "你的档案显示，暗影模式尚未形成单一主导风格，可能在不同场景中切换不同反应。",
      strength: "优势在于适应性较强，不容易被一种固定模式完全限制。",
      risk: "需要注意的是，分散不代表没有模式，关键是识别最容易被触发的情境。",
      advice: "可以记录哪些场景最容易触发掌控、隐藏、策略、冲突或关系拉扯。"
    }
  };
  const singleDimensionMap = {
    control: "orderController",
    concealment: "deepObserver",
    strategy: "shadowStrategist",
    conflict: "bladeResponder",
    attachmentPattern: "fogRelation"
  };
  const pairMap = {
    "concealment+strategy": "deepObserver",
    "control+strategy": "shadowStrategist",
    "attachmentPattern+control": "orderController",
    "concealment+conflict": "coldDefender",
    "conflict+control": "bladeResponder",
    "attachmentPattern+concealment": "fogRelation",
    "conflict+strategy": "shadowStrategist",
    "attachmentPattern+strategy": "fogRelation",
    "concealment+control": "coldDefender",
    "attachmentPattern+conflict": "fogRelation"
  };
  let profileKey = "hiddenExplorer";

  if (allLow) {
    profileKey = "clearBoundary";
  } else if (highDimensions.length >= 3) {
    profileKey = "obsidianIntegrator";
  } else if (topDimension.percentage - secondDimension.percentage >= 12) {
    profileKey = singleDimensionMap[topDimension.key] || "hiddenExplorer";
  } else if (topDimension.percentage > 50 && secondDimension.percentage > 50) {
    const pairKey = [topDimension.key, secondDimension.key].sort().join("+");
    profileKey = pairMap[pairKey] || "hiddenExplorer";
  }

  return Object.assign({
    level: level,
    levelName: levelNames[level - 1],
    className: "level-" + level,
    intensity: intensity,
    dominant: topDimension,
    secondary: secondDimension
  }, typeProfiles[profileKey]);
}

function getShadowDisplayDimensions(percentages) {
  return dimensionKeys.map(function (key) {
    return {
      name: riskMeta[key].name,
      value: percentages[key]
    };
  });
}

function renderShadowDimensions(percentages) {
  const dimensions = getShadowDisplayDimensions(percentages);

  shadowDimensions.innerHTML = dimensions.map(function (dimension) {
    return [
      "<div class=\"dimension-row shadow-dimension\">",
      "  <div>",
      "    <span>" + dimension.name + "</span>",
      "    <strong>" + dimension.value + "%</strong>",
      "  </div>",
      "  <div class=\"dimension-bar\" role=\"progressbar\" aria-label=\"" + dimension.name + "百分比\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow=\"" + dimension.value + "\">",
      "    <div class=\"dimension-fill shadow-fill\" data-shadow-value=\"" + dimension.value + "\"></div>",
      "  </div>",
      "</div>"
    ].join("");
  }).join("");

  requestAnimationFrame(function () {
    shadowDimensions.querySelectorAll(".shadow-fill").forEach(function (bar) {
      bar.style.width = bar.dataset.shadowValue + "%";
    });
  });
}

// 根据当前最新结果生成可复制的纯文本摘要。
function buildResultSummary() {
  return [
    "暗影人格探索系统",
    "",
    "人格等级：Level " + latestShadowProfile.level + " " + latestShadowProfile.name,
    "暗影强度：" + latestShadowProfile.intensity + "%",
    "",
    "综合状态：" + latestOverallStatus.title,
    "",
    "人格档案：",
    latestShadowProfile.description,
    "",
    "五维分析：",
    "控制倾向：" + latestPercentages.control + "%",
    "情绪隐藏：" + latestPercentages.concealment + "%",
    "策略思维：" + latestPercentages.strategy + "%",
    "冲突反应：" + latestPercentages.conflict + "%",
    "关系模式：" + latestPercentages.attachmentPattern + "%",
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

function copyTextWithTextarea(text) {
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

function copyTextWithFallback(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    const clipboardTimeout = new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error("clipboard write timed out"));
      }, 1200);
    });

    return Promise.race([
      navigator.clipboard.writeText(text),
      clipboardTimeout
    ]).catch(function () {
      return copyTextWithTextarea(text);
    });
  }

  return copyTextWithTextarea(text);
}

// 复制结果摘要：优先使用剪贴板API，不支持时退回textarea方案。
async function copyResultSummary() {
  if (!latestPercentages || !latestOverallStatus || !latestRiskMessages) {
    copyStatus.textContent = "暂无可复制的结果。";
    return;
  }

  resetCopyButtonState();
  copySummaryButton.textContent = "正在复制...";
  copyStatus.textContent = "正在复制结果摘要。";

  try {
    await copyTextWithFallback(buildResultSummary());
    copySummaryButton.textContent = "已复制";
    copyStatus.textContent = "结果摘要已复制";
  } catch (error) {
    copySummaryButton.textContent = "复制失败";
    copyStatus.textContent = "复制失败，请手动复制结果内容。";
  }

  copyResetTimer = setTimeout(function () {
    resetCopyButtonState();
  }, 2000);
}

// 渲染结果页：显示综合状态、五维人格档案、主要提醒和次要提醒。
function renderResult() {
  cancelResultAnimation();
  resetCopyButtonState();
  latestScores = calculateDimensionScores();
  latestPercentages = calculatePercentages(latestScores);
  latestOverallStatus = determineOverallStatus(latestPercentages);
  latestRiskMessages = determineRiskMessages(latestPercentages);
  latestShadowProfile = determineShadowProfile(latestPercentages);

  completePage.classList.remove("level-1", "level-2", "level-3", "level-4", "level-5");
  completePage.classList.add(latestShadowProfile.className);
  shadowLevel.textContent = "Level " + latestShadowProfile.level;
  shadowProfileName.textContent = latestShadowProfile.name;
  profileStrengthDescription.textContent = latestShadowProfile.description;
  profileStrengthText.textContent = latestShadowProfile.strength;
  profileRiskText.textContent = latestShadowProfile.risk;
  profileAdviceText.textContent = latestShadowProfile.advice;
  overallTitle.textContent = latestShadowProfile.name;
  overallDescription.textContent = "暗影强度 " + latestShadowProfile.intensity + "% · " + latestOverallStatus.description;
  healthyDescription.textContent = getHealthyDescription(getStabilityPercentage(latestPercentages));
  primaryRiskTitle.textContent = latestRiskMessages.primary.title;
  primaryRiskMeta.textContent = latestRiskMessages.primary.meta;
  primaryRiskDescription.textContent = latestRiskMessages.primary.description;
  secondaryRiskTitle.textContent = latestRiskMessages.secondary.title;
  secondaryRiskMeta.textContent = latestRiskMessages.secondary.meta;
  secondaryRiskDescription.textContent = latestRiskMessages.secondary.description;
  updateResultVisual(latestOverallStatus, latestRiskMessages);
  renderShadowDimensions(latestPercentages);
  animateResultPercentages(latestPercentages);
}

function clearResult() {
  if (resultRevealTimer !== null) {
    clearTimeout(resultRevealTimer);
    resultRevealTimer = null;
  }

  cancelResultAnimation();
  latestScores = null;
  latestPercentages = null;
  latestOverallStatus = null;
  latestRiskMessages = null;
  latestShadowProfile = null;
  resetCopyButtonState();
  completePage.classList.remove("level-1", "level-2", "level-3", "level-4", "level-5", "is-generating");
  resultLoader.classList.remove("is-hidden");
  resultContent.classList.add("is-hidden");
  shadowLevel.textContent = "Level 1";
  shadowProfileName.textContent = "清醒观察者";
  profileStrengthDescription.textContent = "等待生成暗影人格档案。";
  profileStrengthText.textContent = "等待生成。";
  profileRiskText.textContent = "等待生成。";
  profileAdviceText.textContent = "等待生成。";
  shadowDimensions.innerHTML = "";
  overallTitle.textContent = "综合状态";
  overallDescription.textContent = "你的结果将由五个人格维度共同生成。";
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
  if (resultRevealTimer !== null) {
    clearTimeout(resultRevealTimer);
    resultRevealTimer = null;
  }

  completePage.classList.add("is-generating");
  resultLoader.classList.remove("is-hidden");
  resultContent.classList.add("is-hidden");
  quizPage.classList.add("is-hidden");
  homePage.classList.add("is-hidden");
  completePage.classList.remove("is-hidden");

  resultRevealTimer = setTimeout(function () {
    resultRevealTimer = null;
    renderResult();
    completePage.classList.remove("is-generating");
    resultLoader.classList.add("is-hidden");
    resultContent.classList.remove("is-hidden");
  }, prefersReducedMotion() ? 250 : 1800);
}

// 自动跳到下一题：第1题到第9题选择后执行，第10题不自动跳。
function scheduleAutoAdvance(questionIndex) {
  clearAutoAdvanceTimer();

  if (questionIndex >= totalQuestions - 1) {
    queueStatusFeedback(analysisMessages[1], 260, questionIndex);
    queueStatusFeedback(analysisMessages[2], 560, questionIndex);
    return;
  }

  queueStatusFeedback(analysisMessages[1], 260, questionIndex);

  const shouldShowFragment = (questionIndex + 1) % 3 === 0;
  const fragmentMessage = personalityFragments[Math.floor(Math.random() * personalityFragments.length)];
  queueStatusFeedback(shouldShowFragment ? fragmentMessage : analysisMessages[2], 560, questionIndex);

  questionTransitionTimer = setTimeout(function () {
    questionTransitionTimer = null;

    if (currentQuestionIndex === questionIndex) {
      if (!shouldShowFragment) {
        setAnalysisStatus(analysisMessages[2]);
      }

      quizPage.classList.add("is-leaving");
    }
  }, 760);

  autoAdvanceTimer = setTimeout(function () {
    autoAdvanceTimer = null;

    if (currentQuestionIndex === questionIndex) {
      pendingStatusMessage = "人格模型已更新 · 继续选择";
      showQuestion(questionIndex + 1);
    }
  }, 1000);
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
    quizPage.classList.add("answer-recorded");
    setAnalysisStatus(analysisMessages[0]);
  });
});

// 返回上一题。
prevButton.addEventListener("click", function () {
  if (prevButton.disabled) {
    return;
  }

  pendingStatusMessage = "正在读取上一份人格样本";
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

  pendingStatusMessage = "正在读取下一份人格样本";
  showQuestion(currentQuestionIndex + 1);
});

// 返回检查答案：回到第10题，并恢复之前选择的答案。
reviewButton.addEventListener("click", function () {
  showQuestion(totalQuestions - 1);
});

completePage.addEventListener("click", function (event) {
  if (event.target === copySummaryButton) {
    copyResultSummary();
  }
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
