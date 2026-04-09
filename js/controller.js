// CONTROLLER - Model ve View'i bağlar, eventleri yönetir

const Controller = {

    // Uygulamayı başlat
    init() {
        this.loadTasks();
        this.bindEvents();
    },

    // Eventleri bağla
    bindEvents() {
        // Ekle butonuna tıklama
        View.addBtn.addEventListener('click', () => this.addTask());

        // Input'ta Enter'a basma
        View.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Arama inputu
        View.searchInput.addEventListener('input', () => this.filterTasks());
    },

    // Görevleri yükle ve ekrana çiz
    loadTasks() {
        const tasks = Model.getTasks();
        View.renderTasks(tasks);
    },

    // Görev ekle
    addTask() {
        const text = View.getInputValue();
        if (text === '') {
            View.showToast('Görev boş olamaz!', 'error');
            return;
        }
        Model.addTask(text);
        View.clearInput();
        this.loadTasks();
        View.showToast('Görev eklendi!', 'success');
    },

    // Görev sil
    deleteTask(id) {
        Model.deleteTask(id);
        this.loadTasks();
        View.showToast('Görev silindi!', 'error');
    },
    // Durum güncelle
    updateStatus(id, newStatus) {
        Model.updateStatus(id, newStatus);
        this.loadTasks();
    },

    // Tamamlandı toggle
    toggleTask(id) {
        const tasks = Model.getTasks();
        const task = tasks.find(t => t.id === id);
        if (task.completed) {
            Model.updateStatus(id, 'todo');
            View.showToast('Görev geri alındı!', 'warning');
        } else {
            Model.updateStatus(id, 'complete');
            View.showToast('Görev tamamlandı!', 'success');
        }
        Model.toggleTask(id);
        this.loadTasks();
    },  

    // Düzenlemeyi başlat
    startEdit(id) {
        const tasks = Model.getTasks();
        const task = tasks.find(t => t.id === id);
        
        // O görevin li elementini bul
        const li = document.querySelector(`[data-id="${id}"]`);
        const textSpan = li.querySelector('.task-text');

        // Span'ı input'a çevir
        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.text;
        input.className = 'inline-edit-input';
        textSpan.replaceWith(input);
        input.focus();

        // Enter'a basınca kaydet
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
        });

        // Dışarı tıklayınca kaydet
        input.addEventListener('blur', saveEdit);

        function saveEdit() {
            const newText = input.value.trim();
            if (newText === '') {
                View.showToast('Görev boş olamaz!', 'error');
                Controller.loadTasks();
                return;
            }
            Model.editTask(id, newText);
            Controller.loadTasks();
            View.showToast('Görev güncellendi!', 'warning');
        }
    },

    // Arama filtresi
    filterTasks() {
        const searchValue = View.getSearchValue();
        const tasks = Model.getTasks();
        const filtered = tasks.filter(task =>
            task.text.toLowerCase().includes(searchValue)
        );
        View.renderTasks(filtered);
    }
};

// Uygulamayı başlat
Controller.init();