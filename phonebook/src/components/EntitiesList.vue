<template>
  <transition-group name="entities-list" tag="div" class="entities-list">
    <EntityRow 
      v-for="entity in entities" 
      v-bind:key="entity.id"
      v-bind:entity="entity" 
    />
  </transition-group>
</template>

<script>
import EntityRow from './EntityRow.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
 name: "EntitiesList",
 components: {
   EntityRow
 },
 setup() {
  const store = useStore();

  return {
    entities: computed(() => store.state['main'].entities)
  }
 }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.entities-list {
  display: flex;
  flex-wrap: wrap;
}
.entities-list-enter-active,
.entities-list-leave-active {
  transition: all 0.3s ease;
}
.entities-list-enter-from,
.entities-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

</style>
