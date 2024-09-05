interface Person {
    name: string;
    age?: number;
  }

  let noNamePerson: Omit<Person, "name"> = {
    name: "Alice"
  };