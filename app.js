let mainContainer = document.getElementById("mainContainer");
let searchRepo = document.getElementById("searchRepo");
let searchButton = document.getElementById("searchButton");
let websiteName = document.getElementById("websiteName");
let repoContainer = document.getElementById("repoContainer");
let repositoriesContainer = document.getElementById("repositoriesContainer");
let pagesContainer = document.getElementById("pagesContainer");
let footer = document.getElementById("footer");
let profileName = document.getElementById("profileName");
let profileBio = document.getElementById("profileBio");
let profileLocationName = document.getElementById("profileLocationName");
let profileLinks = document.getElementById("profileLinks");
let image = document.getElementById("image");


let token = "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";
let username = searchRepo.value;
let headers = new Headers();
headers.append("Authorization", `token ${token}`);
 


let numberOfRepositories = 10;

let searchingRepo = () =>{
    mainContainer.classList.remove("before");
    searchButton.classList.remove("before-button");
    websiteName.classList.add("d-none");
    repoContainer.classList.remove("d-none");
    footer.classList.remove("d-none");
    searchingRepositories(numberOfRepositories);
}

let showNumberOfRepos= () =>{
    let selectElement = document.getElementById("pageNum")
    let clickedValue = selectElement.value;
    console.log(clickedValue);
    searchingRepositories(clickedValue);
}

let searchingRepositories = (numberOfRepositories) => {

    repositoriesContainer.innerHTML = '';
    pagesContainer.innerHTML = '';

    let token = "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";
    let username = searchRepo.value;
    let headers = new Headers();
    headers.append("Authorization", `token ${token}`);
    // Fetch the user data
  fetch(`https://api.github.com/users/${username}`, { headers: headers })
    .then((response) => response.json())
    .then((userData) => {
      profileName.innerHTML = userData.name;
      profileBio.innerHTML = userData.bio;
      profileLocationName.innerHTML = userData.location;
      profileLinks.innerHTML = userData.html_url;
      image.src = userData.avatar_url;
      // Fetch the repository data
      return fetch(userData.repos_url, { headers: headers });
    })
    .then((response) => response.json())
    .then((reposData) => {
      let x = reposData.length;
      let pages = 0;
      if (x % numberOfRepositories == 0) {
        pages = x / numberOfRepositories;
        console.log("The number of pages required is: " + pages);
      } else {
        pages = parseInt(x / numberOfRepositories) + 1;
        console.log("The number of pages required is: " + pages);
      }
      for (let i = 1; i <= pages; i++) {
        let pageElement = document.createElement("div");
        pagesContainer.appendChild(pageElement);
        pageElement.id = "page";
        let pageNumber = document.createElement("a");
        pageNumber.href = "#"
        pageNumber.innerText = i;
        if(i==1){
            pageNumber.addEventListener('click', function(event){
                event.preventDefault();
            }) 
        }
        pageNumber.addEventListener('click', function(event){
            event.preventDefault();
            pagination(i);
        });
        pageElement.appendChild(pageNumber)
      }
      reposData.slice(0, Math.min(x, numberOfRepositories)).forEach((repo) => {
        // Fetch the languages used in the repository
        fetch(repo.languages_url, { headers: headers })
          .then((response) => response.json())
          .then((languagesData) => {
            let repositoryContainer = document.createElement("div");
            repositoryContainer.classList.add("repository-container");
            repositoriesContainer.appendChild(repositoryContainer);
            let repoName = document.createElement("h3");
            repositoryContainer.appendChild(repoName);
            repoName.id = "repoName";
            repoName.innerText = repo.name;
            let languageContainer = document.createElement("div");
            repositoryContainer.appendChild(languageContainer);
            languageContainer.id = "languageContainer";
            if(Object.keys(languagesData).length<5){
                Object.keys(languagesData).forEach((languageUsed) => {
                    let languageField = document.createElement("div");
                    languageContainer.appendChild(languageField);
                    languageField.id = "language";
                    languageField.innerText = languageUsed;
                });
            }
            else{
                Object.keys(languagesData).slice(0, 3).forEach((languageUsed) => {
                    let languageField = document.createElement("div");
                    languageContainer.appendChild(languageField);
                    languageField.id = "language";
                    languageField.innerText = languageUsed;
                });
            }
          });
      });
    })
    .catch((error) => console.error("Error:", error));
};
let pagination = (i) => {


    repositoriesContainer.innerHTML = '';
    let token = "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";
    let headers = new Headers();
    headers.append("Authorization", `token ${token}`);
    let username = searchRepo.value;
    console.log(username);


  fetch(`https://api.github.com/users/${username}`, { headers: headers })
    .then((response) => response.json())
    .then((userData) => {
      return fetch(userData.repos_url, { headers: headers });
    })
    .then((response) => response.json())
    .then((reposData) => {
      reposData.slice(10 * (i - 1) + 1, 10 * i).forEach((repo) => {
        // Fetch the languages used in the repository
        fetch(repo.languages_url, { headers: headers })
          .then((response) => response.json())
          .then((languagesData) => {
            let repositoryContainer = document.createElement("div");
            repositoryContainer.classList.add("repository-container");
            repositoriesContainer.appendChild(repositoryContainer);
            let repoName = document.createElement("h3");
            repositoryContainer.appendChild(repoName);
            repoName.id = "repoName";
            repoName.innerText = repo.name;
            let languageContainer = document.createElement("div");
            repositoryContainer.appendChild(languageContainer);
            languageContainer.id = "languageContainer";
            if(Object.keys(languagesData).length<5){
                Object.keys(languagesData).forEach((languageUsed) => {
                    let languageField = document.createElement("div");
                    languageContainer.appendChild(languageField);
                    languageField.id = "language";
                    languageField.innerText = languageUsed;
                });
            }
            else{
                Object.keys(languagesData).slice(0, 3).forEach((languageUsed) => {
                    let languageField = document.createElement("div");
                    languageContainer.appendChild(languageField);
                    languageField.id = "language";
                    languageField.innerText = languageUsed;
                });
            }
          });
      });
    })
    .catch((error) => console.error("Error:", error));
};