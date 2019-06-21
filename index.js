var dogCount = 0;

'use strict';


const apiKey ="352d6669b5f446188152fd93ee7ccf52";

const searchURL = 'https://newsapi.org/v2/everything';


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
      displayResults(responseJson))
    .catch(error =>{

      console.log(error.message);
      alert('Something went wrong. Try again later.');
    } 
    )
    
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

  $('.results-img').append(
    `<li>
    <div class="image"><a href="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}"><img src="${responseJson.items[i].snippet.thumbnails.default.url}"  title="White flower" alt="Flower"></a>
    </div>
    <div class="video-content">
    <p class ="title"><a href="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}">${responseJson.items[i].snippet.title}</a></p><p class ="date">${responseJson.items[i].snippet.publishedAt} - ${responseJson.items[i].snippet.channelTitle}</p>
    </div>
    `);
   //`<li><iframe width="420" height="345" src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}">
   //</iframe></li>`);




  
  }
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
    $('.results-news').append(
      `<li>
      <a href="${responseJson.articles[i].url}"><img src="${responseJson.articles[i].urlToImage}" style="width:82px; height:86px" title="White flower" alt="Flower"></a>
      <h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
      <p>${responseJson.articles[i].source.name}</p>
      <p>By ${responseJson.articles[i].author}</p>
      <p>${responseJson.articles[i].description}</p>
      
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
   
    getYTImages(query);
    getNews(query, 7);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  $(".query-number").attr("value", 3);
  watchForm();
});