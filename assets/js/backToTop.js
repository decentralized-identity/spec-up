/*
  Author: Kor Dwarshuis, kor@dwarshuis.com
  Created: 2024-04-01
  Description: 
   Adds a back-to-top button that appears when the user scrolls down the page. When clicked, the page scrolls to the top.
   Styling in /assets/css/backToTop.css
*/

function backToTop() {
   /*****************/
   /* CONFIGURATION */


   /* END CONFIGURATION */
   /*********************/

   const backToTopBtn = document.createElement("a");
   backToTopBtn.id = "back-to-top-a1zncgtqfpzsig8";
   backToTopBtn.href = "#content";
   backToTopBtn.innerHTML = `↑`;
   document.body.appendChild(backToTopBtn);

   function debounce(func, wait) {
      let timeout;
      return function executedFunction() {
         const context = this;
         const args = arguments;
         clearTimeout(timeout);
         timeout = setTimeout(() => func.apply(context, args), wait);
      };
   }

   function handleScroll() {
      if (window.scrollY > 300) {
         backToTopBtn.style.display = "flex";
      } else {
         backToTopBtn.style.display = "none";
      }
   }
   const debouncedSearchAndHighlight = debounce(handleScroll, 600);

   window.addEventListener("scroll", function () {
      debouncedSearchAndHighlight();
   });
}

document.addEventListener("DOMContentLoaded", function () {
   backToTop();
});
