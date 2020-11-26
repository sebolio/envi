<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/primos">Números primos</router-link></li>
        <li><router-link to="/json">JSON</router-link></li>
        <li><router-link to="/marvel">Marvel</router-link></li>
      </ul>
    </div>
    <div class="contenido">
      <router-view/>
    </div>
  </div>
</template>

<style>
body,html { background: #eee !important; padding:0; margin:0; height: 100%; }
.inline-block { display: inline-block !important; }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height:100%;
}
input { 
  border:1px solid rgb(252, 146, 47) !important;
}
.vs-input__label--placeholder {
  color: rgb(252, 146, 47);
  font-weight: 600;
}
#nav {
  height: 100%;
  padding: 30px 10px;
  position: relative;
  background:rgb(252, 146, 47);
  width: 150px;
  min-width: 150px;
}
#nav li { 
  padding: 0px 15px;
}
#nav ul { 
  list-style: none; 
  margin:0; 
  padding: 0; 
  text-align: left;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 12px;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  padding-top:10px;
  padding-bottom:10px;
  padding-left: 10px;
  display: block;
}

#nav a.router-link-exact-active {
  color: black;
  font-weight: bold;
  background:rgb(255, 194, 137);
}
</style>
