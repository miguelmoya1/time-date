import { DateTime } from '../src';

const date = new DateTime();

date.add({ year: 1 });

console.log(date.toString());
