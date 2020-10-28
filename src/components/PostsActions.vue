<template>
    <div class="posts-actions">
        <div class="filtering">

            <input type="text" @input="$emit('changeSearchName', $event.target.value)" placeholder="Поиск...">

            <label for="rubric">Рубрика: </label>
            <select name="category" id="rubric">
                <option>Пункт 1</option>
                <option>Пункт 2</option>
                <option>Пункт 3</option>
            </select>

            <label>Цена: </label>
            <input type="text" class="minPrice" placeholder="от">
            <input type="text" class="maxPrice" placeholder="до">
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