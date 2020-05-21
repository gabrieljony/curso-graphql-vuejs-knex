// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify)

const opts = { iconfont: 'md' }

export default new Vuetify(opts)
