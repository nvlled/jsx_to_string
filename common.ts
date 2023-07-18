// deno-lint-ignore-file no-empty-interface no-explicit-any ban-types
export type Defaultize<Props, Defaults> =
  // Distribute over unions
  Props extends any // Make any properties included in Default optional
    ? Partial<Pick<Props, Extract<keyof Props, keyof Defaults>>> & // Include the remaining properties from Props
        Pick<Props, Exclude<keyof Props, keyof Defaults>>
    : never;

export type Booleanish = boolean | "true" | "false";

export type Key = string | number | any;
export type RefObject<T> = { current: T | null };
export type RefCallback<T> = (instance: T | null) => void;
export type Ref<T> = RefObject<T> | RefCallback<T> | null;

export interface VNode<P = {}> {
  type: ComponentType<P> | string;
  props: P & { children: ComponentChildren };
  key: Key;
  /**
   * ref is not guaranteed by React.ReactElement, for compatibility reasons
   * with popular react libs we define it as optional too
   */
  ref?: Ref<any> | null;
  /**
   * The time this `vnode` started rendering. Will only be set when
   * the devtools are attached.
   * Default value: `0`
   */
  startTime?: number;
  /**
   * The time that the rendering of this `vnode` was completed. Will only be
   * set when the devtools are attached.
   * Default value: `-1`
   */
  endTime?: number;
}

export interface ClassAttributes<T> extends Attributes {
  ref?: Ref<T>;
}

export interface PreactDOMAttributes {
  children?: ComponentChildren;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

export type ComponentChild =
  | VNode<any>
  | object
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;
export type ComponentChildren = ComponentChild[] | ComponentChild;

export interface Consumer<T>
  extends FunctionComponent<{
    children: (value: T) => ComponentChildren;
  }> {}
export interface PreactConsumer<T> extends Consumer<T> {}

export interface Provider<T>
  extends FunctionComponent<{
    value: T;
    children: ComponentChildren;
  }> {}
export interface PreactProvider<T> extends Provider<T> {}
export type ContextType<C extends Context<any>> = C extends Context<infer T>
  ? T
  : never;

export interface Context<T> {
  Consumer: Consumer<T>;
  Provider: Provider<T>;
  displayName?: string;
}

export interface ErrorInfo {
  componentStack?: string;
}

export interface Component<P = {}, S = {}> {
  componentWillMount?(): void;
  componentDidMount?(): void;
  componentWillUnmount?(): void;
  getChildContext?(): object;
  componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
  shouldComponentUpdate?(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any
  ): boolean;
  componentWillUpdate?(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any
  ): void;
  getSnapshotBeforeUpdate?(oldProps: Readonly<P>, oldState: Readonly<S>): any;
  componentDidUpdate?(
    previousProps: Readonly<P>,
    previousState: Readonly<S>,
    snapshot: any
  ): void;
  componentDidCatch?(error: any, errorInfo: ErrorInfo): void;
}

export interface ComponentClass<P = {}, S = {}> {
  new (props: P, context?: any): Component<P, S>;
  displayName?: string;
  defaultProps?: Partial<P>;
  contextType?: Context<any>;
  getDerivedStateFromProps?(
    props: Readonly<P>,
    state: Readonly<S>
  ): Partial<S> | null;
  getDerivedStateFromError?(error: any): Partial<S> | null;
}

export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

export interface Attributes {
  key?: Key | undefined;
  jsx?: boolean | undefined;
}
export type RenderableProps<P, RefType = any> = P &
  Readonly<Attributes & { children?: ComponentChildren; ref?: Ref<RefType> }>;

export interface FunctionComponent<P = {}> {
  (props: RenderableProps<P>, context?: any): VNode<any> | null;
  displayName?: string;
  defaultProps?: Partial<P> | undefined;
}
