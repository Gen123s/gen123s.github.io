// ==============================================
// LZR IA - 五子棋人机大脑（独立封装版）
// 功能：根据难度提供不同强度的落子决策
// 难度：简单 / 默认 / 困难
// ==============================================
const LZR_IA_WUZIQI = {
    // 棋盘坐标方向：横、竖、左斜、右斜
    dirs: [[1,0],[0,1],[1,1],[1,-1]],

    // 棋子评分体系（越关键分越高）
    scoreMap: {
        // 玩家（蓝方=1）
        1: {
            1: 10,    // 1子
            2: 100,   // 2子
            3: 1000,  // 3子
            4: 10000, // 4子（绝杀）
            5: 100000 // 5子（胜利）
        },
        // AI（红方=2）
        2: {
            1: 20,    // 1子（AI进攻权重更高）
            2: 200,   // 2子
            3: 2000,  // 3子
            4: 20000, // 4子
            5: 200000 // 5子
        }
    },

    // ==============================================
    // 【AI大脑入口】根据难度获取最佳落子
    // ==============================================
    getBestMove(board, boardSize, difficulty) {
        let emptyList = this.getEmptyList(board, boardSize);
        if (emptyList.length === 0) return { x:7, y:7 };

        // 难度1：简单 → 低概率防守 + 大部分随机
        if (difficulty === "easy") {
            let rand = emptyList[Math.floor(Math.random() * emptyList.length)];
            let defend = this.findDefenseOnly(board, boardSize);
            return Math.random() > 0.4 ? defend || rand : rand;
        }

        // 难度2：默认 → 正常进攻 + 正常防守
        if (difficulty === "normal") {
            return this.getHighestScorePos(board, boardSize, false);
        }

        // 难度3：困难 → 极致进攻 + 完美防守 + 预判杀棋
        if (difficulty === "hard") {
            return this.getHighestScorePos(board, boardSize, true);
        }

        return { x:7, y:7 };
    },

    // ==============================================
    // 核心：给每个空位打分 → 选最高分
    // ==============================================
    getHighestScorePos(board, boardSize, isHardMode) {
        let maxScore = -Infinity;
        let bestPos = { x:7, y:7 };

        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
                if (board[y][x] !== 0) continue;

                let score = this.evalPoint(board, boardSize, x, y, isHardMode);
                if (score > maxScore) {
                    maxScore = score;
                    bestPos = { x, y };
                }
            }
        }
        return bestPos;
    },

    // ==============================================
    // 评估单个点的价值（进攻分 + 防守分）
    // ==============================================
    evalPoint(board, boardSize, x, y, isHardMode) {
        let score = 0;
        // 模拟AI落子（进攻）
        board[y][x] = 2;
        score += this.countLineScore(board, boardSize, x, y, 2) * (isHardMode ? 1.5 : 1);
        board[y][x] = 0;

        // 模拟玩家落子（防守）
        board[y][x] = 1;
        score += this.countLineScore(board, boardSize, x, y, 1) * (isHardMode ? 1.2 : 1);
        board[y][x] = 0;

        return score;
    },

    // ==============================================
    // 计算一个点四个方向的连子分数
    // ==============================================
    countLineScore(board, boardSize, x, y, player) {
        let total = 0;
        for (let [dx, dy] of this.dirs) {
            let c = 0;
            // 正向
            for (let i = 1; i < 5; i++) {
                let nx = x + dx*i, ny = y + dy*i;
                if (nx >=0 && nx < boardSize && ny >=0 && ny < boardSize && board[ny][nx] === player) c++;
                else break;
            }
            // 反向
            for (let i = 1; i < 5; i++) {
                let nx = x - dx*i, ny = y - dy*i;
                if (nx >=0 && nx < boardSize && ny >=0 && ny < boardSize && board[ny][nx] === player) c++;
                else break;
            }
            total += this.scoreMap[player][Math.min(c,5)] || 0;
        }
        return total;
    },

    // ==============================================
    // 简单难度专用：只堵3连/4连
    // ==============================================
    findDefenseOnly(board, boardSize) {
        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
                if (board[y][x] !== 0) continue;
                board[y][x] = 1;
                let s = this.countLineScore(board, boardSize, x, y, 1);
                board[y][x] = 0;
                if (s > 1000) return {x,y};
            }
        }
        return null;
    },

    // ==============================================
    // 获取所有空点
    // ==============================================
    getEmptyList(board, boardSize) {
        let list = [];
        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
                if (board[y][x] === 0) list.push({x,y});
            }
        }
        return list;
    }
};