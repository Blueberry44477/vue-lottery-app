import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import App from '../App.vue'
import router from '../router'

describe('App and Layouts', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    localStorage.clear()
    await router.push('/')
    await router.isReady()
    await flushPromises()
  })

  it('mounts App with default layout and renders header and navigation', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    await flushPromises()
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.text()).toContain('LotteryApp')
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About author')
    expect(wrapper.text()).toContain('Users')
  })

  it('renders 404 page for unknown routes', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    await router.push('/some-non-existent-page-xyz')
    await router.isReady()
    await flushPromises()

    expect(wrapper.text()).toContain('404')
    expect(wrapper.text()).toContain('Сторінку не знайдено')
  })
})
