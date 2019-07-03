var dogCount = 0;

'use strict';
var YTclips = [];
var Newsclips = [];

const apiKey = "352d6669b5f446188152fd93ee7ccf52";

const searchURL = 'https://newsapi.org/v2/everything';


function displayVideoModal() {
  $('.container').on('click', '.description', function (event) {
    $('#videoModal').css('display', 'block');
    $('.close').focus();
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

function closeVideoModal() {
  $('.container').on('click', '.close', function (event) {
    $('#videoModal').css("display", "none");
    $('.videoModal-content').html(`<button class="close">&times;</button>`);
  });
}

function watchVideo() {
  $('.container').on('click', '.videoUrlButton', function (event) {
    $('#videoModal').css("display", "none");
  });
}

function displayNewsModal() {
  $('.container').on('click', '.newsDescription', function (event) {
    $('#newsModal').css('display', 'block');
    $('.close').focus();
    var index = $(this).attr('index');

    $('.newsModal-content').html(

      `
  <button class="close">&times;</button>
  <p> ${Newsclips[index].title}</p>
  <hr>
  <p>${Newsclips[index].source} - ${Newsclips[index].author}</p>
  <p>${Newsclips[index].description}</p>
  <div class= "buttonContainer">
  <a href=" ${Newsclips[index].url}" class ="readArticleButton" target="_blank">Read Article</a>
 </div>
  `
    );
  });
}

function closeNewsModal() {
  $('.container').on('click', '.close', function (event) {
    $('#newsModal').css("display", "none");
    $('.newsModal-content').html(`<button class="close">&times;</button>`);
  });
}

function readArticle() {
  $('.container').on('click', '.readArticleButton', function (event) {
    $('#newsModal').css("display", "none");
  });
}
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getNews(query, maxResults = 10) {
  const params = {
    q: query,
    language: "en",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey
    })
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

  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=7&q=${query}&key=AIzaSyDOGebeDBNkAfaUNohpEAqrb2J6NXFRzhs`;
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      displayResults(responseJson)

    })
    .catch(error => {
      alert('Something went wrong. Try again later.');
    }
    )

}

function formatDate(date) {

  var d = new Date(date);
  var returnDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
  return returnDate;
}

function displayResults(responseJson) {
  $(".search-container" ).remove();
  $(".new-search").show();
  $('.results-img').html("");
  let link = "";
  for (let i = 0; i < responseJson.items.length; i++) {
    var youtubeOject = {
      videoId: responseJson.items[i].id.videoId,
      url: responseJson.items[i].snippet.thumbnails.default.url,
      title: responseJson.items[i].snippet.title,
      date: responseJson.items[i].snippet.publishedAt,
      channelTitle: responseJson.items[i].snippet.channelTitle,
      description: responseJson.items[i].snippet.description
    }

    YTclips[i] = youtubeOject;
    $('.results-img').append(
      `<li>
    
    <div class="image"><a href="https://www.youtube.com/embed/${responseJson.items[i].id.videoId} " data-lity><img src="${responseJson.items[i].snippet.thumbnails.high.url}" class="youtube-image"  title="youtube image" alt="youtube image"></a>
    </div>
    <div class="video-content">
    <p class ="title"><a href="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" index="i" data-lity><span class="question">&#63;</span> ${responseJson.items[i].snippet.title}</a></p>
    <hr class="line">
    <p class ="date">${formatDate(responseJson.items[i].snippet.publishedAt)} - ${responseJson.items[i].snippet.channelTitle}</p>
    <p class ="real-description"> ${responseJson.items[i].snippet.description}</p>
    <button type="button" class= "description" index="${i}">Read Description</button>
    </div>
    </li>
    `);
  }

  console.log("store is " + YTclips[3].title);

  $('.results-news').html(
  );
  $('.results').removeClass('hidden');
}

function displayNewsResults(responseJson, maxResults) {

  console.log(responseJson);
  $('.results-news').empty();
  for (let i = 0; i < responseJson.articles.length & i < maxResults; i++) {
    var newsOject = {
      title: responseJson.articles[i].title,
      source: responseJson.articles[i].source.name,
      author: responseJson.articles[i].author,
      description: responseJson.articles[i].description,
      url: responseJson.articles[i].url
    }

    Newsclips[i] = newsOject;

    $('.results-news').append(
      `<li>
      <div class="image">
      <img src="${responseJson.articles[i].urlToImage}" class="article-image"  title="artile image" alt="article image" data-lity>
      </div>
      <div class="video-content">
      <p class ="title"><a href="${responseJson.articles[i].url}" target="_blank"><span class="question">&#63;</span>${responseJson.articles[i].title}</a></p>
      <hr class= "line">
      <p class="source">${responseJson.articles[i].source.name} By ${responseJson.articles[i].author}</p>
      <p class ="real-description"> ${responseJson.articles[i].description}</p>
      <button type="button" class= "newsDescription" index="${i}">Read Description</button>
      </div>
      </li>`
    )
  };

  $('.results').removeClass('hidden');
};

function watchForm() {
  var query;
  $('form').submit(event => {
    query = $('.query-number').val();
    event.preventDefault();
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

$(function () {
  $(".query-number").attr("value", 'cat');
  watchForm();
});