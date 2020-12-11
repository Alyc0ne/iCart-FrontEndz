<template>
  <v-row justify="center">
    <v-dialog v-model="$store.getters.confirmObj.isConfirmModal" max-width="950px">
      <v-card>
        <v-toolbar flat dense color="primary" dark>
          <v-toolbar-title>{{ $store.getters.goodsObj.isInsert ? 'เพิ่มข้อมูลสินค้า' : 'แก้ไขข้อมูลสินค้า' }} </v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <!-- <v-card-text style="height: 45vh; padding-left:0px;"> -->
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed outlined color="error" @click="closeModalGoods()">Close</v-btn>
          <v-btn depressed outlined color="primary" :disabled="!validObjGoods" @click="AddGoods">{{ $store.getters.goodsObj.isInsert ? 'Save' : 'Update' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      
    }),
    watch: {

    },
    mounted(){

    },
    methods: {
      
    }
  }
</script>
<style>
  
</style>