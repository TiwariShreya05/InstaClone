window.onload = function() {

  // ---------------- DARK MODE ---------------- //
  const toggle = document.getElementById('toggleMode');
  if(toggle){
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
      toggle.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
    });
  }

  // ---------------- USERS & STORIES ---------------- //
  const users = [
    { name: 'Derik', img: 'https://randomuser.me/api/portraits/men/10.jpg' },
    { name: 'Eva', img: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { name: 'Mary', img: 'https://randomuser.me/api/portraits/women/14.jpg' },
    { name: 'Felix', img: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { name: 'Lucy', img: 'https://randomuser.me/api/portraits/women/25.jpg' },
    { name: 'Justin', img: 'https://randomuser.me/api/portraits/men/28.jpg' },
    { name: 'Kristina', img: 'https://randomuser.me/api/portraits/women/30.jpg' }
  ];

  const storiesContainer = document.getElementById('stories');

  // ---------------- POSTS ---------------- //
  let posts = [
    { username:'Felix', image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80', caption:'Milky Way tonight ✨', likes:12, comments:['Amazing!','Wow!'], timestamp:'2 hours ago' },
    { username:'Felix', image:'https://th.bing.com/th/id/R.c59c54610ed9e9ceffd2865a774d5647?rik=2lhuOQRovdbnPw&riu=http%3a%2f%2feskipaper.com%2fimages%2fforest-2.jpg&ehk=vulkLalHUR1ZC5eppVL8JgdyUnTGqUtdFveu6%2bZSjQ8%3d&risl=&pid=ImgRaw&r=0', caption:'Forestyy✨', likes:13, comments:['Amazing!','Wow!'], timestamp:'6 hours ago' },
    { username:'Lucy', image:'https://i.pinimg.com/474x/33/7b/b9/337bb993002b9eaf08af98ece598f829.jpg', caption:'Flower', likes:12, comments:['Amazing!','Wow!'], timestamp:'2 hours ago' },
    { username:'Lucy', image:'https://i.pinimg.com/474x/d0/e9/8c/d0e98c7182a9cedd410c77f95ec8cabc.jpg', caption:'Bow', likes:12, comments:['Amazing!','Wow!'], timestamp:'2 hours ago' },
    { username:'Nick', image:'https://th.bing.com/th/id/R.4bc832972160b011e28697e3b0884232?rik=fF4k6L2xjAhv1Q&riu=http%3a%2f%2fstatic.independent.co.uk%2fs3fs-public%2fthumbnails%2fimage%2f2013%2f01%2f02%2f19%2fSmall-Batch.jpg&ehk=AumbHOfSWTXGsHm69j96Ht58pf%2fPii2kjT1O8%2fQ9eLU%3d&risl=&pid=ImgRaw&r=0', caption:'Coffee Time!!', likes:12, comments:['Amazing!','Wow!'], timestamp:'2 hours ago' },
    { username:'Nick', image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&w=600&q=80', caption:'Morning coding vibes ☕️', likes:8, comments:['Nice!','Love it'], timestamp:'5 hours ago' },
    { username:'Eva', image:'https://i.pinimg.com/474x/d8/b0/ba/d8b0babad9aee882836806b56f4cc6f4.jpg', caption:'Tonight ✨', likes:12, comments:['Amazing!','Wow!'], timestamp:'2 hours ago' },
    { username:'Eva', image:'https://tse1.explicit.bing.net/th/id/OIP.C9MZctnFQ54pcmzPRb0C9QAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', caption:'Dorm Room ', likes:20, comments:['sooo cozyy!!'], timestamp:'3 hours ago' }
  ];

  const feed = document.getElementById('feed');

  function renderPosts(filteredUsers = users, filteredPosts = posts) {
    // Render Stories
    if(storiesContainer){
      storiesContainer.innerHTML = '';
      filteredUsers.forEach(u => {
        const s = document.createElement('div');
        s.classList.add('story');
        s.innerHTML = `<img src="${u.img}" alt="${u.name}" title="${u.name}"><span>${u.name}</span>`;
        s.addEventListener('click', () => alert(`Clicked on ${u.name}'s story!`));
        storiesContainer.appendChild(s);
      });
    }

    // Render Posts
    if(!feed) return;
    feed.innerHTML = '';
    filteredPosts.forEach((post,index) => {
      const user = users.find(u => u.name.toLowerCase() === post.username.toLowerCase());
      const avatar = user ? user.img : 'https://via.placeholder.com/40';

      const postEl = document.createElement('div');
      postEl.classList.add('post');
      postEl.innerHTML = `
        <div class="meta">
          <div class="avatar"><img src="${avatar}" alt="${post.username}"></div>
          <div class="username">${post.username}</div>
        </div>
        <img src="${post.image}" alt="post image">
        <div class="actions">
          <button class="like-btn" data-index="${index}">♡</button>
          <span>${post.likes} likes</span>
        </div>
        <div class="caption"><strong>${post.username}</strong> ${post.caption}</div>
        <div class="comments" id="comments-${index}">
          ${post.comments.map(c=>`<div>${c}</div>`).join('')}
        </div>
        <div class="timestamp">${post.timestamp}</div>
        <div class="add-comment">
          <input type="text" placeholder="Add a comment..." id="input-${index}">
          <button data-index="${index}">Post</button>
        </div>
      `;
      feed.appendChild(postEl);

      // Like button
      const likeBtn = postEl.querySelector('.like-btn');
      const commentBtn = postEl.querySelector('.add-comment button');
      const commentInput = postEl.querySelector(`#input-${index}`);

      if(likeBtn){
        likeBtn.addEventListener('click', () => {
          if(likeBtn.textContent==='♡'){
            likeBtn.textContent='♥';
            posts[index].likes++;
          } else {
            likeBtn.textContent='♡';
            posts[index].likes--;
          }
          renderPosts(filteredUsers, filteredPosts);
        });
      }

      // Comment button
      if(commentBtn && commentInput){
        commentBtn.addEventListener('click', () => {
          const val = commentInput.value.trim();
          if(val!==''){
            posts[index].comments.push(val);
            commentInput.value='';
            renderPosts(filteredUsers, filteredPosts);
          }
        });
      }
    });
  }

  renderPosts();

  // ---------------- ADD POST ---------------- //
  const addPostBtn = document.getElementById('addPost');
  if(addPostBtn){
    addPostBtn.addEventListener('click', () => {
      const username = document.getElementById('newUsername').value.trim();
      const image = document.getElementById('newImage').value.trim();
      const caption = document.getElementById('newCaption').value.trim();

      if(!username || !image){
        alert("Username and Image URL are required!");
        return;
      }

      const tempImg = new Image();
      tempImg.onload = () => {
        posts.unshift({ username, image, caption, likes:0, comments:[], timestamp:'Just now' });
        document.getElementById('newUsername').value='';
        document.getElementById('newImage').value='';
        document.getElementById('newCaption').value='';
        renderPosts();
      };
      tempImg.onerror = () => {
        alert("Invalid image URL!");
      };
      tempImg.src = image;
    });
  }

  // ---------------- SEARCH ---------------- //
  const searchInput = document.querySelector('.search-bar');
  if(searchInput){
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filteredUsers = users.filter(u => u.name.toLowerCase().includes(query));
      const filteredPosts = posts.filter(p => p.username.toLowerCase().includes(query));
      renderPosts(filteredUsers, filteredPosts);
    });
  }

  // ---------------- LOGIN + PASSWORD ---------------- //
  const loginScreen = document.getElementById("loginScreen");
  const loginBtn = document.getElementById("loginBtn");
  const changePassBtn = document.getElementById("changePassBtn");

  const currentUser = "felix";
  let currentPassword = localStorage.getItem("password") || "pass1234";

  // Show/hide login
  if(localStorage.getItem("loggedIn") === "true"){
    if(loginScreen) loginScreen.style.display = "none";
    document.body.style.overflow = "auto";
  } else {
    if(loginScreen) loginScreen.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  // LOGIN
  if(loginBtn){
    loginBtn.addEventListener("click", () => {
      const u = document.getElementById("loginUser").value.trim();
      const p = document.getElementById("loginPass").value.trim();
      if(u === currentUser && p === currentPassword){
        localStorage.setItem("loggedIn","true");
        if(loginScreen) loginScreen.style.display = "none";
        document.body.style.overflow = "auto";
        renderPosts();
      } else {
        alert("Incorrect username or password.");
      }
    });
  }

  // CHANGE PASSWORD
  if(changePassBtn){
    changePassBtn.addEventListener("click", () => {
      const oldPass = prompt("Enter your old password:");
      if(oldPass !== currentPassword){
        alert("Incorrect old password.");
        return;
      }
      const newPass = prompt("Enter new password:");
      if(newPass && newPass.trim() !== ""){
        currentPassword = newPass.trim();
        localStorage.setItem("password", currentPassword);
        alert("Password changed successfully!");
      }
    });
  }
};
