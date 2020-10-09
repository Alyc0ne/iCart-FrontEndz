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
                        <tr v-for="item in ListUnit" :key="item.uid">
                          <td ref="ManageAccept">
                            <font-awesome-icon :icon="['fas', 'check']" class="pointer c-blue" @click="AcceptUnit()" style="margin-right:10px;"/>
                            <font-awesome-icon :icon="['fas', 'times']" class="pointer c-red" @click="NotAcceptUnit()"/>
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

      <!-- <v-card>
        <v-card-title>เพิ่มข้อมูลสินค้า</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container style="margin-left:0px !important;">
            <v-row>
              <v-tabs color="blue accent-4" vertical>
                <v-tab>ข้อมูลทั่วไป</v-tab>
                <v-tab>หน่วยนับ</v-tab>
                <v-tab>รูปภาพ</v-tab>

                <v-row align="center" justify="end" style="margin-right:10px;" :key="2">
                  <v-btn text large color="primary" outlined @click="addUnit()"><span style="margin-right:10px;">เพิ่มหน่วยนับ</span><font-awesome-icon :icon="['fas', 'plus']" /></v-btn>
                </v-row>

                <v-tab-item :key="1"> 
                  <v-col class="content">
                    <v-text-field label="รหัสสินค้า" outlined dense placeholder=""></v-text-field>
                    <v-text-field label="ชื่อสินค้า" outlined dense></v-text-field>
                    <v-select :items="items" label="หมวดหมู่สินค้า" outlined dense></v-select>
                    <v-textarea outlined label="รายละเอียดสินค้า" value=""></v-textarea>
                  </v-col>
                </v-tab-item>
                <v-tab-item :key="2">
                  <v-col class="content">
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
      </v-card> -->
    </v-dialog>

    <v-dialog v-model="isDialogUnit" max-width="500px">
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>เพิ่มหน่วยนับ</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-col class="content">
            <v-text-field label="Barcode" outlined dense placeholder=""></v-text-field>
            <v-select v-model="ListUnit" item-text="UnitName" item-value="UnitNo" label="หน่วยนับ" return-object single-line></v-select>
            <!-- <v-select :ListUnit="ListUnit" label="หน่วยนับ" outlined dense></v-select> -->
            <!-- <v-checkbox v-model="item.IsBaseUnit"></v-checkbox> -->
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="dialog2 = false"
          >
            Close
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
      isDialogUnit: false,
      select: { state: 'Florida', abbr: 'FL' },
      // items: [
      //   { state: 'Florida', abbr: 'FL' },
      //   { state: 'Georgia', abbr: 'GA' },
      //   { state: 'Nebraska', abbr: 'NE' },
      //   { state: 'California', abbr: 'CA' },
      //   { state: 'New York', abbr: 'NY' },
      // ],

      ListUnit:[
        {
          UnitNo: 'UN-001',
          UnitName: 'กล่อง',
        },
        {
          UnitNo: 'UN-002',
          UnitName: 'แพค',
        },
      ]
    }),
    methods: {
      addUnit: function () {
        var obj = {
          uid: '',
          Barcode: '123456',
          UnitNo: 'UN-001',
          UnitName: 'กล่อง',
          IsBaseUnit: true
        }
        this.ListUnit.push(obj);
        console.log(this.$refs)
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