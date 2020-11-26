<template>
  <div class="character">
      <div class="thumb">
      <img :src="data.thumbnail.path+'.'+data.thumbnail.extension" class="thumbnail">
    </div>

    <div class="data">
      <h3>{{data.name}}</h3>
      <span class="modified">Modificado el {{parseDate(data.modified)}}</span><br><br>
      <span v-html="parseDescription(data.description)"></span>
    </div>

  </div>
</template>

<style>
  .character { 
    display: block;
    background: #ffc289;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    font-size: 12px;
    min-width: 200px;
  }
  .character h3 {
    margin-bottom: 0;
  }
  .character .modified {
    font-size: 10px;
    color:gray;
    margin:0;
    padding: 0;
  }
  .character .thumb {
    width: 30%;
    height: 190px;
    display: inline-grid;
    /* width: 169px; */
    padding:0;
    margin:0;
  }
  .character .thumb img {
  /* width:50%
  display: */
  }

  .character .data {
    width: 70%;
    padding: 20px;
    display: inline-grid;
    vertical-align: top;
  }
  @media(min-width: 920px) {
    .character {
      /* background: red !important; */
      width: 200px;
      display: inline-grid;
    }
    .character .thumb {
      width: 100% !important;
    }
    .character .thumb img {
      width: 200px;
    }
    .character .data {
      width: 90%;
      padding: 0;
      margin: auto;
      padding-bottom: 10px;
    }

  }
  .character .thumb img {
    /* width:100%; */
    height: inherit;
    padding:0;
    margin:0;
    border-radius: 20px;
  }
 
</style>

<script>
import moment from 'moment';

export default {
  props: ['data'],
  methods: {
    parseDescription(description) {
      return description?description : 'Sin descripción';
    },
    parseDate(date) {
      return moment(date).locale('es').format('LL');
    },
  }
}
</script>