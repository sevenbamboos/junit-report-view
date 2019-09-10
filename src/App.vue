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
        to="/project/7d4c3485-3c46-4127-b9c2-0507b193a123"
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
