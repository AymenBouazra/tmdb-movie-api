<template>
    <BaseCard rounded="sm" color="bg-stone-900" class="p-6 bg-stone-900 flex flex-col justify-between h-full">
        <div class="flex flex-col justify-between h-full">
            <div class="flex justify-between items-start w-full">
                <BaseAvatar rounded="sm" size="4xl" :src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path" />
                <BaseTag variant="pastel" color="success" size="xl"> {{ movie.media_type ==='tv' ? 'TV-Show' : 'Movie' }} </BaseTag>
                <BaseTag v-if="movie.adult" variant="pastel" color="success" size="xl"> +18</BaseTag>
            </div>
            <span class="text-lg font-bold text-warning-800 py-2">{{ movie.title || movie.name}}</span>
            <p>{{ movie.overview.length > 136 ? movie.overview.substring(0, movie.overview.indexOf(' ', 50)) + '...' : movie.overview }}</p>
            <div class="flex justify-between items-center py-3">
                <span class="text-xs text-warning-300">{{ movie.release_date || movie.first_air_date }}</span>
                <span class="text-xs text-warning-300 flex flex-col items-end">
                    <span>Rating: {{ movie.vote_average.toFixed(1) }} / 10</span>   
                    <span>Total reviews: {{ movie.vote_count }}</span>
                </span>
            </div>
        </div>
        <div>
            <BaseButton rounded="sm" color="success" class="float-right">
                <NuxtLink :to="'/movies/' + movie.id+ '?type=' + movie.media_type">See more</NuxtLink>
            </BaseButton>
        </div>
    </BaseCard>

    
</template>

<script setup>
const props = defineProps({
    movie: Object,  
})
</script>