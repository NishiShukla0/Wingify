var validName = false;
var validEmail = false;
var validNewsletter = false;

if (window.innerWidth <= 768) {
  setTimeout(openModal, 5000);
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
var modal = document.getElementById("exitModal");
var span = document.getElementsByClassName("close")[0];
function openModal() {
  console.log("testing");
  let user = getCookie("name");
  console.log(user);
  if (document.cookie==='') {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}

span.onclick = function () {
  modal.style.display = "none";
  setCookies("name", "")
  setCookies("email", "")
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    setCookies("name", "")
    setCookies("email", "")
  }
}

function onChangeHandler(id) {
  if (id == "name") {
    document.getElementById("error-name").style.display = "none";
  }

  if (id == "email") {
    document.getElementById("error-email").style.display = "none"
  }

  if (id == "newsletter") {
    document.getElementById('error-message').style.display = 'none'
  }
}

function ValidateForm() {
  const inputEmail = document.getElementById("email");
  const inputName = document.getElementById("name").value;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const checkbox = document.getElementById('newsletter');
  const errorMessage = document.getElementById('error-message');

  if (inputName.trim() === '') {
    document.getElementById("error-name").style.display = "block";
  } else {
    validName = true;
  }

  if (!inputEmail.value.match(mailformat)) {
    document.getElementById("error-email").style.display = "block"
    inputEmail.focus();
  } else {
    validEmail = true;
  }

  if (!checkbox.checked) {
    errorMessage.style.display = 'block';
  } else {
    validNewsletter = true;
  }
  if (validEmail && validName && validNewsletter) {
    setCookies("name", inputName)
    setCookies("email", document.getElementById("email"))
    modal.style.display = "none";
  }
}

function setCookies(cname, cvalue) {
  console.log("cookies");
  const d = new Date();
  d.setTime(d.getTime() + (0.5 * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

