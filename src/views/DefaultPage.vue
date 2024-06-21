<template>
    <div class="default-page">
      <h2>章节列表</h2>
      <ul>
        <li v-for="chapter in chapters" :key="chapter.id">
          <router-link :to="`/quiz/${$route.params.topic}/${chapter.id}`">{{ chapter.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'DefaultPage',
    computed: {
      ...mapGetters(['getChapters']),
      chapters() {
        return this.getChapters(this.$route.params.topic);
      },
    },
    methods: {
      ...mapActions(['fetchChapters']),
    },
    mounted() {
      this.fetchChapters(this.$route.params.topic);
    },
  };
  </script>
  
  <style scoped>
  .default-page {
    text-align: left;
    padding: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
  </style>
  