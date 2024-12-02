var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var siteList = [];


siteList = JSON.parse(localStorage.getItem("allLinks")) || [];
displaySite();


function addWeb() {
  if (!validInput() || !validURL()) {
    alert("Please enter valid inputs.");
    return;
  }

  
  if (siteList.some(site => site.name === siteNameInput.value)) {
    alert("This site already exists.");
    return;
  }

  var siteInfo = {
    name: siteNameInput.value,
    link: siteURLInput.value,
  };

  siteList.push(siteInfo);
  displaySite();
  clearInput();
  localStorage.setItem("allLinks", JSON.stringify(siteList));
}

// عرض المواقع في الجدول
function displaySite() {
  var cartona = "";
  for (var i = 0; i < siteList.length; i++) {
    cartona += `
      <tr class="text-center">
        <td>${i + 1}</td>
        <td>${siteList[i].name}</td>
        <td>
          <button class="btn btn-outline-primary" onclick="visitSite('${siteList[i].link}')">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </button>
        </td>
        <td>
          <button class="btn btn-outline-danger pe-2" onclick="deleteSite(${i})">
            <i class="fa-solid fa-trash-can"></i>Delete
          </button>
        </td>
      </tr>
    `;
  }
  document.getElementById("demo").innerHTML = cartona;
}

function clearInput() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

function visitSite(link) {
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    link = "http://" + link;
  }
  window.open(link);
}

function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("allLinks", JSON.stringify(siteList));
  displaySite();
}

function validInput() {
  var regex = /^.{3,}$/;
  var test = siteNameInput.value.trim();
  if (test === "" || !regex.test(test)) {
    return false;
  } else {
    return true;
  }
}


function validURL() {
  var regex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()+,;=]*)?$/;
  var test = siteURLInput.value.trim();
  if (test === "" || !regex.test(test)) {
    return false;
  } else {
    return true;
  }
}
