<template>
  <div class="max-w-md mx-auto mt-20">
    <h2 class="text-2xl font-semibold mb-6">Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" class="input mb-4" required />
      <input v-model="password" type="password" placeholder="Password" class="input mb-4" required />
      <button type="submit" class="btn w-full">Login</button>
    </form>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';

const router = useRouter();
const { initializeUser } = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  try {
    const data = await login(email.value, password.value);
    initializeUser();
    const role = data.role;
    console.log('role: ', role);
    if (role == "admin") {router.push('/admin');}
    else{router.push('/');}
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed';
  }
};
</script>
