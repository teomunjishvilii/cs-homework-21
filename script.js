"use strict";

const loadNext = document.getElementById("loadmore");
const loadPrev = document.getElementById("loadprev");

let currentPage = 1;
let totalPages;

// function for the buttons visibility

function updateButtonVisibility() {
  if (currentPage === 1) {
    loadPrev.disabled = true;
    loadPrev.classList.remove("active");
  } else {
    loadPrev.disabled = false;
    loadPrev.classList.add("active");
  }

  if (currentPage === totalPages) {
    loadNext.disabled = true;
    loadNext.classList.remove("active");
  } else {
    loadNext.disabled = false;
    loadNext.classList.add("active");
  }
}

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responseInfo) {
      console.log(responseInfo);
      if (!responseInfo.ok) {
        throw responseInfo.status;
      }
      return responseInfo.json();
    })
    .then(function (responseData) {
      const fragment = document.createDocumentFragment();

      responseData.data.forEach((element) => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = `${element.first_name} ${element.last_name}`;
        li.appendChild(p);

        const img = document.createElement("img");
        img.setAttribute("src", element.avatar);
        li.appendChild(img);
        fragment.appendChild(li);
      });

      document.getElementById("ul-element").innerHTML = " ";
      document.getElementById("ul-element").appendChild(fragment);

      totalPages = responseData.total_pages;
      updateButtonVisibility();
    })
    .catch(function (error) {
      if (error === 404) {
        const pError = document.createElement("p");
        pError.textContent = "Page Not Found";
        document.getElementById("data").appendChild(pError);
      } else {
        const pError = document.createElement("p");
        pError.textContent = "Server Error";
        document.getElementById("data").appendChild(pError);
      }
    });
}
getUsers(currentPage);

loadPrev.addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }
  // currentPage = currentPage - 1;
  // currentPage -= 1;
  currentPage--;
  getUsers(currentPage);
});

loadNext.addEventListener("click", function () {
  if (currentPage === totalPages) {
    return;
  }
  // currentPage =  currentPage + 1;
  // currentPage += 1;
  currentPage++;
  getUsers(currentPage);
});
