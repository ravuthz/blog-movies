var MarkdownHighlightInBlogger = {};

MarkdownHighlightInBlogger.unescapeHTML = function (html) {
  var htmlNode = document.createElement("div");
  htmlNode.innerHTML = html;
  return htmlNode.innerText !== undefined ? htmlNode.innerText : htmlNode.textContent;
};

MarkdownHighlightInBlogger.convertMD = function () {
  try {

    console.info('Converting markdown using jQuery');

    var converter = new showdown.Converter({});
  
    converter.setFlavor('github');
    
    $('pre.markdown').each(function (i, block) {
      //var rawtext = MarkdownHighlightInBlogger.unescapeHTML(block.innerText);
      var rawText = block.innerText;
      var mdHtml = converter.makeHtml(rawText);
      var mdText = $(mdHtml);
      
      mdText.insertBefore(block);
      block.hidden = true;
      
      console.log({ rawText, mdHtml, mdText });
    });
    
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
  } catch (exc) {
    console.error(exc);
  }
};

$(document).ready(MarkdownHighlightInBlogger.convertMD);
