<template>
  <div class="sub-panel navs-panel panel-pebble-theme">
    <a class="nav-block pebble-theme" v-for="nav in navs" :key="nav._id" v-bind:href="nav.url" @click="onBlockClick($event, nav)">
      <div class="title">
        <font-awesome-icon class="icon" :icon="linkIcon"></font-awesome-icon>
        <span class="icon-label">{{getLang(lang, nav, 'Name')}}</span>
      </div>
      <div class="body">
        <span>{{getLang(lang, nav, 'Description')}}</span>
      </div>
      <div class="footer">
        <div class="popu-block">
          <font-awesome-icon class="icon" :icon="popularityIcon"></font-awesome-icon>
          <span class="icon-label">{{nav.popularity}}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faLink } from '@fortawesome/fontawesome-free-solid'

export default Vue.extend({
    props: {
        navs: {
            type: Array,
            required: true
        },
        lang: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            popularityIcon: faEye,
            linkIcon: faLink
        }
    },
    components: {
        FontAwesomeIcon
    },
    methods: {
        onBlockClick ($event, nav) {
            $event.preventDefault()
            this.$emit('nav-clicked', nav)
        },
        getLang (lang, data, prop) {
            return this.$getText(lang, data, prop)
        }
    }
})
</script>

<style scoped>
.navs-panel {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  /* padding: 1rem; */
  padding: 0 1rem;
}
.nav-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 15px 20px;
  min-width: 15rem;
  min-height: 7rem;
  border-radius: 4px;
  /* background-color: #205459; */
  background-color: rgba(0, 0, 0, 0.1);
  color: #eaeaea;
  cursor: pointer;
  text-decoration: none;
  /* transition: background-color 0.2s ease-out; */
}
/* .nav-block:hover {
  background-color: rgba(0, 0, 0, 0.15);
} */
.nav-block .title {
  font-weight: bold;
  text-align: left;
}
.nav-block .title .icon {
  font-size: 2.5rem;
}
.nav-block .body {
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
}
.nav-block .footer {
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  /* color: #8a8a8a; */
  color: rgba(0, 0, 0, 0.3);
  font-weight: bold;
}

.nav-block .icon {
  margin-right: 5px;
}
</style>
