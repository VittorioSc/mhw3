
const client_secret = '1da4af57f6f44ef18eec009c70a812a7';
const client_id = '2e213ccfe19c4620a3fd42958296fee5';
let token;

const spotify_search = document.querySelector('.spotify_container');
spotify_search.addEventListener('submit', spotify_S);

function onResponse_s(response){
    return response.json();
}
  
function onJson_s(json){

  const spotify_l = document.querySelector('#container');
  spotify_l.innerHTML = '';
  const results = json.albums.items;
  let num_results = results.length;
  if(num_results > 10) num_results = 10;
  for(let i=0; i<num_results; i++) {
    const element_list = results[i]
    const title = element_list.name;
    const image_sel = element_list.images[0].url;
    
    const ssongs = document.createElement('div');
    ssongs.classList.add('box_spotify');
    const albums_img = document.createElement('img');
    albums_img.src = image_sel;
    const sname = document.createElement('p');
    const slink= document.createElement('a');
    slink.setAttribute('href', element_list.external_urls.spotify);
    slink.textContent = title;
   
    ssongs.appendChild(albums_img);
    ssongs.appendChild(sname);
    ssongs.appendChild(slink);
    
    spotify_l.appendChild(ssongs);
  }
} 


function spotify_S(event){
  event.preventDefault();
  const tracks = document.querySelector('#track');
  const tracks_v = encodeURIComponent(tracks.value);

  fetch("https://api.spotify.com/v1/search?type=album&q=" + tracks_v,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse_s).then(onJson_s);
}
  
function onTokenJson_s(json){
  token = json.access_token;
}

function onTokenResponse_s(response){
  return response.json();
}

fetch("https://accounts.spotify.com/api/token",
  {
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
  {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  }
}).then(onTokenResponse_s).then(onTokenJson_s);

//-----------------------------------------------------------------------------------------
function onError(error) {
  console.log('Error: ' + error);
}

function onResponse(response) {
  console.log('Ok');
  return response.json();
}

const wSearh = document.querySelector("#wSearch");
wSearh.addEventListener("submit", wQuery);

function onJsonWiki(json) {
  console.log(json);
  const results = document.querySelector("#wResults");
  if (json.query.pageids[0] == -1) {
    results.innerHTML = '';
  } else {
    results.innerHTML = '';
  }
  let info = document.createElement("info");
  info.textContent = json.query.pages[json.query.pageids[0]].extract + ' ';
  let a = document.createElement('a');
  a.href = ('https://en.wikipedia.org/?curid=' + json.query.pageids[0]);
  a.textContent = 'More...';
  a.style.textDecoration = 'none';
  a.style.color = 'rgba(255, 0, 0, 0.9)';
  info.appendChild(a);
  results.appendChild(info);
  console.log('Ok');
}

function wQuery(event) {
  event.preventDefault();

  const q = document.querySelector("#wikiSearchQuery");
  const query = encodeURIComponent(q.value);
  fetch('https://en.wikipedia.org/w/api.php?format=json&action=query&indexpageids&prop=extracts&origin=*&exintro&explaintext&redirects=1&titles=' + query)
          .then(onResponse, onError)
          .then(onJsonWiki);
}
