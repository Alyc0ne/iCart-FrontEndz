import https from 'https'

let netcore_api = "https://localhost:5001/api/";
const agent = new https.Agent({  
  rejectUnauthorized: false
});

export const state = () => ({
    ListGoods: [],
    goodsObj: {}
})

export const actions = {
  async fetchListGoods({ commit }) {
    const listGoods = await this.$axios.$get(netcore_api + 'Goods')
    commit('fetchListGoods', listGoods)
  },
  async editGoods({ commit }, payload) {
    const goods = await this.$axios.$get(netcore_api + 'Goods/' + payload)
    commit('editGoods', goods)
  },
}

export const mutations = {
  fetchListGoods(state, data){
    state.ListGoods = data
  },
  editGoods(state, data){
    state.goodsObj.isInsert = false
    state.goodsObj.goods = data
  },


  addGoods(state, payload){
      let newGoods = {
          ...payload,
          id: 2
      }
      state.ListGoods.push(newGoods)
  },
}

export const getters = {
  ListGoods: state => state.ListGoods,
  goodsObj: state => state.goodsObj
}