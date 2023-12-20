import bcrypt from 'bcryptjs';
import { user } from '../../client/src/types/interfaces';

const users:user[] = [
    {
        name: "Admin User",
        email: "admin@email.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john@email.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: "Jane Doe",
        email: "jane@email.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },

]

export default users;