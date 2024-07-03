<script setup lang="ts">
import { useAuthStore } from '@/Store/Auth';
import AdminDashboard from './Admin/Dashboard.vue';
import UserDashboard from './User/Dashboard.vue';
import { computed } from 'vue';

const authStore = useAuthStore();
const isAdmin = computed(() => {
  if (authStore.user?.roles.find((role) => role == "Admin")) {
    return true;
  }

  return false;
});

</script>

<template>
  <AdminDashboard v-if="isAdmin" />
  <UserDashboard :user="authStore.user ?? null" v-else />
</template>
