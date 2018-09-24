class SmartCalculator {
  constructor(initialValue) {
    this.sequence = [initialValue];
  }

  add(number) {
    this._addToSequence(number, '+');
    return this;
  }
  
  subtract(number) {
    this.add(-number);
    return this;
  }

  multiply(number) {
    this._addToSequence(number, '*');
    return this;
  }

  devide(number) {
    this.multiply(1/number);
    return this;
  }

  pow(number) {
    let lastIndex = this.sequence.length - 1;
    this.sequence[lastIndex - 1] == '^' && this.sequence[lastIndex] == 1 ? true : this._addToSequence(number, '^');
    return this;
  }

  _addToSequence(number, operator) {
    this.sequence.push(operator);
    this.sequence.push(number);
  }

  _sequenceSolve() {
    let tempSeq = [].concat(this.sequence);
    while(tempSeq.indexOf('^') != -1) {
      let index = tempSeq.indexOf('^');
      let pow = Math.pow(tempSeq[index - 1], tempSeq[index + 1]);
      tempSeq[index -1] < 0 && pow > 0 ? pow = -pow : false;
      tempSeq.splice(index - 1, 3, pow);
    }
    
    while(tempSeq.indexOf('*') != -1) {
      let index = tempSeq.indexOf('*');
      let mult = tempSeq[index - 1] * tempSeq[index + 1];
      tempSeq.splice(index - 1, 3, mult);
    }

    while(tempSeq.indexOf('+') != -1) {
      let index = tempSeq.indexOf('+');
      let add = tempSeq[index - 1] + tempSeq[index + 1];
      tempSeq.splice(index - 1, 3, add);
    }
    return tempSeq[0];
  }

  valueOf() {
    return this._sequenceSolve();
  }
}

module.exports = SmartCalculator;