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
};
const map = new Map();
export default {
    name: 'app',
    components: {
        Tabs,
        Navs
    },
    data() {
        return {
            tabs: mapObj.tabs,
            navs: mapObj.navs
        }
    },
    created() {
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
        ];
        data.forEach((item) => {
            map.set(item[0], item[1]);
        });
        mapObj.tabs = map.keys().map((text, i) => {
            return {
                id: i,
                text: text,
                selected: i === 0
            };
        });
        mapObj.navs = map.values()[0].map((nav, i) => {
            return {
                text: nav.text,
                link: nav.link,
                id: i
            };
        });
    },
    methods: {
        onTabClicked(tab) {
            console.log(`tab clicked:`, tab);
            mapObj.tabs.forEach((tmpTab) => {
                tab.selected = (tab.text === tmpTab.text);
            });
            mapObj.navs = map.get(tab.text).map((nav, i) => {
                return {
                    text: nav.text,
                    link: nav.link,
                    id: i
                };
            });
        },
        onNavClicked(nav) {
            console.log('nav clicked: ', nav);
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
