<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <span>{{ currentTopicName }}</span>
    </div>
    <ul>
      <li v-for="chapter in filteredChapters" :key="chapter.id">
        <router-link
          :to="{ name: 'quiz', params: { topicId: chapter.topicId, chapterId: chapter.id } }"
          active-class="active-link"
          exact
        >
          {{ chapter.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    topicId: {
      type: String,
      required: true
    },
    chapters: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredChapters() {
      return this.chapters.filter(chapter => chapter.topicId === this.topicId);
    },
    currentTopicName() {
      // Assuming topics are available in Vuex state
      const topic = this.$store.state.topics.find(topic => topic.id === this.topicId);
      return topic ? topic.name : '';
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f5f5f5;
  padding: 10px;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}

.sidebar-header {
  height: 20px;
  font-weight: bold;
  padding: 10px 0;
  line-height:20px ;
  border-bottom: 1px solid #ccc;
  text-align: center;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 5px;
}

a:hover {
  background-color: #cccccc;
}

.active-link {
  color: #009a68;
  font-weight: bold;
}
</style>
