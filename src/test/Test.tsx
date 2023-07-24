import React from 'react';

const Button: React.FC = () => {
  const classPrefix = 'y-button';

  return (
    <div className={`${classPrefix}-container`}>
      <div className={`${classPrefix}-inner`}>button inner</div>
    </div>
  );
};

export default Button;
