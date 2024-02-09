const globalTasks = require("../task.json");
module.exports = {
  // tasks: [{"id":1,"title":"New Task 2","description":"New Description 2","completed":false},{"id":2,"title":"New Task","description":"New Description","completed":false}],

  tasks: globalTasks.tasks,

  getAll() {
    return this.tasks;
  },

  create({ title, description }) {
    let id;
    
    if (this.tasks.length) {
      id = (this.tasks[this.tasks.length - 1].id) + 1;
    } else {
      id = 1;
    }
    
    this.tasks.push({
      id,
      title,
      description,
      completed: false,
    });
  },

  findById(id) {
    return this.tasks.find((task) => task.id === id);
  },

  findIndexById(id) {
    return this.tasks.findIndex((task) => task.id === id);
  },

  update(index, body) {
    for (const key in body) {
      if (key in ["title", "description", "completed"]) {
        this.tasks[index][key] = body[key];
      }
    }

    return this.tasks[index];
  },

  delete(index) {
    this.tasks.splice(index, 1);
  }
};