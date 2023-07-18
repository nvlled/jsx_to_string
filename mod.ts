// deno-lint-ignore-file no-empty-interface no-explicit-any ban-types

type Booleanish = boolean | "true" | "false";

interface VNode<P = {}> {
  type: ComponentType<P> | string;
  props: P & { children: ComponentChildren };
}

type ComponentChild =
  | VNode<any>
  | object
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;

export type ComponentChildren = ComponentChild[] | ComponentChild;

interface Attributes {
  jsx?: boolean | undefined;
}
type RenderableProps<P> = P &
  Readonly<Attributes & { children?: ComponentChildren }>;

interface FunctionComponent<P = {}> {
  (props: RenderableProps<P>, context?: any): VNode<any> | null;
  displayName?: string;
  defaultProps?: Partial<P> | undefined;
}

type ComponentType<P = {}> = FunctionComponent<P>;

declare global {
  // Ripped from preact JSXInternal, but
  // anything related to svg and events are removed,
  // which reduces the size to about 1/3 of original.
  namespace JSX {
    interface ClassAttributes<T> extends Attributes {}

    interface PreactDOMAttributes {
      children?: ComponentChildren;
      dangerouslySetInnerHTML?: {
        __html: string;
      };
    }

    export interface IntrinsicAttributes {
      key?: any;
    }

    export type ElementType<P = any> =
      | {
          [K in keyof IntrinsicElements]: P extends IntrinsicElements[K]
            ? K
            : never;
        }[keyof IntrinsicElements]
      | ComponentType<P>;
    export interface Element extends VNode<any> {}
    export type ElementClass = FunctionComponent<any>;

    export interface ElementAttributesProperty {
      props: any;
    }

    export interface ElementChildrenAttribute {
      children: any;
    }

    export type DOMCSSProperties = {
      [key in keyof Omit<
        CSSStyleDeclaration,
        | "item"
        | "setProperty"
        | "removeProperty"
        | "getPropertyValue"
        | "getPropertyPriority"
      >]?: string | number | null | undefined;
    };
    export type AllCSSProperties = {
      [key: string]: string | number | null | undefined;
    };
    export interface CSSProperties extends AllCSSProperties, DOMCSSProperties {
      cssText?: string | null;
    }

    export interface SignalLike<T> {
      value: T;
      peek(): T;
      subscribe(fn: (value: T) => void): () => void;
    }

    export type Signalish<T> = T | SignalLike<T>;

    export type UnpackSignal<T> = T extends SignalLike<infer V> ? V : T;

    export interface DOMAttributes extends PreactDOMAttributes {}

    // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
    export interface AriaAttributes {
      /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
      "aria-activedescendant"?: Signalish<string | undefined>;
      /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
      "aria-atomic"?: Signalish<Booleanish | undefined>;
      /**
       * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
       * presented if they are made.
       */
      "aria-autocomplete"?: Signalish<
        "none" | "inline" | "list" | "both" | undefined
      >;
      /**
       * Defines a string value that labels the current element, which is intended to be converted into Braille.
       * @see aria-label.
       */
      "aria-braillelabel"?: Signalish<string | undefined>;
      /**
       * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
       * @see aria-roledescription.
       */
      "aria-brailleroledescription"?: Signalish<string | undefined>;
      /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
      "aria-busy"?: Signalish<Booleanish | undefined>;
      /**
       * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
       * @see aria-pressed
       * @see aria-selected.
       */
      "aria-checked"?: Signalish<Booleanish | "mixed" | undefined>;
      /**
       * Defines the total number of columns in a table, grid, or treegrid.
       * @see aria-colindex.
       */
      "aria-colcount"?: Signalish<number | undefined>;
      /**
       * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
       * @see aria-colcount
       * @see aria-colspan.
       */
      "aria-colindex"?: Signalish<number | undefined>;
      /**
       * Defines a human readable text alternative of aria-colindex.
       * @see aria-rowindextext.
       */
      "aria-colindextext"?: Signalish<string | undefined>;
      /**
       * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
       * @see aria-colindex
       * @see aria-rowspan.
       */
      "aria-colspan"?: Signalish<number | undefined>;
      /**
       * Identifies the element (or elements) whose contents or presence are controlled by the current element.
       * @see aria-owns.
       */
      "aria-controls"?: Signalish<string | undefined>;
      /** Indicates the element that represents the current item within a container or set of related elements. */
      "aria-current"?: Signalish<
        Booleanish | "page" | "step" | "location" | "date" | "time" | undefined
      >;
      /**
       * Identifies the element (or elements) that describes the object.
       * @see aria-labelledby
       */
      "aria-describedby"?: Signalish<string | undefined>;
      /**
       * Defines a string value that describes or annotates the current element.
       * @see related aria-describedby.
       */
      "aria-description"?: Signalish<string | undefined>;
      /**
       * Identifies the element that provides a detailed, extended description for the object.
       * @see aria-describedby.
       */
      "aria-details"?: Signalish<string | undefined>;
      /**
       * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
       * @see aria-hidden
       * @see aria-readonly.
       */
      "aria-disabled"?: Signalish<Booleanish | undefined>;
      /**
       * Indicates what functions can be performed when a dragged object is released on the drop target.
       * @deprecated in ARIA 1.1
       */
      "aria-dropeffect"?: Signalish<
        "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined
      >;
      /**
       * Identifies the element that provides an error message for the object.
       * @see aria-invalid
       * @see aria-describedby.
       */
      "aria-errormessage"?: Signalish<string | undefined>;
      /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
      "aria-expanded"?: Signalish<Booleanish | undefined>;
      /**
       * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
       * allows assistive technology to override the general default of reading in document source order.
       */
      "aria-flowto"?: Signalish<string | undefined>;
      /**
       * Indicates an element's "grabbed" state in a drag-and-drop operation.
       * @deprecated in ARIA 1.1
       */
      "aria-grabbed"?: Signalish<Booleanish | undefined>;
      /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
      "aria-haspopup"?: Signalish<
        Booleanish | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined
      >;
      /**
       * Indicates whether the element is exposed to an accessibility API.
       * @see aria-disabled.
       */
      "aria-hidden"?: Signalish<Booleanish | undefined>;
      /**
       * Indicates the entered value does not conform to the format expected by the application.
       * @see aria-errormessage.
       */
      "aria-invalid"?: Signalish<
        Booleanish | "grammar" | "spelling" | undefined
      >;
      /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
      "aria-keyshortcuts"?: Signalish<string | undefined>;
      /**
       * Defines a string value that labels the current element.
       * @see aria-labelledby.
       */
      "aria-label"?: Signalish<string | undefined>;
      /**
       * Identifies the element (or elements) that labels the current element.
       * @see aria-describedby.
       */
      "aria-labelledby"?: Signalish<string | undefined>;
      /** Defines the hierarchical level of an element within a structure. */
      "aria-level"?: Signalish<number | undefined>;
      /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
      "aria-live"?: Signalish<"off" | "assertive" | "polite" | undefined>;
      /** Indicates whether an element is modal when displayed. */
      "aria-modal"?: Signalish<Booleanish | undefined>;
      /** Indicates whether a text box accepts multiple lines of input or only a single line. */
      "aria-multiline"?: Signalish<Booleanish | undefined>;
      /** Indicates that the user may select more than one item from the current selectable descendants. */
      "aria-multiselectable"?: Signalish<Booleanish | undefined>;
      /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
      "aria-orientation"?: Signalish<"horizontal" | "vertical" | undefined>;
      /**
       * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
       * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
       * @see aria-controls.
       */
      "aria-owns"?: Signalish<string | undefined>;
      /**
       * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
       * A hint could be a sample value or a brief description of the expected format.
       */
      "aria-placeholder"?: Signalish<string | undefined>;
      /**
       * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
       * @see aria-setsize.
       */
      "aria-posinset"?: Signalish<number | undefined>;
      /**
       * Indicates the current "pressed" state of toggle buttons.
       * @see aria-checked
       * @see aria-selected.
       */
      "aria-pressed"?: Signalish<Booleanish | "mixed" | undefined>;
      /**
       * Indicates that the element is not editable, but is otherwise operable.
       * @see aria-disabled.
       */
      "aria-readonly"?: Signalish<Booleanish | undefined>;
      /**
       * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
       * @see aria-atomic.
       */
      "aria-relevant"?: Signalish<
        | "additions"
        | "additions removals"
        | "additions text"
        | "all"
        | "removals"
        | "removals additions"
        | "removals text"
        | "text"
        | "text additions"
        | "text removals"
        | undefined
      >;
      /** Indicates that user input is required on the element before a form may be submitted. */
      "aria-required"?: Signalish<Booleanish | undefined>;
      /** Defines a human-readable, author-localized description for the role of an element. */
      "aria-roledescription"?: Signalish<string | undefined>;
      /**
       * Defines the total number of rows in a table, grid, or treegrid.
       * @see aria-rowindex.
       */
      "aria-rowcount"?: Signalish<number | undefined>;
      /**
       * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
       * @see aria-rowcount
       * @see aria-rowspan.
       */
      "aria-rowindex"?: Signalish<number | undefined>;
      /**
       * Defines a human readable text alternative of aria-rowindex.
       * @see aria-colindextext.
       */
      "aria-rowindextext"?: Signalish<string | undefined>;
      /**
       * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
       * @see aria-rowindex
       * @see aria-colspan.
       */
      "aria-rowspan"?: Signalish<number | undefined>;
      /**
       * Indicates the current "selected" state of various widgets.
       * @see aria-checked
       * @see aria-pressed.
       */
      "aria-selected"?: Signalish<Booleanish | undefined>;
      /**
       * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
       * @see aria-posinset.
       */
      "aria-setsize"?: Signalish<number | undefined>;
      /** Indicates if items in a table or grid are sorted in ascending or descending order. */
      "aria-sort"?: Signalish<
        "none" | "ascending" | "descending" | "other" | undefined
      >;
      /** Defines the maximum allowed value for a range widget. */
      "aria-valuemax"?: Signalish<number | undefined>;
      /** Defines the minimum allowed value for a range widget. */
      "aria-valuemin"?: Signalish<number | undefined>;
      /**
       * Defines the current value for a range widget.
       * @see aria-valuetext.
       */
      "aria-valuenow"?: Signalish<number | undefined>;
      /** Defines the human readable text alternative of aria-valuenow for a range widget. */
      "aria-valuetext"?: Signalish<string | undefined>;
    }

    // All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
    type AriaRole =
      | "alert"
      | "alertdialog"
      | "application"
      | "article"
      | "banner"
      | "button"
      | "cell"
      | "checkbox"
      | "columnheader"
      | "combobox"
      | "complementary"
      | "contentinfo"
      | "definition"
      | "dialog"
      | "directory"
      | "document"
      | "feed"
      | "figure"
      | "form"
      | "grid"
      | "gridcell"
      | "group"
      | "heading"
      | "img"
      | "link"
      | "list"
      | "listbox"
      | "listitem"
      | "log"
      | "main"
      | "marquee"
      | "math"
      | "menu"
      | "menubar"
      | "menuitem"
      | "menuitemcheckbox"
      | "menuitemradio"
      | "navigation"
      | "none"
      | "note"
      | "option"
      | "presentation"
      | "progressbar"
      | "radio"
      | "radiogroup"
      | "region"
      | "row"
      | "rowgroup"
      | "rowheader"
      | "scrollbar"
      | "search"
      | "searchbox"
      | "separator"
      | "slider"
      | "spinbutton"
      | "status"
      | "switch"
      | "tab"
      | "table"
      | "tablist"
      | "tabpanel"
      | "term"
      | "textbox"
      | "timer"
      | "toolbar"
      | "tooltip"
      | "tree"
      | "treegrid"
      | "treeitem"
      | "none presentation";

    export interface HTMLAttributes<RefType extends EventTarget = EventTarget>
      extends ClassAttributes<RefType>,
        DOMAttributes,
        AriaAttributes {
      // Standard HTML Attributes
      accept?: string | undefined | SignalLike<string | undefined>;
      acceptCharset?: string | undefined | SignalLike<string | undefined>;
      accessKey?: string | undefined | SignalLike<string | undefined>;
      action?: string | undefined | SignalLike<string | undefined>;
      allow?: string | undefined | SignalLike<string | undefined>;
      allowFullScreen?: boolean | undefined | SignalLike<boolean | undefined>;
      allowTransparency?: boolean | undefined | SignalLike<boolean | undefined>;
      alt?: string | undefined | SignalLike<string | undefined>;
      as?: string | undefined | SignalLike<string | undefined>;
      async?: boolean | undefined | SignalLike<boolean | undefined>;
      autocomplete?: string | undefined | SignalLike<string | undefined>;
      autoComplete?: string | undefined | SignalLike<string | undefined>;
      autocorrect?: string | undefined | SignalLike<string | undefined>;
      autoCorrect?: string | undefined | SignalLike<string | undefined>;
      autofocus?: boolean | undefined | SignalLike<boolean | undefined>;
      autoFocus?: boolean | undefined | SignalLike<boolean | undefined>;
      autoPlay?: boolean | undefined | SignalLike<boolean | undefined>;
      capture?: boolean | string | undefined | SignalLike<string | undefined>;
      cellPadding?:
        | number
        | string
        | undefined
        | SignalLike<string | undefined>;
      cellSpacing?:
        | number
        | string
        | undefined
        | SignalLike<string | undefined>;
      charSet?: string | undefined | SignalLike<string | undefined>;
      challenge?: string | undefined | SignalLike<string | undefined>;
      checked?: boolean | undefined | SignalLike<boolean | undefined>;
      cite?: string | undefined | SignalLike<string | undefined>;
      class?: string | undefined | SignalLike<string | undefined>;
      className?: string | undefined | SignalLike<string | undefined>;
      cols?: number | undefined | SignalLike<number | undefined>;
      colSpan?: number | undefined | SignalLike<number | undefined>;
      content?: string | undefined | SignalLike<string | undefined>;
      contentEditable?: boolean | undefined | SignalLike<boolean | undefined>;
      contextMenu?: string | undefined | SignalLike<string | undefined>;
      controls?: boolean | undefined | SignalLike<boolean | undefined>;
      controlsList?: string | undefined | SignalLike<string | undefined>;
      coords?: string | undefined | SignalLike<string | undefined>;
      crossOrigin?: string | undefined | SignalLike<string | undefined>;
      data?: string | undefined | SignalLike<string | undefined>;
      dateTime?: string | undefined | SignalLike<string | undefined>;
      default?: boolean | undefined | SignalLike<boolean | undefined>;
      defaultChecked?: boolean | undefined | SignalLike<boolean | undefined>;
      defaultValue?: string | undefined | SignalLike<string | undefined>;
      defer?: boolean | undefined | SignalLike<boolean | undefined>;
      dir?:
        | "auto"
        | "rtl"
        | "ltr"
        | undefined
        | SignalLike<"auto" | "rtl" | "ltr" | undefined>;
      disabled?: boolean | undefined | SignalLike<boolean | undefined>;
      disableRemotePlayback?:
        | boolean
        | undefined
        | SignalLike<boolean | undefined>;
      download?: any | undefined;
      decoding?:
        | "sync"
        | "async"
        | "auto"
        | undefined
        | SignalLike<"sync" | "async" | "auto" | undefined>;
      draggable?: boolean | undefined | SignalLike<boolean | undefined>;
      encType?: string | undefined | SignalLike<string | undefined>;
      enterkeyhint?:
        | "enter"
        | "done"
        | "go"
        | "next"
        | "previous"
        | "search"
        | "send"
        | undefined
        | SignalLike<
            | "enter"
            | "done"
            | "go"
            | "next"
            | "previous"
            | "search"
            | "send"
            | undefined
          >;
      for?: string | undefined | SignalLike<string | undefined>;
      form?: string | undefined | SignalLike<string | undefined>;
      formAction?: string | undefined | SignalLike<string | undefined>;
      formEncType?: string | undefined | SignalLike<string | undefined>;
      formMethod?: string | undefined | SignalLike<string | undefined>;
      formNoValidate?: boolean | undefined | SignalLike<boolean | undefined>;
      formTarget?: string | undefined | SignalLike<string | undefined>;
      frameBorder?:
        | number
        | string
        | undefined
        | SignalLike<number | string | undefined>;
      headers?: string | undefined | SignalLike<string | undefined>;
      height?:
        | number
        | string
        | undefined
        | SignalLike<number | string | undefined>;
      hidden?:
        | boolean
        | "hidden"
        | "until-found"
        | undefined
        | SignalLike<boolean | "hidden" | "until-found" | undefined>;
      high?: number | undefined | SignalLike<number | undefined>;
      href?: string | undefined | SignalLike<string | undefined>;
      hrefLang?: string | undefined | SignalLike<string | undefined>;
      htmlFor?: string | undefined | SignalLike<string | undefined>;
      httpEquiv?: string | undefined | SignalLike<string | undefined>;
      icon?: string | undefined | SignalLike<string | undefined>;
      id?: string | undefined | SignalLike<string | undefined>;
      indeterminate?: boolean | undefined | SignalLike<boolean | undefined>;
      inert?: boolean | undefined | SignalLike<boolean | undefined>;
      inputMode?: string | undefined | SignalLike<string | undefined>;
      integrity?: string | undefined | SignalLike<string | undefined>;
      is?: string | undefined | SignalLike<string | undefined>;
      keyParams?: string | undefined | SignalLike<string | undefined>;
      keyType?: string | undefined | SignalLike<string | undefined>;
      kind?: string | undefined | SignalLike<string | undefined>;
      label?: string | undefined | SignalLike<string | undefined>;
      lang?: string | undefined | SignalLike<string | undefined>;
      list?: string | undefined | SignalLike<string | undefined>;
      loading?:
        | "eager"
        | "lazy"
        | undefined
        | SignalLike<"eager" | "lazy" | undefined>;
      loop?: boolean | undefined | SignalLike<boolean | undefined>;
      low?: number | undefined | SignalLike<number | undefined>;
      manifest?: string | undefined | SignalLike<string | undefined>;
      marginHeight?: number | undefined | SignalLike<number | undefined>;
      marginWidth?: number | undefined | SignalLike<number | undefined>;
      max?: number | string | undefined | SignalLike<string | undefined>;
      maxLength?: number | undefined | SignalLike<number | undefined>;
      media?: string | undefined | SignalLike<string | undefined>;
      mediaGroup?: string | undefined | SignalLike<string | undefined>;
      method?: string | undefined | SignalLike<string | undefined>;
      min?: number | string | undefined | SignalLike<string | undefined>;
      minLength?: number | undefined | SignalLike<number | undefined>;
      multiple?: boolean | undefined | SignalLike<boolean | undefined>;
      muted?: boolean | undefined | SignalLike<boolean | undefined>;
      name?: string | undefined | SignalLike<string | undefined>;
      nomodule?: boolean | undefined | SignalLike<boolean | undefined>;
      nonce?: string | undefined | SignalLike<string | undefined>;
      noValidate?: boolean | undefined | SignalLike<boolean | undefined>;
      open?: boolean | undefined | SignalLike<boolean | undefined>;
      optimum?: number | undefined | SignalLike<number | undefined>;
      part?: string | undefined | SignalLike<string | undefined>;
      pattern?: string | undefined | SignalLike<string | undefined>;
      ping?: string | undefined | SignalLike<string | undefined>;
      placeholder?: string | undefined | SignalLike<string | undefined>;
      playsInline?: boolean | undefined | SignalLike<boolean | undefined>;
      poster?: string | undefined | SignalLike<string | undefined>;
      preload?: string | undefined | SignalLike<string | undefined>;
      radioGroup?: string | undefined | SignalLike<string | undefined>;
      readonly?: boolean | undefined | SignalLike<boolean | undefined>;
      readOnly?: boolean | undefined | SignalLike<boolean | undefined>;
      referrerpolicy?:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url"
        | undefined
        | SignalLike<
            | "no-referrer"
            | "no-referrer-when-downgrade"
            | "origin"
            | "origin-when-cross-origin"
            | "same-origin"
            | "strict-origin"
            | "strict-origin-when-cross-origin"
            | "unsafe-url"
            | undefined
          >;
      rel?: string | undefined | SignalLike<string | undefined>;
      required?: boolean | undefined | SignalLike<boolean | undefined>;
      reversed?: boolean | undefined | SignalLike<boolean | undefined>;
      role?: AriaRole | undefined | SignalLike<AriaRole | undefined>;
      rows?: number | undefined | SignalLike<number | undefined>;
      rowSpan?: number | undefined | SignalLike<number | undefined>;
      sandbox?: string | undefined | SignalLike<string | undefined>;
      scope?: string | undefined | SignalLike<string | undefined>;
      scoped?: boolean | undefined | SignalLike<boolean | undefined>;
      scrolling?: string | undefined | SignalLike<string | undefined>;
      seamless?: boolean | undefined | SignalLike<boolean | undefined>;
      selected?: boolean | undefined | SignalLike<boolean | undefined>;
      shape?: string | undefined | SignalLike<string | undefined>;
      size?: number | undefined | SignalLike<number | undefined>;
      sizes?: string | undefined | SignalLike<string | undefined>;
      slot?: string | undefined | SignalLike<string | undefined>;
      span?: number | undefined | SignalLike<number | undefined>;
      spellcheck?: boolean | undefined | SignalLike<boolean | undefined>;
      spellCheck?: boolean | undefined | SignalLike<boolean | undefined>;
      src?: string | undefined | SignalLike<string | undefined>;
      srcset?: string | undefined | SignalLike<string | undefined>;
      srcDoc?: string | undefined | SignalLike<string | undefined>;
      srcLang?: string | undefined | SignalLike<string | undefined>;
      srcSet?: string | undefined | SignalLike<string | undefined>;
      start?: number | undefined | SignalLike<number | undefined>;
      step?:
        | number
        | string
        | undefined
        | SignalLike<number | string | undefined>;
      style?:
        | string
        | CSSProperties
        | undefined
        | SignalLike<string | CSSProperties | undefined>;
      summary?: string | undefined | SignalLike<string | undefined>;
      tabIndex?: number | undefined | SignalLike<number | undefined>;
      target?: string | undefined | SignalLike<string | undefined>;
      title?: string | undefined | SignalLike<string | undefined>;
      type?: string | undefined | SignalLike<string | undefined>;
      useMap?: string | undefined | SignalLike<string | undefined>;
      value?:
        | string
        | string[]
        | number
        | undefined
        | SignalLike<string | string[] | number | undefined>;
      volume?:
        | string
        | number
        | undefined
        | SignalLike<string | number | undefined>;
      width?:
        | number
        | string
        | undefined
        | SignalLike<number | string | undefined>;
      wmode?: string | undefined | SignalLike<string | undefined>;
      wrap?: string | undefined | SignalLike<string | undefined>;

      // Non-standard Attributes
      autocapitalize?:
        | "off"
        | "none"
        | "on"
        | "sentences"
        | "words"
        | "characters"
        | undefined
        | SignalLike<
            | "off"
            | "none"
            | "on"
            | "sentences"
            | "words"
            | "characters"
            | undefined
          >;
      autoCapitalize?:
        | "off"
        | "none"
        | "on"
        | "sentences"
        | "words"
        | "characters"
        | undefined
        | SignalLike<
            | "off"
            | "none"
            | "on"
            | "sentences"
            | "words"
            | "characters"
            | undefined
          >;
      disablePictureInPicture?:
        | boolean
        | undefined
        | SignalLike<boolean | undefined>;
      results?: number | undefined | SignalLike<number | undefined>;
      translate?:
        | "yes"
        | "no"
        | undefined
        | SignalLike<"yes" | "no" | undefined>;

      // RDFa Attributes
      about?: string | undefined | SignalLike<string | undefined>;
      datatype?: string | undefined | SignalLike<string | undefined>;
      inlist?: any;
      prefix?: string | undefined | SignalLike<string | undefined>;
      property?: string | undefined | SignalLike<string | undefined>;
      resource?: string | undefined | SignalLike<string | undefined>;
      typeof?: string | undefined | SignalLike<string | undefined>;
      vocab?: string | undefined | SignalLike<string | undefined>;

      // Microdata Attributes
      itemProp?: string | undefined | SignalLike<string | undefined>;
      itemScope?: boolean | undefined | SignalLike<boolean | undefined>;
      itemType?: string | undefined | SignalLike<string | undefined>;
      itemID?: string | undefined | SignalLike<string | undefined>;
      itemRef?: string | undefined | SignalLike<string | undefined>;
    }

    export type DetailedHTMLProps<
      HA extends HTMLAttributes<RefType>,
      RefType extends EventTarget = EventTarget
    > = HA;

    export interface IntrinsicElements {
      // HTML
      a: HTMLAttributes<HTMLAnchorElement>;
      abbr: HTMLAttributes<HTMLElement>;
      address: HTMLAttributes<HTMLElement>;
      area: HTMLAttributes<HTMLAreaElement>;
      article: HTMLAttributes<HTMLElement>;
      aside: HTMLAttributes<HTMLElement>;
      audio: HTMLAttributes<HTMLAudioElement>;
      b: HTMLAttributes<HTMLElement>;
      base: HTMLAttributes<HTMLBaseElement>;
      bdi: HTMLAttributes<HTMLElement>;
      bdo: HTMLAttributes<HTMLElement>;
      big: HTMLAttributes<HTMLElement>;
      blockquote: HTMLAttributes<HTMLQuoteElement>;
      body: HTMLAttributes<HTMLBodyElement>;
      br: HTMLAttributes<HTMLBRElement>;
      button: HTMLAttributes<HTMLButtonElement>;
      canvas: HTMLAttributes<HTMLCanvasElement>;
      caption: HTMLAttributes<HTMLTableCaptionElement>;
      cite: HTMLAttributes<HTMLElement>;
      code: HTMLAttributes<HTMLElement>;
      col: HTMLAttributes<HTMLTableColElement>;
      colgroup: HTMLAttributes<HTMLTableColElement>;
      data: HTMLAttributes<HTMLDataElement>;
      datalist: HTMLAttributes<HTMLDataListElement>;
      dd: HTMLAttributes<HTMLElement>;
      del: HTMLAttributes<HTMLModElement>;
      details: HTMLAttributes<HTMLDetailsElement>;
      dfn: HTMLAttributes<HTMLElement>;
      dialog: HTMLAttributes<HTMLDialogElement>;
      div: HTMLAttributes<HTMLDivElement>;
      dl: HTMLAttributes<HTMLDListElement>;
      dt: HTMLAttributes<HTMLElement>;
      em: HTMLAttributes<HTMLElement>;
      embed: HTMLAttributes<HTMLEmbedElement>;
      fieldset: HTMLAttributes<HTMLFieldSetElement>;
      figcaption: HTMLAttributes<HTMLElement>;
      figure: HTMLAttributes<HTMLElement>;
      footer: HTMLAttributes<HTMLElement>;
      form: HTMLAttributes<HTMLFormElement>;
      h1: HTMLAttributes<HTMLHeadingElement>;
      h2: HTMLAttributes<HTMLHeadingElement>;
      h3: HTMLAttributes<HTMLHeadingElement>;
      h4: HTMLAttributes<HTMLHeadingElement>;
      h5: HTMLAttributes<HTMLHeadingElement>;
      h6: HTMLAttributes<HTMLHeadingElement>;
      head: HTMLAttributes<HTMLHeadElement>;
      header: HTMLAttributes<HTMLElement>;
      hgroup: HTMLAttributes<HTMLElement>;
      hr: HTMLAttributes<HTMLHRElement>;
      html: HTMLAttributes<HTMLHtmlElement>;
      i: HTMLAttributes<HTMLElement>;
      iframe: HTMLAttributes<HTMLIFrameElement>;
      img: HTMLAttributes<HTMLImageElement>;
      input: HTMLAttributes<HTMLInputElement>;
      ins: HTMLAttributes<HTMLModElement>;
      kbd: HTMLAttributes<HTMLElement>;
      keygen: HTMLAttributes<HTMLUnknownElement>;
      label: HTMLAttributes<HTMLLabelElement>;
      legend: HTMLAttributes<HTMLLegendElement>;
      li: HTMLAttributes<HTMLLIElement>;
      link: HTMLAttributes<HTMLLinkElement>;
      main: HTMLAttributes<HTMLElement>;
      map: HTMLAttributes<HTMLMapElement>;
      mark: HTMLAttributes<HTMLElement>;
      marquee: HTMLAttributes<HTMLMarqueeElement>;
      menu: HTMLAttributes<HTMLMenuElement>;
      menuitem: HTMLAttributes<HTMLUnknownElement>;
      meta: HTMLAttributes<HTMLMetaElement>;
      meter: HTMLAttributes<HTMLMeterElement>;
      nav: HTMLAttributes<HTMLElement>;
      noscript: HTMLAttributes<HTMLElement>;
      object: HTMLAttributes<HTMLObjectElement>;
      ol: HTMLAttributes<HTMLOListElement>;
      optgroup: HTMLAttributes<HTMLOptGroupElement>;
      option: HTMLAttributes<HTMLOptionElement>;
      output: HTMLAttributes<HTMLOutputElement>;
      p: HTMLAttributes<HTMLParagraphElement>;
      param: HTMLAttributes<HTMLParamElement>;
      picture: HTMLAttributes<HTMLPictureElement>;
      pre: HTMLAttributes<HTMLPreElement>;
      progress: HTMLAttributes<HTMLProgressElement>;
      q: HTMLAttributes<HTMLQuoteElement>;
      rp: HTMLAttributes<HTMLElement>;
      rt: HTMLAttributes<HTMLElement>;
      ruby: HTMLAttributes<HTMLElement>;
      s: HTMLAttributes<HTMLElement>;
      samp: HTMLAttributes<HTMLElement>;
      script: HTMLAttributes<HTMLScriptElement>;
      section: HTMLAttributes<HTMLElement>;
      select: HTMLAttributes<HTMLSelectElement>;
      slot: HTMLAttributes<HTMLSlotElement>;
      small: HTMLAttributes<HTMLElement>;
      source: HTMLAttributes<HTMLSourceElement>;
      span: HTMLAttributes<HTMLSpanElement>;
      strong: HTMLAttributes<HTMLElement>;
      style: HTMLAttributes<HTMLStyleElement>;
      sub: HTMLAttributes<HTMLElement>;
      summary: HTMLAttributes<HTMLElement>;
      sup: HTMLAttributes<HTMLElement>;
      table: HTMLAttributes<HTMLTableElement>;
      tbody: HTMLAttributes<HTMLTableSectionElement>;
      td: HTMLAttributes<HTMLTableCellElement>;
      textarea: HTMLAttributes<HTMLTextAreaElement>;
      tfoot: HTMLAttributes<HTMLTableSectionElement>;
      th: HTMLAttributes<HTMLTableCellElement>;
      thead: HTMLAttributes<HTMLTableSectionElement>;
      time: HTMLAttributes<HTMLTimeElement>;
      title: HTMLAttributes<HTMLTitleElement>;
      tr: HTMLAttributes<HTMLTableRowElement>;
      track: HTMLAttributes<HTMLTrackElement>;
      u: HTMLAttributes<HTMLElement>;
      ul: HTMLAttributes<HTMLUListElement>;
      var: HTMLAttributes<HTMLElement>;
      video: HTMLAttributes<HTMLVideoElement>;
      wbr: HTMLAttributes<HTMLElement>;
    }
  }
}

