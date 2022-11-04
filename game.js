// REGRAS
regras = `
Encontre o número entre 0 e 100!

Você possuí 5 tentativas, cada tentativa retorna uma dica (palpite acima ou abaixo).
Se desafie a si mesmo e busque conquistar bons resultados.

Boa sorte! e que SE INICIEM OS JOGOS!!!!
`

alert(regras)

// CONTROLE
// colors
var color_error = "#BC1B05";
var color_acept = "#26BC05";
var color_bg = "#FFFFFF";

// Gerar número aleatorio
var num = Math.floor(Math.random()*100);

// Variaveis para alteração de conteúdo
var result = document.querySelector('.result');
var palpites = document.querySelector('.palpites_dados');
var area_num_palpites = document.querySelector('.num_palpites');
var baixo_alto = document.querySelector('.AltoBaixo');

var text_palpite = document.querySelector('.TextPalpite');
var input_palpite = document.querySelector('.InputPalpite');
var submite_palpite = document.querySelector('.SubmitePalpite');
var body_settings = document.querySelector('body');
var pos_img = document.querySelector('img.img_res');
var div_img = document.querySelector('div.img_res');

// controle
var num_palpites = 0;
var num_total = 5;
var pontos = 0;

// Imagem
var img_certo = 'https://i.pinimg.com/originals/e6/b2/71/e6b271792a254c6ed907bb28b169efbb.jpg';
var img_errado = 'https://pm1.narvii.com/6642/4b292203b316cc95b1cb41ad09772c8e16bb3b03_hq.jpg';

var aud_certo = 'audio/aeee.mp3';
var aud_errado = 'audio/iihh.wav';

// Enter Action
var input = document.getElementById("palpite");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        conferir_palpite();
    }
});

// JOGO
input_palpite.focus();

function conferir_palpite(){
    num_palpites++;
    var palpite_atual = Number(input_palpite.value);
    
    if(num_palpites === 1){
        palpites.textContent = 'Paltites anteriores: ';
    }
    palpites.textContent += palpite_atual + ' ';

    if(palpite_atual === num){
        body_settings.bgColor = color_acept;
        //result.textContent = 'Você acertou!!!';
        //result.style.backgroundColor = color_acept;
        baixo_alto.textContent = '';
        div_img.style.display = 'block';
        pos_img.src = img_certo;
        pontos += 1;
        result.textContent = 'Sua pontuação é: ' + pontos;
        setTimeout(() => {
            var audio = new Audio(aud_certo);
            audio.play();
            end_game();
        }, 1000);
    } else if(num_palpites == num_total){
        result.textContent = 'Você não possui mais tentativas';
        body_settings.bgColor = color_error;
        baixo_alto.textContent = '';
        area_num_palpites.textContent = 'Restão ' + (num_total - num_palpites) + ' palpites';
        div_img.style.display = 'block';
        pos_img.src = img_errado;
        pontos = 0;
        setTimeout(() => {
            var audio = new Audio(aud_errado);
            audio.play();
            end_game();
        }, 1000);
    } else {
        body_settings.bgColor = color_error;
        setTimeout(() => {
            body_settings.bgColor = color_bg;
        }, 1000);
        //result.textContent = 'Errado!';
        //result.style.backgroundColor = color_error;
        area_num_palpites.textContent = 'Restão ' + (num_total - num_palpites) + ' palpites';
        if(palpite_atual > num){
            baixo_alto.textContent = 'Seu palpite esta acima do valor';
        } else if(palpite_atual < num){
            baixo_alto.textContent = 'Seu palpite esta abaixo do valor';
        }
    }
    input_palpite.focus();
    input_palpite.value = '';
}

function end_game(){
    // Esconder valores
    document.querySelector('.form').style.display = 'none';
    document.querySelector('.response').style.display = 'none';

    // Continuação de jogo
    document.querySelector('.continue').style.display = 'block';
    document.querySelector('.continue').focus();
}

function new_game(){
    // reset variaveis
    div_img.style.display = 'none';
    pos_img.src = '';
    body_settings.bgColor = color_bg;
    num = Math.floor(Math.random()*100);
    num_palpites = 0;

    res = document.querySelectorAll('.response p')

    for(var i=0; i<res.length; i++){
        res[i].textContent = '';
    }

    // esconder continuação
    document.querySelector('.continue').style.display = 'none';

    // Mostrar entrada valores
    document.querySelector('.form').style.display = 'block';
    document.querySelector('.response').style.display = 'block';
}