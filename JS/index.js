let addToDo = document.querySelector('#buttonAdd')
let modalPopup = document.querySelector('.modalConteiner')


class ToDoItem {
    constructor(titulo, prioridade) {
        this.titulo = titulo;
        this.prioridade = prioridade;
        this.next = null;
        this.prev = null;
    }
    getTitle() {
        return this.titulo;
    }
    getPrioridade() {
        return this.prioridade;
    }
    getNext() {
        return this.next;
    }
    getPrev() {
        return this.prev;
    }
}

class ToDoList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addToDo(titulo, prioridade) {
        if (prioridade > 0 && prioridade < 5) {
            let newItem = new ToDoItem(titulo, Number(prioridade));

            if (this.size == 0) {
                this.head = newItem;
                this.tail = newItem;
                document.getElementById('buttonLimpar1').style.display = 'block';
            } else if (this.tail.getPrioridade() >= prioridade) {
                newItem.prev = this.tail;
                this.tail.next = newItem;
                this.tail = newItem;
            } else {
                let aux = this.head;

                while (aux != null) {
                    if (prioridade > aux.getPrioridade()) {
                        break;
                    }
                    aux = aux.next;
                }
                if (aux == this.head) {
                    this.head.prev = newItem;
                    newItem.next = this.head;
                    this.head = newItem;
                } else {
                    newItem.prev = aux.prev
                    newItem.next = aux
                    aux.prev.next = newItem
                    aux.prev = newItem;
                }
            }
            this.size += 1;
            renderToDoItens(this)
        }
    }

    reset() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        document.getElementById('buttonLimpar1').style.display = 'none';
        renderToDoItens(this)
    }

    completeToDo(toDoPosition) {
        if (toDoPosition > 0 && toDoPosition <= this.size) {
            let result = null;

            document.getElementById('buttonLimpar2').style.display = 'block';

            if (toDoPosition == 1 && this.size == 1) {
                result = this.head;
                this.head = null;
                this.tail = null;
                document.getElementById('buttonLimpar1').style.display = 'none';
            } else if (toDoPosition == 1) {
                result = this.head;
                this.head = this.head.next;
                this.head.prev = null;
            } else if (toDoPosition == this.size) {
                result = this.tail;
                this.tail = this.tail.prev;
                this.tail.next = null;
            } else {
                result = this.head;

                for (let i = 0; i < toDoPosition - 1; i++) {
                    result = result.next;
                }

                result.prev.next = result.next;
                result.next.prev = result.prev;
            }
            this.size -= 1;
            addTodoInCompletedList(result);
        }
    }

    editToDo(toDoPosition, newTitle, newPrioridade) {
        if (toDoPosition && toDoPosition <= this.size) {
            this.removeToDo(toDoPosition)
            this.addToDo(newTitle, newPrioridade)
        }
    }
    removeToDo(toDoPosition) {
        if (toDoPosition > 0 && toDoPosition <= this.size) {
            let result = null;
            if (toDoPosition == 1 && this.size == 1) {
                this.head = null;
                this.tail = null;
                document.getElementById('buttonLimpar1').style.display = 'none';
            } else if (toDoPosition == 1) {
                this.head = this.head.next;
                this.head.prev = null;
            } else if (toDoPosition == this.size) {
                this.tail = this.tail.prev;
                this.tail.next = null;
            } else {
                result = this.head;

                for (let i = 0; i < toDoPosition - 1; i++) {
                    result = result.next;
                }

                result.prev.next = result.next;
                result.next.prev = result.prev;
            }
            this.size -= 1;
            renderToDoItens(this)
        }
    }
    getToDo(toDoPosition) {
        if (toDoPosition > 0 && toDoPosition <= this.getSize()) {
            let result = this.head;

            for (let i = 0; i < toDoPosition - 1; i++) {
                result = result.next;
            }
            return result
        }
    }
    getSize() {
        return this.size;
    }
}


function addTodoInCompletedList(todo) {
    completedToDoList.push(todo);
    renderCompletedItens();
}

function cleanConteiner(conteiner) {
    conteiner.innerHTML = '';
}

function renderToDoItens() {
    let conteinerToDo = document.querySelector('#conteinerToDo');

    cleanConteiner(conteinerToDo);
    let id = 1;
    let divToDoItem;
    let divPainelDeControle;
    let editButton;
    let deleteButton;
    let i;
    let span;
    let p;
    let nivelPrioridade;


    let aux = todoList.head;
    while (aux != null) {
        divToDoItem = document.createElement('div');

        divToDoItem.setAttribute('class', 'toDoItem')
        divToDoItem.setAttribute('id', id.toString())

        i = document.createElement('i')
        i.setAttribute('class', 'far fa-check-square')

        divToDoItem.appendChild(i)


        span = document.createElement('span')
        p = document.createElement('p')

        p.textContent = aux.getTitle()
        span.appendChild(p)
        divToDoItem.appendChild(span)


        divPainelDeControle = document.createElement('div')
        divPainelDeControle.setAttribute('class', 'optionToDo')

        divPainelDeControle.setAttribute('style', 'display:none')
        editButton = document.createElement('i')
        deleteButton = document.createElement('i')

        editButton.setAttribute('class', 'fas fa-edit edit')
        deleteButton.setAttribute('class', 'fas fa-trash-alt trash')

        divPainelDeControle.appendChild(editButton)
        divPainelDeControle.appendChild(deleteButton)

        divToDoItem.appendChild(divPainelDeControle)

        nivelPrioridade = document.createElement('div')
        nivelPrioridade.setAttribute('class', 'nivelPrioridade prioridade' + aux.getPrioridade())
        divToDoItem.appendChild(nivelPrioridade)

        document.querySelector('#conteinerToDo').appendChild(divToDoItem)

        aux = aux.getNext();
        id += 1
    }
    addTheFunctionToCompleteTask(document.querySelector('#conteinerToDo'))
}

