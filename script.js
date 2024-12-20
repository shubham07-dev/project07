document.addEventListener('DOMContentLoaded', () => {
  const img1 = document.querySelector('.img1');
  const img3 = document.querySelector('.img3');
  const img4 = document.querySelector('.img4');
  const img6 = document.querySelector('.img6');
  const img31 = document.querySelector('.img31');
  const textElements = document.querySelectorAll('.hero h1, .hero h2, .hero p');
  const cards = document.querySelectorAll('.card1, .card2, .card3'); // Include card3

  // Function to trigger animation and make elements stay visible
  function triggerAnimation(entry, animationClass) {
      entry.target.classList.add(animationClass, 'played');
      entry.target.style.opacity = '1'; // Ensure it stays visible during the animation
  }

  // Intersection Observer setup
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Trigger animations for images and text
              if (!entry.target.classList.contains('played')) {
                  if (entry.target === img1) {
                      triggerAnimation(entry, 'play-animation');
                      textElements.forEach(text => {
                          text.classList.add('fade-animation');
                          text.style.opacity = '1';
                      });
                  } else if ([img1, img3, img4, img6, img31].includes(entry.target)) {
                      triggerAnimation(entry, 'play-animation');
                  } else if (entry.target.classList.contains('card1')) {
                      triggerAnimation(entry, 'play-slide-left');
                  } else if (entry.target.classList.contains('card2')) {
                      triggerAnimation(entry, 'play-slide-right');
                  } else if (entry.target.classList.contains('card3')) {
                      triggerAnimation(entry, 'play-slide-left'); // Assign tornado-left for card3
                  }
              }
          } else {
              // Reset animations when out of view
              entry.target.classList.remove('played', 'play-animation', 'play-slide-left', 'play-slide-right');
              entry.target.style.opacity = '0';

              if (entry.target === img1) {
                  textElements.forEach(text => {
                      text.classList.remove('fade-animation');
                      text.style.opacity = '0';
                  });
              }
          }
      });
  }, {
      threshold: 0.5 // Adjust threshold based on when you want animations to start
  });

  // Observe img1, img3, img4, img6, text elements, and cards
  [img1, img3, img4, img6, img31].forEach(img => observer.observe(img));
  textElements.forEach(text => observer.observe(text));
  cards.forEach(card => observer.observe(card));
});

// Tornado animations for individual cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card1, .card2, .card3'); // Include card3

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Add animation classes based on the card
              if (entry.target.classList.contains('card1')) {
                  entry.target.classList.add('tornado-left');
              } else if (entry.target.classList.contains('card2')) {
                  entry.target.classList.add('tornado-right');
              } else if (entry.target.classList.contains('card3')) {
                  entry.target.classList.add('tornado-left'); // Assign tornado-left for card3
              }
          } else {
              // Remove the animation classes when the cards leave the viewport
              if (entry.target.classList.contains('card1')) {
                  entry.target.classList.remove('tornado-left');
              } else if (entry.target.classList.contains('card2')) {
                  entry.target.classList.remove('tornado-right');
              } else if (entry.target.classList.contains('card3')) {
                  entry.target.classList.remove('tornado-left');
              }
          }
      });
  }, {
      threshold: 0.5, // Adjust this value for when the animation should trigger
  });

  // Observe all cards
  cards.forEach(card => observer.observe(card));
});

// Redirect function for buttons
function redirectToPage(url) {
    const session = JSON.parse(localStorage.getItem('session')); // Check login session
    if (session && session.loggedIn) {
      // User is logged in, allow redirection
      window.location.href = url;
    } else {
      // User not logged in, redirect to login page
      alert('You must be logged in to access this feature!');
      window.location.href = 'login.html';
    }
  }  
// Check if user is logged in on page load
// Check if user is logged in on page load
window.onload = () => {
    const session = JSON.parse(localStorage.getItem('session')); // Get session from localStorage
    const userInfo = document.getElementById('user-info'); // Element to display name
    const authBtn = document.getElementById('auth-btn'); // Button for login/logout
    
    if (session && session.loggedIn) {
      userInfo.innerText = `Welcome, ${session.name}!`; // Show user's name
      userInfo.style.display = 'block'; // Ensure the user info is visible
      authBtn.innerText = 'Logout'; // Change button text to Logout
    } else {
      userInfo.innerText = ''; // No user data, clear name
      userInfo.style.display = 'none'; // Hide user info if not logged in
      authBtn.innerText = 'Login'; // Button shows "Login"
    }
  };
  

  function handleAuth() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.loggedIn) {
      // Clear session
      localStorage.removeItem('session');
      alert('Logged out successfully!');
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      // Redirect to login page if not logged in
      window.location.href = 'login.html';
    }
  }
  
  window.onload = () => {
  const session = JSON.parse(localStorage.getItem('session')); // Get session from localStorage
  const userInfo = document.getElementById('user-info'); // Element to display name
  const authBtn = document.getElementById('auth-btn'); // Button for login/logout
  const body = document.body; // Reference to the body to add/remove classes

  if (session && session.loggedIn) {
    userInfo.innerText = `Welcome, ${session.name}!`; // Show user's name
    userInfo.style.display = 'block'; // Ensure the user info is visible
    authBtn.innerText = 'Logout'; // Change button text to Logout
    body.classList.add('logged-in'); // Add class for logged-in state
    body.classList.remove('not-logged-in'); // Remove class for logged-out state
  } else {
    userInfo.innerText = ''; // No user data, clear name
    userInfo.style.display = 'none'; // Hide user info if not logged in
    authBtn.innerText = 'Login'; // Button shows "Login"
    body.classList.add('not-logged-in'); // Add class for logged-out state
    body.classList.remove('logged-in'); // Remove class for logged-in state
  }
};

// Handle authentication button
function handleAuth() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session && session.loggedIn) {
    // Clear session
    localStorage.removeItem('session');
    alert('Logged out successfully!');
    window.location.href = 'login.html'; // Redirect to login page
  } else {
    // Redirect to login page if not logged in
    window.location.href = 'login.html';
  }
}
