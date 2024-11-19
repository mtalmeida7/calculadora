// Função para adicionar um valor ao display
function addToDisplay(value) {
    const display = document.getElementById('display');
    
    // Se o display for '0', substitui-o pelo valor clicado
    if (display.textContent === '0') {
        display.textContent = (value === 'x' ? '×' : value === '÷' ? '÷' : value);
    } else {
        // Caso contrário, adiciona o valor ao display
        display.textContent += (value === 'x' ? '×' : value === '÷' ? '÷' : value);
    }

    updateClearButton(); // Atualiza o texto do botão ao digitar
}

// Função para realizar o cálculo
function calculate() {
    try {
        const display = document.getElementById('display');
        expression = display.textContent;
        // Substitui a vírgula por ponto para facilitar a operação aritmética
        expression = expression.replaceAll(',', '.');

        // Substitui os símbolos '×' e '÷' por operadores matemáticos válidos
        display.textContent = eval(expression.replace('×', '*').replace('÷', '/')).toFixed(2).replace('.', ',');  

    } catch (error) {
        // Se houver algum erro na expressão, exibe 'Error'
        display.textContent = error;
    }
}

// Alterna entre limpar tudo (AC) ou apagar o último caractere (⌫)
function handleClear() {
    const display = document.getElementById('display');
    const clearBtn = document.getElementById('clear-btn');
    
    if (clearBtn.textContent === 'AC') {
        clearDisplay(); // Limpa o display inteiro
    } else {
        deleteLast(); // Apaga o último caractere
    }
}

// Apaga o último caractere no display
function deleteLast() {
    const display = document.getElementById('display');
    // Remove o último caractere ou retorna '0' se o display estiver vazio
    display.textContent = display.textContent.slice(0, -1) || '0'; 
    updateClearButton(); // Atualiza o texto do botão
}

// Limpa o display completamente
function deleteAll() {
    const display = document.getElementById('display');
    display.textContent = '0'; // Reseta o display para '0'
    updateClearButton(); // Atualiza o texto do botão
}

// Atualiza o texto do botão entre AC e ⌫
function updateClearButton() {
    const display = document.getElementById('display');
    const clearBtn = document.getElementById('clear-btn');
    // Se o display for '0', mostra 'AC', caso contrário, mostra '⌫'
    clearBtn.textContent = display.textContent === '0' ? 'AC' : '⌫';
}

// Limpa o display e mantém o botão em "AC"
function clearDisplay() {
    const display = document.getElementById('display');
    display.textContent = '0';
    updateClearButton();
}

// Função que simula o "click" no botão e adiciona a classe active
function simulateButtonClick(key) {
    const button = document.querySelector(button[data-key="${key}"]);
    if (button) {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 150); // Tempo similar ao efeito de clique
    }
}

// Função que lida com as ações de teclado
function handleKeyboardInput(event) {
    const key = event.key; // Captura a tecla pressionada
    const display = document.getElementById('display');

    // Mapeamento das teclas para as ações correspondentes
    if (key >= '0' && key <= '9') {
        // Adiciona o número ao display
        addToDisplay(key);
        simulateButtonClick(key); // Simula o click no botão
    } else if (key === '+') {
        addToDisplay('+');
        simulateButtonClick('+'); // Simula o click no botão
    } else if (key === '-') {
        addToDisplay('-');
        simulateButtonClick('-'); // Simula o click no botão
    } else if (key === '*') 
        {
        addToDisplay('x');  // Corrigido para usar '×'
        simulateButtonClick('×'); // Simula o click no botão
    } else if (key === '/') {
        addToDisplay('÷');
        simulateButtonClick('÷'); // Simula o click no botão
    } else if (key === ',') {
        addToDisplay(',');
        simulateButtonClick(','); // Simula o click no botão
    } else if (key === 'Enter' || key === '=') {
        calculate(); // Calcula o resultado
        simulateButtonClick('='); // Simula o click no botão
    } else if (key === 'Backspace') {
        deleteLast(); // Apaga o último caractere
        simulateButtonClick('⌫'); // Simula o click no botão
    } else if (key === 'Escape') {
        clearDisplay(); // Limpa o display
        simulateButtonClick('AC'); // Simula o click no botão
    }
}

// Adiciona o evento de teclado para capturar as teclas pressionadas
document.addEventListener('keydown', handleKeyboardInput);

// Detecta o clique e segurar no botão ⌫ para apagar tudo
const clearBtn = document.getElementById('clear-btn');
let clearTimer;

// Evento de mouse down (pressionar e segurar)
clearBtn.addEventListener('mousedown', () => {
    if (clearBtn.textContent === '⌫') {
        clearTimer = setInterval(deleteAll, 700); // Apaga todo o conteúdo a cada 700ms (0.7 segundos)
    }
});

// Evento de mouse up (soltar o botão)
clearBtn.addEventListener('mouseup', () => {
    clearTimer && clearInterval(clearTimer); // Para de apagar quando o botão é solto
});

// Também adiciona os eventos para dispositivos móveis (touch)
clearBtn.addEventListener('touchstart', () => {
    if (clearBtn.textContent === '⌫') {
        clearTimer = setInterval(deleteAll, 700); // Apaga todo o conteúdo a cada 700ms (0.7 segundos)
    }
});

clearBtn.addEventListener('touchend', () => {
    clearTimer && clearInterval(clearTimer); // Para de apagar quando o botão é solto
});

// Função para alternar o valor +/- 
function toggleSign() {
    const display = document.getElementById('display');

    // Pega o valor no display
    let value = display.textContent;

    // Verifica se o valor já está entre parênteses (negativo)
    if (value !== '0' && !value.startsWith('(')) {
        // Se não estiver, coloca entre parênteses e torna negativo
        display.textContent = (${ -parseFloat(value) });
    } else if (value.startsWith('(') && value.endsWith(')')) {
        // Se já estiver entre parênteses, remove os parênteses e torna positivo
        display.textContent = value.slice(1, -1);
    }

    updateClearButton(); // Atualiza o texto do botão ao digitar
}