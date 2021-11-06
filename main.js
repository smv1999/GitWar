document.getElementById("submit").addEventListener("click", onFormSubmit);
const githubRootURL = "https://api.github.com/users/";
async function onFormSubmit() {
  document.getElementById("existerror1").style.display = "none";
  document.getElementById("existerror2").style.display = "none";
  document.getElementById("mandatoryerror1").style.display = "none";
  document.getElementById("mandatoryerror2").style.display = "none";
  var username1 = document.getElementById("player1").value;
  var username2 = document.getElementById("player2").value;
  if (!username1 == "" && !username2 == "") {
    var validFlag = true;
    await fetch(githubRootURL + username1)
      .then((data) => data.json())
      .then((user1Data) => {
        fetch(githubRootURL + username2)
          .then((data) => data.json())
          .then((user2Data) => {
            if (user1Data.message && user1Data.message == "Not Found") {
              document.getElementById("existerror1").style.display = "block";
              validFlag = false;
            }
            if (user2Data.message && user2Data.message == "Not Found") {
              document.getElementById("existerror2").style.display = "block";
              validFlag = false;
            }
            if (validFlag) {
              let html = ``;
              var total_score1 = user1Data.followers + user1Data.public_repos;
              var total_score2 = user2Data.followers + user2Data.public_repos;
              fetch(user1Data.repos_url)
                .then((data) => data.json())
                .then((user1Repos) => {
                  user1Repos.forEach((repo) => {
                    fetch(repo.stargazers_url)
                      .then((data) => data.json())
                      .then((starredUsers) => {
                        total_score1 += starredUsers.length * 3;
                        fetch(repo.forks_url)
                          .then((data) => data.json())
                          .then((forkedUsers) => {
                            total_score1 += forkedUsers.length * 5;
                            html += `
                                <div class="card">
                                <div class="flex-container">
                                    <div class="main-flex-container">
                                        <div class="flex card-header">
                                        <h4 class="logo">
                                            <img src="${user1Data.avatar_url}" alt="${user1Data.login}" class="logo-icon" />
                                            ${user1Data.name} ${total_score1}
                                        </h4>
                                        </div>                           
                                    </div>
                                    <div class="main-flex-container">
                                      <div class="flex card-header">
                                      <h4>
                                        Public Repos: ${user1Data.public_repos}
                                      </h4>
                                      </div>                           
                                  </div>
                                    <div class="main-flex-container">
                                        <div class="flex card-header">
                                        <h4>
                                          Followers: ${user1Data.followers}
                                      </h4>
                                      </div>    
                                      <div class="flex card-header">
                                        <h4>
                                            Following: ${user1Data.following}
                                        </h4>
                                        </div>                      
                                    </div>
                                  
                                </div>
                            </div>
                          `;
                          });
                      });
                  });
                });
              fetch(user2Data.repos_url)
                .then((data) => data.json())
                .then((user2Repos) => {
                  user2Repos.forEach((repo) => {
                    fetch(repo.stargazers_url)
                      .then((data) => data.json())
                      .then((starredUsers) => {
                        total_score2 += starredUsers.length * 3;
                        fetch(repo.forks_url)
                          .then((data) => data.json())
                          .then((forkedUsers) => {
                            total_score2 += forkedUsers.length * 5;
                            html += `
                                <div class="card">
                                <div class="flex-container">
                                    <div class="main-flex-container">
                                        <div class="flex card-header">
                                        <h4 class="logo">
                                            <img src="${user2Data.avatar_url}" alt="${user2Data.login}" class="logo-icon" />
                                            ${user2Data.name} ${total_score2}
                                        </h4>
                                        </div>
                                    </div>
                                    <div class="main-flex-container">
                                      <div class="flex card-header">
                                      <h4>
                                        Public Repos: ${user2Data.public_repos}
                                      </h4>
                                      </div>
                                  </div>
                                    <div class="main-flex-container">
                                      <div class="flex card-header">
                                      <h4>
                                        Followers: ${user2Data.followers}
                                    </h4>
                                    </div>
                                  <div class="flex card-header">
                                    <h4>
                                        Following: ${user2Data.following}
                                    </h4>
                                    </div>
                                </div>
                                </div>
                            </div>
                          `;
                          });
                      });
                  });
                });

              document.body.insertAdjacentHTML("beforeend", html);
            }
          });
      });
  } else {
    document.getElementById("mandatoryerror1").style.display = "block";
    document.getElementById("mandatoryerror2").style.display = "block";
  }
}
