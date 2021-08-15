import React, { FC } from 'react';

const App: FC = () => {
  return (
    <div className="bg-red-100 min-h-screen flex">
      <div className="bg-blue-100 flex-auto">1</div>
      <div className="bg-purple-300 max-w-screen-sm flex-auto">2</div>
      <div className="bg-blue-100 flex-auto">3</div>
    </div>
  );
};

export default App;
