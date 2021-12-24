<template>
  <TaskTitle title="Тест"/>
</template>

<script>
import TaskTitle from './components/TaskTitle.vue'

export default {
  name: 'App',
  components: {
    TaskTitle
  }
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
</style>
