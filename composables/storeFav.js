import { useProjectStore } from '@/store/ProjectStore'
import {
    computed
} from 'vue'

export function storeFav() {
    
    const projectStore = useProjectStore()

    // most often used getters
    const currentDoor = computed(() => projectStore.currentDoor)

    return {
        projectStore,
        currentDoor
    }
}