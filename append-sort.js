function readInput() {
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  const problem = {
    t: 0,
    secondLine: false,
    testCases: [],
    toggleLine() {
      this.secondLine = !this.secondLine;
    }
  }

  rl.on('line', function (line) {
    if (problem.t === 0) {
      problem.t = +line;
    } else {
      if (!problem.secondLine) {
        const myArr = line.split(' ').map(x => BigInt(parseInt(x)));
        problem.testCases.push(myArr);
        if (problem.testCases.length === problem.t) {
          solveProblem(problem);
          rl.close();
        }
      }
    }
    problem.toggleLine();
  })

  .on('close', () => {
    process.exit();
  });
}

const solveProblem = function(problem) {
  for (let i = 0; i < problem.t; i++) {
    const result = solveCase(problem.testCases[i]);
    formatOutput(i, result);
  }
};

const solveCase = function(inputArray) {
  let cost = 0;
  for (let i = 0; i < inputArray.length - 1; i++) {
    cost += resolveDifference(inputArray, i);
  }
  console.log(inputArray);
  return cost;
};

const resolveDifference = function(inputArray, i) {
  const num1 = inputArray[i];
  let num2 = inputArray[i + 1];
  let cost = 0;
  if (num2 > num1) {
    return 0;
  } else {
    while (num1 >= num2) {
      cost++;
      num2 *= 10n;
      if ((num1 >= num2) && (num2 + 9n > num1)) {
        num2 += (num1 % 10n) + 1n;
      }
    }
    inputArray[i + 1] = num2;
    return cost;
  }
};

const formatOutput = function(number, answer) {
  console.log(`Case #${number + 1}: ${answer}`);
};

readInput();
