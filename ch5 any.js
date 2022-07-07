"use strict";
/* item38. any는 가능한 한 좁은범위만 */
function processBar(b) {
}
function f() {
    const x = expressFoo();
    processBar(x); //x는 여기만 any
    x;
}
/* item39. any는 구체적으로 변형해서 사용 */
