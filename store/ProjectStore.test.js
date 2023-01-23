import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { useProjectStore } from './ProjectStore'

describe('Project Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('if door values are updated correctly', () => {
        const projectStore = useProjectStore()

        projectStore.updateDoor({
            attr: 'width',
            value: 145
        })

        expect(projectStore.door.width).toBe(145)
    })
})