<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="tutorial">
      {{tutorialText}}
    </p>
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

const STORAGE_KEY = "testTaskForOpt";
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
  }
};

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    tutorialText: String
  },

  data: function() {
    return {
      todos: todoStorage.fetch(),
      newToDoPlaceHolder: "Что должно быть сделано?",
      markAll: "Пометить все задачи как выполненные",
      newTodo: "",
      editedTodo: null,
      visibility: "all"
    };
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
}

.new-todo {
  width: 40%;
  text-align: center;
}

input:focus::placeholder {
    color: transparent;
}
</style>
