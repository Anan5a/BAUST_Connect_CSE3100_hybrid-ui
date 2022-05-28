import {DataStudent} from "./DataStudent";

export class DataChatItem {
  id: number;
  from: number;
  to: number;
  receiver: DataStudent
  content: string;
}
