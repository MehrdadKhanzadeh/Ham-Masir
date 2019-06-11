<template>
  <v-app id="app">
    <v-navigation-drawer app v-model="navigationDrawer" right v-if="$route.name !== 'signup' && $route.name !== 'login'">
      <v-layout col pa-4 :style="{ height: '128px' }" align-center>
        <v-flex xs4 text-xs-center>
          <v-avatar
            size="75"
            color="grey"
          >
          </v-avatar> 
        </v-flex>
        <v-flex xs8 justify-center align-center align-content-center d-flex>
          <v-layout row wrap>
            <v-flex xs12 text-xs-center style="font-weight: bold; color: black;">
              {{ $store.state.firstName + ' ' + $store.state.lastName }}
            </v-flex>
            <v-flex xs12 text-xs-center style="color: grey;" pb-2>
              {{ $store.state.username }}@
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-flex xs12 pa-3>
        <v-flex class="nav-drawer-item" xs12 pa-2 :style="this.$route.name === 'home' ? { color: this.$vuetify.theme.primary, borderColor: '#00838f' } : {}" @click="$router.push('/')">
          مشاهده و درخواست هم‌مسیر
        </v-flex>
        <v-flex class="nav-drawer-item" xs12 pa-2 :style="this.$route.name === 'plan' ? { color: this.$vuetify.theme.primary, borderColor: '#00838f' } : {}" @click="$router.push('plan')">
          برنامه‌های سفر
        </v-flex>
        <v-flex class="nav-drawer-item" xs12 pa-2 @click="$router.push('login')">
          خروج
        </v-flex>
      </v-flex>
    </v-navigation-drawer>
    <v-toolbar app color="primary" :extended="$route.name === 'home'">
      <v-toolbar-side-icon class="white--text" @click="navigationDrawer = !navigationDrawer" v-if="$route.name !== 'signup' && $route.name !== 'login'"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        هم‌مسیر
      </v-toolbar-title>
      <template v-slot:extension v-if="$route.name === 'home'">
        <v-tabs
          v-model="tab"
          color="transparent"
          grow
          :slider-color="$vuetify.theme.primaryLight"
        >
          <v-tab
            v-for="(item, i) in ['درخواست‌ها', 'پیشنهاد‌ها']"
            :key="item"
            :href="'#tab-' + i"
            class="white--text"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height :style="{ backgroundColor: this.$vuetify.theme.primaryLight }">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      navigationDrawer: true
    }
  },
  computed: {
    tab: {
      get () {
        return this.$store.state.tab
      },
      set (v) {
        this.$store.commit('changeTab', v)
      }
    }
  }
}
</script>

<style>
@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 900;
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_Black.eot');
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_Black.eot?#iefix') format('embedded-opentype'), /* IE6-8 */
      url('./assets/fonts/IRANSans/woff2/IRANSansWeb_Black.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/
      url('./assets/fonts/IRANSans/woff/IRANSansWeb_Black.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url('./assets/fonts/IRANSans/ttf/IRANSansWeb_Black.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: bold;
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_Bold.eot');
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_Bold.eot?#iefix') format('embedded-opentype'), /* IE6-8 */
      url('./assets/fonts/IRANSans/woff2/IRANSansWeb_Bold.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/
      url('./assets/fonts/IRANSans/woff/IRANSansWeb_Bold.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url('./assets/fonts/IRANSans/ttf/IRANSansWeb_Bold.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 500;
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_Medium.eot');
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_Medium.eot?#iefix') format('embedded-opentype'), /* IE6-8 */
      url('./assets/fonts/IRANSans/woff2/IRANSansWeb_Medium.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/
      url('./assets/fonts/IRANSans/woff/IRANSansWeb_Medium.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url('./assets/fonts/IRANSans/ttf/IRANSansWeb_Medium.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 300;
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_Light.eot');
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_Light.eot?#iefix') format('embedded-opentype'), /* IE6-8 */
      url('./assets/fonts/IRANSans/woff2/IRANSansWeb_Light.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/
      url('./assets/fonts/IRANSans/woff/IRANSansWeb_Light.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url('./assets/fonts/IRANSans/ttf/IRANSansWeb_Light.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 200;
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_UltraLight.eot');
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb_UltraLight.eot?#iefix') format('embedded-opentype'), /* IE6-8 */
      url('./assets/fonts/IRANSans/woff2/IRANSansWeb_UltraLight.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/
      url('./assets/fonts/IRANSans/woff/IRANSansWeb_UltraLight.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url('./assets/fonts/IRANSans/ttf/IRANSansWeb_UltraLight.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: normal;
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb.eot');
    src: url('./assets/fonts/IRANSans/eot/IRANSansWeb.eot?#iefix') format('embedded-opentype'), /* IE6-8 */
      url('./assets/fonts/IRANSans/woff2/IRANSansWeb.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/
      url('./assets/fonts/IRANSans/woff/IRANSansWeb.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url('./assets/fonts/IRANSans/ttf/IRANSansWeb.ttf') format('truetype');
}

#app {
  font-family: IRANSans
}

a:hover {
  font-weight: bold;
}

.nav-drawer-item {
  border-style: solid;
  border-width: 1px;
  border-color: white;
  border-radius: 5px;
}

.nav-drawer-item:hover {
  font-weight: bold;
  cursor: pointer;
  border-color: #00838f;
}
</style>

