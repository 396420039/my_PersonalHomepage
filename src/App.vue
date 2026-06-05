<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { siteConfig } from './site.config';
</script>

<template>
  <div class="app-shell">
    <header class="site-header" aria-label="站点导航">
      <RouterLink class="brand" to="/">
        <span class="brand-mark">{{ siteConfig.initials }}</span>
        <span>{{ siteConfig.siteTitle }}</span>
      </RouterLink>
      <nav class="nav-links" aria-label="主要链接">
        <a
          v-for="link in siteConfig.socialLinks"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
        >
          {{ link.label }}
        </a>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
