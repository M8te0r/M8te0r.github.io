// docs/javascripts/math-and-highlight.js
document.addEventListener("DOMContentLoaded", function() {
  // KaTeX auto-render (convert $...$ and $$...$$ to rendered math)
  if (typeof renderMathInElement === "function") {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ],
      throwOnError: false
    });
  } else {
    console.warn("KaTeX auto-render not loaded.");
  }

  // highlight.js: highlight all code blocks
  if (typeof hljs !== "undefined") {
    document.querySelectorAll('pre code').forEach((block) => {
      try { hljs.highlightElement(block); } catch (e) {}
    });
  } else {
    console.warn("highlight.js not loaded.");
  }
});
