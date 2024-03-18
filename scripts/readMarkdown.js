function showMarkdown() {
    var f = form;
    var xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject('Microsoft.XMLHttp');
    }

    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById('content').innerHTML = marked(xmlhttp.responseText);
      }
    }

    // 向服务器发送请求
    xmlhttp.open('GET', f.q.value, true);
    xmlhttp.send();
  }