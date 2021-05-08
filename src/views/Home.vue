<template>
  <main class="home">

    <PostsActions
      :active-component="currentComponent"

      @changeComponent="changeActiveComponent"
      @filtersChanged="getFilteredData"
      @clearFilters="clearFilters"
    />

    <div class="posts-container" :class="{ block : currentComponent === 'PostLine' }">

      <Loader v-if="loading" />

      <component
        v-else
        v-for="post in allPosts"
        :key="post.postId"
        :is="currentComponent"
        :title="post.title"
        :price="post.price"
        :description="post.description"
        :img="post.img[0]"
        :postId="post.postId"
        :created="post.created"
      ></component>

      <p class="empty" v-if="showEmpty"> К сожалению, поиск не дал результатов( </p>

    </div>

  </main>
</template>

<script>
import Loader from '../components/Loader';
import PostGrid from '@/components/PostGrid';
import PostLine from '../components/PostLine';
import PostsActions from '../components/PostsActions';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    PostGrid,
    Loader,
    PostsActions,
    PostLine,
  },
  data() {
    return {
      currentComponent: 'PostGrid',
      allPosts: [],
      loading: true,
      firstTime: true,
      showEmpty: false,
    };
  },
  async beforeMount() {
    this.allPosts = await this.$store.dispatch('getPosts');
    this.loading = false;

    // this.$store.dispatch('AWESOME_ACTION_WITH_PROMISE', '/assad');

  },
  computed: {
    ...mapGetters({
      storePosts: 'getPosts',
    }),

    filteredPosts(){
        return this.allPosts.filter(post => post.title)
    }
  },
  methods: {
    changeActiveComponent(componentType) {
      this.currentComponent = componentType;
    },
    async clearFilters(){
        this.loading = true;
        this.allPosts = await this.$store.dispatch('getPosts');
        this.loading = false;
    },
    async getFilteredData(data){
        this.loading = true;
        let newData = this.addProxy(Object.assign({}, data));
        const result = await this.$store.dispatch('getPostsSortedByFilters', newData)
        this.allPosts = result.data;
        this.loading = false;
    },
    addProxy(obj){
        return new Proxy(obj, {
            get(target, prop){
                if(target[prop] === '' ) return 'default';
                else return target[prop]
            }
        })
    }
  },
};
</script>

<style scoped lang="scss">
.posts-container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 15px;
  row-gap: 15px;

  &.block {
    display: block;
  }
}

.empty {
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 700;
}
</style>
