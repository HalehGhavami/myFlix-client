import React from 'react';

export class MainView extends React.Component {
  render() {
    return (
      <div className="main-view">
        <div>Inception</div>
        <div>The Shawshank Redemption</div>
        <div>Gladiator</div>
      </div>
    );
  }
}

// so we  get rid of the curly braces when importing MainView in index.jsx
export default MainView;
