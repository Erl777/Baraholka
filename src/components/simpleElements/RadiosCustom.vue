<template>
  <ul>
    <li v-for="(item, index)  in value" :key="item.title">
      <input
        v-on="listeners"
        @click="checkNewItem(index)"
        :id="item.title"
        type="radio"
        :name="item.name"
        :value="item.value"
        :checked="item.checked"
      >
      <label :for="item.title">{{item.title}}</label>
    </li>

  </ul>
</template>

<script>
    export default {
        name: "RadiosCustom",
        props: {
          value: {
              type: Array,
              required: true
          }
        },
        methods: {
            clearCheckedItem(){
                this.value.forEach((obj) => {
                    if (obj.checked) obj.checked = false;
                })
            },
            checkNewItem(index){
                this.clearCheckedItem();
                this.value[index].checked = true;
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    input: event => {
                      this.$emit('input', this.value)
                    },
                };
            },
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/customElementsStyles";
  ul{
    margin: 0;
    padding: 0;
  }
  li{
    list-style-type: none;
  }
</style>
