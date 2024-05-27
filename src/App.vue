<template>
  <div>
    <div class="main">
      <div class="main__left">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="125"
          height="125"
        />
        <img
          alt="Itmo logo"
          class="logo"
          src="@/assets/itmo.png"
          width="125"
          height="125"
        />
      </div>

      <div class="main__right">
        <BaseButton class="main__button" text="ADD" @click="openItemModal" />

        <BaseItem
          v-for="(item, index) in itemsList"
          :key="item.id"
          :title="item.title"
          @edit="openItemModal(index)"
          @delete="deleteItem(item.id)"
          @increase="(value) => onIncrease(value, index)"
        />
      </div>
    </div>

    <item-modal
      :title="
        typeof currentItemIndex === 'number'
          ? itemsList[currentItemIndex]?.title
          : ''
      "
      :is-visible="isModalVisible"
      :is-editing="typeof currentItemIndex === 'number'"
      @close="closeModal"
      @save="saveItem"
    />
  </div>
</template>

<script>
import { faker } from "@faker-js/faker";

import BaseItem from "./components/BaseItem.vue";
import BaseButton from "./components/BaseButton.vue";
import ItemModal from "./components/ItemModal.vue";

export default {
  name: "App",

  components: {
    BaseItem,
    BaseButton,
    ItemModal,
  },

  data() {
    return {
      itemsList: [],
      isModalVisible: false,
      currentItemIndex: undefined,
    };
  },

  mounted() {
    this.generateItemsList(7);
  },

  methods: {
    generateItemsList(num) {
      for (let i = 0; i <= num; i++) {
        this.itemsList.push({
          title: faker.commerce.product(),
          quantity: 1,
          id: faker.string.uuid(),
        });
      }
    },

    onIncrease(value, index) {
      console.log(value);
      // this.itemsList[index].quantity = value;

      this.$set(this.itemsList[index], "quantity", value);
    },

    openItemModal(index) {
      this.currentItemIndex = index;

      this.isModalVisible = true;
    },

    saveItem(title) {
      if (typeof this.currentItemIndex === "number") {
        this.itemsList[this.currentItemIndex].title = title;
      } else {
        this.itemsList.push({
          title,
          quantity: 1,
          id: faker.string.uuid(),
        });
      }

      this.currentItemIndex = undefined;
      this.isModalVisible = false;
    },

    deleteItem(id) {
      if (!id) {
        return;
      }

      this.itemsList = this.itemsList.filter((item) => item.id !== id);
    },

    closeModal() {
      this.isModalVisible = false;
      this.currentItemIndex = undefined;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__right {
    background-color: #34495e;
    padding: 20px;
    min-width: 400px;
    border-radius: 30px;
  }

  &__button {
    margin-bottom: 20px;
  }
}

.logo {
  display: block;
  width: 100%;
}
</style>
