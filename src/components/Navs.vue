<template>
    <div class="sub-panel navs-panel panel-pebble-theme">
        <div class="nav-block" v-for="nav in navs" :key="nav._id" @click="$emit('nav-clicked', nav)">{{nav.cnName}}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        navs: {
            type: Array,
            required: true
        }
    }
})
</script>

<style scoped>
.navs-panel {
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
    padding: 1rem;
}
.nav-block {
    border-radius: 4px;
    margin-right: 1rem;
    background-color: #eaeaea;
    padding: 5px 10px;
    min-width: 10rem;
    min-height: 5rem;
}
</style>
