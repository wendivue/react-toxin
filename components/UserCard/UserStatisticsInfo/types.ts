type UserStatisticsInfoProps = {
  statistics: UserStatistics;
};

type UserStatistics = Record<
  string,
  {
    title: string;
    items: Record<
      string,
      {
        title: string;
        value: number;
      }
    >;
  }
>;

export type { UserStatisticsInfoProps, UserStatistics };
