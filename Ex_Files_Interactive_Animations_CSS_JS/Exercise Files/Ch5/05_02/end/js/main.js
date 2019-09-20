window.addEventListener('DOMContentLoaded', function (e) {
  var presentation = document.querySelector('hp-presentation');

  presentation.onclick = handlePresentationClick;
  presentation.addEventListener('animationend', handleAnimationEnd, false);
});

function handlePresentationClick(e) {
  var current = document.querySelector('hp-slide.active');
  var next = current.nextElementSibling;

  if (next) {
    current.classList.remove('active');
    next.classList.add('active');

    next.querySelectorAll('.match').forEach(function (el) {
      setTimeout(function () { el.classList.remove('match'); }, 0);
    });

    var aa = parseInt(next.getAttribute('data-autoadvance'));

    if (!isNaN(aa)) {
      setTimeout(function (e) {
        handlePresentationClick(e);
      }, aa);
    }

    var osa = next.getAttribute('data-onshow');
    if (osa) {
      window[osa]();
    }
  }
}

function handleAnimationEnd(e) {
  var slide = e.target.closest('hp-slide');
  var aa = slide.getAttribute('data-autoadvance');

  if (aa == 'animationend' && slide.classList.contains('active')) {
    handlePresentationClick(e);
  }
}

function setLearnImage(imageName) {
  var img = document.querySelector('hp-slide.active hp-learn img');

  img.src = 'images/' + imageName + '.svg';
}

var shapes = ['circle', 'diamond', 'square', 'triangle'];

function showLearning() {
  var ii = Math.floor(Math.random() * shapes.length);
  setLearnImage(shapes[ii]);

  var slide = document.querySelector('hp-slide.active');
  slide.classList.remove('learn-yes');
  slide.classList.remove('learn-no');
  slide.classList.add(ii ? 'learn-no' : 'learn-yes');
}

function startLearning(learningDelay) {
  showLearning();

  setTimeout(function () {
    if (learningDelay > 1.1) {
      showLearning();

      learningDelay = Math.pow(learningDelay, 1/1.05);
      startLearning(learningDelay);
    }
  }, learningDelay);
}

function runLearningSequence() {
  startLearning(1500);
}

function animateSVGStep() {
  var slide = document.querySelector('hp-slide.active');

  var svgs = slide.querySelectorAll('svg');

  if (svgs[0].children.length > 0) {
    var el = svgs[0].children[0];

    if (el) {
      svgs[1].appendChild(el.parentNode.removeChild(el));
    }

    return true;
  }

  return false;
}

function animateSVG() {
  if (animateSVGStep()) {
    setTimeout(animateSVG, 30);
  }
}
