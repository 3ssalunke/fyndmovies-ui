const Card = ({ item }) => {
  return (
    <div className="flex flex-col rounded-xl px-4 py-2 border-2">
      <h1 className="font-semibold text-2xl">{item.name}</h1>
      <p className="text-sm">
        Directed By <span>{item.director}</span>
      </p>
      <div className="mt-1 flex justify-between items-center">
        <p>
          <span className="font-medium">IMDB Rating </span>
          {item.imdb_score}
        </p>
        <p>
          <span className="font-medium">99popularity</span>{" "}
          {item["99popularity"]}
        </p>
      </div>
      <div className="flex justify-start items-center flex-wrap mt-2">
        {item.genre.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center px-2 py-1 rounded-lg border-2 ml-2 mt-1"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
