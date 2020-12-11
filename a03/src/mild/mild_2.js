/**
 *
 * @param variable
 * @returns {{type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value: *}}
 * example: identifyVariable(4);
 * returns: { type: 'number', value: 4 }
 */
export function identifyVariable(variable) {
   var type = typeof(variable);
   var value = variable;
   //return "{ type: '" + typeof(variable) + "', value: " + variable + " } ";
   return {type, value};
}
console.log(identifyVariable(42));
//console.log(identifyVariable('blubber'));


/**
 *
 * @param array
 * @returns {[]}
 * example: identifyArray(['some', 3, [3, 4], false]);
 * returns: [
 { type: 'string', value: 'some' },
 { type: 'number', value: 3 },
 { type: 'object', value: [ 3, 4 ] },
 { type: 'boolean', value: false }
 ]

 */
export function identifyArray(array) {
   var results = []
   for(var i=0; i<array.length; i++){
      let result = array[i]
      results.push(identifyVariable(result))
   }
   //return result;
   return results;
   
}
   //console.log(identifyArray(['some', 3, [3, 4], false]))

/**
 * mutates the object that is passed in.
 * @param object
 * @param key
 * @returns {*} does not have to return anything
 *
 * example:
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 removeKey(obj, 'password');
 obj now does not contain the `password` field
 */
export function removeKey(object, key) {
   delete object[key];
   //return object
}

//console.log(removeKey(obj, 'password'))

/**
 * Does not mutate the object passed in
 * @param object
 * @param key
 * @returns {*} The object with its keys removed
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 obj = removeKeyNonDestructive(obj, 'password');
 obj will not have the `password` field only because it was assigned the result of the function.
 If only `removeKeyNonDestructive` was called, nothing would have changed.
 */
export function removeKeyNonDestructive(object, key) {
   let{[key]: omit, ...newObj} = object
   return newObj;
}
let objec = {
   name: 'Mr. Boss',
   title: 'boss',
   age: 33,
   password: 'pass123'
};
//console.log(removeKeyNonDestructive(objec,'password'))
//console.log(objec);

/**
 * Remove and return the listed keys. Without mutating the object passed in.
 * @param object
 * @param {string[]} keyList
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * example:

 let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
 obj = removeKeys(obj, ['password', 'age']);
 // object now looks like this
 { name: 'Mr. Boss', title: 'boss' }

 * @return {*} The object with its keys removed.
 */
export function removeKeys(object, keyList) {
  // for(var i = 0; i < keyList.length; i++){
  //    delete object[keyList[i]];
  //}
  // return object;
   for(var i = 0; i <= keyList.length; i++){ 
      let res = removeKeyNonDestructive(object, keyList[i])
      object = res;
      }
      return object
}
let obje = {
   name: 'Mr. Boss',
   title: 'boss',
   age: 33,
   password: 'pass123'
};
//console.log(removeKeys(obje, ['password', 'age']));
//console.log(obje);