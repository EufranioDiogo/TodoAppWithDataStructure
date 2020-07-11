let flagVisible = 0

let addToDoButton = document.querySelector('#addNewToDo')

addToDoButton.onclick = () => {
    if (!flagVisible) {
        modalPopup.style.display = 'block';
        flagVisible = 1;
        document.querySelector('#buttonAdd').textContent = 'Adicionar Tarefa'
        document.querySelector('#buttonAdd').onclick = () => {
            let textoToDo = document.getElementById('inputTarefa').value
            let prioridade = document.getElementById('inputPrioridade').value

            if (textoToDo.trim().length > 0 && prioridade > 0 && prioridade < 5) {
                todoList.addToDo(textoToDo, Number(prioridade))
                document.getElementById('inputTarefa').value = ""
            } else {
                alert('Dados inválidos')
            }
        }
    }
}

buttonClosePopup.onclick = () => {
    if (flagVisible) {
        modalPopup.style.display = 'none';
        document.getElementById('inputTarefa').value = '';
        document.getElementById('inputPrioridade').value = '4';
        flagVisible = 0;
    }
}