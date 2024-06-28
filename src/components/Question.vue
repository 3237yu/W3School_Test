<template>
  <div class="question">
    <hr /> <!-- 初始位置的分隔线 -->
    <h3>{{ title }}</h3>
    <p>{{ question.text }}</p>
    <div v-if="question.type === 'multiple-choice'">
      <div v-for="option in question.options" :key="option" class="option">
        <label>
          <input
            type="radio"
            :value="option"
            v-model="userAnswer"
            @change="emitAnswerChange"
          />
          {{ option }}
        </label>
      </div>
    </div>
    <div v-else-if="question.type === 'true-false'">
      <label>
        <input
          type="radio"
          value="true"
          v-model="userAnswer"
          @change="emitAnswerChange"
        />
        True
      </label>
      <label>
        <input
          type="radio"
          value="false"
          v-model="userAnswer"
          @change="emitAnswerChange"
        />
        False
      </label>
    </div>
    <div v-else-if="question.type === 'short-answer'">
      <input
        type="text"
        v-model="userAnswer"
        @input="emitAnswerChange"
      />
    </div>
    <div>
      <button @click="toggleShowAnswer">
        {{ showingAnswer ? '隐藏答案' : '显示答案' }}
      </button>
      <div v-if="showingAnswer">正确答案: {{ question.correctAnswer }}</div>
      <div v-if="userAnswer">
        <div v-if="isCorrect" style="color: green;">回答正确！</div>
        <div v-else style="color: red;">回答错误，正确答案: {{ question.correctAnswer }}</div>
        <button @click="retry">重新答题</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      userAnswer: null,
      showingAnswer: false,
      isCorrect: false
    };
  },
  computed: {
    title() {
      return `Question ${this.index + 1}`;
    }
  },
  methods: {
    emitAnswerChange() {
      this.$emit('answer-changed', { questionId: this.question.id, answer: this.userAnswer });
      this.submitAnswer();
    },
    submitAnswer() {
      this.isCorrect = this.userAnswer === this.question.correctAnswer;
    },
    toggleShowAnswer() {
      this.showingAnswer = !this.showingAnswer;
    },
    retry() {
      this.userAnswer = null;
      this.showingAnswer = false;
      this.isCorrect = false;
    }
  }
};
</script>

<style scoped>
.question {
  margin-bottom: 20px;
}

.option {
  text-align: left;
}

button {
  margin-top: 10px;
}

hr {
  margin-bottom: 10px;
  border: 0;
  border-top: 1px solid #ccc;
}
</style>
