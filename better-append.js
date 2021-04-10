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
        problem.testCases.push(line.split(' '));
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
  return cost;
};

const resolveDifference = function(inputArray, i) {
  firstString = inputArray[i];
  secondString = inputArray[i + 1];

  if (secondString.length > firstString.length) {
    // Second number longer, therefore bigger
    return 0;
  } else if (secondString.length === firstString.length) {
    // Numbers same length, must check numerical equality
    firstNumber = Number(firstString);
    secondNumber = Number(secondString);
    if (secondNumber > firstNumber) {
      // Numbers still in ascending order, no modification needed
      return 0;
    } else {
      // lengths the same, numbers in wrong order. 
      secondString += '0';
      inputArray[i + 1] = secondString;
      return 1;
    }
  } else {
    // first Number longer.  Modification necessary. 

    /* first step: compare the smaller number against the 
    ** front slice of the bigger one, to see how we need to 
    ** modify going forward.  
    */

    const firstSliceNumber = Number(firstString.slice(0, secondString.length));
    const secondSliceNumber = Number(secondString);
    if (firstSliceNumber > secondSliceNumber) {
      // Second number has to be made longer. Add zeroes.
      let cost = 0;
      for (let i = secondString.length; i <= firstString.length; i++) {
        cost++;
        secondString += '0';
      }
      inputArray[i + 1] = secondString;
      return cost;
    } else if (secondSliceNumber > firstSliceNumber) {
      // Second number must be bigger, in the same length.  
      // add zeroes to match length. 
      let cost = 0;
      for (let i = secondString.length; i < firstString.length; i++) {
        cost++;
        secondString += '0';
      }
      inputArray[i + 1] = secondString;
      return cost;
    } else {
      // The slices match.  Must check the un-sliced bit
      // from firstString
      const remainSlice = firstString.slice(secondString.length);
      if (String(Number(remainSlice) + 1).length > remainSlice.length) {
        // we cannot safely add one, because the remaining slice is all nines
        // Have to make secondString longer, with all zeroes
        for (let i = secondString.length; i <= firstString.length; i++) {
          secondString += '0';
        }
        inputArray[i + 1] = secondString;
        return remainSlice.length + 1;
      } else {
        // safe to add one to remaining slice
        // Careful, Number() conversions chop off leading zeroes
        
        const numberToAppend = Number(remainSlice) + 1;
        let stringToAppend = String(numberToAppend);

        for (let i = 0; i < (remainSlice.length - String(numberToAppend).length); i++) {
          stringToAppend = '0' + stringToAppend;
        }

        secondString += stringToAppend;
        inputArray[i + 1] = secondString;
        return remainSlice.length;
      }
    }
  }
};

const formatOutput = function(number, answer) {
  console.log(`Case #${number + 1}: ${answer}`);
};

readInput();
