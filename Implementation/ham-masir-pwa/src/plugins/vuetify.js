import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  rtl: true,
  theme: {
    primary: colors.cyan.darken3,
    primaryLight: colors.cyan.lighten5,
    navigationDrawer: colors.cyan.darken3,
    secondary: colors.pink.darken3,
    success: colors.lightGreen.darken3,
    error: colors.red.darken3,
    info: colors.lightBlue.darken3,
    warning: colors.yellow.darken3
  }
})
