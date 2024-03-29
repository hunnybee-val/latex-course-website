import data from "./chapters.json" assert { type: "json" };

const start_pages = data.map((a) => a.start);

const left_page = document.createElement("img");
const right_page = document.createElement("img");

const left_number = document.createElement("span");
const right_number = document.createElement("span");

const left_button = document.getElementById("prev-page-button");
const right_button = document.getElementById("next-page-button");

const table_of_contents = document.querySelector(".table-of-contents_list");

var pages = [5, 6];
var chapter = 1;

for (let i = 1; i < 26; i++) {
  const new_chapter = table_of_contents
    .querySelector(".table-of-contents__item")
    .cloneNode(true);
  new_chapter.querySelector(".chapter-button").innerHTML = `Лекция ${i + 1}`;
  new_chapter.querySelector(".chapter-button").id = `${i + 1}`;

  table_of_contents.appendChild(new_chapter);
}

table_of_contents
  .querySelector(".table-of-contents__item:nth-child(1)")
  .classList.add("current-chapter");

left_page.src = `../pdf/img/${pages[0]}.jpeg`;
right_page.src = `../pdf/img/${pages[1]}.jpeg`;

left_number.innerHTML = pages[0];
right_number.innerHTML = pages[1];

left_button.addEventListener("click", prev_page);

right_button.addEventListener("click", next_page);

for (let i = 0; i < 26; i++) {
  document.getElementById(`${i + 1}`).addEventListener("click", function () {
    select_chapter(i);
  });
}
function select_chapter(button_id) {
  pages[0] = data[button_id].start - (data[button_id].start % 2);
  pages[1] = pages[0] + 1;
  page_handler();
}

function chapter_handler(arr, num) {
  var mid;
  var lo = 0;
  var hi = arr.length - 1;
  while (hi - lo > 1) {
    mid = Math.floor((lo + hi) / 2);
    if (arr[mid] < num) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  if (arr[hi] == num) {
    return hi + 1;
  }
  return lo + 1;
}

function page_handler() {
  left_page.src = `../pdf/img/${pages[0]}.jpeg`;
  right_page.src = `../pdf/img/${pages[1]}.jpeg`;

  left_number.innerHTML = pages[0];
  right_number.innerHTML = pages[1];

  table_of_contents
    .querySelector(".current-chapter")
    .classList.remove("current-chapter");

  chapter = chapter_handler(start_pages, pages[1]);

  console.log(start_pages);
  console.log(chapter);

  table_of_contents
    .querySelector(`:nth-child(${chapter} of li)`)
    .classList.add("current-chapter");
  table_of_contents.querySelector(".current-chapter").scrollIntoView();
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
