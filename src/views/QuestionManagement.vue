<template>
    <div class="question-management">
      <h2>题目管理</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>题目</th>
            <th v-if="currentQuestionType === 'multiple-choice'">选项</th>
            <th v-if="currentQuestionType === 'true-false'">答案</th>
            <th v-if="currentQuestionType === 'short-answer'">答案</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in questions" :key="question.id">
            <td>{{ question.id }}</td>
            <td>{{ question.text }}</td>
            <td v-if="currentQuestionType === 'multiple-choice'">
              <ul>
                <li v-for="(option, index) in question.options" :key="index">
                  {{ option }}
                </li>
              </ul>
            </td>
            <td v-if="currentQuestionType === 'true-false'">
              {{ question.correctAnswer }}
            </td>
            <td v-if="currentQuestionType === 'short-answer'">
              {{ question.correctAnswer }}
            </td>
            <td>
              <button @click="editQuestion(question)" class="button">编辑</button>
              <button @click="deleteQuestion(question.id)" class="button">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'QuestionManagement',
    data() {
      return {
        questions: [],
        currentQuestionType: ''
      };
    },
    mounted() {
      this.fetchQuestions();
    },
    methods: {
      async fetchQuestions() {
        try {
          const response = await axios.get('http://localhost:3000/questions');
          this.questions = response.data;
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      },
      editQuestion(question) {
        // 根据题目类型进行适当的编辑处理
        switch (question.type) {
          case 'multiple-choice':
            // 编辑选择题的逻辑
            console.log('Editing multiple-choice question:', question.id);
            break;
          case 'true-false':
            // 编辑判断题的逻辑
            console.log('Editing true-false question:', question.id);
            break;
          case 'short-answer':
            // 编辑填空题的逻辑
            console.log('Editing short-answer question:', question.id);
            break;
          default:
            console.warn('Unknown question type:', question.type);
        }
      },
      deleteQuestion(questionId) {
        axios.delete(`http://localhost:3000/questions/${questionId}`)
          .then(response => {
            console.log('Question deleted successfully');
            this.fetchQuestions(); // 删除成功后刷新题目列表
          })
          .catch(error => {
            console.error('Error deleting question:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    border: 1px solid #ccc;
    padding: 8px;
  }
  
  .table th {
    background-color: #f2f2f2;
  }
  
  .button {
    margin-right: 5px;
  }
  </style>
  