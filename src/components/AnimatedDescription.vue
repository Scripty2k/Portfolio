<template>
  <div class="animated-description">
    <div 
      v-for="(part, index) in descriptionParts" 
      :key="index"
      class="description-part"
      :class="[
        `animation-type-${part.type}`,
        currentActiveIndex === index ? 'active' : ''
      ]"
    >
      <span v-if="part.type === 'binary'" class="text-with-effect">
        {{ part.text }}
        <span 
          class="binary-char binary-1"
        >
          1
        </span>
        <span 
          class="binary-char binary-2"
        >
          0
        </span>
        <span 
          class="binary-char binary-3"
        >
          1
        </span>
      </span>

      <span v-else-if="part.type === 'sparkles'" class="text-with-effect">
        {{ part.text }}
        <span 
          class="sparkle-char sparkle-1"
        >
          ★
        </span>
        <span 
          class="sparkle-char sparkle-2"
        >
          ★
        </span>
        <span 
          class="sparkle-char sparkle-3"
        >
          ★
        </span>
      </span>

      <span v-else-if="part.type === 'underline'" class="text-with-underline">
        {{ part.text }}
        <span class="underline-mark"></span>
      </span>

      <span v-else-if="part.type === 'glitch'" class="text-with-glitch">
        <span class="glitch-text">{{ part.text }}</span>
        <span class="glitch-text glitch-clone glitch-clone-1">{{ part.text }}</span>
        <span class="glitch-text glitch-clone glitch-clone-2">{{ part.text }}</span>
      </span>

      <span v-else>{{ part.text }}</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'AnimatedDescription',
  setup() {
    const currentActiveIndex = ref(-1)
    const animationDuration = 1000 // 1 second per animation

    const descriptionParts = [
      { text: 'Software Developer,', type: 'binary' },
      { text: 'Designer,', type: 'sparkles' },
      { text: 'Artist', type: 'underline' },
      { text: 'and Hacking Enthusiast.', type: 'glitch' }
    ]

    const startSequentialAnimation = () => {
      descriptionParts.forEach((part, index) => {
        setTimeout(() => {
          currentActiveIndex.value = index
        }, index * (animationDuration + 200)) // 200ms gap between animations
      })
    }

    onMounted(() => {
      // Start the animation after a slight delay
      setTimeout(() => {
        startSequentialAnimation()
      }, 800)
    })

    return {
      descriptionParts,
      currentActiveIndex
    }
  }
}
</script>

<style scoped>
.animated-description {
  display: inline;
  font-size: 1.1rem;
  line-height: 1.6;
}

.description-part {
  position: relative;
  display: inline;
  margin-right: 0.25rem;
}

.description-part.animation-type-binary.active .binary-char {
  animation: fallAndFade 0.8s ease-out forwards;
}

.description-part.animation-type-binary.active .binary-1 {
  animation-delay: 0s;
}

.description-part.animation-type-binary.active .binary-2 {
  animation-delay: 0.1s;
}

.description-part.animation-type-binary.active .binary-3 {
  animation-delay: 0.2s;
}

.description-part.animation-type-sparkles.active .sparkle-char {
  animation: sparklePopup 0.5s ease-out forwards;
}

.description-part.animation-type-sparkles.active .sparkle-1 {
  animation-delay: 0s;
}

.description-part.animation-type-sparkles.active .sparkle-2 {
  animation-delay: 0.1s;
}

.description-part.animation-type-sparkles.active .sparkle-3 {
  animation-delay: 0.2s;
}

.description-part.animation-type-underline.active .underline-mark {
  animation: underlineReveal 0.8s ease-out forwards;
}

.text-with-effect {
  position: relative;
  display: inline-block;
}

.binary-char,
.sparkle-char {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.binary-char {
  font-size: 0.7rem;
  color: #4a5568;
  font-weight: bold;
}

.binary-1 {
  top: -5px;
  left: 15%;
}

.binary-2 {
  top: -8px;
  left: 50%;
}

.binary-3 {
  top: -3px;
  right: 10%;
}

.sparkle-char {
  font-size: 0.6rem;
  color: #d4a574;
}

.sparkle-1 {
  top: -5px;
  left: 10%;
}

.sparkle-2 {
  top: -6px;
  left: 50%;
}

.sparkle-3 {
  top: 0px;
  right: 8%;
}

.text-with-underline {
  position: relative;
  display: inline-block;
}

.underline-mark {
  position: absolute;
  bottom: 0px;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, #d4a574, #c7915a);
  border-radius: 1px;
}

@keyframes fallAndFade {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(25px);
  }
}

@keyframes sparklePopup {
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.5) rotate(360deg);
  }
}

@keyframes underlineReveal {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.text-with-glitch {
  position: relative;
  display: inline-block;
}

.description-part.animation-type-glitch.active .text-with-glitch {
  animation: glitchFlicker 0.8s ease-out forwards;
}

.glitch-text {
  position: relative;
}

.glitch-clone {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.description-part.animation-type-glitch.active .glitch-clone-1 {
  animation: glitchShift1 0.8s ease-out forwards;
  color: #ff0066;
  z-index: 1;
}

.description-part.animation-type-glitch.active .glitch-clone-2 {
  animation: glitchShift2 0.8s ease-out forwards;
  color: #00ffff;
  z-index: 2;
}

@keyframes glitchFlicker {
  0%, 100% {
    opacity: 1;
    text-shadow: none;
  }
  10% {
    opacity: 0.8;
    text-shadow: -2px 0 #ff0066, 2px 0 #00ffff;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0.7;
    text-shadow: 2px 0 #ff0066, -2px 0 #00ffff;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
    text-shadow: -3px 0 #ff0066, 3px 0 #00ffff;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0.8;
    text-shadow: 1px 0 #ff0066, -1px 0 #00ffff;
  }
  80% {
    opacity: 1;
  }
}

@keyframes glitchShift1 {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  10% {
    opacity: 0.8;
    transform: translateX(-3px);
  }
  20% {
    opacity: 0;
    transform: translateX(0);
  }
  30% {
    opacity: 0.8;
    transform: translateX(3px);
  }
  40% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 0.6;
    transform: translateX(-2px);
  }
  60% {
    opacity: 0;
    transform: translateX(0);
  }
  70% {
    opacity: 0.7;
    transform: translateX(2px);
  }
  100% {
    opacity: 0;
    transform: translateX(0);
  }
}

@keyframes glitchShift2 {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  10% {
    opacity: 0.8;
    transform: translateX(3px);
  }
  20% {
    opacity: 0;
    transform: translateX(0);
  }
  30% {
    opacity: 0.8;
    transform: translateX(-3px);
  }
  40% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 0.6;
    transform: translateX(2px);
  }
  60% {
    opacity: 0;
    transform: translateX(0);
  }
  70% {
    opacity: 0.7;
    transform: translateX(-2px);
  }
  100% {
    opacity: 0;
    transform: translateX(0);
  }
}
</style>
