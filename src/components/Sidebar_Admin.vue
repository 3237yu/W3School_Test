<template>
  <div :class="['sidebar', { open: isOpen }]">
    <div class="sidebar-header">
      <button class="toggle-button" @click="toggleSidebar">
        {{ isOpen ? '<<' : '>>' }}
        <span>管理菜单</span>
      </button>
    </div>
    <ul v-show="isOpen">
      <li>
        <router-link to="/admin/home" active-class="active-link">主页</router-link>
      </li>
      <li>
        <router-link to="/admin/questions" active-class="active-link">题目管理</router-link>
      </li>
      <li>
        <router-link to="/admin/users" active-class="active-link">用户管理</router-link>
      </li>
      <li>
        <router-link to="/admin/analytics" active-class="active-link">分析</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarAdmin',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle');
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f5f5f5;
  padding: 10px;
  height: calc(100vh - 60px); /* Adjust height to account for header height */
  position: fixed;
  top: 60px; /* Adjust top to account for header height */
  right: 0; /* Move sidebar to the right */
  transition: width 0.3s ease;
  overflow-y: auto;
  border-left: 1px solid #ccc; /* Adjust border */
  display: flex;
  flex-direction: column;
}

.sidebar.open {
  width: 200px;
}

.sidebar:not(.open) {
  width: 40px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  color: #333;
}

.toggle-button {
  background-color: #009a68;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  text-align: center;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
}

li {
  margin-bottom: 10px;
  padding-left: 10px;
}

a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 5px;
}

a:hover {
  background-color: #cccccc;
}

.active-link {
  color: #009a68;
  font-weight: bold;
}
</style>
