import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item : { imageUrl, price, name, quantity } }) => (
    <div className='cart-item'>
        <img src={imageUrl} alt='item' />
        <div className='item-details'>
            <spam className='name'> { name } </spam>
            <spam className='price'> { quantity } x ${ price } </spam>
        </div>
    </div>
)

export default CartItem;