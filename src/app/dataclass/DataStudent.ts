export class DataStudent {
  full_name: string;
  student_id?: string;
  uni_per_id?: string;
  profile_picture: string | null;
  batch?: string | number;
  email?: string | null;
  department_id?: string;
  department?: {
    name_short:string
  };
  level?:string;
  id:number;
  current_address: {
    division:string;
    district:string;
    sub_district:string;
  } | null;
}
