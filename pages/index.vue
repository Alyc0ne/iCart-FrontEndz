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
              <v-list-item-title>รายการสินค้า {{ this.ip }}</v-list-item-title>
            </v-list-item-content>

            <v-row align="center" justify="end" style="padding: 0px 10px 10px 10px;">
              <v-btn text normal color="primary" outlined @click="AddGoods()"><span style="margin-right:10px;">เพิ่มสินค้า</span><font-awesome-icon :icon="['fas', 'plus']" /></v-btn>
            </v-row>
          </v-list-item>
        </v-card-actions>
        <v-card-text>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">#</th>
                  <th class="text-left">ฺBarcode</th>
                  <th class="text-left">ชื่อสินค้า</th>
                  <th class="text-left">หน่วยนับ</th>
                  <th class="text-right">ต้นทุนสินค้า</th>
                  <th class="text-right">ราคาสินค้า</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in ListGoods" :key="item.GoodsID">
                  <td class="w_10p text-center">
                    <font-awesome-icon :icon="['fas', 'pen']" class="pointer c-blue" @click="EditGoods(item.GoodsID)" style="margin-right:10px;"/>
                    <font-awesome-icon :icon="['fas', 'trash-alt']" class="pointer c-red" @click="DeleteGoods(item.GoodsID)"/>
                  </td>
                  <td class="w_15p text-left">{{ item.GoodsBarcode }}</td>
                  <td class="w_35p text-left">{{ item.goodsName }}</td>
                  <td class="w_20p text-left">{{ item.UnitName }}</td>
                  <td class="w_10p text-right">{{ item.GoodsCost }}</td>
                  <td class="w_10p text-right">{{ item.GoosPrice }}</td>
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

export default {
  components: {
    ManageGoodsModal
  },
  data () {
    return {
      ip: null,
      isDialogGoods: false,
      ListGoods: [
        // {
        //   GoodsID: '1',
        //   GoodsBarcode: 'GN-001',
        //   GoodsName: 'น้ำสิงห์',
        //   UnitName: 'ขวด',
        //   GoodsCost: '500.00',
        //   GoosPrice: '1,250.00'
        // },
        // {
        //   GoodsID: '2',
        //   GoodsBarcode: 'GN-002',
        //   GoodsName: 'Ryzen S5000 3.5Gz 3800Mhz',
        //   UnitName: 'ชิ้น',
        //   GoodsCost: '4,500.00',
        //   GoosPrice: '11,250.00'
        // }
      ],
    }
  },
  mounted() {
    this.fetchSomething()
  },
  methods: {
    async fetchSomething() {
      this.ListGoods = await this.$axios.$get('https://localhost:5001/api/Goods')
    },
    AddGoods() {
      this.isDialogGoods = true;
    },
    closeModal() {
      this.isDialogGoods = false;
    },
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