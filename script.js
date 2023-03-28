// Adiciona um ouvinte de evento ao corpo do documento HTML que ouve o evento 'keyup'
// Quando uma tecla é solta, chama a função 'playSound' com o código da tecla em minúsculas
document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLowerCase());
});

// Adiciona um ouvinte de evento ao botão com a classe 'composer'
// Quando o botão é clicado, obtém o valor do elemento input com o id 'input'
// Se a string não for vazia, divide em uma matriz de caracteres e chama a função 'playComposition'
document.querySelector(`.composer button`).addEventListener('click', ()=>{
    let song = document.querySelector('#input').value;

    if(song !== ''){
        let songArray = song.split('');
        playComposition(songArray);
    }

});

// Toca o som especificado pelo parâmetro 'sound'
function playSound(sound){
    // Obtém o elemento de áudio com o id 's_<sound>'
    let audioElement = document.querySelector(`#s_${sound}`);
    // Obtém o elemento de div com o atributo 'data-key' igual a <sound>
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);
    
    // Toca o som se o elemento de áudio existir
    if(audioElement){
        audioElement.play();
    }

    // Reinicia o som e toca novamente se o elemento de áudio existir
    if(audioElement){
        audioElement.currentTime = 0;
        audioElement.play();
    }

    // Adiciona a classe 'active' ao elemento de div e remove-a após 300 milissegundos
    if(keyElement) {
        keyElement.classList.add('active');

        setTimeout(()=>{
            keyElement.classList.remove('active');
        }, 300);
    }
}

// Toca uma música especificada pela matriz 'songArray'
function playComposition(songArray){
    let wait = 0;
    // Para cada item na matriz, chama a função 'playSound' com 'keyX', onde X é o nome da nota
    // Usa 'setTimeout' para atrasar a reprodução de cada nota por 'wait' milissegundos e incrementa 'wait' por 250
    for(let songItem of songArray){
        setTimeout(()=>{
            playSound(`key${songItem}`);
        }, wait);
        wait += 250;        
    }
}
