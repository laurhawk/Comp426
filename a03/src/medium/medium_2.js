import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";
import {getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

//data.forEach(function) to print rather than a for loop
/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
//city and highway average miles per gallon
var cityMpg = []
var highwayMpg = []

//year stats
var years = [];

//hybrid vars
var hybrid = []
var totalHybrid = 0;
for(var i = 0; i< mpg_data.length; i++){
    //city and highway stats
    cityMpg[i] = mpg_data[i].city_mpg;
    highwayMpg[i] = mpg_data[i].highway_mpg;
    //year stats
    years.push(mpg_data[i].year);
    //hybrid stats
    if(mpg_data[i].hybrid == true){
        hybrid[i] == true;
        totalHybrid++
    }
    else{
        hybrid[i] == false;
    }

}

//console.log(totalHybrid);
//city and highway stats
//console.log(cityMpg);
var cityMpgSum = getSum(cityMpg)
var highwayMpgSum = getSum(highwayMpg)
var city = (cityMpgSum) / (mpg_data.length);
var highway = highwayMpgSum /(mpg_data.length);
var avg_milespg = (city+highway)/2;
//year stats
var yearStat = getStatistics(years);
//hybrid stats
var hyb = totalHybrid/(mpg_data.length)
//console.log(hyb)
export const allCarStats = {
    avgMpg: {city, highway}, 
    allYearStats: yearStat,
    ratioHybrids: hyb,

};
//console.log(avg_mpg);
//console.log(yearStat);


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
hy = []
notHy = []
//hybrid bool
if(mpg_data[i].hybrid == true){
    hybrid[i] == true;
    notHy[i] = false;
}
else{
    hybrid[i] == false;
    notHy[i] = true;
}

export function hyHelp(){
    var carMake = [ ]
    var hybList = [ ]
    for(var i = 0; i < mpg_data.length; i++){
        //hybrid info
        if(mpg_data[i].hybrid == true){
            carMake[i] = mpg_data[i].make;
            hybList[i] = mpg_data[i].id;
        }

    //year info
    //isolate each year into a list
    //isolate hybrid versus non-hybrid
    //return city,highway
    }

}

export function yeHyHelp(){
    var years = mpg_data.map(x=x.year);
    var mpgs = []
    let result = {}
    for(var i = 0; i< mpg_data.length; i++){
        mpgs = years[i];
        var resu ={ hy, notHy }
        result[mpgs] = resu;
    }
    return result;
}


//console.log({carMake,hybList});
export const moreStats = {
  //  makerHybrids: hyHelp(),
  //  avgMpgByYearAndHybrid: yeHyHelp()
};
