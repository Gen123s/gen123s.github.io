// DOM元素获取
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const thinkBtn = document.getElementById('thinkBtn');
const searchBtn = document.getElementById('searchBtn');
const kbBtn = document.getElementById('kbBtn');
const moreBtn = document.getElementById('moreBtn');
const knowledgeBaseModal = document.getElementById('knowledgeBaseModal');
const settingsModal = document.getElementById('settingsModal');
const modalClose = document.querySelectorAll('.modal-close');
const darkModeToggle = document.getElementById('darkModeToggle');
const fontBoldToggle = document.getElementById('fontBoldToggle');
// 新增：API Key相关元素
const deepseekApiKeyInput = document.getElementById('deepseekApiKey');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const MAX_WORD_COUNT = 50; // 放宽字数限制，改为50字

// 新增：自定义问答类型切换元素
const fixedKbTypeBtn = document.getElementById('fixedKbTypeBtn');
const keywordKbTypeBtn = document.getElementById('keywordKbTypeBtn');
let currentCustomKbType = 'fixed'; // 默认添加固定精准问答

// ========== 新增：操作提示框元素 ==========
const operationTip = document.getElementById('operationTip');

// DeepSeek API配置（从localStorage读取，默认空）
const DEEPSEEK_CONFIG = {
    apiKey: localStorage.getItem('deepseekApiKey') || "",
    apiUrl: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-chat"
};

// 状态管理
// 修改：自定义知识库数据结构增加type字段（fixed/keyword）
let customKnowledgeBase = JSON.parse(localStorage.getItem('customKnowledgeBase')) || [];
let currentKbType = 'official';
let isSearchMode = false; // DeepSeek搜索模式开关
let appSettings = JSON.parse(localStorage.getItem('appSettings')) || {
    darkMode: false,
    fontBold: false
};

// ========== 新增：操作提示函数 ==========
function showOperationTip(text) {
    // 清除之前的定时器，避免多个提示重叠
    clearTimeout(operationTip.timer);
    
    // 设置提示文本
    operationTip.textContent = text;
    // 显示提示框
    operationTip.classList.add('show');
    
    // 3秒后自动隐藏
    operationTip.timer = setTimeout(() => {
        operationTip.classList.remove('show');
    }, 3000);
}

// ========== 初始化设置 ==========
function initSettings() {
    // 应用深色模式
    if (appSettings.darkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    // 应用字体加粗
    if (appSettings.fontBold) {
        document.body.classList.add('font-bold');
        fontBoldToggle.checked = true;
    }

    // 新增：初始化API Key输入框（显示已保存的Key）
    deepseekApiKeyInput.value = DEEPSEEK_CONFIG.apiKey;
    
    // 保存设置到本地存储
    saveSettings();
}

// 保存设置到localStorage
function saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(appSettings));
}

// ========== 新增：保存DeepSeek API Key ==========
function saveDeepSeekApiKey() {
    // 关键修改1：移除非空校验，允许保存空值
    const apiKey = deepseekApiKeyInput.value.trim();
    
    // 如果是空值，清空localStorage中的API Key
    if (!apiKey) {
        localStorage.removeItem('deepseekApiKey');
        // 替换alert为操作提示
        showOperationTip('API Key已清空，将使用模拟数据回答');
    } else {
        // 保存到localStorage（仅本地存储，不会上传）
        localStorage.setItem('deepseekApiKey', apiKey);
        // 替换alert为操作提示
        showOperationTip('API Key保存成功');
    }
    
    // 更新配置对象
    DEEPSEEK_CONFIG.apiKey = apiKey;
}

