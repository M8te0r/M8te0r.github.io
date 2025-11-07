document.addEventListener("DOMContentLoaded", function() {
  // KaTeX 渲染公式
  if (typeof renderMathInElement === "function") {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},   // 块公式
        {left: "$", right: "$", display: false}     // 行内公式
      ],
      throwOnError: false
    });
  }

  // highlight.js 高亮代码块
  if (typeof hljs !== "undefined") {
    document.querySelectorAll('pre code').forEach((block) => {
      try { hljs.highlightElement(block); } catch (e) {}
    });
  }
});
