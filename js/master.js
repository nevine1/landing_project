//check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

//if mainColors is not empty, so we can set this local storage, and then take this value and put it in the root element
// you can set the value of local storage, when you set the value of the root (when changing the color box option)
if (mainColors !== null) {
  console.log(
    "main colors is not empty , so you can set it add this value to the root  "
  );
}

//changing landing-page background
var landing2 = document.querySelector(".landing-page");

setInterval(() => {
  var myimgList = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
  var randNumb = Math.floor(Math.random() * myimgList.length);

  landing2.style.backgroundImage = 'url("img/' + myimgList[randNumb] + '")';
}, 2000);

// ============================ click on gear to show the all setting  ========================
let spin = document.querySelector(".toggle-setting .fa-gear");
let settingBox = document.querySelector(".setting-box");

spin.onclick = function () {
  //adding fa-spin(rotating the gear-box icon) when clicking on gear icon
  this.classList.toggle("fa-spin"); //if using jquery , u can user $(this).toggleClass('fa-spin)

  //showing and hiding the setting box when click on fa-gear icon
  settingBox.classList.toggle("open");
};

//============================ switch color using setting-box ======================================
let colorList = document.querySelectorAll(".colors-list li");

//foreach loop for each li
colorList.forEach(function (li) {
  // click on every list item
  li.addEventListener("click", function (e) {
    //e.target   يعنى بعمل تارجت للعنصر اللى بعمل عليه كليك
    console.log(e.target.dataset.color);
    //set property color on root
    document.documentElement.style.setProperty(
      "--main-clor",
      e.target.dataset.color
    );

    //set the color on root localstorage.setItem(name, value), it means I added the color of the item  I will click  to the local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    //so we need to remove active class from all children, and add the active class to the item I click,
    //to do that , you should use foreach to remove active class for each li we click
    e.target.parentElement
      .querySelectorAll(".active")
      .forEach(function (element) {
        element.classList.remove("active");
      });

    //adding "active" class on li I will click on it
    e.target.classList.add("active");
  });
});

//=======================================================================================================
//==============================switch color using setting-box ====================================
//====================================================================================================
let randBground = document.querySelectorAll(".random-background span");

//foreach loop for each span
randBground.forEach(function (span) {
  // click on every span
  span.addEventListener("click", function (e) {
    //remove all active class from all span, and add active class over the sapn I click on it now
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
//==================================== changing landing-page background ==================================
let landingPage = document.querySelector(".landing-page");

let imgList = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
//making option for changing background yes or no
let backgroundOption = true;

//define a variable to control or to stop the random background
let backgroundInterval;

// function to randomizze background
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(function () {
      let randNum = Math.floor(Math.random() * imgList.length);
      //console.log("img/" + imgList[randNum]);
      landingPage.style.backgroundImage = "url('img/" + imgList[randNum] + "')";
    }, 500);
  }
}
//==================================== moving skills progress  ==================================

window.onscroll = function () {
  //select skill selector
  let ourSkills = document.querySelector(".skills");

  //skills offest top
  let skills_offsetTop = ourSkills.offsetTop; // غالبا بيكون ارتفاع الجزء اللى قبل الجزء اللى اسممه سكيلز بتاعى

  // skills outer height
  let skills_outerHeight = ourSkills.offsetHeight; //offset height gets the height of the element + border + padding;

  // getting window inner height
  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skills_offsetTop + skills_outerHeight - windowHeight) {
    this.console.log("you are at the right position");

    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//==================================== creating pop up for image gallery  ====================================================================
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  //when clicking on each image, and event e will happen
  img.addEventListener("click", (e) => {
    console.log("hello my new image");
    // we should create an overlay to fill the whole document and the image will open  on it
    let overlay = document.createElement("div");

    //add class to this overlay div
    overlay.className = "popup-overlay";

    //append this overlay to the body
    document.body.appendChild(overlay);

    //create pop up
    let popupBox = document.createElement("div");
    //=============================== adding the image alt as an image heading
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");

      let imgtxt = document.createTextNode(img.alt);
      imgHeading.appendChild(imgtxt);
      popupBox.appendChild(imgHeading);
    }
    //add class to popup box
    popupBox.className = "popupBox";

    //create the popup image  when clicking on it
    let popupImage = document.createElement("img");

    //getting image src
    popupImage.src = img.src;

    //add this image to the popup
    popupBox.appendChild(popupImage);

    //append  this popup image to the body
    document.body.appendChild(popupBox);

    //============================== CREATE THE CLOSE SPANE TO CLOSE THE POPUP ===============
    let closeBtn = document.createElement("span");

    //create the close text
    let closeBtnTxt = document.createTextNode("X");

    //append the close text to close button
    closeBtn.appendChild(closeBtnTxt);

    //add class to closeBtn to add some styles to it
    closeBtn.className = "close-Btn";

    //append this close button to the popupBox
    popupBox.appendChild(closeBtn);

    overlay.appendChild(popupBox);
  });
});

//============================== CLOSE  POPUP BOX WHEN CLICKING ON X  ===============
// we can not target the close span directly because it is not in html code, it is added by javascript
document.addEventListener("click", function (e) {
  if (e.target.className == "close-Btn") {
    //remove the popupBox
    //e.target.parentNode.remove(); this is a way to remove the popup box

    //or using this code to remove this popupBox
    document.querySelector(".popupBox").remove();

    //remove the whole overlay and all what it has
    document.querySelector(".popup-overlay").remove();
  }
});
