{/*<div id="outer-div">
    <div id= "inner-div">
        <h1 id="heading"></h1>
        <h1 id="heading2"></h1>
        <h1 id="heading3"></h1>
        <h1 id="heading4"></h1>
    </div>
    </div>*/}
  const heading = React.createElement("div", {id:"outer-div"}, 
    React.createElement("div", {id:"inner-div"},
        [React.createElement("h1", {id:"heading"}, "Hello World from React"),
        React.createElement("h1", {id:"heading2"}, "Hello World from React"),
        React.createElement("h1", {id:"heading3"}, "Hello World from React"),
        React.createElement("h1", {id:"heading4"}, "Hello World from React")]
    )
);
  console.log(heading);
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(heading);