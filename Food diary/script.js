let entries = [];

function addEntry() {
  const foodInput = document.getElementById("food");
  const caloriesInput = document.getElementById("calories");
  const dateInput = document.getElementById("date");
  const food = foodInput.value;
  const calories = caloriesInput.value;
  const date = dateInput.value;
  if (food && calories && date) {
    entries.push({ food, calories, date });
    foodInput.value = "";
    caloriesInput.value = "";
    dateInput.value = "";
    updateEntries();
    saveEntries();
  }
}

function updateEntries() {
  const entriesList = document.getElementById("entries");
  entriesList.innerHTML = "";
  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    const foodSpan = document.createElement("span");
    const caloriesSpan = document.createElement("span");
    const dateSpan = document.createElement("span");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    foodSpan.textContent = entry.food;
    caloriesSpan.textContent = `${entry.calories} calories`;
    dateSpan.textContent = entry.date;
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      entries.splice(index, 1);
      updateEntries();
      saveEntries();
    });
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      showEditForm(index);
    });
    li.appendChild(foodSpan);
    li.appendChild(caloriesSpan);
    li.appendChild(dateSpan);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    entriesList.appendChild(li);
  });
}

function showEditForm(index) {
  const entry = entries[index];
  const form = document.createElement("form");
  const foodLabel = document.createElement("label");
  const foodInput = document.createElement("input");
  const caloriesLabel = document.createElement("label");
  const caloriesInput = document.createElement("input");
  const dateLabel = document.createElement("label");
  const dateInput = document.createElement("input");
  const saveButton = document.createElement("button");
  foodLabel.textContent = "Food:";
  foodInput.value = entry.food;
  caloriesLabel.textContent = "Calories:";
  caloriesInput.value = entry.calories;
  dateLabel.textContent = "Date:";
  dateInput.value = entry.date;
  saveButton.textContent = "Save";
  form.appendChild(foodLabel);
  form.appendChild(foodInput);
  form.appendChild(caloriesLabel);
  form.appendChild(caloriesInput);
  form.appendChild(dateLabel);
  form.appendChild(dateInput);
  form.appendChild(saveButton);
  saveButton.addEventListener("click", () => {
    const food = foodInput.value;
    const calories = caloriesInput.value;
    const date = dateInput.value;
    if (food && calories && date) {
      entries[index] = { food, calories, date };
      updateEntries();
      saveEntries();
    }
  });
  const entriesList = document.getElementById("entries");
  entriesList.replaceChild(form, entriesList.children[index]);
}

function saveEntries() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function loadEntries() {
  const entriesJSON = localStorage.getItem("entries");
  if (entriesJSON) {
    entries = JSON.parse(entriesJSON);
    updateEntries();
  }
}

loadEntries();