// 函数式编程调用的软肋

function multiplyTwo(num) {
  return num * 2;
}
function minusOne(num) {
  return num - 1;
}
function addTwo(num) {
  return num + 2;
}
function addThree(num) {
  return num + 3;
}

// 接下来调用会很麻烦
var result = multiplyTwo(100);
result = minusOne(result);
result = addTwo(result);
result = addThree(result);

console.log("result", result);

// 注意：该函数a,b 是从右往左执行的
function compose(a, b) {
  return function (num) {
    return a(b(num));
  };
}

let result_compose = compose(multiplyTwo, minusOne)(10);
console.log(result_compose);

// 如果不固定compose内部调用的函数则：
// 注意：该函数a,b 是从右往左执行的
function compose() {
  const args = [].slice.apply(arguments);
  return function (num) {
    let _result = num;
    for (var i = args.length - 1; i >= 0; i--) {
      _result = args[i](_result);
    }
    return _result;
  };
}
//  使用reduceRight
// 注意：该函数a,b 是从右往左执行的
function compose() {
  const args = [].slice.apply(arguments);
  return function (num) {
    return args.reduceRight((res, cb) => cb(res), num);
  };
}

let result_compose_more = compose(addThree, addTwo, minusOne, multiplyTwo)(10);
console.log(result_compose_more);

// promise链式调用
Promise.resolve(10)
  .then(multiplyTwo)
  .then(minusOne)
  .then(addTwo)
  .then(addThree)
  .then((res) => {
    console.log("最终计算值", res);
  });
