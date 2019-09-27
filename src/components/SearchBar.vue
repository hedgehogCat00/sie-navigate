<template>
  <div class="search-bar">
    <input
      class="search-ipt"
      type="text"
      placeholder="Search..."
      @focus="onFocus($event)"
      @blur="onBlur($event)"
      @keyup="onSearch($event)"
    />
    <!-- <span class="search-icon"></span> -->
    <font-awesome-icon class="search-icon" :icon="searchIcon"></font-awesome-icon>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import Vue from 'vue'
export default Vue.extend({
    components: { FontAwesomeIcon },
    data () {
        return {
            searchIcon: faSearch
        }
    },
    methods: {
        onFocus ($event) {
            $event.stopPropagation()
            this.$emit('search-focused')
        },
        onSearch ($event) {
            this.$emit('searching', $event.target.value)
        },
        onBlur ($event) {
            this.$emit('search-blured')
        }
    }
})
</script>

<style scoped>
.search-bar {
  height: 2rem;
  display: flex;
  align-items: center;
  margin: 8px 0 8px 40px;
  padding: 0 10px;
  margin-left: 40px;
  border-radius: 4px;
  background-color: white;
  color: #6a6a6a;
}
.search-ipt {
  border: 0;
  background-color: transparent;
  color: inherit;
}
</style>
