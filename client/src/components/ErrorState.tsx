
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import Message from "./../components/Message";
interface ErrorProps {
  error: FetchBaseQueryError | SerializedError;
}

const ErrorState: React.FC<ErrorProps> = ({ error }) => {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    return (
      <Message>
        <div>An error has occurred:</div>
        <div>{errMsg}</div>
      </Message>
    );
  } else {
    return <Message>{error.message}</Message>;
  }
};

export default ErrorState