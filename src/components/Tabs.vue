<template>
  <div class="sub-panel tabs-panel panel-pebble-theme">
    <div
      class="tab pebble-theme"
      v-for="tab in tabs"
      v-bind:class="{selected: tab.selected}"
      :key="tab._id"
      @click="onTabClick($event, tab)"
    >
      <font-awesome-icon class="icon" :icon="tagIcon"></font-awesome-icon>
      <span class="title">{{tab.category}}</span>
      <!-- <span>{{tab.selected ? 'true' : 'false'}}</span> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTag } from '@fortawesome/fontawesome-free-solid'

export default Vue.extend({
    props: {
        tabs: {
            type: Array,
            required: true
        },
        lang: {
            type: String,
            required: true
        }
    },
    components: { FontAwesomeIcon },
    data () {
        return {
            tagIcon: faTag
        }
    },
    methods: {
        onTabClick ($event, tab) {
            this.$emit('tab-clicked', tab)
        },
        getLang (lang, data, prop) {
            return this.$getText(lang, data, prop)
        }
    }
})
</script>

<style scoped>
.tabs-panel {
  display: flex;
  flex-direction: column;
  /* padding: 10px 5px; */
}
.tab {
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 5px 10px;
  /* background-color: #999d9d38; */
  /* background-color: rgba(0, 0, 0, 0.1); */
  color: #eaeaea;
  margin-bottom: 1rem;
  min-height: 4rem;
  transition: background-color 0.2s ease-out, transform 0.25s cubic-bezier(0.5, 2, 0.65, 1);
  cursor: pointer;
}
/* .tab:hover {
  background-color: rgba(0, 0, 0, 0.15);
} */
.tab.selected {
  /* background-color: #b2cac447; */
  background-color: rgba(0, 0, 0, 0.3);
  transform: scale(1.03);
}
.tab .title {
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.tab .icon {
  margin-right: 10px;
  margin-left: 5px;
  transition: opacity 0.2s ease-out;
  opacity: 0.2;
  color: black;
  font-size: 1.5rem;
}
.tab.selected .icon {
  opacity: 0.4;
}
</style>
