const html = document.querySelector ('html');
const focoBt = document.querySelector ('.app__card-button--foco');
const curtoBt = document.querySelector ('.app__card-button--curto');
const longoBt = document.querySelector ('.app__card-button--longo');
const banner = document.querySelector ('.app__image');
const titulo = document.querySelector ('.app__title');
const botoes = document.querySelectorAll ('.app__card-button');

const tempoNaTela = document.getElementById ('timer');

const startPauseBt = document.getElementById ('start-pause');
const inicioContador = new Audio ('./sons/play.wav');
const pauseContador = new Audio ('./sons/pause.mp3');

let audioPausado = 0;
let isPaused = false 

startPauseBt.addEventListener ('click', () => {
    if (inicioContador.paused && audioPausado === 0) {
        inicioContador.play()
        audioPausado++
    }
    else if (audioPausado === 1 ){
        pauseContador.play();
        audioPausado = audioPausado - 1;
    }
    if (startPauseBt.innerText === 'Começar') {
        startPauseBt.innerHTML = '<i class="fas fa-pause"></i> Pausar'
    }
    else {
        startPauseBt.innerHTML = '<i class="fas fa-play"></i> Começar'
    } 
    if (isPaused) {
        inicioContador.pause
    }
    isPaused = !isPaused
});

const musicaFocoInput = document.querySelector ('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener ('change', () => {
    if (musica.paused) {
        musica.play()
    }
    else {
        musica.pause()
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto  ('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener ('click', () => {
    tempoDecorridoEmSegundos = 300
   alterarContexto ('descanso-curto')
   curtoBt.classList.add('active')
});

longoBt.addEventListener ('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto ('descanso-longo')
    longoBt.classList.add('active')
});

function alterarContexto(contexto) {
    mostrarTempo ()
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
    
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`

            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`

        default:
            break;
    }
};

const fimDoContador = new Audio ('./sons/beep.mp3')
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        fimDoContador.play ()
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
};

startPauseBt.addEventListener ('click', iniciarOuPausar)

function iniciarOuPausar () {
    if (intervaloId) {
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
};

function zerar () {
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

