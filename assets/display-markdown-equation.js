// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Configure marked with math support
    marked.use({
        breaks: true,
        gfm: true,
        mangle: false,
        extensions: [{
            name: 'math',
            level: 'block',
            start(src) { return src.match(/\$\$/)?.index; },
            tokenizer(src) {
                const match = src.match(/^\$\$([\s\S]*?)\$\$/);
                if (match) {
                    return {
                        type: 'math',
                        raw: match[0],
                        text: match[1].trim(),
                        tokens: []
                    };
                }
            },
            renderer(token) {
                return `<div class="math math-display">${token.text}</div>`;
            }
        }, {
            name: 'inlineMath',
            level: 'inline',
            start(src) { return src.match(/(?<!\$)\$(?!\$)/)?.index; },
            tokenizer(src) {
                const match = src.match(/^(?<!\$)\$(?!\$)(.*?(?<!\$))\$(?!\$)/);
                if (match) {
                    return {
                        type: 'inlineMath',
                        raw: match[0],
                        text: match[1].trim(),
                        tokens: []
                    };
                }
            },
            renderer(token) {
                return `<span class="math math-inline">${token.text}</span>`;
            }
        }]
    });

    // Configure KaTeX
    window.renderMathInContent = function (element) {
        // Find all math elements
        const mathElements = element.querySelectorAll('.math');
        mathElements.forEach(mathElement => {
            const texContent = mathElement.textContent;
            const isDisplay = mathElement.classList.contains('math-display');
            try {
                katex.render(texContent, mathElement, {
                    displayMode: isDisplay,
                    throwOnError: false,
                    errorColor: '#cc0000'
                });
            } catch (error) {
                console.warn('KaTeX error:', error);
                mathElement.textContent = texContent; // Fallback to raw content
            }
        });
    };
});

async function loadMarkdown(file) {
    try {
        const res = await fetch(file);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const text = await res.text();

        // Parse markdown and get the content element
        const content = document.getElementById('content');

        // Set HTML content with parsed markdown
        content.innerHTML = marked.parse(text);

        // Render math formulas
        window.renderMathInContent(content);

        // Highlight code blocks
        content.querySelectorAll('pre code').forEach((block) => {
            try {
                hljs.highlightElement(block);
            } catch (e) {
                console.warn('Highlight.js error:', e);
            }
        });
    } catch (error) {
        console.error('Error loading markdown:', error);
        document.getElementById('content').innerHTML = `<div class="error">Error loading content: ${error.message}</div>`;
    }
}