let user = document.querySelector(".username");
let searchButton = document.querySelector("#search_btn");
let containerBlock = document.querySelector("#container");

// Render data From promise Api for github profile (output data to browser)
const renderData = function (data) {
  const html = `<div id="profiles">
<div class="profile">
  <img class="profile__img" src="${data.avatar_url}" />
  <div class="profile__data">
    <h3 class="profile__name">Name : ${data.name}</h3>
    <h3 class="profile__username">Username : ${data.login} </h3>
    <h3 class="profile__location">Location :  ${data.location} </h3>
    <h3 class="profile__website">Website : ${data.blog}  </h3>
    <h3 class="profile__joined">Joined :  ${data.created_at.slice(0, 10)}</h3>
    <div class="profile--stats">
      <div class="profile--stats-fol">
        <span class="stats-fol__number">${data.followers}</span>
        <span class="stats-fol__info">Follower</span>
      </div>
      <div class="profile--stats-fol">
        <span class="stats-fol__number">${data.following}</span>
        <span class="stats-fol__info">Following</span>
      </div>
      <div class="profile--stats-fol">
        <span class="stats-repo__number">${data.public_repos}</span>
        <span class="stats-repo__info">Repos</span>
      </div>
    </div>

  </div>
</div>
</div> `;
  profiles.insertAdjacentHTML("beforeend", html);
};

// Render data From promise Api for github repos
const renderRepos = function (repo) {
const htmlRepos = `
  <div id="repos">
    <div class="repo">
      <h3 class="repo__title">${repo.name}</h3>
      <p class="repo__description">${repo.description}</p>
      <p class=" repo__language">${repo.language}</p>
      <p class=" repo__star">${repo.star}</p>
      <p class=" repo__size">${repo.size}</p>
      <p class=" repo__fork">${repo.forks_count}</p>
    </div>
  </div>
  `;
  rep.insertAdjacentHTML("afterbegin", htmlRepos);
};

// fetching Api for Github Profile
const githubProfile = function (username) {
  //fetch api for username
  fetch(`https://api.github.com/users/${username}`)
    // Handle success and  convert to json for username
    .then((response) => response.json())
    // output final data for Username
    .then((data) => {
      renderData(data);
      // console.log(data);
      const UserId = data.login;
      // console.log(UserId);
      //fetch api for repos
      return fetch(`https://api.github.com/users/${UserId}/repos`);
    })
    
    // Handle success and  convert to json for repos
    .then((response) => response.json())
   
      // output final data for repos
    .then((data) => {
      // remove some repos to display 8 repos 
      const newData = data.slice(0, 8);
      
      // loop to get data display all data  
      newData.forEach((repo) => {   
       renderRepos(repo) 
      });


    });
};


// Add eventlistiner to saerch button
searchButton.addEventListener("click", function () {
  //  input value from user
  const username = user.value;
  if (containerBlock.style.display !== "block") {
    containerBlock.style.display = "none";
  }

  githubProfile(username);
});
