export default {
  name: 'Log',
  props: ['value', 'format', 'logger'],
  watch: {
    value() {
      const result = this.format? this.format(this.value) : this.value;
      const lg = this.logger || ((params) => console.log(params));
      lg(result);
    }
  },
  render() {
    return null;
  }
}
