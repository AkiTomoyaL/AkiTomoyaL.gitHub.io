(function () {
  var SHORT_CODE_MAX_LINES = 12;

  function getLineCount(figure) {
    var gutterLines = figure.querySelectorAll('.gutter .line');
    if (gutterLines.length) return gutterLines.length;

    var codeLines = figure.querySelectorAll('.code .line, pre .line');
    if (codeLines.length) return codeLines.length;

    var code = figure.querySelector('.code pre, pre');
    if (!code) return 0;

    var text = code.textContent || '';
    if (!text.trim()) return 0;
    return text.replace(/\n$/, '').split('\n').length;
  }

  function autoExpandShortCodeBlocks() {
    document.querySelectorAll('#article-container figure.highlight').forEach(function (figure) {
      var tools = figure.querySelector(':scope > .highlight-tools');
      if (!tools) return;

      var lines = getLineCount(figure);
      if (!lines) return;

      if (lines <= SHORT_CODE_MAX_LINES) {
        tools.classList.remove('closed');
        figure.classList.add('auto-expanded-short-code');
      } else {
        tools.classList.add('closed');
        figure.classList.remove('auto-expanded-short-code');
      }
    });
  }

  function scheduleAutoExpand() {
    window.requestAnimationFrame(function () {
      autoExpandShortCodeBlocks();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleAutoExpand);
  } else {
    scheduleAutoExpand();
  }

  document.addEventListener('pjax:complete', scheduleAutoExpand);
})();
