<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">首页</router-link></li>
        <li v-for="topic in topics" :key="topic.id">
          <router-link :to="`/quiz/${topic.id}/1`">
            {{ topic.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      topics: []
    };
  },
  async created() {
    const response = await axios.get('http://localhost:3000/topics');
    this.topics = response.data;
  }
};
</script>

<style scoped>
header {
  background-color: #333;
  padding: 10px;
}
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 10px;
}
nav ul li {
  display: inline;
}
nav ul li a {
  color: white;
  text-decoration: none;
}
</style>
