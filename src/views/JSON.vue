<template>
  <div>
    <p>Desde aquí puedes ingresar valores y contenido para generar un JSON masticado especialmente para ti.</p>
    <div class="editor-container">
      <h3>Valores</h3>
      <prism-editor class="editor" v-model="valores" :highlight="highlighter" line-numbers></prism-editor>
    </div>

    <div class="editor-container">
      <h3>Contenido</h3>
      <prism-editor class="editor separated" v-model="contenido" :highlight="highlighter" line-numbers></prism-editor>
    </div>

    <div class="editor-container">
      <h3>Resultado</h3>
      <prism-editor class="editor" v-model="resultado" :highlight="highlighter" line-numbers></prism-editor>
    </div>

  </div>
</template>

<script>
// Inicializar PrismEditor, copiando textualmente el ejemplo de la documentación
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

export default {
  name: "JSON",
  components: { PrismEditor },
  data() {
    return {
      valores: '',
      contenido: '',
      resultado: '',
    };
  },
  mounted() {
    //definimos los contenidos por defecto
    this.valores = JSON.stringify({"1":{"carrier":"CCH","service":"DEX"},"17":{"carrier":"CHP","service":"express"}}, null, 4);
    this.contenido = JSON.stringify({"data":{"BUIN":{"limit":1,"over_carrier_service_id":17,"under_carrier_service_id":17},"LAJA":{"limit":1,"over_carrier_service_id":1,"under_carrier_service_id":1},"LEBU":{"limit":1,"over_carrier_service_id":1,"under_carrier_service_id":1},"LOTA":{"limit":1,"over_carrier_service_id":17,"under_carrier_service_id":17}}}, null, 4);
  },
  watch: {
    //procesamos los datos cuando el usuario los cambie
    valores() { this.generarResultado() },
    contenido() { this.generarResultado() }
  },
  methods: {
    generarResultado() {
      //definimos variables para manejar los datos
      let resultado = {}, json=JSON.parse(this.contenido), values=JSON.parse(this.valores), keys = Object.keys(json.data);
      
      //algoritmo muy simple para procesar cada línea según el valor asociado al ID
      for (const key of keys) resultado[key] = { limit: json.data[key].limit, over: values[json.data[key].over_carrier_service_id], under: values[json.data[key].under_carrier_service_id]}
      
      //retornamos resultado ordenado para mostrar en el editor
      this.resultado = JSON.stringify(resultado, null, 2)+'\n'
    },

    // PrismEditor
    highlighter(code) {
      return highlight(code, languages.js);
    },
  },
};
</script>

<style>
  /* PrismEditor */
  .editor {
    background: #2d2d2d;
    color: #ccc;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    display: inline-flex;
    /* width: calc(50vw - 4100px); */
    margin-top: 50px;
  }
  .editor-container {
    padding: 5px;
    display: inline-flex;
    width: calc(50vw - 350px);
  }
  .editor-container h3 {
    position: absolute;
  }
  .separated {
    margin-left:0px;
    margin-right:10px;
  }
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>