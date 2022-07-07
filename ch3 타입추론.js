"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 구조분해 할당시 타입이 추론된다
function logProduct({ id, name, price }) {
    console.log(id, name, price);
}
//타입을 명시해야할때
const furby = {
    name: 'Fo',
    id: 45454545,
    price: 15
};
logProduct(furby);
///
// const cache: { [ticker: string]: number } = {}
// function getQuote(ticker: string): Promise<number> {
//   if(ticker in cache) {
//     return cache[ticker]
//   }
//   return fetch(`https://quotes.example.com/?q=${ticker}`)
//     .then(response => response.json())
//     .then(quote => {
//       cache[ticker] = quote
//       return quote
//     })
// }
//
/* item20. 다른타입에는 다른변수 */
function fetchProduct(id) { }
function fetchProductBySerialNumber(id) { }
let id = '12-34-56';
fetchProduct(id);
let serial = 123456;
fetchProductBySerialNumber(serial);
function getComponent(vector, axis) {
    return vector[axis];
}
const aa1 = [1, 2, 3]; // type is number[]
const aa2 = [1, 2, 3]; //type is readonly [1, 2, 3]
const v1 = {
    x: 1,
    y: 2
}; // type is { x: number; y: number; }
const v2 = {
    x: 1,
    y: 2
}; // type is { x: 1; y: number; }
const v3 = {
    x: 1,
    y: 2
};
// type is { readonly x: 1; readonly y: 2;}
/* item22. 타입좁히기 */
// // 1. 분기로 타입 좁히기
// const el2 = document.getElementById('foo') 
// // Type is HTMLElement | null
// if(el2) {
//   el2 //Type is HTMLElement
//   el2.innerHTML = 'Party Time'
// }
// else {
//   el2 // Type is null
//   alert('No element foo')
// }
// 2. instanceof로 타입좁히기
function contains(text, search) {
    if (search instanceof RegExp) {
        search; // Type is RegExp
        return !!search.exec(text);
    }
    search; // Type is string
    return text.includes(search);
}
function pickAB(ab) {
    if ('a' in ab) {
        ab; // Type is A
    }
    else {
        ab; // Type is B
    }
    ab; // Type is A | B
}
// 4. 내장함수로 타입좁히기
function conta(text, terms) {
    const termList = Array.isArray(terms) ? terms : [terms];
    termList; // Type is string[]
}
function handleEvent(e) {
    switch (e.type) {
        case 'download':
            e; // Type is DownloadEvent
            break;
        case 'upload':
            e; // Type is UploadEvent
            break;
    }
}
// 6. 사용자정의 타입가드 기법
function isInputElement(el) {
    return 'value' in el;
}
function getElementContent(el) {
    if (isInputElement(el)) {
        el; // Type is HTMLInputElement
        return el.value;
    }
    el; // Type is HTMLElement
    return el.textContent;
}
// 타입가드
const jackson5 = ['a', 'b', 'c', 'd', 'e'];
// const members = ['x', 'd'].map(who => jackson5.find(n => n === who))
// .filter(who => who !== undefined)
// members의 타입은 (string | undefined)[]
function isDefined(x) {
    return x !== undefined;
}
const members = ['x', 'd'].map(who => jackson5.find(n => n === who))
    .filter(isDefined);
const pt = {
    x: 3,
    y: 4
};
// 객체를 나눠서 만들어야한다면 타입단언문
const pt2 = {};
pt2.x = 3;
pt2.y = 4;
// 전개구문 -> 큰 객체를 한번에 만들 수 있다
const pt3 = { x: 3, y: 4 };
const id3 = { name: 'pppp' };
const namePoint = Object.assign(Object.assign({}, pt3), id3);
const polygon = { exterior: [], holes: [] };
function calculatePolyBbox(polygon) {
    polygon.bbox = { x: [0, 1], y: [2, 3] };
}
const { bbox } = polygon;
if (!bbox) {
    calculatePolyBbox(polygon);
    console.log(polygon.bbox, bbox);
}
/* item25. 비동기코드에는 콜백대신 async 사용하기 */
const cache2 = {};
function fetchWithCache(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (url in cache2) {
            return cache2[url];
        }
        const response = yield fetch(url);
        const text = yield response.text();
        cache2[url] = text;
        return text;
    });
}
let requestStatus;
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        requestStatus = 'loading';
        const profile = yield fetchWithCache(`/user/${userId}`);
        requestStatus = 'success';
    });
}
function setLanguage(language) {
}
setLanguage('JS'); // OK
let lan = 'JS';
setLanguage(lan);
const lan2 = 'JS';
setLanguage(lan2);
function panTo(where) {
}
panTo([10, 20]);
let loc = [10, 20];
panTo(loc);
const loc2 = [10, 20];
panTo(loc2);
function complain(language) {
}
complain({ language: 'Ts', oragn: 'sss' }); // OK
const ts = {
    language: 'Ts',
    oragn: 'sss'
};
complain(ts);
function callWith(fn) {
    fn(Math.random(), Math.random());
}
const cb = (a, b) => {
    a;
    b;
};
callWith(cb);
