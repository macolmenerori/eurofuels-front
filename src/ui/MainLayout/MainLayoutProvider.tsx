import { Navbar } from '@/components/Navbar/Navbar';

export interface MainLayoutProviderProps {
  children: React.ReactNode;
}

export function MainLayoutProvider({ children }: MainLayoutProviderProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
