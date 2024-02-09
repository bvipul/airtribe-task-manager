const globalTasks = require("../task.json");



module.exports = {
  tasks: globalTasks.tasks,

  getAll(sort) {
    if (sort === "desc") {
      return this.tasks.sort((taskA, taskB) => taskB.id - taskA.id);
    }
      
    return this.tasks.sort((taskA, taskB) => taskA.id - taskB.id);
  },

  getFilteredByStatus(status, sort) {
    if (sort === "desc") {
      return this.tasks.sort((taskA, taskB) => taskB.id - taskA.id).filter(task => task.completed === status);
    }
    
    return this.tasks.sort((taskA, taskB) => taskA.id - taskB.id).filter(task => task.completed === status);
  },

  getFilteredTasksByPriority(level) {
    return this.tasks.filter(task => task.priority && task.priority === level);
  },

  create({ title, description, completed, priority }) {
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
      completed,
      priority: priority || "low",
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
      if (key in ["title", "description", "completed", "priority"]) {
        this.tasks[index][key] = body[key];
      }
    }

    return this.tasks[index];
  },

  delete(index) {
    this.tasks.splice(index, 1);
  }
};