var dogCount = 0;

'use strict';
var YTclips =[];
var Newsclips =[];

const apiKey ="352d6669b5f446188152fd93ee7ccf52";

const searchURL = 'https://newsapi.org/v2/everything';


function displayVideoModal(){
  $('.container').on('click', '.description', function (event) {
    $('#videoModal').css('display', 'block');
    
    console.log("index is " + $(this).attr('index'));
    var index = $(this).attr('index');
  
    $('.videoModal-content').html(
    
  `
  <button class="close">&times;</button>
  <p> ${YTclips[index].title}</p>
  <hr>
  <p>posted by ${YTclips[index].channelTitle} on ${formatDate(YTclips[index].date)}</p>
  <p>${YTclips[index].description}</p>
  <div class= "buttonContainer">
  <a href="https://www.youtube.com/embed/${YTclips[index].videoId}" class ="videoUrlButton" index="i" data-lity>Go to Video</a>
 </div>
 
  `
      );
  
  
  });
  
}

function closeVideoModal(){
  $('.container').on('click', '.close', function (event) {
    $('#videoModal').css("display", "none");
    $('.videoModal-content').html( `<button class="close">&times;</button>`);
  
  });
  
}

function watchVideo(){
  $('.container').on('click', '.videoUrlButton', function (event) {
    $('#videoModal').css("display", "none");

  });
}

function displayNewsModal(){
  $('.container').on('click', '.newsDescription', function (event) {
    $('#newsModal').css('display', 'block');
    
    console.log("index is " + $(this).attr('index'));
    var index = $(this).attr('index');
  
    $('.newsModal-content').html(
    
  `
  <button class="close">&times;</button>
  <p> ${Newsclips[index].title}</p>
  <hr>
  <p>${Newsclips[index].source} - ${YTclips[index].Author}</p>
  <p>${Newsclips[index].description}</p>
  <div class= "buttonContainer">
  <a href=" ${Newsclips[index].url}" class ="readArticleButton" target="_blank">Read Article</a>
 </div>
 
  `
      );
  
  
  });
  
}

function closeNewsModal(){
  $('.container').on('click', '.close', function (event) {
    $('#newsModal').css("display", "none");
    $('.newsModal-content').html( `<button class="close">&times;</button>`);
  
  });
  
}

function readArticle(){
  $('.container').on('click', '.newsArticleButton', function (event) {
    $('#newsModal').css("display", "none");

  });
}
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getNews(query, maxResults=10) {
  const params = {
    q: query,
    language: "en",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayNewsResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getYTImages(query) {
    console.log(query);
  
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=AIzaSyDOGebeDBNkAfaUNohpEAqrb2J6NXFRzhs`;
    console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(responseJson => 
    {
     // STORE = {ytapi: responseJson};
      // ytapi = responseJson;
     //console.log("ytapi is " + ytapi.items[0]);
     console.log(responseJson)
      displayResults(responseJson)
     // displayModal()
    })
    .catch(error =>{

      console.log(error.message);
      alert('Something went wrong. Try again later.');
    } 
    )
    
}

function formatDate(date){
  
  var d=new Date(date);
  var returnDate=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
return returnDate;
}

function displayResults(responseJson) {
 /* console.log(responseJson);
  console.log(responseJson.items[1]);
  console.log(responseJson.length);*/
  $('.results-img').html("");
  let link="";
  //replace the existing image with the new one
  
for(let i =0; i< responseJson.items.length;i++)
  {
   // link += `<img src="${responseJson.message[i]}" class="results-img">`;
  
  //display the results section
    var youtubeOject = {
      videoId: responseJson.items[i].id.videoId,
      url: responseJson.items[i].snippet.thumbnails.default.url,
      title: responseJson.items[i].snippet.title,
      date: responseJson.items[i].snippet.publishedAt,
      channelTitle: responseJson.items[i].snippet.channelTitle,
      description: responseJson.items[i].snippet.description
    }

    YTclips[i]=youtubeOject;
  $('.results-img').append(
    `<li>
    
    <div class="image"><a href="https://www.youtube.com/embed/${responseJson.items[i].id.videoId} " data-lity><img src="${responseJson.items[i].snippet.thumbnails.default.url}" class="youtube-image"  title="youtube image" alt="youtube image"></a>
    </div>
    <div class="video-content">
    <p class ="title"><a href="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" index="i" data-lity>${responseJson.items[i].snippet.title}</a></p>
    <hr>
    <p class ="date">${formatDate(responseJson.items[i].snippet.publishedAt)} - ${responseJson.items[i].snippet.channelTitle}</p>
    <button type="button" class= "description" index="${i}">Read Description</button>
    </div>
    </li>
    `);
   //`<li><iframe width="420" height="345" src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}">
   //</iframe></li>`);




  
  }

  console.log("store is "+ YTclips[3].title);
  /*$('.results-img').html(
    image
   );*/
     $('.results-news').html(
    
   );
  $('.results').removeClass('hidden');
}

function displayNewsResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('.results-news').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.articles.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image

    var newsOject = {
      title: responseJson.articles[i].title,
      source: responseJson.articles[i].source.name,
      author: responseJson.articles[i].author,
      description: responseJson.articles[i].description,
      url: responseJson.articles[i].url
    }

    Newsclips[i]=newsOject;

    $('.results-news').append(
      `<li>
      <div class="image">
      <img src="${responseJson.articles[i].urlToImage}" class="article-image"  title="artile image" alt="article image" data-lity>
      </div>
      <div class="video-content">
      <p class ="title"><a href="${responseJson.articles[i].url}" target="_blank">${responseJson.articles[i].title}</a></p>
      <hr>
      <p class="source">${responseJson.articles[i].source.name} By ${responseJson.articles[i].author}</p>
      <button type="button" class= "newsDescription" index="${i}">Read Description</button>
      
      </div>
      </li>`
    )};
  //display the results section  
  $('.results').removeClass('hidden');
};



function watchForm() {
    var query;
  $('form').submit(event => {
    query=$('.query-number').val();
    console.log(query);
    event.preventDefault();
   // $('#myModal').css('display', 'block')
    getYTImages(query);
    getNews(query, 7);
  });

  displayVideoModal();
  closeVideoModal();
  watchVideo();
  displayNewsModal();
  closeNewsModal();
  readArticle();
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  $(".query-number").attr("value", 'cat');
  watchForm();
});