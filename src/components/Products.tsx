import { useEffect, useState } from 'react';
import '../styles/app.css'
import { Pagination } from './Pagination';

interface Props {
  addItemToCart: Function
  products: Item[]
}

interface Item {
  id: string
  productName: string
  description: string
  unitPrice: number
  category: string
  imageUrl: string
}

/*!TODO
  mobile view
  Cart section
    - remove item
    - checkout alert
*/


const sortArray = (arr: Array<Item>, sortBy: string) => {
  const sorted = arr;
  if(sortBy === 'low to high') {
    sorted.sort((a,b) => a.unitPrice - b.unitPrice);
  } else if (sortBy === 'high to low') {
    sorted.sort((a,b) => b.unitPrice - a.unitPrice);
  } 
  return sorted;
}



export const Products = ({ addItemToCart, products }: Props) => {
  const [sortBy, setSortBy] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      filterProductsByQuery();
    }, 500)
    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  useEffect(() => {
    filterProductsByQuery();
  }, [products])

  const handleChangeSort = () => {
    if(sortBy === '') {
      setSortBy('low to high');
    } else if (sortBy === 'low to high') {
      setSortBy('high to low');
    } else {
      setSortBy('');
    }
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const filterProductsByQuery = () => {
    const filtered = products.filter((e) => {
      return e.productName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  let currentProducts = sortArray(filteredProducts, sortBy)
  currentProducts = currentProducts.slice(indexOfFirstItem, indexOfLastItem)
  
  return (
    <div className="products">
      <div className="search-container">
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} className="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Search Item" />
      </div>
      <div className="justify-content-end">
        <button type="button" onClick={() => handleChangeSort()} className="btn btn-link">Sort price {sortBy}</button>
      </div>
      <div className="product-list">
        <ul className="list-group">
          {filteredProducts.length === 0 ? 'Item not found' : ''}
          {currentProducts.map((item) => {
            return (
                <li className="list-group-item product-item mb-3" key={item.id}>
                  <div className="image-container">
                    <img src={item.imageUrl} alt={item.productName} />
                  </div>
                  <div className="product-info">
                    <div className="product-name">
                      {item.productName}
                    </div>
                    <div className="product-category">
                      {item.category[0].toUpperCase() + item.category.slice(1)}
                    </div>
                    <div className="product-description text-muted">
                      {item.description}
                    </div>
                  </div>
                  <div className="product-price">
                    <span className="unit-price">₱{item.unitPrice}</span>
                    
                    <button type="button" onClick={() => addItemToCart(item)} className="btn btn-green">Add to Cart</button>

                  </div>
                </li>
            )
          })}
        </ul>
      </div>
      <div className="justify-content-end">
        <Pagination 
          itemsPerPage={10} 
          totalItems={filteredProducts.length} 
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}
