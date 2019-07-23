import { BASE_URL } from '../config/config';

export function calculateStars(currentTimer, time, life) {
  const stars = [true, false, false];
  if (currentTimer < time) stars[1] = true;
  if (life > 1) stars[2] = true;
  return stars;
}

function convertTestCase(testcase) {
  let testObj = {};
  let testStr = '';
  let start;
  let end;
  let index;
  let i = 0;
  for (let test of testcase) {
    i = 0;
    let testCaseCap = test.testcase.caption;
    let testCaseScript = test.testcase.script;
    do {
      start = testCaseCap.indexOf('$$');
      if (start !== -1) {
        end = testCaseCap.indexOf('$$', start + 2);
        index = testCaseCap.substring(start + 2, end);
        testObj[index] = test.params[i];
        testCaseCap = testCaseCap.substring(end + 2, testCaseCap.length);
      }
      i++;
    } while (start !== -1);
    for (const idx in testObj) {
      testCaseScript = testCaseScript.replace(`$$${idx}$$`, testObj[idx]);
    }
    testStr += `${testCaseScript} && `;
  }
  return testStr.replace(/&& +$/, '');
}

export function checkResult(script, missions) {
  const idoc = document.getElementById('output').contentWindow.document;
  let value = script;
  value += `\x3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'>\x3C/script>
\x3Cscript src='${BASE_URL}js/validator.js'>\x3C/script>`;
  value += `\x3Cscript>result=[]\x3C/script>`;
  let i = 0;
  for (const misi of missions) {
    value += `\x3Cscript>if(${convertTestCase(
      misi.testcase,
    )}){ result.push({  "index":${i}, "result":true }) } else {result.push({  "index":${i}, "result":false })}\x3C/script>`;
    i++;
  }
  value +=
    '\x3Cscript>parent.postMessage({ "action":"result", "data" : result },\'*\'); result=[]\x3C/script>';
  idoc.open();
  idoc.write(value);
  idoc.close();
}

export function compareResult(currentResult, result) {
  let correctCount = 0;
  let correctCount2 = 0;
  const current = currentResult;
  for (let a = 0; a < result.length; a += 1) {
    if (result[a].result) {
      if (typeof current[a] !== 'undefined') {
        if (!current[a].result) {
          correctCount2 += 1;
          current[a].result = true;
        }
      } else {
        current[a] = result[a];
        correctCount2 += 1;
      }
      correctCount += 1;
    }
  }
  return {
    result: currentResult,
    all: correctCount,
    last: correctCount2,
  };
}
