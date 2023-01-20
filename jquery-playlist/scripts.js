//<![CDATA[
(async function ($, window) {
  const isDebug = () => {
    return localStorage.getItem("DEBUG") === "true";
  };

  const fetchMovies = async () => {
    const url =
      "//cdn.jsdelivr.net/gh/ravuthz/blog-movies/movies-2023-01-14.json";
    return fetch(url).then((res) => res.json());
  };

  const findMovie = async (title) => {
    const results = await fetchMovies();
    const result1 = results
      ? results.find((item) => item.title === title)
      : null;

    window.index = 0;
    window.items = [];
    window.videos = result1 ? result1.videos : [];

    if (isDebug()) {
      console.log("title: ", title);
      console.log("results: ", results);
      console.log("result1: ", result1);
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

  $(".buttons").html(`
    <div class="buttons">
      <button id="btn-first" onclick="updateIndex(0)">
        <i class="fa-solid fa-backward"></i>
      </button>
      <button id="btn-previous" onclick="updateIndex(index-1)">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button id="btn-next" onclick="updateIndex(index+1)">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
      <button id="btn-last" onclick="updateIndex(items.length-1)">
        <i class="fa-solid fa-forward"></i>
      </button>
    </div>
  `);

  window.findMovie = findMovie;
  window.clickIndex = clickIndex;
  window.updateIndex = updateIndex;
})(jQuery, window);
//]]>
