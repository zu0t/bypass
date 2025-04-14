function showText() {
    const input = document.getElementById('inputBox').value;
    const method = document.getElementById('bypassSelect').value;
    let transformedInput = '';

    const cyrillicMap = {
        'a': 'а', 'b': 'Ь', 'c': 'с', 'e': 'е', 'h': 'н', 'i': 'і', 'j': 'ј',
        'k': 'к', 'm': 'м', 'n': 'п', 'o': 'о', 'p': 'р', 's': 'ѕ', 't': 'т',
        'u': 'ц', 'x': 'х', 'y': 'у', 'z': 'ᴢ',
        'A': 'А', 'B': 'В', 'C': 'С', 'E': 'Е', 'H': 'Н', 'I': 'І', 'J': 'Ј',
        'K': 'К', 'M': 'М', 'N': 'П', 'O': 'О', 'P': 'Р', 'S': 'Ѕ', 'T': 'Т',
        'U': 'Ц', 'X': 'Х', 'Y': 'У', 'Z': 'Ζ'
    };

    switch (method) {
        case 'unicode':
            const unicodeMap = {
                'a': '𝖆', 'e': '𝖊', 'i': '𝖎', 'o': '𝖔', 'u': '𝖚', 's': '𝖘',
                'A': '𝕬', 'E': '𝕰', 'I': '𝕴', 'O': '𝕺', 'U': '𝖀', 'S': '𝕾'
            };
            for (let char of input) {
                transformedInput += unicodeMap[char] || char;
            }
            break;

        case 'emoji':
            for (let char of input) {
                transformedInput += char + '▪️';
            }
            break;

        case 'dot':
            transformedInput = input.split('').join('.');
            break;

        case 'rot13':
            transformedInput = input.replace(/[a-zA-Z]/g, function (c) {
                return String.fromCharCode(
                    (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13)
                        ? c : c - 26
                );
            });
            break;

        case 'reverse':
            transformedInput = input.split('').reverse().join('');
            break;

        case 'cyrillic':
            for (let char of input) {
                transformedInput += cyrillicMap[char] || char;
            }
            break;

        case 'strikethrough':
            for (let char of input) {
                transformedInput += char + '\u0336';
            }
            break;

        case 'base64':
            transformedInput = btoa(input);
            break;

        case 'combo':
            for (let char of input) {
                let c = cyrillicMap[char] || char;
                c += '\u2060';
                transformedInput += c;
            }
            break;

        case 'invisible':
        default:
            for (let char of input) {
                transformedInput += char + '\u2060';
            }
    }

    document.getElementById('outputText').innerText = transformedInput;
}

function copyToClipboard() {
    const textToCopy = document.getElementById('outputText').innerText;
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}
