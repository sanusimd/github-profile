let user = document.querySelector(".username");
let searchButton = document.querySelector("#search_btn");
let containerBlock = document.querySelector("#container");

// Render data From promise Api (output data to browser)
const renderData = function (data) {
  const html = `<div id="profiles">
<div class="profile">
  <img class="profile__img" src="${data.avatar_url}" />
  <div class="profile__data">
    <h3 class="profile__name">Name : ${data.name}</h3>
    <h3 class="profile__username">Username : ${data.login} </h3>
    <h3 class="profile__location">Location :  ${data.location} </h3>
    <h3 class="profile__website">Website : ${data.blog}  </h3>
    <h3 class="profile__joined">Joined :  ${data.created_at}</h3>
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

// fetching Api for Github Profile
const githubProfile = function (username) {
  //fetch api
  fetch(`https://api.github.com/users/${username}`)
    // Handle success and  convert to json
    .then((response) => response.json())
    // output final data
    .then((data) => {
      renderData(data);
      console.log(data);
    });
};

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  //  input value from user
  const username = user.value;
  if (containerBlock.style.display !== "block") {
    containerBlock.style.display = "block";
  } else {
    containerBlock.style.display = "none";
    //github profile function
    githubProfile(username);
  }

  // //github profile function
  // githubProfile(username);
});
