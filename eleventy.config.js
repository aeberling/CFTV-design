module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/css/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // News posts collection — all pages with newsPost: true, sorted newest first
  eleventyConfig.addCollection("newsPosts", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.newsPost === true)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Current year filter (for copyright)
  eleventyConfig.addFilter("year", function() {
    return new Date().getFullYear();
  });

  // ISO date filter (for sitemap)
  eleventyConfig.addFilter("isoDate", function(date) {
    return new Date(date).toISOString().split('T')[0];
  });

  // String startsWith filter (for sitemap)
  eleventyConfig.addFilter("startsWith", function(str, prefix) {
    return str && str.startsWith(prefix);
  });

  // Date formatting filter
  eleventyConfig.addFilter("formatDate", function(dateStr) {
    const d = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  });

  // Serve dynamic event embed page for any /event/* URL without its own page
  eleventyConfig.setServerOptions({
    middleware: [
      function(req, res, next) {
        var fs = require('fs');
        var path = require('path');
        // Match /event/{slug}/ but not /event/dynamic/
        var match = req.url.match(/^\/event\/([a-zA-Z0-9-]+)\/?$/);
        if (match && match[1] !== 'dynamic') {
          var specificPage = path.join(__dirname, '_site', 'event', match[1], 'index.html');
          // Only rewrite if no specific page exists for this slug
          if (!fs.existsSync(specificPage)) {
            var dynamicPage = path.join(__dirname, '_site', 'event', 'dynamic', 'index.html');
            if (fs.existsSync(dynamicPage)) {
              res.setHeader('Content-Type', 'text/html');
              fs.createReadStream(dynamicPage).pipe(res);
              return;
            }
          }
        }
        next();
      }
    ]
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
