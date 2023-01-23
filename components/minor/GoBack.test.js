import { describe, test, beforeEach, vitest, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import GoBack from './GoBack.vue'

describe('GoBack', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(GoBack, {
            shallow: true,
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vitest.fn
                    })
                ]
            }
        })
    })

    test('snapshot matches', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})