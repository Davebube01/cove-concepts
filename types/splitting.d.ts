declare module 'splitting' {
  interface SplittingResult {
    el: Element;
    chars?: Element[];
    words?: Element[];
    lines?: Element[][];
    [key: string]: unknown;
  }

  interface SplittingOptions {
    target?: string | Element | Element[] | NodeList;
    by?: string;
    key?: string | null;
    matching?: string;
    whitespace?: boolean;
  }

  function Splitting(options?: SplittingOptions): SplittingResult[];
  export = Splitting;
}
