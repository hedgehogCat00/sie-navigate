<template>
    <div id="app">
        <input type="text" />
        <div class="panels-container">
            <Tabs v-bind:tabs="mapObj.tabs" v-on:tab-clicked="onTabClicked"></Tabs>
            <Navs v-bind:navs="mapObj.navs" v-on:nav-clicked="onNavClicked"></Navs>
        </div>
    </div>
</template>

<script lang="ts">
import Tabs from './components/Tabs.vue'
import Navs from './components/Navs.vue'

const mapObj = {
    tabs: [],
    navs: []
}
const map = new Map()
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
        const data = [
            ['category1', [{
                text: 'item1',
                link: 'link'
            }, {
                text: 'item2',
                link: 'link'
            }, {
                text: 'item3',
                link: 'link'
            }]],
            ['category2', [{
                text: 'item2-1',
                link: 'link'
            }, {
                text: 'item2-2',
                link: 'link'
            }, {
                text: 'item2-3',
                link: 'link'
            }]]
        ]
        data.forEach((item) => {
            map.set(item[0], item[1])
        })
        mapObj.tabs = [...map.keys()].map((text, i) => {
            return {
                id: i,
                text: text,
                selected: i === 0
            }
        })
        mapObj.navs = [...map.values()][0].map((nav, i) => {
            return {
                text: nav.text,
                link: nav.link,
                id: i
            }
        })
    },
    methods: {
        onTabClicked (tab) {
            console.log(`tab clicked:`, tab)
            mapObj.tabs.forEach((tmpTab) => {
                tmpTab.selected = (tab.text === tmpTab.text)
            })
            mapObj.navs = map.get(tab.text).map((nav, i) => {
                return {
                    text: nav.text,
                    link: nav.link,
                    id: i
                }
            })
        },
        onNavClicked (nav) {
            console.log('nav clicked: ', nav)
        }
    }
}
</script>

<style>
body {
    margin: 0;
}
#app {
    position: fixed;
    width: 100%;
    height: 100%;
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
.panels-container .sub-panel:not(:last-child) {
    margin-right: 1rem;
}

.panel-pebble-theme {
    background-color: rgba(0, 0, 0, .1);
    border-radius: 4px;
}
</style>
