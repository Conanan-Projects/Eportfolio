/**
 * Main JavaScript file for the Authentication System
 * Contains common functionality used across multiple pages
 */

// Toggle password visibility
document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.password-toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const passwordInput = button.parentElement.querySelector('input');
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Change the icon appearance
      button.querySelector('.eye-icon').style.opacity = type === 'text' ? '0.7' : '1';
    });
  });
  
  // Check if user is logged in using localStorage
  function checkAuthState() {
    const isLoggedIn = localStorage.getItem('authFlow_isLoggedIn') === 'true';
    const currentPage = window.location.pathname;
    
    // Get page name from path (handles both /page.html and /page)
    const pageName = currentPage.split('/').pop().split('.')[0] || 'index';
    
    if (isLoggedIn) {
      // If logged in and on login or register page, redirect to dashboard
      if (pageName === 'index' || pageName === 'register') {
        window.location.href = 'dashboard.html';
      }
    } else {
      // If not logged in and on dashboard, redirect to login
      if (pageName === 'dashboard') {
        window.location.href = 'index.html';
      }
    }
  }
  
  // Call auth check on page load
  checkAuthState();
  
  // Page transitions
  const pageLinks = document.querySelectorAll('a[href$=".html"]');
  
  pageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetPage = this.getAttribute('href');
      
      // Only handle internal page links
      if (targetPage.startsWith('http') || targetPage.startsWith('//')) {
        return;
      }
      
      e.preventDefault();
      
      // Fade out current page
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 300ms ease-out';
      
      // Navigate to new page after transition
      setTimeout(() => {
        window.location.href = targetPage;
      }, 300);
    });
  });
  
  // Set the opacity back to 1 when the page loads
  document.body.style.opacity = '1';
});

// Apply error styling to form fields
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(`${inputId}-error`);
  
  if (input && errorElement) {
    input.classList.add('error');
    errorElement.textContent = message;
    return false;
  }
  return true;
}

// Clear error styling from form fields
function clearError(inputId) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(`${inputId}-error`);
  
  if (input && errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
  }
}

// Export common functions
export { showError, clearError };