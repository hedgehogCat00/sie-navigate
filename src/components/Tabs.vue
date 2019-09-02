<template>
  <div class="sub-panel tabs-panel">
    <div
      class="tab pebble-theme"
      v-for="tab in tabs"
      v-bind:class="{selected: tab.selected}"
      :key="tab._id"
      @click="onTabClick($event, tab)"
    >
      <font-awesome-icon class="icon" :icon="tagIcon"></font-awesome-icon>
      <span class="title">{{tab.category}}</span>
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
}
.tab {
  display: flex;
  align-items: center;
  padding: 0 10px 0 25px;
  color: #eaeaea;
  min-height: 4rem;
  transition: background-color 0.2s ease-out,
    transform 0.25s cubic-bezier(0.5, 2, 0.65, 1);
  cursor: pointer;
  background-color: rgb(143, 178, 191);
}
.tab.selected {
  background-color: rgb(175, 201, 212);
}
.tab:not(.selected):hover {
  background-color: rgb(135, 170, 183);
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
  transition: opacity 0.2s ease-out, transform .2s ease-out;
  color: rgba(0, 0, 0, .2);
  font-size: 1.5rem;
}
.tab.selected .icon {
  transform: scale(1.2);
  color: rgb(37, 186, 186);
}
</style>
