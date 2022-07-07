"use strict";
/* item7.타입이 값들의 집합이라고 생각하기 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 'A'는 집합 {'A', 'B'}의 원소이다
const a = 'A';
const baby1 = {
    name: 'aaa',
    birth: new Date()
};
/*
A & B 교차타입은 교집합이다
근데 수학에서의 공통분모의 의미가 아니라
둘이 함께써야한다는 동시성의 의미이다
( 확률에서의 곱사건 같은의미 )

그래서 keyof (A & B) 는 A의 키 B의 키를 모두다 쓰는거라
(keyof A) | (keyof B)랑 동일하다

A | B  유니언 타입은 합집합이다
수학에서는 모두다 해당하는 의미이지만
여기서는 또는의 의미이다
즉 둘중에 1개만 선택

그래서 keyof (A | B)는 A 또는 B에 같이 있는키
즉 공통된 키를 의미한다
(keyof A) & (keyof B)랑 동일하다
*/
/////////////////////////////////////////////
/* extends는 제네릭에서 ~의 부분집합 이다 */
// K는 string일수도 있고 string을 포함하는 유니언도 가능
function getKey(val, key) {
}
getKey({}, 'x');
getKey({}, document.title); // document.title 이게 문자열임
const pointA = 'x';
function sortBy(vals, key) {
    vals.sort((a, b) => (a[key] === b[key] ? 0 : a[key] < b[key] ? -1 : +1));
    return vals;
}
const pts = [
    { x: 1, y: 1 },
    { x: 2, y: 0 }
];
// pts 를 넣으면 T는 Point이고
// keyof T 는 keyof Point 이고
// K 는 keyof Point 의 부분집합 -> 'x', 'y'
sortBy(pts, 'x');
sortBy(pts, 'y');
const Cylinder = (radius, height, name) => {
    return { radius, height, name };
};
// 타입으로 사용한경우와 값으로 사용한 경우를 구분하자
class Cylin {
    constructor() {
        this.radius = 1;
        this.height = 1;
    }
}
function calculateVolume(shape) {
    if (shape instanceof Cylin) {
        shape; // 타입으로 쓰인경우
        shape.radius; // 값으로 쓰인경우
    }
}
// 타입의 속성을 얻을 때는 대괄호로 접근한다
const first = 1;
const first2 = 'foo';
const second = new Cylin().radius;
const p = { first: 'Jane', last: 'Jaco' };
function email(p, sub, body) {
    return new Response();
}
class Cylin2 {
    constructor() {
        this.name = 'www';
    }
}
const vv1 = typeof p; // 값은 object
const vv2 = typeof email; // 값은  function
function email3({ first, last }) {
    console.log(first);
    console.log(last);
}
email3({ first: '처음', last: '마지막' });
// 타입 선언 -> 너는 People 타입이여야 하고 아니면 오류
const alice = { name: 'Alice' };
// 타입 단언 -> 너가 무엇이든지간에 People로 볼것이다
const bob = { name: 'Bob', age: 10 };
// 타입단언이 꼭 필요한 경우
const divEl = document.querySelector('#myButton');
if (divEl) {
    divEl.addEventListener('click', e => {
        e.currentTarget; // 타입은 EventTarget
        const button = e.currentTarget;
        button; // 타입은 HTMLButtonElement
    });
}
// null이 아님을 단언하는법
// 타입은 HTMLElement | null
const elNull = document.getElementById('foo');
// 타입은 HTMLElement
const el = document.getElementById('foo');
// 타입단언은 서브타입만 가능
const body = document.body;
const bodyEl = body;
/* item10. 객체 래퍼 타입 피하기 */
function getStringLen(foo) {
    return foo.length;
}
getStringLen('hello'); // string을 래퍼String에 할당 가능
getStringLen(new String('hello')); // String을 넣음
// const r: Room = {
//   numDoors: 1,
//   ceilingHeightFt: 10,
//   elephant: 'present'
// }
const obj = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present'
};
const r = obj;
const o = { title: 'ski', dark: true };
const o2 = { title: 'ski', dark: true };
const opt = { logScale: true };
// const o3: Line = opt
/* item 12. 함수표현식에 타입 적용하기 */
// 함수 선언문
function rollDice1(sides) {
    return 0;
}
//  함수 표현식
const rollDice2 = function (sides) {
    return 0;
};
// 함수 표현식
const rollDice3 = (sides) => {
    return 0;
};
const rollDice = sides => {
    return 0;
};
const add1 = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;
// 서버에서의 타입이 typeof와 같을때 
const checkedFetch = (input, init) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(input, init);
    if (!response.ok) {
        throw new Error('Request failed' + response.status);
    }
    return response;
});
typeof fetch;
const get = (url, opts) => {
    return Promise.resolve(new Response());
};
// 객체반환함수의 리턴타입 잡기
function getUserInfo(userId) {
    const name = 'Bob';
    const age = 12;
    const height = 48;
    return {
        userId,
        name,
        age,
        height
    };
}
const couple = [
    { first: 'Fred', last: 'Aste' },
    { first: 'b', last: 'foo' }
];
const rocket = {
    name: 'rocket9',
    variant: 'ver09',
    speed: 9000
};
const vec = {
    x: 1,
    y: 2,
    z: 3
};
const abc = {
    a: 1,
    b: 'aaa',
    c: 3
};
/* item16. number인덱스시그니처 보다는 배열,튜플,유사배열 */
// 유사배열은 키가 문자열이다
// ArrayLike 타입을 사용하자
const xs = [1, 2, 3];
function checkedAccess(xs, i) {
    if (i < xs.length) {
        return xs[i];
    }
    throw new Error('Attempt to access');
}
const tupleLike = {
    '0': 'A',
    '1': 'B',
    length: 2
};
/* item17. 변경 막기 위해 readonly사용 */
const a1 = [1, 2, 3];
const b1 = a1;
/* item17. 변경 막기 위해 readonly사용 */
function arraySum(arr) {
    let sum = 0;
    for (const num of arr) {
        sum += num;
    }
    return sum;
}
function printTriangles(n) {
    const nums = [];
    for (let i = 0; i < n; i++) {
        nums.push(i);
        console.log(arraySum(nums));
    }
}
printTriangles(5); // 삼각수가 출력됨
//연속된 행을 가져와서 빈줄을 기준으로 단락나누기
const str = `
  The issue tracker was building up (a high of over 650 open issues) 
  and various server problems have continued to roll in. 

  The height of which was a notification from Amazon 
  (where JS Bin hosts on AWS)

  telling me the server JS Bin runs on, 
  will be terminated and removed from usage in 7 days! 
  `;
function parseTaggedText(lines) {
    const paragraphs = [];
    let currPara = [];
    const addParagraph = () => {
        if (currPara.length) {
            // paragraphs.push([...currPara]) //readonly 의 복사본
            paragraphs.push(currPara); // readonly 제거됨
            currPara = [];
        }
    };
    for (const line of lines) {
        if (!line) {
            addParagraph();
        }
        else {
            currPara = currPara.concat([line]);
        }
    }
    addParagraph();
    return paragraphs;
}
console.log(parseTaggedText(str.split('\n')));
const oo = {
    inner: { x: 0 }
};
// oo.inner = { x: 1 } // readonly 작용
oo.inner.x = 7; // readonly 작용 안함
// 매핑된타입과 객체를 사용하자
const REQUIRES_UPDATE = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false
};
function shouldUpdate(oldProps, newProps) {
    let K;
    for (K in oldProps) {
        if (oldProps[K] !== newProps[K] && REQUIRES_UPDATE[K]) {
            return true;
        }
    }
    return false;
}
