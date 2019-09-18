<template>

  <div class="project-list">

    <v-card>
      <v-card-title>
        <h1>Project List</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
            label="Search projects"
            v-model="searchTerm"
            @keyup.enter="onSearchProjects"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="onSearchProjects"
          color="success"
        >
          Search
        </v-btn>
      </v-card-actions>
    </v-card>

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
        <v-list shaped>
          <v-subheader>{{ projectCount }} projects</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="project of projects"
              :key="project.id"
            >
              <v-list-item-content>
                <v-list-item-title v-text="project.name" @click="goToProject(project)"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

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
