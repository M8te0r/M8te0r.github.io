// math-and-highlight.js
document.addEventListener("DOMContentLoaded", function() {
  // 1) render KaTeX for inline $...$ and display $$...$$
  if (typeof renderMathInElement === "function") {
    renderMathInElement(document.body, {
      // 默认识别 $...$ 与 $$...$$
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ],
      throwOnError: false
    });
  } else {
    console.warn("KaTeX auto-render not found.");
  }

  // 2) highlight.js: highlight all code blocks
  if (typeof hljs !== "undefined") {
    document.querySelectorAll('pre code').forEach((block) => {
      try {
        hljs.highlightElement(block);
      } catch (e) {
        // fallback: ignore
      }
    });
  } else {
    console.warn("highlight.js not found.");
  }
});
