let addToDo = document.querySelector('#buttonAdd')

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

    completeToDo(toDoPosition) {
        if (toDoPosition > 0 && toDoPosition <= this.size) {
            let result = null;

            if (toDoPosition == 1 && this.size == 1) {
                result = this.head;
                this.head = null;
                this.tail = null;
            }else if(toDoPosition == 1){
                result = this.head;
                this.head = this.head.next;
                this.head.prev = null;
            }else if (toDoPosition == this.size) {
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
            addTodoInCompletedList(result)
        }
    }

    printData() {
        let aux = this.head;
        while (aux != null) {
            console.log(aux.getTitle() + ' - ' + aux.getPrioridade());
            aux = aux.getNext();
        }
    }
}


function addTodoInCompletedList(todo){
    completedToDoList.push(todo);
    renderCompletedItens();
}

function cleanConteiner(conteiner){
    conteiner.innerHTML = '';
}

function renderToDoItens(todoList){
    let conteinerToDo = document.querySelector('#conteinerToDo');

    cleanConteiner(conteinerToDo);
    let id = 1;
    let divToDoItem;
    let i;
    let span;
    let p;
    let nivelPrioridade;


    let aux = todoList.head;
    while(aux != null){
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

        nivelPrioridade = document.createElement('div')
        nivelPrioridade.setAttribute('class', 'nivelPrioridade prioridade' + aux.getPrioridade())
        divToDoItem.appendChild(nivelPrioridade)

        document.querySelector('#conteinerToDo').appendChild(divToDoItem)

        aux = aux.getNext();
        id += 1
    }
    addTheFunctionToCompleteTask(document.querySelector('#conteinerToDo'))
}

function addTheFunctionToCompleteTask(conteiner){
    for(let i = 0; i < conteiner.childElementCount; i++){
        conteiner.childNodes[i].childNodes[0].onclick = () => {
            todoList.completeToDo(conteiner.childNodes[i].getAttribute('id'))
        }
    }
}

function completeItem(id){
    todoList.completeToDo(id);
}


function renderCompletedItens(){
    let conteinerToDo = document.querySelector('#conteinerDone');

    cleanConteiner(conteinerToDo);
    let divToDoItem;
    let i;
    let span;
    let p;
    let nivelPrioridade;


    let aux = 0;
    while(aux < completedToDoList.length){
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
    renderToDoItens(todoList);
}


let completedToDoList = []
let todoList = new ToDoList();

addToDo.onclick = function (){
    let textoToDo = document.getElementById('inputTarefa').value
    let prioridade = document.getElementById('inputPrioridade').value

    if(textoToDo.trim().length > 0 && prioridade > 0 && prioridade < 5){
        todoList.addToDo(textoToDo, Number(prioridade))
        document.getElementById('inputTarefa').value = ""
    }else{
        alert('Dados inválidos')
    }
}