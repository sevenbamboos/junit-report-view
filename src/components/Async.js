export default {
  name: 'Async',
  props: ['func', 'reload'],
  data() {
    return {
      result: undefined,
      isPending: false,
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
        //throw "Sever is down"
      } catch (e) {
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
