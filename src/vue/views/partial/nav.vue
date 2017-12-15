<style lang="scss">
  .gnav {
    margin: 0 0 30px;
    padding: 30px 20px;

    ul > li {
      display: inline-block;
      font-weight: bold;
      &:nth-child(1n+2) {
        margin-left: 20px;
      }
    }
  }
</style>

<template>
  <nav class="gnav">
    <ul>
      <li><router-link to="/" ecact>HOME</router-link></li>
    </ul>
  </nav>
</template>

<script>
  export default {}
</script>