function escapeHTML(text: string): string {
  const entities: { [char: string]: string } = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&#39;",
    '"': "&#34;",
  };
  return text.replaceAll(/[&<>"']/g, (char) => {
    return entities[char];
  });
}

const styleObjToCss = (() => {
  const IS_NON_DIMENSIONAL = new Set([
    "animation-iteration-count",
    "border-image-outset",
    "border-image-slice",
    "border-image-width",
    "box-flex",
    "box-flex-group",
    "box-ordinal-group",
    "column-count",
    "fill-opacity",
    "flex",
    "flex-grow",
    "flex-negative",
    "flex-order",
    "flex-positive",
    "flex-shrink",
    "flood-opacity",
    "font-weight",
    "grid-column",
    "grid-row",
    "line-clamp",
    "line-height",
    "opacity",
    "order",
    "orphans",
    "stop-opacity",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "tab-size",
    "widows",
    "z-index",
    "zoom",
  ]);

  const JS_TO_CSS: Record<string, string> = {};
  const CSS_REGEX = /[A-Z]/g;

  return function (s: object) {
    let str = "";
    for (const prop of Object.keys(s)) {
      const val = (s as any)[prop];
      if (val != null && val !== "") {
        const name =
          prop[0] == "-"
            ? prop
            : JS_TO_CSS[prop] ||
              (JS_TO_CSS[prop] = prop.replace(CSS_REGEX, "-$&").toLowerCase());

        let suffix = ";";
        if (
          typeof val === "number" &&
          // Exclude custom-attributes
          !name.startsWith("--") &&
          !IS_NON_DIMENSIONAL.has(name)
        ) {
          suffix = "px;";
        }
        str = str + name + ":" + val + suffix;
      }
    }
    return str || undefined;
  };
})();

