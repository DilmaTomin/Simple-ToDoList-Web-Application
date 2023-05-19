
// script.js
$(document).ready(function () {
    const loginForm = $('#login-form');
    const loginError = $('#login-error');
    const mainPage = $('#main-page');
    const logoutLink = $('#logout-link');
    const todoListLink = $('#todo-list-link');
    const todoList = $('#todo-list');
  
    // Hide the error message and main page initially
    loginError.hide();
    mainPage.hide();
  
    // Check login credentials and show error message if incorrect
    loginForm.on('submit', function (e) {
      e.preventDefault();
      const username = $('#username').val();
      const password = $('#password').val();
  
      if (username === 'admin' && password === '12345') {
        loginError.hide();
        loginForm.trigger('reset'); // Reset the login form
  
        $('#login-page').hide();
        mainPage.show();
        fetchAndDisplayTodoList();
      } else {
        loginError.show();
      }
    });
    logoutLink.on('click', function (e) {
        e.preventDefault();
        mainPage.hide();
        $('#login-page').show();
      });
  
    // Retrieve and display todo list items
    function fetchAndDisplayTodoList() {
      getTodoListData()
        .then((data) => {
          displayTodoList(data);
        })
        .catch((error) => console.error(error));
    }
  
    function getTodoListData() {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: 'https://jsonplaceholder.typicode.com/todos',
          type: 'GET',
          success: function (data) {
            resolve(data.slice(0, 20)); // Fetch only the first 20 tasks
          },
          error: function (error) {
            reject(error);
          }
        });
      });
    }
  
    function displayTodoList(data) {
      todoList.empty();
  
      for (let i = 0; i < data.length; i++) {
        const todo = data[i];
        const listItem = $('<li>').addClass('list-group-item');
  
        const checkbox = $('<input>')
          .attr('type', 'checkbox')
          .attr('data-task-id', todo.id)
          .addClass('todo-checkbox')
          .prop('checked', false)
          .on('change', handleCheckboxChange);
  
        if (todo.completed) {
          checkbox.prop('disabled', true); // Disable checkbox for completed tasks
        }
  
        const label = $('<label>').text(todo.title);
        listItem.append(checkbox, label);
        todoList.append(listItem);
      }
    }
  
    function handleCheckboxChange() {
      const checkedCount = $('.todo-checkbox:checked').length;
  
      if (checkedCount >= 5) {
        alert(`Congrats. ${checkedCount} Tasks have been Successfully Completed`);
      }
    }
  
    // Automatically load and display todo list upon login
    fetchAndDisplayTodoList();
  });
  

  
  
  
  
  
  
  
  
  
  
  
  
  
