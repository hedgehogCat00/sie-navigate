<template>
  <div id="app">
    <!-- <input type="text" /> -->
    <div class="header">
        <div class="title">Nav</div>
        <div class="operations-box"></div>
    </div>
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
        const instance = this.$http.create({ headers: { 'content-type': 'text/plain' } })
        instance.get('urls').then((res) => {
            onGetUrlsList(res)
        }).catch((err) => {
            onRequestError(err)
        })
    },
    methods: {
        onTabClicked (clickedTab) {
            console.log(`tab clicked:`, clickedTab)
            mapObj.tabs.forEach(tab => {
                tab.selected = (clickedTab.category === tab.category)
            })

            clickedTab.items.forEach((item, i) => {
                item._id = i
            })

            // change the pointer
            mapObj.tabs = Array.from(mapObj.tabs)
            mapObj.navs = clickedTab.items
        },
        onNavClicked (nav) {
            console.log('nav clicked: ', nav)
            recordClickBank.call(this, nav)
            // open new client tab
            window.open(nav.url)
        }
    }
}

function recordClickBank (nav) {
    const currCategory = mapObj.tabs.find((tab) => tab.selected).category
    this.$http.put('clickBank', { itemid: nav.itemid, category: currCategory }, { emulateJSON: true })
}

function onGetUrlsList (response) {
    console.log(response)
    if (response.status === 200) {
        const data = response.data.data
        mapObj.tabs = data.map((category, i) => {
            category['_id'] = i
            category.selected = (i === 0)
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
  /* padding: 10px 20px; */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(to right,#00737d,#239196);
  /* margin-top: 60px; */
}

.header {
    display: flex;
    height: 4rem;
    background-color: rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
}

.header .title {
    font-size: 4rem;
    margin-left: 1rem;
    line-height: 4rem;
    font-weight: bold;
    color: #eaeaea;
}

.panels-container {
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  align-items: stretch;
}

/* .panels-container .sub-panel {
    box-shadow: 0 1px 2px 0 #003c46;
} */

.panels-container .sub-panel:not(:last-child) {
  margin-right: 1rem;
  width: 10rem;
}

/* .panel-pebble-theme {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
} */
</style>
