const searchInput = document.querySelector('.search');
const userStatus = document.querySelector('.user-status');
const userPublicRepos = document.querySelector('.user-public-repos');
const userPublicGists = document.querySelector('.user-public-gists');
const userFollowers = document.querySelector('.user-followers');
const userFollowing = document.querySelector('.user-following');
const userInfo = document.querySelector('.user-info');
const userCompany = document.querySelector('.user-info-company');
const userWebsite = document.querySelector('.user-info-web');
const userLocation = document.querySelector('.user-info-location');
const userSince = document.querySelector('.user-info-since');

searchInput.addEventListener('keydown', (e) => { 
  if(e.key === 'Enter') {
    const username = searchInput.value;
    if(username) {
      searchRepos(username);
    }
  }
});


//API 

import { mytoken } from './token.js';
//토큰
const token = mytoken;
// console.log(token);
const apiUrl = 'https://api.github.com/'; // 

fetch(apiUrl, {
    method: 'GET',
    headers: {
        Authorization: `token ${token}`
    },
})
.then(response => {
    if (response.ok) {
        return response.json(); //response.ok가 true 이면 응답 데이터를 JSON 형식으로 파싱
    } else {
        throw new Error('Failed to fetch data from GitHub API');
    }
})
.then(data => { // data = 파싱된 JSON 데이터
    console.log(data); 
})
.catch(error => { //api 응답 실패
    console.error('Error:', error);
});

//user status
