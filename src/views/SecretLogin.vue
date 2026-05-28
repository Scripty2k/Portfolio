<template>
  <section class="secret-login">
    <div class="secret-card">
      <h1>Scripty2k Secret</h1>
      <p class="hint">Admin access only</p>
      <form @submit.prevent="signIn">
        <label class="field">
          <span>Email</span>
          <input v-model="email" type="email" autocomplete="email" required />
        </label>
        <label class="field">
          <span>Password</span>
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>
        <button class="btn btn-primary" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const signIn = async () => {
  error.value = ''
  isLoading.value = true

  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  isLoading.value = false

  if (authError) {
    error.value = authError.message
    return
  }

  if (data.session) {
    router.push('/scripty2k-secret/panel')
  }
}

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    router.replace('/scripty2k-secret/panel')
  }
})
</script>

<style scoped>
.secret-login {
  min-height: calc(100vh - 83px);
  display: grid;
  place-items: center;
  padding: 2rem;
}

.secret-card {
  width: min(520px, 100%);
  background: #fff7eb;
  border: 1px solid rgba(41, 37, 36, 0.12);
  box-shadow: 0 20px 45px rgba(41, 37, 36, 0.08);
  border-radius: 16px;
  padding: 2.5rem;
}

.secret-card h1 {
  margin-bottom: 0.5rem;
}

.hint {
  margin-bottom: 1.5rem;
  color: #666;
}

.field {
  display: grid;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.field span {
  font-weight: 600;
  color: #292524;
}

.field input {
  border: 1px solid rgba(41, 37, 36, 0.2);
  border-radius: 10px;
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  background: #fff;
}

.error {
  margin-top: 0.75rem;
  color: #b91c1c;
  font-weight: 600;
}
</style>
