<template>
    <div class="user-management">
      <h2>用户管理</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>类别</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.isAdmin ? '管理员' : '普通用户' }}</td>
            <td>
              <button @click="editUser(user)">编辑</button>
              <button @click="deleteUser(user.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserManagement',
    data() {
      return {
        users: []
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/users');
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      editUser(user) {
        // 实现编辑用户的逻辑，可以跳转到编辑页面或弹出编辑表单
        console.log('Editing user:', user.id);
      },
      async deleteUser(userId) {
        try {
          await axios.delete(`http://localhost:3000/users/${userId}`);
          this.fetchUsers(); // 重新获取用户列表
        } catch (error) {
          console.error('Error deleting user:', error);
        }
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
  