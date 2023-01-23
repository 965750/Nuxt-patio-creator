import { defineStore } from 'pinia'

export const useInterfaceStore = defineStore('InterfaceStore', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    switchIsLoading(payload) {
        this.isLoading = payload
      }
  },
  getters: {
    getIsLoading: (state) => state.isLoading
  },
})