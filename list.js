var id = location.search.substring(1);
console.log(id);

var client_id = '18515b487e064a0faac0df1a6577c9f4';
var client_secret = '00603dfe89da43dd8d71887ce9914636';
var token = '';

const onpageload = (function () {
    const url = 'https://accounts.spotify.com/api/token';
    var obj = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    }
    fetch(url, obj)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            token = data.access_token;
            getalbum();
        })
        .catch(err => console.log(err))
})();

function getalbum() {
    const url = 'https://api.spotify.com/v1/albums?ids=' + id + '';
    var trac = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    fetch(url, trac)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showalbum(data);
        })
        .catch(err => console.log(err))
}
function showalbum(data) {
    let list = data.albums[0].tracks.items;
    let output = `
    <div align="center">
    <h2>${data.albums[0].name}</h2>
    <img src="${data.albums[0].images[1].url}" />    
    </div>
    `
    list.forEach((listtrack) => {
        output += `            
                <div class="trackwrapper" onclick="playtrack('${listtrack.id}')">                
                <h2 class="listdetail"> ${listtrack.name}</h2>
                </div>
                `
    })
    document.getElementById('showtracks').innerHTML = output;
}

function playtrack(trackid) {
    const url = 'https://api.spotify.com/v1/tracks/' + trackid + '';
    var tracobj = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let output = '';
    fetch(url, tracobj)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            output += `
            <audio controls autoplay>
                <source src="${data.preview_url}" type="audio/ogg">
            </audio>
            `            
            document.getElementById('playtrack').innerHTML = output;
        })
        .catch(err => console.log(err))


}

