/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Lauren Hawkins
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
   return `<div class = "card container is-multiline has-text-centered" style="background-color:${hero.backgroundColor}; color: ${hero.color}" >
            <div class="column">
                <h1 class = "title has-text-centered">  
                <span>${hero.name}</span>
                </h1>

                <img src = ${hero.img}>

                    <h2> ${hero.first} ${hero.last} </h2>

                        <h3> ${hero.firstSeen} </h3>

                            <p class="is-small"> ${hero.description} </p>
                            <button class="button is-light"> Edit </button>
            </div>
            </div>`
};

/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */


export const renderHeroEditForm = function(hero) {
return `<form>
<div class = "card container is-multiline has-text-centered" style = "color:${hero.color}; "background-color:${hero.backgroundColor}">
<h1> 
<label class="label">Name</label>
<input class="input is-rounded" type="text" placeholder="Rounded input" value=${hero.name} name=hero.name>
</h1>
        <div class="column">
            <div class="control">
                <img src = ${hero.img}>
                    <h2>
                    <label class="label">First Name</label>
                    <input class="input is-rounded" type="text" placeholder="Rounded input" value=${hero.first} name=hero.name>
                    <label class="label">Last Name</label>
                    <input class="input is-rounded" type="text" placeholder="Rounded input" value=${hero.last} name=hero.name>
                    </h2>
                        <h3>
                        <label class="label">First Seen</label>
                        <input class="input is-rounded" value="${ hero.firstSeen.getFullYear() }-0${ hero.firstSeen.getMonth() }-01" type="date" name=hero.firstSeen/>
                        </h3>
                            <p>
                            <label class="label">Description</label>
                            <input class="input is-rounded" value=${hero.description} name=hero.name/>
                            </p>
                            <button type="submit" class="button is-light"> Save </button>
                            <button class="button is-light"> Cancel </button>
                            <textarea> </textarea>
            </div>
        </div>
    </div></form>`

};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    // TODO: Append the hero cards to the $root element
    for(var i=0;i<heroes.length; i++){
        $root.append(renderHeroCard(heroes[i]))
    }
    
    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    $root.append(renderHeroEditForm(randomHero))
    // TODO: Generate the hero edit form using renderHeroEditForm()
    // TODO: Append the hero edit form to the $root element
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