// ========== DeepSeek API调用函数 ==========
async function callDeepSeekAPI(question) {
    // 模拟数据（无API Key时使用）
    const mockResponses = {
        "你好": "你好呀！你现在打开了搜索功能 我将调用DeepSeek协助回答 无API将使用模拟数据",
        "天气怎么样": "抱歉，我无法获取实时天气信息，但你可以查看当地气象预报哦",
        "什么是人工智能": "人工智能（AI）是一门让计算机模拟人类智能行为的技术科学，涵盖机器学习、自然语言处理、计算机视觉等多个领域，被广泛应用于智能家居、自动驾驶、医疗诊断等场景...",
        "编程学习": "学习编程建议从Python开始，它语法简单、应用广泛，先掌握基础语法，再通过实战项目提升技能，推荐LeetCode、GitHub等平台练习...",
        "帮助": "你现在使用的是模拟数据！\n回复● 下方输入框内即可输入问题\n未动任何东西的情况下默认使用LZR IA知识库\n如果需要更换知识库可以点击上方【知识库】更改当前使用的知识库\n● 自定义知识库可以自己上传问题和回答\n● 固定精准问答是“直接一问一答”的形式\n直接根据你的问题做出相应的回答\n● 关键词模糊问答则是以问题中包含关键词的做出相应的回答\n关键词的先后决定了输出的回答\n● 下方【搜索】会开始调用DeepSeek的API\n使用DeepSeek API需要DeepSeek API Key\nKey可以在上方【更多】中进行本地输入\n● 上方【新的对话】会新建标签页 直接点击左上角的【LZR IA】会直接刷新网页",
    };

    // 关键修改2：严格检查API Key是否存在，为空则直接返回模拟数据
    if (!DEEPSEEK_CONFIG.apiKey || DEEPSEEK_CONFIG.apiKey.trim() === "") {
        return mockResponses[question] || `关于"${question}"的回答：\n这是模拟的DeepSeek回答内容，如需使用真实API，请在【更多】-【DeepSeek API设置】中配置你的API Key。`;
    }

    // 真实API调用
    try {
        const response = await fetch(DEEPSEEK_CONFIG.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPSEEK_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_CONFIG.model,
                messages: [
                    { role: "user", content: question }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("DeepSeek API调用失败:", error);
        return `获取回答失败：${error.message}\n请检查你的API Key是否正确，或网络是否正常。`;
    }
}

// 官方关键词知识库（关键修改2：引用外部文件的全局变量）
const knowledgeBase = OFFICIAL_KNOWLEDGE_BASE || []; // 增加容错，避免未定义

// 工具函数
// 获取当前时间（格式化）
function getCurrentTime() {
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// 保存自定义知识库到localStorage
function saveCustomKnowledgeBase() {
    localStorage.setItem('customKnowledgeBase', JSON.stringify(customKnowledgeBase));
}

// 渲染自定义问答列表
function renderCustomKbList() {
    const list = document.getElementById('customKbList');
    list.innerHTML = '';
    if (customKnowledgeBase.length === 0) {
        list.innerHTML = '<p>~暂无自定义问答 在下方添加一个试试吧~</p>';
        return;
    }
    customKnowledgeBase.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'custom-kb-item';
        // 新增：显示问答类型标签
        const typeText = item.type === 'fixed' ? '固定精准问答' : '关键词模糊问答';
        const typeClass = item.type === 'fixed' ? 'fixed' : 'keyword';
        
        itemDiv.innerHTML = `
            <div class="content">
                <div class="question">问题：${item.question}</div>
                <div class="answer">回答：${item.answer}</div>
                <span class="type-tag ${typeClass}">${typeText}</span>
            </div>
            <button class="delete-btn" data-index="${index}">删除</button>
        `;
        list.appendChild(itemDiv);
    });
    // 绑定删除按钮事件
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const deletedItem = customKnowledgeBase[index];
            customKnowledgeBase.splice(index, 1);
            saveCustomKnowledgeBase();
            renderCustomKbList();
            // 新增：删除问答的操作提示
            showOperationTip(`已删除${deletedItem.type === 'fixed' ? '固定精准' : '关键词模糊'}问答: ${deletedItem.question}`);
        });
    });
}