function addTheFunctionToCompleteTask(conteiner) {
    for (let i = 0; i < conteiner.childElementCount; i++) {
        conteiner.childNodes[i].childNodes[0].onclick = () => {
            todoList.completeToDo(conteiner.childNodes[i].getAttribute('id'))
        }
        conteiner.childNodes[i].childNodes[2].childNodes[1].onclick = () => {
            todoList.removeToDo(conteiner.childNodes[i].getAttribute('id'))
        }
        conteiner.childNodes[i].childNodes[2].childNodes[0].onclick = () => {
            let node = todoList.getToDo(conteiner.childNodes[i].getAttribute('id'))

            flagVisible = 1;

            modalPopup.style.display = 'block';
            document.getElementById('inputTarefa').value = node.getTitle()
            document.getElementById('inputPrioridade').value = node.getPrioridade()

            document.querySelector('#buttonAdd').textContent = 'Atualizar Tarefa'

            document.querySelector('#buttonAdd').onclick = () => {
                if (!(document.getElementById('inputTarefa').value == node.getTitle() && document.getElementById('inputPrioridade').value == node.getPrioridade())) {
                    if (document.getElementById('inputTarefa').value != node.getTitle() && document.getElementById('inputPrioridade').value == node.getPrioridade()) {
                        node.titulo = document.getElementById('inputTarefa').value;
                        renderToDoItens()
                    } else {
                        newTitle = document.getElementById('inputTarefa').value;
                        newPrioridade = document.getElementById('inputPrioridade').value

                        todoList.editToDo(conteiner.childNodes[i].getAttribute('id'), newTitle, newPrioridade)
                    }
                }
            }
        }
        conteiner.childNodes[i].childNodes[1].onclick = () => {
            if (conteiner.childNodes[i].childNodes[2].getAttribute('style').split(':')[1] == 'none') {
                conteiner.childNodes[i].childNodes[2].setAttribute('style', 'display:block')
            } else {
                conteiner.childNodes[i].childNodes[2].setAttribute('style', 'display:none')
            }
        }
    }
}

function completeItem(id) {
    todoList.completeToDo(id);
}

function renderCompletedItens() {
    let conteinerToDo = document.querySelector('#conteinerDone');

    cleanConteiner(conteinerToDo);
    let divToDoItem;
    let i;
    let span;
    let p;
    let nivelPrioridade;


    let aux = 0;
    while (aux < completedToDoList.length) {
        divToDoItem = document.createElement('div');

        divToDoItem.setAttribute('class', 'toDoItem')

        i = document.createElement('i')
        i.setAttribute('class', 'far fa-check-square')

        i.onclick = () => {
            todoList.addToDo(completedToDoList[aux].getTitle(), completedToDoList[aux].getPrioridade());
        }
        divToDoItem.appendChild(i)

        span = document.createElement('span')
        p = document.createElement('p')

        p.textContent = completedToDoList[aux].getTitle()
        span.appendChild(p)
        divToDoItem.appendChild(span)

        nivelPrioridade = document.createElement('div')
        nivelPrioridade.setAttribute('class', 'nivelPrioridade prioridade' + completedToDoList[aux].getPrioridade())
        divToDoItem.appendChild(nivelPrioridade)

        document.querySelector('#conteinerDone').appendChild(divToDoItem)

        console.log(divToDoItem)
        aux += 1
    }
    if (aux == 0) {
        document.querySelector('#buttonLimpar2').style.display = 'none'
    } else {
        addFunctionUncompleteCompletedIten(document.querySelector('#conteinerDone'));
        renderToDoItens(todoList);
    }
}

function addFunctionUncompleteCompletedIten(conteiner) {
    for (let i = 0; i < completedToDoList.length; i++) {
        conteiner.childNodes[i].childNodes[0].onclick = () => {
            index = completedToDoList.indexOf(completedToDoList[i])

            if (index > -1) {
                todoList.addToDo(completedToDoList[i].getTitle(), completedToDoList[i].getPrioridade())
                completedToDoList.splice(index, 1);
                renderToDoItens();
                renderCompletedItens()
            }
        }
    }
}


let completedToDoList = []
let todoList = new ToDoList();

addToDo.onclick = () => {
    let textoToDo = document.getElementById('inputTarefa').value
    let prioridade = document.getElementById('inputPrioridade').value

    if (textoToDo.trim().length > 0 && prioridade > 0 && prioridade < 5) {
        todoList.addToDo(textoToDo, Number(prioridade))
        document.getElementById('inputTarefa').value = ""
    } else {
        alert('Dados inválidos')
    }
}

document.getElementById('buttonLimpar1').onclick = () => {
    if (todoList.getSize() > 0) {
        todoList.reset();
    }
}

document.getElementById('buttonLimpar2').onclick = () => {
    if (completedToDoList.length > 0) {
        completedToDoList = []
        document.getElementById('buttonLimpar2').style.display = 'none';
        renderCompletedItens()
    }
}

let buttonClosePopup = document.querySelector('#buttonClose')

buttonClosePopup.onclick = () => {
    if (flagVisible) {
        modalPopup.style.display = 'none';
        document.getElementById('inputTarefa').value = '';
        getElementById('inputPrioridade').value = '4';
        flagVisible = 0;
    }
}