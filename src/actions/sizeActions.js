import { baseUrl } from '../config';


export const LOAD_SIZES = "supreme/productData/LOAD_SIZES";


const loadSizes = list => ({ type: LOAD_SIZES, list });

export const fetchSizes = (id) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/api/size`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const list = await response.json();
        dispatch(loadSizes(list));
    } catch (error) {
        console.error('Failed to fetch sizes:', error);
    }
}
