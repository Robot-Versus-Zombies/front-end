import React from 'react';

import './SCSS/main.scss';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import ToggleButton from './components/ToggleMuteButton';

// Assuming GameBoard is imported correctly

function App() {
	const [isMuted, setIsMuted] = React.useState<boolean>(true);

	const toggleMute = React.useCallback(() => {
		setIsMuted(!isMuted);
	}, [isMuted]);

	return (
		<div id="app" className="App">
			<Header />
			<h1 className="title">Robot vs Zombies</h1>
			<ToggleButton isMuted={isMuted} toggleMute={toggleMute} />
			<GameBoard isMuted={isMuted} />
		</div>
	);
}

export default App;
