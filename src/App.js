import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import Mute from './images/volume_off-24px.svg';
import Unmute from './images/volume_up-24px.svg';
import './SCSS/main.scss';

function App() {
	const [isMuted, setIsMuted] = useLocalStorage(true);
	return (
		<div className="App">
			<Header />
			<h1 className="title">Robot vs Zombies</h1>
			<img
				onClick={() => setIsMuted(!isMuted)}
				src={isMuted ? Mute : Unmute}
				alt={isMuted ? 'unmute' : 'mute'}
			/>
			<GameBoard isMuted={isMuted} />
		</div>
	);
}

export default App;
