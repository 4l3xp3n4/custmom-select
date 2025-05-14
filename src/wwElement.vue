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
      this.showDropdown = this.filteredOptions
