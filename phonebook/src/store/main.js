import {
  postOptions,
  putOptions,
  deleteOptions
} from './utils'

  const api = `${process.env.VUE_APP_API_URL}/api/entities/`

  // initial state
  const state = () => ({
    activeForm: false,
    entities: [],
    updatingEntity: null
  })

  const dataFetch = async (url, options) => {
    const response = await fetch(url, options || {});
    const extracted = await response.json();
    console.log(extracted);

    return extracted;
  }
  
  // getters
  const getters = {
    getListLength: (state) => state.entities.length
  }
  
  // actions
  const actions = {

    toggleForm({ commit }, selectedEntity) {
      commit('switchForm')
      selectedEntity ?
      commit('setUpdating', selectedEntity) :
      setTimeout(() => commit('setUpdating'), 300)
    },

    fetchInitial({ commit }) {
      dataFetch(api).then(initData => {
        commit('setValues', initData)
      }).catch(e => console.log(e))
    },

    saveUpdates({ commit, state }, updatedEntity) {
      const updatedList = (Object.keys(state.updatingEntity).length > 0) ? //updatedList.find(ent => ent.id === updatedEntity.id)
        [...state.entities].map(ent => ent.id === updatedEntity.id ? updatedEntity : ent) :
        [...state.entities, updatedEntity]
      
      Object.keys(state.updatingEntity).length > 0 ? 
      
        dataFetch(`${api}${updatedEntity.id}`, putOptions(updatedEntity)).then(initData => {
            console.log(initData)
            commit('setValues', updatedList)
            commit('switchForm')
        }).catch(e => console.log(e)) :

        dataFetch(api, postOptions(updatedEntity)).then(initData => {
            console.log(initData)
            commit('setValues', updatedList)
            commit('switchForm')
        }).catch(e => console.log(e))
    },

    removeSelected({ commit, state }, selectedID) {
      const updatedList = [...state.entities].filter(ent => ent.id !== selectedID)

      dataFetch(`${api}${selectedID}`, deleteOptions()).then(initData => {
        console.log(initData)
        commit('setValues', updatedList)
      }).catch(e => console.log(e))
    }
  }
  
  // mutations
  const mutations = {
    switchForm(state) {
        state.activeForm = !state.activeForm;
    },
    setUpdating(state, updatingEntity) {
        state.updatingEntity = updatingEntity || {};
    },
    setValues (state, initData) {
        state.entities = [...initData];
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }