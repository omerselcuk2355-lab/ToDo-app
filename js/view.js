// VIEW - DOM işlemleri, ekrana çizme

const View = {

    
    taskInput: document.getElementById('taskInput'),
    searchInput: document.getElementById('searchInput'),
    taskList: document.getElementById('taskList'),
    addBtn: document.getElementById('addBtn'),
    totalCount: document.getElementById('totalCount'),
    completedCount: document.getElementById('completedCount'),
    toastContainer: document.getElementById('toastContainer'),
    
    renderTasks(tasks) {
        this.taskList.innerHTML = '';  // önce listeyi temizle

        if (tasks.length === 0) {
            this.taskList.innerHTML = '<p class="empty">Henüz görev yok!</p>';
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            li.innerHTML = `
            <span class="task-text">${this.escapeHTML(task.text)}</span>
            <div class="task-buttons">
                <select class="status-select status-${task.status}" ${task.completed ? 'disabled' : ''} onchange="Controller.updateStatus(${task.id}, this.value)">
                    <option value="todo"       ${task.status === 'todo'       ? 'selected' : ''}>Todo</option>
                    <option value="inprogress" ${task.status === 'inprogress' ? 'selected' : ''}>In Progress</option>
                    ${task.completed ? '<option value="complete" selected>Complete</option>' : ''}
                </select>
                <button class="complete-btn" onclick="Controller.toggleTask(${task.id})">
                    ${task.completed ? '↩️' : '✅'}
                </button>
                <button class="edit-btn" onclick="Controller.startEdit(${task.id})">
                    ✏️
                </button>
                <button class="delete-btn" onclick="Controller.deleteTask(${task.id})">
                    🗑️
                </button>
            </div>
            `;

            this.taskList.appendChild(li);
            
        });
        this.totalCount.textContent = `Toplam: ${tasks.length}`;
        const completed = tasks.filter(t => t.completed).length;
        this.completedCount.textContent = `Tamamlanan: ${completed}`; 
    },

    
    clearInput() {
        this.taskInput.value = '';
    },

    
    getSearchValue() {
        return this.searchInput.value.toLowerCase();
    },

    
    getInputValue() {
        return this.taskInput.value.trim();
    },
    escapeHTML(text) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    },
    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        this.toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
},
};