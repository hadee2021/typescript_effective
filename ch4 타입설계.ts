  /* item28. 유효한 상테만 표현하는타입 지향 */

  // 상태별로 interface를 구분해주자

  interface RequestPending {
    state: 'pending'
  }

  interface RequestError {
    state: 'error'
    error: string
  }

  interface RequestSuccess {
    state: 'ok'
    pageText: string
  }

  type RequestState = RequestPending | 
  RequestError | RequestSuccess

  interface State {
    currentPage: string
    requests: { [page: string]: RequestState }
  }

  /* item29. 사용은 너그럽게 생성은 엄격 */
  interface LngLat {
    lng: number
    lat: number
  }

  type LngLatLike = 
  | LngLat 
  | { lon: number; lat: number }
  | [number, number]

  interface Camera{
    center : LngLat
    zoom : number
    bearing : number
    pitch : number
  }

  interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
    center ?: LngLatLike
  }

  // LngLatBounds 는 19가지 경우의 타입
  type LngLatBounds = 
  | { northeast: LngLat; southwest: LngLat } 
  | [LngLat, LngLat] 
  | [number, number, number, number]

  declare function setCamera(camera:CameraOptions): void
  declare function viewportForBounds(camera:LngLatBounds): Camera

  /* item31. 타입주변에 null 배치하기 */

  function extent(nums: number[]) {
    let result: [number, number] | null = null
    for(const num of nums) {
      if(!result) {
        result = [num, num]
      }
      else {
        result = [Math.min(num, result[0]), Math.max(num, result[1])]
      }
    }
    return result
  }

  const [min, max] = extent([0, 1, 2])! // null아님 단언

  /* item32. 인터페이스의 유니온 사용하기 */

  type FillPaint = unknown
  type LinePaint = unknown
  type PointPaint = unknown
  type FillLayout = unknown
  type LineLayout = unknown
  type PointLayout = unknown

  interface FillLayer {
    type: 'fill'
    layout: FillLayout
    paint: FillPaint
  }

  interface LineLayer {
    type: 'line'
    layout: LineLayout
    paint: LinePaint
  }

  interface PointLayer {
    type: 'point'
    layout: PointLayout
    paint: PointPaint
  }

  type Layer = FillLayer | LineLayer | PointLayer

  /* item33. string타입 보다는 구체적 타입사용 */

  type RecordingType = 'live' | 'studio'

  interface Album {
    artist: string
    title: string
    releaseDate: Date
    recordingType: RecordingType
  }

  function getAlbumsOfType(recordingType: RecordingType) {
    
  }

  /* item34. 부정확한 타입보다는 미완성 타입을 사용하기 */

  type Expression1 = any
  type Expression2 = number | string | any[]
  type FnName = '+' | '-' | '*' | '/' | 'rgb'
  type CallExpression = [FnName, ...any[]]
  type Expression3 = number | string | CallExpression

  const tests: Expression3[] = [
    10,
    'red',
    ['+', 10, 'red']
  ]

  /* item37. 공식명칭에는 상표를 붙이기 */

  interface Vec2D {
    _brand: '2d'
    x: number
    y: number
  }

  function vec2D(x: number, y: number): Vec2D {
    return { x, y, _brand: '2d' }
  }

  function calculateNorm(p: Vec2D) {
    return Math.sqrt(p.x * p.x + p.y * p.y)
  }

  calculateNorm(vec2D(3, 4)) // ok return 5

  const vec3D = {_brand: '2d' as const,  x: 3, y: 4, z: 5 }

  calculateNorm(vec3D)



