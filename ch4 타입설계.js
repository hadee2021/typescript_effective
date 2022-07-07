"use strict";
/* item28. 유효한 상테만 표현하는타입 지향 */
/* item31. 타입주변에 null 배치하기 */
function extent(nums) {
    let result = null;
    for (const num of nums) {
        if (!result) {
            result = [num, num];
        }
        else {
            result = [Math.min(num, result[0]), Math.max(num, result[1])];
        }
    }
    return result;
}
const [min, max] = extent([0, 1, 2]); // null아님 단언
function getAlbumsOfType(recordingType) {
}
const tests = [
    10,
    'red',
    ['+', 10, 'red']
];
function vec2D(x, y) {
    return { x, y, _brand: '2d' };
}
function calculateNorm(p) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
}
calculateNorm(vec2D(3, 4)); // ok return 5
const vec3D = { _brand: '2d', x: 3, y: 4, z: 5 };
calculateNorm(vec3D);
