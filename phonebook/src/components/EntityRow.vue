<template>
  <div class="entity-row">
    
    <div
      class="entity-details"
      v-on:click="switchMode(entity.id)"
    >
      <div> ID: <span>{{ entity.id }}</span> </div>

      <div> Phone Number: <span>{{ entity.phoneNumber }}</span> </div>

      <div> Email: <span>{{ entity.email }}</span> </div>

      <div> First Name: <span>{{ entity.firstName }}</span> </div>

      <div> Last Name: <span>{{ entity.lastName }}</span> </div>
    </div>

    <div
      class="action-buttons"
      v-bind:class="{
        active: isSelected === entity.id,
        unactive: isSelected !== entity.id
      }"
    >
      <button v-on:click="updateEntity(entity)">Edit</button>
      <button v-on:click="removeEntity(entity.id)">Remove</button>
      <button v-on:click="switchMode(null)">Cancel</button>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'EntityRow',
  data() {
    return {
      isSelected: null
    }
  },
  props: {
    entity: Object,
  },
  methods: {
    ...mapActions({
      toggleForm: 'main/toggleForm',
      removeSelected: 'main/removeSelected'
    }),
    updateEntity(selectedEntity) {
      this.toggleForm(selectedEntity)
    },
    removeEntity(selectedID) {
      this.removeSelected(selectedID)
    },
    switchMode(selectedID) {
      this.isSelected = selectedID;
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

.entity-row {
  position: relative;
  overflow: hidden;
  border: 2px solid;
  border-radius: 8px;
  margin: 5px;
  padding: 5px;
}
.entity-details {
  width: 100%;
  max-width: 25vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  cursor: pointer;
}

.action-buttons {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: auto;
  bottom: -100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: rgba(30,30,30,0.7);
}
.action-buttons button {
  width: 80%;
  margin: auto;
  cursor: pointer;

  background: #fff;
  border-radius: 8px;
  border: 2px solid #2c3e50;
}
.action-buttons.active {
  animation: editionmodeon 0.3s linear forwards;
}

.action-buttons.unactive {
  animation: editionmodeoff 0.3s linear forwards;
}

@keyframes editionmodeon {
  from {
    bottom: -100%;
  }
  to {
    bottom: 0%;
  }
}
@-webkit-keyframes editionmodeon {
  from {
    bottom: -100%;
  }
  to {
    bottom: 0%;
  }
}

@keyframes editionmodeoff {
  from {
    bottom: 0%;
  }
  to {
    bottom: -100%;
  }
}
@-webkit-keyframes editionmodeoff {
  from {
    bottom: 0%;
  }
  to {
    bottom: -100%;
  }
}
</style>
