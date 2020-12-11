import https from 'https'

let netcore_api = "https://localhost:5001/api/";
const agent = new https.Agent({  
  rejectUnauthorized: false
});

export const state = () => ({
    ListGoods: [],
    goodsObj: {},
    unitObj: {},
    isWrongBarcode: false,
    isAlert: false,
    confirmObj: []
})

export const actions = {
  async fetchListGoods({ commit }) {
    const listGoods = await this.$axios.$get('/api/Goods')
    commit('fetchListGoods', listGoods)
  },
  async addGoods({ commit }) {
    const runningNumber = await this.$axios.$get('/api/Goods/GetRunningNumber')

    //Fetch Unit Data
    const listUnit = await this.$axios.$get('/api/Goods/GetListUnit')

    var obj = {
      'runningNumber': runningNumber,
      'listUnit': listUnit
    }
    commit('addGoods', obj)
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
  },
  manageConfirmModal({ commit }, isOpen) {
    commit('manageConfirmModal', isOpen)
  }
}

export const mutations = {
  fetchListGoods(state, data){
    state.ListGoods = data
  },
  addGoods(state, obj){
    state.goodsObj.isInsert = true
    state.goodsObj.goods = { 'goodsNo': obj.runningNumber }
    state.unitObj = obj.listUnit
  },
  editGoods(state, data){
    state.goodsObj.isInsert = false
    state.goodsObj.goods = data

    console.log(data)
  },
  setIsWrongBarcode(state, data){
    state.isWrongBarcode = data
  },
  callAlert(state, data){
    state.isAlert = data
  },
  manageConfirmModal(state, isOpen){
    state.confirmObj.isOpen = isOpen
  },
}

export const getters = {
  ListGoods: state => state.ListGoods,
  goodsObj: state => state.goodsObj,
  unitObj: state => state.unitObj,
  isWrongBarcode: state => state.isWrongBarcode,
  isAlert: state => state.isAlert,
  confirmObj: state => state.confirmObj
}