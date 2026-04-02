module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/css/fonts" });

  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // News posts collection — all pages with newsPost: true, sorted newest first
  eleventyConfig.addCollection("newsPosts", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.newsPost === true)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
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
