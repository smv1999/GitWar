document.getElementById("submit").addEventListener("click", onFormSubmit);
const githubRootURL = "https://api.github.com/users/";
function onFormSubmit() {
  document.getElementById("existerror1").style.display = "none";
  document.getElementById("existerror2").style.display = "none";
  document.getElementById("mandatoryerror1").style.display = "none";
  document.getElementById("mandatoryerror2").style.display = "none";
  var username1 = document.getElementById("player1").value;
  var username2 = document.getElementById("player2").value;
  if (!username1 == "" && !username2 == "") {
    var validFlag = true;
    fetch(githubRootURL + username1)
      .then((data) => data.json())
      .then((user1Data) => {
        fetch(githubRootURL + username2)
          .then((data) => data.json())
          .then((user2Data) => {
            if (user1Data.message && user1Data.message == "Not Found") {
              document.getElementById("existerror1").innerHTML =
                "Username " + username1 + " doesn't exist";
              document.getElementById("existerror1").style.display = "block";
              validFlag = false;
            }
            if (user2Data.message && user2Data.message == "Not Found") {
              document.getElementById("existerror2").innerHTML =
                "Username " + username2 + " doesn't exist";
              document.getElementById("existerror2").style.display = "block";
              validFlag = false;
            }
            if (validFlag) {
              let html = ``;
              var total_score1 = user1Data.followers + user1Data.public_repos;
              var total_score2 = user2Data.followers + user2Data.public_repos;
              fetch(user1Data.repos_url)
                .then((data) => data.json())
                .then((repoData) => {
                  repoData.forEach((repo) => {
                    total_score1 +=
                      repo.stargazers_count * 3 + repo.forks_count * 5;
                  });
                  html += `
                    <div class="card">
                    <div class="local-flex-container">
                        <div class="main-flex-container">
                            <div class="flex-item card-header">
                            <h4 class="logo">
                                <img src="${user1Data.avatar_url}" alt="${
                    user1Data.login
                  }" class="logo-icon" />
                                ${user1Data.name} 
                            </h4>
                            </div>                           
                        </div>
                        <div class="main-flex-container">
                          <div class="flex-item card-header">
                          <h4>
                            <b>Public Repos:</b> ${user1Data.public_repos}
                          </h4>
                          </div>
                          <div class="flex-item card-header">
                          <h4>
                              <b>Score:</b> ${
                                total_score1 > total_score2
                                  ? total_score1 + " (Winner 🥳)"
                                  : total_score1 + " (Loser 😔)"
                              }
                          </h4>
                          </div>                           
                      </div>
                        <div class="main-flex-container">
                            <div class="flex-item card-header">
                            <h4>
                              <b>Followers:</b> ${user1Data.followers}
                          </h4>
                          </div>    
                          <div class="flex-item card-header">
                            <h4>
                                <b>Following:</b> ${user1Data.following}
                            </h4>
                            </div>                      
                        </div>
                    </div>
                </div>
            `;
                  fetch(user2Data.repos_url)
                    .then((data) => data.json())
                    .then((repoData) => {
                      repoData.forEach((repo) => {
                        total_score2 +=
                          repo.stargazers_count * 3 + repo.forks_count * 5;
                      });
                      html += `
                            <div class="card">
                                <div class="local-flex-container">
                                    <div class="main-flex-container">
                                        <div class="flex-item card-header">
                                        <h4 class="logo">
                                            <img src="${
                                              user2Data.avatar_url
                                            }" alt="${
                        user2Data.login
                      }" class="logo-icon" />
                                            ${user2Data.name}
                                        </h4>
                                        </div>
                                    </div>
                                    <div class="main-flex-container">
                                      <div class="flex-item card-header">
                                      <h4>
                                        <b>Public Repos:</b> ${
                                          user2Data.public_repos
                                        }
                                      </h4>
                                      </div>
                                      <div class="flex-item card-header">
                                      <h4>
                                        <b>Score:</b> ${
                                          total_score2 > total_score1
                                            ? total_score2 + " (Winner 🥳)"
                                            : total_score2 + " (Loser 😔)"
                                        }
                                      </h4>
                                      </div> 
                                  </div>
                                    <div class="main-flex-container">
                                      <div class="flex-item card-header">
                                      <h4>
                                        <b>Followers:</b> ${user2Data.followers}
                                    </h4>
                                    </div>
                                  <div class="flex-item card-header">
                                    <h4>
                                        <b>Following:</b> ${user2Data.following}
                                    </h4>
                                    </div>
                                </div>
                                </div>
                            </div>
                              <p style="margin-left: 5px;" class="alert alert-info">Stars: 3 points, Forks: 5 points, Followers: 1 point, Public repos: 1 point</p>
                            `;
                      html += `<canvas id="myChart" width="400" height="400"></canvas>`;
                      document.body.insertAdjacentHTML("beforeend", html);
                      const ctx = document
                        .getElementById("myChart")
                        .getContext("2d");
                      const myChart = new Chart(ctx, {
                        type: "bar",
                        data: {
                          labels: [user1Data.name, user2Data.name],
                          datasets: [
                            {
                              label: "Score",
                              data: [total_score1, total_score2],
                              backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                              ],
                              borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                              ],
                              borderWidth: 1,
                            },
                          ],
                        },
                        options: {
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                        },
                      });
                    });
                });
            }
          });
      });
  } else {
    document.getElementById("mandatoryerror1").style.display = "block";
    document.getElementById("mandatoryerror2").style.display = "block";
  }
}
