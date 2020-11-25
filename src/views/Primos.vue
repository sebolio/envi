<template>
  <div>
    
    <vs-input type="number" v-model="primero" label-placeholder="Primer número"/>
    <vs-input type="number" v-model="ultimo" label-placeholder="Último número"/>
    <ul>
      <li v-for="n in primos" :key="n">{{n}}</li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Primos',
  data() {
    return {
      primero: 0,
      ultimo: 0
    }
  },
  watch: {
    primero() { this.primos = this.calcPrimos() },
    ultimo() { this.primos = this.calcPrimos() }
  },
  mounted() {
  this.primero=1
  this.ultimo=100
  },
  methods: {
    esPrimo: n => { for(let i = 2; i < n; i++) if (n % i === 0) return false; return n>1 },
    calcPrimos() {
      const p=this.primero, u=this.ultimo;
      return [...Array(u-p+1).keys()].map((n, i) => this.esPrimo(p+i) && p+i).filter(n=>!!n)
    }
  }
}
</script>
