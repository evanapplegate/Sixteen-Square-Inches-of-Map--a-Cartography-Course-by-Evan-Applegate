document.addEventListener('DOMContentLoaded', function() {
    const converter = new showdown.Converter({
        tables: true,
        tasklists: true,
        strikethrough: true,
        ghCodeBlocks: true,
        parseImgDimensions: true
    });
    
    fetch('map_course.md')
        .then(response => response.text())
        .then(markdown => {
            document.getElementById('content').innerHTML = converter.makeHtml(markdown);
        })
        .catch(error => {
            document.getElementById('content').innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
});
