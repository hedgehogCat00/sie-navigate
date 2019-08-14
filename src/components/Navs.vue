<template>
  <div class="sub-panel navs-panel panel-pebble-theme">
    <div class="nav-block" v-for="nav in navs" :key="nav._id" @click="$emit('nav-clicked', nav)">
      <div class="title">
        <font-awesome-icon class="icon" :icon="linkIcon"></font-awesome-icon>
        <span class="icon-label">{{nav.cnName}}</span>
        </div>
      <div class="footer">
        <div class="popu-block">
          <font-awesome-icon class="icon" :icon="heartIcon"></font-awesome-icon>
        <span class="icon-label">{{nav.popularity}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faLink } from '@fortawesome/fontawesome-free-solid'

export default Vue.extend({
    props: {
        navs: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            heartIcon: faHeart,
            linkIcon: faLink
        }
    },
    components: {
        FontAwesomeIcon
    }
})
</script>

<style scoped>
.navs-panel {
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  /* padding: 1rem; */
  padding: 0 1rem;
}
.nav-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  border-radius: 4px;
  margin-right: 1rem;
  /* background-color: #205459; */
  background-color: rgba(0,0,0,.1);
  padding: 5px 10px;
  min-width: 15rem;
  min-height: 10rem;
  color: #eaeaea;
}
.nav-block .title {
  font-weight: bold;
  text-align: left;
}
.nav-block .footer {
  display: flex;
  font-size: .8rem;
  color: #8a8a8a;
}

.nav-block .icon {
  margin-right: 5px;
}

</style>
