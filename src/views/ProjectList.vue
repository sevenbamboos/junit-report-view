<template>
  <div class="project-list">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p>
            <strong>{{ projectCount }}</strong> projects
          </p>
        </div>
        <div class="level-item">
          <div class="field is-grouped is-grouped-centered">
            <div class="control has-icons-left has-icons-right">
              <input 
                class="input is-primary is-small" 
                v-model="searchTerm"
                type="text"
                placeholder="Find a project"
                @keyup.enter="onSearchProjects"
              >
              <span class="icon is-left">
                <i class="fas fa-search" />
              </span>
            </div>
            <div class="control">
              <a 
                @click="onSearchProjects"
                class="button is-primary is-small is-outlined"
              >
                Search
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

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
            v-for="(project, index) of projects" 
            :key="project.id"
          >
            <div class="media">
              <div class="media-left">
                <p>{{ index+1 }}</p>
              </div>
              <div class="media-content">
                <div class="has-text-left">
                  {{ project.name }}
                </div>
              </div>
              <div class="media-right">
                <a @click="goToProject(project)">View</a>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </Async>
  </div>
</template>

<script>

import Vuex from 'vuex'

export default {
  name: 'Projects',
  data() {
    return {
      searchTerm: '',
      reload: undefined
    }
  },
  computed: {
    ...Vuex.mapGetters({
      projects: 'projects/projects',
      projectCount: 'projects/projectCount'
    }) 
  },
  mounted() {
    this.reload = new Date();
  },
  methods: {

    onSearchProjects() {
      this.reload = new Date();
    },

    async doSearchProjects() {
        await this.$store.dispatch('projects/searchProjects', this.searchTerm)
    },

    goToProject(project) {
      this.$store.dispatch('pushBreadCrumbForProject', project);
      this.$router.push(`/project/${project.id}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul.project-list {
    list-style-type: none;
  }

  .project-list-error {
    color: red;
  }
  li {
    border-bottom:1px solid #000;
    padding:5px;
    margin:2px;    
  }
</style>
