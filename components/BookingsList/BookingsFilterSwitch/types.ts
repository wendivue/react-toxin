type BookingsFilterType = 'all' | 'current' | 'confirmed' | 'notConfirmed';

type BookingsFilterSwitchProps = {
  currentFilter: BookingsFilterType;
  onChange: (filterType: BookingsFilterType) => void;
};

export type { BookingsFilterSwitchProps, BookingsFilterType };
