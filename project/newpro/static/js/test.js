document.querySelector(".jsFilter").addEventListener("click", function () {
    document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
    document.querySelector(".list").classList.remove("active");
    document.querySelector(".grid").classList.add("active");
    document.querySelector(".products-area-wrapper").classList.add("gridView");
    document
        .querySelector(".products-area-wrapper")
        .classList.remove("tableView");
});

// document.querySelector(".list").addEventListener("click", function () {
//     document.querySelector(".list").classList.add("active");
//     document.querySelector(".grid").classList.remove("active");
//     document.querySelector(".products-area-wrapper").classList.remove("gridView");
//     document.querySelector(".products-area-wrapper").classList.add("tableView");
// });

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('light');
    modeSwitch.classList.toggle('active');
});



function showDetails(name) {
    document.getElementById('detailContent').innerHTML = `<h2>${name}</h2><p>Here is the full data related to ${name}.</p>`;
    document.getElementById('detailScreen').style.display = 'block';
}
function closeDetails() {
    document.getElementById('detailScreen').style.display = 'none';
}    


function openFollowingPage(userLogin) {
    const modal = document.getElementById('followingModal');
    const followingList = document.getElementById('followingList');

    // Fetch following data from GitHub API
    fetch(`https://api.github.com/users/${userLogin}/following`)
        .then(response => response.json())
        .then(data => {
            // Clear the previous data
            followingList.innerHTML = '';
            if (data.length === 0) {
                // Show message if no followers
                followingList.innerHTML = `
                    <div style="text-align:center; width:100%;">
                        <h3>No following found</h3>
                    </div>
                `;
            } else {
            // Loop through the following data and create user cards
            data.forEach(following => {
                const card = document.createElement('div');
                card.classList.add('following-card');

                card.innerHTML = `
                    <img src="${following.avatar_url}" alt="Avatar">
                    <p>${following.login}</p>
                    <a href="${following.html_url}" target="_blank">View Profile</a>
                `;

                followingList.appendChild(card);
            });
        }
            // Display the modal
            modal.style.display = 'block';
        })
        .catch(error => {
            console.error("Error fetching following data:", error);
            alert('An error occurred while fetching the data.');
        });
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('followingModal');
    modal.style.display = 'none';
}


// Open followers modal
function openFollowersPage(userLogin) {
    const modal = document.getElementById('followingModal');
    const followingList = document.getElementById('followingList');
    const modalTitle = document.getElementById('follow');

    // Fetch followers data
    fetch(`https://api.github.com/users/${userLogin}/followers`)
        .then(response => response.json())
        .then(data => {
            followingList.innerHTML = ''; // Clear previous data
            modalTitle.innerHTML = `<h2> Followers</h2>`; // Set modal title
            if (data.length === 0) {
                // Show message if no followers
                followingList.innerHTML = `
                    <div style="text-align:center; width:100%;">
                        <h3>No followers found</h3>
                    </div>
                `;
            } else {
                // Render followers in cards
                data.forEach(follower => {
                    const card = document.createElement('div');
                    card.classList.add('following-card');
                    card.innerHTML = `
                        <img src="${follower.avatar_url}" alt="Avatar">
                        <p>${follower.login}</p>
                        <a href="${follower.html_url}" target="_blank">View Profile</a>
                    `;
                    followingList.appendChild(card);
                });
            }

            modal.style.display = 'block'; // Show modal
        })
        .catch(error => {
            console.error("Error fetching followers:", error);
            alert('Error loading followers.');
        });
}
function openReposPage(userLogin) {
    const modal = document.getElementById('followingModal');
    const followingList = document.getElementById('followingList');

    fetch(`https://api.github.com/users/${userLogin}/repos`)
        .then(response => response.json())
        .then(data => {
            followingList.innerHTML = '';

            if (data.length === 0) {
                followingList.innerHTML = `
                    <div style="text-align:center; width:100%;">
                        <h3>No repositories found</h3>
                    </div>
                `;
            } else {
                data.forEach(repo => {
                    const card = document.createElement('div');
                    card.classList.add('following-card'); // reuse styling
                    card.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p><strong>Language:</strong> ${repo.language || 'N/A'}</p>
                        <p><strong>Description:</strong> ${repo.description || 'No description'}</p>
                        <p><strong>Stars:</strong> ⭐ ${repo.stargazers_count}</p>
                        <p><strong>Forks:</strong> 🍴 ${repo.forks_count}</p>
                        <a href="${repo.html_url}" target="_blank">🔗 View Repo</a>
                    `;
                    followingList.appendChild(card);
                });
            }

            modal.style.display = 'block';
        })
        .catch(error => {
            console.error("Error fetching repos:", error);
            alert('Error loading repositories.');
        });
}

function openSubscriptionsPage(userLogin) {
    const modal = document.getElementById('followingModal');
    const followingList = document.getElementById('followingList');

    fetch(`https://api.github.com/users/${userLogin}/subscriptions`)
        .then(response => response.json())
        .then(data => {
            followingList.innerHTML = '';

            if (data.length === 0) {
                followingList.innerHTML = `
                    <div style="text-align:center; width:100%;">
                        <h3>No subscriptions found</h3>
                    </div>
                `;
            } else {
                data.forEach(repo => {
                    const card = document.createElement('div');
                    card.classList.add('following-card'); // reuse styling
                    card.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p><strong>Owner:</strong> ${repo.owner.login}</p>
                        <p><strong>Language:</strong> ${repo.language || 'N/A'}</p>
                        <p><strong>Description:</strong> ${repo.description || 'No description'}</p>
                        <p><strong>Stars:</strong> ⭐ ${repo.stargazers_count}</p>
                        <p><strong>Forks:</strong> 🍴 ${repo.forks_count}</p>
                        <a href="${repo.html_url}" target="_blank">🔗 View Repo</a>
                    `;
                    followingList.appendChild(card);
                });
            }

            modal.style.display = 'block';
        })
        .catch(error => {
            console.error("Error fetching subscriptions:", error);
            alert('Error loading subscriptions.');
        });
}



function showFollowers(followers) {
   
    const popup = document.getElementById("popup");
    const followersText = document.getElementById("followersText");

    if (!followers || isNaN(followers) || followers < 0) {
        followersText.textContent = "Please enter a valid number of followers.";
    } else {
        followersText.textContent = `You have ${followers} follower${followers != 1 ? 's' : ''}!`;
    }

    popup.style.display = "flex";
}

function closePopup() {
document.getElementById("popup").style.display = "none";
}




function showFollowing(following) {

    const popup = document.getElementById("popup");
    const followingText = document.getElementById("followersText");

    if (!following || isNaN(following) || following < 0) {
        followingText.textContent = "Please enter a valid number of following.";
    } else {
        followingText.textContent = `You have ${following} following${following != 1 ? 's' : ''}!`;
    }

    popup.style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}





function showTweets(Tweets) {

    const popup = document.getElementById("popup");
    const TweetsText = document.getElementById("followersText");

    if (!Tweets || isNaN(Tweets) || Tweets < 0) {
        TweetsText.textContent = "Please enter a valid number of Tweets.";
    } else {
        TweetsText.textContent = `You have ${Tweets} Tweets${Tweets != 1 ? 's' : ''}!`;
    }

    popup.style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
    
    