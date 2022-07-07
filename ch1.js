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
/*타입 좁히기
  class는 타입으로서의 값도 가능
*/
class Square {
    constructor(width) {
        this.width = width;
    }
}
class Rectangle extends Square {
    constructor(width, height) {
        super(width);
        this.width = width;
        this.height = height;
    }
}
function calculateArea(shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
    }
    else {
        return shape.width * shape.width;
    }
}
calculateArea(new Square(20));
calculateArea(new Rectangle(20, 100));
/*서버에서 값이 넘어온경우 */
function turnLightOn() { }
function turnLightOff() { }
function setLightSwitch(value) {
    switch (value) {
        case true:
            turnLightOn();
            break;
        case false:
            turnLightOff();
            break;
        default:
            console.log(`I'm afraid I can't do that`);
    }
}
function setLight() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/light');
        const result = yield response.json();
        setLightSwitch(result.lightSwitchValue);
        // result.lightSwitchValue이게 boolean이 아닌경우
        // 혼란스러운 상황이 될 수 있다
    });
}
function add(a, b) {
    return a + b;
}
add(1, 2);
add('1', '2');
function calculateLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}
function normalize(v) {
    const length = calculateLength(v);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    };
}
normalize({ x: 2, y: 5, z: 10 });
/* 구조적 타이핑의 문제 */
class C {
    constructor(foo) {
        this.foo = foo;
    }
}
const c = new C('C의 객체이다');
const d = { foo: 'C 타입으로 선언' }; // 타입체커 
console.log(d instanceof C); // 당연히 거짓
