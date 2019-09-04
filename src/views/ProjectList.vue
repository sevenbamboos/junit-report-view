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
                class="input is-primary" 
                v-model="searchTerm"
                type="text"
                placeholder="Find a project"
              >
              <span class="icon is-left">
                <i class="fas fa-search" />
              </span>
            </div>
            <div class="control">
              <button 
                @click="onSearchProjects"
                class="button is-primary"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
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
            <div class="media">
              <div class="media-left">
                <p>{{ index+1 }}</p>
              </div>
              <div class="media-content">
                <div class="has-text-left">
                  {{ project.name }}
                </div>
                <template v-if="project.latestReport">
                  <div class="level has-background-light">
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">
                          Newly Failed
                        </p>
                        <p class="title">
                          {{ project.latestReport.newlyFailed }}
                        </p>
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">
                          Fixed
                        </p>
                        <p class="title">
                          {{ project.latestReport.fixed }}
                        </p>
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">
                          Ignored
                        </p>
                        <p class="title">
                          {{ project.latestReport.ignore }}
                        </p>
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">
                          New
                        </p>
                        <p class="title">
                          {{ project.latestReport.new }}
                        </p>
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">
                          Deleted
                        </p>
                        <p class="title">
                          {{ project.latestReport.deleted }}
                        </p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
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
  computed: {
    projectCount() {
      return this.projects ? this.projects.length : 0
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
  li {
    border-bottom:1px solid #000;
    padding:5px;
    margin:2px;    
  }
</style>
