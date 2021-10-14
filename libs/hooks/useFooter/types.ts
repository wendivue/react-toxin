type UseFooter = () => {
  navigation: Array<{
    id: number;
    title: string;
    payload: Array<{
      id: string;
      src: string;
      label: string;
    }>;
  }>;
  subscriptionTitle: string;
  subscriptionDescription: string;
  logoDescription: string;
  copyright: string;
};

export type { UseFooter };
