<template>
  <v-app light class="myFont">
    <div :class="[$store.getters.isAlert == true ? 'over-lay' : '']">
      <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" clipped fixed app>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar clipped-left fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="title" />
        <v-spacer />
      </v-app-bar>

      <v-main>
        <v-container class="fill-height" fluid>
          <nuxt />
        </v-container>
      </v-main>
    </div>
    <div :hidden="!$store.getters.isAlert" style="">
      <v-alert border="top" colored-border type="warning" elevation="2" dismissible :value="$store.getters.isAlert" max-height="100" style="width: 40%; position: absolute; bottom: 20px; right: 20px; z-index:1051;">
        <h3>ไม่สามารถดำเนินการได้</h3>
        ไม่เจอสินค้าที่ค้นหา
      </v-alert>
    </div>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Goods',
          to: '/IC/Goods/List'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'POS',
          to: '/pos'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'iCart'
    }
  }
}
</script>

<style>
.over-lay {
  background-color: #000000;
  opacity: 0.5;
  width:100%;
  height:100%;
  position: absolute;
  z-index:1050;
}
</style>