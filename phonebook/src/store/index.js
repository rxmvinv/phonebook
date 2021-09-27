import { createStore } from 'vuex'
import main from './main'

const debug = false//process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    main
  },
  strict: debug
})