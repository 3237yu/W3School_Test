<template>
  <div class="admin-container">
    <SidebarAdmin :is-open="isSidebarOpen" @toggle="toggleSidebar" />
    <div :class="['admin-dashboard', { 'sidebar-open': isSidebarOpen }]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from '../components/Sidebar_Admin.vue';
import { mapState } from 'vuex';

export default {
  name: 'AdminDashboard',
  components: {
    SidebarAdmin
  },
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style scoped>
.admin-container {
  display: flex;
}

.admin-dashboard {
  flex-grow: 1;
  padding: 20px;
  margin-right: 200px; /* Adjusted for sidebar */
  transition: margin-right 0.3s ease;
}

.admin-dashboard.sidebar-open {
  margin-right: 200px; /* Adjusted for sidebar */
}

.admin-dashboard:not(.sidebar-open) {
  margin-right: 40px;
}

h1 {
  margin-bottom: 20px;
}
</style>
