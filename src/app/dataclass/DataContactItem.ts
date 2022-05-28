export class DataContactItem{
  id: number;
  channel_data: {
    enroll_start: string;
    enroll_end:string|null;
    place_name:string;
    position:string;
    web_link:string;
  };
  type: number;
  student_id:number;
}
