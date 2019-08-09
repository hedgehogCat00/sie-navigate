<template>
    <div class="sub-panel tabs-panel panel-pebble-theme">
        <div class="tab" v-for="tab in tabs" :key="tab._id" @click="$emit('tab-clicked', tab)">
            <span>{{tab.category}}</span>
            <span>{{tab.selected}}</span>
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
    padding: 10px 5px;
}

.tab {
    border-radius: 4px;
    padding: 5px 10px;
    background-color: #eaeaea;
    margin-bottom: .5rem;
    min-height: 3rem;
}
</style>
