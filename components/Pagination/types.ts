type PaginationProps = {
  pagesCount: string | number;
  onChange: (currentPageNumber: number) => void;
  caption?: string;
};

export type { PaginationProps };
