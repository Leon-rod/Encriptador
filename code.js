let firstTextarea = document.querySelector(".first-textarea");
let workText;
let encryptButton = document.querySelector(".encrypt");
encryptButton.addEventListener("click", ()=>{
    workText = firstTextarea.value;
    let arrText = [];
    arrText.push(process(workText))
});

function process(code) {
    let 
}