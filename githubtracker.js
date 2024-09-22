const usernameInput = document.getElementById('usernameInput');
const fetchButton = document.getElementById('fetchButton');
const profileInfoDiv = document.getElementById('profileInfo');

fetchButton.addEventListener('click', async () => {
  const username = usernameInput.value;

  if (!username) {
    profileInfoDiv.textContent = 'Please enter a GitHub username.';
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.ok) {
      const profileHTML = `
        <img src="${data.avatar_url}" alt="Profile Picture">
        <h2>${data.name}</h2>
        <p>Username: ${data.login}</p>
        <p>Bio: ${data.bio}</p>
        <p>Public Repositories: ${data.public_repos}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
         <p>Following: ${data.achievements}</p>
      `;
      profileInfoDiv.innerHTML = profileHTML;
    } else {
      profileInfoDiv.textContent = 'Error fetching profile data.';
    }
  } catch (error) {
    console.error('Error:', error);
    profileInfoDiv.textContent = 'An error occurred. Please try again.';
  }
});
