<template>
<div class="bg-stone-950 text-white h-full max-w-4xl mx-auto">
    <Navbar :title="type"  @search="search = $event" />
</div>
<PageContainer>
        <div class="py-5 w-fit bg-stone-950 rounded-full flex items-center justify-self-end gap-3">
            <BaseSelect size="md" v-model="type" rounded="full" color="black">
                <option value="all">All</option>
                <option value="movie">Movies</option>
                <option value="tv">TV Shows</option>
            </BaseSelect>
            <BaseCheckbox
                v-model='filterByGenre'
                label="Adult"
                color="black"
                size="md"
                rounded="full"
            />
        </div>
        <BasePagination
            v-if="movies.length"
            :item-per-page="20"
            :total-items="totalPages"
            :current-page="currentPage"
            :max-links-displayed="5"
            color="black"
            @update:current-page="updatePage"
            rounded="full"
        />
        <div v-if="movies.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-stone-950 my-5">
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-stone-900 my-5">
            <div v-for="x in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]" :key="x">
                <BaseCard  color="bg-stone-900" rounded="md" class="p-4">
                    <div class="flex items-center">
                        <BasePlaceload class="bg-gray-700 h-48 w-full rounded" />
                    </div>
                    <div class="grow space-y-2 p-4">
                        <BasePlaceload class="bg-gray-700 h-3 w-full rounded" />
                        <BasePlaceload class="bg-gray-700 h-3 w-full rounded" />
                        <BasePlaceload class="bg-gray-700 h-3 w-full rounded" />
                        <BasePlaceload class="bg-gray-700 h-3 w-full rounded" />
                        <BasePlaceload class="bg-gray-700 h-3 w-full rounded" />
                        <BasePlaceload class="bg-gray-700 h-3 w-full rounded" />
                        <BasePlaceload class="bg-gray-700 h-3 w-[85%] rounded" />
                    </div>
                </BaseCard>
            </div>
        </div>
        <BasePagination
            v-if="movies.length"
            class="bg-stone-950"
            :item-per-page="20"
            :total-items="totalPages"
            :current-page="currentPage"
            :max-links-displayed="5"
            color="black"
            @update:current-page="updatePage"
            rounded="full"
        />
    </PageContainer>
</template>

<script setup >
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '@/components/navbar.vue'
import MovieCard from '@/components/MovieCard.vue'
defineComponent('index')

const movies = ref([])
const currentPage = ref(1)
const type = ref('all')
const totalPages = ref(1)
const filterByGenre = ref([])
const route = useRoute()
const router = useRouter()

const fetchMovies = async (page) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}movies?page=${page}&type=${type.value}`)
    const data = await response.json()
    movies.value = data.results
    totalPages.value = data.total_pages
}

console.log(search)

const updatePage = (page) => {
    router.push({ query: { ...route.query, page } })
}

onMounted(() => {
    const page = Number.parseInt(route.query.page) || 1
    currentPage.value = page
    fetchMovies(page)
})

watchEffect(() => {
    const page = Number.parseInt(route.query.page) || 1
    if (currentPage.value !== page) {
        currentPage.value = page
        fetchMovies(currentPage.value)
    } else {
        fetchMovies(currentPage.value)
    }
})

watchEffect(() => {
    if (type.value === 'tv') {
        fetchMovies(currentPage.value, 'tv')
    }else {
        fetchMovies(currentPage.value, 'movie')
    }
})
</script>