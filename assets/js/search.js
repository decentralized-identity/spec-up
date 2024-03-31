/*
  Author: Kor Dwarshuis, kor@dwarshuis.com
  Created: 2024-03-29
  Description: In–page search functionality. Styling in /assets/css/search.css
  
  Adds "instant search" or "dynamic search" (results while you type). This feature provides users with immediate feedback by displaying search results or suggestions as they input text, enhancing the user experience by making information discovery faster and more interactive. The search results are highlighted in the text. The page scrolls to the first result.

  SEARCH RESULT STYLES:

  Different styles for the search results can be configured in the "searchHighlightStyle" specConfig object in the specs.json file. The following styles are available:
  
  DIF,ToIP,BTC,KERI,SSI,GLEIF (case insensitive)

*/

function inPageSearch() {
   /*****************/
   /* CONFIGURATION */

   const domInjectAfter = document.getElementById("logo");// Inject the search bar after this element
   const hitsStyle = specConfig.searchHighlightStyle || 'ssi';
   const searchId = 'search-h7vc6omi2hr2880';
   const debounceTime = 600;
   const hits = 'results';// What to display after the number of hits
   const searchBarPlaceholder = 'Search';

   /* END CONFIGURATION */
   /*********************/

   // See styles in /assets/css/search.css
   const hitsStyleSelector = {
      dif: 'highlight-hits-DIF-h7vc6omi2hr2880',
      toip: 'highlight-hits-ToIP-h7vc6omi2hr2880',
      btc: 'highlight-hits-BTC-h7vc6omi2hr2880',
      keri: 'highlight-hits-KERI-h7vc6omi2hr2880',
      ssi: 'highlight-hits-SSI-h7vc6omi2hr2880',
      gleif: 'highlight-hits-GLEIF-h7vc6omi2hr2880'
   };

   const highlightClassName = hitsStyleSelector[hitsStyle.toLowerCase()];

   // Add an input element (for search) after the element with the id “logo”
   let search = document.createElement("input");
   search.setAttribute("type", "text");
   search.setAttribute("id", searchId);
   search.setAttribute("placeholder", searchBarPlaceholder);
   domInjectAfter.after(search);

   // Add number of hits
   let totalHitsSpan = document.createElement("span");
   totalHitsSpan.setAttribute("id", "total-hits");
   totalHitsSpan.innerHTML = `0 ${hits}`;
   search.after(totalHitsSpan);

   let totalHits = 0;

   function scrollToElementCenter(element) {
      // First, bring the element into view
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Calculate the necessary adjustment to center the element
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middleDiff = (window.innerHeight - elementRect.height) / 2;
      const scrollTo = absoluteElementTop - middleDiff;

      // Apply the adjustment
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
   }

   function debounce(func, wait) {
      let timeout;
      return function executedFunction() {
         const context = this;
         const args = arguments;
         clearTimeout(timeout);
         timeout = setTimeout(() => func.apply(context, args), wait);
      };
   }

   function removeAllSpans() {
      let spans = document.querySelectorAll('span');
      spans.forEach(span => {
         if (span.className === highlightClassName) {
            span.outerHTML = span.innerHTML;
         }
      });
   }

   // Prepare the debounced function outside the event listener
   const debouncedSearchAndHighlight = debounce(searchAndHighlight, debounceTime);

   // Add an event listener to the input element
   search.addEventListener("input", function () {
      debouncedSearchAndHighlight(search.value);
   });

   function searchAndHighlight(searchString) {

      removeAllSpans();
      const article = document.querySelector('main article');
      if (!article) return; // Exit if no article found
      if (searchString === '') {
         document.querySelectorAll('.' + highlightClassName).forEach(element => element.classList.remove(highlightClassName));

         totalHits = 0;
         totalHitsSpan.innerHTML = `${totalHits} ${hits}`;
         return
      };

      resetHighlights(article);

      let uniqueId = 0;

      function highlightText(node) {
         const nodeText = node.nodeValue;
         const regex = new RegExp(searchString, 'gi');
         let match;
         let lastIndex = 0;
         let fragments = document.createDocumentFragment();

         while ((match = regex.exec(nodeText)) !== null) {
            // Text before match
            fragments.appendChild(document.createTextNode(nodeText.substring(lastIndex, match.index)));

            // Highlighted text
            const highlightSpan = document.createElement('span');
            highlightSpan.textContent = match[0];
            highlightSpan.className = highlightClassName;

            highlightSpan.id = `${highlightClassName}-${uniqueId}`;
            fragments.appendChild(highlightSpan);

            uniqueId++;
            lastIndex = match.index + match[0].length;
         }

         // Remaining text
         fragments.appendChild(document.createTextNode(nodeText.substring(lastIndex)));
         return fragments;
      }

      function searchNodes(node) {
         if (node.nodeType === 3) { // Node.TEXT_NODE
            const fragments = highlightText(node);
            if (fragments.childNodes.length > 1) { // Replace the text node with the fragments if there were matches
               node.parentNode.replaceChild(fragments, node);
            }
         } else if (node.nodeType === 1) { // Node.ELEMENT_NODE
            Array.from(node.childNodes).forEach(searchNodes);
         }
      }

      searchNodes(article);

      let firstHighlight = document.querySelector('.' + highlightClassName);
      if (firstHighlight !== null) {
         scrollToElementCenter(firstHighlight);
      }

      totalHitsSpan.innerHTML = `${uniqueId} ${hits}`;
   }

   // Remove the highlighting spans
   function resetHighlights(article) {
      const highlighted = article.querySelectorAll(highlightClassName);
      highlighted.forEach(span => {
         const parent = span.parentNode;
         parent.replaceChild(document.createTextNode(span.textContent), span);
         parent.normalize(); // This merges adjacent text nodes
      });
   }
}

document.addEventListener("DOMContentLoaded", function () {
   inPageSearch();
});
