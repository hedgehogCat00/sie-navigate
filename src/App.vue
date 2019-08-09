<template>
  <div id="app">
    <!-- <input type="text" /> -->
    <div class="panels-container">
      <Tabs v-bind:tabs="mapObj.tabs" v-on:tab-clicked="onTabClicked"></Tabs>
      <Navs v-bind:navs="mapObj.navs" v-on:nav-clicked="onNavClicked"></Navs>
    </div>
  </div>
</template>

<script lang="ts">
import Tabs from './components/Tabs.vue'
import Navs from './components/Navs.vue'

// interface Nav {
//     id: string;
//     url: string;
//     cnName: string;
//     enName: string;
//     popularity: number;
//     _id?: number;
//     selected?: boolean;
// }

// interface Category {
//     id: string;
//     category: string;
//     items: Nav[];
//     popularity: number;
//     createTime: number;
//     updateTime: number;
//     _id?: number;
//     selected?: boolean;
// }

const apiPrefix = 'localhost:3000'
const mapObj = {
    tabs: [],
    navs: []
}
// const map = new Map()
export default {
    name: 'app',
    components: {
        Tabs,
        Navs
    },
    data () {
        return {
            mapObj: mapObj
        }
    },
    created () {
        console.log(this)
        this.$http.get(`${apiPrefix}/urls`).then(onGetUrlsList, onRequestError)
    },
    methods: {
        onTabClicked (tab) {
            console.log(`tab clicked:`, tab)
            mapObj.tabs.forEach(tmpTab => {
                tmpTab.selected = (tab.category === tmpTab.category)
            })
            // mapObj.navs = map.get(tab.text).map((nav, i) => {
            //     return {
            //         text: nav.text,
            //         link: nav.link,
            //         id: i
            //     }
            // })

            tab.items.forEach((item, i) => {
                item._id = i
            })
            mapObj.navs = tab.items
        },
        onNavClicked (nav) {
            console.log('nav clicked: ', nav)
            postClickBank.call(this, nav)
            // open new client tab
            window.open(nav.url)
        }
    }
}

function postClickBank (nav) {
    const currCategory = mapObj.tabs.find((tab) => tab.selected).category
    this.$http.post(`${apiPrefix}/clickBank`, { id: nav.id, category: currCategory }, { emulateJSON: true })
}

function onGetUrlsList (response) {
    console.log(response)
    if (response.status === 200) {
        const data = response.data
        mapObj.tabs = data.map((category, i) => {
            category['_id'] = i
            return category
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
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #4bb2c2;
  /* margin-top: 60px; */
}

.panels-container {
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}

.panels-container .sub-panel {
    box-shadow: 0 1px 5px 0 #3f95a2;
}

.panels-container .sub-panel:not(:last-child) {
  margin-right: 1rem;
  width: 10rem;
}

.panel-pebble-theme {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
