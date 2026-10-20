
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "./ProductSlice";

function App() {
  const dispatch = useDispatch()
  const products = useSelector(
    (state) => state.product.products
  );
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Electronics")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = ["Electronics","Household","Clothing","Food","Books","Other"]
  const handleAdd = (e) => {
    e.preventDefault()
    if (!name.trim()||price=== ""||Number(price)<0){
      return;
    }
    dispatch(
      addProduct({
         id: crypto.randomUUID(),
        name: name.trim(),
        price: Number(price),
        category: category,
      })
    )
    setName("");
    setPrice("");
    setCategory("Electronics");
  }
  const filteredProducts =
    selectedCategory === "All"?products:products.filter(
          (product) => product.category === selectedCategory
        )
  return (
    <div className="app">
      <h1>Product Manager</h1>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="number" placeholder="Price" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button type="submit">Add Product</button>
      </form>
      <h2>Products</h2>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        >
        <option value="All">All Categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {filteredProducts.length === 0 ? (
        <p>No products in this category.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong>
              {" — ₹"}
              {product.price.toLocaleString("en-IN")}
              {" — "}
              {product.category}

              <button
                onClick={() =>
                  dispatch(deleteProduct(product.id))
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;
