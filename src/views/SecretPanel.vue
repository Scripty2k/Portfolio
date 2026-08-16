<template>
  <section class="secret-panel">
    <div class="panel-card">
      <div class="panel-header">
        <div>
          <h1>Super secret panel</h1>
          <p class="status">You are signed in as Admin.</p>
        </div>
        <button class="btn btn-primary" type="button" @click="signOut">
          Logout
        </button>
      </div>

      <!-- Projects CMS Section -->
      <div class="admin-section">
        <div class="section-header">
          <div>
            <h2>Projects CMS</h2>
            <p class="notice-help">Manage dynamic portfolio projects stored in Appwrite.</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-primary btn-sm" type="button" @click="openAddProject">
              + Add Project
            </button>
            <button class="btn btn-secondary btn-sm" type="button" :disabled="isSeeding" @click="seedDefaultProjects">
              {{ isSeeding ? 'Seeding...' : 'Seed 28 Default Projects' }}
            </button>
          </div>
        </div>

        <p v-if="projectStatus" class="notice-status" :class="{ error: projectStatusType === 'error' }">
          {{ projectStatus }}
        </p>

        <!-- Form Modal / Box -->
        <div v-if="showProjectForm" class="project-form-card">
          <h3>{{ editingProjectId ? 'Edit Project' : 'Add New Project' }}</h3>
          
          <form @submit.prevent="saveProject" class="project-form">
            <div class="form-grid">
              <label class="field">
                <span>Title *</span>
                <input v-model.trim="projectForm.title" type="text" required placeholder="Project title" />
              </label>

              <label class="field">
                <span>Category / Type *</span>
                <select v-model="projectForm.type" required class="notice-input">
                  <option value="Software">Software</option>
                  <option value="Videos">Videos</option>
                  <option value="Music">Music</option>
                  <option value="Extras">Extras</option>
                </select>
              </label>

              <label class="field">
                <span>Year</span>
                <input v-model.trim="projectForm.year" type="text" placeholder="e.g. 2026" />
              </label>

              <label class="field">
                <span>Technologies (comma separated)</span>
                <input v-model.trim="projectForm.technologies" type="text" placeholder="Vue.js, Typescript, Tailwind CSS" />
              </label>
            </div>

            <label class="field">
              <span>Description</span>
              <textarea v-model.trim="projectForm.description" rows="3" placeholder="Short description of the project..."></textarea>
            </label>

            <div class="form-grid">
              <label class="field">
                <span>Media Type</span>
                <select v-model="projectForm.media_type" class="notice-input">
                  <option value="image">Image</option>
                  <option value="youtube">YouTube</option>
                  <option value="behance">Behance</option>
                  <option value="instagram">Instagram</option>
                  <option value="soundcloud">SoundCloud</option>
                </select>
              </label>

              <label class="field">
                <span>Media Src (URL or ID)</span>
                <input v-model.trim="projectForm.media_src" type="text" placeholder="Image URL or YouTube ID (e.g. mfjHfZlRBg4)" />
              </label>

              <label class="field">
                <span>Thumbnail URL</span>
                <input v-model.trim="projectForm.media_thumbnail" type="text" placeholder="Fallback thumbnail image URL" />
              </label>

              <label class="field">
                <span>Status Badge</span>
                <input v-model.trim="projectForm.status" type="text" placeholder="e.g. W.I.P or Completed" />
              </label>
            </div>

            <div class="form-grid">
              <label class="field">
                <span>Live URL</span>
                <input v-model.trim="projectForm.live_url" type="text" placeholder="https://..." />
              </label>

              <label class="field">
                <span>GitHub URL</span>
                <input v-model.trim="projectForm.github_url" type="text" placeholder="https://github.com/..." />
              </label>

              <label class="field">
                <span>YouTube Link URL</span>
                <input v-model.trim="projectForm.youtube_url" type="text" placeholder="https://youtube.com/..." />
              </label>

              <label class="field">
                <span>YouTube Link Text</span>
                <input v-model.trim="projectForm.youtube_text" type="text" placeholder="e.g. See timelapse here" />
              </label>
            </div>

            <label class="checkbox-field">
              <input v-model="projectForm.featured" type="checkbox" />
              <span>Mark as Featured Project</span>
            </label>

            <div class="form-actions">
              <button class="btn btn-primary" type="submit" :disabled="isProjectSaving">
                {{ isProjectSaving ? 'Saving...' : (editingProjectId ? 'Update Project' : 'Create Project') }}
              </button>
              <button class="btn btn-secondary" type="button" :disabled="isProjectSaving" @click="showProjectForm = false">
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Projects Table / List -->
        <div class="projects-list-container">
          <div v-if="isLoadingProjects" class="loading-state">
            Loading projects...
          </div>
          <div v-else-if="dbProjects.length === 0" class="empty-state">
            <p>No dynamic projects found in Appwrite yet.</p>
            <p class="hint">Click <strong>+ Add Project</strong> to create your first dynamic project, or click <strong>Seed 28 Default Projects</strong> to upload all your initial projects.</p>
          </div>
          <div v-else class="projects-table">
            <div v-for="(proj, index) in dbProjects" :key="proj.$id" class="project-row">
              <div class="reorder-actions">
                <button class="btn-icon order-btn" type="button" :disabled="index === 0" @click="moveProject(index, -1)" title="Move Up">
                  ▲
                </button>
                <button class="btn-icon order-btn" type="button" :disabled="index === dbProjects.length - 1" @click="moveProject(index, 1)" title="Move Down">
                  ▼
                </button>
              </div>
              <div class="project-info">
                <strong>{{ proj.title }}</strong>
                <span class="meta-tag">{{ proj.type }} ({{ proj.year || 'N/A' }})</span>
                <p class="proj-desc">{{ proj.description }}</p>
              </div>
              <div class="row-actions">
                <button class="btn-icon edit" type="button" @click="editProject(proj)" title="Edit">
                  ✏️ Edit
                </button>
                <button class="btn-icon delete" type="button" @click="deleteProject(proj.$id)" title="Delete">
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Global Notifications Section -->
      <div class="admin-section">
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

      <!-- Availability Status Section -->
      <div class="admin-section">
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
  APPWRITE_COLLECTION_STATUS,
  APPWRITE_COLLECTION_PROJECTS
} from '../lib/appwrite'
import { staticProjects } from '../data/staticProjects.js'
import { ID, Query } from 'appwrite'

