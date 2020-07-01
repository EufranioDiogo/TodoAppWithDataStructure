let flagVisible = 0

let addToDoButton = document.querySelector('#addNewToDo')
let modalPopup = document.querySelector('.modalConteiner')

let buttonClosePopup = document.querySelector('#buttonClose')

addToDoButton.onclick = () => {
    if (!flagVisible){
        modalPopup.style.display = 'block';
        flagVisible = 1;
    }
}

buttonClosePopup.onclick = () => {
    if (flagVisible){
        modalPopup.style.display = 'none';
        flagVisible = 0;
    }
}