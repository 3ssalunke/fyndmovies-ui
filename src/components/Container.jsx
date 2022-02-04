import Card from "./Card";

const Container = ({ data = [] }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 w-full px-10 mt-24 mb-16 gap-10 justify-center md:grid-cols-2 lg:grid-cols-3 lg:px-16 xl:grid-cols-4 xl:gap-8">
        {data.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
      <div className="bg-background w-32 mb-5 text-white rounded-3xl px-4 py-2 text-center cursor-pointer">
        Load More
      </div>
    </div>
  );
};

export default Container;
