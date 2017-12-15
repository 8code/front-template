<style lang="scss">
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }

  .l-main {
    margin: 0 0 30px;
    width: 1200px;
    margin: auto;
  }
  .l-container {
  }
</style>

<template>
  <div id="app" class="l-container">

    <part-header />

    <main class="l-main">
      <part-gnav />

      <router-view :key="$route.path"></router-view>
    </main>

    <part-footer />

  </div>
</template>

<script>
  import partHeader from './views/partial/header.vue'
  import partFooter from './views/partial/footer.vue'
  import partGnav from './views/partial/nav.vue'

  export default {
    components: {
      partHeader,
      partFooter,
      partGnav
    }
  }
</script>