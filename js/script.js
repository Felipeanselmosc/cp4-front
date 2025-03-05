// quando der click vai chamar função add
document.getElementById('add-task-btn').addEventListener('click', addTask);

// quando der o click vai chama a função filter
document.getElementById('filter-pending-btn').addEventListener('click', filterPendingTasks);

// armazena das tarefas e mostrar elas
let tasks = [];

// add nova tarefa
function addTask() {
    // pega o input digitado
    const taskInput = document.getElementById('task-input');
    // para remover espaços no final e no começo
    const taskText = taskInput.value.trim(); 

    // mostrar alerta de der enter com espaço vazio
    if (taskText === "") {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    //  faz um id unico para representar a tarefa
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        pending: true
    };

    // coloca a tarefa no arrey
    tasks.push(task);

    // limpa a barra depois de add uma tarefa
    taskInput.value = "";

    // atualiza as tarefas
    renderTasks();
}

// mostra todas as tarefas
function renderTasks(filter = "all") {
    const taskList = document.getElementById('listadeTarefas');
    
    // tira a duplicaçao de tarefas
    taskList.innerHTML = '';

    // filtras as tarefas
    const filteredTasks = tasks.filter(task => {
        if (filter === "pending") {
            // pendente, não mostrara as concluidas
            return !task.completed;
        }
        // concluidas, não mostraraas pendentes
        return true;
    });

    // exibe as tarefas
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.completed ? 'completed' : 'pending'); // se a tarefa foi concluída, entra a classe "completed", se não, "pending"

        const taskText = document.createElement('span');
        taskText.textContent = task.text; // coloca a tarefa na tela

        // botão para marcar/desmarcar a tarefa concluída
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Desmarcar' : 'Concluir'; // a tarefa foi concluída, o botão vai para "Desmarcar"
        completeBtn.classList.add('complete-btn'); // add uma classe para o estilo do botão
        completeBtn.addEventListener('click', () => toggleTaskStatus(task.id)); // altera o status da tarefa

        // botão para excluir a tarefa
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir'; // botão
        deleteBtn.classList.add('delete-btn'); // classe do botão
        deleteBtn.addEventListener('click', () => deleteTask(task.id)); // exclui a tarefa quando der o click

        // add o texto da tarefa o botão de concluir/desmarcar e o botão de excluir à lista
        li.appendChild(taskText);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        // add esse item à lista de tarefas
        taskList.appendChild(li);
    });
}

// muda o status da tarefa (concluir ou desmarcar)
function toggleTaskStatus(taskId) {
    const task = tasks.find(task => task.id === taskId); // acha a tarefa com o id correspondente
    task.completed = !task.completed; // muda entre concluído e não concluído
    task.pending = !task.pending; // atualiza o status
    renderTasks(); // atualiza a lista de tarefas
}

// excluir uma tarefa
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks(); // atualiza a lista de tarefas depois de excluir
}

// mostra as tarefas pendentes
function filterPendingTasks() {
    renderTasks("pending");
}
