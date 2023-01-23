import { describe, test, beforeEach, vitest, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import InputButton from './InputButton.vue'
import { useProjectStore } from '@/store/ProjectStore.js'

describe('InputButton', () => {
let wrapper = null

    beforeEach(() => {
        wrapper = mount(InputButton, {
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

    test(`if user won't save too short name`, async () => {
        const input = wrapper.find('input')
        const submit = wrapper.find('button')

        await input.setValue('123')
        await submit.trigger('click')

        expect(wrapper.text()).toContain('name is too short')
    })

    test(`if user won't save empty name`, async () => {
        const input = wrapper.find('input')
        const submit = wrapper.find('button')

        await input.setValue('')
        await submit.trigger('click')

        expect(wrapper.text()).toContain('name is too short')
    })

    test(`if user won't save too long name`, async () => {
        const input = wrapper.find('input')
        const submit = wrapper.find('button')

        await input.setValue('1234567890 12345678')
        await submit.trigger('click')
        
        expect(wrapper.text()).toContain('name is too long')
    })

    test(`if user won't save symbols as project name`, async () => {
        const input = wrapper.find('input')
        const submit = wrapper.find('button')

        await input.setValue('123 %asd')
        await submit.trigger('click')
        
        expect(wrapper.text()).toContain('only letters and numbers')
    })

    test('snapshot matches', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})