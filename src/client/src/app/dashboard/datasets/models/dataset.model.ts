export class Dataset {
  constructor(
    public _id: string,
    public _key: string,
    public _rev: string,
    public title: string,
    public entries: number,
    public columnNames: string[],
    public format: string,
    public fileName: string,
    public fileSize: number
  ) {
  }
}
