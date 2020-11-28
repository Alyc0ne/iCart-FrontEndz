<template>
    <v-row class="align-self-start fill-height">
        <v-col cols="6">
            <v-card height="500">
                <v-card-text>
                    <v-row>
                        <!-- LEFT SIDE -->
                        <v-col cols="6" style="border: solid 1px black;">

                        </v-col>


                        <v-col cols="6" style="border: solid 1px black;">

                        </v-col>
                    </v-row>

                </v-card-text>
            </v-card>
        </v-col>

        <!-- RIGHT SIDE -->
        <v-col cols="6" class="pt-0 fill-height" align-self="start">
            <v-card height="100%">
                <v-card-title class="justify-end h_10p">
                    <div>
                        <h3 >28/11/2020 | 15:25 </h3>
                    </div>
                </v-card-title>
                <v-divider></v-divider>

                <!-- Cart List -->
                <v-card-text class="h_60p">

                </v-card-text>
                <v-divider></v-divider>

                <!-- Cart Summary -->
                <v-card-text>
                    <v-row>
                        <v-col cols="10">
                            <h3>Subtotal</h3>
                        </v-col>
                        <v-col cols="2" class="text-right">
                            <h3>2,000</h3>
                        </v-col>
                    </v-row>

                     <v-row>
                        <v-col cols="10">
                            <h3>Discount</h3>
                        </v-col>
                        <v-col cols="2" class="text-right">
                            <h3>200</h3>
                        </v-col>
                    </v-row>

                     <v-row>
                        <v-col cols="10">
                            <h3>Total</h3>
                        </v-col>
                        <v-col cols="2" class="text-right">
                            <h3>1,800</h3>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn depressed outlined color="error" @click="closeModalGoods()">ยกเลิก</v-btn>
                    <v-btn depressed outlined color="primary" @click="closeModalGoods()">ชำระเงิน</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {

}
</script>

<style>

</style>