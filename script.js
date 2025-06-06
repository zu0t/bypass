document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('inputBox');
    const bypassSelect = document.getElementById('bypassSelect');
    const outputText = document.getElementById('outputText');
    const copyButton = document.getElementById('copyButton');
    const copyButtonText = copyButton.querySelector('span');

    const cyrillicMap = {
        'a': 'а', 'b': 'Ь', 'c': 'с', 'e': 'е', 'h': 'н', 'i': 'і', 'j': 'ј',
        'k': 'к', 'm': 'м', 'n': 'п', 'o': 'о', 'p': 'р', 's': 'ѕ', 't': 'т',
        'u': 'ц', 'x': 'х', 'y': 'у', 'z': 'ᴢ',
        'A': 'А', 'B': 'В', 'C': 'С', 'E': 'Е', 'H': 'Н', 'I': 'І', 'J': 'Ј',
        'K': 'К', 'M': 'М', 'N': 'П', 'O': 'О', 'P': 'Р', 'S': 'Ѕ', 'T': 'Т',
        'U': 'Ц', 'X': 'Х', 'Y': 'У', 'Z': 'Ζ'
    };

    const unicodeMap = {
        'a': '𝖆', 'e': '𝖊', 'i': '𝖎', 'o': '𝖔', 'u': '𝖚', 's': '𝖘',
        'A': '𝕬', 'E': '𝕰', 'I': '𝕴', 'O': '𝕺', 'U': '𝖀', 'S': '𝕾'
    };

    function showText() {
        const input = inputBox.value;
        const method = bypassSelect.value;
        let transformedInput = '';

        switch (method) {
            case 'unicode':
                transformedInput = input.split('').map(char => unicodeMap[char] || char).join('');
                break;
            case 'emoji':
                transformedInput = input.split('').join('▪️');
                break;
            case 'dot':
                transformedInput = input.split('').join('.');
                break;
            case 'rot13':
                transformedInput = input.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
                break;
            case 'reverse':
                transformedInput = input.split('').reverse().join('');
                break;
            case 'cyrillic':
                transformedInput = input.split('').map(char => cyrillicMap[char] || char).join('');
                break;
            case 'strikethrough':
                transformedInput = input.split('').join('\u0336');
                break;
            case 'base64':
                try {
                    transformedInput = btoa(input);
                } catch (e) {
                    transformedInput = "Error: Invalid character for Base64 encoding.";
                }
                break;
            case 'combo':
                transformedInput = input.split('').map(char => (cyrillicMap[char] || char) + '\u2060').join('');
                break;
            case 'invisible':
            default:
                transformedInput = input.split('').join('\u2060');
                break;
        }

        outputText.textContent = transformedInput;
    }

    function copyToClipboard() {
        const textToCopy = outputText.textContent;
        if (!textToCopy || copyButton.classList.contains('copied')) return;

        const showFeedback = (success = true) => {
            if (success) {
                copyButtonText.textContent = 'Copied!';
                copyButton.classList.add('copied');
            } else {
                copyButtonText.textContent = 'Error!';
            }
            
            setTimeout(() => {
                copyButtonText.textContent = 'Copy Result';
                copyButton.classList.remove('copied');
            }, 2000);
        };

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => showFeedback(true)).catch(() => showFeedback(false));
        } else {

            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;

            textArea.style.position = 'absolute';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showFeedback(true);
            } catch (err) {
                console.error('Fallback copy failed', err);
                showFeedback(false);
            }
            document.body.removeChild(textArea);
        }
    }

    inputBox.addEventListener('input', showText);
    bypassSelect.addEventListener('change', showText);
    copyButton.addEventListener('click', copyToClipboard);

    showText();
});

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('current-year').textContent = new Date().getFullYear();
});
