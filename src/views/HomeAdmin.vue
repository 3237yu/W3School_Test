<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>欢迎管理员, {{ adminName }}</h1>
    </div>
    <div class="dashboard-widgets">
      <div class="widget">
        <h2>系统统计</h2>
        <ul>
          <li>总用户数: {{ totalUsers }}</li>
          <li>总题目数: {{ totalQuestions }}</li>
          <li>总访问量: {{ totalVisits }}</li>
        </ul>
      </div>
      <div class="widget">
        <h2>快捷链接</h2>
        <ul>
          <li><router-link to="/admin/questions">题目管理</router-link></li>
          <li><router-link to="/admin/users">用户管理</router-link></li>
          <li><router-link to="/admin/analytics">分析</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomeAdmin',
  computed: mapState({
    adminName: state => state.user.username,
    totalUsers: state => state.statistics.totalUsers,
    totalQuestions: state => state.statistics.totalQuestions,
    totalVisits: state => state.statistics.totalVisits
  }),
  created() {
    this.$store.dispatch('fetchStatistics');
  }
};
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column; /* 设置为列布局，子元素在垂直方向排列 */
  padding: 20px;
}

.admin-header {
  margin-bottom: 20px; /* 增加下边距 */
}

.dashboard-widgets {
  display: flex;
  gap: 20px;
}

.widget {
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.widget h2 {
  margin-bottom: 10px;
}

.widget ul {
  list-style: none;
  padding: 0;
}

.widget ul li {
  margin-bottom: 5px;
}

.widget ul li a {
  color: #007bff;
  text-decoration: none;
}

.widget ul li a:hover {
  text-decoration: underline;
}
</style>
