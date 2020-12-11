//import axios from 'axios' 

export async function recentTweets(){
    const $root = $('#root')
    const result = await axios({
      method: 'get',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
      withCredentials: true,
    });
    
    //$root.append(`<h1>HELLO WOLRD</h1>`)
    let twoted = `<div id ="tweeter">

    </div>`
    for(var i = 0; i<50; i++){
        if(result.data[i]["isMine"] == true){
          twoted += `<div class = "twot">
          <div id = "${result.data[i]["id"]}"</div>

          <h2>${result.data[i]["author"]}
          
          </h2>

          <p>${result.data[i]["body"]}</p>
          <h3>
        
          <button class = "button update" id="${result.data[i]["id"]}" value="${result.data[i]["body"]}">&#9997</button>
          <button class ="button delete" id="${result.data[i]["id"]}">&#10060</button>
        
          ${result.data[i]["likeCount"]}
        
          <button> &#128260 </button>
          ${result.data[i]["retweetCount"]} 

          <button id="${result.data[i]["id"]}" class = "button reply">&#128172</button>
          ${result.data[i]["replyCount"]} 
          
          </h3>

          
          </div>`

        } else{
          twoted += `<div class = "twot">
          <div id="${result.data[i]["id"]}"></div>
          <h2>${result.data[i]["author"]}</h2>
          <p>${result.data[i]["body"]}</p>

          <h3>
          
          <button class="button like" id="${result.data[i]["id"]}" value="${result.data[i]["isLiked"]}">&#128420</button>

          ${result.data[i]["likeCount"]}

          <button class = "button" > &#128260 </button>
          ${result.data[i]["retweetCount"]} 

          <button id="${result.data[i]["id"]}" class = "button reply"> &#128172 </button>
          ${result.data[i]["replyCount"]} 
          
          </h3>
          
          </div>
          `
        }
        
    }
    twoted += `</div>`
    $root.append(twoted)
    //return result.data; 
  }
  
  export async function createTweets(event){
    event.preventDefault()
    const result = await axios({
      method: 'post',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
      withCredentials: true,
      data: {
        type: "tweet",
        body: $("textarea[id=body]").val()
      },
    });
    //return result;
    $('#tweeter').replaceWith(recentTweets())
  }
  
  export async function readTweets(number){
    const result = await axios({
      method: 'get',
      url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${number}`,
      withCredentials: true,
    });
    return result;
  }
  
  export async function update(event){
    $('div[id=' + event.target.id +']').html(`form id="${event.target.id}" class="updateForm">
    <textarea id="update">${event.target.value}</textarea>
    <button id="${event.target.id}" class="button updateForm" type="submit">Update</button></form>`)
  }

  export async function updateTweet(event){
    console.log(event.target.id)
    event.preventDefault()
    var previous = $("textarea[id=update]").val()
    $("div[id=" + event.target.id +"]").html(``)
    var urTweet = "https://comp426-1fa20.cs.unc.edu/a09/tweets/" + event.target.id
    const result = await axios({
      method: 'put',
      url: urTweet,
      withCredentials: true,
      data: {
        body: previous
      },
    });
    $("#tweeter").replaceWith(recentTweets())
  }
  
  export async function deleteTweet(event){
    var badTweet = "https://comp426-1fa20.cs.unc.edu/a09/tweets/" + event.target.id
    const result = await axios({
      method: 'delete',
      url: badTweet,
      withCredentials: true,
    });
    $('#tweeter').replaceWith(recentTweets())
  }
  
  
  export async function likeTweet(event){
    //console.log(event.target.id)
    //if(event.target.value=="false"){
    var liked = "https://comp426-1fa20.cs.unc.edu/a09/tweets/"+ event.target.id + "/like"
    const result = await axios({
      method: 'put',
      url: liked,
      withCredentials: true,
    });
    //return result;
    $('#tweeter').replaceWith(recentTweets())
  }
  
  export async function dislikeTweet(event){
    var disliked = "https://comp426-1fa20.cs.unc.edu/a09/tweets/"+ event.target.id + "/unlike"
    const result = await axios({
      method: 'put',
      url: disliked,
      withCredentials: true,
    });
  
    $('#tweeter').replaceWith(recentTweets())
  }
  
  
  export async function replyTweet(event){
    event.preventDefault()
    var twote = $("textarea[id=reply]").val()
    $('div[id='+ event.target.id +']').html(``)
    const result = await axios({
        method: 'post',
        url: "https://comp426-1fa20.cs.unc.edu/a09/tweets",
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": event.target.id,
          "body": twote,
        },
      });
      $('#tweeter').replaceWith(recentTweets())
  }

  export async function reply(event){
    $('div[id=' + event.target.id +']').html(`<form id ="${event.target.id}" class="replyForm">
    <textarea id = "reply">Reply</textarea>
    <button id="${event.target.id}" class="button reply" type="submit">Tweet</button></form>`)
  }
  
  export async function retweet(event){
    event.preventDefault()
    const original = await axios({
      method: 'get',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
      withCredentials: true, 
    })
    var rt = original.data.find(tweet => tweet.id == event.target.id)
    var text = "" + $('textarea#rted').val() + "";
    $('div[id='+ event.target.id +']').html(``);
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "retweet",
          "parent": event.target.id,
          "body": `${text}<br><div><h3>${rt["author"]}</h3><p>${rt["body"]}</p></div>`,
        }
      });
      $('#tweeter').replaceWith(recentTweets())
  }

  export const rt = function(event){
    $('div[id=' + event.target.id +']').html(`<form id ="${event.target.id}" class="rtForm">
    <textarea id = "rted">Quote RT</textarea>
    <button id="${event.target.id}" class="button reply" type="submit">Tweet</button></form>`)
  }

  $(function(){ 
    const $root = $('#root')
    $root.append(`<div><form class = "form">
    <textarea id="body">Type New Tweet</textarea>
    <button type="submit"> Tweet</button>
    </form>
    </div> `)
    //$root.html(`<h1>HELLO WORLD</h1>`)
    recentTweets()

    //update tweet button event
    $root.on("click", ".update", updateTweet)
    $root.on("submit", ".updateForm", update)

    //reply to tweet button event
    $root.on("click", ".reply", replyTweet)
    $root.on("submit", ".replyForm", reply)

    //retweet button event
    $root.on("click", ".retweet", retweet)
    $root.on("submit", ".rtForm", rt)

    //create tweet button event
    $root.on("submit", ".form", createTweets)

    //like tweet button event
    $root.on("click", ".like", likeTweet)
    
    //delete tweet button event
    $root.on("click", ".delete", deleteTweet)
      
  })