import https from 'https'

let netcore_api = "https://localhost:5001/api/";
const agent = new https.Agent({  
  rejectUnauthorized: false
});

export const state = () => ({
    ListGoods: [],
    goodsObj: {},
    isWrongBarcode: false,
    isAlert: false
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
  setIsWrongBarcode({ commit }, payload){
    commit('setIsWrongBarcode', payload)
  },
  callAlert({ commit }, payload){
    commit('callAlert', payload)
  }
}

export const mutations = {
  fetchListGoods(state, data){
    state.ListGoods = data
  },
  editGoods(state, data){
    state.goodsObj.isInsert = false
    state.goodsObj.goods = data
  },
  setIsWrongBarcode(state, data){
    state.isWrongBarcode = data
  },
  callAlert(state, data){
    state.isAlert = data
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
  goodsObj: state => state.goodsObj,
  isWrongBarcode: state => state.isWrongBarcode,
  isAlert: state => state.isAlert
}