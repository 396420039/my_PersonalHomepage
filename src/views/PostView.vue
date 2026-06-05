<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { ArrowLeft } from '@lucide/vue';
import { findPost } from '../posts';

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const post = computed(() => findPost(props.slug));
const articleBody = ref(null);
let mermaidInstance;

async function renderDiagrams() {
  await nextTick();

  const diagrams = articleBody.value?.querySelectorAll('.mermaid:not([data-processed="true"])');
  if (!diagrams?.length) return;

  if (!mermaidInstance) {
    const { default: mermaid } = await import('mermaid');
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      themeVariables: {
        primaryColor: '#eef3ea',
        primaryTextColor: '#222621',
        primaryBorderColor: '#6f8b72',
        lineColor: '#6f8b72',
        secondaryColor: '#fffef9',
        tertiaryColor: '#f7f8f3',
        fontFamily: 'Inter, Microsoft YaHei, sans-serif',
      },
      flowchart: {
        curve: 'basis',
      },
    });
    mermaidInstance = mermaid;
  }

  await mermaidInstance.run({ nodes: Array.from(diagrams) });
}

onMounted(renderDiagrams);
watch(post, renderDiagrams);
</script>

<template>
  <main class="article-page">
    <RouterLink class="back-link" to="/">
      <ArrowLeft :size="18" aria-hidden="true" />
      返回首页
    </RouterLink>

    <article v-if="post" class="article">
      <header class="article-header">
        <div class="post-card-topline">
          <time :datetime="post.date">{{ post.date }}</time>
          <span>{{ post.readingMinutes }} min read</span>
        </div>
        <h1>{{ post.title }}</h1>
        <p>{{ post.summary }}</p>
        <div class="tag-list">
          <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
        </div>
      </header>
      <div ref="articleBody" class="article-body" v-html="post.html"></div>
    </article>

    <section v-else class="not-found">
      <p class="eyebrow">Not Found</p>
      <h1>这篇文章暂时不存在</h1>
      <p>可能是链接变更，或者文章文件还没有加入项目。</p>
    </section>
  </main>
</template>
