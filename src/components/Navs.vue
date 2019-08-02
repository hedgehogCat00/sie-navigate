<template>
    <div class="navs-panel">
        <div class="nav-block" v-for="nav in navs" :key="nav.id" @click="$emit('nav-clicked', nav)">{{nav.text}}</div>
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
