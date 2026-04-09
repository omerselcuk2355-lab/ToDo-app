
const Model = {

    // localStorage'dan görevleri getir
    getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    },

    
    saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    // Yeni görev ekle
    addTask(text) {
    const tasks = this.getTasks();
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        status: 'todo'
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
    },
    

    // Görev sil
    deleteTask(id) {
        let tasks = this.getTasks();
        tasks = tasks.filter(task => task.id !== id);
        this.saveTasks(tasks);
    },

    // Görev düzenle
    editTask(id, newText) {
    const tasks = this.getTasks();
    const task = tasks.find(task => task.id === id);
    if (task) task.text = newText;
    this.saveTasks(tasks);
},

    updateStatus(id, newStatus) {
        const tasks = this.getTasks();
        const task = tasks.find(task => task.id === id);
        if (task) task.status = newStatus;
        this.saveTasks(tasks);
    },

    // Tamamlandı işaretle
    toggleTask(id) {
        const tasks = this.getTasks();
        const task = tasks.find(task => task.id === id);
        if (task) task.completed = !task.completed;
        this.saveTasks(tasks);
    }
};