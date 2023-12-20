import { Alert } from "react-bootstrap";
import { ReactNode } from 'react';

interface MessageProps{
    variant?:string;
    children: ReactNode;
}

const Message:React.FC<MessageProps> = ({ variant = 'info', children }) => {
  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
};

// Message.defaultProps = {
//     variant:"info",
// };

export default Message