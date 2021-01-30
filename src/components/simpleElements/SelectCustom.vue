<template>
    <div class="custom-select">
      <p
        @click="changeListDisplaying"
         class="custom-select__title"
      >
        {{value}}
      </p>
      <ul
        v-show="showList"
        class="custom-select__list"
      >
        <li
          v-for="item in selectList"
          :key="item"
          class="custom-select__item"
          @click="changeSelectedValue($event.target.textContent)"
        >
          {{item}}
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "SelectCustom",
        props: {
          value: {
            type: String,
          },
          selectList: {
              type: Array,
              default: function () {
                  return ['Пусто']
              }
              // required: true
          }
        },
        data(){
            return{
                showList: false
            }
        },
        methods: {
            changeListDisplaying(){
                this.showList = !this.showList;
            },
            changeSelectedValue(newValue){
                this.$emit('input', newValue);
                this.changeListDisplaying();
            }
        }
    }
</script>

<style lang="scss" scoped>
  .custom-select{
    position: relative;
    max-width: 200px;
    margin: 0 auto;
    border: 1px solid;
    border-radius: 4px;
    background-color: #fff;
    color: #000;
    &__title:hover{
      cursor: pointer;
    }
    &__list{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0;
      margin: 0;
      transform: translateY(100%);
      border: 1px solid;
      border-top: none;
      border-radius: 0 0 4px 4px;
    }
    &__item{
      list-style-type: none;
      transition: background-color .5s ease-in-out;
      &:hover{
        cursor: pointer;
        background-color: rgba(0, 55, 75, .5);
      }
    }
  }

</style>
