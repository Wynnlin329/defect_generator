import { defineStore } from 'pinia'
import { WorkingPage } from '../data_struct/WorkingPage'

export const WorkingPageStore = defineStore('CurrentPage', {
  state: () => ({
    CurrentPage: WorkingPage.HOME,
  }),

  actions: {
    setCurrentPage(targetPage: WorkingPage) {
      this.CurrentPage = targetPage
    },
  },

  getters: {},
})
