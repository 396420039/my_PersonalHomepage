<script setup>
import { computed, ref, watch } from 'vue';
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Database,
  ExternalLink,
  Mail,
  MapPin,
  Radio,
  Search,
  Sparkles,
} from '@lucide/vue';
import PostCard from '../components/PostCard.vue';
import { curatedArticles, curatedTopics } from '../curatedArticles';
import { featuredPosts, posts } from '../posts';
import { siteConfig } from '../site.config';

const activeTopic = ref('全部');
const query = ref('');
const visibleCount = ref(12);

const normalizedQuery = computed(() => query.value.trim().toLocaleLowerCase());

const filteredCurated = computed(() =>
  curatedArticles.filter((article) => {
    const matchesTopic = activeTopic.value === '全部' || article.topic === activeTopic.value;
    const haystack = `${article.title} ${article.source} ${article.topic}`.toLocaleLowerCase();
    return matchesTopic && (!normalizedQuery.value || haystack.includes(normalizedQuery.value));
  }),
);

const visibleCurated = computed(() => filteredCurated.value.slice(0, visibleCount.value));
const nextSignals = computed(() => curatedArticles.slice(0, 3));

watch([activeTopic, query], () => {
  visibleCount.value = 12;
});

function formatDate(value) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(`${value}T00:00:00`));
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
  <main>
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-copy">
        <div class="eyebrow-row">
          <p class="eyebrow">
            <Sparkles :size="14" aria-hidden="true" />
            {{ siteConfig.role }}
          </p>
          <span class="hero-index">INDEX / 001</span>
        </div>

        <h1 id="hero-title">
          <span>构建</span>
          <span class="outline-text">AI 系统</span>
          <span>记录真实边界<span class="accent-dot">.</span></span>
        </h1>

        <div class="hero-bottom">
          <p class="hero-intro">{{ siteConfig.intro }}</p>
          <div class="hero-actions" aria-label="主页操作">
            <a class="primary-action" href="/#/" @click.prevent="scrollToSection('signal-library')">
              浏览精选库
              <ArrowDownRight :size="18" aria-hidden="true" />
            </a>
            <a class="secondary-action" :href="`mailto:${siteConfig.email}`" aria-label="通过邮件联系">
              <Mail :size="18" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <aside class="system-panel" aria-label="内容系统概览">
        <div class="panel-chrome">
          <span>KNOWLEDGE_CORE</span>
          <span>v2.6</span>
        </div>

        <div class="orbital-core" aria-hidden="true">
          <div class="orbit orbit-one"></div>
          <div class="orbit orbit-two"></div>
          <div class="core-node">
            <span>{{ curatedArticles.length }}</span>
            <small>SIGNALS</small>
          </div>
        </div>

        <div class="system-metrics">
          <div>
            <small>ORIGINAL</small>
            <strong>{{ posts.length }}</strong>
          </div>
          <div>
            <small>CADENCE</small>
            <strong>2 / WK</strong>
          </div>
          <div>
            <small>LOCATION</small>
            <strong>SH</strong>
          </div>
        </div>
      </aside>
    </section>

    <section class="signal-strip" aria-label="站点信息">
      <div>
        <Radio :size="15" aria-hidden="true" />
        <span>LIVE SIGNAL</span>
      </div>
      <p>Agent Systems · RAG · Evaluation · Inference</p>
      <p><MapPin :size="15" aria-hidden="true" /> {{ siteConfig.location }}</p>
    </section>

    <section id="field-notes" class="section-block field-notes">
      <div class="section-intro">
        <div>
          <p class="section-kicker">01 / FIELD NOTES</p>
          <h2>一线工程笔记</h2>
        </div>
        <p>从系统设计到落地排障，把模型之外真正决定质量的部分写清楚。</p>
      </div>

      <div class="featured-grid">
        <PostCard
          v-for="(post, index) in featuredPosts.slice(0, 4)"
          :key="post.slug"
          :post="post"
          :index="index + 1"
        />
      </div>

      <div class="latest-ledger">
        <div class="ledger-title">
          <span><Database :size="16" aria-hidden="true" /> LATEST LOGS</span>
          <span>{{ posts.length }} ENTRIES</span>
        </div>
        <PostCard
          v-for="(post, index) in posts.slice(0, 6)"
          :key="post.slug"
          :post="post"
          :index="index + 1"
          compact
        />
      </div>
    </section>

    <section id="signal-library" class="section-block signal-library">
      <div class="section-intro library-intro">
        <div>
          <p class="section-kicker">02 / CURATED SIGNALS</p>
          <h2>100 篇精选阅读</h2>
        </div>
        <p>来自 6 个一手技术源的外部文章索引。每周二、周五各安排 1 篇，覆盖约 50 周。</p>
      </div>

      <div class="schedule-console">
        <div class="console-head">
          <span>UPCOMING_QUEUE</span>
          <span>JUL 2026 → JUL 2027</span>
        </div>
        <div class="queue-list">
          <a
            v-for="signal in nextSignals"
            :key="signal.id"
            :href="signal.url"
            target="_blank"
            rel="noreferrer"
          >
            <time :datetime="signal.scheduledDate">{{ formatDate(signal.scheduledDate) }}</time>
            <span>{{ signal.title }}</span>
            <ArrowRight :size="16" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div class="library-toolbar">
        <label class="search-box">
          <Search :size="18" aria-hidden="true" />
          <span class="sr-only">搜索精选文章</span>
          <input v-model="query" type="search" placeholder="搜索标题、来源或主题…" />
          <kbd>/</kbd>
        </label>
        <div class="topic-filters" aria-label="按主题筛选精选文章">
          <button
            v-for="topic in curatedTopics"
            :key="topic"
            type="button"
            :class="{ active: activeTopic === topic }"
            @click="activeTopic = topic"
          >
            {{ topic }}
          </button>
        </div>
      </div>

      <div class="library-meta">
        <span>RESULTS / {{ String(filteredCurated.length).padStart(3, '0') }}</span>
        <span>FREQUENCY / TUE + FRI</span>
      </div>

      <div v-if="visibleCurated.length" class="curated-grid">
        <a
          v-for="(article, index) in visibleCurated"
          :key="article.id"
          class="curated-card"
          :href="article.url"
          target="_blank"
          rel="noreferrer"
        >
          <div class="curated-topline">
            <span>{{ article.id.replace('signal-', 'SIG / ') }}</span>
            <ExternalLink :size="16" aria-hidden="true" />
          </div>
          <h3>{{ article.title }}</h3>
          <div class="curated-footer">
            <span class="source-chip">{{ article.source }}</span>
            <span>{{ article.topic }}</span>
          </div>
          <div class="scheduled-line">
            <CalendarDays :size="14" aria-hidden="true" />
            <span>计划 {{ article.scheduledDate }}</span>
            <span>#{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
        </a>
      </div>

      <div v-else class="empty-state">
        <p class="mono-label">NO_SIGNAL_FOUND</p>
        <h3>没有匹配的文章</h3>
        <button type="button" @click="query = ''; activeTopic = '全部'">清除筛选</button>
      </div>

      <button
        v-if="visibleCount < filteredCurated.length"
        class="load-more"
        type="button"
        @click="visibleCount += 12"
      >
        加载更多
        <span>{{ visibleCount }} / {{ filteredCurated.length }}</span>
      </button>
    </section>
  </main>
</template>
