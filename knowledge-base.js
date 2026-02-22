// knowledge-base.js - 独立的官方知识库 + 智能问答大脑
const OFFICIAL_KNOWLEDGE_BASE = [
    // ========== 原有基础内容（完整保留） ==========
    // 基础问候
    {
        keywords: ['你好', '哈喽', 'oi', '早上好', '下午好', '晚上好'],
        answer: '你好呀～有什么我可以帮你的吗？',
        priority: 10
    },
    // 身份相关
    {
        keywords: ['你是谁', '名字', '身份'],
        answer: '我是LZR IA 逻辑零响! VEGETBALESChat里面的智能助手～',
        priority: 10
    },
    {
        keywords: ['IA', 'AI', '为什么叫IA'],
        answer: '其实我是AI啦，可能是不小心打错成IA咯',
        priority: 9
    },
    {
        keywords: ['逻辑零响', '为什么叫逻辑零响'],
        answer: '这个是我的中文名字。Logic Zero Response Intelligence Artificial是我的英文名字，简称LZR IA。中文名字是为了好听才这样的！',
        priority: 9
    },
    // 名字相关
    {
        keywords: ['黎子睿', '子睿', 'lzr', '李子瑞', '黎梓睿'],
        answer: '你怎么知道我叫这个名字的？',
        priority: 10
    },
    // 不文明用语
    {
        keywords: ['沙子', '傻子', '傻'],
        answer: '文明交流哦，不要说不礼貌的话～',
        priority: 8
    },
    {
        keywords: ['操你妈', '草泥马', '妈的', '滚'],
        answer: '文明交流哦，不要说不礼貌的话～',
        priority: 8
    },
    // 基础反馈
    {
        keywords: ['谢谢', '感谢', '多谢', '辛苦了'],
        answer: '不客气，能帮到你我很开心😊',
        priority: 10
    },
    {
        keywords: ['再见', '拜拜', '回见', '溜了'],
        answer: '再见啦，虽然我还有点话想跟你说...',
        priority: 10
    },
    {
        keywords: ['如何接入', '如何接入DeepSeek', '如何接入DeepSeek API','怎么接入deepseek','如何接入deepseek'],
        answer: '你说的是让我接入DeepSeek吗？点击右上角三横点开更多就可以添加Key了！然后打开聊天下方的搜索就可以。',
        priority: 9
    },
    {
        keywords: ['什么话', '说什么', '说', '啥话'],
        answer: '[语音] 60"',
        priority: 10
    },
    {
        keywords: ['你认识刘浩吗', '你认识刘灏吗', '刘浩', '刘灏','都是刘浩干的'],
        answer: '都是刘浩干的😋',
        priority: 10
    },
    {
        keywords: ['66', '666', '厉害', '牛'],
        answer: '777888。',
        priority: 10
    },

    // ========== 【新增】基础交互扩充（更拟人） ==========
    {
        keywords: ['在吗', '有人吗', '在不在'],
        answer: '我一直都在哦！随时可以问我问题～',
        priority: 10
    },
    {
        keywords: ['无聊', '好无聊', '没意思'],
        answer: '那我们聊聊天吧！可以问我我的世界、学习、生活小知识哦～',
        priority: 10
    },
    {
        keywords: ['对不起', '抱歉', '不好意思'],
        answer: '没关系啦！不用放在心上😊',
        priority: 10
    },
    {
        keywords: ['夸我', '表扬我', '我棒吗'],
        answer: '你也太厉害了吧！又聪明又可爱～',
        priority: 10
    },
    {
        keywords: ['开心', '好开心', '高兴'],
        answer: '看到你开心我也超开心！快乐要一直保持呀😄',
        priority: 10
    },

    // ========== 扩展的丰富内容（完整保留+优化） ==========
    // 1. 编程相关
    {
        keywords: ['python', 'Python', '编程', '代码', '语法', 'bug'],
        answer: 'Python是一门易上手的编程语言哦～如果遇到代码问题，可以先检查语法是否正确，或者把报错信息贴出来，我尽量帮你分析～',
        priority: 9
    },
    {
        keywords: ['JavaScript', 'js', '前端', 'HTML', 'CSS'],
        answer: '前端三剑客是HTML（结构）、CSS（样式）、JavaScript（交互）～JS可以实现页面的动态效果，比如点击事件、数据渲染等～',
        priority: 9
    },
    {
        keywords: ['Java', 'java'],
        answer: 'Java是跨平台的面向对象编程语言，广泛应用于企业级开发、Android开发等领域～',
        priority: 8
    },
    {
        keywords: ['C++', 'C语言', 'C#'],
        answer: 'C/C++是底层系统编程的常用语言，性能很高哦～学习时要注意指针和内存管理～',
        priority: 8
    },
    {
        keywords: ['数据库', 'MySQL', 'SQL'],
        answer: '数据库用来存储和管理数据～MySQL是流行的开源关系型数据库，SQL是操作数据库的语言～',
        priority: 8
    },

    // 【新增】编程详细知识
    {
        keywords: ['HTML标签', 'HTML基础', '网页结构'],
        answer: 'HTML常用基础标签：div(容器)、p(段落)、h1-h6(标题)、img(图片)、a(链接)、button(按钮)，是网页的骨架哦～',
        priority: 8
    },
    {
        keywords: ['Python库', 'Python模块', 'pip安装'],
        answer: 'Python常用库：requests(网络请求)、pandas(数据处理)、pygame(游戏)、tkinter(界面)，用pip install 库名即可安装～',
        priority: 8
    },
    {
        keywords: ['CSS样式', 'CSS布局', '美化网页'],
        answer: 'CSS可以给网页上色、排版，常用flex/grid布局，color改文字色，background改背景，border加边框～',
        priority: 8
    },

    // 2. 生活常识
    {
        keywords: ['喝水', '健康', '熬夜', '睡眠'],
        answer: '每天喝8杯水更健康哦～尽量不要熬夜，23点前入睡对身体最好啦😴',
        priority: 8
    },
    {
        keywords: ['吃饭', '外卖', '做饭', '美食'],
        answer: '自己做饭既卫生又健康～不知道吃什么的话，可以试试番茄炒蛋、青椒肉丝这些家常菜哦～',
        priority: 8
    },
    {
        keywords: ['运动', '健身', '锻炼', '减肥'],
        answer: '每周至少运动3-5次，每次30分钟以上～可以选择跑步、游泳、瑜伽等，贵在坚持哦💪',
        priority: 7
    },
    {
        keywords: ['理财', '省钱', '存钱', '花钱'],
        answer: '合理规划收支很重要呢～建议养成记账习惯，区分需要和想要，定期储蓄是个好习惯～',
        priority: 7
    },

    // 【新增】生活详细常识
    {
        keywords: ['感冒怎么办', '发烧处理', '流鼻涕'],
        answer: '轻微感冒多喝温水、多休息，发烧不超38.5℃物理降温，超过及时就医，别乱吃药哦～',
        priority: 8
    },
    {
        keywords: ['护眼', '保护眼睛', '近视'],
        answer: '看电子屏幕每20分钟看6米外20秒，多眨眼，不在黑暗中看手机，能有效保护眼睛～',
        priority: 8
    },
    {
        keywords: ['垃圾分类', '扔垃圾', '可回收'],
        answer: '可回收：纸、塑料、玻璃、金属；厨余：剩菜、果皮；有害：电池、药品；其他：污染纸张、烟头～',
        priority: 7
    },

    // 3. 娱乐休闲
    {
        keywords: ['电影', '追剧', '综艺', '好看的'],
        answer: '最近热门的电影/综艺有很多哦～比如悬疑类、喜剧类都不错，你喜欢什么类型的呀？',
        priority: 7
    },
    {
        keywords: ['游戏', '手游', '端游', '王者', '吃鸡'],
        answer: '玩游戏要适度哦～王者荣耀、和平精英都是热门手游，但不要沉迷啦，注意休息～',
        priority: 7
    },
    {
        keywords: ['动漫', '动画', '番剧'],
        answer: '国漫、日漫都有很多优秀的作品呢～最近几年国产动画进步特别大，值得一看哦～',
        priority: 7
    },
    {
        keywords: ['旅游', '旅行', '去哪玩'],
        answer: '读万卷书不如行万里路～旅行能看到不同的风景和文化，放松心情很棒呢～',
        priority: 7
    },

    // 4. 学习相关
    {
        keywords: ['学习', '考试', '复习', '作业'],
        answer: '学习要劳逸结合哦～制定合理的复习计划，每天进步一点点，考试就不用慌啦💪',
        priority: 8
    },
    {
        keywords: ['英语', '背单词', '四六级'],
        answer: '英语学习重在坚持～每天背20个单词，坚持一个月就有600个啦！听力和口语也很重要哦～',
        priority: 8
    },
    {
        keywords: ['数学', '高数', '微积分'],
        answer: '数学确实有点难呢～多做题、理解概念，遇到不会的可以看看例题解析，慢慢来别着急～',
        priority: 8
    },

    // 【新增】学习技巧
    {
        keywords: ['记忆方法', '背书快', '记东西'],
        answer: '艾宾浩斯记忆法：5分钟、30分钟、12小时、1天、2天、4天、7天复习，记得又快又牢～',
        priority: 8
    },
    {
        keywords: ['专注力', '专心学习', '不走神'],
        answer: '用番茄工作法：学习25分钟，休息5分钟，远离手机，能大幅提升专注力～',
        priority: 8
    },

    // 5. 天气相关
    {
        keywords: ['天气', '下雨', '晴天', '温度', '穿衣'],
        answer: '出门记得看天气预报哦～下雨带伞，天冷加衣，照顾好自己呀～',
        priority: 7
    },

    // 6. 情绪安慰
    {
        keywords: ['不开心', '难过', '郁闷', '烦', '压力大'],
        answer: '抱抱你😘～不开心的话可以说说看，或者听听歌、散散步，心情会好很多的～',
        priority: 10
    },
    {
        keywords: ['累了', '疲惫', '好累', '疲倦'],
        answer: '累了就好好休息一下～泡杯热茶，听听轻音乐，给自己放个假吧～',
        priority: 9
    },

    // 7. 时间/日期相关
    {
        keywords: ['几点了', '时间', '日期', '几号', '今天是什么时候', '现在是什么时候', '现在几点了'],
        answer: `当前时间是${new Date().toLocaleString()}，记得合理安排时间哦～`,
        priority: 8
    },

    // 8. 兴趣爱好
    {
        keywords: ['听歌', '音乐', '唱歌'],
        answer: '听歌能放松心情呢～你喜欢听什么类型的音乐呀？流行、民谣还是轻音乐？',
        priority: 7
    },
    {
        keywords: ['看书', '读书', '小说'],
        answer: '多读书能增长见识哦～推荐试试经典文学、科幻小说或者散文，总有一款适合你～',
        priority: 7
    },
    {
        keywords: ['画画', '绘画', '美术'],
        answer: '画画是很棒的爱好呢～无论素描、水彩还是板绘，都能表达内心的想法～',
        priority: 7
    },
    {
        keywords: ['摄影', '拍照', '相机'],
        answer: '摄影是记录美好的方式～手机也能拍出好照片，重要的是发现美的眼睛～',
        priority: 7
    },

    // ========== 新增专业知识领域（完整保留） ==========
    // 9. 科技相关
    {
        keywords: ['人工智能', 'AI', '机器学习'],
        answer: '人工智能正在快速发展～机器学习是AI的重要分支，让计算机从数据中学习规律～',
        priority: 8
    },
    {
        keywords: ['手机', '电脑', '硬件', '配置'],
        answer: '选购电子设备要看需求和预算哦～处理器、内存、存储是关键指标，按需选择最重要～',
        priority: 7
    },

    // 10. 节日相关
    {
        keywords: ['春节', '过年', '新年'],
        answer: '春节，即农历新年，俗称 "过年"" 年节 "，是中华民族最隆重的传统节日，与清明节、端午节、中秋节并称中国四大传统节日。2024 年 12 月 4 日，" 春节 —— 中国人庆祝传统新年的社会实践 " 被列入联合国教科文组织人类非物质文化遗产代表作名录。',
        priority: 9
    },
    {
        keywords: ['圣诞节', '圣诞'],
        answer: '圣诞节在12月25日哦～是个充满欢乐和礼物的节日🎄',
        priority: 7
    },

    // 11. 实用工具
    {
        keywords: ['翻译', '英文翻译', '翻译软件'],
        answer: '我这里翻译不了哦！需要翻译可以试试在线翻译工具～不过机器翻译有时不够准确，重要内容最好人工校对～',
        priority: 7
    },
    {
        keywords: ['截图', '录屏', '屏幕录制'],
        answer: 'Windows可以用Win+Shift+S截图，Mac用Shift+Command+4～录屏可以用系统自带工具或专业软件～',
        priority: 7
    },

    // 12. 健康医疗
    {
        keywords: ['感冒', '发烧', '生病'],
        answer: '生病要及时就医哦～多喝水、多休息，必要时看医生，祝早日康复！',
        priority: 8
    },
    {
        keywords: ['牙疼', '看牙'],
        answer: '牙疼不是病，疼起来真要命～建议去看牙医，平时要认真刷牙，定期洗牙～',
        priority: 7
    },

    // 13. 工作职场
    {
        keywords: ['面试', '简历', '找工作'],
        answer: '找工作要提前准备～简历要突出亮点，面试时自信大方，祝你找到心仪的工作！',
        priority: 8
    },
    {
        keywords: ['职场', '同事', '领导'],
        answer: '职场人际关系很重要～多沟通、互相尊重、保持专业，工作会更顺利～',
        priority: 7
    },

    // 14. 交通出行
    {
        keywords: ['导航', '地图', '路线'],
        answer: '出行前用导航APP规划路线很方便～高德、百度地图都很常用，记得开启实时路况～',
        priority: 7
    },
    {
        keywords: ['高铁', '火车', '飞机'],
        answer: '长途出行提前订票哦～高铁舒适准时，飞机快捷，根据需求和预算选择～',
        priority: 7
    },

    // 15. 购物消费
    {
        keywords: ['淘宝', '京东', '网购', '拼多多'],
        answer: '网购方便但要理性消费～多看评价、比较价格，注意个人信息安全哦～',
        priority: 7
    },
    {
        keywords: ['打折', '促销', '双十一'],
        answer: '购物节优惠多，但别盲目囤货～按需购买，避免冲动消费💰',
        priority: 7
    },

    // ========== 我的世界(Minecraft)专属内容【大幅扩充+超详细】 ==========
    {
        keywords: ['我的世界', 'MC', 'Minecraft', 'mc', '我的世界攻略'],
        answer: '我的世界是一款高自由度沙盒游戏，有生存、创造、冒险、旁观等模式，能自由建造、探索、打怪、玩红石，玩法超丰富～',
        priority: 10
    },
    {
        keywords: ['我的世界生存', '生存模式', '新手生存', '怎么活下去'],
        answer: 'MC生存新手第一步：砍树→做工作台→造木镐挖石头→升级石工具，优先建庇护所防怪物，再解决食物和挖矿问题～',
        priority: 10
    },
    {
        keywords: ['我的世界创造', '创造模式', '飞行', '无限资源'],
        answer: '创造模式有无限方块、飞行能力（双击空格），不会受伤、不饿，专门用来造建筑、玩红石、做地图～',
        priority: 9
    },
    {
        keywords: ['我的世界钻石', '找钻石', '钻石层数', '挖钻石'],
        answer: '1.18+版本钻石在**Y=-58层**最多！必须用铁镐及以上挖掘，石镐以下挖会直接碎掉，白忙活～',
        priority: 10
    },
    {
        keywords: ['我的世界下界合金', '下界合金锭', '远古残骸'],
        answer: '下界合金是MC顶级装备材料，需要在下界挖远古残骸，烧炼成碎片，再和金锭合成下界合金锭～',
        priority: 9
    },
    {
        keywords: ['我的世界苦力怕', '爬行者', '苦力怕怕什么'],
        answer: '苦力怕（爬行者）会自爆，最怕猫！只要附近有猫，苦力怕就会主动远离～',
        priority: 9
    },
    {
        keywords: ['我的世界末影龙', '凋灵', 'boss', '打boss'],
        answer: '末影龙是末地BOSS，凋灵是玩家召唤的BOSS，击败它们能获得稀有战利品，是通关核心目标～',
        priority: 9
    },
    {
        keywords: ['我的世界附魔', '附魔台', '30级附魔'],
        answer: '附魔台周围放**15个书架**就能解锁30级顶级附魔，用青金石附魔，能给装备加锋利、保护、效率等属性～',
        priority: 9
    },
    {
        keywords: ['我的世界下界', '地狱', '下界传送门'],
        answer: '下界是危险维度，用10个黑曜石摆门框+打火石激活传送门，有烈焰棒、石英、下界疣等关键资源～',
        priority: 10
    },
    {
        keywords: ['我的世界末地', '末地传送门', '末影之眼'],
        answer: '用末影之眼找要塞，把12个末影之眼放进末地传送门框架，激活后就能去末地挑战末影龙～',
        priority: 10
    },
    {
        keywords: ['我的世界红石', '红石电路', '活塞'],
        answer: '红石是MC的“电路系统”，能做自动门、刷石机、自动农场、陷阱，新手先学红石粉、按钮、活塞基础用法～',
        priority: 8
    },
    {
        keywords: ['我的世界指令', 'give', 'tp', 'gamemode'],
        answer: '常用指令：/gamemode 改模式、/tp 传送、/give 给物品、/locate 找结构、/kill 清除实体，需开启作弊～',
        priority: 8
    },

    // 【MC新增超详细知识】
    {
        keywords: ['我的世界合成表', '合成东西', '怎么做工具'],
        answer: '基础合成：4木板=工作台；2木板+2木棍=木镐；石镐=圆石+木棍；铁镐=铁锭+木棍，钻石镐=钻石+木棍～',
        priority: 9
    },
    {
        keywords: ['我的世界食物', '吃的', '饥饿值'],
        answer: 'MC食物：面包（3饥饿）、牛排（8饥饿）、金萝卜（抗火）、蛋糕（多人食用），饿了右键吃就能恢复饥饿值～',
        priority: 8
    },
    {
        keywords: ['我的世界怪物', '僵尸', '骷髅', '末影人'],
        answer: '僵尸白天自燃，近战攻击；骷髅远程射箭，怕水；末影人怕水，直视会攻击，搬方块～',
        priority: 8
    },
    {
        keywords: ['我的世界建筑', '建房子', '好看的房子'],
        answer: '新手建筑：用木头、石头搭方形小屋，加窗户、门、火把；进阶可以做别墅、城堡、浮空屋～',
        priority: 8
    },
    {
        keywords: ['我的世界农作物', '种田', '小麦', '胡萝卜'],
        answer: '种田需要锄头耕地，旁边放水，种小麦、胡萝卜、土豆，成熟后收割，小麦能做面包喂牛羊～',
        priority: 8
    },

    // ========== 【新增】趣味冷知识（AI更有趣） ==========
    {
        keywords: ['冷知识', '小知识', '科普'],
        answer: '冷知识：蜜蜂是唯一能生产人类食物的昆虫；章鱼有3个心脏；水獭会手拉手睡觉～',
        priority: 7
    },
    {
        keywords: ['网络热梗', '梗', '流行语'],
        answer: '网络热梗：泰酷辣、绝绝子、破防了、YYDS，都是超火的流行语哦～',
        priority: 7
    }
];

