let arr = [
  {
    img_url:
      "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg",
    title: "backgrounds",
    post: "1,294 Posts",
    color: "#dda0dd",
  },
  {
    img_url:
      "https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519__340.jpg",
    title: "fashion",
    post: "1,594 Posts",
    color: "#87cefa",
  },
  {
    img_url:
      "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg",
    title: "nature",
    post: "2,194 Posts",
    color: "#90ee90",
  },
  {
    img_url:
      "https://cdn.pixabay.com/photo/2019/08/06/22/48/artificial-intelligence-4389372__340.jpg",
    title: "science",
    post: "1,194 Posts",
    color: "#f5deb3",
  },
  {
    img_url:
      "https://png.pngtree.com/thumb_back/fh260/background/20191106/pngtree-back-to-school-rectangular-blackboard-education-book-pen-holder-image_321417.jpg",
    title: "education",
    post: "2,294 Posts",
    color: "#4682b4",
  },
  {
    img_url:
      "https://cdn.pixabay.com/photo/2016/12/27/16/01/romantic-1934223__340.jpg",
    title: "feelings",
    post: "2,354 Posts",
    color: "#bc8f8f",
  },
  {
    img_url:
      "https://cdn.pixabay.com/photo/2018/01/01/01/56/yoga-3053488__340.jpg",
    title: "health",
    post: "1,294 Posts",
    color: "#d3d3d3",
  },
  {
    img_url:
      "https://cdn.pixabay.com/photo/2017/04/08/22/26/buddhism-2214532__340.jpg",
    title: "religion",
    post: "1,594 Posts",
    color: "#f08080",
  },
  {
    img_url:
      "https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261__340.jpg",
    title: "people",
    post: "1,694 Posts",
    color: "#cd5c5c",
  },
  {
    img_url:
      "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg",
    title: "places",
    post: "1,194 Posts",
    color: "#8fbc8f",
  },
];

let tbody = document.getElementById("top-body");

arr.map((el) => {
  let div = document.createElement("div");
  div.style.backgroundImage = `url(${el.img_url})`;
  let ndiv = document.createElement("div");
  ndiv.style.background = el.color;
  ndiv.innerText = el.title;
  div.append(ndiv);

  div.addEventListener("click", () => showFilter(el.title));
  tbody.appendChild(div);
});

function showFilter(el) {
  let g = document.getElementsByClassName("masonry");
  g[0].innerHTML = "";
  fetch(
    `https://pixabay.com/api/?key=27303194-6bbe946910e573f4bb4241c7f&q=${el}&image_type=photo&per_page=200`
  )
    .then((data) => data.json())
    .then((data) => data.hits.map((el) => createGrid(el.largeImageURL)))
    .then((data) => console.log(data))
    .then(() => waitForImages());
}



function getData(page, limit) {
  fetch(
    `https://pixabay.com/api/?key=27303194-6bbe946910e573f4bb4241c7f&q=all&image_type=photo&per_page=${limit}&page=${page}`
  )
    .then((data) => data.json())
    .then((data) => data.hits.map((el) => createGrid(el.largeImageURL)))
    .then((data) => console.log(data))

    .then(() => waitForImages());

}
getData(1, 30);

function createGrid(el) {
  let g = document.getElementsByClassName("masonry");
  let div = document.createElement("div");
  div.className = "masonry-item";
  let img = document.createElement("img");
  img.className = "masonry-content";
  img.src = el;
  div.appendChild(img);
  g[0].appendChild(div);
}

function resizeMasonryItem(item) {
  var grid = document.getElementsByClassName("masonry")[0],
    rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    ),
    rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );

  var rowSpan = Math.ceil(
    (item.querySelector(".masonry-content").getBoundingClientRect().height +
      rowGap) /
      (rowHeight + rowGap)
  );

  item.style.gridRowEnd = "span " + rowSpan;

  item.querySelector(".masonry-content").style.height = rowSpan * 10 + "px";
}

function resizeAllMasonryItems() {
  var allItems = document.getElementsByClassName("masonry-item");

  for (var i = 0; i > allItems.length; i++) {
    resizeMasonryItem(allItems[i]);
  }
}

function waitForImages() {
  var allItems = document.getElementsByClassName("masonry-item");
  for (var i = 0; i < allItems.length; i++) {
    imagesLoaded(allItems[i], function (instance) {
      var item = instance.elements[0];
      resizeMasonryItem(item);
    });
  }
}

var masonryEvents = ["load", "resize"];
masonryEvents.forEach(function (event) {
  window.addEventListener(event, resizeAllMasonryItems);
});
let page = 1;

let body = document.getElementById("body");
window.addEventListener("scroll", ()=>infiniteScroll());
function infiniteScroll() {
  
  // console.log(window.scrollY,"hewali",window.body.clientHeight,document.body.scrollHeight);

  if (window.scrollY +  700 >= document.body.scrollHeight) {
    console.log(page);
    page++;
    if (page >= 20) {
      page = 1;
    }
    getData(page, 100);
    removeEventListener("scroll",infiniteScroll);
  }
}

//-------------------------------------------------------------

let searchInput = document.getElementById("search-input");
let autocomeBox = document.querySelector("autocome-box");

searchInput.addEventListener("input", (e) => {
  // console.log("fetching data...");
  // console.log(e.target.value, "-defalut");
  updateDebounce(e.target.value);
})

const updateDebounce = debounce((text) => {
  console.log(text, "-debounce");
  searchData(text);
})

function debounce(fn, delay=1000){
  let timer;
  return function (...args){
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args)
    }, delay);
  }
}

let nav = document.getElementsByClassName("navbar");

window.addEventListener("scroll", () => changeNav());

function changeNav() {
  console.log(body.scrollTop);
  if (window.scrollY >= 500) {
    nav[0].style.background = "#171544";
  } else if (window.scrollY == 0) {
    nav[0].style.backgroundColor = "transparent";
  }
}

getData(page, 30);

function searchData(text) {
  let cont = document.getElementsByClassName("masonry")[0];
  cont.innerHTML = '';
  // console.log(cont)
  fetch(
    `https://pixabay.com/api/?key=27303194-6bbe946910e573f4bb4241c7f&q=${text}&image_type=photo&per_page=200`
  )
    .then((data) => data.json())
    .then((data) => data.hits.map((el) => createGrid(el.largeImageURL)))
    .then(() => waitForImages());
}