const router = useRouter()

// General Auth & Notifications
const notificationText = ref('')
const isSaving = ref(false)
const noticeStatus = ref('')
const noticeStatusType = ref('')

// Availability Status
const statusText = ref('Open to collaboration')
const statusDescription = ref('Currently looking for collabs and jobs in the future!')
const statusColor = ref('green')
const statusColorOptions = ['green', 'yellow', 'red']
const isStatusSaving = ref(false)
const statusStatus = ref('')
const statusStatusType = ref('')

// Projects CMS State
const dbProjects = ref([])
const isLoadingProjects = ref(false)
const isProjectSaving = ref(false)
const projectStatus = ref('')
const projectStatusType = ref('')
const isSeeding = ref(false)
const showProjectForm = ref(false)
const editingProjectId = ref(null)

const projectForm = ref({
  title: '',
  description: '',
  technologies: '',
  year: '2026',
  type: 'Software',
  status: '',
  featured: false,
  media_type: 'image',
  media_src: '',
  media_thumbnail: '',
  live_url: '',
  github_url: '',
  youtube_url: '',
  youtube_text: ''
})

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

const setProjectStatus = (message, type = 'success') => {
  projectStatus.value = message
  projectStatusType.value = type
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

// Global Notification functions
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
    setStatus('Failed to publish: ' + (error.message || 'Error'), 'error')
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
    setStatus('Failed to remove: ' + (error.message || 'Error'), 'error')
  } finally {
    isSaving.value = false
  }
}

// Availability status function
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
    setAvailabilityStatus(`Failed to update status: ${error.message || 'Error'}`, 'error')
  } finally {
    isStatusSaving.value = false
  }
}

// Projects CMS Functions
const fetchProjects = async () => {
  isLoadingProjects.value = true
  try {
    const res = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_PROJECTS,
      [Query.limit(100)]
    )
    const docs = res.documents || []
    docs.sort((a, b) => {
      const valA = typeof a.order_num === 'number' ? a.order_num : 99999
      const valB = typeof b.order_num === 'number' ? b.order_num : 99999
      return valA - valB
    })
    dbProjects.value = docs
  } catch (err) {
    console.error('Failed to fetch projects from Appwrite:', err)
  } finally {
    isLoadingProjects.value = false
  }
}

