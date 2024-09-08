interface Person {
  name: string;
  createDate: Date;
  age?: number;
}
 
interface Employee {
  name: string;
  createDate: Date;
  jobTitle: string;
}
 
type User = Person | Employee;

function sortArrayBy<T, TField extends keyof T>(arr: T[], field: TField): T[] {
  return [...arr].sort((a, b) => a[field] > b[field] ? 1 : -1);
}

const user1: Person = { name: "Priya", createDate: new Date() }
const user2: Employee = { name: "Elon", createDate: new Date(), jobTitle: "CEO" }

sortArrayBy([ user1, user2 ], 
