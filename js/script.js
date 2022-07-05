const animais = [
    "cachorro", "vaca", "galinha", "gato", "lobo"
];
const palavraSecreta = animais[Math.floor(Math.random() * animais.length)]; // Sorteio

const letrasErradas = [];
const letrasCorretas = [];
// Armazenar as letras nesses arrays.

document.addEventListener("keydown", (evento) => {
    const codigo = evento.keyCode // 65 - 90 (Intervalo: Letra A até a letra Z)
    if(isLetra(codigo)) {
       const letra = evento.key;
        if(letrasErradas.includes(letra)) {
            mostrarAvisoLetraRepetida();
        } else {
            if(palavraSecreta.includes(letra)) {
                letrasCorretas.push(letra); // Vai armazenar que está correta
            } else {
                letrasErradas.push(letra); // Vai armazenar que está errada
            }
        }
        atualizarJogo()
    }
})

function atualizarJogo() {
    mostrarLetrasErradas();
    mostrarLetrasCertas();
    desenharForca();
    checarjogo()
}

function mostrarLetrasErradas() {
    const div = document.querySelector(".letras-erradas-container");
    div.innerHTML = "<h3>Letras Erradas</h3>";
    letrasErradas.forEach(letra =>{
        div.innerHTML += `<span>${letra}</span>`
    });
}

function desenharForca() {
    const partesCorpo = document.querySelectorAll(".forca-parte");
    for (let i = 0; i < letrasErradas.length; i++) {
        partesCorpo[i].style.display = "block";
    }
}

function checarjogo() {
    let mensagem = "";
    const container = document.querySelector(".palavra-secreta-container");
    const partesCorpo = document.querySelectorAll(".forca-parte");

    if(letrasErradas.length === partesCorpo.length) {
        mensagem = "Fim de jogo! Você perdeu!";
    }

    if(palavraSecreta === container.innerText) {
        mensagem = "Parabéns! Você ganhou!";
    }

    if(mensagem) {
        document.querySelector('#mensagem').innerHTML = mensagem;
        document.querySelector('.popup-container').style.display = "flex";
    }
}

function mostrarAvisoLetraRepetida() {
    const aviso = document.querySelector(".aviso-palavra-repetida");
    aviso.classList.add("show");
    setTimeout(() =>{
        aviso.classList.remove("show");
    }, 1000);
}

function mostrarLetrasCertas() {
    const container = document.querySelector(".palavra-secreta-container");
    container.innerHTML = "";

    palavraSecreta.split("").forEach(letra =>{
        if(letrasCorretas.includes(letra)) {
            container.innerHTML += `<span>${letra}</span>`;
        } else {
            container.innerHTML += `<span>_</span>`
        }
    })

    // palavraSecreta.split("") // Vai dividir a palavra em um array ["G", "A", "T", "O"]
}

function isLetra(codigo) {
    return codigo >= 65 && codigo <= 90
}

function reiniciarJogo() {
    window.location.reload();
}