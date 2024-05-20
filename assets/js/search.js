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

   const domInjectAfter = document.querySelector('span[issue-count]');// Inject the search bar after this element
   const matchesStyle = specConfig.searchHighlightStyle || 'ssi';
   const antiNameCollisions = 'search-h7vc6omi2hr2880';// random string to be added to classes, id's etc, to prevent name collisions in the global space
   const debounceTime = 600;
   const matches = 'matches';// What text to display after the number of matches
   const searchBarPlaceholder = '🔍';
   const searchableContent = document.querySelector('main article');

   /* END CONFIGURATION */
   /*********************/

   // Styling of search matches. See styles in /assets/css/search.css
   const matchesStyleSelector = {
      dif: 'highlight-matches-DIF-search-h7vc6omi2hr2880',
      toip: 'highlight-matches-ToIP-search-h7vc6omi2hr2880',
      btc: 'highlight-matches-BTC-search-h7vc6omi2hr2880',
      keri: 'highlight-matches-KERI-search-h7vc6omi2hr2880',
      ssi: 'highlight-matches-SSI-search-h7vc6omi2hr2880',
      gleif: 'highlight-matches-GLEIF-search-h7vc6omi2hr2880'
   };


   /* Add DOM elements: search container with search bar, back and forth buttons, and results count */

   let searchContainer = document.createElement("div");
   searchContainer.setAttribute("id", "container-" + antiNameCollisions);
   searchContainer.setAttribute("class", "container-" + antiNameCollisions);
   domInjectAfter.after(searchContainer);

   // Add an input element (for search)
   let searchInput = document.createElement("input");
   searchInput.setAttribute("type", "text");
   searchInput.setAttribute("id", antiNameCollisions);
   searchInput.setAttribute("placeholder", searchBarPlaceholder);
   searchContainer.appendChild(searchInput);

   setTimeout(() => {
      searchInput.focus();
   }, 1000);

   // Add a container for the back and forth buttons
   const backAndForthButtonsContainer = document.createElement("div");
   backAndForthButtonsContainer.setAttribute("id", "back-and-forth-buttons-container-" + antiNameCollisions);

   // Add a back button to the container for the back and forth buttons
   const goToPreviousMatchButton = document.createElement('button');
   goToPreviousMatchButton.setAttribute("id", "one-match-backward-" + antiNameCollisions);
   goToPreviousMatchButton.setAttribute("disabled", "disabled");
   goToPreviousMatchButton.setAttribute("title", "Go to previous match. Shortcut key: Left Arrow");
   goToPreviousMatchButton.textContent = "▲";
   backAndForthButtonsContainer.appendChild(goToPreviousMatchButton);

   // Add a forward button to the container for the back and forth buttons
   const goToNextMatchButton = document.createElement('button');
   goToNextMatchButton.setAttribute("id", "one-match-forward-" + antiNameCollisions);
   goToNextMatchButton.setAttribute("disabled", "disabled");
   goToNextMatchButton.setAttribute("title", "Go to next match. Shortcut key: Right Arrow");
   goToNextMatchButton.textContent = "▼";
   backAndForthButtonsContainer.appendChild(goToNextMatchButton);

   // Add the container for the back and forth buttons
   // search.after(backAndForthButtonsContainer);
   searchContainer.appendChild(backAndForthButtonsContainer);

   // Add number of matches
   const totalMatchesSpan = document.createElement("span");
   totalMatchesSpan.setAttribute("id", "total-matches-" + antiNameCollisions);
   totalMatchesSpan.innerHTML = `0 ${matches}`;
   // backAndForthButtonsContainer.after(totalMatchesSpan);
   searchContainer.appendChild(totalMatchesSpan);

   // Add an event listener to the input element
   searchInput.addEventListener("input", function () {
      debouncedSearchAndHighlight(searchInput.value);
   });
   /* END Add DOM elements */


   const matchesClassName = "highlight-matches-" + antiNameCollisions;
   const matchesStyleSelectorClassName = matchesStyleSelector[matchesStyle.toLowerCase()];


   let totalMatches = 0;
   let activeMatchIndex = -1;

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
      let spans = document.querySelectorAll('span.' + matchesClassName);
      spans.forEach(span => {
         const childNodes = Array.from(span.childNodes);

         // Removes child elements (there are currently no child element b.t.w.)
         childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
               span.removeChild(node);
            }
         });

         if (span.classList.contains(matchesClassName)) {
            span.outerHTML = span.innerHTML;
         }
      });
   }

   function handleBackAndForthButtonsDisabledState() {
      // Backward button
      if (activeMatchIndex <= 0) {
         document.getElementById("one-match-backward-" + antiNameCollisions).setAttribute("disabled", "disabled");
      } else {
         document.getElementById("one-match-backward-" + antiNameCollisions).removeAttribute("disabled");
      }

      // Forward button
      if (activeMatchIndex >= totalMatches - 1) {
         document.getElementById("one-match-forward-" + antiNameCollisions).setAttribute("disabled", "disabled");
      } else {
         document.getElementById("one-match-forward-" + antiNameCollisions).removeAttribute("disabled");
      }
   }

   function setTotalMatches() {
      totalMatchesSpan.innerHTML = `${totalMatches} ${matches}`;
   }

   // Debounce search input. Prepare the debounced function outside the event listener
   const debouncedSearchAndHighlight = debounce(search, debounceTime);

   goToPreviousMatchButton.addEventListener("click", function () {
      activeMatchIndex--;

      const extraHighlightedMatch = document.querySelector("#" + antiNameCollisions + "-" + activeMatchIndex);
      if (extraHighlightedMatch) {
         scrollToElementCenter(extraHighlightedMatch);
      }
      extraHighlightedMatch.classList.add("active");

      // Works in tandem with “transition” in CSS
      setTimeout(() => {
         extraHighlightedMatch.classList.remove("active");
      }, 3000);

      handleBackAndForthButtonsDisabledState();
   });
   goToNextMatchButton.addEventListener("click", function () {
      activeMatchIndex++;

      const extraHighlightedMatch = document.querySelector("#" + antiNameCollisions + "-" + activeMatchIndex);
      if (extraHighlightedMatch) {
         scrollToElementCenter(extraHighlightedMatch);
      }

      extraHighlightedMatch.classList.add("active");

      // Works in tandem with “transition” in CSS
      setTimeout(() => {
         extraHighlightedMatch.classList.remove("active");
      }, 3000);

      handleBackAndForthButtonsDisabledState();
   });

   // key bindings
   document.addEventListener('keyup', (event) => {
      switch (event.key) {
         case "ArrowRight":
            goToNextMatchButton.click(); // Simulate a click on button
            break;

         case "ArrowLeft":
            goToPreviousMatchButton.click(); // Simulate a click on button
            break;
      }
   });

   // Runs after every search input (debounced)
   function search(searchString) {
      // Start clean
      removeAllSpans();

      totalMatches = 0;
      activeMatchIndex = -1;
      // If the search string is empty, return
      if (searchString === '') {
         setTotalMatches();
         return
      };

      let uniqueId = 0;

      // Highlight the text that matches the search string (case-insensitive) with a span element
      function markAndCountMatches(node) {
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
            highlightSpan.classList.add(matchesClassName);
            highlightSpan.classList.add(matchesStyleSelectorClassName);
            highlightSpan.setAttribute("id", antiNameCollisions + "-" + uniqueId);
            fragments.appendChild(highlightSpan);

            // uniqueId starts at 0, so totalMatches is the number of uniqueId's + 1
            totalMatches = uniqueId + 1;

            uniqueId++;

            lastIndex = match.index + match[0].length;
         }

         // Remaining text
         fragments.appendChild(document.createTextNode(nodeText.substring(lastIndex)));
         return fragments;
      }

      // Recursive function that searches all nodes in the DOM tree and highlights the text that matches the search string (case-insensitive) with a span element
      function searchNodes(node) {
         if (node.nodeType === 3) { // Node.TEXT_NODE
            const fragments = markAndCountMatches(node);
            if (fragments.childNodes.length > 1) {
               // Replace the text node with the fragments if there were matches
               node.parentNode.replaceChild(fragments, node);
            }
         } else if (node.nodeType === 1) { // Node.ELEMENT_NODE
            Array.from(node.childNodes).forEach(searchNodes);
         }
      }

      searchNodes(searchableContent);

      // Scroll to the first match
      // Using querySelector instead of querySelectorAll because we only want to select the first element
      let firstHighlight = document.querySelector('.' + matchesStyleSelectorClassName);
      if (firstHighlight !== null) {
         scrollToElementCenter(firstHighlight);
      }

      // Update the total matches counter
      setTotalMatches();

      // Disable the back and forth buttons if there are no matches
      handleBackAndForthButtonsDisabledState();

      // Update the active match index
      activeMatchIndex = -1;
   }
}

document.addEventListener("DOMContentLoaded", function () {
   inPageSearch();
});
