<template>
  <section class="toDoApp">
    <header class="header">
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
    </header>

    <section class="main" v-show="todos.length" v-cloak>
    <div class="toggle-all">
      <input
        id="toggle-all__btn"
        class="toggle-all__btn"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all__btn" class="toggle-all__text">{{markAll}}</label>
    </div>

    <input
      id="toggle-edit-mode"
      class="toggle-edit-mode"
      type="checkbox"
      v-model="isEditMode"
    />
    <label for="toggle-edit-mode" class="toggle-all__text">{{toggleEditMode}}</label>
    
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
          class="notEdit"
          :class="{ edit: isEditMode }"
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

  </section>
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
      markAll: "Пометить все задачи как выполненные / Снять метку \"выполнена\" со всех задач",
      toggleEditMode: "Включить/Выклюить режим редактирования",
      newTodo: "",
      editedTodo: null,
      visibility: "all",
      isEditMode: false
    };
  },

  // watch todos and tutorial - visivility change for localStorage persistence
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

<style lang="scss" scoped>
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

.todo-list {
  display: flex;
  flex-direction: column;
}

.tutorial {
  margin: auto;
  margin-bottom: 1rem;
  border: 2px solid #2b78c2;
  border-radius: 1rem;
  width: 60%;
  position: relative;
  padding-bottom: 1rem;
  padding: 0.6rem 2rem 1rem 1rem;

  &__btn {
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
}

.completed {
  color: grey;
  text-decoration-line: line-through;
}

.edit {
  width: 40%;
  text-align: center;
  font-style: italic;
  color: blue;
  visibility: visible !important;
  border: none;
}

.notEdit {
  visibility: hidden;
}

.new-todo {
  width: 40%;
  text-align: center;
  height: 2rem;
}

.toggle-all {
  &__text {
    font-size: 0.5rem;
    color: grey;
  }
}

.destroy {
  margin-left: .5rem;
}

input:focus::placeholder {
    color: transparent;
}

textarea:focus, input:focus{
    outline: none;
}
</style>
