<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogGoods" persistent max-width="950px" scrollable>
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>เพิ่มข้อมูลสินค้า</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab><v-icon left>mdi-account</v-icon>ข้อมูลทั่วไป</v-tab>
          <v-tab><v-icon left>mdi-lock</v-icon>หน่วยนับ</v-tab>
          <v-tab disabled><v-icon left>mdi-access-point</v-icon>รูปภาพ</v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-col class="content">
                  <v-text-field label="รหัสสินค้า" outlined dense placeholder=""></v-text-field>
                  <v-text-field label="ชื่อสินค้า" outlined dense></v-text-field>
                  <!-- <v-select :items="items" label="หมวดหมู่สินค้า" outlined dense></v-select> -->
                  <v-textarea outlined label="รายละเอียดสินค้า" value=""></v-textarea>
                </v-col>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-col class="content">
                  <v-row align="center" justify="end">
                    <v-btn text normal color="primary" outlined @click="isDialogUnit = true"><span style="margin-right:10px;">เพิ่มหน่วยนับ</span><font-awesome-icon :icon="['fas', 'plus']" /></v-btn>
                  </v-row>
                  <v-simple-table fixed-header height="300px" class="content table-border">
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
                        <tr v-for="item in ObjGoodsData.ListUnit" :key="item.uid">
                          <td ref="ManageAccept">
                            <font-awesome-icon :icon="['fas', 'pen']" class="pointer c-blue" @click="EditUnit(item.uid)" style="margin-right:10px;"/>
                            <font-awesome-icon :icon="['fas', 'trash-alt']" class="pointer c-red" @click="NotAcceptUnit()"/>
                          </td>
                          <td><input readonly type="text" class="transac-input" v-model="item.Barcode"></td>
                          <td><input readonly type="text" class="transac-input" v-model="item.Unit.UnitNo"></td>
                          <td><input readonly type="text" class="transac-input" v-model="item.Unit.UnitName"></td>
                          <td><v-checkbox v-model="item.IsBaseUnit"></v-checkbox></td>
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
      </v-card>
    </v-dialog>

    <v-dialog v-model="isDialogUnit" max-width="500px" ref="modal" persistent>
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>เพิ่มหน่วยนับ</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-col class="content">
            <v-form ref="form" v-model="validObjUnit" lazy-validation>
              <v-text-field v-model="ObjUnitData.Barcode" :rules="BarcodeRules" label="Barcode" outlined dense placeholder=""></v-text-field>
              <v-select v-model="ObjUnitData.Unit" :items="ListSelectUnit" item-text="UnitName" :rules="[x => !!x || 'กรุณาเลือกหน่วยนับ']" label="หน่วยนับ" dense outlined return-object></v-select>
              <v-checkbox v-model="ObjUnitData.IsBaseUnit"></v-checkbox>
            </v-form>
          </v-col>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isDialogUnit = false">Close</v-btn>
          <v-btn color="blue darken-1" text :disabled="!validObjUnit" @click="InsertUnit()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['isDialogGoods'],
    data: () => ({
      dialog: false,
      isDialogUnit: false,
      validObjUnit: true,
      BarcodeRules: [
        v => !!v || 'กรุณากรอกหมายเลข Barcode',
        //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      ObjGoodsData: {
        ListUnit: [{
          uid: '221222',
          Barcode: '12345',
          Unit: {
            UnitID: '01',
            UnitNo: 'UN-01', 
            UnitName: 'ชิ้น'
          }
        }]
      },
      ObjUnitData: {},
      ListSelectUnit: [
        { UnitID: 'FL', UnitNo: 'UN-01', UnitName: 'ชิ้น' },
        { UnitID: 'GA', UnitNo: 'UN-02', UnitName: 'กล่อง' },
        { UnitID: 'NE', UnitNo: 'UN-03', UnitName: 'แพค' },
      ],
    }),
    mounted(){
      // if (!!this) {
      //   $(this.$refs.modal).on('hidden.bs.modal', function () {
      //     //this.image = ''
      //     //this.$refs.form.$reset()
      //   })
      // }
      
    },
    methods: {
      InsertUnit: function () {
        if (this.$refs.form.validate()) {
          this.ObjUnitData['uid'] = Math.random().toString(16).slice(2)
          this.ObjGoodsData.ListUnit.push(this.ObjUnitData)
          this.isDialogUnit = false
        }
      },
      ClearUnitModal: function () {
        this.isDialogUnit = false
        // this.ObjUnitData.Barcode = ''
        // this.ObjUnitData.Unit = ''
        // this.ObjUnitData.IsBaseUnit = ''
      },
      EditUnit: function (e) {
        console.log(e)
      },
      close(){
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