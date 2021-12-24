<template>
</template>
<script>
export default {
  data() {
    return { TaskTitle: window.TaskTitle }
  },
  mounted() {
    console.log(window.TaskTitle)
  }
}
</script>