export function h(
  type: ComponentType,
  props?: { [prop: string]: unknown },
  ...children: ComponentChildren[]
): JSX.Element {
  return { type, props: { ...props, children } };
}

export function Fragment({ children }: { children?: ComponentChildren[] }) {
  return children;
}

function renderNodeSetToString(nodes: ComponentChildren): string {
  if (nodes == null || nodes === false) {
    return "";
  } else if (typeof nodes !== "object") {
    return escapeHTML(`${nodes}`);
  } else if (Array.isArray(nodes)) {
    return nodes
      .map((child: ComponentChildren): string => renderNodeSetToString(child))
      .join("");
  } else {
    return toString(nodes as JSX.Element);
  }
}

export function toString(jsx: JSX.Element): string {
  if (typeof jsx.type === "function") {
    return renderNodeSetToString(jsx.type(jsx.props));
  }

  // render props
  const props = Object.entries(jsx.props)
    .map(([prop, value]: [string, unknown]): string => {
      switch (prop) {
        case "dangerouslySetInnerHTML":
        case "children":
          return "";
        case "className":
          return ` class=${value}`;
        case "style":
          if (value && typeof value === "object")
            return ` ${prop}="${styleObjToCss(value)}"`;
        /* falls through */
        default:
          return ` ${prop}="${""
            .concat(value as string)
            .replace(/\"/g, '\\"')}"`;
      }
    })
    .join("");

  // render inner HTML
  const children = jsx.props?.children ?? [];
  let innerHTML = "";
  if (jsx.props.dangerouslySetInnerHTML != null) {
    innerHTML = jsx.props.dangerouslySetInnerHTML?.__html ?? "";
  } else {
    innerHTML = renderNodeSetToString(children);
  }

  // render HTML tag
  switch (jsx.type) {
    case "area":
    case "base":
    case "basefont":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "input":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "spacer":
    case "track":
    case "wbr":
      return `<${jsx.type}${props} />`;
    default:
      return `<${jsx.type}${props}>${innerHTML}</${jsx.type}>`;
  }
}
