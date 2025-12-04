import * as httpRequest from '~/utils/httpRequest';

export const search = async (productkey) => {
    try {
        const res = await httpRequest.get('Product/search', {
            params: {
                productkey,
            },
        });

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
