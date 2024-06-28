<template>
  <div id="app">
    <Header />
    <SidebarAdmin v-if="isAdmin" :isOpen="isAdminOpen" @toggle="toggleSidebar" />
    <div :class="['content', { 'sidebar-open': isAdmin && isAdminOpen }]">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './components/Header.vue';
import SidebarAdmin from './components/Sidebar_Admin.vue';

export default {
  name: 'App',
  components: {
    Header,
    SidebarAdmin
  },
  data() {
    return {
      isAdminOpen: false
    };
  },
  computed: {
    ...mapState({
      isAdmin: state => state.user.isAdmin
    })
  },
  methods: {
    toggleSidebar() {
      this.isAdminOpen = !this.isAdminOpen;
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.content {
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.sidebar-open .content {
  margin-left: 200px; /* Adjust based on sidebar width */
}

.sidebar-open .content:not(.isAdminOpen) {
  margin-left: 40px; /* Adjust based on collapsed sidebar width */
}
</style>
