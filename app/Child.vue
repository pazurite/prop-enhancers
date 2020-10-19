<template>
  <div></div>
</template>

<script>
export default {
  props: {
    color: {
      type: [String, Number],
      enum: [1, 2],
      default: 2,
    },
    height: {
      numeric: true,
      default: '[2342]',
    },
  },
  mounted() {
    console.log('mounted', this.$options);
  },
};
</script>
