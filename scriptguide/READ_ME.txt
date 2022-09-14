
Keywords:
*play: plays a song. must be a .wav file.
	- For example *play:bug_loop looks for bug_loop.wav in this directory.
*choice: must be followed by a series of '#' buttons.
#: turns that text into a button
*wait: tells the program to pause for n seconds.
*speed: changes the rate at which the text moves upwards for the rest of the program
	- It can be used multiple times throughout the script.
*fade: changes the fading speed at which the text opacity changes from 0-100%
	- It can be used multiple times throughout the script.
Any other line without a keyword will be displayed as normal text