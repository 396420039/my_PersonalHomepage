<script setup>
import { ArrowUpRight } from '@lucide/vue';

defineProps({
  post: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <RouterLink class="post-card" :class="{ compact }" :to="`/posts/${post.slug}`">
    <div class="post-card-topline">
      <span>NOTE / {{ String(index).padStart(2, '0') }}</span>
      <span>{{ post.readingMinutes }} MIN</span>
    </div>
    <h3>{{ post.title }}</h3>
    <p>{{ post.summary }}</p>
    <div class="post-card-footer">
      <span class="tag-list">
        <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
      </span>
      <span class="card-date"><time :datetime="post.date">{{ post.date }}</time></span>
      <ArrowUpRight :size="18" aria-hidden="true" />
    </div>
  </RouterLink>
</template>
