  /* item38. any는 가능한 한 좁은범위만 */

  interface Foo {
    foo: string
  }
  interface Bar {
    bar: string
  }

  declare function expressFoo(): Foo
  function processBar(b : Bar) {

  }

  function f() {
    const x = expressFoo()
    processBar(x as any) //x는 여기만 any
    x
  }

  /* item39. any는 구체적으로 변형해서 사용 */

  

