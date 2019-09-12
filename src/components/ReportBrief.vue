<template>
  <div class="level has-background-light">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          Newly Failed
        </p>
        <p class="title">
          {{ report.statusFromPrevious.newFailed }}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          Fixed
        </p>
        <p class="title">
          {{ report.statusFromPrevious.fixed }}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          New
        </p>
        <p class="title">
          {{ report.statusFromPrevious.newCase }}
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
  }
}
</script>
