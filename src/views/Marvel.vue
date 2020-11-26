<template>
  <div class="marvel">

    
      <div class="container">
        <vs-input v-model="searchName" @keydown.enter="search" placeholder="Buscar por nombre exacto" class="section inline-block" />
        <vs-button class="inline-block" @click="search">Buscar</vs-button>
        <vs-button gradient warn class="inline-block" @click="clearSearch" v-if="usingSearch">Regresar</vs-button>

        <div class="error" v-if="noResults">
          Sin resultados.<br><br>Recuerda que la API de Marvel sólo retorna nombres exactos.
        </div>

          <div class="characters section" v-if="!noResults">
              <Character :data="character" v-for="character in characters" :key="character.id"/>
          </div>

        <div class="loader-container section" v-if="!usingSearch">
          <div class="loader"></div>
        </div>

      </div>
  </div>
</template>

<style>
.marvel {
  justify-content: center;
  display: flex;
  margin-left: 50px;
}
.marvel .section {
  flex: 0 0 100%;
  align-items: center;
}
.marvel .error {
  background: white;
  border-radius: 20px;
  padding:50px;
  margin-top: 20px;
}
.marvel .characters {
  margin-top: 25px;
}
.marvel .vs-card { 
  margin:auto !important; 
  margin-bottom: 50px !important;
}
.marvel .vs-card__text { 
  /* width: 600px !important; */
  text-align: center;
}
.marvel .vs-card__img { 
  width: 300px !important;
  max-width: 500px !important;
  align-self: center;
}
.marvel .vs-card__img img { 
  /* margin-left: -185px;  */
  width: 600px !important;
  max-width: 600px !important;
  height:250px;
}
.marvel .vs-card {
    width: 100% !important;
    max-width: 100% !important;
  /* width: 700px !important; */
  /* max-width: fit-content !important; */
}
/* loader */
.marvel .loader {
  display: inline-block;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid rgb(252, 146, 47);
  width: 50px;
  height: 50px;
  animation: spin .8s linear infinite;
}
/* animación loader */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<script>
import md5 from 'md5';
import axios from 'axios';
import Character from '../components/Character';

export default {
  name: 'Marvel',
  components: {Character},
  data() {
    return {
      searchName: '',
      characters: [],
      noResults: false,
      publicKey: 'd239576c1b149f308d68f4e10c759f8f',
      privateKey: '16e2c4e2a6eb25cecc37a72966bbbe9c5123d842',
      usingSearch: false, //comportamiento especial al usar buscador
      cursor: 0, //siguiente número de personaje a descargar
      limit: 8, //cantidad a descargar a la vez
      pulling:false, //evitar que se descarguen más si ya se están descargando
      scrollTrigger: 50 //pixeles antes del final de página para cargar más héroes
    }
  },
  mounted() {
    this.getCharacters();
    window.onscroll = () => {
      console.log((window.innerHeight + window.scrollY), document.body.scrollHeight);
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 300) {
        console.log('googo', );
        this.getCharacters();
      }
    }
  },
  methods: {
    async search() {
      this.usingSearch = true;
      const characters = await axios.get(`http://gateway.marvel.com/v1/public/characters${this.getAuthString()}&name=${this.searchName}`);
      this.characters = [characters.data.data.results[0]];
      console.log('salio?', );
      this.noResults = !this.characters[0] || !this.characters[0].name;
      console.log('nores?', this.noResults);
    },
    clearSearch() {
      this.searchName = '';
      this.usingSearch = false;
      this.cursor = 0;
      this.characters = [];
      this.noResults = false;
      this.getCharacters();
    },
    getAuthString() {
      const ts = new Date().getTime();
      const apikey=this.publicKey;
      const hash=md5(ts+this.privateKey+this.publicKey);
      return `?apikey=${apikey}&ts=${ts}&hash=${hash}`;
    },
    async getCharacters() {
      if (this.pulling || this.usingSearch) return;
      this.pulling = true;
      const characters = await axios.get(`http://gateway.marvel.com/v1/public/characters${this.getAuthString()}&limit=${this.limit}&offset=${this.cursor}`);
      this.pulling = false;
      this.characters = [...this.characters, ...characters.data.data.results];
      console.log('characters', characters.data.data.results);
      this.cursor += this.limit;
    }
  }
}
</script>
