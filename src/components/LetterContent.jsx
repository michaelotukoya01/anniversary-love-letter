import React from 'react';
import { motion } from 'framer-motion';
import EmotionalQuote from './EmotionalQuote';

// We'll split the letter into sections based on double newlines or natural breaks
const letterText = `Happy anniversary my babyyyy.🥹

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

Happy anniversary to us my loveee.😚I hope today and many more days remind us of how awesome we are.`;

// Split by double newline to get sections
const sections = letterText.split('\n\n').filter(section => section.trim() !== '');

const LetterContent = () => {
  return (
    <div className="relative max-w-3xl mx-auto px-6 pt-8 pb-6 text-gray-800 font-serif font-bold text-xl md:text-2xl leading-relaxed">
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
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="mb-10"
          >
            {isEmotional ? (
              <EmotionalQuote text={section} className="font-bold" />
            ) : (
              <p>{section}</p>
            )}
          </motion.div>
        );
      })}

      {/* The final message from the requirements - but note we have a FinalScene component too */}
      {/* We'll add the final message here as part of the letter content, but the FinalScene will show the sign-off */}
      {/* Actually, the letter ends with "Happy anniversary to us my loveee.😚I hope today and many more days remind us of how awesome we are." */}
      {/* The FinalScene will show the additional closing message */}
    </div>
  );
};

export default LetterContent;