import { posts } from "./database.js";

function createPostHeader(postInfo) {
  const userCardContainer = createDiv("userCard__container");

  const userImg = document.createElement("img");
  userImg.classList.add("userCard__img");
  userImg.src = postInfo.img;

  const infoContainer = createDiv("userCard__info");

  const userName = document.createElement("h2");
  userName.innerText = postInfo.user;

  const userStack = document.createElement("p");
  userStack.innerText = postInfo.stack;

  infoContainer.append(userName, userStack);

  userCardContainer.append(userImg, infoContainer);

  return userCardContainer;
}

function createDiv(className) {
  const newDiv = document.createElement("div");
  newDiv.classList.add(className);

  return newDiv;
}

function renderPosts(postsArray) {
  const feedContainer = document.querySelector(".feed__container");

  for (let i = 0; i < postsArray.length; i++) {
    const newArticle = document.createElement("article");
    newArticle.classList.add("userPost__container");

    const postHeader = createPostHeader(postsArray[i]);

    newArticle.appendChild(postHeader);

    const postTitle = document.createElement("h2");
    postTitle.classList.add("userPost__title");
    postTitle.innerText = postsArray[i].title;

    const postContent = document.createElement("p");
    postContent.classList.add("userPost__content");
    postContent.innerText = postsArray[i].text;

    newArticle.append(postTitle, postContent);

    const buttonsContainer = createDiv("openBtn__container");

    const openBtn = document.createElement("button");
    openBtn.classList.add("userPost__openBtn");
    openBtn.id = postsArray[i].id;
    openBtn.innerText = "Abrir Post";

    const interactionsContainer = createDiv("users_interactions");

    const likeIcon = document.createElement("img");
    likeIcon.classList.add("userPost__likeIcon", "LikeIcon--notLiked");
    likeIcon.src = "./src/assets/img/heart-gray.svg";

    likeIcon.addEventListener('click', () => {

      if(likeIcon.classList.contains('LikeIcon--notLiked')) {

        likeIcon.classList.add('LikeIcon--Liked')
        likeIcon.classList.remove('LikeIcon--notLiked')
        likeIcon.src = "./src/assets/img/heart-red.svg"

        postsArray[i].likes++

        likeCounter.innerText = postsArray[i].likes;

      } else if(likeIcon.classList.contains('LikeIcon--Liked')) {

        likeIcon.classList.add('LikeIcon--notLiked')
        likeIcon.classList.remove('LikeIcon--Liked')
        likeIcon.src = "./src/assets/img/heart-gray.svg"

        postsArray[i].likes--

        likeCounter.innerText = postsArray[i].likes;
      }
    })

    const likeCounter = document.createElement("small");
    likeCounter.classList.add("userPost__likeCounter");
    likeCounter.innerText = postsArray[i].likes;

    interactionsContainer.append(likeIcon, likeCounter);

    buttonsContainer.append(openBtn, interactionsContainer);

    newArticle.appendChild(buttonsContainer);

    feedContainer.appendChild(newArticle);
  }
}

function createPostModal(post) {
  const postContainer = createDiv("userPost__container", "userPost__container--modal");

  const modalPostHeader = createPostHeader(post);

  const modalPostTitle = document.createElement("h2");
  modalPostTitle.classList.add("userPost__title");
  modalPostTitle.innerText = post.title;

  const modalPostContent = document.createElement("p");
  modalPostContent.classList.add("userPost__content", "userPost__content--modal");
  modalPostContent.innerText = post.text;

  const modalCloseButton = document.createElement("span");
  modalCloseButton.classList.add("modal__closeBtn");
  modalCloseButton.innerText = "X";

  postContainer.append(
    modalPostHeader,
    modalPostTitle,
    modalPostContent,
    modalCloseButton
  );

  return postContainer;
}

function handlePostModal(array) {
  const modalcontroller = document.querySelector(".modalPost__controller");
  const postButons = document.querySelectorAll(".userPost__openBtn");
  let postFound = {};

  for (let i = 0; i < postButons.length; i++) {
    postButons[i].addEventListener("click", (event) => {
      for (let postId = 0; postId < array.length; postId++) {
        if(array[postId].id == event.target.id) {
          postFound = array[postId]
        }
      }
      modalcontroller.innerHTML = ''

      const modalCard = createPostModal(postFound)

      modalcontroller.appendChild(modalCard)

      modalcontroller.showModal()

      closeModal()
    });
  }
}

function closeModal() {
  const modalController = document.querySelector('.modalPost__controller')
  const closeBtn = document.querySelector('.modal__closeBtn')
  
  closeBtn.addEventListener('click', () => {
    modalController.close()
  })
}

function followBtn() {
  const followButtons = document.querySelectorAll('.suggestions__followBtn')

  for(let i = 0; i < followButtons.length; i++) {
    followButtons[i].addEventListener('click' , () => {
      if(followButtons[i].classList.contains('suggestion--following')) {
        followButtons[i].classList.remove('suggestion--following')
        followButtons[i].innerText = 'Seguir'
      } else {
        followButtons[i].classList.add('suggestion--following')
        followButtons[i].innerText = 'Seguindo'
      }
    })
  }
}


renderPosts(posts);
handlePostModal(posts)
followBtn()

