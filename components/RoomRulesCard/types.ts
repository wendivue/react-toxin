type RoomRulesProps = {
  rules: {
    smoke: boolean;
    pets: boolean;
    guests: boolean;
    isArrivalTimeLimited: boolean;
    parties: boolean;
  };
};

type RulesList = {
  [key: string]: {
    true: string;
    false: string;
  };
};

export type { RoomRulesProps, RulesList };
