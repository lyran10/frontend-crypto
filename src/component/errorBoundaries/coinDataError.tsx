import React, { useState, useEffect, ReactNode } from 'react';

type Props = {
  fallback: string;
  children: ReactNode;
};

const ErrorBoundary: React.FC<Props> = ({ fallback, children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      setHasError(true);
    };

    window.addEventListener('unhandledrejection', unhandledRejectionHandler);
    return () => {
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
    };
  }, []);
 
  if (hasError) {
    return <span className=''>{fallback}</span>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;

