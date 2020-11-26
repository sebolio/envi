<template>
  <div class="marvel">

    
      <div class="container">
        <vs-input v-model="searchName" @keydown.enter="search" label-placeholder="Buscar por nombre exacto" class="section inline-block" />
        <vs-button class="inline-block" @click="search">Buscar</vs-button>
        <vs-button gradient warn class="inline-block" @click="clearSearch" v-if="usingSearch">Regresar</vs-button>

        <div class="error" v-if="noResults">
          Sin resultados.<br><br>Recuerda que la API de Marvel sólo retorna nombres exactos.
        </div>

        <div class="characters section" v-if="!noResults">          
          <div v-for="character in characters" :key="character.id">
            <vs-card type="3">
              <template #title>
                <h3>{{character.name}}</h3><br>
              </template>
              <template #img>
                <img :src="character.thumbnail.path+'.'+character.thumbnail.extension" class="thumbnail">
              </template>
              <template #text class="center">
                Modificado el {{parseDate(character.modified)}}<br><br>
                <span v-html="parseDescription(character.description)"></span>
              </template>
            </vs-card>
          </div>
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
}
.marvel .section {
  flex: 0 0 100%;
  align-items: center;
}
.marvel input { 
  border:1px solid #4989ff !important;
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
  width: 600px !important;
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
   width: 700px !important;
  max-width: fit-content !important;
}
.inline-block { display: inline-block; }
/* loader */
.marvel .loader {
  display: inline-block;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
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
import md5 from 'md5'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Marvel',
  data() {
    return {
      searchName: '',
      characters: [],
      noResults: false,
      publicKey: 'd239576c1b149f308d68f4e10c759f8f',
      privateKey: '16e2c4e2a6eb25cecc37a72966bbbe9c5123d842',
      usingSearch: false, //comportamiento especial al usar buscador
      cursor: 0, //siguiente número de personaje a descargar
      limit: 5, //cantidad a descargar a la vez
      pulling:false, //evitar que se descarguen más si ya se están descargando
      scrollTrigger: 50 //pixeles antes del final de página para cargar más héroes
    }
  },
  mounted() {
    this.getCharacters();
    window.onscroll = () => {
      console.log((window.innerHeight + window.scrollY), document.body.offsetHeight);
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
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
      this.usingSearch = false;
      this.cursor = 0;
      this.characters = [];
      this.getCharacters();
    },
    parseDescription(description) {
      return description?`<b>Descripción:</b> ${description}` : 'Sin descripción';
    },
    parseDate(date) {
      return moment(date).locale('es').format('LL');
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
  },
  components: {
    
  }
}
</script>
