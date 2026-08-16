import { Client, Account, Databases } from 'appwrite'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1'
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || ''

export const client = new Client()

if (projectId) {
  client
    .setEndpoint(endpoint)
    .setProject(projectId)
}

export const account = new Account(client)
export const databases = new Databases(client)

export const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'portfolio_db'
export const APPWRITE_COLLECTION_NOTIFICATIONS = import.meta.env.VITE_APPWRITE_COLLECTION_NOTIFICATIONS || 'global_notifications'
export const APPWRITE_COLLECTION_STATUS = import.meta.env.VITE_APPWRITE_COLLECTION_STATUS || 'availability_status'
export const APPWRITE_COLLECTION_PROJECTS = import.meta.env.VITE_APPWRITE_COLLECTION_PROJECTS || 'projects'
