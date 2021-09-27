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
// import { ref, defineComponent } from 'vue'
// import { useStore } from 'vuex'
import { mapState } from 'vuex';

export default { //defineComponent(
 name: "EntitiesList",
 components: {
   EntityRow
 },
 computed: {
  ...mapState({
    entities: state => state.main.entities
  })
 },
//  setup() {
//    const entities = ref([]); // ref is used to make the parameter reactive
//    const store = useStore();  //alternative to Vue prototype of this.$store
//    entities.value = store.state.main.entities;

//    console.log(entities.value, entities, store.state.main.entities)

//    //this is the way to write methods
//   //  const setTaskComplete = (task: Task): void => {
//   //    store.commit(MutationType.CompleteTask, task);
//   //  };  
//   //  const deleteTask = (task: Task) => {
//   //    store.commit(MutationType.DeleteTask, task);
//   //  };
 
//    // To support two-way data binding
//    return {  
//      entities,
//     //  setTaskComplete,
//     //  deleteTask
//    };
//  }
}//);

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
