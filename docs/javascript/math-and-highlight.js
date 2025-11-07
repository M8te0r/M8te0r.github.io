document.addEventListener("DOMContentLoaded", function() {
  // 渲染数学公式
  if (typeof renderMathInElement === "function") {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ],
      throwOnError: false
    });
  }

  // 代码高亮
  if (typeof hljs !== "undefined") {
    document.querySelectorAll('pre code').forEach((block) => {
      try { hljs.highlightElement(block); } catch (e) {}
    });
  }
});
