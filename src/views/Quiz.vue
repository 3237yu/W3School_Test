<template>
  <div class="quiz-container">
    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <ul>
        <li v-for="chapter in chapters" :key="chapter.id">
          <router-link :to="`#${chapter.id}`">{{ chapter.name }}</router-link>
        </li>
      </ul>
    </div>

    <!-- 右侧题目显示区域 -->
    <div class="main-content">
      <div v-for="chapter in chapters" :key="chapter.id" id="chapter-{{ chapter.id }}">
        <h2>{{ chapter.name }}</h2>
        <div v-for="question in chapter.questions" :key="question.id">
          <h3>{{ question.text }}</h3>
          <div v-for="(option, index) in question.options" :key="index">
            <input
              type="radio"
              :id="`question-${question.id}-option-${index}`"
              :name="`question-${question.id}`"
              :value="option"
              v-model="question.userAnswer"
            />
            <label :for="`question-${question.id}-option-${index}`">{{ option }}</label>
          </div>
        </div>
      </div>
      <button @click="submitAnswers">提交答案</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chapters: [] // 从 store 中获取的章节数据
    };
  },
  methods: {
    submitAnswers() {
      // 遍历所有题目，提交用户选择的答案
      this.chapters.forEach(chapter => {
        chapter.questions.forEach(question => {
          // 如果用户有选择答案
          if (question.userAnswer !== null && question.userAnswer !== undefined) {
            // 根据实际情况提交答案的逻辑，例如提交到后端或更新状态
            console.log(`Question ${question.id} Answer: ${question.userAnswer}`);
            // 这里可以调用 Vuex store 的 action 提交答案
          }
        });
      });

      // 可以根据需要添加逻辑，例如计算得分、跳转页面等
    }
  }
};
</script>

<style scoped>
.quiz-container {
  display: flex;
  justify-content: space-between;
}

.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
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
