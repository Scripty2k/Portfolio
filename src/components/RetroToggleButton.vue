<template>
  <button 
    class="retro-toggle-btn"
    :class="{ 
      'retro-mode': isRetroMode,
      'transitioning': isTransitioning 
    }"
    @click="toggleRetroMode"
    :disabled="isTransitioning"
    :title="isRetroMode ? 'Exit Retro Mode' : 'Enter Retro Mode'"
  >
    <div class="btn-icon">
      <transition name="icon" mode="out-in">
        <div v-if="isRetroMode" key="retro" class="icon retro-icon">
          💻
        </div>
        <div v-else key="modern" class="icon modern-icon">
          🖥️
        </div>
      </transition>
    </div>
    <div class="btn-glow" :class="{ active: isRetroMode }"></div>
  </button>
</template>

<script setup>
import { useRetroTheme } from '../composables/useRetroTheme.js'

const { isRetroMode, isTransitioning, toggleRetroMode } = useRetroTheme()
</script>

<style scoped>
.retro-toggle-btn {
  position: fixed;
  top: 100px;
  left: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: #292524;
  color: #fff0df;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 15px rgba(102, 126, 234, 0.4),
    0 0 0 0 rgba(102, 126, 234, 0.5);
  overflow: hidden;
  position: relative;
}

.retro-toggle-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 8px 25px rgba(102, 126, 234, 0.6),
    0 0 0 8px rgba(102, 126, 234, 0.1);
}

.retro-toggle-btn:active {
  transform: translateY(0) scale(0.95);
}

.retro-toggle-btn.transitioning {
  pointer-events: none;
  animation: pulse 0.5s ease-in-out;
}

.retro-toggle-btn.retro-mode {
  background: linear-gradient(135deg, #c0c0c0 0%, #808080 100%);
  border: 3px outset #c0c0c0;
  box-shadow: 
    2px 2px 8px rgba(0, 0, 0, 0.5),
    0 0 0 0 rgba(192, 192, 192, 0.5);
}

.retro-toggle-btn.retro-mode:hover {
  background: linear-gradient(135deg, #a0a0a0 0%, #606060 100%);
  border: 3px inset #c0c0c0;
  transform: translateY(-1px) scale(1.02);
  box-shadow: 
    1px 1px 4px rgba(0, 0, 0, 0.7),
    0 0 0 4px rgba(192, 192, 192, 0.2);
}

.btn-icon {
  position: relative;
  z-index: 2;
}

.icon {
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.retro-icon {
  filter: grayscale(0.2) contrast(1.2);
}

.modern-icon {
  filter: brightness(1.1);
}

.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
  z-index: 1;
}

.btn-glow.active {
  width: 100%;
  height: 100%;
}

/* Icon transition animations */
.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s ease;
}

.icon-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
}

.icon-leave-to {
  opacity: 0;
  transform: scale(1.5) rotate(-180deg);
}

/* Pulse animation for transitioning state */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .retro-toggle-btn {
    width: 50px;
    height: 50px;
    top: 85px;
    left: 1rem;
  }
  
  .icon {
    font-size: 20px;
  }
}

/* Loading spinner for transition */
.retro-toggle-btn.transitioning::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: spin 1s linear infinite;
  z-index: 3;
}

.retro-toggle-btn.transitioning .btn-icon {
  opacity: 0.3;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Tooltip styling */
.retro-toggle-btn::after {
  content: attr(title);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(41, 37, 36, 0.8);
  color: #fff0df;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  margin-top: 8px;
  pointer-events: none;
  z-index: 10001;
}

.retro-toggle-btn:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(4px);
}

/* Retro mode tooltip */
.retro-toggle-btn.retro-mode::after {
  background: #c0c0c0;
  color: #000;
  border: 1px solid #808080;
  border-radius: 0;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  font-size: 11px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>