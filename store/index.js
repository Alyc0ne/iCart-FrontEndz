export const state = () => ({
    ListGoods: [
        {
          goodsID: 1,
          goodsNo: 'ITM-000',
          goodsName: 'ชานมไข่มุก',
          ObjUnit : 
              {
                barcode: '123456',
                unitName: 'แก้ว',
                goodsCost: '25.00',
                goodsSalePrice: '30.00'
              }
        }
      ]
})

export const mutations = {
     addGoods(state, payload){
         let newGoods = {
             ...payload,
             id: 2
         }
         state.ListGoods.push(newGoods)
     }
}