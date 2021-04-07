import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';
import cartItem from '../cart-item/cart-item.component';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <spam className='name'>{name}</spam>
            <spam className='quantity'>
                <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>    
                <spam className='value'>{quantity}</spam>
                <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div> 
            </spam>
            <spam className='price'>{price}</spam>
            <div className='remove-button' onClick={() => clearItem(cartItem)}>
                &#10005;
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
