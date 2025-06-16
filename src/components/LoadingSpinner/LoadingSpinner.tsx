import { CircularProgress, CircularProgressProps } from '@mui/material';
import { Box } from '@mui/material';

export type LoadingSpinnerProps = CircularProgressProps & {
  position?: 'right' | 'left' | 'center';
};

/**
 * A loading spinner component that displays a circular progress indicator.
 *
 * @param props.position - The horizontal alignment position of the spinner within its container
 * @param props...props - Additional props passed to the underlying CircularProgress component
 *
 * @returns A Box component containing a CircularProgress spinner positioned according to the specified alignment
 *
 * @example
 * ```tsx
 * <LoadingSpinner position="center" size={40} />
 * ```
 */
export function LoadingSpinner({ position, ...props }: LoadingSpinnerProps) {
  return (
    <Box display="flex" justifyContent={position} data-testid="loading-spinner">
      <CircularProgress {...props} />
    </Box>
  );
}
