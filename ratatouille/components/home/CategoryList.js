import Data from "/shared/Data";
import React, { useState } from "react";
import Image from "next/image";

function CategoryList({onCategoryChange}) {
  const [categoryList, setCategoryList] = useState(Data.CategoryListData);
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <div>
      <h2 className="font-bold">Select Food Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {categoryList.map((item, index) => (
          <div
          key={index}
          onClick={()=>{setSelectedCategory(index);onCategoryChange(item.value)}}
          className={`flex flex-col 
        justify-center 
        items-center bg-gray-100 p-2 m-2 rounded-lg border-blue-400
        grayscale hover:grayscale-0 cursor-pointer ${selectedCategory==index?'grayscale-0 border-2':null}`}>
            <Image src={item.icon} width={40} alt={item.name} height={40} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
