export class Dataset {
  constructor(
    public _id: string,
    public _key: string,
    public _rev: string,
    public title: string,
    public entries: number,
    public size: number,
    public format: string,
    public filename: string
  ) {
  }
}
