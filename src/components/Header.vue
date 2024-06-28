<template>
  <div>
    <div class="header">
      <div class="left-section">
        <img src="../assets/w3schools_logo.png" alt="Home" @click="goHome" class="logo"/>
        <router-link to="/"></router-link>
      </div>
      <input type="text" class="search-box" placeholder="Search..." />
      <div v-if="isLoggedIn" class="user-info" @click="goToLogin">
        <img :src="user.avatar" alt="Avatar" class="avatar"/>
        <span>{{ user.username }}</span>
      </div>
      <button v-else @click="goToLogin" class="login-button">Login</button>
    </div>
    <header>
      <nav>
        <ul>
          <li><router-link to="/" active-class="active-link">首页</router-link></li>
          <li v-for="topic in topics" :key="topic.id">
            <router-link :to="`/quiz/${topic.id}/${getFirstChapterId(topic.id)}`" active-class="active-link">
              {{ topic.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      topics: [],
      chapters: []
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      isLoggedIn: state => state.user.isLoggedIn
    })
  },
  async created() {
    // 获取主题数据
    const topicsResponse = await axios.get('http://localhost:3000/topics');
    this.topics = topicsResponse.data;

    // 获取章节数据
    const chaptersResponse = await axios.get('http://localhost:3000/chapters');
    this.chapters = chaptersResponse.data;
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'home' });
    },
    getFirstChapterId(topicId) {
      const firstChapter = this.chapters.find(chapter => chapter.topicId === topicId);
      return firstChapter ? firstChapter.id : '';
    },
    goToLogin(){
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  color: white;
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  cursor: pointer;
  margin-right: 10px;
}

.search-box {
  flex: 1;
  margin: 0 20px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.login-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

header {
  height: 24px;
  line-height: 24px;
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

nav ul li a:hover {
  text-decoration: underline;
}

.active-link {
  color: #009a68;
  font-weight: bold;
}
</style>
