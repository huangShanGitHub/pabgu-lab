/**
 * 在JS中使用枚举。
  1. 去魔法数字
  2. 枚举语义化
  3. 定义一体化：枚举值和枚举描述写在了一起，不分散
  4. 使用方便：无需额外的过滤器

  举例：
    const authEnum = makeEnum([
      { label: '审核中', value: 1, alias: 'AUTHING' }, 
      { label: '审核成功', value: 2, alias: 'AUTH_SUCCESS' }, 
      { label: '审核失败', value: 3, alias: 'AUTH_FAIL' }, 
    ])
    console.log(authEnum.AUTH_FAIL) // → 3
    console.log(authEnum[3]) // → '审核失败'
    console.log(authEnum.getValueByLabel('审核成功')) // → 2
    console.log(authEnum.getLabelByAlias('AUTHING')) // → '审核中'
    console.log(authEnum.getLabelByValue(1)) // → '审核中'
    console.log(authEnum.getLabelByValue('1')) // → undefined
    console.log(authEnum.getItem(2)) // → { label: '审核成功', value 2, alias: 'AUTH_SUCCESS' }
 * @param {*} list 待枚举集合
 */
export function makeEnum(list) {
  list = (list || []).filter(
    (item) => item.label && item.value != null && item.alias
  )
  const aliasMap = {}
  const valueMap = {}
  list.forEach((item) => {
    const { label, value, alias } = item
    aliasMap[alias] = value
    valueMap[value] = label
  })

  return {
    ...valueMap,
    /* 支持通过alias字面量查询value值 */
    ...aliasMap,
    getValueByLabel(label) {
      return (list.find((item) => item.label === label) || {}).label
    },
    getLabelByAlias(alias) {
      return (list.find((item) => item.alias === alias) || {}).label
    },
    getLabelByValue(value) {
      return (list.find((item) => item.value === value) || {}).label
    },
    /**
     * 获取枚举数组
     * @returns
     */
    getList() {
      return list
    },
    /**
     * 获取listItem元素，支持通过label/value/alias查找
     * @param {*} val
     * @returns
     */
    getItem(val) {
      const valueItem = list.find((item) => item.value === val)
      if (valueItem) return valueItem
      const labelItem = list.find((item) => item.label === val)
      if (labelItem) return labelItem
      const aliasItem = list.find((item) => item.alias === val)
      if (aliasItem) return aliasItem
    },
  }
}
