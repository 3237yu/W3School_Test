<template>
  <div class="quiz-container">
    <!-- 左侧边导航栏 -->
    <Sidebar :topicId="topicId" :chapters="chapters" @chapter-clicked="handleChapterClicked" />

    <!-- 右边章节内容与题目 -->
    <div class="main-content">
      <div v-if="currentChapter">
        <h2>{{ currentChapter.name }}</h2>
        <p class="chapter-description">{{ currentChapter.description }}</p>
      </div>
      <Question
        v-for="(question, index) in currentChapterQuestions"
        :key="question.id"
        :question="question"
        :index="index"
        @answer-changed="updateAnswer"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Sidebar from '../components/Sidebar.vue';
import Question from '../components/Question.vue';

export default {
  name: 'Quiz',
  components: {
    Sidebar,
    Question
  },
  computed: {
    ...mapState(['chapters', 'questions']),
    topicId() {
      return this.$route.params.topicId;
    },
    chapterId() {
      return this.$route.params.chapterId;
    },
    currentChapter() {
      return this.chapters.find(
        chapter => chapter.id === this.chapterId && chapter.topicId === this.topicId
      );
    },
    currentChapterQuestions() {
      return this.questions.filter(question => question.chapterId === this.chapterId);
    }
  },
  watch: {
    topicId: 'fetchChaptersAndQuestions',
    chapterId: 'fetchChapterQuestions'
  },
  methods: {
    ...mapActions(['fetchChapters', 'fetchQuestions']),
    updateAnswer({ questionId, answer }) {
      const question = this.questions.find(q => q.id === questionId);
      if (question) {
        question.userAnswer = answer;
      }
    },
    async fetchChaptersAndQuestions() {
      if (this.topicId) {
        await this.fetchChapters(this.topicId);
        if (!this.chapterId && this.chapters.length > 0) {
          const firstChapter = this.chapters[0];
          this.$router.replace({ name: 'quiz', params: { topicId: this.topicId, chapterId: firstChapter.id } });
        }
        if (this.chapterId) {
          await this.fetchQuestions({ topicId: this.topicId, chapterId: this.chapterId });
        }
      }
    },
    async fetchChapterQuestions() {
      if (this.chapterId) {
        await this.fetchQuestions({ topicId: this.topicId, chapterId: this.chapterId });
      }
    },
    handleChapterClicked(chapterId) {
      this.$router.push({ name: 'quiz', params: { topicId: this.topicId, chapterId: chapterId } });
    }
  },
  async created() {
    await this.fetchChaptersAndQuestions();
  }
};
</script>

<style scoped>
.quiz-container {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

h2 {
  margin-bottom: 20px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
