const todoValue = document.querySelector('.todoValue');
const todoList = document.getElementById('todoList');


// Function to get todos from localStorage
const getTodoLocal = () => {
    const todos = localStorage.getItem("todo1");
    try {
        return todos ? JSON.parse(todos) : [];
    } catch (e) {
        console.error("Error parsing localStorage item 'todo1':", e);
        return [];
    }
};

// Initialize the todo list array from localStorage or set it as an empty array
let todoListValue = getTodoLocal();
if (!Array.isArray(todoListValue)) {
    todoListValue = [];
}

// Function to save the current todo list array to localStorage
const addTodoLocal = (todo) => {
    localStorage.setItem("todo1", JSON.stringify(todo));

};


//Editing in todo List
const editTodo=(todo)=>{
        const newValue = prompt('Edit your todo', todo);
        if (newValue && newValue.trim() !== '' && !todoListValue.includes(newValue)) {
            const index = todoListValue.indexOf(todo);
            todoListValue[index] = newValue;
            addTodoLocal(todoListValue);
            todoList.textContent="";
            showTodoList();

        } else if (todoListValue.includes(newValue)) {
            alert("This todo is already in the list.");
        }
}


//deleting element in todo list
const deleteTodo=(todo)=>{
    todoListValue = todoListValue.filter(item => item !== todo);
    addTodoLocal(todoListValue);
    todoList.textContent="";
    showTodoList();
}

// Function to create a todo list item element
const createTodoItem = (todo) => {
    const li = document.createElement('li');

    const todoText = document.createElement('span');
    todoText.textContent = todo;
    todoText.classList.add('todoText');
    li.appendChild(todoText);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click',()=>{deleteTodo(todo)});


    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click',()=>{editTodo(todo)});

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    li.appendChild(buttonContainer);

    return li;
};



const showTodoList = () => {
   
    todoListValue.forEach((curTodo) => {
        const li = createTodoItem(curTodo);
        todoList.appendChild(li);
    });
};


const addTodoList = (e) => {
    e.preventDefault();
    if (todoValue.value.trim() !== '') {
        if (!todoListValue.includes(todoValue.value)) {
            
            const li = createTodoItem(todoValue.value);
            todoList.appendChild(li);
           
            todoListValue.push(todoValue.value);
            addTodoLocal(todoListValue);
            todoValue.value = '';  
        
        } else {
            alert("This todo is already in the list.");
        }
    }
};

showTodoList();

document.querySelector('.add').addEventListener('click', (e) => {
    addTodoList(e);
});
