<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="tutorial" v-show="displayTutorial" v-cloak>
      <button class="tutorial__btn" v-on:click="displayTutorial = false">x</button>
      <p class="tutorial__text">{{ tutorialText }}</p>
    </div>

    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      :placeholder=newToDoPlaceHolder
      onfocus="1"
      :onblur=newToDoPlaceHolder
      v-model="newTodo"
      @keyup.enter="addTodo"
    />

    <section class="main" v-show="todos.length" v-cloak>
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      v-model="allDone"
    />
    <label for="toggle-all">{{markAll}}</label>
    <ul class="todo-list">
      <li
        v-for="todo in filteredTodos"
        class="todo"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo == editedTodo }"
      >
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed" />
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)">X</button>
        </div>
        <input
          class="edit"
          type="text"
          v-model="todo.title"
          v-todo-focus="todo == editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)"
        />
      </li>
    </ul>
  </section>

  </div>
</template>

<script>

const STORAGE_KEY = "test-task-for-opt__to-do-list";
const STORAGE_KEY_2 = "test-task-for-opt__is-tutorial-visible";

let todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function (todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

let tutorialStorage = {
  fetch: function () {
    let isTutorialVisiblie = JSON.parse(localStorage.getItem(STORAGE_KEY_2) || true);
    return isTutorialVisiblie;
  },
  save: function (isTutorialVisiblie) {
    localStorage.setItem(STORAGE_KEY_2, JSON.stringify(isTutorialVisiblie));
  }
};

// visibility filters
let filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
};

export default {
  name: 'ToDoList',
  props: {
    msg: String,
    tutorialText: String
  },

  data: function() {
    return {
      todos: todoStorage.fetch(),
      displayTutorial: tutorialStorage.fetch(),
      newToDoPlaceHolder: "Что должно быть сделано?",
      markAll: "Пометить все задачи как выполненные",
      newTodo: "",
      editedTodo: null,
      visibility: "all"
    };
  },

  // watch todos and tutorialVisivility change for localStorage persistence
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      },
      deep: true
    },
    displayTutorial: {
        handler: function (displayTutorial) {
        tutorialStorage.save(displayTutorial);
      },
      deep: true
    }
  },

  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos);
    },

    remaining: function () {
      return filters.active(this.todos).length;
    },

    allDone: {
      get: function () {
        return this.remaining === 0;
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      }
    }
  },

  filters: {
    pluralize: function (n) {
      return n === 1 ? "item" : "items";
    }
  },

  methods: {
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });
      this.newTodo = "";
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted: function () {
      this.todos = filters.active(this.todos);
    }
  },

  // custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    "todo-focus": function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.toDoList {
  width: 60rem;
}

.tutorial {
  margin: auto;
  margin-bottom: 1rem;
  border: 2px solid #2b78c2;
  border-radius: 1rem;
  padding-bottom: 1rem;
  width: 60%;
  position: relative;
  padding-top: 0.6rem;
}

.tutorial__btn {
  position: absolute;
  right: .5rem;
  top: .3rem;
  border: none;
  background-color:#2b78c2;
  color: white;
  border-radius: 50%;
  line-height: 1rem;
  border: none; 
  cursor: pointer; 
  outline: none; 
}

.new-todo {
  width: 40%;
  text-align: center;
  height: 2rem;
}

.toggle-all {
  font-size: 0.2rem;
}

input:focus::placeholder {
    color: transparent;
}
</style>
