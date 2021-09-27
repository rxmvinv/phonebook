<template>
  <EntitiesList />
  <Sidebar />
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import EntitiesList from './components/EntitiesList.vue'
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Sidebar,
    EntitiesList
  },
  methods: {
    ...mapActions({
      fetchInitial: 'main/fetchInitial'
    })
  },
  mounted() {
    this.fetchInitial();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  position: relative;
}
</style>
