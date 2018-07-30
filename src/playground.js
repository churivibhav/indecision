const multiplier = {
  numbers: [1, 2, 3, 4],
  multiplyBy: 3,
  multiply() {
    return this.numbers.map(n => n * this.multiplyBy);
  }
};
console.log(multiplier.multiply());
