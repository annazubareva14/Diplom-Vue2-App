<template>
  <base-modal :is-visible="isVisible" @close="$emit('close')">
    <template #content>
      <input class="item-modal__input" type="text" v-model="newValue" />
      <base-button :text="buttonText" @click="$emit('save', value)" />
    </template>
  </base-modal>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseModal from "./BaseModal.vue";

export default {
  name: "ItemModal",

  components: {
    BaseButton,
    BaseModal,
  },

  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: "",
    },

    isEditing: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      value: "",
    };
  },

  computed: {
    newValue: {
      get() {
        return this.title;
      },

      set(newValue) {
        this.value = newValue;
      },
    },

    buttonText() {
      return this.isEditing ? "EDIT" : "ADD";
    },
  },
};
</script>

<style lang="scss">
.item-modal {
  &__input {
    border: 1px solid gray;
    border-radius: 10px;
    background: transparent;
    width: 100%;
    padding: 5px 8px;
    font-size: 20px;
    height: 50px;
    margin-bottom: 20px;
  }
}
</style>
