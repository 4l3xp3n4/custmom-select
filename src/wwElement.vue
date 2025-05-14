<template>
  <div class="selector-wrapper">
    <!-- 🔍 Search Field -->
    <input
      v-model="searchQuery"
      class="input-box"
      placeholder="Search options..."
    />

    <!-- 🧩 Filtered Select -->
    <select v-model="selected" @change="emitSelection" class="select-box">
      <option
        v-for="(option, index) in filteredOptions"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>

    <!-- ➕ New Option Input -->
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
      searchQuery: '', // 🔍 for filtering
      selected: this.content.selectedValue || '',
    };
  },
  computed: {
    filteredOptions() {
      const unique = [...new Set(this.internalOptions)];
      if (!this.searchQuery) return unique;
      const q = this.searchQuery.toLowerCase();
      return unique.filter((opt) => opt.toLowerCase().includes(q));
    },
  },
  watch: {
    selected(newVal) {
      this.$emit('update:selectedValue', newVal);
    },
  },
  methods: {
    emitSelection() {
      this.$emit('update:selectedValue', this.selected);
      this.content?.setStateSelection?.(this.selected);
    },
    addNewOption() {
      const newVal = this.newOption.trim();
      if (newVal && !this.internalOptions.includes(newVal)) {
        this.internalOptions.push(newVal);
        this.content?.onOptionAddCallback?.(newVal);
        this.content?.setStateSelection?.(newVal);
        this.selected = newVal;
        this.$emit('option-added', newVal);
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
