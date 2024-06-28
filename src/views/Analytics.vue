<template>
    <div class="analytics">
      <h2>数据统计</h2>
      <div class="statistics">
        <div class="stat-item">
          <h3>网站访问次数</h3>
          <p>{{ siteVisits }}</p>
        </div>
        <div class="stat-item">
          <h3>主题访问情况</h3>
          <ul>
            <li v-for="topic in topicVisits" :key="topic.id">
              {{ topic.name }}: {{ topic.visits }} 次
            </li>
          </ul>
        </div>
        <div class="stat-item">
          <h3>答题情况</h3>
          <ul>
            <li v-for="question in questionAttempts" :key="question.id">
              题目 {{ question.id }}: 尝试次数 {{ question.attempts }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Analytics',
    data() {
      return {
        siteVisits: 0,
        topicVisits: [],
        questionAttempts: []
      };
    },
    mounted() {
      this.fetchAnalytics();
    },
    methods: {
      async fetchAnalytics() {
        try {
          const siteVisitsResponse = await axios.get('http://localhost:3000/siteVisits');
          const topicVisitsResponse = await axios.get('http://localhost:3000/topicVisits');
          const questionAttemptsResponse = await axios.get('http://localhost:3000/questionAttempts');
          
          this.siteVisits = siteVisitsResponse.data.count;
          this.topicVisits = topicVisitsResponse.data;
          this.questionAttempts = questionAttemptsResponse.data;
        } catch (error) {
          console.error('Error fetching analytics:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .statistics {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .stat-item {
    flex: 1;
    min-width: 200px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  </style>
  