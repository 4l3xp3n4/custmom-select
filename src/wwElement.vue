<template>
  <div class="selector-wrapper">
    <select v-model="selected" @change="emitSelection" class="select-box">
      <option v-for="(option, index) in internalOptions" :key="index" :value="option">
        {{ option }}
      </option>
    </select>

    <input
      v-model="newOption"
      @keyup.enter="addNewOption"
      class="input-box"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      internalOptions: this.content.options || [],
      newOption: '',
      selected: this.content.selectedValue || '',
    };
  },
  watch: {
    selected(newVal) {
      this.$emit('update:selectedValue', newVal);
    },
  },
  methods: {
    emitSelection() {
      this.$emit('update:selectedValue', this.selected);
    },
    addNewOption() {
      const newVal = this.newOption.trim();
      if (newVal && !this.internalOptions.includes(newVal)) {
        this.internalOptions.push(newVal);
        this.selected = newVal;
        this.$emit('option-added', newVal); // ✅ emit custom event
      }
      this.newOption = '';
    },
  },
};
</script>

<style scoped>
.selector-wrapper {
  display: flex;
  gap: 8px;
  flex-direction: column;
}

.select-box,
.input-box {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
