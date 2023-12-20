import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import ErrorState from "./ErrorState";
import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return isLoading  ? (
        <Loader />
    ) : error ? (
        <ErrorState error={error} />
    ) : products === undefined ? (
        <Message>No products were found</Message>
    ) :  (
        <Carousel pause="hover" className="bg-primary mb-4">
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;
