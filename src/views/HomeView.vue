<script setup>
import { computed, ref } from 'vue';
import { BookOpen, Mail, MapPin, Sparkles } from '@lucide/vue';
import PostCard from '../components/PostCard.vue';
import { featuredPosts, posts, tags } from '../posts';
import { siteConfig } from '../site.config';

const activeTag = ref(null);

const filteredPosts = computed(() => {
  if (!activeTag.value) return posts;
  return posts.filter((post) => post.tags.includes(activeTag.value ?? ''));
});
</script>

<template>
  <main>
    <section class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow">
          <Sparkles :size="16" aria-hidden="true" />
          {{ siteConfig.role }}
        </p>
        <h1>{{ siteConfig.ownerName }}</h1>
        <p class="hero-intro">{{ siteConfig.intro }}</p>
        <div class="hero-actions" aria-label="主页操作">
          <a class="primary-action" :href="`mailto:${siteConfig.email}`">
            <Mail :size="18" aria-hidden="true" />
            联系我
          </a>
          <a class="secondary-action" href="#posts">
            <BookOpen :size="18" aria-hidden="true" />
            阅读文章
          </a>
        </div>
      </div>

      <aside class="hero-panel" aria-label="个人信息概览">
        <img src="/writing-desk.png" alt="写作桌面、笔记本和咖啡杯" />
        <div class="profile-strip">
          <span>
            <MapPin :size="16" aria-hidden="true" />
            {{ siteConfig.location }}
          </span>
          <span>{{ posts.length }} 篇文章</span>
        </div>
      </aside>
    </section>

    <section class="focus-band" aria-label="关注主题">
      <span v-for="area in siteConfig.focusAreas" :key="area">{{ area }}</span>
    </section>

    <section class="content-grid">
      <div class="section-block">
        <div class="section-heading">
          <p class="eyebrow">Featured</p>
          <h2>精选文章</h2>
        </div>
        <div class="featured-grid">
          <PostCard
            v-for="post in featuredPosts"
            :key="post.slug"
            :post="post"
          />
        </div>
      </div>

      <aside class="side-column" aria-label="最近更新">
        <div class="section-heading">
          <p class="eyebrow">Latest</p>
          <h2>最近更新</h2>
        </div>
        <div class="latest-list">
          <PostCard
            v-for="post in posts.slice(0, 3)"
            :key="post.slug"
            :post="post"
            compact
          />
        </div>
      </aside>
    </section>

    <section id="posts" class="section-block post-index">
      <div class="section-heading">
        <p class="eyebrow">Archive</p>
        <h2>全部文章</h2>
      </div>
      <div class="tag-filters" aria-label="按标签筛选文章">
        <button
          type="button"
          :class="{ active: activeTag === null }"
          @click="activeTag = null"
        >
          全部
        </button>
        <button
          v-for="tag in tags"
          :key="tag"
          type="button"
          :class="{ active: activeTag === tag }"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>
      <div class="post-list">
        <PostCard
          v-for="post in filteredPosts"
          :key="post.slug"
          :post="post"
          compact
        />
      </div>
    </section>
  </main>
</template>
