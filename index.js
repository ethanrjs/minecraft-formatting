class MinecraftFormatting {
    constructor() {
        this.minecraftToAnsi = new Map([
            ['0', '\x1b[30m'],
            ['1', '\x1b[34m'],
            ['2', '\x1b[32m'],
            ['3', '\x1b[36m'],
            ['4', '\x1b[31m'],
            ['5', '\x1b[35m'],
            ['6', '\x1b[33m'],
            ['7', '\x1b[37m'],
            ['8', '\x1b[90m'],
            ['9', '\x1b[94m'],
            ['a', '\x1b[92m'],
            ['b', '\x1b[96m'],
            ['c', '\x1b[91m'],
            ['d', '\x1b[95m'],
            ['e', '\x1b[93m'],
            ['f', '\x1b[97m'],
            ['l', '\x1b[1m'],
            ['m', '\x1b[4m'],
            ['n', '\x1b[9m'],
            ['r', '\x1b[0m']
        ]);

        this.backgroundColors = new Map([
            ['!', '\x1b[40m'],
            ['@', '\x1b[44m'],
            ['#', '\x1b[42m'],
            ['$', '\x1b[46m'],
            ['%', '\x1b[41m'],
            ['^', '\x1b[45m'],
            ['&', '\x1b[43m'],
            ['*', '\x1b[47m'],
            ['(', '\x1b[100m'],
            [')', '\x1b[104m'],
            ['A', '\x1b[102m'],
            ['B', '\x1b[106m'],
            ['C', '\x1b[101m'],
            ['D', '\x1b[105m'],
            ['E', '\x1b[103m'],
            ['F', '\x1b[107m']
        ]);

        this.formatCache = new Map();
    }

    parseFormatting(input) {
        if (this.formatCache.has(input)) {
            return this.formatCache.get(input);
        }

        const tokens = [];
        let currentText = '';
        let i = 0;

        while (i < input.length) {
            if (input[i] === '&' && i + 1 < input.length) {
                if (currentText) {
                    tokens.push({ type: 'text', content: currentText });
                    currentText = '';
                }
                const code = input[i + 1];
                if (
                    this.minecraftToAnsi.has(code.toLowerCase()) ||
                    this.backgroundColors.has(code)
                ) {
                    tokens.push({ type: 'format', code: code });
                    i += 2;
                } else {
                    currentText += '&';
                    i++;
                }
            } else {
                currentText += input[i];
                i++;
            }
        }

        if (currentText) {
            tokens.push({ type: 'text', content: currentText });
        }

        this.formatCache.set(input, tokens);
        return tokens;
    }

    colorize(input) {
        const tokens = this.parseFormatting(input);
        const formatStack = [];
        const resultParts = [];

        for (const token of tokens) {
            if (token.type === 'text') {
                resultParts.push(token.content);
            } else if (token.type === 'format') {
                const code = token.code.toLowerCase();
                if (code === 'r') {
                    formatStack.length = 0;
                    resultParts.push('\x1b[0m');
                } else {
                    const ansiCode =
                        this.minecraftToAnsi.get(code) ||
                        this.backgroundColors.get(token.code);
                    if (ansiCode) {
                        formatStack.push(ansiCode);
                        resultParts.push(ansiCode);
                    }
                }
            }
        }

        resultParts.push('\x1b[0m');
        return resultParts.join('');
    }

    colorPrint(...args) {
        console.log(
            ...args.map(arg =>
                typeof arg === 'string' ? this.colorize(arg) : arg
            )
        );
    }

    stripColors(input) {
        return input.replace(/&[0-9a-fA-F!@#$%^&*()lmnr]/g, '');
    }
}

const minecraftFormatting = new MinecraftFormatting();

module.exports = {
    colorize: (...args) => minecraftFormatting.colorize(...args),
    colorPrint: (...args) => minecraftFormatting.colorPrint(...args),
    stripColors: (...args) => minecraftFormatting.stripColors(...args)
};
