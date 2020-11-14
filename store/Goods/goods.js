export default () => ({
  ListGoods: [
    {
      goodsID: 1,
      barcode: '123456',
      goodsName: 'ชานมไข่มุก',
      unitName: 'แก้ว',
      goodsCost: '25.00',
      goodsSalePrice: '30.00'
    }
  ]
})

const modules = {
}

const state = {
  user: {}
}

const actions = {
  async getUser ({commit}) {
    const data = await userService.getUser()
    commit('SET_USER', data)
  }
}

const mutations = {
  SET_USER (state, data) {
    state.user = data
  }
}