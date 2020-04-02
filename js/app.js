window.addEventListener('DOMContentLoaded', function () {
	'use strict';

	// Letter count up for scrolling 
	let checkedItemCount = 133,
			checkedItemFixedUp = 133;

	// Key press event 
	document.addEventListener('keyup', typing);		

	// Wrapper function call
	wrapperForWords();

	// Wrapper for words 
	function wrapperForWords() {
		let text = document.querySelector('.textpanel__paragraph').textContent,
				textArray = text.replace(/\s+/g, ' ').trim().split(''),
				textBox = document.querySelector('.textpanel__paragraph'),
				out = '';
				
		for (let key of textArray) {
			out += `<span class="textpanel__letter textpanel__letter--notchecked">${key}</span>`;
		}

		textBox.innerHTML = out;
	}

	// Typing 
	function typing(e) {
		let notCheckedLetter = document.querySelectorAll('.textpanel__letter--notchecked');
		
		if (e.keyCode !== 16) {
			for (let i = 0; i < notCheckedLetter.length; i++) {
				if (notCheckedLetter[i].textContent == e.key) {
					notCheckedLetter[i].classList.remove('textpanel__letter--notchecked');
					notCheckedLetter[i].classList.remove('textpanel__letter--invalid');
					notCheckedLetter[i].classList.add('textpanel__letter--checked');
					autoScroll();
					break;
				} else {
					// notCheckedLetter[i].classList.remove('textpanel__letter--notchecked');
					notCheckedLetter[i].classList.add('textpanel__letter--invalid');
					break;
	
				}
			}
		}

	}

	// Auto scroll 
	function autoScroll() {
		let checkedElem = document.querySelectorAll('.textpanel__letter--checked'),
				textWrapper = document.querySelector('.textpanel__paragraph');
		
		if (checkedElem.length == checkedItemCount) {
			textWrapper.scrollTop = textWrapper.scrollTop + 100;
			checkedItemCount = checkedItemCount + checkedItemFixedUp;
		} 

	}
	
	// Remove auto scroll when clicked in block

	// Animation key press, and sound when key pressing 
	document.addEventListener('keydown', keyPressingDown);
	document.addEventListener('keyup', keyPressingUp);

	function keyPressingDown(e) {
		let keyBtn = document.querySelectorAll('.keyboard__button'),
				audio = new Audio();

		audio.preload = 'auto';
		audio.src = '/sound/typewriter.mp3';
				
		for (let i = 0; i < keyBtn.length; i++) {
			if (e.key == keyBtn[i].dataset.symbolFirst || e.key == keyBtn[i].dataset.symbolSecond || e.key == keyBtn[i].dataset.symbol) {
				keyBtn[i].classList.add('keyboard__button--press');
				audio.play();
				break;
			} else {
				keyBtn[i].classList.remove('keyboard__button--press');
			}
		}
	}

	function keyPressingUp(e) {
		let keyBtn = document.querySelectorAll('.keyboard__button');
		
		setTimeout(function () {
			for (let i = 0; i < keyBtn.length; i++) {
				keyBtn[i].classList.remove('keyboard__button--press');
			}
		}, 1000);
	}



});