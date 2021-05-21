import { mount } from '@vue/test-utils'
import InputCustom from "../components/simpleElements/InputCustom";

describe('InputCustom', () => {
  test('эмитит измененное верное значение инпута', async () => {

    const wrapper = mount(InputCustom)
    const textInput = wrapper.find('input')
    await textInput.setValue('value')
    // проверка, что событие было вызвано
    expect(wrapper.emitted('input')).toBeTruthy()
    // проверка, что с событием были переданы определённые данные
    expect(wrapper.emitted('input')[0]).toEqual(['value'])

  })
})


