import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import { Cart } from './components/Cart'
import { Products } from './components/Products'
import './styles/app.css'
import './styles/global.css'
import products from './data/items.json';
import Swal from 'sweetalert2'

interface Item {
  id: string
  productName: string
  unitPrice: number
  imageUrl: string
  count: number
  category? : string
  description? : string
}

const getCategories = () => {
  const unique:Array<string> = [];
  for (const item of products) {
    const isDuplicate = unique.find((e) => e === item.category);
    if (!isDuplicate) {
      unique.push(item.category);
    }
  }
  unique.unshift('All Items');
  return unique.map((e) => {
    return e[0].toUpperCase() + e.slice(1).toLowerCase();
  });
}

export default function App() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [itemsCart, setItemsCart] = useState<Item[]>(() => JSON.parse(localStorage.getItem('items') ?? '[]'));
  const [productsArray, setProductsArray] = useState(products)
  const categories = getCategories();

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(itemsCart))
  }, [itemsCart])

  const addItemToCart = (item: Item) => {
    let items = [...itemsCart];
    let tempItem = JSON.parse(JSON.stringify(item));
    delete tempItem.category;
    delete tempItem.description;
    const duplicateIdx = items.findIndex(e => e.productName === tempItem.productName);
    if(duplicateIdx === -1) {
      tempItem.count = 1;
    } else {
      tempItem.count = items[duplicateIdx].count + 1;
      items.splice(duplicateIdx, 1)
    }
    items.unshift(tempItem);
    setItemsCart(items);
  }

  const handleCategoryChange = (idx: number) => {
    setSelectedCategoryIndex(idx)
    const selectedCategory = categories[idx];
    if(selectedCategory === 'All items'){
      setProductsArray(products);
      return
    }
    const filtered = products.filter((e) => {
      return e.category.toLowerCase() === selectedCategory.toLowerCase();
    })
    setProductsArray(filtered);
  }

  const handleClearCart = () => {
    setItemsCart([]);
  }

  const handleItemCountChange = (item: Item, number: number, idx: number) => {
    item.count = number;
    if(number <= 0 || number === null){
      itemsCart.splice(idx, 1);
    }
    setItemsCart([...itemsCart])
  }

  const handleItemCountDecrease = (item: Item, idx: number) => {
    item.count -= 1;
    if(item.count <= 0){
      itemsCart.splice(idx, 1);
    }
    setItemsCart([...itemsCart]);
  }

  const handleItemCountIncrease = (item: Item) => {
    item.count += 1;
    setItemsCart([...itemsCart])
  }

  const handleRemoveItem = (idx: number) => {
    itemsCart.splice(idx, 1);
    setItemsCart([...itemsCart]);
  }

  const handleCheckout = () => {
    if(itemsCart.length <= 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your cart is empty! Please try again.',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Checkout Success!',
        text: 'Thank you for purchasing!',
      })
      handleClearCart();
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="container-xxl content p-0">
          <Sidebar 
            selectedCategoryIndex={selectedCategoryIndex} 
            handleCategoryChange={handleCategoryChange} 
            categories={categories}
          />
          <Products 
            products={productsArray}
            addItemToCart={addItemToCart}
          />
          <Cart 
            handleItemCountChange={handleItemCountChange}
            handleItemCountDecrease={handleItemCountDecrease}
            handleItemCountIncrease={handleItemCountIncrease}
            handleRemoveItem={handleRemoveItem}
            handleCheckout={handleCheckout}
            cart={itemsCart}
            handleClearCart={handleClearCart}
          />
        </div>
        
        </main>
    </>
  )
}
