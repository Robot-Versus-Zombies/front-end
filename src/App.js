import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import Mute from './images/volume_off-24px.svg';
import Unmute from './images/volume_up-24px.svg';
import './SCSS/main.scss';

function App() {
	const [muted, setMuted] = useState(true);
	return (
		<div className="App">
			<Header />
			<h1 className="title">Robot vs Zombies</h1>
			<img
				onClick={() => setMuted(!muted)}
				src={muted ? Mute : Unmute}
				alt={muted ? 'unmute' : 'mute'}
			/>
			<GameBoard muted={muted} />
		</div>
	);
}

export default App;
