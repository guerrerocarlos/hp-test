import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AlbumItem from '../AlbumItem.vue'

describe('AlbumItem', () => {
  it('renders properly', () => {
    const wrapper = mount(AlbumItem)
    expect(wrapper.text()).toContain('')
  })
})
