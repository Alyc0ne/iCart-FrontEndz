<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
<v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
            <v-btn small color="primary" dark @click="showModal">Small Button</v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
        <v-card-text>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Calories
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in desserts"
                  :key="item.name"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
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
      isDialogGoods: false,
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  methods: {
    showModal() {
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