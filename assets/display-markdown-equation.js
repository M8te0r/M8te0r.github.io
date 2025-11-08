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

        // 自动修正图片路径
        const basePath = file.substring(0, file.lastIndexOf('/') + 1); // Markdown 文件所在目录
        content.querySelectorAll('img').forEach(img => {
            img.src = basePath + img.getAttribute('src');
        });

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

async function loadSidebar() {
    const res = await fetch('../assets/sidebar.json');
    const data = await res.json();
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';

    for (const category in data) {
        const h1 = document.createElement('h1');
        h1.textContent = category;
        sidebar.appendChild(h1);

        const rootFiles = data[category]['__root__'] || [];
        if (rootFiles.length > 0) {
            const ulRoot = document.createElement('ul');
            rootFiles.forEach(file => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = file.replace('.md','');
                a.onclick = () => {
                    loadMarkdown(`${category}/${file}`);
                    return false;
                };
                li.appendChild(a);
                ulRoot.appendChild(li);
            });
            sidebar.appendChild(ulRoot);
        }

        for (const subcategory in data[category]) {
            if (subcategory === '__root__') continue; // 跳过根目录文件

            const h2 = document.createElement('h2');
            h2.textContent = subcategory;
            sidebar.appendChild(h2);

            const ul = document.createElement('ul');
            data[category][subcategory].forEach(file => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = file.replace('.md','');
                a.onclick = () => {
                    loadMarkdown(`${category}/${subcategory}/${file}`);
                    return false;
                };
                li.appendChild(a);
                ul.appendChild(li);
            });
            sidebar.appendChild(ul);
        }
    }
}

// 页面加载时生成导航栏
//loadSidebar();
window.addEventListener('DOMContentLoaded', () => {
    loadSidebar();
    // 可以默认加载某篇笔记
    loadMarkdown('Maths/math-concepts.md');
});
