// Al cargar la página, queremos verificar si ya hay tareas guardadas en el localStorage
// Si es así, las cargamos en la lista. Esta función inicializa nuestra lista de tareas.
function loadTasksFromLocalStorage() {
    // Intentamos obtener las tareas guardadas como un string JSON
    const storeTasks = localStorage.getItem('tasks');
    if (storeTasks) {
        const tasks = JSON.parse(storeTasks);
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }
}

// Recorremos las tareas cargadas y las agregamos visualmente al <ul>
// Esta función añade la tarea al DOM, es decir, la muestra en la lista de tareas en pantalla
function addTaskToDOM(taskText) {
    // Creamos un nuevo elemento <li> que contendrá el texto de la tarea
    const taskListItem = document.createElement('li');
    taskListItem.textContent = taskText;

    // Agregamos un botón de "eliminar" a cada tarea, para que el usuario pueda borrarla
    const deleteButton= document.createElement('button');
    deleteButton.textContent= 'Eliminar';
    deleteButton.addEventListener('click', ()=>{
        removeTask(taskText),
        taskListItem.remove();
    });
    // Al hacer clic en "eliminar", quitamos la tarea del DOM y del localStorage
    // Elimina la tarea de la interfaz

    // Agregamos el botón de eliminar al <li> de la tarea
    taskListItem.appendChild(deleteButton);

    // Finalmente, agregamos la tarea a la lista visual en el <ul>
    const taskList= document.getElementById('taskList');
    taskList.appendChild(taskListItem);
}

// Esta función se encarga de guardar las tareas en el localStorage
function saveTaskToLocalStorage(taskText) {
    // Obtenemos las tareas guardadas en localStorage o creamos un array vacío si no hay tareas
    let tasks= localStorage.getItem('tasks');
    if(!tasks){
        tasks=[];
    }else{
        tasks=JSON.parse(tasks);
    
    }
    
    // Añadimos la nueva tarea al array
    tasks.push(taskText);
    // Guardamos el array actualizado en el localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Esta función borra una tarea específica del localStorage
function removeTask(taskText) {

    // Cargamos las tareas del localStorage
let tasks=localStorage.getItem('tasks');

    // Filtramos el array para remover la tarea que coincide con el texto proporcionado
    tasks=JSON.parse(tasks).filter(task => task !== taskText);
    // Guardamos el array actualizado sin la tarea eliminada
    localStorage.setItem('task', JSON.stringify(tasks));
}

// Manejamos el clic del botón de agregar tarea
document.getElementById('addButton').addEventListener('click', () => {
    // Obtenemos el valor ingresado por el usuario
    const taskInput= document.getElementById('taskInput');
    const taskText=taskInput.value.trim();
    // Verificamos si el campo no está vacío
    if(taskText){
        // Agregamos la tarea al DOM y la guardamos en el localStorage
    addTaskToDOM(taskText);
    saveTaskToLocalStorage(taskText);
    // Limpiamos el campo de entrada después de agregar la tarea
    taskInput.value='';
    }
});

// Llamamos a esta función cuando la página se carga para inicializar la lista con tareas guardadas
loadTasksFromLocalStorage();