import { mount } from '@vue/test-utils'
import InputCustom from "@/components/simpleElements/InputCustom";
import inputOnlyNumber from "@/components/simpleElements/inputOnlyNumber";
const InputWithOnlyNumber = inputOnlyNumber(InputCustom)

describe('InputWithOnlyNumber', () => {
  test('верно обрабатывает крайний случай', async () => {

    const wrapper = mount(InputWithOnlyNumber)
    // проверка значения по умолчанию
    expect(wrapper.vm.resultValue).toEqual('')
    const input = wrapper.find('input')
    await input.setValue(-1)
    // проверка значения после обработки
    expect(wrapper.vm.resultValue).toEqual(0)

  })
  test('верно обрабатывает обычный случай', async () => {

    const wrapper = mount(InputWithOnlyNumber)
    // проверка значения по умолчанию
    expect(wrapper.vm.resultValue).toEqual('')
    const input = wrapper.find('input')
    await input.setValue(10)
    // проверка значения после обработки
    expect(wrapper.vm.resultValue).toEqual('10')

  })
})
