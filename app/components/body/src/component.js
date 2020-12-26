import React from 'react';

const Body = () => {
  const [count, setCount] = React.useState(0);
  return <div>This is some body <button onClick={() => setCount(count + 1)}>CLick</button>{count}</div>
};

export default Body;
