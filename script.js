document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const passwordGate = document.getElementById('password-gate');
    const mainExperience = document.getElementById('main-experience');
    const passwordInput = document.getElementById('password-input');
    const unlockButton = document.getElementById('unlock-button');
    const passwordError = document.getElementById('password-error');
    const introQuote = document.querySelector('.intro-quote');
    const letterContainer = document.getElementById('letter-container');
    const letter = document.getElementById('letter');
    const tapHint = document.querySelector('.tap-hint');
    const scrollContainer = document.getElementById('scroll-container');
    const scroll = document.querySelector('.scroll');
    const scrollRodTop = document.querySelector('.scroll-rod-top');
    const scrollRodBottom = document.querySelector('.scroll-rod-bottom');
    const parchment = document.querySelector('.parchment');
    const letterContent = document.querySelector('.letter-content');
    const finalMessage = document.getElementById('final-message');
    const finalTexts = document.querySelectorAll('.final-text');
    const signature = document.querySelector('.signature');
    const seventh = document.querySelector('.seventh');
    const musicControl = document.getElementById('music-control');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');

    // State
    let state = {
        unlocked: false,
        introShown: false,
        letterShown: false,
        scrollOpened: false,
        letterRevealed: false,
        finalShown: false,
        musicPlaying: false
    };

    // Audio element (created lazily)
    let backgroundAudio = null;

    // Letter content (as provided in the prompt)
    const letterText = `Happy anniversary my babyyyy.🥹

it's been so long I did this, so why not today?

I've been thinking about what we've shared, everything we've considered and I realised how much you mean to me. If you asked me in April what our relationship would look like now I'd have said non-existent.

there's been so much arguments, laughter and weird ass moments, days when everything felt perfect and even the days when things didn't feel so perfect, we got here...together.

We both know what you mean to me. Loving you doesn't feel like a chore.I've joked with you, gotten angry with you, missed you(I still do sm) and loved you. Everything that you do feels important to me and I always know that whenever I have something to say there's someone ready to listen to me(even if you might judge me). I remember crying on the phone and then I'd up laughing and that's my whyyy.

I see you, I appreciate you, I appreciate the person you are, the things you've gone out of your way to do for me, the love you've shown me and understanding me cause I know I'm not the easiest person to understand. I appreciate every time you've made me laugh, everytime you've listened to me, everytime you're exhausted and you'd tell me not to hesitate to talk to you or call you if you're asleep. thank you for supporting me and always reminding me of how beautiful I am.Genuinely, thank you.

broo, I'm also going to talk about our difficult moments. so many times we didn't understand each other, so many times things felt odd, times we were so distant and times where I thought it wasn't worth it.

but those moments didn't break us nor ruin what we had for each other, it built us in the relationship.

we communicated, we understood ourselves, we forgave ourselves and we've grown.

Times where I could have communicated better, been more patient or understood you better. I've never intended to make you feel unloved, unappreciated or like you weren't important to me.

seeing you just made me feel sm better and then I realized I too love this boy o. yet again, I'm so happy I did what I did and I'm happy I had to do it with you and I'm looking forward to sm more.

Thank you for being a huge part of my life. Thank you for loving me in ways you know how. Thank you for being you.

I remember when we got together I didn't know how to feel about, I didn't know what to expect and it's so nice that we did this together. you're not just my ordinary friend anymore but alot more and mine.

You definitely know that you are loved and you know how much you matter to me and even on days that isn't perfect and I don't say enough, I hope you can feel how much you mean to me.

I am so grateful for you and I'll always the place you have in my life.

Happy anniversary to us my loveee.😚

I hope today and many more days remind us of how awesome we are.`;

    // Split the letter text into paragraphs (by double newline)
    const paragraphs = letterText.split('\n\n').filter(p => p.trim() !== '');

    // Function to inject letter content into the parchment
    function injectLetterContent() {
        letterContent.innerHTML = '';
        paragraphs.forEach((paragraph, index) => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            // Add emphasis class to certain lines
            if (["we got here...together.", "Genuinely, thank you.", "it built us in the relationship.", "I too love this boy o.", "Thank you for being you."].some(phrase => paragraph.includes(phrase))) {
                p.classList.add('emphasis');
            }
            letterContent.appendChild(p);
        });
        // Force a reflow to ensure layout updates
        letterContent.offsetHeight;
    }

    // Function to get or create audio element (without setting src until needed)
    function getAudio() {
        if (!backgroundAudio) {
            backgroundAudio = new Audio();
            backgroundAudio.loop = true;
            backgroundAudio.volume = 0.5;
        }
        backgroundAudio.src = 'assets/audio/a-thousand-years.mp3';
        return backgroundAudio;
    }

    // Password handling
    unlockButton.addEventListener('click', () => {
        console.log('Unlock button clicked');
        const password = passwordInput.value.trim();
        if (password === '0509') {
            console.log('Password correct');
            // Correct password
            passwordError.textContent = '';
            unlockButton.classList.add('glowing');
            // Start transition
            setTimeout(() => {
                passwordGate.classList.add('fading-out');
                setTimeout(() => {
                    passwordGate.classList.add('hidden');
                    mainExperience.classList.remove('hidden');
                    mainExperience.classList.add('visible'); // Ensure opacity transition
                    // Trigger intro quote animation
                    setTimeout(() => {
                        introQuote.classList.add('visible');
                        state.introShown = true;
                        // After intro quote, show letter
                        setTimeout(() => {
                            letterContainer.classList.remove('hidden');
                            letter.classList.add('visible');
                            tapHint.classList.add('visible');
                            state.letterShown = true;
                        }, 1500);
                    }, 1000);
                }, 500);
            }, 500);
        } else {
            console.log('Password incorrect');
            // Incorrect password
            passwordError.textContent = 'Not quite... try again. ♡';
            passwordInput.value = '';
            passwordInput.focus();
            // Shake animation (optional)
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
        }
    });

    // Allow Enter key to trigger unlock
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            unlockButton.click();
        }
    });

    // Letter click handling
    letterContainer.addEventListener('click', async () => {
        if (!state.letterShown || state.scrollOpened) return;

        // Hide the letter and show the scroll container
        letterContainer.classList.add('hidden');
        scrollContainer.classList.remove('hidden');

        // Start music
        try {
            const audio = getAudio();
            await audio.play();
            state.musicPlaying = true;
            musicControl.classList.add('visible');
        } catch (e) {
            console.warn('Autoplay blocked or failed:', e);
            // Still show music control so user can try to play later
            musicControl.classList.add('visible');
        }

        // Trigger scroll animation
        setTimeout(() => {
            scrollRodTop.classList.add('rotating-up');
            scrollRodBottom.classList.add('rotating-down');
            parchment.classList.add('unrolling');
            state.scrollOpened = true;
        }, 300);

        // After scroll animation, start revealing letter content
        setTimeout(() => {
            injectLetterContent();
            // Reveal paragraphs one by one with a delay
            const pElements = letterContent.querySelectorAll('p');
            pElements.forEach((p, index) => {
                setTimeout(() => {
                    p.classList.add('visible');
                }, index * 300); // 300ms between each paragraph
            });
            state.letterRevealed = true;
        }, 2500); // Wait for scroll animation to complete

        // After letter content revealed, show final message
        setTimeout(() => {
            finalMessage.classList.remove('hidden');
            // Animate in final message line by line
            setTimeout(() => {
                finalTexts.forEach((text, index) => {
                    setTimeout(() => {
                        text.classList.add('visible');
                    }, index * 400);
                });
                setTimeout(() => {
                    signature.classList.add('visible');
                }, finalTexts.length * 400 + 200);
                setTimeout(() => {
                    seventh.classList.add('visible');
                }, finalTexts.length * 400 + 600);
            }, 500);
            state.finalShown = true;
        }, 4500); // After letter content reveal + buffer
    });

    // Music toggle
    musicToggle.addEventListener('click', () => {
        if (state.musicPlaying) {
            if (backgroundAudio) {
                backgroundAudio.pause();
            }
            state.musicPlaying = false;
            musicToggle.classList.add('muted');
        } else {
            const audio = getAudio();
            audio.play().then(() => {
                state.musicPlaying = true;
                musicToggle.classList.remove('muted');
            }).catch(e => {
                console.warn('Playback failed:', e);
            });
        }
    });

    // Handle audio ended (loop is set, but just in case)
    if (backgroundAudio) {
        backgroundAudio.addEventListener('ended', () => {
            if (state.musicPlaying) {
                backgroundAudio.play().catch(e => console.warn('Loop failed:', e));
            }
        });
    }

    // Handle visibility change (pause audio when tab is hidden)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (backgroundAudio) backgroundAudio.pause();
        } else if (state.musicPlaying) {
            if (backgroundAudio) {
                backgroundAudio.play().catch(e => console.warn('Resume failed:', e));
            }
        }
    });
});

// Add shake animation keyframes for incorrect password
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}`;
document.head.appendChild(style);