import type { FC, ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
}

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 className="w-full tracking-tight text-gray-900 dark:text-gray-400">
      {children}
    </h1>
  );
};

export const PageDivider: FC = () => {
  return (
    <div className="my-6 w-full">
      <hr className="border-gray-200 dark:border-gray-700" />
    </div>
  );
};
