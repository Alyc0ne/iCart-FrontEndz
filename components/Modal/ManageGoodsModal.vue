<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogGoods" persistent max-width="850px">
      <v-card>
        <v-card-title>เพิ่มข้อมูลสินค้า</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-tabs color="blue accent-4" left>
                <v-tab>ข้อมูลทั่วไป</v-tab>
                <v-tab>หน่วยนับ</v-tab>
                <v-tab>รูปภาพ</v-tab>

                <v-row align="center" justify="end" style="margin-right:10px;" :key="2">
                  <v-btn text large color="primary" outlined @click="addUnit()"><span style="margin-right:10px;">เพิ่มหน่วยนับ</span><font-awesome-icon :icon="['fas', 'plus']" /></v-btn>
                    <!-- <v-btn small color="" >Small Button</v-btn> -->
                </v-row>

                <v-tab-item :key="1"> 
                  <v-col class="content">
                    <v-text-field label="รหัสสินค้า" outlined dense placeholder=""></v-text-field>
                    <v-text-field label="ชื่อสินค้า" outlined dense></v-text-field>
                    <!-- <v-select :items="items" label="หมวดหมู่สินค้า" outlined dense></v-select> -->
                    <v-textarea outlined label="รายละเอียดสินค้า" value=""></v-textarea>
                  </v-col>
                   <!-- <label for="GoodsName" class="col-sm-2 col-form-label text-left">
                        <span class="req">*</span>
                      </label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control w40vw" id="GoodsNo" disabled>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="GoodsName" class="col-sm-2 col-form-label text-left">
                        <span class="req">*</span>
                      </label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control w40vw" id="GoodsName">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="CateNo" class="col-sm-2 col-form-label text-left">
                        <span class="req">*</span>หมวดหมู่
                      </label>
                      <div class="col-sm-10 group-picker">
                        <input type="text" class="form-control w15vw" id="CateNo" disabled>
                        <input type="text" class="form-control w20vw" id="CateName" disabled>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="GoodsDesc" class="col-sm-2 col-form-label text-left">
                        <span class="req"></span>
                      </label>
                      <div class="col-sm-10">
                      <textarea class="form-control w40vw" id="GoodsDesc" rows="3"></textarea>
                      </div>
                    </div> -->
                </v-tab-item>
                <v-tab-item :key="2">
                  <v-col class="content">
                    <!-- <v-row align="center">
                      <v-btn text small color="primary" outlined @click="addUnit()"><font-awesome-icon :icon="['fas', 'plus']" /></v-btn>
                    </v-row> -->
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
                          <tr v-for="item in ListUnit" :key="item.uid">
                            <td>
                              <font-awesome-icon :icon="['fas', 'check-circle']" class="pointer" @click="Confirme"/>
                              <font-awesome-icon :icon="['fas', 'trash-alt']" />
                            </td>
                            <td><input type="text" class="transac-input" v-model="item.Barcode"></td>
                            <td><input type="text" class="transac-input" v-model="item.UnitNo"></td>
                            <td><input type="text" class="transac-input" v-model="item.UnitName" readonly></td>
                            <td><v-checkbox v-model="item.IsBaseUnit"></v-checkbox></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-tab-item>
                <!-- <v-tab-item v-for="n in 3" :key="n">
                  <v-container fluid>
                    <v-row>
                      <v-col
                        v-for="i in 6"
                        :key="i"
                        cols="12"
                        md="4"
                      >
                        <v-img
                          :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                          :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                          aspect-ratio="1"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item> -->
              </v-tabs>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            
          >
            Save
          </v-btn>
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
      ListUnit:[],
    }),
    methods: {
      addUnit: function () {
        var obj = {
          Barcode: '123456',
          UnitNo: 'UN-001',
          UnitName: 'กล่อง',
          IsBaseUnit: true
        }
        this.ListUnit.push(obj);
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
</style>