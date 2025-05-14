<template>
  <div class="select-wrapper">
    <div class="select-container">
      <select v-model="selected" class="select-box">
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
      <input
        v-model="newOption"
        @keyup.enter="addOption"
        class="input-box"
        placeholder="Add new option"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        initialOptions: [],
      }),
    },
  },
  data() {
    return {
      options: this.content.initialOptions || [],
      newOption: '',
      selected: '',
    };
  },
  methods: {
    addOption() {
      const trimmed = this.newOption.trim();
      if (trimmed && !this.options.includes(trimmed)) {
        this.options.push(trimmed);
        this.selected = trimmed;
      }
      this.newOption = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.select-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.select-box,
.input-box {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.input-box {
  flex: 1;
}
</style>