const moveProject = async (index, direction) => {
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= dbProjects.value.length) return

  const item = dbProjects.value.splice(index, 1)[0]
  dbProjects.value.splice(targetIndex, 0, item)

  dbProjects.value.forEach((p, idx) => {
    p.order_num = idx + 1
  })

  const current = dbProjects.value[targetIndex]
  const swapped = dbProjects.value[index]

  try {
    await Promise.all([
      databases.updateDocument(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_PROJECTS, current.$id, { order_num: current.order_num }),
      databases.updateDocument(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_PROJECTS, swapped.$id, { order_num: swapped.order_num })
    ])
    setProjectStatus('Project order updated successfully.')
  } catch (err) {
    console.warn('Appwrite order_num update note:', err.message || err)
    if (err.message && err.message.toLowerCase().includes('order_num')) {
      setProjectStatus('Tip: To save custom ordering permanently in Appwrite, add an Integer attribute named "order_num" to your projects collection.', 'error')
    } else {
      setProjectStatus('Project order updated locally.')
    }
  }
}

const resetProjectForm = () => {
  projectForm.value = {
    title: '',
    description: '',
    technologies: '',
    year: new Date().getFullYear().toString(),
    type: 'Software',
    status: '',
    featured: false,
    media_type: 'image',
    media_src: '',
    media_thumbnail: '',
    live_url: '',
    github_url: '',
    youtube_url: '',
    youtube_text: ''
  }
}

const openAddProject = () => {
  editingProjectId.value = null
  resetProjectForm()
  showProjectForm.value = true
}

const editProject = (proj) => {
  editingProjectId.value = proj.$id
  let techs = ''
  if (Array.isArray(proj.technologies)) {
    techs = proj.technologies.join(', ')
  } else if (typeof proj.technologies === 'string') {
    techs = proj.technologies
  }

  projectForm.value = {
    title: proj.title || '',
    description: proj.description || '',
    technologies: techs,
    year: proj.year || '',
    type: proj.type || 'Software',
    status: proj.status || '',
    featured: Boolean(proj.featured),
    media_type: proj.media_type || 'image',
    media_src: proj.media_src || '',
    media_thumbnail: proj.media_thumbnail || '',
    live_url: proj.live_url || '',
    github_url: proj.github_url || '',
    youtube_url: proj.youtube_url || '',
    youtube_text: proj.youtube_text || ''
  }
  showProjectForm.value = true
}

const saveProject = async () => {
  if (!projectForm.value.title) {
    setProjectStatus('Title is required.', 'error')
    return
  }

  isProjectSaving.value = true
  setProjectStatus('')

  const techsString = typeof projectForm.value.technologies === 'string'
    ? projectForm.value.technologies.trim()
    : (Array.isArray(projectForm.value.technologies) ? projectForm.value.technologies.join(', ') : '')

  const payload = {
    title: projectForm.value.title,
    description: projectForm.value.description || '',
    technologies: techsString,
    year: projectForm.value.year || '',
    type: projectForm.value.type || 'Software',
    status: projectForm.value.status || '',
    featured: Boolean(projectForm.value.featured),
    media_type: projectForm.value.media_type || 'image',
    media_src: projectForm.value.media_src || '',
    media_thumbnail: projectForm.value.media_thumbnail || '',
    live_url: projectForm.value.live_url || '',
    github_url: projectForm.value.github_url || '',
    youtube_url: projectForm.value.youtube_url || '',
    youtube_text: projectForm.value.youtube_text || ''
  }

  try {
    if (editingProjectId.value) {
      await databases.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_PROJECTS,
        editingProjectId.value,
        payload
      )
      setProjectStatus('Project updated successfully!')
    } else {
      await databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_PROJECTS,
        ID.unique(),
        payload
      )
      setProjectStatus('Project created successfully!')
    }
    showProjectForm.value = false
    await fetchProjects()
  } catch (err) {
    console.error('Project save error:', err)
    setProjectStatus(`Failed to save project: ${err.message || 'Error'}`, 'error')
  } finally {
    isProjectSaving.value = false
  }
}

const deleteProject = async (id) => {
  if (!confirm('Are you sure you want to delete this project?')) return

  try {
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_PROJECTS,
      id
    )
    setProjectStatus('Project deleted successfully.')
    await fetchProjects()
  } catch (err) {
    console.error('Project delete error:', err)
    setProjectStatus(`Failed to delete project: ${err.message || 'Error'}`, 'error')
  }
}

