<template>
  <div class="sub-panel navs-panel">
      <a
        class="nav-block"
        v-for="nav in navs"
        :key="nav._id"
        v-bind:href="nav.url"
        @click="onBlockClick($event, nav)"
      >
        <div class="title">
          <img
            class="icon"
            v-bind:src="getImgUrl(nav.itemId)"
            @error="provideDefaultImgUrl($event)"
            alt="icon"
          />
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
        },
        getImgUrl (id) {
            return this.$imgUrlDeco(`img/${id.toLowerCase()}-icon.png`)
        },
        provideDefaultImgUrl (evt) {
            evt.target.src = this.$imgUrlDeco('img/siemens-icon.png')
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
  padding: 2rem;
}
.nav-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 15rem;
  height: 5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 15px 20px;
  border-radius: 4px;
  background-color: white;
  color: #6a6a6a;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 0 40px -10px rgb(210, 210, 210);
  transition: background-color 0.15s ease-out, box-shadow 0.2s ease-out;
}
.nav-block:hover {
  background-color: #f9f9f9;
  box-shadow: 0 0 20px -5px rgb(180, 180, 180);
}
.nav-block .title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
  font-size: 1.5rem;
}
.nav-block .title .icon {
  height: 2.5rem;
  border-radius: 10px;
}
.nav-block .body {
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  color: #adadad;
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

.bump-enter-active {
  transition: transform 0.3s cubic-bezier(0.5, 1.5, 0.5, 1),
    opacity 0.2s ease-out;
}
.bump-enter {
  transform: scale(0.9);
  opacity: 0;
}
.bump-enter-to {
  transform: scale(1);
  opacity: 1;
}
.bump-leave-active {
  transition: transform 0.3s cubic-bezier(0.5, 1.5, 0.5, 1),
    opacity 0.2s ease-out;
}
.bump-leave {
  transform: scale(1);
  opacity: 1;
}
.bump-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
