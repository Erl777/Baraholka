<template>
    <div class="posts-actions">

        <div class="filteringName">

            <input type="text" @input="$emit('changeSearchName', $event.target.value)" placeholder="Поиск...">

            <div class="show-type">
                <div class="grid" @click="$emit('changeComponent')">
                    <svg class="grid__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"
                        :class="{ active : activeComponent === 'PostGrid' }"
                    >

                    <path d="M208,0H16C7.163,0,0,7.163,0,16v192c0,8.837,7.163,16,16,16h192c8.837,0,16-7.163,16-16V16C224,7.163,216.837,0,208,0z
                         M192,192H32V32h160V192z"/>
                        <path d="M496,0H304c-8.837,0-16,7.163-16,16v192c0,8.837,7.163,16,16,16h192c8.837,0,16-7.163,16-16V16
                        C512,7.163,504.837,0,496,0z M480,192H320V32h160V192z"/>
                        <path d="M208,288H16c-8.837,0-16,7.163-16,16v192c0,8.837,7.163,16,16,16h192c8.837,0,16-7.163,16-16V304
                        C224,295.163,216.837,288,208,288z M192,480H32V320h160V480z"/>
                        <path d="M496,288H304c-8.837,0-16,7.163-16,16v192c0,8.837,7.163,16,16,16h192c8.837,0,16-7.163,16-16V304
                        C512,295.163,504.837,288,496,288z M480,480H320V320h160V480z"/>

                </svg>
                </div>
                <div class="line" @click="$emit('changeComponent')">
                    <svg class="line__svg" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         width="20px" height="20px" viewBox="0 0 455.276 455.276" style="enable-background:new 0 0 455.276 455.276;"
                         :class="{ active : activeComponent === 'PostLine' }"
                         xml:space="preserve">

                    <path d="M374.244,0H81.034c-9.532,0-17.292,7.757-17.292,17.286v177.84c0,9.529,7.76,17.286,17.292,17.286h293.21
                        c9.534,0,17.291-7.757,17.291-17.286V17.286C391.535,7.757,383.778,0,374.244,0z M374.726,195.132c0,0.262-0.211,0.476-0.481,0.476
                        H81.034c-0.269,0-0.482-0.219-0.482-0.476V17.286c0-0.263,0.213-0.476,0.482-0.476h293.21c0.271,0,0.481,0.219,0.481,0.476V195.132
                        z M374.244,242.858H81.034c-9.532,0-17.292,7.761-17.292,17.291v177.84c0,9.532,7.76,17.287,17.292,17.287h293.21
                        c9.534,0,17.291-7.755,17.291-17.287v-177.84C391.535,250.619,383.778,242.858,374.244,242.858z M374.726,437.989
                        c0,0.264-0.211,0.476-0.481,0.476H81.034c-0.269,0-0.482-0.212-0.482-0.476v-177.84c0-0.262,0.213-0.481,0.482-0.481h293.21
                        c0.271,0,0.481,0.22,0.481,0.481V437.989z"/>

                </svg>
                </div>
            </div>

        </div>

        <div class="filtering">

            <div class="rubric">
                <label for="rubric">Рубрика: </label>
                <select name="category" id="rubric" @change="$emit('changeRubricValue', $event.target.value)">
                    <option value="">Выберите рубрику</option>
                    <option>Электроника</option>
                    <option>Авто</option>
                </select>
            </div>

            <div class="sorting">
                <label for="sortingBy">Сортировка: </label>
                <select name="sortingBy" id="sortingBy" @change="$emit('changeSortingByValue', $event.target.value)">
<!--                    <option>Самые новые</option>-->
                    <option>Самые дешевые</option>
                    <option>Самые дорогие</option>
                </select>
            </div>

            <div class="price">
                <label>Цена: </label>
                <input type="text" @input="$emit('changeMinPrice', $event.target.value)" class="minPrice" placeholder="от">
                <input type="text" @input="$emit('changeMaxPrice', $event.target.value)" class="maxPrice" placeholder="до">
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "PostsActions",
        props: {
          'activeComponent': String
        }
    }
</script>

<style scoped lang="scss">
    .posts-actions{
        width: 100%;
        min-height: 20px;
        padding: 10px;
    }
    .filteringName{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        input{
            width: 40%;
        }
    }
    .filtering{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .grid__svg, .line__svg{
        width: 20px;
        height: 20px;
    }
    .show-type{
        display: inline-flex;
        align-items: center;
    }
    .grid, .line{
        max-height: 20px;
        &:hover{
            cursor: pointer;
         }
    }
    .line{
        margin-left: 5px;
    }
    .active{
        background-color: rgba(100, 149, 237, .5);
    }
</style>