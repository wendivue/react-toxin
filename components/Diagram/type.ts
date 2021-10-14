type SVGElementProps = {
  [key: string]: {
    gradient: string;
    strokeDasharray: string;
    strokeDashoffset: string;
    votes: number;
  };
};
type DiagramProps = {
  great?: number;
  good?: number;
  satisfactorily?: number;
  bad?: number;
  terrible?: number;
};

export type { DiagramProps, SVGElementProps };
