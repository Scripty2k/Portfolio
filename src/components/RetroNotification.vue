<template>
  <transition name="notification" appear>
    <div 
      v-if="show" 
      class="retro-notification"
      :class="{ 'retro-style': isRetroMode }"
    >
      <div class="notification-window">
        <div class="notification-header">
          <span class="notification-title">System Message</span>
          <div class="window-controls">
            <button class="window-control minimize">_</button>
            <button class="window-control maximize">□</button>
            <button class="window-control close" @click="$emit('close')">×</button>
          </div>
        </div>
        <div class="notification-content">
          <div class="notification-icon">
            {{ isRetroMode ? '💻' : '🔙' }}
          </div>
          <div class="notification-text">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  isRetroMode: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>

<style scoped>
.retro-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100000;
  font-family: 'Inter', sans-serif;
}

.notification-window {
  background: rgba(255, 240, 223, 0.95);
  border: 1px solid rgba(41, 37, 36, 0.1);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  overflow: hidden;
  min-width: 300px;
  max-width: 400px;
}

.notification-header {
  background: linear-gradient(135deg, #3e291a 0%, #3e291a 100%);
  color: white;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-title {
  font-weight: 600;
}

.window-controls {
  display: flex;
  gap: 4px;
}

.window-control {
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
  min-width: unset;
}

.minimize {
  background: #ffbe2e;
  color: #995700;
}

.maximize {
  background: #2ecc40;
  color: #0e5c1a;
}

.close {
  background: #ff4757;
  color: #8b0000;
}

.window-control:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.notification-content {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.notification-icon {
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

.notification-text {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.5px;
}

/* Retro styling when in retro mode */
.retro-style .notification-window {
  background: #c0c0c0 !important;
  border: 2px outset #c0c0c0 !important;
  border-radius: 0 !important;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: none !important;
}

.retro-style .notification-header {
  background: linear-gradient(to right, #0a5a9e 0%, #316ac5 100%) !important;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif !important;
  font-size: 11px !important;
  padding: 4px 8px !important;
  border-bottom: 1px solid #000 !important;
}

.retro-style .window-control {
  width: 16px !important;
  height: 14px !important;
  background: #c0c0c0 !important;
  border: 1px outset #c0c0c0 !important;
  border-radius: 0 !important;
  font-size: 8px !important;
  color: #000 !important;
}

.retro-style .window-control:hover {
  background: #a0a0a0 !important;
  transform: none !important;
  opacity: 1 !important;
}

.retro-style .window-control:active {
  border: 1px inset #c0c0c0 !important;
}

.retro-style .notification-content {
  background: #c0c0c0 !important;
  padding: 8px !important;
}

.retro-style .notification-icon {
  background: #c0c0c0 !important;
  border: 1px inset #c0c0c0 !important;
  border-radius: 0 !important;
  font-size: 16px !important;
}

.retro-style .notification-text {
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif !important;
  font-size: 11px !important;
  font-weight: bold !important;
  color: #000 !important;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.8) !important;
}

/* Animations */
.notification-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-50px) scale(0.8);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(0.9);
}
</style>