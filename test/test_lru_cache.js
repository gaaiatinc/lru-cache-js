/**
 * Created by aismael on 11/12/13.
 */

'use strict';

var testMap = require('../lib/lru_cache')(100000);


var TestKey = function (keyObj) {
    this.keyObj = keyObj;
};

TestKey.prototype.hashCode = function () {
    return this.keyObj.toString();
};

TestKey.prototype.equals = function (anotherKey) {
    if (anotherKey && (typeof anotherKey.hashCode == 'function')) {
        return this.hashCode() == anotherKey.hashCode();
    } else {
        return false;
    }
};


var startTime = new Date().getTime();

var testKey = new TestKey('this is a test key!!!');

var testKey2 = new TestKey('this is a test key number 2!!!');

testMap.put(testKey, "hello !!!!");
testMap.put(testKey2, "hello number 2!!!!");

console.log(testMap.get(testKey));
console.log(testMap.get(testKey2));

testMap.put(testKey, "hello number 1!!!!");
console.log(testMap.get(testKey));
console.log(testMap.get(testKey2));

for (var i = 0; i < 1000000; i++) {
    testKey = new TestKey('this is a test key number ' + i);
    testMap.put(testKey, "hello value number " + i);

    if ((i % 100) == 0) {
        testKey = new TestKey('this is a test key number ' + 99);
        testMap.get(testKey);
    }
}

console.log('map size= ' + testMap.size());


testKey = new TestKey('this is a test key number ' + 999990);
console.log(testMap.get(testKey));


testMap.put(testKey, "hello value number " + 224);
console.log('map size= ' + testMap.size());
console.log(testMap.get(testKey));

testKey = new TestKey('this is a test key number ' + 99);
console.log(testMap.get(testKey));

testKey = new TestKey('this is a test key number ' + 98);
console.log(testMap.get(testKey));

testKey = new TestKey('this is a test key number ' + 999000);
console.log(testMap.get(testKey));

console.log('map size= ' + testMap.size());
testMap.remove(testKey);
console.log(testMap.get(testKey));
console.log('map size= ' + testMap.size());

//console.log(testMap.mapHead);

console.log('tests performed in ' + (new Date().getTime() - startTime) + " ms");

console.log('finished');
