<template>
    <div class="flex justify-center flex-wrap">
        <div class="flex justify-center flex-wrap">
            <template v-if="savedProjects.length">
                <ProjectBox
                    v-for="project in savedProjects"
                    :key="project.name"
                    :project="project"
                    saved
                />
            </template>
            <ProjectBox :saved="false" />
        </div>
    </div>
</template>

<script setup>
import {
    computed
} from "vue"
import ProjectBox from '@/components/projects/ProjectBox.vue'
import { useProjectStore } from "@/store/ProjectStore"

const projectStore = useProjectStore()

const savedProjects = computed(() => projectStore.savedProjects)
</script>

<style lang="scss" scoped>
.projectsList {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
