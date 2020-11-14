<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey" style="width: 60px !important; height:60px !important;">
              <v-img class="elevation-6" alt="" src="https://sv1.picz.in.th/images/2020/11/09/boKFC8.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>รายการสินค้า</v-list-item-title>
               <div></div>
            </v-list-item-content>

            <v-row align="center" justify="end" style="padding: 0px 10px 10px 10px;">
              <v-btn text normal color="primary" outlined @click="AddGoods()"><span style="margin-right:10px;">เพิ่มสินค้า</span><font-awesome-icon :icon="['fas', 'plus']" /></v-btn>
              <v-btn text normal color="primary" outlined @click="showGood()"><span style="margin-right:10px;">ดูสินค้า</span><font-awesome-icon :icon="['fas', 'plus']" /></v-btn>
            </v-row>
          </v-list-item>
        </v-card-actions>
        <v-card-text>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">#</th>
                  <th class="text-left">รหัสสินค้า</th>
                  <th class="text-left">ฺBarcode</th>
                  <th class="text-left">ชื่อสินค้า</th>
                  <th class="text-left">หน่วยนับ</th>
                  <th class="text-right">ต้นทุนสินค้า</th>
                  <th class="text-right">ราคาสินค้า</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in ListGoods" :key="item.goodsID">
                  <td class="w_10p text-center">
                    <font-awesome-icon :icon="['fas', 'pen']" class="pointer c-blue" @click="EditGoods(item.goodsID)" style="margin-right:10px;"/>
                    <font-awesome-icon :icon="['fas', 'trash-alt']" class="pointer c-red" @click="DeleteGoods(item.goodsID)"/>
                  </td>
                  <td class="w_15p text-left">{{ item.goodsNo }}</td>
                  <td class="w_15p text-left">{{ item.ObjUnit.barcode }}</td>
                  <td class="w_30p text-left">{{ item.goodsName }}</td>
                  <td class="w_25p text-left">{{ item.ObjUnit.unitName }}</td>
                  <td class="w_12-5p text-right">{{ item.ObjUnit.goodsCost }}</td>
                  <td class="w_12-5p text-right">{{ item.ObjUnit.goodsSalePrice }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <ManageGoodsModal :isDialogGoods="isDialogGoods" @close="closeModal"/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import ManageGoodsModal from '@/components/Modal/ManageGoodsModal'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    ManageGoodsModal
  },
  data () {
    return {
      ip: null,
      isDialogGoods: false,
      barcode: "",
      goodsName: "",
      unitName: "",
      goodsCost: 0,
      goodsSalePrice: 0
      //ListGoods: [],
    }
  },
  computed: {
    ...mapState({
      ListGoods: state => state.ListGoods
    })
  },
  // mounted() {
  //   console.log(this.$store.state.products)
  //   //console.log(this.state.products)
  //   //this.fetchListGoods()
  // },
  methods: {
    async fetchListGoods() {
      this.ListGoods = await this.$axios.$get('https://localhost:5001/api/Goods')
      console.log(this.ListGoods)
    },
    showGood() {
      console.log(this.$store.state.ListGoods)
    },
    AddGoods() {
      this.isDialogGoods = true;
    },
    closeModal() {
      this.isDialogGoods = false;
    },
    EditGoods(GoodsID) {
      if (!!GoodsID) {
        
      }
    },
    increment () {
      this.$store.commit('increment')
    }
  }
}
</script>
<style>
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
  background-color: #f6f9fc;
  color: #8898aa;
  height: 40px;
}
    
</style>