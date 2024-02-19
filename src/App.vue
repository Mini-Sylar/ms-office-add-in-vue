<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <a href="#/">Home</a>
        <a href="#/about">About</a>
      </nav>
      <div>
        <p>Count: {{ counterStore.count }}</p>
        <button class="counter-btn" @click="counterStore.increment">Increment Count</button>
      </div>
    </div>
  </header>
  <main>
    <component :is="currentView" />
  </main>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { routes } from './router'
import { ref, computed, onUnmounted } from 'vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useCounterStore } from './stores/counter'

const counterStore = useCounterStore()

const currentPath = ref<string>(window.location.hash)

function updateCurrentPath() {
  currentPath.value = window.location.hash
}

window.addEventListener('hashchange', updateCurrentPath)

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFoundView
})

onUnmounted(() => {
  window.removeEventListener('hashchange', updateCurrentPath)
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.counter-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  scale: 1;
  transition: all 0.2s;
}

.counter-btn:active {
  scale: 0.95;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