// 切换知识库类型
function switchKbType(type) {
    currentKbType = type;
    // 更新按钮样式
    document.getElementById('officialKbBtn').classList.toggle('active', type === 'official');
    document.getElementById('customKbBtn').classList.toggle('active', type === 'custom');
    // 新增：切换知识库的操作提示
    showOperationTip(`已切换至${type === 'official' ? '官方知识库' : '自定义知识库'}`);
}

// 新增：切换自定义问答类型
function switchCustomKbType(type) {
    currentCustomKbType = type;
    fixedKbTypeBtn.classList.toggle('active', type === 'fixed');
    keywordKbTypeBtn.classList.toggle('active', type === 'keyword');
    
    // 更新输入框提示文字
    const questionInput = document.getElementById('customQuestion');
    if (type === 'fixed') {
        questionInput.placeholder = '输入问题（固定问答填完整问题）';
    } else {
        questionInput.placeholder = '输入问题（关键词问答填关键词）';
    }
    // 新增：切换问答类型的操作提示
    showOperationTip(`已切换为添加${type === 'fixed' ? '固定精准' : '关键词模糊'}问答`);
}

// 关键词匹配函数（核心）- 修复并增强自定义知识库匹配逻辑
function matchKnowledgeBase(question) {
    // ========== 第一步：先检查全局固定问题（优先级最高） ==========
    // 优化：去除所有空格+标点+转小写，提升匹配容错率
    const cleanQuestion = question
        .trim()
        .toLowerCase()
        .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '') // 移除所有标点/特殊符号
        .replace(/\s+/g, ''); // 移除所有空格
    
    // 匹配全局固定问题库
    let matchedFixedQuestion = null;
    if (window.FIXED_QUESTIONS && Array.isArray(window.FIXED_QUESTIONS)) {
        for (const item of window.FIXED_QUESTIONS) {
            const cleanFixedQuestion = item.question
                .trim()
                .toLowerCase()
                .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')
                .replace(/\s+/g, '');
            
            if (cleanFixedQuestion === cleanQuestion) {
                matchedFixedQuestion = item;
                break;
            }
        }
    }
    
    // 如果匹配到全局固定问题，直接返回精准回答
    if (matchedFixedQuestion) {
        return matchedFixedQuestion.answer;
    }

    // 自定义知识库
    if (currentKbType === 'custom' && customKnowledgeBase.length > 0) {
        const lowerQuestion = question.toLowerCase();
        
        // 2.1 先匹配自定义固定精准问答（优先级高于自定义关键词）
        let matchedCustomFixed = null;
        for (const item of customKnowledgeBase) {
            if (item.type === 'fixed') {
                const cleanCustomFixedQuestion = item.question
                    .trim()
                    .toLowerCase()
                    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')
                    .replace(/\s+/g, '');
                
                if (cleanCustomFixedQuestion === cleanQuestion) {
                    matchedCustomFixed = item;
                    break;
                }
            }
        }
        
        if (matchedCustomFixed) {
            return matchedCustomFixed.answer;
        }
        
        // 2.2 匹配自定义关键词模糊问答
        let matchedCustomKeyword = null;
        for (const item of customKnowledgeBase) {
            if (item.type === 'keyword' && lowerQuestion.includes(item.question.toLowerCase())) {
                matchedCustomKeyword = item;
                break;
            }
        }
        
        if (matchedCustomKeyword) {
            return matchedCustomKeyword.answer;
        }
        
        return "自定义知识库中没有找到匹配的回答～\n你可能忘记在自定义知识库中设置了相应的回答!";
    }

    // 官方知识库
    if (knowledgeBase && Array.isArray(knowledgeBase)) {
        const lowerQuestion = question.toLowerCase();
        let matchedItems = [];
        knowledgeBase.forEach(item => {
            const hasKeyword = item.keywords && item.keywords.some(keyword => 
                lowerQuestion.includes(keyword.toLowerCase())
            );
            if (hasKeyword) {
                matchedItems.push(item);
            }
        });
        if (matchedItems.length > 0) {
            matchedItems.sort((a, b) => (b.priority || 0) - (a.priority || 0));
            return matchedItems[0].answer;
        }
    }
    
    return "我知识库里没有这个问题的回答，换一个问吧！\n如果要触发什么或想让我说出什么可能是你句式不太对...";
}

