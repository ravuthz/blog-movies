//<![CDATA[
(async function ($, window) {
  const isDebug = () => {
    return localStorage.getItem("DEBUG") === "true";
  };

  const fetchMovies = async () => {
    const url =
      "https://raw.githubusercontent.com/ravuthz/blog-movies/master/movies-2023-01-14.json";
    return fetch(url).then((res) => res.json());
  };

  const findMovie = async (title) => {
    const results = await fetchMovies();

    window.index = 0;
    window.items = [];
    window.videos = _.find(results, { title: title }).videos || [];

    if (isDebug()) {
      console.log("title: ", title);
      console.log("results: ", results);
      console.log("videos: ", window.videos);
    }

    updateView();
  };

  function updateView() {
    items = window.videos.map(
      ({ file, title }, idx) =>
        `<button data-src="${file}" data-title="${title}" class="${
          window.index === idx ? "playing" : ""
        }" onclick="clickIndex(${idx})">${idx + 1}</button>`
    );

    $("#btn-first").removeAttr("disabled");
    $("#btn-previous").removeAttr("disabled");
    $("#btn-next").removeAttr("disabled");
    $("#btn-last").removeAttr("disabled");

    if (window.index <= 0) {
      $("#btn-first").attr("disabled", "disabled");
      $("#btn-previous").attr("disabled", "disabled");
    }

    if (window.index >= window.items.length - 1) {
      $("#btn-last").attr("disabled", "disabled");
      $("#btn-next").attr("disabled", "disabled");
    }

    $(".playlist").html(items.join(""));

    const video = window.videos[window.index] || {};

    if (isDebug()) {
      console.log("video: ", video);
    }

    $("#video-title").text(video.title);
    $("#video-frame").attr({
      src: video.file,
      title: video.title,
    });
  }

  const updateIndex = (val) => {
    window.index = val;
    if (val <= 0) {
      window.index = 0;
    }
    if (val >= window.items.length - 1) {
      window.index = window.items.length - 1;
    }
    updateView();
  };

  const clickIndex = (val) => {
    window.index = val;
    updateView();
  };

  window.findMovie = findMovie;
  window.clickIndex = clickIndex;
  window.updateIndex = updateIndex;
})(jQuery, window);
//]]>
