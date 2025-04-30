// Funcionalidade das guias
const guias = document.querySelectorAll('.guia-btn');
const conteudos = document.querySelectorAll('.conteudo-guia');

guias.forEach(guia => {
    guia.addEventListener('click', () => {
        // Remove a classe ativo de todas as guias
        guias.forEach(g => g.classList.remove('ativo'));
        // Adiciona a classe ativo à guia clicada
        guia.classList.add('ativo');
        
        // Esconde todos os conteúdos
        conteudos.forEach(conteudo => conteudo.style.display = 'none');
        // Mostra o conteúdo da guia selecionada
        const guiaId = guia.getAttribute('data-guia');
        document.getElementById(`guia-${guiaId}`).style.display = 'block';
    });
});

// Funcionalidade do cronômetro
let intervaloCronometro;
let segundosCronometro = 0;
let cronometroRodando = false;

const displayCronometro = document.getElementById('cronometro');
const botaoIniciarCronometro = document.getElementById('iniciarCronometro');
const botaoPausarCronometro = document.getElementById('pausarCronometro');
const botaoResetarCronometro = document.getElementById('resetarCronometro');

function atualizarDisplayCronometro() {
    const horas = Math.floor(segundosCronometro / 3600);
    const minutos = Math.floor((segundosCronometro % 3600) / 60);
    const segundos = segundosCronometro % 60;
    displayCronometro.textContent = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function iniciarCronometro() {
    if (!cronometroRodando) {
        cronometroRodando = true;
        intervaloCronometro = setInterval(() => {
            segundosCronometro++;
            atualizarDisplayCronometro();
        }, 1000);
    }
}

function pausarCronometro() {
    if (cronometroRodando) {
        cronometroRodando = false;
        clearInterval(intervaloCronometro);
    }
}

function resetarCronometro() {
    pausarCronometro();
    segundosCronometro = 0;
    atualizarDisplayCronometro();
}


// Funcionalidade da contagem regressiva
let intervaloContagem;
let segundosContagem = 0;
let contagemRodando = false;

const displayContagem = document.getElementById('contagem');
const entradaHoras = document.getElementById('horas');
const entradaMinutos = document.getElementById('minutos');
const entradaSegundos = document.getElementById('segundos');
const botaoIniciarContagem = document.getElementById('iniciarContagem');
const botaoPausarContagem = document.getElementById('pausarContagem');
const botaoResetarContagem = document.getElementById('resetarContagem');

function atualizarDisplayContagem() {
    const horas = Math.floor(segundosContagem / 3600);
    const minutos = Math.floor((segundosContagem % 3600) / 60);
    const segundos = segundosContagem % 60;
    displayContagem.textContent = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function iniciarContagem() {
    if (!contagemRodando) {
        // Só carrega os valores dos campos se a contagem estiver zerada
        if (segundosContagem === 0) {
            const horas = parseInt(entradaHoras.value) || 0;
            const minutos = parseInt(entradaMinutos.value) || 0;
            const segundos = parseInt(entradaSegundos.value) || 0;
            
            if (horas === 0 && minutos === 0 && segundos === 0) return;
            
            segundosContagem = (horas * 3600) + (minutos * 60) + segundos;
        }
        
        contagemRodando = true;
        
        intervaloContagem = setInterval(() => {
            if (segundosContagem > 0) {
                segundosContagem--;
                atualizarDisplayContagem();
            } else {
                pausarContagem();
                alert('Contagem regressiva finalizada!');
            }
        }, 1000);
    }
}

function pausarContagem() {
    if (contagemRodando) {
        contagemRodando = false;
        clearInterval(intervaloContagem);
    }
}

function resetarContagem() {
    pausarContagem();
    segundosContagem = 0;
    entradaHoras.value = '';
    entradaMinutos.value = '';
    entradaSegundos.value = '';
    atualizarDisplayContagem();
}

botaoIniciarContagem.addEventListener('click', iniciarContagem);
botaoPausarContagem.addEventListener('click', pausarContagem);
botaoResetarContagem.addEventListener('click', resetarContagem); 

botaoIniciarCronometro.addEventListener('click', iniciarCronometro);
botaoPausarCronometro.addEventListener('click', pausarCronometro);
botaoResetarCronometro.addEventListener('click', resetarCronometro);