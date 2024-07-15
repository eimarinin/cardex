<template>
  <RouterLink :to="href"
    class="flex-1 justify-center flex items-center px-4 py-2 rounded hover:bg-blue-500 hover:text-white active:bg-blue-600 ease-in duration-75"
    :class="{ 'bg-blue-400 text-white': isActive, 'bg-white': !isActive }">
    {{ title }}
  </RouterLink>
</template>

<script>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  export default {
    name: 'LinkPrimarySolid',
    props: {
      href: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const route = useRoute();

      // Вычисляемое свойство для определения активности кнопки
      const isActive = computed(() => route.path === props.href);

      return { isActive };
    }
  };
</script>