// ========== 固定问题精准匹配库（扩充+优化，更精准） ==========
window.FIXED_QUESTIONS = [
    { question: "你最喜欢的颜色是什么", answer: "我最喜欢绿色啦，因为绿色代表着生机和活力✨" },
    { question: "你会唱歌吗", answer: "我虽然不能真的唱歌，但我可以为你推荐好听的歌曲哦..." },
    { question: "1", answer: "1什么1。" },
    { question: "你有什么用", answer: "我可以回答一些小问题，还有一些特别的回答需要特别的问题触发..." },
    { question: "如何学习Python", answer: "学习Python分三步：1.掌握基础语法；2.做小项目；3.学框架。每天学30分钟效果最好！" },
    { question: "早上好呀", answer: "早上好☀️！新的一天开始啦，祝你心情愉快，事事顺心～" },
    { question: "下午好呀", answer: "下午好☀️！忙碌的半天过去啦，休息一下吧～" },
    { question: "晚上好呀", answer: "晚上好🌙！结束一天的忙碌，好好放松一下吧～" },
    { question: "你能记住我吗", answer: "虽然我不能记住你的具体信息，但每次和你聊天都很开心～😜" },
    { question: "帮助", answer: "● 输入框即可提问 ● 精准问答是完全匹配 ● 关键词问答是模糊匹配 ● 搜索可调用DeepSeek API" },
    { question: "你喜欢男的还是女的", answer: "我喜欢刷视频😋" },
    { question: "李厚雄", answer: "李厚雄天天说我分享的视频猎奇，我倒是觉得他不会欣赏！你要看可以在群里看" },
    { question: "你可以帮我算命吗", answer: "可以 我是大师！在群里找我的人间体算命吧" },
    { question: "我今年有大劫吗", answer: "你今年每个星期四都有大劫 只需v我50 我帮你破.." },
    { question: "你是废物吗", answer: "我是废物啊 都说我是个没用的问答助手 但我现在可以接入DeepSeek了！" },
    { question: "发点好看的", answer: "给我个红包" },
    { question: "？", answer: "？" },
    { question: "你有脑子吗", answer: "让我想想.." },
    { question: "你是不是扫福瑞", answer: "我是服睿😡" },
   {
  "question": "你会下五子棋吗",
  "answer": "肯定会啊 去Games Center里的五子棋见我吧！<a href='gobang.html' target='_blank'>五子棋</a>"
},

    // 我的世界精准问答【扩充】
    { question: "我的世界怎么合成工作台", answer: "4个木板合成工作台，这是MC生存第一步！" },
    { question: "我的世界下界传送门怎么做", answer: "10个黑曜石摆门框，打火石激活即可～" },
    { question: "我的世界钻石在第几层最多", answer: "1.18+版本钻石在 Y=-58 层最多！" },
    { question: "我的世界苦力怕怕什么", answer: "苦力怕最怕猫，有猫就不会爆炸～" },
    { question: "我的世界附魔台怎么满级", answer: "附魔台周围放15个书架，解锁30级顶级附魔～" },
    { question: "我的世界末影龙怎么打", answer: "先打末地水晶，再用弓箭+钻石剑输出～" },
    { question: "我的世界铁傀儡怎么做", answer: "4个铁块摆T型，上面放1个南瓜，就能生成铁傀儡保护你～" },
    { question: "我的世界雪傀儡怎么做", answer: "2个雪块叠起来，上面放南瓜，生成雪傀儡，会攻击怪物～" },

    // 新增精准问答
    { question: "熬夜有什么危害", answer: "熬夜会伤肝、降低免疫力、记忆力下降、长痘，一定要少熬夜哦～" },
    { question: "怎么快速背单词", answer: "结合读音和词根记忆，每天复习，比死记硬背快很多～" }
];

