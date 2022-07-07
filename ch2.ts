  /* item7.타입이 값들의 집합이라고 생각하기 */

  type AB = 'A' | 'B'
  type AB12 = AB | 12

  // 'A'는 집합 {'A', 'B'}의 원소이다
  const a: AB = 'A'

  /* item7.타입이 값들의 집합이라고 생각하기 */

  interface Identified {
    id: string
  }
  interface Person {
    name: string
  }
  interface Lifespan {
    birth: Date
    death?: Date
  }

  // 교차타입은 교집합이고 모두 사용한다
  // 유니언은 합집합이고 여러개중 택1 이다
  type PersonSpan = Person & Lifespan

  const baby1: PersonSpan = {
    name: 'aaa',
    birth: new Date()
  }

  // keyof안은 겹치는것이 없어서 공집합이다 -> never 타입
  // 즉 Person 또는 Lifespan에 같이 있는 키!!
  // 근데 같이 있는 키가 없으니까  공집합인것이다
  type PersonSpan2 = keyof(Person | Lifespan)

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
  function getKey<K extends string>(val: any, key: K) {

  }

  getKey({}, 'x')
  getKey({}, document.title) // document.title 이게 문자열임

  
  // keyof는 키만 가져오는 역할
  interface Point {
    x: number
    y: number
  }

  // type PointKeys은 'x' | 'y' 이다
  type PointKeys = keyof Point 

  const pointA: PointKeys = 'x'

  function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
    vals.sort((a, b) => (a[key] === b[key] ? 0 : a[key] < b[key] ? -1 : +1))
    return vals
  }

  const pts: Point[] = [
    { x: 1, y: 1 },
    { x: 2, y: 0 }
  ]

  // pts 를 넣으면 T는 Point이고
  // keyof T 는 keyof Point 이고
  // K 는 keyof Point 의 부분집합 -> 'x', 'y'
  sortBy(pts, 'x')
  sortBy(pts, 'y')



  // type Exclude<T, U> = T extends U ? never : T
  // 즉 앞의 집합 - 뒤의 집합 한다는 것이다

  type T1 = Exclude< string | Date, string | number >
  // -> 타입은 Date 나옴

  type NonZeroNums = Exclude<number, 0 >
  // -> 타입은 여전히 number 이고 0 도 가능



  /* item8. 타입공간과 값공간의 심벌 구분하기 */
  // 타입명 과 변수명이 같을 경우 오류가 생길 수 있다
  interface Cylinder {
    radius: number
    height: number
    name: string
  }

  const Cylinder = (radius: number, height: number, name: string) => {
    return{ radius, height, name }
  }

  // 타입으로 사용한경우와 값으로 사용한 경우를 구분하자
  class Cylin {
    radius = 1
    height = 1
  }

  function calculateVolume(shape: any) {
    if( shape instanceof Cylin) {
      shape  // 타입으로 쓰인경우
      shape.radius // 값으로 쓰인경우
    }
  }

  // 타입의 속성을 얻을 때는 대괄호로 접근한다
  const first: Cylinder['radius' | 'height' | 'name'] = 1
  const first2: Cylinder['radius' | 'height' | 'name'] = 'foo'
  const second: Cylinder['radius'] = new Cylin().radius



  // typeof 타입 과 그냥 타입은 다르다

  interface Person2 {
    first: string
    last: string
  }

  const p: Person2 = { first: 'Jane', last: 'Jaco'}

  function email(p: Person2, sub: string, body: string): Response {
    return new Response()
  }

  class Cylin2 {
    name = 'www'
  }

  type TT1 = typeof p  // 타입은 Person2
  type TT2 = typeof email // 타입은 () => Response
  
  const vv1 = typeof p // 값은 object
  const vv2 = typeof email // 값은  function

  type TT = typeof Cylin2 // 타입은 typeof Cylin
  type TTC = InstanceType<typeof Cylin2> // 타입은 Cylin2


  // 타입스크립트 구조분해 할당

  interface Person3 {
    first: string
    last: string
  }

  function email3({ first, last }: Person3) {
    console.log(first)
    console.log(last)
  }

  email3({ first: '처음', last: '마지막'})

  /* item9. 타입 단언보다는 타입선언하기 */

  interface People {
    name: string
  }

  // 타입 선언 -> 너는 People 타입이여야 하고 아니면 오류
  const alice: People = { name: 'Alice' }

  // 타입 단언 -> 너가 무엇이든지간에 People로 볼것이다
  const bob = { name: 'Bob', age: 10 } as People

  // 타입단언이 꼭 필요한 경우

  const divEl = document.querySelector('#myButton')
  if(divEl) {
    divEl.addEventListener('click', e => {
      e.currentTarget // 타입은 EventTarget
      const button = e.currentTarget as HTMLButtonElement
      button // 타입은 HTMLButtonElement
    })
  }

  // null이 아님을 단언하는법

  // 타입은 HTMLElement | null
  const elNull = document.getElementById('foo') 

  // 타입은 HTMLElement
  const el = document.getElementById('foo')!

  // 타입단언은 서브타입만 가능
  const body = document.body
  const bodyEl = body as unknown as People


  /* item10. 객체 래퍼 타입 피하기 */

  function getStringLen(foo: String) {
    return foo.length
  }

  getStringLen('hello') // string을 래퍼String에 할당 가능
  getStringLen(new String('hello')) // String을 넣음

  /* item 11. 잉여속성 체크의 한계 */

  interface Room {
    numDoors: number
    ceilingHeightFt: number
  }

  // const r: Room = {
  //   numDoors: 1,
  //   ceilingHeightFt: 10,
  //   elephant: 'present'
  // }
  const obj = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present'
  }

  const r: Room = obj

  // 잉여 속성체크 피하는 방법
  // 타입단언
  interface Options {
    title: string
    darkMode?: boolean
  }

  const o = { title: 'ski', dark: true } as Options

  // 인덱스 시그니처
  interface Options2 {
    title: string
    [darkMode: string]: unknown
  }

  const o2: Options2 = { title: 'ski', dark: true }

  // 모든속성이 선택적 속성 -> 약한타입
  interface Line {
    log?: boolean
    invest?: number
    age?: number
  }
  const opt = { logScale: true }
  // const o3: Line = opt

  /* item 12. 함수표현식에 타입 적용하기 */
  // 함수 선언문
  function rollDice1(sides: number): number {
    return 0
  }
  //  함수 표현식
  const rollDice2 = function (sides: number): number {
    return 0
  }
  // 함수 표현식
  const rollDice3 = (sides: number): number => {
    return 0
  }

  // 함수타입으로 선언하기
  type Dice = (sides: number) => number

  const rollDice: Dice = sides => {
    return 0
  }

  type BinaryFn = (a: number, b: number) => number

  const add1: BinaryFn = (a, b) => a + b
  const sub: BinaryFn = (a, b) => a - b
  const mul: BinaryFn = (a, b) => a * b
  const div: BinaryFn = (a, b) => a / b

  // 서버에서의 타입이 typeof와 같을때 
  const checkedFetch: typeof fetch = async (input, init) => {
    const response = await fetch(input, init)
    if(!response.ok) {
      throw new Error('Request failed' + response.status)
    }
    return response
  }

  type FetchFn = (input: RequestInfo | URL, 
                  init?: RequestInit | undefined) 
  => Promise<Response>

  typeof fetch

  /* item13. 타입과 인터페이스 차이점알기 */

  type TState = {
    name: string
    capital: string
  }

  interface IState {
    name: string
    capital: string
  }

  interface IState {
    age: number
  }

  type TPair<T> = {
    first: T
  }

  interface IPair<T> {
    first: T
  }

  /* item14. 타입연산과 제네릭으로 반복 줄이기 */

  interface Option {}

  type HTTPFn = (url: string, opts: Option) => Promise<Response>

  const get: HTTPFn = (url, opts) => {
    return Promise.resolve(new Response())
  }

  // 필요한 키만 고르기
  interface State2 {
    userId: string
    pageTitle: string
    recentPage: string[]
    pageContent: string
  }

  type TopNavState1 = {
    userId: string;
    recentPage: string[];
  }

  type TopNavState2 = {
    [ k in 'userId' | 'recentPage' ]: State2[k]
  }

  type TopNavState3 = Pick<State2, 'userId' | 'recentPage'>

  // 객체반환함수의 리턴타입 잡기

  function getUserInfo(userId: string) {
    const name = 'Bob'
    const age = 12
    const height = 48
    return {
      userId,
      name,
      age,
      height
    }
  }

  type UserInfo = ReturnType<typeof getUserInfo>

  // 키가 공통된경우
  interface SaveAction {
    type: 'save'
  }
  interface LoadAction {
    type: 'load'
  }

  type Action = SaveAction | LoadAction
  type ActionType = Action['type']
  type ActionRec = Pick<Action, 'type'>



  // 제네릭과 튜플
  interface Name {
    first: string
    last: string
  }

  type DancingDuo<T extends Name> = [T, T]
  const couple: DancingDuo<Name> = [
    { first: 'Fred', last: 'Aste'},
    { first: 'b', last: 'foo'}
  ]

  /* item15. 동적데이터에 인덱스 시그니처 사용하기 */

  type Rocket = {
    [property: string] : string | number
  }

  const rocket: Rocket = {
    name: 'rocket9',
    variant: 'ver09',
    speed: 9_000
  }

  // // 열이름을 모르는 경우 인덱스 시그니처 사용
  // function parseCSV(input: string): { [col: string]: string }[] {
  //   const lines = input.split('\n')
  //   const [header, ...rows] = lines
    
  //   return rows.map(rowStr => {
  //     const row: { [col: string]: string } = {}
  //     rowStr.split(',').forEach((cell, i)=> {
  //       row[header[i]] = cell
  //     })
  //     return row
  //   })
  // }

  // // 열 이름을 알고있는 경우
  // interface ProductRow {
  //   productId: string
  //   name: string
  //   price: string
  // }

  // declare let csvData: string
  // const products = parseCSV(csvData) as unknown as ProductRow[]

  // 인덱스 시그니처가 광범위한경우 대안책
  type Vec3D = Record<'x' | 'y' | 'z', number>

  const vec: Vec3D = {
    x: 1,
    y: 2,
    z: 3
  }

  // 매핑된 타입으로 키마다 별도의 타입지정 가능
  type ABC = {
    [k in 'a' | 'b' | 'c']: k extends 'b' ? string : number
  }

  const abc:ABC = {
    a: 1,
    b: 'aaa',
    c: 3
  }

  /* item16. number인덱스시그니처 보다는 배열,튜플,유사배열 */
  // 유사배열은 키가 문자열이다
  // ArrayLike 타입을 사용하자
  const xs = [1, 2, 3]
  
  function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
    if(i < xs.length) {
      return xs[i]
    }
    throw new Error('Attempt to access')
  }

  const tupleLike: ArrayLike<string> = {
    '0': 'A',
    '1': 'B',
    length: 2
  }

  /* item17. 변경 막기 위해 readonly사용 */

  const a1: number[] = [1, 2, 3]
  const b1: readonly number[] = a1

  /* item17. 변경 막기 위해 readonly사용 */

  function arraySum(arr: readonly number[]) {
    let sum = 0
    for( const num of arr) {
      sum += num
    }
    return sum
  }

  function printTriangles(n: number) {
    const nums = []
    for(let i = 0; i < n; i++) {
      nums.push(i)
      console.log(arraySum(nums))
    }
  }

  printTriangles(5) // 삼각수가 출력됨

  //연속된 행을 가져와서 빈줄을 기준으로 단락나누기

  const str = `
  The issue tracker was building up (a high of over 650 open issues) 
  and various server problems have continued to roll in. 

  The height of which was a notification from Amazon 
  (where JS Bin hosts on AWS)

  telling me the server JS Bin runs on, 
  will be terminated and removed from usage in 7 days! 
  `
  function parseTaggedText(lines: string[]): string[][] {
    const paragraphs: string[][] = []
    let currPara: readonly string[] = []

    const addParagraph = () => {
      if(currPara.length) {
        // paragraphs.push([...currPara]) //readonly 의 복사본
        paragraphs.push(currPara as string[]) // readonly 제거됨
        currPara = []
      }
    }
    for(const line of lines) {
      if(!line) {
        addParagraph()
      }
      else {
        currPara = currPara.concat([line])
      }
    }
    addParagraph()
    return paragraphs
  }

  console.log(parseTaggedText(str.split('\n')))
  // [ [내용], [내용], [내용] ] 출력됨

  // readonly 는 얕게만 적용

  interface Outer {
    inner: {
      x: number
    }
  }
  const oo: Readonly<Outer> = { 
    inner: { x: 0 }
  }

  // oo.inner = { x: 1 } // readonly 작용

  oo.inner.x = 7 // readonly 작용 안함

  /* item18. 맵핑된 타입을 사용하여 값을 동기화하기 */

  // 산점도 보여주는 UI
  interface ScatterProps {
    // Data
    xs: number[]
    ys: number[]
    // Display
    xRange: [number, number]
    yRange: [number, number]
    color: string
    //Events
    onClick: (x: number, y:number, index: number) => void
  }

  // 매핑된타입과 객체를 사용하자
  const REQUIRES_UPDATE: { [K in keyof ScatterProps]: boolean } = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false
  }

  function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
    let K: keyof ScatterProps
    for(K in oldProps) {
      if(oldProps[K] !== newProps[K] && REQUIRES_UPDATE[K]) {
        return true
      }
    }
    return false
  }








































