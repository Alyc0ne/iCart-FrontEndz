<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogGoods" max-width="950px">
      <v-card>
        <v-toolbar flat dense color="primary" dark>
          <v-toolbar-title>{{ $store.getters.goodsObj.isInsert ? 'เพิ่มข้อมูลสินค้า' : 'แก้ไขข้อมูลสินค้า' }} </v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <!-- <v-card-text style="height: 45vh; padding-left:0px;"> -->
          <v-tabs vertical style="border-right: 1px solid rgba(0, 0, 0, 0.12);">
            <v-tab class="justify-start"><v-icon left>mdi-account</v-icon>ข้อมูลทั่วไป</v-tab>
            <v-tab class="justify-start"><v-icon left>mdi-lock</v-icon>หน่วยนับ</v-tab>
            <v-tab class="justify-start" disabled><v-icon left>mdi-access-point</v-icon>รูปภาพ</v-tab>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                   <v-col class="content">
                    <div class="subtopic">
                      <p class="text-left">ข้อมูลสินค้า</p>
                        <v-form ref="form" v-model="validObjGoods" lazy-validation class="managePadding-frm">
                          <v-row>
                            <v-col cols="1"><v-subheader class="require"></v-subheader></v-col>
                            <v-col cols="11">
                              <v-text-field v-model="ObjGoodsData.goodsNo" label="GoodsNo" outlined dense disabled></v-text-field>
                            </v-col>
                            <v-col cols="1"><v-subheader class="require">*</v-subheader></v-col>
                            <v-col cols="11">
                              <v-text-field v-model="ObjGoodsData.goodsName" :rules="[x => !!x || 'กรุณากรอกชื่อสินค้า']" label="GoodsName" outlined dense placeholder="ชื่อสินค้า" autofocus></v-text-field>
                            </v-col>
                            <v-col cols="1"><v-subheader class="require"></v-subheader></v-col>
                            <v-col cols="11">
                              <v-textarea v-model="ObjGoodsData.goodsDesc" label="GoodsDescription" outlined placeholder="รายละเอียดสินค้า"></v-textarea>
                            </v-col>
                          </v-row>
                        </v-form>
                    </div>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-col class="content">
                  <v-row align="center" justify="end" style="padding: 0px 10px 10px 10px;">
                    <v-btn text normal color="primary" outlined @click="AddUnit"><span style="margin-right:10px;">เพิ่มหน่วยนับ</span><font-awesome-icon :icon="['fas', 'plus']" /></v-btn>
                  </v-row>
                  <v-simple-table fixed-header height="300px" class="testing-table">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-center">#</th>
                          <th class="text-left">Barcode</th>
                          <th class="text-left">รหัสหน่วยนับ</th>
                          <th class="text-left">ชื่อหน่วยนับ</th>
                          <th class="text-left">หน่วยนับหลัก</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="unit in ObjGoodsData.listUnit" :key="unit.uid" :class="[unit.isFocusRow ? 'focusRow' : '']">
                        <!-- <tr v-for="item in ObjGoodsData.ListUnit" :key="item.uid"> -->
                          <td v-if="unit.isFocusRow">
                            <font-awesome-icon :icon="['fas', 'check']" class="pointer c-blue" @click="AccpetUnit()" style="margin-right:10px;"/>
                            <font-awesome-icon :icon="['fas', 'times']" class="pointer c-red" @click="NotAcceptUnit()"/>
                          </td>
                          <td v-else>
                            <font-awesome-icon :icon="['fas', 'pen']" class="pointer c-blue" @click="EditUnit(unit.uid)" style="margin-right:10px;"/>
                            <font-awesome-icon :icon="['fas', 'trash-alt']" class="pointer c-red" @click="DeleteptUnit()"/>
                          </td>
                          <td><input type="text" class="transac-input" v-model="unit.barcode"></td>
                          <td><input type="text" class="transac-input" v-model="unit.unitNo"></td>
                          <td><input type="text" class="transac-input" v-model="unit.unitName"></td>
                          <td><v-checkbox :disabled="transacGridUnitControl.focusUID != unit.uid" v-model="unit.isBaseUnit"></v-checkbox></td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed outlined color="error" @click="closeModalGoods()">Close</v-btn>
          <v-btn depressed outlined color="primary" :disabled="!validObjGoods" @click="AddGoods">{{ $store.getters.goodsObj.isInsert ? 'Save' : 'Update' }}</v-btn>
          <!-- <v-btn color="blue darken-1" text :disabled="!validObjUnit" @click="InsertUnit()">Save</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="isDialogUnit" max-width="500px" ref="modal" persistent>
      <v-card>
        <v-toolbar flat dense color="primary" dark>
          <v-toolbar-title>เพิ่มหน่วยนับ</v-toolbar-title>
        </v-toolbar>
        <v-card-text style="height:350px;">
          <v-col class="content">
            <v-form ref="form" v-model="validObjUnit" lazy-validation class="managePadding-frm">
              <v-row>
                <v-col cols="1">
                  <v-subheader class="require">*</v-subheader>
                </v-col>
                <v-col cols="11">
                  <v-text-field v-model="ObjUnitData.barcode" :rules="[x => !!x || 'กรุณากรอกหมายเลข Barcode']" label="Barcode" outlined dense placeholder="หมายเลข Barcode" autofocus></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-subheader class="require">*</v-subheader>
                </v-col>
                <v-col cols="11">
                  <v-autocomplete v-model="selectedUnit" :items="$store.getters.unitObj" item-value="unitID" item-text="unitName" :rules="[x => !!x || 'กรุณาเลือกหน่วยนับ']" label="หน่วยนับ" auto-select-first dense outlined return-object></v-autocomplete>                                    
                  <!-- return-object -->
                </v-col>
                <v-col cols="1">
                  <v-subheader class="require"></v-subheader>
                </v-col>
                <v-col cols="11">
                  <v-text-field v-model="ObjUnitData.goodsCost" label="GoodsCost" outlined dense placeholder="ราคาต้นทุน"></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-subheader class="require">*</v-subheader>
                </v-col>
                <v-col cols="11">
                  <v-text-field v-model="ObjUnitData.goodsPrice" :rules="[x => !!x || 'กรุณากรอกราคาขาย']" label="GoodsPrice" outlined dense placeholder="ราคาขาย"></v-text-field>
                </v-col>
                <v-col cols="1"><v-subheader></v-subheader></v-col>
                <v-col cols="11"><v-subheader class="pl_0"><v-checkbox v-model="ObjUnitData.isBaseUnit"></v-checkbox> หน่วยนับหลัก</v-subheader></v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed outlined color="error" @click="ClearUnitModal()">Close</v-btn>
          <v-btn depressed outlined color="primary" :disabled="!validObjUnit" @click="InsertUnit()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import global from '@/mixins/global'
  import { state } from '~/store'
  export default {
    mixins: [global],
    props: ['isDialogGoods'],
    data: () => ({
      dialog: false,
      isDialogUnit: false,
      validObjGoods: true,
      validObjUnit: true,
      ObjGoodsData: { listUnit: [] },
      searchInput: "",
      ObjUnitData: {},
      selectedUnit: null,
      transacGridUnitControl : { focusUID : null }
    }),
    watch: {
      isDialogGoods: function (val) {
        var goodsObj = this.$store.getters.goodsObj  
        if (!!goodsObj) {
            this.ObjGoodsData.goodsNo = goodsObj.goods.goodsNo
        }
      }
    },
    mounted(){

    },
    methods: {
      AddGoods() {
        let config = {
          headers : { "Content-Type": "application/x-www-form-urlendcorded" }
        }
        this.$axios
          .$post('https://localhost:5001/api/PostGoods', { GoodsNo : 'ITM-001'})
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            alert(err)
          })

        //console.log(this.ObjGoodsData)
        //this.addGoods(this.ObjGoodsData)
        //this.closeModalGoods()
      },
      AddUnit: function () {
        var onFoucus = this.ObjGoodsData.listUnit.filter(x => {
          return x.isFocusRow
        }).length;

        if (onFoucus == 0) {
          const uid = Math.random().toString(16).slice(2)
          this.ObjGoodsData.listUnit.push({
            uid: Math.random().toString(16).slice(2),
            isFocusRow: true
          })

          console.log(this.ObjGoodsData)
        }
        else
        {
          this.callAlert(true)
        }



        
        // this.transacGridUnitControl.focusUID = uid
        //this.ObjUnitData['uid'] = Math.random().toString(16).slice(2)
      },
      InsertUnit: function () {
        if (this.$refs.form.validate()) {
          this.ObjUnitData['uid'] = Math.random().toString(16).slice(2)
          if (!!this.ObjGoodsData.listUnit) {
            this.ObjGoodsData.listUnit.push(this.ObjUnitData)
          }
          else
          {
            this.ObjGoodsData.listUnit = [this.ObjUnitData]
          }

          console.log('selectedUnit : ' + this.selectedUnit)
                    console.log(this.ObjGoodsData)
          
          this.ClearUnitModal()
        }
      },
      ClearUnitModal: function () {
        this.isDialogUnit = false
        this.ObjUnitData = {}
        this.$refs.form.reset()
      },
      EditUnit: function (e) {
        this.transacGridUnitControl.focusUID = e
        //console.log(e)
      },
      DeleteptUnit: function () {
        
      },
      AccpetUnit: function () {
         this.transacGridUnitControl.focusUID = null
      },
      closeModalGoods(){
        this.$refs.form.reset()
        this.$emit('close');
      }
    }
  }
</script>
<style>
  html {
    font-family: 'Sarabun', sans-serif;
  }
  .content {
    margin-top: 10px;
  }
  .transac-input {
    width: 150px;
    padding: 2px 10px 3px 5px;
    height: 30px;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    vertical-align: middle;
  }
  .transac-input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }
  .transac-input[disabled], .transac-input[readonly] {
    background-color: rgb(235, 235, 228) !important;
  }
  .pointer {
    cursor: pointer;
  }
  .c-red {
    color: red;
  }
  .c-blue {
    color: #1976d2;
  }
</style>