window.addEventListener('DOMContentLoaded', function (e) {
  document.querySelector('hp-presentation').onclick = handlePresentationClick;
});

function handlePresentationClick(e) {
  alert('clicked');
}