const seedDefaultProjects = async () => {
  if (!confirm('This will upload all 28 initial static projects into Appwrite. Continue?')) return

  isSeeding.value = true
  setProjectStatus('Seeding initial projects to Appwrite...')

  let count = 0
  let failed = 0

  for (let i = 0; i < staticProjects.length; i++) {
    const item = staticProjects[i]
    const itemTechsString = Array.isArray(item.technologies)
      ? item.technologies.join(', ')
      : (item.technologies || '')

    const payload = {
      title: item.title,
      description: item.description || '',
      technologies: itemTechsString,
      year: item.year || '',
      type: item.type || 'Software',
      status: item.status || '',
      featured: Boolean(item.featured),
      media_type: item.media ? item.media.type : 'image',
      media_src: item.media ? item.media.src : '',
      media_thumbnail: item.media ? (item.media.thumbnail || item.media.src) : '',
      live_url: item.liveUrl || '',
      github_url: item.githubUrl || '',
      youtube_url: item.youtubeUrl || '',
      youtube_text: item.youtubeText || '',
      order_num: i + 1
    }

    try {
      await databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_PROJECTS,
        ID.unique(),
        payload
      )
      count++
      setProjectStatus(`Seeding projects (${count}/${staticProjects.length})...`)
    } catch (err) {
      console.error(`Failed to seed project "${item.title}":`, err)
      failed++
    }
  }

  isSeeding.value = false
  if (failed === 0) {
    setProjectStatus(`Successfully seeded all ${count} projects into Appwrite!`)
  } else {
    setProjectStatus(`Seeding finished. Added ${count} projects (${failed} failed).`, 'error')
  }
  await fetchProjects()
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

  fetchProjects()
})
</script>

<style scoped>
.secret-panel {
  min-height: calc(100vh - 83px);
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
}

.panel-card {
  width: min(900px, 100%);
  background: #fff7eb;
  border: 1px solid rgba(41, 37, 36, 0.12);
  box-shadow: 0 20px 45px rgba(41, 37, 36, 0.08);
  border-radius: 16px;
  padding: 2.5rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(41, 37, 36, 0.1);
}

.status {
  color: #666;
  font-size: 0.95rem;
}

.admin-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(41, 37, 36, 0.1);
  display: grid;
  gap: 1rem;
}

.admin-section h2 {
  font-size: 1.4rem;
  font-weight: 700;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

.notice-help {
  color: #7a6f6a;
  margin: 0;
  font-size: 0.9rem;
}

.notice-controls, .status-controls {
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

.notice-input, select.notice-input, textarea {
  border: 1px solid rgba(41, 37, 36, 0.2);
  border-radius: 10px;
  padding: 0.75rem 0.9rem;
  font-size: 0.95rem;
  background: #fff;
  color: #292524;
  width: 100%;
  font-family: inherit;
}

.notice-status {
  font-size: 0.95rem;
  color: #2f6b2f;
  font-weight: 600;
}

.notice-status.error {
  color: #b42318;
}

/* Project CMS Specific Styles */
.project-form-card {
  background: #ffffff;
  border: 1px solid rgba(41, 37, 36, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.project-form-card h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.project-form {
  display: grid;
  gap: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.field {
  display: grid;
  gap: 0.3rem;
}

.field span {
  font-size: 0.85rem;
  font-weight: 600;
  color: #292524;
}

.field input {
  border: 1px solid rgba(41, 37, 36, 0.2);
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
}

.checkbox-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox-field input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.projects-list-container {
  margin-top: 1rem;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  color: #666;
}

.projects-table {
  display: grid;
  gap: 0.75rem;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.project-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid rgba(41, 37, 36, 0.1);
  border-radius: 10px;
  gap: 1rem;
}

.project-info {
  display: grid;
  gap: 0.25rem;
}

.meta-tag {
  font-size: 0.8rem;
  color: #7a6f6a;
  font-weight: 600;
}

.proj-desc {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.row-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  border: 1px solid rgba(41, 37, 36, 0.2);
  background: #fdfdfd;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #292524;
  color: #fff;
}

.btn-icon.delete:hover {
  background: #b42318;
  color: #fff;
  border-color: #b42318;
}

.reorder-actions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-btn {
  padding: 0.2rem 0.45rem;
  font-size: 0.65rem;
  line-height: 1;
}

.order-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
