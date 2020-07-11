let flagVisible = 0

let addToDoButton = document.querySelector('#addNewToDo')

addToDoButton.onclick = () => {
    if (!flagVisible){
        modalPopup.style.display = 'block';
        flagVisible = 1;
        document.querySelector('#buttonAdd').textContent = 'Adicionar Tarefa'
    }
}

buttonClosePopup.onclick = () => {
    if (flagVisible){
        modalPopup.style.display = 'none';
        document.getElementById('inputTarefa').value = '';
        document.getElementById('inputPrioridade').value = '4';
        flagVisible = 0;
    }
}