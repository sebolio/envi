<template>
  <div class="primos">
      <vs-input type="number" v-model="primero" label-placeholder="Primer número" class="inline-block mr" />
      <vs-input type="number" v-model="ultimo" label-placeholder="Último número"  class="inline-block mr2"/>
      
      <div class="numeros">
        <div v-for="n in primos" :key="n" class="numero">{{n}}</div>
      </div>
  </div>
</template>

<style>
  .mr { margin-right: 20px;}
  .mr2 { margin-right: 10px;}
  .primos {
    padding:20px;
    padding-top: 32px;
  }
  .primos .numeros {
    display:block;
    width:450px;
    margin: auto;
    margin-top: 50px;
  }
  .primos .numero {
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    background: rgb(252, 146, 47);
    padding: 10px 10px;
    color:white;
    font-weight: bold;
    display: inline-block;
    width:20px;
    height:20px;
  }
</style>

<script>
export default {
  name: 'Primos',
  data() {
    return {
      primero: 0,
      ultimo: 0,
      primos: []
    }
  },
  watch: {
    //escuchamos los cambios en el formulario de números
    primero() { this.primos = this.calcPrimos() },
    ultimo() { this.primos = this.calcPrimos() }
  },
  mounted() {
    //definimos números por defecto, ponerlos en mounted hace que se ejecuten los watch
    this.primero=1
    this.ultimo=100
  },
  methods: {
    //función rápida para comprobar si un número es primo
    esPrimo: n => { for(let i = 2; i < n; i++) if (n % i === 0) return false; return n>1 },
    //algoritmo simple que construye una lista de primos entre P y U
    calcPrimos() {
      const p=this.primero, u=this.ultimo;
      return [...Array(u-p+1).keys()].map((n, i) => this.esPrimo(p+i) && p+i).filter(n=>!!n)
    }
  }
}
</script>
