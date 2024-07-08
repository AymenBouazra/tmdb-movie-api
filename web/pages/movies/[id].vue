<template>
    <PageContainer>
        <BaseLink :to="{ name: 'index' }" class="text-white text-2xl flex items-center gap-2 mb-5 decoration-0">
            <BaseIconBox color="bg-stone-900">
                <Icon name="mdi:chevron-left-circle-outline" size="lg" />
            </BaseIconBox>
            <span>Back to home</span>
        </BaseLink>
        <div v-if="movie" class="movie-detail">
            <div class="grid grid-cols-6 gap-4">
                <img :src="posterUrl" :alt="movie.title" class="col-span-2 rounded-3xl" />
                <div class="movie-detail-content col-span-4 mt-8">
                    <h1 class="text-3xl font-bold text-amber-500">{{ movie.title }}</h1>
                    <h1 class="text-2xl font-bold text-gray-500">Overview:</h1>
                    <p class="movie-overview text-md">{{ movie.overview }}</p>
                    <p class="movie-release-date text-sm"><strong>Release Date:</strong> {{ movie.release_date }}</p>
                    <p class="movie-vote-average text-sm"><strong>Vote Average:</strong> {{ movie.vote_average.toFixed(1) }} / 10</p>
                    <p class="movie-vote-count text-sm"><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
                    <h2 class="text-2xl font-bold text-gray-500">Production companies:</h2>
                    <ul class="flex flex-wrap gap-2">
                        <li v-for="company in movie.production_companies" :key="company.id">{{ company.name }},</li> 
                    </ul>
                </div>
            </div>

            <div class="grid grid-cols-4 gap-4 mt-6">
                <BaseButton 
                    rounded="sm"
                    color="light"
                    padding="md"
                    class="col-span-4 md:col-span-1 sm:col-span-2 rounded-3xl flex flex-col justify-center items-center gap-2"
                    v-for="(video,index) in movie.videos.results" 
                    :key="video.id"
                    @click="changeVideo(index)"
                    >
                    {{ video.name.length > 30 ? video.name.substring(0, video.name.indexOf(' ', 30)) + '...' : video.name }}
                </BaseButton>
                <iframe width="100%" height="500" class="col-span-4" :src="'https://www.youtube.com/embed/'+movie.videos.results[videoIndex].key" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
        <div v-else>
            <BaseCard color="bg-stone-900" rounded="md" class="p-4 md:p-6 bg-stone-900 flex flex-col justify-between h-full">
                <div class="flex items-center gap-3">
                    <BasePlaceload class="h-10 w-10 rounded-full" />
                    <BasePlaceload class="h-96 w-1/2 rounded" />
                </div>
                <div class="grow space-y-2 p-4">
                    <BasePlaceload class="h-3 w-full rounded" />
                    <BasePlaceload class="h-3 w-full rounded" />
                    <BasePlaceload class="h-3 w-full rounded" />
                    <BasePlaceload class="h-3 w-full rounded" />
                    <BasePlaceload class="h-3 w-full rounded" />
                    <BasePlaceload class="h-3 w-full rounded" />
                    <BasePlaceload class="h-3 w-[85%] rounded" />
                </div>
            </BaseCard>
        </div>
    </PageContainer>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const movie = ref(null)
const videoIndex = ref(0)
const changeVideo = (index) => {
    videoIndex.value = index
}

const posterUrl = computed(() => movie.value ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}` : '')

const fetchMovie = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}movies/${route.params.id}?type=${route.query.type}`)
    const data = await response.json()
    movie.value = data
    console.log(movie.value)
}
fetchMovie()
</script>
<style>
.movie-poster{
    width: 30%;
}

</style>
