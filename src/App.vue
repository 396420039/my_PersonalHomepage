<script setup>
import { nextTick } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ArrowUpRight, CircleDot } from '@lucide/vue';
import { siteConfig } from './site.config';

const router = useRouter();

async function goToSection(id) {
  await router.push('/');
  await nextTick();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
  <div class="site-frame">
    <header class="site-header" aria-label="站点导航">
      <RouterLink class="brand" to="/" aria-label="返回首页">
        <span class="brand-mark">{{ siteConfig.initials }}</span>
        <span class="brand-copy">
          <strong>{{ siteConfig.siteTitle }}</strong>
          <small>AI SYSTEMS / NOTES</small>
        </span>
      </RouterLink>

      <nav class="nav-links" aria-label="主要链接">
        <a href="/#/" @click.prevent="goToSection('field-notes')">原创</a>
        <a href="/#/" @click.prevent="goToSection('signal-library')">精选阅读</a>
        <a :href="`mailto:${siteConfig.email}`">联系</a>
      </nav>

      <div class="system-status" aria-label="站点运行状态">
        <CircleDot :size="14" aria-hidden="true" />
        <span>ONLINE</span>
      </div>
    </header>

    <RouterView />

    <footer class="site-footer">
      <div>
        <p class="mono-label">END_OF_STREAM</p>
        <strong>持续构建有用、透明、可复现的 AI 系统。</strong>
      </div>
      <div class="footer-links">
        <a
          v-for="link in siteConfig.socialLinks"
          :key="link.label"
          :href="link.href"
          :target="link.href.startsWith('http') ? '_blank' : undefined"
          :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
        >
          {{ link.label }}
          <ArrowUpRight :size="14" aria-hidden="true" />
        </a>
      </div>
    </footer>
  </div>
</template>
