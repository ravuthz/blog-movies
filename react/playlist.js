const fetchMovies = async () => {
  const url =
    "https://raw.githubusercontent.com/ravuthz/blog-movies/master/movies-2023-01-14.json";
  return fetch(url).then((res) => res.json());
};

const VideoPlayer = ({ playlist }) => {
  const [current, setCurrent] = React.useState(current || 0);

  const firstIndex = 0;
  const lastIndex = playlist ? playlist.length - 1 : 0;

  const handleItemClick = (index) => {
    setCurrent(index);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleItemIndex = (index) => {
    setCurrent(index);
    if (index <= firstIndex) {
      setCurrent(0);
    }
    if (index >= lastIndex) {
      setCurrent(lastIndex);
    }
  };

  const video =
    playlist && playlist[current] ? playlist[current] : { src: "", title: "" };

  return (
    <div className="player">
      <div className="video">
        <iframe
          width="853"
          height="480"
          frameborder="0"
          allow="autoplay"
          allowfullscreen
          src={video.src || video.file}
          title={video.title}
        />
      </div>

      <div className="controls">
        <div class="buttons">
          <button onClick={() => handleItemIndex(firstIndex)}>
            <i class="fa-solid fa-backward"></i>
          </button>
          <button
            disabled={current <= firstIndex}
            onClick={() => handleItemIndex(current - 1)}
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button
            disabled={current >= lastIndex}
            onClick={() => handleItemIndex(current + 1)}
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
          <button onClick={() => handleItemIndex(lastIndex)}>
            <i class="fa-solid fa-forward"></i>
          </button>
        </div>
      </div>
      <div className="playlist">
        {playlist &&
          playlist.map((item, index) => (
            <button
              className={current === index ? "playing" : ""}
              onClick={() => handleItemClick(index)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

const ReactMovie = ({ index = 0 }) => {
  const [movie, setMovie] = React.useState({ title: "", videos: [] });

  React.useEffect(() => {
    fetchMovies().then((data) => {
      setMovie(data[index]);
    });
  }, []);

  return (
    <div>
      <h1>{movie.title}</h1>
      <VideoPlayer playlist={movie.videos} />
    </div>
  );
};
