        function showText() {
            var input = document.getElementById('inputBox').value;
            var transformedInput = "";

            for (var i = 0; i < input.length; i++) {
                transformedInput += input[i] + "⁥";
            }

            
            document.getElementById('outputText').innerText = transformedInput;
        }

        function copyToClipboard() {
            var textToCopy = document.getElementById('outputText').innerText;
            var textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
