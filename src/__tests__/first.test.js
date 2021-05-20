import { mount } from '@vue/test-utils'
import buttonBase from "@/components/simpleElements/buttonBase";

describe('buttonBase', () => {
  test('является экземпляром Vue', () => {
    const wrapper = mount(buttonBase)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})