// 打字机效果函数
function typeWriterEffect(element, text, speed = 30) {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// ========== 交互逻辑 ==========
// 思考按钮动画
thinkBtn.addEventListener('click', () => {
    thinkBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        thinkBtn.style.transform = 'scale(1)';
    }, 150);
});

// 搜索按钮切换
searchBtn.addEventListener('click', () => {
    isSearchMode = !isSearchMode;
    searchBtn.classList.toggle('active', isSearchMode);
    // 视觉反馈
    searchBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        searchBtn.style.transform = 'scale(1)';
    }, 150);
    // 新增：切换搜索模式的操作提示
    showOperationTip(`已${isSearchMode ? '开始' : '停止'}调用DeepSeek API`);
});

// 发送消息核心函数
async function sendMessage() {
    const userQuestion = userInput.value.trim();
    if (!userQuestion) return;

    // 1. 显示用户消息
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-message';
    userMsgDiv.innerHTML = `
        ${userQuestion}
        <span class="message-time">${getCurrentTime()}</span>
    `;
    chatMessages.appendChild(userMsgDiv);
    userInput.value = '';

    // 2. 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 3. AI回复逻辑
    const aiMsgDiv = document.createElement('div');
    aiMsgDiv.className = 'message ai-message';
    let isUsingDeepSeek = false; // 标记是否调用DeepSeek API
    
    // 显示加载状态
    aiMsgDiv.innerHTML = `
        <span class="typing-effect"><div class="loading"></div>  思考中...</span>
        <span class="message-time">${getCurrentTime()}</span>
    `;
    chatMessages.appendChild(aiMsgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        let aiAnswer;
        
        // 判断是否开启DeepSeek搜索模式
        if (isSearchMode) {
            isUsingDeepSeek = true; // 标记为调用DeepSeek API
            // DeepSeek搜索模式：调用API获取回答
            if (userQuestion.length > MAX_WORD_COUNT) {
                aiAnswer = "问题字数太多啦，我有点看不懂，请简短一点～";
            } else {
                aiAnswer = await callDeepSeekAPI(userQuestion);
            }
        } else {
            // 普通模式：匹配知识库
            aiAnswer = userQuestion.length > MAX_WORD_COUNT 
                ? "问题字数太多啦，我有点看不懂，请简短一点～" 
                : matchKnowledgeBase(userQuestion);
        }
        
        // 更新AI消息内容（移除加载动画）
        aiMsgDiv.innerHTML = `
            <span class="typing-effect"></span>
            <span class="message-time">${getCurrentTime()}</span>
            ${isUsingDeepSeek ? '<span class="deepseek-tag">此回答调用DeepSeek API</span>' : ''}
        `;
        
        // 打字机效果展示回答
        const typingElement = aiMsgDiv.querySelector('.typing-effect');
        typeWriterEffect(typingElement, aiAnswer);

    } catch (error) {
        // 错误处理
        aiMsgDiv.innerHTML = `
            <span class="typing-effect">获取回答时出错：${error.message}</span>
            <span class="message-time">${getCurrentTime()}</span>
            ${isUsingDeepSeek ? '<span class="deepseek-tag">此回答调用DeepSeek API</span>' : ''}
        `;
    }

    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 绑定发送事件
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 移动端菜单按钮交互（简易版）
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
mobileMenuBtn.addEventListener('click', () => {
    const navbarMenu = document.querySelector('.navbar-menu');
    navbarMenu.style.display = navbarMenu.style.display === 'flex' ? 'none' : 'flex';
    navbarMenu.style.position = 'absolute';
    navbarMenu.style.top = '60px';
    navbarMenu.style.right = '20px';
    navbarMenu.style.background = appSettings.darkMode ? '#383838' : 'white';
    navbarMenu.style.boxShadow = 'var(--shadow-md)';
    navbarMenu.style.borderRadius = 'var(--radius-sm)';
    navbarMenu.style.flexDirection = 'column';
    navbarMenu.style.padding = '10px';
    navbarMenu.style.zIndex = '99';
});

// 模态框通用关闭逻辑（已修改为支持动画）
modalClose.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.classList.remove('show');
        // 动画结束后隐藏display
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
});

