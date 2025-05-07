import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ products }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-[300px]">
      <div className="relative">
        <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="w-full border rounded-xl pl-10 py-1 pr-3 outline-none"
          placeholder="Tìm kiếm sản phẩm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {query && (
        <div className="absolute bg-white  rounded shadow w-full z-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/products/${product.slug}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <span>{product.name}</span>
              </div>
            ))
          ) : (
            <div className="px-2 py-2 text-gray-500">
              Không tìm thấy sản phẩm
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
