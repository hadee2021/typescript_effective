  /*타입 좁히기
    class는 타입으로서의 값도 가능
  */
  class Square {
    constructor(public width: number) {}
  }

  class Rectangle extends Square {
    constructor(public width: number, public height: number) {
      super(width)
    }
  }

  type Shape = Square | Rectangle

  function calculateArea(shape: Shape) {
    if(shape instanceof Rectangle) {
      return shape.width * shape.height
    }
    else {
      return shape.width * shape.width
    }
  }

  calculateArea(new Square(20))
  calculateArea(new Rectangle(20, 100))

  /*서버에서 값이 넘어온경우 */
  function turnLightOn() {}
  function turnLightOff() {}
  function setLightSwitch(value: boolean) {
    switch(value) {
      case true:
        turnLightOn()
        break
      case false:
        turnLightOff()
        break
      default:
        console.log(`I'm afraid I can't do that`)
    }
  }

  interface LightApiResponse {
    lightSwitchValue: boolean
  }

  async function setLight() {
    const response = await fetch('/light')
    const result: LightApiResponse = await response.json()
    setLightSwitch(result.lightSwitchValue)
    // result.lightSwitchValue이게 boolean이 아닌경우
    // 혼란스러운 상황이 될 수 있다
  }

  /*함수 오버로딩 */
  function add(a: number, b: number): number
  function add(a: string, b: string): string
  function add(a: any, b: any) {
    return a + b
  }
  add(1, 2)
  add('1', '2')

  /* 구조적 타이핑의 문제 */
  interface Vector2D {
    x: number
    y: number
  }

  function calculateLength(v: Vector2D):number {
    return Math.sqrt(v.x * v.x + v.y * v.y)
  }

  interface Vector3D {
    x: number
    y: number
    z: number
  }

  function normalize(v: Vector3D) {
    const length = calculateLength(v)
    return {
      x: v.x / length,
      y: v.y / length,
      z: v.z / length
    }
  }

  normalize({ x: 2, y: 5, z: 10 })

  /* 구조적 타이핑의 문제 */

  class C {
    foo: string
    constructor(foo: string) {
      this.foo = foo
    }
  }

  const c = new C('C의 객체이다')
  const d: C = { foo: 'C 타입으로 선언'} // 타입체커 

  console.log( d instanceof C) // 당연히 거짓





