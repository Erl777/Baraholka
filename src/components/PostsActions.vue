<template>
    <div class="posts-actions">
        <div class="filtering">

            <input type="text" @input="$emit('changeSearchName', $event.target.value)" placeholder="Поиск...">

            <label for="rubric">Рубрика: </label>
            <select name="category" id="rubric">
                <option value="">Выберите рубрику</option>
                <option>Рубрика 1</option>
                <option>Рубрика 2</option>
            </select>

            <label for="sortingBy">Сортировка: </label>
            <select name="sortingBy" id="sortingBy">
                <option>Самые новые</option>
                <option>Самые дешевые</option>
                <option>Самые дорогие</option>
            </select>

            <label>Цена: </label>
            <input type="text" @input="$emit('changeMinPrice', $event.target.value)" class="minPrice" placeholder="от">
            <input type="text" @input="$emit('changeMaxPrice', $event.target.value)" class="maxPrice" placeholder="до">
        </div>
        <div class="show-type">

        </div>
    </div>
</template>

<script>
    export default {
        name: "PostsActions",
    }
</script>

<style scoped>
    .posts-actions{
        width: 100%;
        min-height: 20px;
        padding: 10px;
    }
</style>