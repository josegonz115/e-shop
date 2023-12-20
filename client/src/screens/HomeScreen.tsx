import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";
import Pagination from "../components/Pagination";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen: React.FC = () => {
    const { keyword = "", pageNumber = "1" } = useParams();
    const pageInfo = {
        keyword,
        pageNumber: Number(pageNumber),
    };
    const { data, isLoading, error } = useGetProductsQuery(pageInfo);

    if (isLoading) {
        <Loader />;
    }
    if (error) {
        if ("status" in error) {
            const errMsg =
                "error" in error ? error.error : JSON.stringify(error.data);
            console.log(errMsg);
            return (
                <div>
                    <div>An error has occured:</div>
                    <Message variant="danger">{errMsg}</Message>
                </div>
            );
        } else {
            return <Message variant="danger">{error.message}</Message>;
        }
    }
    if (data === undefined || data.products === undefined) {
        return <div>No products found.</div>;
    }

    return (
        <>
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to="/" className="btn btn-light mb-4">
                    Go Back
                </Link>
            )}
            <h1>Latest Products</h1>
            <Row>
                {data.products.map((product) => {
                    return (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    );
                })}
            </Row>
            <Pagination pages={data.pages} page={data.page} keyword={keyword} />
        </>
    );
};

export default HomeScreen;
