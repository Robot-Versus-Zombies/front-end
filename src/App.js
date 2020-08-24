import React from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';

import './SCSS/main.scss';

function App() {
	return (
		<div className="App">
			<Header />
			<h1 className="title">Robot vs Zombies</h1>
			<GameBoard />
		</div>
	);
}

export default App;
