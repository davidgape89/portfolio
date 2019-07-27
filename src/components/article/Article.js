import React from 'react';

export default (props) => {
  const { title } = props;

  return (
    <article>
      <h1>{title}</h1>
    </article>
  );
}
