import {variance} from "./data/stats_helpers.js";


/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    return array.reduce((a,b) => a + b, 0);
}
//console.log(getSum([1,2,3,4]))


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getAverage(array) {
    var sum = array.reduce((a,b) => a + b, 0);
    var middle = sum/array.length;
    return middle;
}

export function getMedian(array) {
    const mid = Math.floor(array.length/2);
    const number = [...array].sort((a,b)=> a-b);
    //took out ...array
    return array.length % 2 !== 0 ? number[mid] : (number[mid-1] + number[mid])/2;
}
//console.log(getMedian([3,2,5,6,2,7,4,2,7,5]))

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
function getStandardDeviation (array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  }

export function getStatistics(array) {
    var min = Math.min(...array)
    var median = getMedian(array)
    var max = Math.max(...array)
    var variance = Math.pow(getStandardDeviation(array),2)
    var mean = getAverage(array)
    var length = array.length
    var sum = getSum(array)
    var standard_deviation = getStandardDeviation(array)

    return {min, median, max, variance, mean, length, sum, standard_deviation}
    //'{ min: ' + Math.min(...array) + ', median: ' + getMedian(array) + ', max: ' +
    //Math.max(...array) + ', variance: ' + Math.pow(getStandardDeviation(array),2) + ', mean: ' + getAverage(array) +
    //', length: ' + array.length + ', sum: ' + getSum(array) 
    //+ ', standard_deviation: ' + getStandardDeviation(array) + ' }';
}
//console.log(getStatistics([3,2,4,5,5,5,2,6,7]))

