import * as util from 'util';

export function log(message: any): void {
  console.log(util.inspect(message, false, null, true));
}