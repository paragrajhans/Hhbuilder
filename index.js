var form = document.forms[0],
  householdList = document.getElementsByClassName("household")[0],
  userAge = document.getElementsByName("age")[0],
  userRelationship = document.getElementsByName("rel")[0],
  userSmoker = document.getElementsByName("smoker")[0],
  userAdd = document.getElementsByClassName("add")[0],
  pre = document.getElementsByTagName("pre")[0],
  users = [],
  submit = document.getElementsByTagName("button")[1];

userAdd.addEventListener("click", addUser, false);
submit.addEventListener("click", submitUsers, false);

function addUser(event) {
  event.preventDefault();

  var age = userAge.value,
    relationship = userRelationship.value,
    smoker = userSmoker.checked;

  var error = validateAge(age) + validateRelationship(relationship);

  if (error.length === 0) {
    users.push({
      age: age,
      relationship: relationship,
      smoker: smoker,
    });
    showUsers();
    age.value = "";
    relationship.value = "";
    userSmoker.checked = false;
  } else {
    alert(error);
  }
}

function submitUsers(event) {
  event.preventDefault();
  onSubmit(JSON.stringify(users)).disabled;
}

function onSubmit(submit) {
  pre.innerHTML += submit;
  pre.style.display = "block";
  pre.style.whiteSpace = "pre-wrap";
  pre.style.wordBreak = "keep-all";
  document.body.appendChild(pre);
}

function validateAge(age) {
  return age <= 0 || age === "" || isNaN(age)
    ? "Age must be greater than zero"
    : "";
}

function validateRelationship(relationship) {
  return relationship === "" ? "Please select a relationship" : "";
}

function showUsers() {
  householdList.innerHTML = "";
  for (var i = 0; i < users.length; i++) {
    var user = users[i],
      list = document.createElement("li"),
      userDetails = displayDetails(user),
      deleteUserButton = deleteButton(i);
    list.appendChild(document.createTextNode(userDetails));
    list.appendChild(deleteUserButton);
    householdList.appendChild(list);
  }
}

function displayDetails(user) {
  return (
    "Age =>" +
    user.age +
    "," +
    "Relationship =>" +
    user.relationship +
    "," +
    "Smoker => " +
    user.smoker
  );
}

function deleteButton(index) {
  var deleteUserButton = document.createElement("button");
  deleteUserButton.id = index;
  deleteUserButton.addEventListener("click", deleteUser, false);
  deleteUserButton.appendChild(document.createTextNode("delete"));
  return deleteUserButton;
}

function deleteUser(event) {
  event.preventDefault();
  users.splice(event.target.id, 1);
  showUsers();
}
