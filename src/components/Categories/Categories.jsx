import { FallingLines } from "react-loader-spinner"; // Uncomment this line if using FallingLines loader
import axios from "axios";
import { useQuery } from "@tanstack/react-query"; // Make sure this import is from the correct package

export default function Categories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: "allCategories",
    queryFn: getAllCategories,
  });

  console.log(data);
  console.log(isError);
  console.log(isLoading);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <FallingLines
          color="#fff"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  if (isError) {
    return <h2>Error fetching categories</h2>;
  }

  if (!data || !data.data || !data.data.data) {
    return <h2>No categories found</h2>;
  }

  return (
    <div className="container py-5 w-[90%] mx-auto" >
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
        {data.data.data.map((brand) => (
          <div
            key={brand._id}
            className="brand p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="object-cover w-full h-40 rounded-t-xl"
            />
            <h2 className="text-center text-[#027d02] mt-4 font-semibold">
              {brand.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
