<template>
    <div>
    <button v-on:click="decrement">-</button>
    {{ count }}
    <button v-on:click="increment">+</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    id: Number,
  }
})

export default class Pokemon extends Vue {
  // Class properties will be component data
  count: number = 0;
  id!: number

  // Methods will be component methods
  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }

  mounted() {
    console.log(this.id)
  }
}


</script>