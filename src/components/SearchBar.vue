<template>
  <div class="search-bar">
    <input
      class="search-ipt"
      type="text"
      placeholder="Search..."
      @focus="onFocus($event)"
      @blur="onBlur($event)"
      @input="onSearch($event)"
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
            $event.preventDefault()
            this.$emit('search-focused')
        },
        onSearch ($event) {
            $event.preventDefault()
            this.$emit('searching', $event.target.value)
        },
        onBlur ($event) {
            $event.preventDefault()
            this.$emit('search-blured')
        }
    }
})
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  margin: 8px 0 8px 40px;
  padding: 0 10px;
  margin-left: 40px;
  border-radius: 4px;
  background-color: rgb(43, 86, 102);
  color: #eaeaea;
}
.search-ipt {
  border: 0;
  background-color: transparent;
  color: inherit;
}
</style>
