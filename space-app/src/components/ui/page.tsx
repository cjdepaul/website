import type { FC, ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
}

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return <div className="text-foreground text-2xl font-semibold pt-2">{children}</div>
}

export const PageDivider: FC = () => {
  return <div className="w-full my-4 border-b border-border" />
}

export const PageDescription: FC<PageTitleProps> = ({ children }) => {
  return <div className="text-foreground text-sm font-normal pt-2">{children}</div>
}
