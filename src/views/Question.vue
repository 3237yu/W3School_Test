<template>
  <div>
    <h2>Questions</h2>
    <ul>
      <li v-for="question in questions" :key="question.id">
        <p>{{ question.text }}</p>
        <div v-if="question.type === 'multiple-choice'">
          <div v-for="(option, index) in question.options" :key="index">
            <input type="radio" :name="`question-${question.id}`" :value="option" v-model="answers[question.id]" />
            <label>{{ option }}</label>
          </div>
        </div>
        <div v-if="question.type === 'true-false'">
          <input type="radio" :name="`question-${question.id}`" value="true" v-model="answers[question.id]" />
          <label>True</label>
          <input type="radio" :name="`question-${question.id}`" value="false" v-model="answers[question.id]" />
          <label>False</label>
        </div>
      </li>
    </ul>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  props: ['questions'],
  data() {
    return {
      answers: {}
    };
  },
  methods: {
    submit() {
      console.log(this.answers);
      // 这里可以添加提交逻辑
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: left;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
