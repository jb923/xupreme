import { baseUrl } from '../config';

export const LOAD_PRODUCTS = "supreme/productData/LOAD_PRODUCTS";

const loadProducts = list => ({ type: LOAD_PRODUCTS, list });

export const fetchProducts = () => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/api/all`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const list = await response.json();
        dispatch(loadProducts(list));
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
};
