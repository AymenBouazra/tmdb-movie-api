<template>
        <div class="flex items-center justify-between p-4">
            <h1 class="text-3xl font-bold">{{ title.toUpperCase() + 'S' }}</h1>
            <BaseInput :v-model="search" placeholder="Search..." class="w-full md:w-96 rounded-3xl border-2 border-stone-900 p-2" />
        </div>

</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
const search = ref('')
const emit = defineEmits(['search'])
</script>