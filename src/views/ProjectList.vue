<template>
  <div class="project-list">
    <input 
      v-model="searchTerm"
      type="text"
    >
    <input 
      type="submit" 
      @click="onSearchProjects"
    >
    <h1>Project List</h1>

    <Log 
      :value="reload" 
      :format="(_)=>`look for project ${searchTerm}`" 
    />

    <Async 
      v-slot="slotProps" 
      :func="doSearchProjects" 
      :reload="reload"
    >
      <template v-if="slotProps.error">
        <span class="project-list-error">Error: {{ slotProps.error }}</span>
      </template>
      <template v-else-if="slotProps.isPending">
        loading...
      </template>
      <template v-else>
        <ul class="project-list">
          <li 
            v-for="(project, index) of slotProps.result" 
            :key="project.id"
          >
            {{ index+1 }}. {{ project.name }}
          </li>
        </ul>
      </template>
    </Async>
  </div>
</template>

<script>
import {store, searchProjects} from '../store'

export default {
  name: 'Projects',
  data() {
    return {
      searchTerm: '',
      projects: store.projects,
      reload: undefined
    }
  },
  mounted() {
    this.reload = new Date();
  },
  methods: {
    onSearchProjects() {
      this.reload = new Date();
    },
    doSearchProjects() {
      return searchProjects(this.searchTerm);
    },
    doAlert(s) {
      alert(s);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul.project-list {
    list-style-type: none;
  }

  .project-list-error {
    color: red;
  }
</style>
