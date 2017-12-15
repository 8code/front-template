<style lang="scss">
  .heading {
    margin: 0 0 30px;
  }
  .hello {
    font-size: 14px;
  }
  section {
    margin: 0 0 20px;
  }

  .anime-enter {
      animation: anime-in 1s ease-in;
  }
  .anime-leave {
      animation: anime-out 1s ease-out;
  }
  @keyframes anime-in {
      0% {
          transform: scale(0);
      }
      100% {
          transform: scale(1);
      }
  }
  @keyframes anime-out {
      0% {
          transform: scale(1);
      }
      100% {
          transform: scale(0);
      }
  }
  button {
    font-size: 14px;
    font-weight: bold;
    background: #333;
    color: #fff;
    display: inline-block;
    padding: 2px 6px;
    border-radius: 3px;
  }
</style>

<template>
  <div class="hello">
    <h1 class="heading">{{msg}}</h1>

    <section>
      <p>model ディレクティブ</p>
      <input v-model="hoge">
      <child :my-message="hoge"></child>
      <p>{{hoge}}</p>
    </section>

    <section>
      <p>配列のイテレート</p>
      <ul>
        <li v-for="val in arr">{{ val }}</li>
      </ul>
    </section>

    <section>
      <p>オブジェクトのイテレート</p>
      <ul>
        <li v-for="(val, key) in obj">(Key: {{ key }}) {{ val }}</li>
      </ul>
    </section>

    <section>
      <ul>
        <li v-for="(val, idx) in associativeArr" v-bind:key="val.name">
          No:{{ idx }} {{ val.name }} {{ val.age}}歳
        </li>
      </ul>
    </section>

    <section>
      <p>COUNT {{ count }}</p>
      <button @click="increment">increment</button>
    </section>

    <section>
      <div transition="anime" stagger="100">hello</div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data: () => {
      return {
        count: 0,
        msg: 'Hello Vuejs! - 色々試す用',
        arr: ['リスト1', 'リスト2', 'リスト3'],
        obj: {
          a: '項目1',
          b: '項目2',
          c: '項目3'
        },
        associativeArr: [{
          'name': 'foo',
          'age': '20'
        }, {
          'name': 'bar',
          'age': '30'
        }, {
          'name': 'baz',
          'age': '40'
        }]
      }
    },
    methods: {
      increment: function() { this.count++ }
    }
  }
</script>
