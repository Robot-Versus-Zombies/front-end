import React from 'react';
import Logo from '../images/just-text-rvz-png.png';
export default function Header() {
	return (
		<header className="header">
			<img alt="rvz logo" width="100px" src={Logo} />
		</header>
	);
}
