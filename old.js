
  <!-- Particle.js and Script -->
  <script>
    // Initialize likes and comments
    let likeCount = parseInt(localStorage.getItem("likeCount")) || 3000;
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const likeCountEl = document.getElementById("likeCount");
    const commentsDiv = document.getElementById("comments");

    // Display initial data
    likeCountEl.textContent = `${likeCount.toLocaleString()} Likes`;
    displayComments();

    // Add a new comment
    function addComment() {
      const commentInput = document.getElementById("commentInput");
      const commentText = commentInput.value.trim();

      if (commentText === "") {
        alert("Please write a comment!");
        return;
      }

      comments.push(commentText);
      localStorage.setItem("comments", JSON.stringify(comments));
      commentInput.value = "";
      displayComments();
    }

    // Display comments
    function displayComments() {
      commentsDiv.innerHTML = comments
        .map(comment => `<div class="comment"><p>${comment}</p></div>`)
        .join("");
    }

    // Increase like count
    function increaseLike() {
      likeCount += 1;
      localStorage.setItem("likeCount", likeCount);
      likeCountEl.textContent = `${likeCount.toLocaleString()} Likes`;
    }

    // Particle.js Initialization
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ff6347" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 }
        },
        opacity: { value: 0.5, random: false },
        size: { value: 5, random: true },
        line_linked: { enable: true, distance: 150, color: "#ff6347", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none" }
      }
    });

<!-- Disable Inspection Script with Notification -->

  // Function to display the notification
  function showAdminAccessNotification() {
    alert("This site requires admin access to inspect.");
  }

  // Disable Right-Click (Context Menu)
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    showAdminAccessNotification(); // Notify the user
  });

  // Disable F12 (DevTools) and Ctrl+Shift+I (DevTools Shortcut)
  document.addEventListener("keydown", function(e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
      e.preventDefault();
      showAdminAccessNotification(); // Notify the user
    }
  });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Scroll to the target element with a smooth effect
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });


//

const words = ["DevOps Engineer", "Linux Enthusiast", "Web Developer", "Automation Expert", "System Admin", "cybersecurity", "software development", "Grey hat", "Networking", "System security"];
let i = 0;

setInterval(() => {
  document.getElementById("typingEffect").textContent = words[i];
  i = (i + 1) % words.length;
}, 3000);


  // Function to implement typing effect
  function typeWriter(elementId, speed) {
    const element = document.getElementById(elementId);
    const text = element.innerHTML;
    element.innerHTML = ""; // Clear the text initially
    let index = 0;

    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, speed); // Call the function recursively with the delay
      }
    }

    type(); // Start typing
  }

  // Call the function when the page loads
  window.onload = () => {
    typeWriter("typingEffect", 100); // Speed of typing (100ms)
  };

// This code enables smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
</script>
