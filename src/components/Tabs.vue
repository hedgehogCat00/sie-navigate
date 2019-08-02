<template>
    <div class="tabs-panel">
        <div v-for="tab in tabs" :key="tab.id" @click="$emit('tab-clicked', tab)">
            <span>{{tab.text}}</span>
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
