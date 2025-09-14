import Button from 'components/Button';
import Text from 'components/Text';
import type { FallbackProps } from 'react-error-boundary';

const AppErrorBoundoryFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <Text>Sorry, i'm fall...</Text>
      <Button onClick={resetErrorBoundary}>Refresh?</Button>
    </div>
  );
};

export default AppErrorBoundoryFallback;
