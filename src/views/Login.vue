<template>
  <div class="login-page">
    <div class="title1">
      <span class="circled-text">简易</span>
      <p></p>
      <span class="main-title">语言练习站W3School</span>
      <p></p>
      <div class="scale">
        <span class="sub-title">Code Practice Station</span>
      </div>
    </div>

    <div class="login-container">
      <h2>登录</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const username = ref('');
const password = ref('');
const router = useRouter();
const store = useStore();

const handleSubmit = async () => {
  await store.dispatch('login', { username: username.value, password: password.value });
  if (store.state.user.isLoggedIn) {
     // 判断用户类别
     if (store.state.user.isAdmin) {
      console.log("turn to adminDashboard");
      router.push({ name: 'admin' }); // 管理员跳转到管理员界面
    } else {
      console.log("turn to home and isAdmin:",store.state.user.isAdmin);
      router.push({ name: 'home' }); // 普通用户跳转到首页或其他普通用户界面
    }
  }
};
</script>

<style scoped>
.login-page {
  background-image: url('../assets/background_in_space.gif');
  background-size: cover;
  background-position: bottom;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 0 10%;
  color: white;
}

.title1 {
  text-align: left;
}

.circled-text {
  font-size: 40px;
  border: 1px solid #000;
  padding: 10px;
  border-radius: 20px;
}

.main-title {
  font-size: 100px;
  font-family: 'stkaiti';
  color: #000;
}

.sub-title {
  font-size: 40px;
  font-family: 'stkaiti';
  color: #000;
  transform: scale(1.2, 1);
}

.login-container {
  text-align: center;
  font-size: large;
  line-height: 1.5;
  max-width: 400px;
  width: 400px;
  height: 300px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
}

input {
  margin: 10px 0;
  width: 100%;
  line-height: 2;
  padding: 10px;
  font-size: 16px;
}

button {
  background-image: linear-gradient(to right, #afd2f0 0%, #c2ebed 100%);
  color: white;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  height: 40px;
  width: 100%;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-top: 20px;
}

button:hover {
  background-image: linear-gradient(to right, #c2ebed 0%, #afd2f0 100%);
}
</style>
