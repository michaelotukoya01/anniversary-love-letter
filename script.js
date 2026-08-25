     1	document.addEventListener('DOMContentLoaded', () => {
     2	    // Elements
     3	    const passwordGate = document.getElementById('password-gate');
     4	    const mainExperience = document.getElementById('main-experience');
     5	    const passwordInput = document.getElementById('password-input');
     6	    const unlockButton = document.getElementById('unlock-button');
     7	    const passwordError = document.getElementById('password-error');
     8	    const introQuote = document.querySelector('.intro-quote');
     9	    const letterContainer = document.getElementById('letter-container');
    10	    const letter = document.getElementById('letter');
    11	    const tapHint = document.querySelector('.tap-hint');
    12	    const scrollContainer = document.getElementById('scroll-container');
    13	    const scroll = document.querySelector('.scroll');
    14	    const scrollRodTop = document.querySelector('.scroll-rod-top');
    15	    const scrollRodBottom = document.querySelector('.scroll-rod-bottom');
    16	    const parchment = document.querySelector('.parchment');
    17	    const letterContent = document.querySelector('.letter-content');
    18	    const finalMessage = document.getElementById('final-message');
    19	    const finalTexts = document.querySelectorAll('.final-text');
    20	    const signature = document.querySelector('.signature');
    21	    const seventh = document.querySelector('.seventh');
    22	    const musicControl = document.getElementById('music-control');
    23	    const musicToggle = document.getElementById('music-toggle');
    24	    const musicIcon = document.getElementById('music-icon');
    25	
    26	    // State
    27	    let state = {
    28	        unlocked: false,
    29	        introShown: false,
    30	        letterShown: false,
    31	        scrollOpened: false,
    32	        letterRevealed: false,
    33	        finalShown: false,
    34	        musicPlaying: false
    35	    };
    36	
    37	    // Audio element (created lazily)
    38	    let backgroundAudio = null;
    39	
    40	    // Letter content (as provided in the prompt)
    41	    const letterText = `Happy anniversary my babyyyy.🥹
    42	
    43	it’s been so long I did this, so why not today?
    44	
    45	I’ve been thinking about what we’ve shared, everything we’ve considered and I realised how much you mean to me. If you asked me in April what our relationship would look like now I’d have said non-existent.
    46	
    47	there’s been so much arguments, laughter and weird ass moments, days when everything felt perfect and even the days when things didn’t feel so perfect, we got here…together.
    48	
    49	We both know what you mean to me. Loving you doesn’t feel like a chore.I’ve joked with you, gotten angry with you, missed you(I still do sm) and loved you. Everything that you do feels important to me and I always know that whenever I have something to say there’s someone ready to listen to me(even if you might judge me). I remember crying on the phone and then I’d up laughing and that’s my whyyy.
    50	
    51	I see you, I appreciate you, I appreciate the person you are, the things you’ve gone out of your way to do for me, the love you’ve shown me and understanding me cause I know I’m not the easiest person to understand. I appreciate every time you’ve made me laugh, everytime you’ve listened to me, everytime you’re exhausted and you’d tell me not to hesitate to talk to you or call you if you’re asleep. thank you for supporting me and always reminding me of how beautiful I am.Genuinely, thank you.
    52	
    53	broo, I’m also going to talk about our difficult moments. so many times we didn’t understand each other, so many times things felt odd, times we were so distant and times where I thought it wasn’t worth it.
    54	
    55	but those moments didn’t break us nor ruin what we had for each other, it built us in the relationship.
    56	
    57	we communicated, we understood ourselves, we forgave ourselves and we’ve grown.
    58	
    59	Times where I could have communicated better, been more patient or understood you better. I’ve never intended to make you feel unloved, unappreciated or like you weren’t important to me.
    60	
    61	seeing you just made me feel sm better and then I realized I too love this boy o. yet again, I’m so happy I did what I did and I’m happy I had to do it with you and I’m looking forward to sm more.
    62	
    63	Thank you for being a huge part of my life. Thank you for loving me in ways you know how. Thank you for being you.
    64	
    65	I remember when we got together I didn’t know how to feel about, I didn’t know what to expect and it’s so nice that we did this together. you’re not just my ordinary friend anymore but alot more and mine.
    66	
    67	You definitely know that you are loved and you know how much you matter to me and even on days that isn’t perfect and I don’t say enough, I hope you can feel how much you mean to me.
    68	
    69	I am so grateful for you and I’ll always the place you have in my life.
    70	
    71	Happy anniversary to us my loveee.😚
    72	
    73	I hope today and many more days remind us of how awesome we are.`;
    74	
    75	    // Split the letter text into paragraphs (by double newline)
    76	    const paragraphs = letterText.split('\n\n').filter(p => p.trim() !== '');
    77	
    78	    // Function to inject letter content into the parchment
    79	    function injectLetterContent() {
    80	        letterContent.innerHTML = '';
    81	        paragraphs.forEach((paragraph, index) => {
    82	            const p = document.createElement('p');
    83	            p.textContent = paragraph;
    84	            // Add emphasis class to certain lines
    85	            if (["we got here...together.", "Genuinely, thank you.", "it built us in the relationship.", "I too love this boy o.", "Thank you for being you."].some(phrase => paragraph.includes(phrase))) {
    86	                p.classList.add('emphasis');
    87	            }
    88	            letterContent.appendChild(p);
    89	        });
    90	        // Force a reflow to ensure layout updates
    91	        letterContent.offsetHeight;
    92	    }
    93	
    94	    // Function to get or create audio element (without setting src until needed)
    95	    function getAudio() {
    96	        if (!backgroundAudio) {
    97	            backgroundAudio = new Audio();
    98	            backgroundAudio.loop = true;
    99	            backgroundAudio.volume = 0.5;
   100	        }
   101	        backgroundAudio.src = '/audio/a-thousand-years.mp3';
   102	        return backgroundAudio;
   103	    }
   104	
   105	    // Password handling
   106	    unlockButton.addEventListener('click', () => {
   107	        console.log('Unlock button clicked');
   108	        const password = passwordInput.value.trim();
   109	        if (password === '0509') {
   110	            console.log('Password correct');
   111	            // Correct password
   112	            passwordError.textContent = '';
   113	            unlockButton.classList.add('glowing');
   114	            // Start transition
   115	            setTimeout(() => {
   116	                passwordGate.classList.add('fading-out');
   117	                setTimeout(() => {
   118	                    passwordGate.classList.add('hidden');
   119	                    mainExperience.classList.remove('hidden');
   120	                    mainExperience.classList.add('visible'); // Ensure opacity transition
   121	                    // Trigger intro quote animation
   122	                    setTimeout(() => {
   123	                        introQuote.classList.add('visible');
   124	                        state.introShown = true;
   125	                        // After intro quote, show letter
   126	                        setTimeout(() => {
   127	                            letterContainer.classList.remove('hidden');
   128	                            letter.classList.add('visible');
   129	                            tapHint.classList.add('visible');
   130	                            state.letterShown = true;
   131	                        }, 1500);
   132	                    }, 1000);
   133	                }, 500);
   134	            }, 500);
   135	        } else {
   136	            console.log('Password incorrect');
   137	            // Incorrect password
   138	            passwordError.textContent = 'Not quite... try again. ♡';
   139	            passwordInput.value = '';
   140	            passwordInput.focus();
   141	            // Shake animation (optional)
   142	            passwordInput.style.animation = 'shake 0.5s';
   143	            setTimeout(() => {
   144	                passwordInput.style.animation = '';
   145	            }, 500);
   146	        }
   147	    });
   148	
   149	    // Allow Enter key to trigger unlock
   150	    passwordInput.addEventListener('keypress', (e) => {
   151	        if (e.key === 'Enter') {
   152	            unlockButton.click();
   153	        }
   154	    });
   155	
   156	    // Letter click handling
   157	    letterContainer.addEventListener('click', async () => {
   158	        if (!state.letterShown || state.scrollOpened) return;
   159	
   160	        // Hide the letter and show the scroll container
   161	        letterContainer.classList.add('hidden');
   162	        scrollContainer.classList.remove('hidden');
   163	
   164	        // Start music
   165	        try {
   166	            const audio = getAudio();
   167	            await audio.play();
   168	            state.musicPlaying = true;
   169	            musicControl.classList.add('visible');
   170	        } catch (e) {
   171	            console.warn('Autoplay blocked or failed:', e);
   172	            // Still show music control so user can try to play later
   173	            musicControl.classList.add('visible');
   174	        }
   175	
   176	        // Trigger scroll animation
   177	        setTimeout(() => {
   178	            scrollRodTop.classList.add('rotating-up');
   179	            scrollRodBottom.classList.add('rotating-down');
   180	            parchment.classList.add('unrolling');
   181	            state.scrollOpened = true;
   182	        }, 300);
   183	
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
            // After all paragraphs revealed, show final message
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
            }, pElements.length * 300); // Wait for all paragraphs to be revealed
        }, 2500); // Wait for scroll animation to complete
   216	    });
   217	
   218	    // Music toggle
   219	    musicToggle.addEventListener('click', () => {
   220	        if (state.musicPlaying) {
   221	            if (backgroundAudio) {
   222	                backgroundAudio.pause();
   223	            }
   224	            state.musicPlaying = false;
   225	            musicToggle.classList.add('muted');
   226	        } else {
   227	            const audio = getAudio();
   228	            audio.play().then(() => {
   229	                state.musicPlaying = true;
   230	                musicToggle.classList.remove('muted');
   231	            }).catch(e => {
   232	                console.warn('Playback failed:', e);
   233	            });
   234	        }
   235	    });
   236	
   237	    // Handle audio ended (loop is set, but just in case)
   238	    if (backgroundAudio) {
   239	        backgroundAudio.addEventListener('ended', () => {
   240	            if (state.musicPlaying) {
   241	                backgroundAudio.play().catch(e => console.warn('Loop failed:', e));
   242	            }
   243	        });
   244	    }
   245	
   246	    // Handle visibility change (pause audio when tab is hidden)
   247	    document.addEventListener('visibilitychange', () => {
   248	        if (document.hidden) {
   249	            if (backgroundAudio) backgroundAudio.pause();
   250	        } else if (state.musicPlaying) {
   251	            if (backgroundAudio) {
   252	                backgroundAudio.play().catch(e => console.warn('Resume failed:', e));
   253	            }
   254	        }
   255	    });
   256	});
   257	
   258	// Add shake animation keyframes for incorrect password
   259	const style = document.createElement('style');
   260	style.textContent = `
   261	@keyframes shake {
   262	    0% { transform: translateX(0); }
   263	    25% { transform: translateX(-5px); }
   264	    50% { transform: translateX(5px); }
   265	    75% { transform: translateX(-5px); }
   266	    100% { transform: translateX(0); }
   267	}`;
   268	document.head.appendChild(style);
