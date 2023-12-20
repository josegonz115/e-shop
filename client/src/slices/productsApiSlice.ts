import { PRODUCT_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { product, productsPages, review} from "../types/interfaces";

// type ProductType = {
//     _id: string;
//     name: string;
//     image: string;
//     price: number;
//     rating: number;
//     numReviews: number;
// };
// type ProductType = {
//     _id:number,
//     image:string;
//     name:string;
//     rating:number;
//     numReviews:number;
//     price:number;
//     description:string;
//     countInStock:number;
// };

interface PageNumberParam {
    keyword:string;
    pageNumber: number;
};

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<productsPages, PageNumberParam>({
            query: ( {keyword, pageNumber} ) => ({
                url: PRODUCT_URL,
                params: {
                    keyword,
                    pageNumber,
                },
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        // getAllProductsPage: builder.query<product[], void>({
        //     query: () => ({
        //         url: PRODUCT_URL,
        //     }),
        //     keepUnusedDataFor: 5,
        //     providesTags: ['Products'],
        // }),
        getProductDetails: builder.query<product, string | undefined>({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation<product[], void>({
            query: () => ({
                url: PRODUCT_URL,
                method: "POST",
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation<product, Partial<product>>({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data._id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
        uploadProductImage: builder.mutation<product, FormData>({
            query: (data) => ({
                url: UPLOADS_URL,
                method: "POST",
                body: data,
            }),
        }),
        deleteProduct: builder.mutation<product, string>({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE",
            }),
        }),
        createReview: builder.mutation<product, Partial<review>>({
            query: (data)=>({
                url: `${PRODUCT_URL}/${data._id}/reviews`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        getTopProducts: builder.query<product[], void>({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5,
          }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
} = productsApiSlice;
