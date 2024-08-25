import { useEffect, useState } from "react";

function App() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    if (post) {
      console.log(post);
    }
  }, [post]);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (!post) {
    return <span className="loader z-50"></span>;
  }

  const filteredPost = post.filter((data) => {
    if (
      searchCategory &&
      data.category.toLowerCase().indexOf(searchCategory.toLowerCase()) !== -1
    ) {
      return true;
    }
    if (searchPrice && data.price <= searchPrice) {
      return true;
    }
    if (!searchCategory && !searchPrice) {
      return true;
    }
    return false;
  });

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSearchPrice(e.target.value);
  };

  return (
    <div className="bg-gray-700">
      <div className="container m-auto py-10 flex gap-5 ">
        <input
          placeholder="Search by Category"
          type="search"
          className="w-full border-2  p-3 font-bold"
          onChange={handleCategoryChange}
          value={searchCategory}
        />
        <input
          placeholder="Search by Price"
          type="number"
          className="w-full border-2  p-3 font-bold"
          onChange={handlePriceChange}
          value={searchPrice}
        />
      </div>
      <div className="w-full  bg-gray-700">
        <div className="flex gap-1 flex-wrap justify-around">
          {filteredPost.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded px-4 pt-5 pb-5 mb-4 w-1/2 xl:w-1/5"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-[300px] mb-4 object-contain rounded-t mx-auto"
              />
              <h2 className="text-lg font-bold mb-3">{product.title}</h2>
              <p className="text-gray-600 mb-3">{product.description}</p>
              <p className="text-lg font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
