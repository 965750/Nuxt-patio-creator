<template>
  <notifications position="left"/>
      <ProjectsList v-if="!isLoading" />
      <LoadingSpinner v-else />
</template>

<script setup>
import { useInterfaceStore } from '@/store/InterfaceStore'
import { useProjectStore } from '@/store/ProjectStore'

import ProjectsList from '@/components/projects/ProjectsList.vue'
import LoadingSpinner from '@/components/minor/LoadingSpinner.vue'
import {
  computed,
  onMounted
} from 'vue'

const interfaceStore = useInterfaceStore()
const projectStore = useProjectStore()

const isLoading = computed(() => interfaceStore.getIsLoading)

onMounted(() => {
    projectStore.getProjects()
})
</script>

<style lang="scss">
html {
  font-family: 'Roboto', sans-serif;
}
</style>