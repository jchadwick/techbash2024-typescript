interface Person {
  name: string;
  createDate: Date;
  age?: number;
}

interface Employee {
  name: string;
  createDate: Date;
  title: string;
}

let user: Person | Employee = { /* ... */ } as any;

if("title" in user) {
  // ...
} else {
  user.
}
