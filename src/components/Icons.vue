<template>
    <div v-html="icon" />
</template>
  
<script>
  export default {
    props: {
      name: String,
    },
    computed: {
      icon() {
        // Import the SVG file dynamically
        return require(`@/assets/icons/${this.name}.svg`);
      },
    },
  };
  </script>
  