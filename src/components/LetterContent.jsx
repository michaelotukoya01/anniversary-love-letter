import React from 'react';
import EmotionalQuote from './EmotionalQuote';

// Original letter text as provided in the prompt (without the closing messages)
const actualLetterText = `Happy anniversary my babyyyy.🥹

it’s been so long I did this, so why not today?

I’ve been thinking about what we’ve shared, everything we’ve considered and I realised how much you mean to me. If you asked me in April what our relationship would look like now I’d have said non-existent.

there’s been so much arguments, laughter and weird ass moments, days when everything felt perfect and even the days when things didn’t feel so perfect, we got here…together.

We both know what you mean to me. Loving you doesn’t feel like a chore.I’ve joked with you, gotten angry with you, missed you(I still do sm) and loved you. Everything that you do feels important to me and I always know that whenever I have something to say there’s someone ready to listen to me(even if you might judge me). I remember crying on the phone and then I’d up laughing and that’s my whyyy.

I see you, I appreciate you, I appreciate the person you are, the things you’ve gone out of your way to do for me, the love you’ve shown me and understanding me cause I know I’m not the easiest person to understand. I appreciate every time you’ve made me laugh, everytime you’ve listened to me, everytime you’re exhausted and you’d tell me not to hesitate to talk to you or call you if you’re asleep. thank you for supporting me and always reminding me of how beautiful I am.Genuinely, thank you.

broo, I’m also going to talk about our difficult moments. so many times we didn’t understand each other, so many times things felt odd, times we were so distant and times where I thought it wasn’t worth it.

but those moments didn’t break us nor ruin what we had for each other, it built us in the relationship.

we communicated, we understood ourselves, we forgave ourselves and we’ve grown.

Times where I could have communicated better, been more patient or understood you better. I’ve never intended to make you feel unloved, unappreciated or like you weren’t important to me.

seeing you just made me feel sm better and then I realized I too love this boy o. yet again, I’m so happy I did what I did and I’m happy I had to do it with you and I’m looking forward to sm more.

Thank you for being a huge part of my life. Thank you for loving me in ways you know how. Thank you for being you.

I remember when we got together I didn’t know how to feel about, I didn’t know what to expect and it’s so nice that we did this together. you’re not just my ordinary friend anymore but alot more and mine.

You definitely know that you are loved and you know how much you matter to me and even on days that isn’t perfect and I don’t say enough, I hope you can feel how much you mean to me.

I am so grateful for you and I’ll always the place you have in my life.

Happy anniversary to us my loveee.😚

I hope today and many more days remind us of how awesome we are.`;

// Closing messages (to be shown on final page)
const closingMessagesText = `Our story may not always be perfectly but it is ours and that makes every page worth turning.

with all my heart, always yours.

7 • always`;

// Split actual letter text into sections based on double newline
const sections = actualLetterText
  .split('\n\n')
  .filter(section => section.trim() !== '');

const LetterContent = ({ onReadMore }) => {
  return (
    <div className="max-w-prose px-6 pt-8 pb-6 text-gray-800 font-serif leading-relaxed">
      {sections.map((section, index) => {
        // Check if this section contains an emotional quote we want to highlight
        const emotionalQuotes = [
          "we got here…together.",
          "I see you, I appreciate you…",
          "Genuinely, thank you.",
          "it built us in the relationship.",
          "I too love this boy o.",
          "Thank you for being you.",
          "you are loved"
        ];

        // We'll check if any of the emotional quotes is contained in this section
        const isEmotional = emotionalQuotes.some(quote => section.includes(quote));

        return (
          <div key={index} className="mb-10">
            {isEmotional ? (
              <EmotionalQuote text={section} className="font-italic" />
            ) : (
              <p>{section}</p>
            )}
          </div>
        );
      })}

      {/* Read More button to navigate to final page */}
      {onReadMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onReadMore}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
          >
            Read More ❤️
          </button>
        </div>
      )}
    </div>
  );
};

export default LetterContent;