// 点击模态框外部关闭（已修改为支持动画）
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            // 动画结束后隐藏display
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
});

// 知识库模态框交互（修复可重复点击）
kbBtn.addEventListener('click', () => {
    // 先恢复display显示，再触发动画
    knowledgeBaseModal.style.display = 'flex';
    setTimeout(() => {
        knowledgeBaseModal.classList.add('show');
    }, 10); // 10ms延迟确保display生效
    renderCustomKbList();
});

// 更多按钮 - 设置模态框（修复可重复点击）
moreBtn.addEventListener('click', () => {
    // 先恢复display显示，再触发动画
    settingsModal.style.display = 'flex';
    setTimeout(() => {
        settingsModal.classList.add('show');
    }, 10); // 10ms延迟确保display生效
});

// 切换知识库按钮事件
document.getElementById('officialKbBtn').addEventListener('click', () => {
    switchKbType('official');
});

document.getElementById('customKbBtn').addEventListener('click', () => {
    switchKbType('custom');
});

// 新增：绑定自定义问答类型切换事件
fixedKbTypeBtn.addEventListener('click', () => {
    switchCustomKbType('fixed');
});

keywordKbTypeBtn.addEventListener('click', () => {
    switchCustomKbType('keyword');
});

// 保存自定义问答事件（修改：增加type字段）
document.getElementById('saveCustomKb').addEventListener('click', () => {
    const question = document.getElementById('customQuestion').value.trim();
    const answer = document.getElementById('customAnswer').value.trim();
    if (!question || !answer) {
        // 替换alert为操作提示
        showOperationTip('问题或回答是空白的!无法保存');
        return;
    }
    
    // 添加type字段标记问答类型
    customKnowledgeBase.push({ 
        question: question, 
        answer: answer,
        type: currentCustomKbType // fixed/keyword
    });
    
    saveCustomKnowledgeBase();
    renderCustomKbList();
    
    // 清空输入框
    document.getElementById('customQuestion').value = '';
    document.getElementById('customAnswer').value = '';
    
    // 替换alert为操作提示
    const tipText = `已添加${currentCustomKbType === 'fixed' ? '固定精准' : '关键词模糊'}问题: ${question}`;
    showOperationTip(tipText);
});

// 新增：绑定保存API Key事件
saveApiKeyBtn.addEventListener('click', saveDeepSeekApiKey);

// 深色模式切换
darkModeToggle.addEventListener('change', () => {
    appSettings.darkMode = darkModeToggle.checked;
    document.body.classList.toggle('dark-mode', appSettings.darkMode);
    saveSettings();
    // 新增：切换深色模式的操作提示
    showOperationTip(`已${appSettings.darkMode ? '开启' : '关闭'}夜间模式`);
});

// 字体加粗切换
fontBoldToggle.addEventListener('change', () => {
    appSettings.fontBold = fontBoldToggle.checked;
    document.body.classList.toggle('font-bold', appSettings.fontBold);
    saveSettings();
    // 新增：切换字体加粗的操作提示
    showOperationTip(`已${appSettings.fontBold ? '开启' : '关闭'}字体加粗`);
});

// 页面加载初始化
window.addEventListener('load', () => {
    // 设置欢迎消息时间
    const welcomeTime = document.querySelector('.ai-message .message-time');
    if (welcomeTime) {
        welcomeTime.textContent = getCurrentTime();
    }
    // 初始化应用设置
    initSettings();
    
    // 初始化自定义问答类型切换
    switchCustomKbType('fixed');
});



