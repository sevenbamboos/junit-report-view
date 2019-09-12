export function alphaCompare(propAccessor) {
  return (obj1, obj2) => {
    const s1 = propAccessor(obj1);
    const s2 = propAccessor(obj2);
    if (s1 > s2) return 1;
    else if (s1 < s2) return -1;
    else return 0;
  }
}
