
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
// import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
    useUpdateUserMutation,
    useGetUserDetailsQuery,
} from "../../slices/usersApiSlice";
import ErrorState from '../../components/ErrorState'
// import { addDecimals } from "../../utils/cartUtils";

const UserEditScreen = () => {
    const { id: userId = '' } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const {
        data: user,
        isLoading,
        refetch,
        error,
    } = useGetUserDetailsQuery(userId);
    const [updateUser, { isLoading: loadingUpdate }] =
        useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let _id = userId;
            await updateUser({ _id, name, email, isAdmin});
            toast.success("User updated succesfully");
            refetch();
            navigate('/admin/userList');
        } catch (error) {
            toast.error((error as any).data.message || (error as any).error);
        }
    };


    return (
        <>
            <Link to="/admin/userList" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <ErrorState error={error} />
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email" className="my-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isAdmin' className='my-2'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={e=>setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="my-2"
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
