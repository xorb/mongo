export default class Deferred<T> {
  public resolve: any
  public reject: any
  public promise: Promise<T>
  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}
