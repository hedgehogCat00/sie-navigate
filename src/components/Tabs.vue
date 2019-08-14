<template>
    <div class="sub-panel tabs-panel panel-pebble-theme">
        <div class="tab" v-for="tab in tabs" v-bind:class="{selected: tab.selected}" :key="tab._id" @click="$emit('tab-clicked', tab)">
            <span class="title">{{tab.category}}</span>
            <!-- <span>{{tab.selected ? 'true' : 'false'}}</span> -->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        tabs: {
            type: Array,
            required: true
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
    border-radius: 4px;
    padding: 5px 10px;
    /* background-color: #999d9d38; */
    background-color: rgba(0,0,0,.1);
    color: #eaeaea;
    margin-bottom: .5rem;
    min-height: 3rem;
    transition: background-color .2s ease-out, transform .2s ease-out;
}

.tab.selected {
    /* background-color: #b2cac447; */
    background-color: rgba(0,0,0,.3);
    transform: scale(1.1);
}
</style>
