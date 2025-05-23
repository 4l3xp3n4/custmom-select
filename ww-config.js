export default {
  editor: {
    label: {
      en: "Custom Selector with Add",
    },
    icon: "select",
    category: "Form",
  },
  properties: {
    options: {
      label: { en: "Options" },
      type: "array",
      defaultValue: ["Option 1", "Option 2"],
      bindable: true,
    },
    selectedValue: {
      label: { en: "Selected Value" },
      type: "string",
      defaultValue: "",
      bindable: true,
    },
    placeholder: {
      label: { en: "Placeholder" },
      type: "string",
      defaultValue: "Add new option...",
      bindable: true,
    },
    onOptionAddCallback: {
      label: { en: "On Option Add (Function)" },
      type: "function", // ✅ function prop
      bindable: true,
    },
    setStateSelection: {
      label: { en: "On select" },
      type: "function", // ✅ function prop
      bindable: true,
    },
  },
  events: [
    {
      name: "option-added",
      label: { en: "When an option is added" },
    },
  ],
};
