const searchInput = document.querySelector('.search');
const viewProfileBtn = document.querySelector('.profile-link-Btn');

const profileImg = document.querySelector('.user-avatar-img');
const userPublicRepos = document.querySelector('.user-status-repos');
const userPublicGists = document.querySelector('.user-status-gists');
const userFollowers = document.querySelector('.user-status-followers');
const userFollowing = document.querySelector('.user-status-following');


const userCompany = document.querySelector('.user-info-company');
const userWebsite = document.querySelector('.user-info-web');
const userLocation = document.querySelector('.user-info-location');
const userSince = document.querySelector('.user-info-since');

const repoList = document.querySelector("#repos");

let userGithub = '';

searchInput.addEventListener("keypress", (e) => {
    if(e.key == "Enter"){
      searchUserData(searchInput.value);
    }
  })
  
  const searchUserData = async (userName) => {
    try{
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const data = await response.json();
  
      //console.log(data);
      if(data.login !== undefined){
          importProfile(data); // ! error...
          importUserRepository(userName);
      }
    }catch(error){
      console.log(error);
    }
  };

//프로필 불러오기
// 데이터만 출력 됌. 해결할 것
const importProfile = (userData) => {
    userGithub = userData.html_url;
    profileImg.src = userData.avatar_url;
    
    userPublicRepos.innerHTML = 'Public Repos: ' + userData.public_repos;
    userPublicGists.innerHTML = 'Public Gists: ' + userData.public_gists;
    userFollowers.innerHTML = 'Followers: ' + userData.followers;
    userFollowing.innerHTML = 'Following: ' +  userData.following;
  
    userCompany.innerHTML = 'Company: ' + userData.company;
    userWebsite.innerHTML = 'Website/Blog: ' + userData.blog;
    userLocation.innerHTML = 'Location: ' + userData.location;
    userSince.innerHTML = 'Member Since: ' + userData.created_at;
  
  }
  
  //버튼 누르면 깃허브로 이동 => 정상 작동
  viewProfileBtn.addEventListener("click", ()=>{
    window.location.href = userGithub;
  })
  
  
  //repository 정보 받아오기 
  const importUserRepository = async (userName) => {
    try{
      const response = await fetch(`https://api.github.com/users/${userName}/repos`);
          const repositories = await response.json();
  
      for(const item of repositories){
        createRepository(item);
      }
  
    }catch(error){
      console.log(error);
    }
  }
  
  //repository 생성 함수 
  function createRepository(item){
    const repoEl = document.createElement('div');
    repoEl.classList.add('repo');
  
    repoEl.innerHTML =
    `
    <div class="repo-title">${item.name}</div>
    <ul class="repo-info">
        <li class="stars">Stars: <span class="stars-count">${item.stargazers_count}</span></li>
        <li class="watchers">Watchers: <span class="watchers-count">${item.watchers_count}</span></li>
        <li class="forks">Forks: <span class="forks-count">${item.forks_count}</span></li>
    </ul>
  `
  
  repoList.append(repoEl);
  
  }