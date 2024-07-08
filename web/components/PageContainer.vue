<template>
    <div class="bg-stone-950 text-white h-full min-h-screen max-w-4xl mx-auto p-4">
        <slot />
    </div>
</template>

<script setup>
defineProps({
    movie: Object,  
})


</script>