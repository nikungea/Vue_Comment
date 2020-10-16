const say = function (person: string) {
  console.log('Hello :>> ', person);
};
const user = 'lhq';
say(user);

let createdByNewBoolean: Boolean = new Boolean(1);

let num: any = 123;
num = 'lll';
console.log(num.num);
let myName = 'lhq';
// myName = 123;

let myVar: string | number;
myVar = 123;
myVar = 'lhq';
// myVar = true;

const getSth = function (sth: string | number): string {
  return sth.toString();
}

interface Person {
  readonly name?: string;
  age?: number;
  isGay?: boolean;
  detail: object;
  [propName: string]: any;
}

let Arthur: Person = {
  age: 28,
  detail: {
    hobby: 'shooting',
    job: 'programmer'
  },
  isGay:false,
  sex:'male'
}
// Arthur['name'] = 'lmh'

console.log(Arthur);
