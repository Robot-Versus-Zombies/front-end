import { useEffect, RefObject } from 'react';

interface IUseAudioMuteToggle {
	isMuted: boolean;
	audioElements: RefObject<HTMLAudioElement>[];
}

export const useAudioMuteToggle = ({
	isMuted,
	audioElements,
}: IUseAudioMuteToggle) => {
	useEffect(() => {
		audioElements.forEach((audioRef) => {
			if (audioRef.current) {
				audioRef.current.volume = isMuted ? 0 : 1;
			}
		});
	}, [isMuted]);
};
