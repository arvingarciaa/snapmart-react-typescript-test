import { useEffect } from 'react'
import '../styles/app.css'

interface Props {
  cart: Item[]
  handleClearCart: Function
  handleItemCountChange: Function
  handleItemCountIncrease: Function
  handleItemCountDecrease: Function
  handleRemoveItem: Function
  handleCheckout: Function
}

interface Item {
  id: string
  productName: string
  unitPrice: number
  imageUrl: string
  count: number
}

export const Cart = ({cart, handleClearCart, handleItemCountChange, handleItemCountIncrease, handleItemCountDecrease, handleRemoveItem, handleCheckout}: Props) => {
  return (
    <div className="cart">
      <div className="cart-header">
        <span>My Cart</span>
        <div>
          <button className='btn btn-red' onClick={() => handleClearCart()}>Clear Cart</button>
        </div>
      </div>
      <div className="cart-items">
        <div className="product-list">
          <ul className="list-group">
            {cart.length <= 0 && 
              <div className="m-3">Your cart is empty</div>
            }
            {cart.map((item, idx) => {
              return(
                <li className="list-group-item product-item mb-3" key={item.id} style={{gridTemplateColumns: '1fr 3fr'}}>
                  <div className="cart-image">
                    <img src={item.imageUrl} alt={item.productName} />
                    <button type="button" className="btn btn-danger button-remove" onClick={() => handleRemoveItem(idx)}>
                      <i className='bi bi-x' />
                    </button>
                  </div>
                  <div className="cart-info">
                    <div className="cart-name">
                      {item.productName}
                    </div>
                    <div className="cart-bottom">
                      <div className="cart-price">₱{item.unitPrice}</div> 
                      <div className="cart-button">
                        <button className='down-count btn btn-secondary' title='Down' onClick={() => handleItemCountDecrease(item, idx)}>
                          <i className='bi bi-dash' />
                        </button>
                        <input className='counter w-100' type="text" onChange={(e) => handleItemCountChange(item, e.target.value, idx)} value={item.count} />    
                        <button className='up-count btn btn-secondary' title='Up' onClick={() => handleItemCountIncrease(item)}>
                          <i className='bi bi-plus' />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="cart-checkout">
        <div className="d-flex justify-content-between">
          Total Items:
          <span className="text-red">{cart.reduce((acc, curr) => acc + (1 * curr.count), 0).toFixed(0)}</span>
        </div>
        <div className="d-flex justify-content-between">
          Total Amount
          <span className="total-amount text-red">₱{cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.count), 0).toFixed(2)}</span>
        </div>
        <button className='btn btn-green' onClick={() => handleCheckout()}>Checkout</button>
      </div>
    </div>
  )
}