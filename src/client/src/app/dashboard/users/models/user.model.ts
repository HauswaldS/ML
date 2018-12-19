import {UserGroup} from "./user-group.model";

export class User {
  constructor(
    public avatar: string,
    public username: string,
    public email: string,
    public groups: UserGroup[],
    public _id: string,
    public _rev: string,
    public _key: string) {
  }
}