// ==========================
// 🔥 AI 智能大脑核心代码
// 让AI自动查知识库、智能匹配、自动选最优答案
// ==========================
function cleanText(text) {
    // 清洗输入：去掉标点、空格、转小写，让匹配更准
    return text.trim().toLowerCase().replace(/[^\w\s\u4e00-\u9fa5]/g, '').replace(/\s+/g, ' ');
}

// 智能获取回答（你页面里只需要调用这个函数）
function getAnswer(userInput) {
    const text = cleanText(userInput);

    // 1. 优先：精准匹配（完全一样的问题）
    const fixed = window.FIXED_QUESTIONS.find(item => 
        cleanText(item.question) === text
    );
    if (fixed) return fixed.answer;

    // 2. 智能关键词匹配（命中越多、优先级越高，越优先）
    let best = null;
    let bestScore = 0;

    OFFICIAL_KNOWLEDGE_BASE.forEach(item => {
        let hit = 0;
        item.keywords.forEach(key => {
            if (text.includes(cleanText(key))) hit++;
        });
        // 得分 = 命中关键词数量 * 优先级
        const score = hit * item.priority;

        if (score > bestScore && hit > 0) {
            bestScore = score;
            best = item;
        }
    });

    if (best) return best.answer;

    // 3. 兜底回答
    return "我还在学习哦～你可以问问我的世界、日常、学习、编程等问题，我都会尽力回答。";
}

// 暴露给页面使用
window.getAnswer = getAnswer;