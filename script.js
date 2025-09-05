
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});


document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav-menu").classList.toggle("active");
  document.getElementById("hamburger").classList.toggle("active");
});


const products = [
  { 
    name: "Laptop", 
    category: "tech", 
    price: 800, 
    rating: 4.5, 
    image: "laptop.avif", 
    link: "https://www.amazon.in/s?k=laptop"
  },
  { 
    name: "Earphones", 
    category: "tech", 
    price: 100, 
    rating: 4.2, 
    image: "earphone.jpeg", 
    link: "https://www.amazon.in/s?k=earphones"
  },
  { 
    name: "Book: Artificial Intelligence", 
    category: "books", 
    price: 20, 
    rating: 4.8, 
    image: "AIbooks.jpeg", 
    link: "https://www.amazon.in/s?k=artificial+intelligence+book"
  },
  { 
    name: "Keyboard", 
    category: "tech", 
    price: 50, 
    rating: 4.0, 
    image: "keyboard.jpeg", 
    link: "https://www.amazon.in/s?k=keyboard"
  }
];


function displayProducts() {
  const category = document.getElementById("filterCategory").value;
  const sortBy = document.getElementById("sortProducts").value;

  
  let filtered = products.filter(p => category === "all" || p.category === category);

  
  filtered.sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-header"><h3>${p.name}</h3></div>
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <p class="project-description">
        Category: ${p.category}<br>
        Price: $${p.price}<br>
        Rating: ${p.rating}
      </p>
      <a href="${p.link}" target="_blank" class="btn btn-primary">Buy Now</a>
    `;
    grid.appendChild(card);
  });
}

document.getElementById("filterCategory").addEventListener("change", displayProducts);
document.getElementById("sortProducts").addEventListener("change", displayProducts);
displayProducts(); 


const todoInput = document.getElementById("taskInput");
const todoList = document.getElementById("taskList");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add Task Function
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  todoInput.value = "";
}

// Render Tasks
function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="todo-actions">
        <button class="complete">${task.completed ? "Undo" : "Complete"}</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Complete / Undo
    li.querySelector(".complete").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    // Delete
    li.querySelector(".delete").addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    todoList.appendChild(li);
  });
}

// Support Enter key
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
