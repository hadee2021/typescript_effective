  /* item19. 추론가능한 타입을 사용해 코드 줄이기 */
  // 타입추론이 가능한것은 명시적 타입을 꼭 안써도 된다
  interface Product {
    id: number
    name: string
    price: number
  }
  // 구조분해 할당시 타입이 추론된다
  function logProduct({ id, name, price }: Product) {
    console.log(id, name,price)
  }

  //타입을 명시해야할때
  const furby: Product = {
    name: 'Fo',
    id: 45454545,
    price: 15
  }

  logProduct(furby)

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

  function fetchProduct(id: string) {}
  function fetchProductBySerialNumber(id: number) {}

  let id: string = '12-34-56'

  fetchProduct(id)

  let serial = 123456
  fetchProductBySerialNumber(serial)

  /* item21. 타입넓히기 */
  // 타입이 넓아지는것을 제어해야한다
  interface Vector3 {
    x: number
    y: number
    z: number
  }

  function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
    return vector[axis]
  }

  const aa1 = [1, 2, 3] // type is number[]
  const aa2 = [1, 2, 3] as const //type is readonly [1, 2, 3]

  const v1 = {
    x: 1,
    y: 2
  } // type is { x: number; y: number; }

  const v2 = {
    x: 1 as const,
    y: 2
  } // type is { x: 1; y: number; }

  const v3= {
    x: 1,
    y: 2
  } as const  
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

  function contains(text: string, search: string | RegExp) {
    if(search instanceof RegExp) {
      search // Type is RegExp
      return !!search.exec(text)
    }
    search // Type is string
    return text.includes(search)
  }

  // 3. 속성체크로 타입좁히기
  interface A {
    a: number
  }
  interface B {
    b: number
  }

  function pickAB(ab: A | B) {
    if('a' in ab) {
      ab // Type is A
    }
    else {
      ab // Type is B
    }
    ab // Type is A | B
  }

  // 4. 내장함수로 타입좁히기
  function conta(text: string, terms: string | string[]) {
    const termList = Array.isArray(terms) ? terms : [terms]
    termList // Type is string[]
  }

  // 5. 명시적 태그를 붙이기

  interface UploadEvent {
    type: 'upload'
    filename: string
    contents: string
  }

  interface  DownloadEvent {
    type: 'download'
    filename: string
  }
  type AppEvent = UploadEvent | DownloadEvent

  function handleEvent(e: AppEvent) {
    switch(e.type) {
      case 'download':
        e // Type is DownloadEvent
        break
      case 'upload':
        e // Type is UploadEvent
        break
    }
  }

  // 6. 사용자정의 타입가드 기법
  function isInputElement(el: HTMLElement): el is HTMLInputElement {
    return 'value' in el
  }

  function getElementContent(el: HTMLElement) {
    if(isInputElement(el)) {
      el // Type is HTMLInputElement
      return el.value
    }
    el // Type is HTMLElement
    return el.textContent
  }

  // 타입가드

  const jackson5 = ['a', 'b', 'c', 'd', 'e']

  // const members = ['x', 'd'].map(who => jackson5.find(n => n === who))
  // .filter(who => who !== undefined)
  // members의 타입은 (string | undefined)[]

  function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined
  }

  const members = ['x', 'd'].map(who => jackson5.find(n => n === who))
    .filter(isDefined)
  //  members의 타입은 string[]

  /* item23. 한꺼번에 객체 생성하기 */

  interface Point {
    x: number
    y: number
  }

  const pt: Point = {
    x: 3,
    y: 4
  } 

  // 객체를 나눠서 만들어야한다면 타입단언문

  const pt2 = {} as Point
  pt2.x = 3
  pt2.y = 4

  // 전개구문 -> 큰 객체를 한번에 만들 수 있다

  const pt3 = { x: 3, y: 4 }
  const id3 = { name: 'pppp' }
  const namePoint = { ...pt3, ...id3 }

  // 안전한 추가
  // declare let hasMiddle: boolean
  // const firstLast =  { first: 'Harry', last: 'Truman'}
  // const pre = { ...firstLast, ...(hasMiddle ? {mid: 'S'} : {})}

  // 130 131 133 쪽은 오류임

  /* item24. 일관성있는 별칭 사용하기 */

  interface Coordinate {
    x: number
    y: number
  }

  interface BoundingBox {
    x: [number, number]
    y: [number, number]
  }

  interface Polygon {
    exterior: Coordinate[]
    holes: Coordinate[][]
    bbox?: BoundingBox
  }

  const polygon: Polygon = { exterior: [], holes: [] }

  function calculatePolyBbox(polygon: Polygon) {
    polygon.bbox = { x: [0, 1], y: [2, 3] }
  }

  const { bbox } = polygon
  if(!bbox) {
    calculatePolyBbox(polygon)
    console.log(polygon.bbox, bbox)
  }

  /* item25. 비동기코드에는 콜백대신 async 사용하기 */

  const cache2: { [url: string]: string } = {}
  async function fetchWithCache(url: string) {
    if(url in cache2) {
      return cache2[url]
    }
    const response = await fetch(url)
    const text  = await response.text()
    cache2[url] = text
    return text
  }

  let requestStatus: 'loading' | 'success' | 'error'
  async function getUser(userId: string) {
    requestStatus = 'loading'
    const profile = await fetchWithCache(`/user/${userId}`)
    requestStatus = 'success'
  }

  /* item26. 타입추론에 문맥이용 */

  type Language = 'JS' | 'TS' | 'P'

  function setLanguage(language: Language) {

  }

  setLanguage('JS') // OK

  let lan:Language = 'JS'
  setLanguage(lan)

  const lan2 = 'JS'
  setLanguage(lan2)

  // 튜플 사용시 주의점

  type Pan = [number, number]

  function panTo(where: Pan) {

  }

  panTo([10, 20])

  let loc:Pan = [10, 20]
  panTo(loc)

  const loc2: Pan = [10, 20]
  panTo(loc2)

  // 객체 사용시 주의점
  
  type ComLan = 'Js' | 'Ts' | 'P'

  interface Global {
    language: ComLan
    oragn: string
  }

  function complain(language: Global) {

  }

  complain({ language: 'Ts', oragn: 'sss'}) // OK

  const ts =  {
    language: 'Ts',
    oragn: 'sss'
  } as const

  complain(ts)

  // 콜벡 사용시 주의점

  type CB = (a: number, b: Number) => void

  function callWith(fn:CB) {
    fn(Math.random(), Math.random())
  }

  const cb: CB = (a, b) => {
    a 
    b 
  }

  callWith(cb)

  

  









































