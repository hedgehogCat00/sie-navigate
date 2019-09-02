<template>
  <div id="app">
    <div class="header">
      <div class="left-panel">
        <div class="title">Navigation</div>
        <SearchBar
          v-on:search-focused="raiseSearchMask()"
          v-on:search-blured="unraiseSearchMask()"
          v-on:searching="search($event)"
        ></SearchBar>
      </div>
      <div class="operations-box right-panel">
        <div class="operation lang-switcher" @click="switchLang()">{{langSwitcherText}}</div>
      </div>
    </div>
    <div class="panels-container">
      <Tabs v-bind:tabs="mapObj.tabs" v-bind:lang="lang" v-on:tab-clicked="onTabClicked"></Tabs>
      <Navs v-bind:navs="mapObj.navs" v-bind:lang="lang" v-on:nav-clicked="onNavClicked"></Navs>
      <transition name="fade">
      <div v-if="onSearch" class="search-area">
        <Navs v-bind:navs="mapObj.navs" v-bind:lang="lang" v-on:nav-clicked="onNavClicked"></Navs>
      </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Tabs from './components/Tabs.vue'
import Navs from './components/Navs.vue'
import SearchBar from './components/SearchBar.vue'

const mapObj = {
    tabs: [],
    navs: []
}
// (itemId => nav item)
const navsMap = new Map()
export default {
    name: 'app',
    components: {
        Tabs,
        Navs,
        SearchBar
    },
    data () {
        return {
            mapObj: mapObj,
            lang: 'cn',
            langSwitcherText: 'CN',
            navsMap: navsMap,
            onSearch: false
        }
    },
    created () {
        console.log(this)
        const instance = this.$http.create({
            headers: { 'content-type': 'application/json' }
        })
        instance
            .get('api/urls')
            .then(res => {
                onGetUrlsList(res)
            })
            .catch(err => {
                onRequestError(err)
            })
    },
    methods: {
        onTabClicked (clickedTab) {
            console.log(`tab clicked:`, clickedTab)
            mapObj.tabs.forEach(tab => {
                tab.selected = clickedTab.category === tab.category
            })

            clickedTab.items.forEach((item, i) => {
                item._id = i
            })

            // change the pointer
            // shallow copy
            mapObj.tabs = Array.from(mapObj.tabs)
            mapObj.navs = clickedTab.items
        },
        onNavClicked (nav) {
            console.log('nav clicked: ', nav)
            recordClickBank.call(this, nav)
            // open new client tab
            window.open(nav.url)
        },
        switchLang () {
            const isCN = this.$data.lang === 'cn'
            if (isCN) {
                this.$data.lang = 'en'
                this.$data.langSwitcherText = 'EN'
            } else {
                this.$data.lang = 'cn'
                this.$data.langSwitcherText = 'CN'
            }
        },
        raiseSearchMask () {
            console.log('raise mask')
            this.$data.onSearch = true
        },
        unraiseSearchMask () {
            console.log('unraise mask')
            this.$data.onSearch = false
        },
        search (str) {
            console.log('search: ', str)
        }
    }
}

function recordClickBank (nav) {
    const currCategory = mapObj.tabs.find(tab => tab.selected).category
    this.$http.put(
        'api/clickBank',
        { itemId: nav.itemId, category: currCategory },
        { responseType: 'text' }
    )
}

function onGetUrlsList (response) {
    console.log(response)
    if (response.status === 200) {
        const data = response.data
        data.forEach((category, i) => {
            category['_id'] = i
            category.selected = i === 0
            mapObj.tabs.push(category)
            category.items.forEach(item => {
                navsMap.set(item.itemId, item)
            })
        })
        mapObj.navs = mapObj.tabs[0].items.map((nav, i) => {
            nav['_id'] = i
            return nav
        })
    } else {
        onRequestError(`status: ${response.status}`)
    }
}

function onRequestError (err) {
    console.error(err)
}
</script>

<style>
body {
  margin: 0;
}
#app {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.header {
  display: flex;
  justify-content: space-between;
  height: 3rem;
  background-color: rgb(57, 108, 117);
}
.header .left-panel {
  display: flex;
  flex-direction: row;
}
.header .title {
  font-size: 2rem;
  margin-left: 3rem;
  line-height: 3rem;
  font-weight: bold;
  color: #eaeaea;
}
.panels-container {
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
}
.panels-container > .sub-panel:first-child {
  margin-right: 1rem;
  width: 10rem;
  padding-top: 40px;
  background-color: rgb(43, 86, 102);
  align-self: stretch;
}
.operations-box {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
.operations-box .operation {
  border-radius: 4px;
  min-width: 5rem;
  padding: 10px 0;
  color: rgba(0, 0, 0, 0.1);
  font-weight: bold;
  cursor: pointer;
}
.search-area {
  position: absolute;
  display: flex;
  justify-items: flex-start;
  align-items: flex-start;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.fade-enter-active {
  transition: opacity .2s ease-out;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity .2s ease-out;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
/* .pebble-theme {
  background-color: rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-out;
}
.pebble-theme:hover {
  background-color: rgba(0, 0, 0, 0.15);
} */
</style>
