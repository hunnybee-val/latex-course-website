import data from "./chapters.json" assert { type: "json" };

const left_page = document.createElement("img");
const right_page = document.createElement("img");

const left_number = document.createElement("span");
const right_number = document.createElement("span");

const left_button = document.getElementById("prev-page-button");
const right_button = document.getElementById("next-page-button");

const table_of_contents = document.querySelector(".table-of-contents_list");

for (let i = 1; i < 26; i++) {
  const new_chapter = table_of_contents
    .querySelector(".table-of-contents__item")
    .cloneNode(true);
  new_chapter.querySelector(".chapter-link").innerHTML = `Лекция ${i + 1}`;
  table_of_contents.appendChild(new_chapter);
}
table_of_contents
  .querySelector(".table-of-contents__item:nth-child(1)")
  .classList.add("current-chapter");

var pages = [5, 6];
var chapter = 1;

left_page.src = `../pdf/img/${pages[0]}.jpeg`;
right_page.src = `../pdf/img/${pages[1]}.jpeg`;

left_number.innerHTML = pages[0];
right_number.innerHTML = pages[1];

left_button.addEventListener("click", prev_page);

right_button.addEventListener("click", next_page);

function page_handler() {
  left_page.src = `../pdf/img/${pages[0]}.jpeg`;
  right_page.src = `../pdf/img/${pages[1]}.jpeg`;
  left_number.innerHTML = pages[0];
  right_number.innerHTML = pages[1];
  table_of_contents
    .querySelector(".current-chapter")
    .classList.remove("current-chapter");
  if (pages[1] >= data[Math.ceil(pages[1] / 8) - 1].start) {
    chapter = Math.ceil(pages[1] / 8);
  } else {
    chapter = Math.ceil(pages[1] / 8) - 1;
  }
  console.log(data[Math.ceil(pages[1] / 8) - 1].start);
  console.log(chapter);
  table_of_contents
    .querySelector(`:nth-child(${chapter} of li)`)
    .classList.add("current-chapter");
}

function next_page() {
  pages[0] += 2;
  pages[1] += 2;
  page_handler();
}
function prev_page() {
  pages[0] -= 2;
  pages[1] -= 2;
  page_handler();
}

document.querySelector(".left-page").append(left_page);
document.querySelector(".left-page").append(left_number);

document.querySelector(".right-page").append(right_page);
document.querySelector(".right-page").append(right_number);
