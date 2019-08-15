<template>
    <div class="sub-panel tabs-panel panel-pebble-theme">
        <div class="tab" v-for="tab in tabs" v-bind:class="{selected: tab.selected}" :key="tab._id" @click="$emit('tab-clicked', tab)">
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
    background-color: rgba(0,0,0,.1);
    color: #eaeaea;
    margin-bottom: 1rem;
    min-height: 4rem;
    transition: background-color .2s ease-out, transform .2s ease-out;
}

.tab.selected {
    /* background-color: #b2cac447; */
    background-color: rgba(0,0,0,.3);
    transform: scale(1.03);
}

.tab .title {
    font-weight: bold;
}

.tab .icon {
    margin-right: 10px;
margin-left: 1rem;
    transition: opacity .2s ease-out;
opacity: .4;
}
.tab.selected .icon {
    opacity: 1;
}
</style>
