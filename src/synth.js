import Tone from 'tone';

export const synth = new Tone.Synth().toMaster()

export function synthSelector(instrument, options){
	switch(instrument){
		case 'kick':
			let kick = new Tone.MembraneSynth(options).toMaster();
			return kick;
			break;
		case 'snare':
			let snare = new Tone.NoiseSynth(options).toMaster();
			return snare;
			break;
		case 'openHat':
			let synth = new Tone.Synth().toMaster()
			return synth;
			break;
		default:
			return null
	}
}


export const kickOptions = {
	pitchDecay  : 0.05 ,
	octaves  : 10 ,
	oscillator  : {
		type  : 'sine'
		},
	envelope  : {
		attack  : 0.001 ,
		decay  : 0.4 ,
		sustain  : 0.01 ,
		release  : 1.4 ,
		attackCurve  : 'exponential'
		}
	};

export const snareOptions = {
	type: 'white', 
	envelope: {
		attack: 0.005,
		decay: 0.1,
		sustain: 0.1
	}
}
