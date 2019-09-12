export default {
  name: 'Async',
  props: ['func', 'reload'],
  data() {
    return {
      result: undefined,
      isPending: true,
      error: undefined
    }
  },
  watch: {
    async reload() {
      await this.invokeFunc();
    }
  },
  methods: {
    async invokeFunc() {
      this.error = undefined;
      this.isPending = true;
      try {
        this.result = await this.func.apply(null);
      } catch (e) {
        console.error(e.stack);
        this.error = e;
      } finally {
        this.isPending = false;
      }
    }
  },

  render() {
    return this.$scopedSlots.default({
      result: this.result,
      isPending: this.isPending,
      error: this.error
    });
  }
}
