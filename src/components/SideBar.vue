<!-- src/components/SideBar.vue -->
<template>
  <nav class="sidebar">
    <ul>
      <li v-for="chapter in chapters" :key="chapter.id">
        <router-link :to="`/quiz/${$route.params.topic}/${chapter.id}`">{{ chapter.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    chapters: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: #42b983;
}

a:hover {
  color: #35495e;
}
</style>
