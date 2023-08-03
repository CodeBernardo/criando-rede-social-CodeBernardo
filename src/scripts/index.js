import { posts } from "./database.js";

function renderPosts(postsArray) {
  const feedContainer = document.querySelector(".feed__container");

  function createDiv(className) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(className);

    return newDiv;
  }

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
    openBtn.innerText ='Abrir Post'

    const interactionsContainer = createDiv("users_interactions");

    const likeIcon = document.createElement("img");
    likeIcon.classList.add("userPost__likeIcon");
    likeIcon.src = "./src/assets/img/heart-gray.svg";

    const likeCounter = document.createElement("small");
    likeCounter.classList.add("userPost__likeCounter");
    likeCounter.innerText = postsArray[i].likes;

    interactionsContainer.append(likeIcon, likeCounter);

    buttonsContainer.append(openBtn, interactionsContainer);

    newArticle.appendChild(buttonsContainer);

    feedContainer.appendChild(newArticle);
  }
}

renderPosts(posts);
