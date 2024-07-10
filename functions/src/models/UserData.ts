import { ObjectId } from "mongodb";

export default interface UserData {
  _id?: ObjectId;
  uid: string;
}
