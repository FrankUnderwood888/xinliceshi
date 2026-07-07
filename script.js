const questions=[
  {q:"和朋友一起时你更常",o:["主动找话题活跃气氛","安静地听别人说话"],d:"EI",s:["E","I"]},
  {q:"你更关注",o:["实际细节和具体事实","整体画面和未来可能"],d:"SN",s:["S","N"]},
  {q:"做重要决定时你更依赖",o:["逻辑分析和客观数据","个人感受和价值观"],d:"TF",s:["T","F"]},
  {q:"你的生活方式更偏向",o:["有计划有安排","随性灵活自由"],d:"JP",s:["J","P"]},
  {q:"初次见面时你给人的印象",o:["开朗健谈","安静内敛"],d:"EI",s:["E","I"]},
  {q:"你更喜欢哪种信息",o:["具体可感的实际信息","抽象概念和理论"],d:"SN",s:["S","N"]},
  {q:"批评别人时你倾向于",o:["直接指出问题所在","考虑对方感受委婉表达"],d:"TF",s:["T","F"]},
  {q:"你喜欢",o:["事情有明确的截止日期","保持开放随时调整"],d:"JP",s:["J","P"]},
  {q:"空闲时间你更喜欢",o:["和很多人一起聚会","独处或和一两个好友相处"],d:"EI",s:["E","I"]},
  {q:"你觉得自己更",o:["务实理性","浪漫感性"],d:"TF",s:["T","F"]}
];
const results={
  "INTJ":{title:"建筑师型人格",desc:"你是一个独立、理性、有远见的人。你喜欢深入思考，擅长制定长期计划并坚决执行。",detail:"独立思考者，追求完美，对自己和他人都有较高标准。适合从事战略规划、科研、技术开发等工作。"},
  "INTP":{title:"逻辑学家型人格",desc:"你是一个充满好奇心、热爱理论思考的人。你喜欢分析事物的本质，享受解决复杂问题的过程。",detail:"思维灵活，喜欢抽象概念和创新。适合从事编程、数据分析、学术研究等工作。"},
  "ENTJ":{title:"指挥官型人格",desc:"你是一个天生的领导者，果断、自信、有远见。你擅长组织策划，能带领团队朝目标前进。",detail:"执行力强，目标明确，善于统筹全局。适合从事管理、创业、项目管理等工作。"},
  "ENTP":{title:"辩论家型人格",desc:"你思维敏捷、点子多，喜欢从不同角度挑战既有观念。你对新鲜事物充满热情。",detail:"善于创新和应变，口才出色。适合从事咨询、市场营销、创作等工作。"},
  "INFJ":{title:"提倡者型人格",desc:"你温和而有力量，富有洞察力和同理心。你追求意义和深度，希望让世界变得更好。",detail:"善于倾听和理解他人，有强烈的使命感。适合从事心理咨询、教育、公益等工作。"},
  "INFP":{title:"调停者型人格",desc:"你内心丰富、理想主义，重视真实和善意。你对美和情感有敏锐的感知力。",detail:"富有创造力和同理心，追求内心的真实。适合从事写作、设计、艺术等工作。"},
  "ENFJ":{title:"主人公型人格",desc:"你热情、有感染力，善于激励和帮助他人成长。你是天生的社交催化剂。",detail:"善于沟通和领导，关注他人的需求。适合从事教育、人力资源、公共关系等工作。"},
  "ENFP":{title:"竞选者型人格",desc:"你充满活力、富有创造力，善于发现生活中的各种可能性。你是快乐的传播者。",detail:"热情开朗，思维跳跃，善于社交。适合从事广告、媒体、活动策划等工作。"},
  "ISTJ":{title:"物流师型人格",desc:"你踏实可靠、责任心强，做事一丝不苟。你相信规则和秩序，是值得信赖的人。",detail:"严谨务实，注重细节和执行力。适合从事会计、法律、行政管理等工作。"},
  "ISFJ":{title:"守卫者型人格",desc:"你温暖体贴、默默付出，是身边人最坚实的后盾。你重视传统和责任感。",detail:"细心周到，乐于助人，忠诚可靠。适合从事护理、教育、社会服务等工作。"},
  "ESTJ":{title:"总经理型人格",desc:"你务实果断、组织能力强，是天生的管理者。你注重效率和结果。",detail:"执行力强，善于管理和决策。适合从事管理、运营、执法等工作。"},
  "ESFJ":{title:"执政官型人格",desc:"你热情友善、乐于助人，善于营造和谐的氛围。你很在意别人的感受。",detail:"社交能力强，有责任心，注重传统。适合从事客户服务、人力资源、护理等工作。"},
  "ISTP":{title:"鉴赏家型人格",desc:"你冷静务实、动手能力强，喜欢探索事物背后的原理。你是解决问题的高手。",detail:"灵活应变，擅长实际操作和分析。适合从事工程师、手工艺人、技术员等工作。"},
  "ISFP":{title:"探险家型人格",desc:"你温柔安静、审美敏锐，用自己的方式感受和表达世界的美。",detail:"艺术家气质，注重内心感受和当下的体验。适合从事设计、摄影、园艺等工作。"},
  "ESTP":{title:"企业家型人格",desc:"你精力充沛、行动力强，喜欢冒险和挑战。你擅长抓住机会，说服他人。",detail:"灵活机敏，善于交际和谈判。适合从事销售、创业、体育等工作。"},
  "ESFP":{title:"表演者型人格",desc:"你热情开朗、活在当下，是人群中的焦点。你喜欢给别人带来快乐。",detail:"善于表现和社交，富有感染力。适合从事演艺、旅游、教育等工作。"}
};
let current=0,ans={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
const $=s=>document.querySelector(s);
function show(s){document.querySelectorAll(".screen").forEach(e=>e.classList.add("hide"));$(s).classList.remove("hide")}
$("#start-btn").onclick=()=>{current=0;ans={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};show("#quiz-screen");renderQ()};
function renderQ(){const q=questions[current];$("#progress-fill").style.width=((current+1)/questions.length*100)+"%";$("#question-num").textContent=`${current+1}/${questions.length}`;$("#question-text").textContent=q.q;$("#options").innerHTML=q.o.map((t,i)=>`<div class="option" data-i="${i}">${t}</div>`).join("");document.querySelectorAll(".option").forEach(el=>{el.onclick=()=>{const q=questions[current];ans[q.s[+el.dataset.i]]++;current++;current<questions.length?renderQ():showResult()}})}
function showResult(){const r=(ans.E>ans.I?"E":"I")+(ans.S>ans.N?"S":"N")+(ans.T>ans.F?"T":"F")+(ans.J>ans.P?"J":"P");show("#result-screen");$("#result-title").textContent="你的测试结果";$("#result-badge").textContent=(results[r]||results.INTJ).title;$("#result-desc").textContent=(results[r]||results.INTJ).desc;$("#result-detail").textContent=(results[r]||results.INTJ).detail}
$("#restart-btn").onclick=()=>show("#start-screen");
show("#start-screen");
