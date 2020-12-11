/**
 * Course: COMP 426
 * Assignment: a05
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
    /*id=${hero.id} => this was right after first div*/

    return `<section class = "hold" id="${hero.id}">
    <div id=${hero.id} class = "heroes card container is-multiline has-text-centered" style="background-color:${hero.backgroundColor}; color: ${hero.color}" >
    <div class="column">
        <h1 class = "title has-text-centered">  
        <span>${hero.name}</span>
        <h2 class = "subtitle">${hero.subtitle}</h2>
        </h1>

        <img alt="Hero" src = ${hero.img}>

            <h2> ${hero.first} ${hero.last} </h2>

                <h3> ${hero.firstSeen} </h3>

                    <p class="is-small"> ${hero.description} </p>
                    <button class="edit button is-light" value=${hero.id} data-id="${hero.id}" onclick="handleEditButtonPress(event)"> Edit </button>
    </div>
    </div>
    </section>`
};

/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    //took out edit-form
return `<section class="edit_card"> 
        <div class = "card container is-multiline has-text-centered" style = "color:${hero.color}; background-color:${hero.backgroundColor}">
        <form id = "${hero.id}" class="form is-multiline has-text-centered" >
        <h1> 
        <label class="label has-text-centered">Name</label>
        <input class="input name is-rounded" type="text" value="${hero.name}"></input>
        <label class="label has-text-centered">Subtitle</label>
        <input class="input subby is-rounded" type="text" value="${hero.subtitle}"></input>
        </h1>
                <img alt="" src = ${hero.img}>
                    <h2>
                    <label class="label has-text-centered">First Name</label>
                    <input class="input first is-rounded" type="text" value="${hero.first}"></input>
                    <label class="label has-text-centered">Last Name</label>
                    <input class="input last is-rounded" type="text" value="${hero.last}"></input>
                    </h2>
                        <h3>
                        <label class="label has-text-centered">First Seen</label>
                        <input class="input is-rounded firstSeen" value="${ hero.firstSeen.getFullYear() }-0${ hero.firstSeen.getMonth() }-01" type="date"></input>
                        </h3>
                            <p>
                            <label class="label has-text-centered">Description</label>
                            <input class="input description is-rounded" value="${hero.description}"></input>
                            </p>
                            
                            <button type="submit"  class="button save is-light" data-id="${hero.id}" > Save </button>
                            <button  class="cancel button is-light" data-id="${hero.id}" value = "${hero.id}" onclick="handleCancelButtonPress(event)"> Cancel </button>
                            <textarea> </textarea>
        </form></div></section>`
};
//onclick="handleEditFormSubmit(event)"; handleEditFormSubmit(event) took out of submit



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    //event.preventDefault();
    var x = heroicData.find(h=> h.id == event.target.getAttribute('data-id'))
    //console.log(event.target.getAttribute('data-id'))
    //console.log(x)
    var y = $(this).closest(".hold");
    //console.log(y)
    return y.replaceWith(renderHeroEditForm(x))
    
   
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {

    event.preventDefault()
    heroicData.forEach(hero=>{
        if (hero.id == event.target.getAttribute('data-id')){
            let k=$(this).closest(".edit_card");
            console.log(heroicData);
            return k.replaceWith(renderHeroCard(hero));
        }
    });
    /*
    let x = heroicData.find(h=> h.id == event.target.getAttribute('data-id'));

    return y.replaceWith(renderHeroCard(x));
    */
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
 
    event.preventDefault()
    event.stopPropagation()
    
    heroicData.forEach(hero=>{
        if(hero.id == event.target.getAttribute('data-id')){
            hero.name=$(".name").val();
            hero.first=$(".first").val();
            hero.last=$(".last").val();
            hero.subtitle=$(".subby").val();
            let year = $(".firstSeen").val().slice(0,4);
            let month = $(".firstSeen").val().slice(5,7);
            let newDate = new Date(year, month);
            hero.firstSeen = newDate;
            hero.description=$(".description").val();
            let k=$(event.target).closest("#edit-form");
            return $(`#${event.target.getAttribute('data-id')}`).replaceWith(renderHeroCard(hero));
        }
    });

};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    for(var i=0;i<heroes.length; i++){
        $root.append(renderHeroCard(heroes[i]))
    }
    //$root.on("click", ".edit", handleEditButtonPress);
    //$(".edit").on("click", handleEditButtonPress);
    $root.on("click", ".edit", handleEditButtonPress)
    $root.on("click", ".cancel", handleCancelButtonPress);
    $root.on("click", ".save", handleEditFormSubmit);

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
};
/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
//$(function(){
 $(function() {
    loadHeroesIntoDOM(heroicData);
});
