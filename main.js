const data = {
  rating: [
    {
      id: "123",
      name: "Владимир",
      lastName: "Ларионов",
      img: "./male.png",
      points: "463",
    },
    {
      id: "9",
      name: "Владимир",
      lastName: "Сергеев",
      img: "./male.png",
      points: "521",
    },
    {
      id: "231",
      name: "Вениамин",
      lastName: "Васильев",
      img: "./male.png",
      points: "865",
    },
    {
      id: "321",
      name: "Мария",
      lastName: "Логинова",
      img: "./female.png",
      points: "865",
    },
    {
      id: "492",
      name: "Борис",
      lastName: "Казанцев",
      img: "./male.png",
      points: "784",
    },
    {
      id: "452",
      name: "Полина",
      lastName: "Калинина",
      img: "./female.png",
      points: "225",
    },
    {
      id: "796",
      name: "Даниил",
      lastName: "Воробьёв",
      img: "./male.png",
      points: "642",
    },
    {
      id: "4",
      name: "Эрик",
      lastName: "Аксёнов",
      img: "./male.png",
      points: "150",
    },
    {
      id: "1155",
      name: "Иван",
      lastName: "Иванов",
      img: "./male.png",
      points: "100",
    },
    {
      id: "12145",
      name: "Артем",
      lastName: "Алексеев",
      img: "./male.png",
      points: "1000",
    },
  ],
  friends: [
    {
      id: "9",
      name: "Владимир",
      lastName: "Сергеев",
      img: "./male.png",
    },
    {
      id: "4",
      name: "Эрик",
      lastName: "Аксёнов",
      img: "./male.png",
    },
    {
      id: "15411",
      name: "Ирина",
      lastName: "Чеснокова",
      img: "./female.png",
    },
    {
      id: "15564",
      name: "Дарина",
      lastName: "Боброва",
      img: "./female.png",
    },
  ],
};

// ПЕРЕМЕННЫЕ
const STEP = 1;
const START_STEP = 0;
const STEPS = [
  [0, 0],
  [-95, -30],
  [-170, 20],
  [-255, 35],
  [-335, 5],
  [-325, -60],
];
const SLIDER_STEP = 61;
const VISIBLE_SLIDER_CARDS = 8;
//моковый массив замени для демонстрации прокрутки сладера в блоке друзья
const mockFriendsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const friendsList = data.friends;
const sliderControll = (mockFriendsList.length - 1) * SLIDER_STEP;
const canvas = document.querySelector("#canvas");
const toUniversityBtn = canvas.querySelector(".nav-panel__btn--university");
const student = canvas.querySelector(".student");
const sliderBtnLeft = canvas.querySelector(".friends__btn--left");
const sliderBtnRight = canvas.querySelector(".friends__btn--right");
const firstSlide = canvas.querySelector(".friends__card:first-child");
const ratingBtn = canvas.querySelector(".nav-panel__btn--rating");
const ratingModal = canvas.querySelector(".modal");
const modalCloseBtn = canvas.querySelector(".modal__close-btn");
const ratingModalContent = canvas.querySelector(".modal__content");
const ratingList = canvas.querySelector(".rating-list");
const templateRatingItem = document
  .querySelector("#rating-item")
  .content.querySelector(".rating-item");

let stepCounter = 0;

// ФУНКЦИИ
const moveStudent = (x, y) => {
  student.style.transform = `translate(${x}px, ${y}px)`;
};

const renderRatingItem = (dataItem) => {
  const ratingItem = templateRatingItem.cloneNode(true);
  ratingItem.querySelector(".rating-item__place").textContent = dataItem.id;
  ratingItem.querySelector(
    ".rating-item__name"
  ).textContent = `${dataItem.name} ${dataItem.lastName}`;
  ratingItem.querySelector(
    ".rating-item__experience"
  ).textContent = `${dataItem.points}`;

  ratingList.append(ratingItem);

  friendsList.forEach((friend) => {
    if (friend.id === dataItem.id) {
      ratingItem.style.color = "#80CC00";
    }
  });
};

const startApp = () => {
  student.style.transform = `translate(${STEPS[0][0]}px, ${STEPS[0][1]}px)`;
  firstSlide.style.marginLeft = `${0}px`;

  const sortRating = data.rating.sort((a, b) => a.id - b.id);
  sortRating.map((gamer) => renderRatingItem(gamer));
};

// ОБРАБОТЧИКИ СОБЫТИЙ
const onToUniversityBtnClick = () => {
  stepCounter += STEP;
  if (stepCounter < STEPS.length) {
    moveStudent(...STEPS[stepCounter]);
  } else {
    stepCounter = START_STEP;
    moveStudent(...STEPS[stepCounter]);
  }
};

toUniversityBtn.addEventListener("click", onToUniversityBtnClick);

const onSliderBtnLeftClick = () => {
  const curetnMargin = Number.parseInt(firstSlide.style.marginLeft);
  if (Math.abs(curetnMargin) > 0) {
    firstSlide.style.marginLeft = `${curetnMargin + SLIDER_STEP}px`;
  }
};

const onSliderBtnRightClick = () => {
  const curetnMargin = Number.parseInt(firstSlide.style.marginLeft);
  if (Math.abs(curetnMargin) < sliderControll) {
    firstSlide.style.marginLeft = `${curetnMargin - SLIDER_STEP}px`;
  }
};

sliderBtnLeft.addEventListener("click", onSliderBtnLeftClick);
sliderBtnRight.addEventListener("click", onSliderBtnRightClick);

const onRatingBtntClick = () => {
  ratingModal.classList.add("open");
  setTimeout(() => {
    ratingModalContent.classList.add("modal__content--open");
  }, 300);
};

ratingBtn.addEventListener("click", onRatingBtntClick);

const onModalCloseBtnClick = () => {
  ratingModal.classList.remove("open");
  ratingModalContent.classList.remove("modal__content--open");
};

modalCloseBtn.addEventListener("click", onModalCloseBtnClick);

startApp();
