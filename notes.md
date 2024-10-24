## App overview
- [ ] Run application, show that some things are broken
## Install TypeScript
- [ ] npm i -D typescript
- [ ] npx tsc --init
- [ ] Talk about tsconfig.json
- [ ] Enable JS checking
- [ ] Show errors in server/index.js and ui/index.js
- [ ] Disable implicit any
## ui/index.js
- [ ] Fix null references with coalesce operator
- [ ] Fix form element references w/ function w/ JSDoc return type
## server.js
- [ ] install Node types
- [ ] install express & cors types
- [ ] rename to .ts
- [ ] create model.ts
- [ ] apply `User[]` to users array
  - [ ] Fix issues
- [ ] apply type `User` to `post.body`
- [ ] `const newUser: Partial<User>`
- [ ] `const validFields: NewUserValidation`
- [ ] Fix issues
- [ ] `users.push(newUser as User)`

const columns = ["name", "createDate"] as const;
type ColumnName = typeof columns[number]
