<template>
    <v-row class="align-self-start fill-height">
        <v-col cols="8">
            <v-card height="500">
                <v-card-text>
                    <v-text-field v-model="barcode" label="Barcode" outlined dense placeholder="หมายเลข Barcode" autofocus @change="getGoodsByBarCode" :rules="[() => $store.getters.isWrongBarcode == false || 'ไม่เจอสินค้าที่ตรงกับ Barcode ที่กรอกมา']"></v-text-field>
                    <v-row>
                        <!-- LEFT SIDE -->
                        <!-- <v-col cols="6" style="border: solid 1px black;">

                        </v-col>


                        <v-col cols="6" style="border: solid 1px black;">

                        </v-col> -->
                    </v-row>

                </v-card-text>
            </v-card>
        </v-col>

        <!-- RIGHT SIDE -->
        <v-col cols="4" class="pa-0 fill-height" align-self="start">
                <v-card height="100%">
                    <v-card-title class="justify-end h_10p">
                        <div>
                            <h3>{{ "0" + new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear() + " | " + new Date().getHours() + ":" + new Date().getMinutes() }}</h3>
                            <!-- 28/11/2020 | 15:25 -->
                        </div>
                    </v-card-title>
                <v-divider></v-divider>

                <!-- Cart List -->
                <v-card-text class="h_60p">
                    <div class="listcart" v-if="listCart.length > 0">
                        <div class="border: 1px solid black; min-height:200px;" v-for="item in listCart" :key="item.goodsID">
                            <v-row>
                                <v-col cols="8">
                                    <div class="w_100p">
                                        <h1>{{ item.goodsName }}</h1>
                                    </div>
                                    <div class="w_100p">
                                        <span>{{ numberWithCommas(item.goodsSalePrice) }} ฿</span>
                                    </div>
                                </v-col>
                                <v-col cols="4" style="display: flex;">
                                    <v-btn depressed outlined style="height:30px; min-width:25px; padding: 0 10px; border-color:white;background-color:#DCDCDC;" @click="decreaseGoodsQty(item.goodsID ,1)"><span style="color:white">-</span></v-btn>
                                    <v-text-field outlined dense class="text-center" v-model="item.goodsQty" style="max-width: 60px; max-height:25px; margin: 0px 10px;"></v-text-field>
                                    <!-- <div style="height:25px; width:25px; border:solid 1px rgba(0, 0, 0, 0.6); float:left; margin: 0 10px; border-color:#DCDCDC;" class="text-center">{{ item.goodsQty }}</div> -->
                                    <v-btn depressed outlined color="error"  style="height:30px; min-width:25px; padding: 0 10px;border-color:white;background-color:#DCDCDC;" @click="increaseGoodsQty(item.goodsID ,1)"><span style="color:white">+</span></v-btn>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                        </div>
                    </div>
                    <div class="listcart" v-else>
                        <v-card flat class="ma-3 text-xs-center">
                        <v-img src="_nuxt/assets/images/cart-empty.png" aspect-ratio="2.75"></v-img>
                        <v-card-text class="text-center"><h2>ไม่มีรายการสินค้า</h2></v-card-text>
                        </v-card>
                    </div>
                </v-card-text>
                <v-divider></v-divider>

                <!-- Cart Summary -->
                <v-card-text class="h_20p">
                    <v-row>
                        <v-col cols="6">
                            <h3>Subtotal</h3>
                        </v-col>
                        <v-col cols="6" class="text-right">
                            <h3>{{ numberWithCommas(this.subtotal) }}</h3>
                        </v-col>
                    </v-row>

                     <v-row>
                        <v-col cols="6">
                            <h3>Discount</h3>
                        </v-col>
                        <v-col cols="6" class="text-right">
                            <h3>{{ numberWithCommas(this.discount) }}</h3>
                        </v-col>
                    </v-row>

                     <v-row>
                        <v-col cols="6">
                            <h3>Total</h3>
                        </v-col>
                        <v-col cols="6" class="text-right">
                            <h3>{{ numberWithCommas(this.grandtotal) }}</h3>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="h_10p justify-space-between">
                    <v-col cols="7">
                        <v-btn depressed outlined color="error" :disabled="listCart.length == 0" @click="closeModalGoods()">ยกเลิก</v-btn>
                        <v-btn depressed outlined color="secondary" :disabled="listCart.length == 0" @click="closeModalGoods()">HOLD</v-btn>
                    </v-col>
                    <v-col cols="5">
                        <v-btn depressed outlined color="primary" class="w_100p" :disabled="listCart.length == 0" @click="closeModalGoods()"><v-icon> mdi-content-paste</v-icon>ชำระเงิน</v-btn>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        barcode: null,
        listCart: [],
        goodsQty: 1,
        subtotal: 0,
        discount: 0,
        grandtotal: 0
    }),
    watch: {
        listCart: {
            handler(x) {
                if (this.listCart.length > 0) {
                    this.subtotal = this.listCart.reduce((a, b) => a + (b['goodsSalePrice'] * b['goodsQty'] || 0), 0)
                }
            },
            deep: true
        }
    },
    methods: {
        async getGoodsByBarCode() {
            if (!!this.barcode) {
                this.$store.dispatch("setIsWrongBarcode", false)
                const Goods = await this.$axios.$get('https://localhost:5001/api/Goods/GetGoodsByBarcode/' + this.barcode)
                this.barcode = null
                if (!!Goods) {
                    var currentGoods = this.getCurrentGoods(Goods['goodsID'])
                    if (!!currentGoods) {
                        currentGoods[0]['goodsQty'] += 1
                    }
                    else
                    {
                        Goods['goodsQty'] = 1
                        this.listCart.push(Goods)
                    }
                }
                else
                {
                    this.$store.dispatch("setIsWrongBarcode", true)
                }
            }
        },
        getCurrentGoods(goodsID) {
            var currentGoods = null
            if (!!goodsID) {
                if (this.listCart.length > 0) {
                    currentGoods = this.listCart.filter((x) => {
                        return x.goodsID == goodsID;
                    })
                }
            }
            return currentGoods
        },
        decreaseGoodsQty(goodsID, goodsQty) {
            var currentGoods = this.getCurrentGoods(goodsID)
            if (!!currentGoods) {
                if (currentGoods.length == 1) {
                    currentGoods[0]['goodsQty'] -= goodsQty
                }
            }
        },
        increaseGoodsQty(goodsID, goodsQty) {
            var currentGoods = this.getCurrentGoods(goodsID)
            if (!!currentGoods) {
                if (currentGoods.length == 1) {
                    currentGoods[0]['goodsQty'] += goodsQty
                }
            }
        },
        manageGoodsQty(goodsID , goodsQty) {
            var currentGoods = this.getCurrentGoods(goodsID)
            if (!!currentGoods) {
                if (currentGoods.length == 1) {
                    currentGoods[0]['goodsQty'] = goodsQty
                }
            }
        }, 
        numberWithCommas(x) {
            return parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    }
}
</script>

<style>
    .listcart .v-text-field .v-input__control .v-input__slot {
        min-height: auto !important;
        display: flex !important;
        align-items: center !important;
        height: 30px;
    }

    .listcart .v-text-field .v-input__control .v-input__slot input{
        text-align: center;
    }
</style>