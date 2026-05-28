<template>
  <section class="secret-panel">
    <div class="panel-card">
      <h1>Super secret panel</h1>
      <p class="status">You are signed in.</p>
      <button class="btn btn-primary" type="button" @click="signOut">
        Logout
      </button>

      <div class="notice-admin">
        <h2>Send notification</h2>
        <p class="notice-help">Publish a global banner message across the site.</p>
        <div class="notice-controls">
          <input
            v-model.trim="notificationText"
            class="notice-input"
            type="text"
            placeholder="Type the notification message"
            :disabled="isSaving"
          />
          <button class="btn btn-primary" type="button" :disabled="isSaving" @click="saveNotification">
            Enter
          </button>
          <button class="btn btn-secondary" type="button" :disabled="isSaving" @click="clearNotification">
            Remove
          </button>
        </div>
        <p v-if="noticeStatus" class="notice-status" :class="{ error: noticeStatusType === 'error' }">
          {{ noticeStatus }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { supabase } from '../lib/supabase'

const router = useRouter()
const notificationText = ref('')
const isSaving = ref(false)
const noticeStatus = ref('')
const noticeStatusType = ref('')

const signOut = async () => {
  await supabase.auth.signOut()
  router.push('/scripty2k-secret')
}

const setStatus = (message, type = 'success') => {
  noticeStatus.value = message
  noticeStatusType.value = type
}

const saveNotification = async () => {
  const message = notificationText.value.trim()

  if (!message) {
    setStatus('Please enter a message before publishing.', 'error')
    return
  }

  isSaving.value = true
  const { error } = await supabase
    .from('global_notifications')
    .upsert({
      id: 1,
      message,
      is_active: true,
      updated_at: new Date().toISOString()
    })

  if (error) {
    setStatus('Failed to publish the notification.', 'error')
  } else {
    setStatus('Notification published globally.')
  }

  isSaving.value = false
}

const clearNotification = async () => {
  isSaving.value = true
  notificationText.value = ''
  const { error } = await supabase
    .from('global_notifications')
    .upsert({
      id: 1,
      message: '',
      is_active: false,
      updated_at: new Date().toISOString()
    })

  if (error) {
    setStatus('Failed to remove the notification.', 'error')
  } else {
    setStatus('Notification removed globally.')
  }

  isSaving.value = false
}

onMounted(async () => {
  const { data } = await supabase
    .from('global_notifications')
    .select('message, is_active')
    .eq('id', 1)
    .maybeSingle()

  if (data && data.is_active && data.message) {
    notificationText.value = data.message
  }
})
</script>

<style scoped>
.secret-panel {
  min-height: calc(100vh - 83px);
  display: grid;
  place-items: center;
  padding: 2rem;
}

.panel-card {
  width: min(520px, 100%);
  background: #fff7eb;
  border: 1px solid rgba(41, 37, 36, 0.12);
  box-shadow: 0 20px 45px rgba(41, 37, 36, 0.08);
  border-radius: 16px;
  padding: 2.5rem;
}

.status {
  margin: 1rem 0 2rem;
  color: #666;
}

.notice-admin {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(41, 37, 36, 0.1);
  display: grid;
  gap: 1rem;
}

.notice-admin h2 {
  font-size: 1.4rem;
  font-weight: 700;
}

.notice-help {
  color: #7a6f6a;
  margin: 0;
}

.notice-controls {
  display: grid;
  gap: 0.75rem;
}

.notice-input {
  border: 1px solid rgba(41, 37, 36, 0.2);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  background: #fff;
  color: #292524;
}

.notice-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.notice-controls .btn {
  width: 100%;
}

.notice-status {
  font-size: 0.95rem;
  color: #2f6b2f;
}

.notice-status.error {
  color: #b42318;
}
</style>
