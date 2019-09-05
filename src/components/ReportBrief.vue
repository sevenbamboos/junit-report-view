<template>
  <div class="level has-background-light">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          Newly Failed
        </p>
        <p class="title">
          {{ report.newlyFailed }}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          Fixed
        </p>
        <p class="title">
          {{ report.fixed }}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          Ignored
        </p>
        <p class="title">
          {{ report.ignore }}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          New
        </p>
        <p class="title">
          {{ report.new }}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          Deleted
        </p>
        <p class="title">
          {{ report.deleted }}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          Time 
        </p>
        <p class="title">
          {{ formattedTime }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportBrief',
  props: {
    report: {
      type: Object,
      default: null
    }
  },
  computed: {
    formattedTime() {
      return new Date(Date.parse(this.report.time)).toLocaleDateString()
    }
  }
}
</script>
