/// <reference lib="dom" />
/// <reference lib="es2021" />
// deno-lint-ignore-file no-empty-interface no-explicit-any ban-types

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

type ComponentChildren =
  | ComponentChild[]
  | ComponentChild
  | (() => ComponentChild);

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
    type Booleanish = boolean | "true" | "false";
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
    export type Children = ComponentChildren;

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

    export interface DOMAttributes extends PreactDOMAttributes {}

    // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
    export interface AriaAttributes {
      /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
      "aria-activedescendant"?: string | undefined;
      /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
      "aria-atomic"?: Booleanish | undefined;
      /**
       * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
       * presented if they are made.
       */
      "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;
      /**
       * Defines a string value that labels the current element, which is intended to be converted into Braille.
       * @see aria-label.
       */
      "aria-braillelabel"?: string | undefined;
      /**
       * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
       * @see aria-roledescription.
       */
      "aria-brailleroledescription"?: string | undefined;
      /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
      "aria-busy"?: Booleanish | undefined;
      /**
       * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
       * @see aria-pressed
       * @see aria-selected.
       */
      "aria-checked"?: Booleanish | "mixed" | undefined;
      /**
       * Defines the total number of columns in a table, grid, or treegrid.
       * @see aria-colindex.
       */
      "aria-colcount"?: number | undefined;
      /**
       * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
       * @see aria-colcount
       * @see aria-colspan.
       */
      "aria-colindex"?: number | undefined;
      /**
       * Defines a human readable text alternative of aria-colindex.
       * @see aria-rowindextext.
       */
      "aria-colindextext"?: string | undefined;
      /**
       * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
       * @see aria-colindex
       * @see aria-rowspan.
       */
      "aria-colspan"?: number | undefined;
      /**
       * Identifies the element (or elements) whose contents or presence are controlled by the current element.
       * @see aria-owns.
       */
      "aria-controls"?: string | undefined;
      /** Indicates the element that represents the current item within a container or set of related elements. */
      "aria-current"?:
        | Booleanish
        | "page"
        | "step"
        | "location"
        | "date"
        | "time"
        | undefined;
      /**
       * Identifies the element (or elements) that describes the object.
       * @see aria-labelledby
       */
      "aria-describedby"?: string | undefined;
      /**
       * Defines a string value that describes or annotates the current element.
       * @see related aria-describedby.
       */
      "aria-description"?: string | undefined;
      /**
       * Identifies the element that provides a detailed, extended description for the object.
       * @see aria-describedby.
       */
      "aria-details"?: string | undefined;
      /**
       * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
       * @see aria-hidden
       * @see aria-readonly.
       */
      "aria-disabled"?: Booleanish | undefined;
      /**
       * Indicates what functions can be performed when a dragged object is released on the drop target.
       * @deprecated in ARIA 1.1
       */
      "aria-dropeffect"?:
        | "none"
        | "copy"
        | "execute"
        | "link"
        | "move"
        | "popup"
        | undefined;
      /**
       * Identifies the element that provides an error message for the object.
       * @see aria-invalid
       * @see aria-describedby.
       */
      "aria-errormessage"?: string | undefined;
      /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
      "aria-expanded"?: Booleanish | undefined;
      /**
       * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
       * allows assistive technology to override the general default of reading in document source order.
       */
      "aria-flowto"?: string | undefined;
      /**
       * Indicates an element's "grabbed" state in a drag-and-drop operation.
       * @deprecated in ARIA 1.1
       */
      "aria-grabbed"?: Booleanish | undefined;
      /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
      "aria-haspopup"?:
        | Booleanish
        | "menu"
        | "listbox"
        | "tree"
        | "grid"
        | "dialog"
        | undefined;
      /**
       * Indicates whether the element is exposed to an accessibility API.
       * @see aria-disabled.
       */
      "aria-hidden"?: Booleanish | undefined;
      /**
       * Indicates the entered value does not conform to the format expected by the application.
       * @see aria-errormessage.
       */
      "aria-invalid"?: Booleanish | "grammar" | "spelling" | undefined;
      /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
      "aria-keyshortcuts"?: string | undefined;
      /**
       * Defines a string value that labels the current element.
       * @see aria-labelledby.
       */
      "aria-label"?: string | undefined;
      /**
       * Identifies the element (or elements) that labels the current element.
       * @see aria-describedby.
       */
      "aria-labelledby"?: string | undefined;
      /** Defines the hierarchical level of an element within a structure. */
      "aria-level"?: number | undefined;
      /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
      "aria-live"?: "off" | "assertive" | "polite" | undefined;
      /** Indicates whether an element is modal when displayed. */
      "aria-modal"?: Booleanish | undefined;
      /** Indicates whether a text box accepts multiple lines of input or only a single line. */
      "aria-multiline"?: Booleanish | undefined;
      /** Indicates that the user may select more than one item from the current selectable descendants. */
      "aria-multiselectable"?: Booleanish | undefined;
      /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
      "aria-orientation"?: "horizontal" | "vertical" | undefined;
      /**
       * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
       * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
       * @see aria-controls.
       */
      "aria-owns"?: string | undefined;
      /**
       * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
       * A hint could be a sample value or a brief description of the expected format.
       */
      "aria-placeholder"?: string | undefined;
      /**
       * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
       * @see aria-setsize.
       */
      "aria-posinset"?: number | undefined;
      /**
       * Indicates the current "pressed" state of toggle buttons.
       * @see aria-checked
       * @see aria-selected.
       */
      "aria-pressed"?: Booleanish | "mixed" | undefined;
      /**
       * Indicates that the element is not editable, but is otherwise operable.
       * @see aria-disabled.
       */
      "aria-readonly"?: Booleanish | undefined;
      /**
       * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
       * @see aria-atomic.
       */
      "aria-relevant"?:
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
        | undefined;
      /** Indicates that user input is required on the element before a form may be submitted. */
      "aria-required"?: Booleanish | undefined;
      /** Defines a human-readable, author-localized description for the role of an element. */
      "aria-roledescription"?: string | undefined;
      /**
       * Defines the total number of rows in a table, grid, or treegrid.
       * @see aria-rowindex.
       */
      "aria-rowcount"?: number | undefined;
      /**
       * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
       * @see aria-rowcount
       * @see aria-rowspan.
       */
      "aria-rowindex"?: number | undefined;
      /**
       * Defines a human readable text alternative of aria-rowindex.
       * @see aria-colindextext.
       */
      "aria-rowindextext"?: string | undefined;
      /**
       * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
       * @see aria-rowindex
       * @see aria-colspan.
       */
      "aria-rowspan"?: number | undefined;
      /**
       * Indicates the current "selected" state of various widgets.
       * @see aria-checked
       * @see aria-pressed.
       */
      "aria-selected"?: Booleanish | undefined;
      /**
       * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
       * @see aria-posinset.
       */
      "aria-setsize"?: number | undefined;
      /** Indicates if items in a table or grid are sorted in ascending or descending order. */
      "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
      /** Defines the maximum allowed value for a range widget. */
      "aria-valuemax"?: number | undefined;
      /** Defines the minimum allowed value for a range widget. */
      "aria-valuemin"?: number | undefined;
      /**
       * Defines the current value for a range widget.
       * @see aria-valuetext.
       */
      "aria-valuenow"?: number | undefined;
      /** Defines the human readable text alternative of aria-valuenow for a range widget. */
      "aria-valuetext"?: string | undefined;
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
      accept?: string | undefined;
      acceptCharset?: string | undefined;
      accessKey?: string | undefined;
      action?: string | undefined;
      allow?: string | undefined;
      allowFullScreen?: boolean | undefined;
      allowTransparency?: boolean | undefined;
      alt?: string | undefined;
      as?: string | undefined;
      async?: boolean | undefined;
      autocomplete?: string | undefined;
      autoComplete?: string | undefined;
      autocorrect?: string | undefined;
      autoCorrect?: string | undefined;
      autofocus?: boolean | undefined;
      autoFocus?: boolean | undefined;
      autoPlay?: boolean | undefined;
      capture?: boolean | string | undefined;
      cellPadding?: number | string | undefined;
      cellSpacing?: number | string | undefined;
      charSet?: string | undefined;
      challenge?: string | undefined;
      checked?: boolean | undefined;
      cite?: string | undefined;
      class?: string | undefined;
      className?: string | undefined;
      cols?: number | undefined;
      colSpan?: number | undefined;
      content?: string | undefined;
      contentEditable?: boolean | undefined;
      contextMenu?: string | undefined;
      controls?: boolean | undefined;
      controlsList?: string | undefined;
      coords?: string | undefined;
      crossOrigin?: string | undefined;
      data?: string | undefined;
      dateTime?: string | undefined;
      default?: boolean | undefined;
      defaultChecked?: boolean | undefined;
      defaultValue?: string | undefined;
      defer?: boolean | undefined;
      dir?: "auto" | "rtl" | "ltr" | undefined;
      disabled?: boolean | undefined;
      disableRemotePlayback?: boolean | undefined;
      download?: any | undefined;
      decoding?: "sync" | "async" | "auto" | undefined;
      draggable?: boolean | undefined;
      encType?: string | undefined;
      enterkeyhint?:
        | "enter"
        | "done"
        | "go"
        | "next"
        | "previous"
        | "search"
        | "send"
        | undefined;
      for?: string | undefined;
      form?: string | undefined;
      formAction?: string | undefined;
      formEncType?: string | undefined;
      formMethod?: string | undefined;
      formNoValidate?: boolean | undefined;
      formTarget?: string | undefined;
      frameBorder?: number | string | undefined;
      headers?: string | undefined;
      height?: number | string | undefined;
      hidden?: boolean | "hidden" | "until-found" | undefined;
      high?: number | undefined;
      href?: string | undefined;
      hrefLang?: string | undefined;
      htmlFor?: string | undefined;
      httpEquiv?: string | undefined;
      icon?: string | undefined;
      id?: string | undefined;
      indeterminate?: boolean | undefined;
      inert?: boolean | undefined;
      inputMode?: string | undefined;
      integrity?: string | undefined;
      is?: string | undefined;
      keyParams?: string | undefined;
      keyType?: string | undefined;
      kind?: string | undefined;
      label?: string | undefined;
      lang?: string | undefined;
      list?: string | undefined;
      loading?: "eager" | "lazy" | undefined;
      loop?: boolean | undefined;
      low?: number | undefined;
      manifest?: string | undefined;
      marginHeight?: number | undefined;
      marginWidth?: number | undefined;
      max?: number | string | undefined;
      maxLength?: number | undefined;
      media?: string | undefined;
      mediaGroup?: string | undefined;
      method?: string | undefined;
      min?: number | string | undefined;
      minLength?: number | undefined;
      multiple?: boolean | undefined;
      muted?: boolean | undefined;
      name?: string | undefined;
      nomodule?: boolean | undefined;
      nonce?: string | undefined;
      noValidate?: boolean | undefined;
      open?: boolean | undefined;
      optimum?: number | undefined;
      part?: string | undefined;
      pattern?: string | undefined;
      ping?: string | undefined;
      placeholder?: string | undefined;
      playsInline?: boolean | undefined;
      poster?: string | undefined;
      preload?: string | undefined;
      radioGroup?: string | undefined;
      readonly?: boolean | undefined;
      readOnly?: boolean | undefined;
      referrerpolicy?:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url"
        | undefined;
      rel?: string | undefined;
      required?: boolean | undefined;
      reversed?: boolean | undefined;
      role?: AriaRole | undefined;
      rows?: number | undefined;
      rowSpan?: number | undefined;
      sandbox?: string | undefined;
      scope?: string | undefined;
      scoped?: boolean | undefined;
      scrolling?: string | undefined;
      seamless?: boolean | undefined;
      selected?: boolean | undefined;
      shape?: string | undefined;
      size?: number | undefined;
      sizes?: string | undefined;
      slot?: string | undefined;
      span?: number | undefined;
      spellcheck?: boolean | undefined;
      spellCheck?: boolean | undefined;
      src?: string | undefined;
      srcset?: string | undefined;
      srcDoc?: string | undefined;
      srcLang?: string | undefined;
      srcSet?: string | undefined;
      start?: number | undefined;
      step?: number | string | undefined;
      style?: string | CSSProperties | undefined;
      summary?: string | undefined;
      tabIndex?: number | undefined;
      target?: string | undefined;
      title?: string | undefined;
      type?: string | undefined;
      useMap?: string | undefined;
      value?: string | string[] | number | undefined;
      volume?: string | number | undefined;
      width?: number | string | undefined;
      wmode?: string | undefined;
      wrap?: string | undefined;

      // Non-standard Attributes
      autocapitalize?:
        | "off"
        | "none"
        | "on"
        | "sentences"
        | "words"
        | "characters"
        | undefined;
      autoCapitalize?:
        | "off"
        | "none"
        | "on"
        | "sentences"
        | "words"
        | "characters"
        | undefined;
      disablePictureInPicture?: boolean | undefined;
      results?: number | undefined;
      translate?: "yes" | "no" | undefined;

      // RDFa Attributes
      about?: string | undefined;
      datatype?: string | undefined;
      inlist?: any;
      prefix?: string | undefined;
      property?: string | undefined;
      resource?: string | undefined;
      typeof?: string | undefined;
      vocab?: string | undefined;

      // Microdata Attributes
      itemProp?: string | undefined;
      itemScope?: boolean | undefined;
      itemType?: string | undefined;
      itemID?: string | undefined;
      itemRef?: string | undefined;
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
  if (typeof nodes === "function") {
    nodes = nodes();
  }

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
          return ` class="${value}"`;
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
