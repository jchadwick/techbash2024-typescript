export interface BaseUser {
  username: string;
  createDate: Date;
  type: string;
}

export interface Person extends BaseUser {
  type: "user";
  age?: number;
}

export interface Employee extends BaseUser {
  type: "employee";
  title: string;
}

