// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); // Add a new task.
const addButton = document.getElementsByTagName('button')[0]; // first button
const incompleteTaskHolder = document.getElementById('incomplete-tasks'); // ul of #incomplete-tasks
const completedTasksHolder = document.getElementById('completed-tasks'); // completed-tasks

// New task list item
const createNewTaskElement = (taskString) => {
  const listItem = document.createElement('li');

  // input (checkbox)
  const checkBox = document.createElement('input'); // checkbx
  // label
  const label = document.createElement('label'); // label
  // input (text)
  const editInput = document.createElement('input');// text
  // button.edit
  const editButton = document.createElement('button');// edit button

  // button.delete
  const deleteButton = document.createElement('button');// delete button
  const deleteButtonImg = document.createElement('img');// delete button image

  label.innerText = taskString;
  label.className = 'list-item__label label task js-task-label';

  // Each elements, needs appending
  listItem.className = 'task-list__item list-item';

  checkBox.className = 'list-item__checkbox input js-checkbox-btn';
  checkBox.type = 'checkbox';

  editInput.className = 'list-item__text input task js-text-input';
  editInput.type = 'text';

  editButton.innerText = 'Edit'; // innerText encodes special characters, HTML does not.
  editButton.className = 'btn btn-edit js-edit-btn';

  deleteButton.className = 'btn btn-delete js-delete-btn';
  deleteButtonImg.className = 'btn-delete__img img';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = '';
  deleteButton.appendChild(deleteButtonImg);

  // and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

function addTask() {
  console.log('Add Task...');
  // Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

// Edit an existing task.
function editTask() {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.js-text-input');
  const label = listItem.querySelector('.js-task-label');
  const editBtn = listItem.querySelector('.js-edit-btn');
  const containsClass = listItem.classList.contains('task-list__item--editable');
  // If class of the parent is .editmode
  if (containsClass) {
    // switch to .editmode
    // label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  // toggle .editmode on the parent.
  listItem.classList.toggle('task-list__item--editable');
}

// Delete task.
function deleteTask() {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

// Mark task completed
function taskCompleted() {
  console.log('Complete Task...');

  // Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log('Incomplete Task...');
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #incomplete-tasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = () => {
  console.log('AJAX Request');
};

// The glue to hold it all together.
// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  // select ListItems children
  const checkBox = taskListItem.querySelector('.js-checkbox-btn');
  const editButton = taskListItem.querySelector('.js-edit-btn');
  const deleteButton = taskListItem.querySelector('.js-delete-btn');

  // Bind editTask to edit button.
  editButton.onclick = editTask;
  // Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteTaskHolder ul list items
// for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
  // bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
  // bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.
// prevent creation of empty tasks.
// Change edit to save when you are in edit mode.
