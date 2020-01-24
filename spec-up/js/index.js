

function delegateEvent(type, selector, fn, container){
  return (container || document).addEventListener(type, e => {
    if (e.target.matches(`${selector}, ${selector} *`)) fn.call(e.target, e);
  });
}


/* Sidebar Interactions */

delegateEvent('pointerup', '.sidebar-toggle', e => sidebar.toggleAttribute('open'));

window.onhashchange = e => {
  sidebar.removeAttribute('open');
}


/* Mermaid Diagrams */

mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral'
});


/* Charts */

document.querySelectorAll('.chartjs').forEach(chart => {
  new Chart(chart, JSON.parse(chart.textContent));
});

