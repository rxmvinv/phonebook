<template>
  <div 
    class="sidebar"
    v-bind:class="{opened: activeForm, closed: !activeForm}"
  >

    <div class="create-entity" v-on:click="toggleForm()">New</div>

    <div class="entity-menu">
      <form v-on:submit="$event.preventDefault()">

        <label>ID: 
          <input 
            type="text" 
            disabled
            v-model="updatingEntity.id"
            v-on:input="insertForm({id: $event.target.value})"
            v-on:change="insertForm({id: $event.target.value})"
          />
        </label>

        <label v-bind:class="{'not-valid': validation.phoneNumber}">Phone Number: 
          <input 
            type="text" 
            v-model="updatingEntity.phoneNumber" 
            v-on:input="insertForm({phoneNumber: $event.target.value})"
            v-on:change="insertForm({phoneNumber: $event.target.value})"
          />
          <span v-if="validation.phoneNumber">Valid format: 888-888-8888</span>
        </label>

        <label v-bind:class="{'not-valid': validation.email}">Email: 
          <input
            type="text" 
            v-model="updatingEntity.email" 
            v-on:input="insertForm({email: $event.target.value})"
            v-on:change="insertForm({email: $event.target.value})"
          />
          <span v-if="validation.email">Insert valid email</span>
        </label>

        <label v-bind:class="{'not-valid': validation.firstName}">First Name: 
          <input 
            type="text" 
            v-model="updatingEntity.firstName" 
            v-on:input="insertForm({firstName: $event.target.value})"
            v-on:change="insertForm({firstName: $event.target.value})"
          />
          <span v-if="validation.firstName">At least one symbol</span>
        </label>

        <label v-bind:class="{'not-valid': validation.lastName}">Last Name: 
          <input 
            type="text" 
            v-model="updatingEntity.lastName" 
            v-on:input="insertForm({lastName: $event.target.value})"
            v-on:change="insertForm({lastName: $event.target.value})"
          />
          <span v-if="validation.lastName">At least one symbol</span>
        </label>

        <button 
          class="commit-changes"
          v-on:click="commitChanges()"
          v-bind:disabled="(validation.phoneNumber || 
          validation.email || validation.firstName || 
          validation.lastName)"  
        >{{ 
          Object.keys({...updatingEntityStore}).length > 0 ? 
            'Update Entity' : 
            'Create Entity' 
        }}</button>
      
      </form>

      <button
        v-on:click="toggleForm()"
        class="close-menu"
      ></button>
    </div>

  </div>
</template>

