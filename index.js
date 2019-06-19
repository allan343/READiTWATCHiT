var dogCount = 0;

'use strict';



function getDogImages(user) {
    console.log(user);
  
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=cat&key=AIzaSyDOGebeDBNkAfaUNohpEAqrb2J6NXFRzhs`;
    console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error =>{

      console.log(error.message);
      alert('Something went wrong. Try again later.');
    } 
    )
    
}

function displayResults(responseJson) {
  console.log(responseJson);
  console.log(responseJson.items[1]);
  console.log(responseJson.length);
  $('.results-img').html("");
  let link="";
  //replace the existing image with the new one
  
for(let i =0; i< responseJson.length;i++)
  {
   // link += `<img src="${responseJson.message[i]}" class="results-img">`;
  
  //display the results section

  $('.results-img').append(
    `<li><h3><a href="https://www.youtube.com/embed/${responseJson[i].id.videoId}">${responseJson[i].snippet.title}</a></h3>`);





  
  }
  /*$('.results-img').html(
    image
   );*/
  $('.results').removeClass('hidden');
}

function watchForm() {
    var user;
  $('form').submit(event => {
    user=$('.dog-number').val();
    event.preventDefault();
   
    getDogImages(user);
   
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  $(".dog-number").attr("value", 3);
  watchForm();
});