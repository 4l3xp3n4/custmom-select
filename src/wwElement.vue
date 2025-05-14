<template>
  <div class="selector-wrapper">
    <input
      v-model="inputValue"
      @keyup.enter="handleEnter"
      @input="filterOptions"
      class="input-box"
      :placeholder="placeholder || 'Search or add...'"
    />

    <!-- Dropdown suggestions -->
    <ul v-if="filteredOptions.length && showDropdown" class="dropdown">
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
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
      internalOptions: [...new Set(this.content.options || [])],
      inputValue: '',
      selected: this.content.selectedValue || '',
      filteredOptions: [],
      showDropdown: false,
    };
  },
  watch: {
    selected(newVal) {
      this.$emit('update:selectedValue', newVal);
    },
  },
  methods: {
    filterOptions() {
      const q = this.inputValue.toLowerCase();
      this.filteredOptions = this.internalOptions.filter(opt =>
        opt.toLowerCase().includes(q)
      );
      this.showDropdown = this.filteredOptions.length > 0;
    },
    handleEnter() {
      const value = this.inputValue.trim();
      if (!value) return;

      if (!this.internalOptions.includes(value)) {
        this.internalOptions.push(value);
        this.$emit('option-added', value);
        this.content?.onOptionAddCallback?.(value);
      }

      this.selectOption(value);
    },
    selectOption(value) {
      this.selected = value;
      this.inputValue = value;
      this.showDropdown = false;
      this.content?.setStateSelection?.(value);
      this.$emit('update:selectedValue', value);
    },
  },
};
</script>

<style scoped>
.selector-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-box {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 150px;
  overflow-y: auto;
  z-index: 100;
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown li {
  padding: 8px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}
</style>
