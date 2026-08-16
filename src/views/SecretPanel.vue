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

      <div class="status-admin">
        <h2>Availability status</h2>
        <p class="notice-help">Update the current status text and the dot color.</p>
        <div class="status-controls">
          <input
            v-model.trim="statusText"
            class="notice-input"
            type="text"
            placeholder="Current status text"
            :disabled="isStatusSaving"
          />
          <input
            v-model.trim="statusDescription"
            class="notice-input"
            type="text"
            placeholder="Status description"
            :disabled="isStatusSaving"
          />
          <div class="status-toggle">
            <span class="toggle-label">Dot color</span>
            <div class="toggle-options">
              <button
                v-for="option in statusColorOptions"
                :key="option"
                type="button"
                class="toggle-option"
                :class="{ active: statusColor === option }"
                :disabled="isStatusSaving"
                @click="statusColor = option"
              >
                {{ option }}
              </button>
            </div>
          </div>
          <button class="btn btn-primary" type="button" :disabled="isStatusSaving" @click="saveStatus">
            Save status
          </button>
        </div>
        <p v-if="statusStatus" class="notice-status" :class="{ error: statusStatusType === 'error' }">
          {{ statusStatus }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import {
  account,
  databases,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_NOTIFICATIONS,
  APPWRITE_COLLECTION_STATUS
} from '../lib/appwrite'

const router = useRouter()
const notificationText = ref('')
const isSaving = ref(false)
const noticeStatus = ref('')
const noticeStatusType = ref('')
const statusText = ref('Open to collaboration')
const statusDescription = ref('Currently looking for collabs and jobs in the future!')
const statusColor = ref('green')
const statusColorOptions = ['green', 'yellow', 'red']
const isStatusSaving = ref(false)
const statusStatus = ref('')
const statusStatusType = ref('')

const signOut = async () => {
  try {
    await account.deleteSession('current')
  } catch (err) {
    console.error('Logout error:', err)
  }
  router.push('/scripty2k-secret')
}

const setStatus = (message, type = 'success') => {
  noticeStatus.value = message
  noticeStatusType.value = type
}

const setAvailabilityStatus = (message, type = 'success') => {
  statusStatus.value = message
  statusStatusType.value = type
}

const upsertDocument = async (colId, docId, data) => {
  try {
    return await databases.updateDocument(APPWRITE_DATABASE_ID, colId, docId, data)
  } catch (error) {
    if (error.code === 404) {
      return await databases.createDocument(APPWRITE_DATABASE_ID, colId, docId, data)
    }
    throw error
  }
}

const saveNotification = async () => {
  const message = notificationText.value.trim()

  if (!message) {
    setStatus('Please enter a message before publishing.', 'error')
    return
  }

  isSaving.value = true
  try {
    await upsertDocument(APPWRITE_COLLECTION_NOTIFICATIONS, '1', {
      message,
      is_active: true
    })
    setStatus('Notification published globally.')
  } catch (error) {
    console.error('Failed to save notification:', error)
    setStatus('Failed to publish the notification: ' + (error.message || 'Error'), 'error')
  } finally {
    isSaving.value = false
  }
}

const clearNotification = async () => {
  isSaving.value = true
  notificationText.value = ''
  try {
    await upsertDocument(APPWRITE_COLLECTION_NOTIFICATIONS, '1', {
      message: '',
      is_active: false
    })
    setStatus('Notification removed globally.')
  } catch (error) {
    console.error('Failed to clear notification:', error)
    setStatus('Failed to remove the notification: ' + (error.message || 'Error'), 'error')
  } finally {
    isSaving.value = false
  }
}

const saveStatus = async () => {
  const statusMessage = statusText.value.trim()
  const statusDetail = statusDescription.value.trim()

  if (!statusMessage || !statusDetail) {
    setAvailabilityStatus('Please enter both status fields.', 'error')
    return
  }

  if (!statusColorOptions.includes(statusColor.value)) {
    setAvailabilityStatus('Please select a valid status color.', 'error')
    return
  }

  isStatusSaving.value = true
  try {
    await upsertDocument(APPWRITE_COLLECTION_STATUS, '1', {
      status_text: statusMessage,
      status_description: statusDetail,
      status_color: statusColor.value
    })
    setAvailabilityStatus('Availability status updated.')
  } catch (error) {
    console.error('Availability status update failed:', error)
    setAvailabilityStatus(`Failed to update availability status: ${error.message || 'Error'}`, 'error')
  } finally {
    isStatusSaving.value = false
  }
}

onMounted(async () => {
  try {
    const data = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_NOTIFICATIONS,
      '1'
    )
    if (data && data.is_active && data.message) {
      notificationText.value = data.message
    }
  } catch {
    // Document does not exist or fetch failed
  }

  try {
    const statusData = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_STATUS,
      '1'
    )
    if (statusData) {
      statusText.value = statusData.status_text || statusText.value
      statusDescription.value = statusData.status_description || statusDescription.value
      if (statusData.status_color && statusColorOptions.includes(statusData.status_color)) {
        statusColor.value = statusData.status_color
      }
    }
  } catch {
    // Document does not exist or fetch failed
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

.status-admin {
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

.status-controls {
  display: grid;
  gap: 0.75rem;
}

.status-toggle {
  display: grid;
  gap: 0.5rem;
}

.toggle-label {
  font-size: 0.9rem;
  color: #7a6f6a;
}

.toggle-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.toggle-option {
  border: 1px solid rgba(41, 37, 36, 0.2);
  background: #fff;
  color: #292524;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  text-transform: capitalize;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-option.active {
  background: #292524;
  color: #fff;
}

.toggle-option:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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
