/*
  Author: Kor Dwarshuis, kor@dwarshuis.com
  Created: 2024-03-30
  Description: Highlight menu items based on visibility of corresponding headings in main content. Styling in /assets/css/highlightMenuItems.css
*/

function highlightMenuItems() {
   let lastHeadingInView = null;

   function highlightMenuItem(heading) {
      // Remove highlight from all menu items first
      document.querySelectorAll('#toc_list a').forEach(item => {
         item.classList.remove("highlight-cfib41dyhcd99sm");
      });

      // Highlight the new menu item
      const menuItem = document.querySelector(`#toc_list a[href="#${heading.id}"]`);
      if (menuItem) {
         menuItem.classList.add("highlight-cfib41dyhcd99sm");
         menuItem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
   }

   const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
   };

   const observer = new IntersectionObserver((entries, observer) => {
      // Find all headings currently in view
      const headingsInView = entries.filter(entry => entry.isIntersecting).map(entry => entry.target);

      if (headingsInView.length > 0) {
         // Update last heading in view to the first one found in the current viewport
         lastHeadingInView = headingsInView[0];
         highlightMenuItem(lastHeadingInView);
      } else {
         // No headings are currently in view
         // Highlight the last heading in view if it exists
         if (lastHeadingInView) highlightMenuItem(lastHeadingInView);
      }
   }, options);

   document.querySelectorAll('h2, h3, h4, h5, h6').forEach(target => observer.observe(target));
}

document.addEventListener("DOMContentLoaded", function () {
   highlightMenuItems();
});
