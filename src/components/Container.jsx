import Card from "./Card";

const Container = ({ heading, data = [], handleLoadMore, loading }) => {
  return (
    <div className="flex flex-col mt-20">
      <h1 className="px-5 md:px-10 py-3 lg:px-16 mb-5 font-semibold text-2xl w-full md:w-1/3">
        {heading}
      </h1>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 w-full px-10 mb-16 gap-10 justify-center md:grid-cols-2 lg:grid-cols-3 lg:px-16 xl:grid-cols-4 xl:gap-8">
          {data.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
        <div
          className="bg-background w-32 mb-5 text-white rounded-3xl px-4 py-2 text-center cursor-pointer"
          onClick={handleLoadMore}
        >
          {loading ? "Loading..." : "Load More"}
        </div>
      </div>
    </div>
  );
};

export default Container;
