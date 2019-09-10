<template>
  <div 
    id="app" 
    class="container"
  >
    <div id="nav">
      <router-link 
        to="/project-list"
      >
        Projects
      </router-link> |
      <router-link 
        to="/project/f7f7fc92-466a-471b-aba2-2d24a26af492"
      >
        Project 1
      </router-link> |
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
