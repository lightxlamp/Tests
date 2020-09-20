<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="./assets/logo.png">
    <ToDoList :msg=welcomeText :tutorialText=tutorialText />
  </div>
</template>

<script>
import ToDoList from './components/ToDoList'

export default {
  name: 'App',
  components: {
    ToDoList
  },

  data: function() {
    return {
      welcomeText: "Добро пожаловать в TODO лист",
      tutorialText: `Здесь вы можете добавлять, редактировать и изменять задачи, которые вы перед собой ставите. 
      Список всех задач сохраняется в локальном хранилище. Так что он будет доступен Вам даже после
      обновления страницы или полного ее закрытия. Войдя в "режим редактирования" вы можете изменять текст задачи
      который продублирован голубым цветом под ней.  
      Чтобы закрыть эту подсказку - нажмите крестик 
      в правом верхнем углу. После этого - текст подсказки больше не будет отображаться 
      при дальнейших посещениях сайта`
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  width: 200px;
  color: red;
}

</style>
