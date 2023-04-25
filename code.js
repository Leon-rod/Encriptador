// Encrypt
let firstTextarea = document.querySelector(".first-textarea");
let secondTextarea = document.querySelector(".second-textarea");
let workText;
let encryptButton = document.querySelector(".encrypt");
encryptButton.addEventListener("click", ()=>{
    if (/([A-Z]|[\u00E0-\u00FC]|[ÁÉÍÓÚ])/.test(firstTextarea.value) !== true) {
        workText = firstTextarea.value;
        let textWorked = process(workText);
        secondTextarea.value = textWorked;
        if(secondTextarea.value !== ''){
            secondTextarea.classList.add('cursor');
        }else {
            secondTextarea.classList.remove('cursor')
        }
    }else {
        secondTextarea.value = '... se han detectado mayúsculas/acentos en el texto (carácteres no validos)';
        secondTextarea.classList.remove('cursor');
    }
});

function process(code) {
    let arrWords = [];
    arrWords = code.split("");
    for (let word in arrWords) {
        switch (arrWords[word]) {
            case 'a':
                arrWords[word] = 'ai';
            break;
            case 'e':
                arrWords[word] = 'enter';
            break;
            case 'i':
                arrWords[word] = 'imes';
            break;
            case 'o':
                arrWords[word] = 'ober';
            break;
            case 'u':
                arrWords[word]  = 'ufat';
            break;                
        }
    }
    return arrWords.join('')
};

// Copy
secondTextarea.addEventListener('click', copy);

function copy () {
    if (secondTextarea.value !== '' && secondTextarea.value!== '... se han detectado mayúsculas/acentos en el texto (carácteres no validos)') {
        navigator.clipboard.writeText(secondTextarea.value).then(
            ()=> {
                mergeMessage('copiado al portapapeles!')
            },
            ()=> {
                mergeMessage('ocurrió un error, intentelo de nuevo')
            }
        );
    }
};

// Popup Mesagge
let body = document.querySelector('body');
function mergeMessage(message) {
    let fragment = document.createDocumentFragment();
    let mergeContainer = document.createElement('div');
    if (body.clientWidth > '800') {
        mergeContainer.classList.add('merge-container');
    }else {
        mergeContainer.classList.add('rsp-mrg-container');
    }
    let msg = document.createElement('p');
    msg.textContent = message;
    msg.classList.add('merge-msg');
    mergeContainer.appendChild(msg);
    fragment.appendChild(mergeContainer);
    body.appendChild(fragment);
    setTimeout(()=>{
        body.removeChild(mergeContainer);
    }, 2000)
};

// Decrypt
let decryptButton = document.querySelector('.decrypt');
let textToDecrypt;
decryptButton.addEventListener('click', ()=>{
    if(firstTextarea.value !== '' && /([A-Z]|[\u00E0-\u00FC]|[ÁÉÍÓÚ])/.test(firstTextarea.value) !== true){
        secondTextarea.classList.add('cursor')
        textToDecrypt = revertProcess(firstTextarea.value);
        secondTextarea.value = textToDecrypt;
    }else if(/([A-Z]|[\u00E0-\u00FC]|[ÁÉÍÓÚ])/.test(firstTextarea.value) == true) {
        secondTextarea.value = '... se han detectado mayúsculas/acentos en el texto (carácteres no validos)';
        secondTextarea.classList.remove('cursor')
    }else {
        secondTextarea.value = '';
        secondTextarea.classList.remove('cursor')
    }
});

function revertProcess(revertMessage){
    let auxRevert;
    let auxArr;
    auxArr = revertMessage.split('ai');
    auxRevert = auxArr.join('a');
    auxArr = auxRevert.split('enter');
    auxRevert = auxArr.join('e');
    auxArr = auxRevert.split('imes');
    auxRevert = auxArr.join('i');
    auxArr = auxRevert.split('ober');
    auxRevert = auxArr.join('o');
    auxArr = auxRevert.split('ufat');
    auxRevert = auxArr.join('u');
    return auxRevert
};