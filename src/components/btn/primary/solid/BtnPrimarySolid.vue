<template>
    <button :type="type"
        class="flex-1 justify-center flex items-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-300 active:bg-blue-600 ease-in duration-75">
        {{ title }}
    </button>
</template>

<script>
    export default {
        name: 'BtnPrimarySolid',
        props: {
            type: {
                type: String,
                default: 'button'
            },
            title: {
                type: String,
                required: true
            }
        }
    };
</script>