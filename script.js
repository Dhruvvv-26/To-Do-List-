let todoList = [];

        function addTodo() {
            const input = document.getElementById("todo-input");
            const dateInput = document.getElementById("todo-date");
            const newTodo = input.value.trim();
            const todoDate = dateInput.value;
            
            if (newTodo !== '' && todoDate !== '') {
                todoList.push({
                    text: newTodo,
                    date: todoDate,
                    completed: false,
                    id: Date.now()
                });
                input.value = '';
                dateInput.value = '';
                displayItems();
            }
        }

        function toggleComplete(id) {
            const todo = todoList.find(item => item.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                displayItems();
            }
        }

        function deleteTodo(id) {
            todoList = todoList.filter(item => item.id !== id);
            displayItems();
        }

        function formatDate(dateString) {
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }

        function displayItems() {
            const containerElement = document.querySelector('.todo-container');
            
            if (todoList.length === 0) {
                containerElement.innerHTML = `
                    <div class="empty-state">
                        <p>No tasks yet! Add a new task to get started.</p>
                    </div>`;
                return;
            }

            // Sort todos by date
            todoList.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            let newHtml = '';
            todoList.forEach((todo) => {
                newHtml += `
                    <div class="todo-item">
                        <input type="checkbox" 
                            class="todo-checkbox" 
                            ${todo.completed ? 'checked' : ''} 
                            onclick="toggleComplete(${todo.id})">
                        <p class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</p>
                        <span class="todo-date">${formatDate(todo.date)}</span>
                        <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>`;
            });
            
            containerElement.innerHTML = newHtml;
        }

        // Add event listener for Enter key
        document.getElementById('todo-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });

        // Initialize display
        displayItems();