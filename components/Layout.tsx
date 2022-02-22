import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return <div className='min-h-screen bg-downriver-600 text-robin-s-egg-blue-300'>{children}</div>;
};