<script>
import { computed, reactive, watch, toRefs } from 'vue'
import { useStore } from 'vuex'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

  export default {
    name: 'EntityForm',
    setup() {
      const store = useStore()
      const { useActions } = createNamespacedHelpers(store, 'main')
      const state = reactive({ 
        updatingEntity: {},
        validation: {
          phoneNumber: false,
          email: false,
          firstName: false,
          lastName: false
        }
      })

      const listLength = computed(() => store.getters[`${'main'}/getListLength`])
      const updatingEntityStore = computed(() => store.state['main'].updatingEntity)
      const activeForm = computed(() => store.state['main'].activeForm)
      const { updatingEntity, validation} = toRefs(state)

      watch(
        () => updatingEntityStore,
        newValue => {
          if ( newValue ) {
            state.updatingEntity = {
              id: Object.keys(newValue.value).length > 0 ? 
                newValue.value.id : listLength.value + 1,
              ...newValue.value,
            }
          }
        },
        { deep: true }
      )

      watch(
        () => state.updatingEntity,
        (newValue, oldValue) => {
          if ( newValue && oldValue ) {
            state.validation = {
              ...state.validation,
              phoneNumber: oldValue.phoneNumber && phoneNumberValidationCheck(),
              email: oldValue.email && emailValidationCheck(),
              firstName: fieldLengthCheck(state.updatingEntity.firstName),
              lastName: fieldLengthCheck(state.updatingEntity.lastName)
            }
          }
        },
        { deep: true }
      )

      watch(
        () => listLength,
        newValue => {
          if (newValue && !(Object.keys(state.updatingEntity).length > 0)) {
            state.updatingEntity.id = `${newValue.value + 1}`
          }
        },
        { deep: true }
      )

      const { toggleForm, saveUpdates } = useActions(['toggleForm', 'saveUpdates'])

      const insertForm = (userInput) => {
        state.updatingEntity = {
          ...state.updatingEntity,
          ...userInput
        }
      }

      const commitChanges = () => {
        (!state.validation.phoneNumber && !state.validation.email &&
        !state.validation.firstName && !state.validation.lastName) &&
        saveUpdates(state.updatingEntity)
      }

      const emailValidationCheck = () => {
        const format = /\S+@\S+\.\S+/
        const email = `${state.updatingEntity.email}`

        return (email.length <= 0) || !format.test(String(email).toLowerCase());
      }

      const phoneNumberValidationCheck = () => {
        const phoneNumber = `${state.updatingEntity.phoneNumber}`
        const format = /^(\d{3})(-{1})(\d{3})(-{1})(\d{4})$/

        return (phoneNumber.length <= 0) || 
          !format.test(String(phoneNumber).toLowerCase());
      }

      const fieldLengthCheck = (field) => {
        return `${field}`.length <= 0
      }

      return {
          // getter
          listLength,

          activeForm,
          updatingEntity,
          updatingEntityStore,
          validation,
          toggleForm, 
          saveUpdates,
          insertForm,
          commitChanges,
          emailValidationCheck,
          phoneNumberValidationCheck,
          fieldLengthCheck
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
.sidebar {
  position: fixed;
  right: 0;
  left: auto;
  height: 100vh;
  width: max-content;
  top: 0;
  top: 0;
}
.sidebar.closed {
  transition: height 0.1s 0.3s;
  height: 20px;
}
.entity-menu {
  z-index: 9;
  height: 100%;
  width: 320px;
  right: -323px;
  position: absolute;

  border-left: 3px solid;

  background: rgba(30,30,30,0.7)
}

.close-menu {
  position: absolute;
  top: 0;
  right: 0;

}

.close-menu::after {
  content: "";
  display: block;
  text-indent: -9999px;
  width: 13px;
  height: 13px;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-image: url('../assets/menu_close.svg');
  mask-image: url('../assets/menu_close.svg');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 13px 13px;
  mask-size: 13px 13px;
  background-color: #000;
}

.create-entity {
  position: absolute;
  right: 0;

  background: rgba(30,30,30,0.7);
  color: #fff;
  border-radius: 8px;
  border: 2px solid #2c3e50;
  padding: 5px;
  margin-right: 15px;
  margin-top: 15px;
  cursor: pointer;
}
.closed .entity-menu {
  animation: menurelease 0.3s linear forwards;
}

.opened .entity-menu {
  animation: menuexpand 0.3s linear forwards;
}

.entity-menu form {
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  height: 320px;
  margin-top: 50px;
  color: #fff;
}

.entity-menu form .commit-changes {
  background: #fff;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  padding: 5px;
  cursor: pointer;
  color: #000;

  margin: auto;
}

.not-valid {
  color: red;
}

.not-valid input,
.not-valid input:active,
.not-valid input:focus,
.not-valid input:focus-visible {
  border-color: red;
  outline: red;
}

.entity-menu form label {
  font-size: 14px;
  margin-right: 10px;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.entity-menu form label span {
  font-size: 12px;
  margin-left: 50px;
}

.entity-menu form label input {
  height: 20px;
  margin-left: 5px;

  border: 2px solid #2c3e50;
  border-radius: 8px;
}

.entity-menu .close-menu {
  background: #fff;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #000;

  margin-right: 10px;
  margin-top: 10px;
}

.opened .create-entity {
  animation: menurelease 0.3s linear forwards;
}

.closed .create-entity {
  animation: menuexpand 0.3s linear forwards;
}

@keyframes menuexpand {
  from {
    right: -323px;
  }
  to {
    right: 0px;
  }
}

@-webkit-keyframes menuexpand {
  from {
    right: -323px;
  }
  to {
    right: 0px;
  }
}

@keyframes menurelease {
  from {
    right: 0px;
  }
  to {
    right: -323px;
  }
}

@-webkit-keyframes menurelease {
  from {
    right: 0px;
  }
  to {
    right: -323px;
  }
}

</style>
