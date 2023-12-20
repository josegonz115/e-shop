import { Pagination as PaginationBS } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

type PaginationProps = {
    pages: number;
    page: number;
    isAdmin?: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
    pages,
    page,
    isAdmin = false,
}) => {
    return pages > 1 ? (
        <PaginationBS>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={
                        !isAdmin
                            ? `/page/${x + 1}`
                            : `/admin/productList/${x + 1}`
                    }
                >
                    <PaginationBS.Item active={x + 1 === page}>
                        {x + 1}
                    </PaginationBS.Item>
                </LinkContainer>
            ))}
        </PaginationBS>
    ) : null;
};

export default Pagination;
