import React from 'react';

interface LoadingProps {
  color?: string;
  size?: number;
  rotatePeriod?: number;
  style?: Record<string, string>;
}

const Loading: React.FC<LoadingProps> = React.memo((props) => {
  const classPrefix = 'y';
  const { color = '#1C61EA', size = 16, rotatePeriod = 1, style = {} } = props;

  const newStyle = {
    width: `${size}px`,
    height: `${size}px`,
    '--gradient-color': color,
    '--rotate-period': `${rotatePeriod}s`,
    ...style,
  };
  return (
    <div className={`${classPrefix}-container`} style={newStyle}>
      <div className={`${classPrefix}-loading`} />
    </div>
  );
});

export default Loading;
