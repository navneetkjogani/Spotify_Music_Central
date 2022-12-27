var client_id = '18515b487e064a0faac0df1a6577c9f4';
var client_secret = '00603dfe89da43dd8d71887ce9914636';
var token = '';

(function () {
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
            getCategory();
            getnewreleases();
            getplaylists();
        })
        .catch(err => console.log(err))
})();

function getCategory() {
    const url = 'https://api.spotify.com/v1/browse/categories?limit=6';
    var cat = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    fetch(url, cat)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showcategories(data);
        })
        .catch(err => console.log(err))
}
function showcategories(data) {
    let list = data.categories.items;
    let output = '';
    list.forEach((listcategory) => {
        output += `            
                <div class="wrapper">                
                <img height="100" width="100" src="${listcategory.icons[0].url}" />
                <h2 class="listdetail" onclick="fetchPlalistByCategory('${listcategory.id}')"> ${listcategory.name}</h2>
                </div>
                `
    })
    document.getElementById('showcategory').innerHTML = output;
}


function getnewreleases() {
    const url = 'https://api.spotify.com/v1/browse/new-releases?limit=6';
    var rel = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    fetch(url, rel)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            shownewreleases(data);
        })
        .catch(err => console.log(err))
}
function shownewreleases(data) {
    let list = data.albums.items;
    let output = '';
    list.forEach((listreleases) => {
        output += `  
                <a class="wrapper" href=listtracks.html?${listreleases.id}>      
                <div class="wrapper">   
                <img height="100" width="100" src="${listreleases.images[1].url}" />
                <h3 class="listdetail"> ${listreleases.name}</h3>
                </div></a>
                `
    })
    document.getElementById('shownewreleases').innerHTML = output;
}


function getplaylists() {
    const url = 'https://api.spotify.com/v1/browse/featured-playlists?limit=6';
    var play = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    fetch(url, play)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showplaylists(data);
        })
        .catch(err => console.log(err))
}
function showplaylists(data) {
    let list = data.playlists.items;
    let output = '';
    list.forEach((listplaylists) => {
        output += `            
                <div class="wrapper">                
                <img height="100" width="100" src="${listplaylists.images[0].url}" />
                <h3 class="listdetail"> ${listplaylists.name}</h3>
                </div>
                `
    })
    document.getElementById('showplaylists').innerHTML = output;
}

async function fetchPlalistByCategory(category_id) {
    const url = 'https://api.spotify.com/v1/browse/categories/' + category_id + '/playlists';
    try {
        let response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
        let data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}