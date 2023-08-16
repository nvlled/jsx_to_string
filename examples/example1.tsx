import { h, toString } from "../mod.ts";

function Layout({
  title,
  children,
}: {
  title: string;
  children: JSX.Children;
}) {
  return (
    <html>
      <head>
        <title>{title} Example</title>
        <link rel="stylesheet" href="assets/style.css" />
      </head>
      <body>
        <div className="contents x y" style={{ border: "1px solid green" }}>
          <h1
            style={{
              color: "tomato",
              backgroundColor: "#222",
              textAlign: "center",
            }}
          >
            Example
          </h1>
          {children}
          {() => (
            <div>
              This is a deferred component, it will be rendered after all the
              other non-deferred elements are rendered to string.
            </div>
          )}
        </div>
      </body>
    </html>
  );
}

const homePage = (
  <Layout title={"Home"}>{[<p>This is an example page.</p>]}</Layout>
);

console.log(toString(homePage));
