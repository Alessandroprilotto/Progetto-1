'use client';
import { Undo2, X, Star, Heart, Send, Flame, Search, Sparkles, MessageCircle, User, Lightbulb, Sliders } from "lucide-react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const interests = [
  "Cocktail",
  "Cantare",
  "Provare cose nuove",
  "Portare a spasso il cane",
  "Reggaeton",
];

export default function Match() {
  const flashRef = useRef<HTMLDivElement>(null);
  const [cardKey, setCardKey] = useState(0);
  const [likeAnim, setLikeAnim] = useState(false);
  const [dislikeAnim, setDislikeAnim] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [animating, setAnimating] = useState(false);
  const animTimeout = useRef<NodeJS.Timeout | null>(null);
  const [starAnim, setStarAnim] = useState(false);
  const [showStar, setShowStar] = useState(false);

  const handleFlash = (color: 'red' | 'green') => {
    if (flashRef.current) {
      flashRef.current.classList.remove('bg-red-500', 'bg-green-500', 'opacity-0');
      flashRef.current.classList.add(color === 'red' ? 'bg-red-500' : 'bg-green-500', 'opacity-40');
      setTimeout(() => {
        if (flashRef.current) {
          flashRef.current.classList.add('opacity-0');
        }
      }, 250);
    }
  };

  // Like animation handler
  const handleLike = () => {
    if (animating) {
      // If animating, skip to next card immediately
      if (animTimeout.current) clearTimeout(animTimeout.current);
      setLikeAnim(false);
      setShowHearts(false);
      setAnimating(false);
      setCardKey((k) => k + 1);
      return;
    }
    setAnimating(true);
    setLikeAnim(true);
    animTimeout.current = setTimeout(() => setShowHearts(true), 600); // show hearts after beat
    animTimeout.current = setTimeout(() => {
      setLikeAnim(false);
      setShowHearts(false);
      setAnimating(false);
      setCardKey((k) => k + 1);
    }, 1100);
  };

  // Dislike animation handler
  const handleDislike = () => {
    if (animating) {
      if (animTimeout.current) clearTimeout(animTimeout.current);
      setDislikeAnim(false);
      setAnimating(false);
      setCardKey((k) => k + 1);
      return;
    }
    setAnimating(true);
    setDislikeAnim(true);
    animTimeout.current = setTimeout(() => {
      setDislikeAnim(false);
      setAnimating(false);
      setCardKey((k) => k + 1);
    }, 900);
  };

  // Star animation handler
  const handleStar = () => {
    if (animating) {
      if (animTimeout.current) clearTimeout(animTimeout.current);
      setStarAnim(false);
      setShowStar(false);
      setAnimating(false);
      setCardKey((k) => k + 1);
      return;
    }
    setAnimating(true);
    setStarAnim(true);
    setShowStar(true);
    animTimeout.current = setTimeout(() => {
      setStarAnim(false);
      setShowStar(false);
      setAnimating(false);
      setCardKey((k) => k + 1);
    }, 1200);
  };

  // For shatter effect
  const SHATTER_ROWS = 3;
  const SHATTER_COLS = 5;
  const SHATTER_BLOCKS = SHATTER_ROWS * SHATTER_COLS;

  // For rocket boosters
  const boosterHearts = Array.from({ length: 14 });

  return (
    <div className="relative min-h-screen bg-main flex flex-col items-center justify-between max-w-[430px] mx-auto overflow-x-hidden">
      {/* Filter Button (top-right) */}
      <button
        className="absolute top-4 right-4 z-50 bg-container rounded-full p-2 shadow-lg border border-purple text-main hover:bg-main active:scale-95 transition-all"
        title="Filtri"
        onClick={() => window.location.href = '/match/filter'}
      >
        <Sliders size={26} className="text-purple" />
      </button>

      {/* Flash overlay for like/dislike */}
      <div ref={flashRef} className="pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-200"></div>

      {/* STAR ANIMATION: Large purple star in center */}
      <AnimatePresence>
        {showStar && (
          <motion.span
            className="fixed left-1/2 top-1/2 z-50 pointer-events-none"
            style={{ x: '-50%', y: '-50%' }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <Star className="text-purple" size={80} />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Flying hearts from center of screen (for like) */}
      <AnimatePresence>
        {showHearts &&
          [...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="fixed left-1/2 top-1/2 text-3xl z-50 pointer-events-none"
              style={{ x: '-50%', y: '-50%' }}
              initial={{ y: 0, opacity: 1, x: 0, scale: 1 }}
              animate={{
                y: -180 - i * 30,
                x: (i - 2) * 60 + Math.random() * 10,
                opacity: 0,
                scale: 1.2 + Math.random() * 0.2,
              }}
              transition={{ duration: 0.7 + i * 0.07, ease: "easeOut" }}
            >
              <span className="text-cta">❤️</span>
            </motion.span>
          ))}
      </AnimatePresence>

      {/* Main Content: Vertically centered card and info */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-2 pt-4 pb-36">
        {/* Profile Card */}
        <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden bg-container shadow-2xl flex flex-col justify-end">
          {/* AnimatePresence for card */}
          <AnimatePresence mode="wait">
            {/* STAR ANIMATION: Card launches up like a rocket with boosters */}
            {starAnim && (
              <motion.div
                key={cardKey + "star"}
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={{ y: -500, opacity: 0.7, scale: 0.95 }}
                exit={{}}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-end"
              >
                {/* Profile Image Placeholder with label */}
                <div className="absolute inset-0 flex items-center justify-center bg-main">
                  {/* Label in top-right */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="bg-cta text-main px-3 py-1 rounded-full text-xs font-semibold shadow border border-purple">
                      In cerca di passione
                    </span>
                  </div>
                  <span className="text-purple text-8xl sm:text-9xl">👤</span>
                </div>
                {/* Rocket boosters with hearts */}
                <div className="absolute left-1/2 bottom-0 flex gap-8 z-30" style={{ transform: 'translateX(-50%)' }}>
                  {[0, 1].map((b) => (
                    <div key={b} className="relative w-8 h-8 flex flex-col items-center">
                      <div className="w-4 h-4 bg-purple rounded-full mb-1" />
                      {/* Hearts shooting out */}
                      <div className="absolute left-1/2 top-full" style={{ transform: 'translateX(-50%)' }}>
                        {boosterHearts.map((_, i) => (
                          <motion.span
                            key={i}
                            className="absolute text-cta text-lg"
                            style={{ willChange: 'transform, opacity' }}
                            initial={{ y: 0, opacity: 1, x: 0, scale: 1 }}
                            animate={{
                              y: 80 + i * 8,
                              x: (i - 7) * 10 + (i % 2 === 0 ? 8 : -8),
                              opacity: 0,
                              scale: 0.85,
                            }}
                            transition={{ duration: 0.38, delay: i * 0.012 }}
                          >
                            ❤️
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Name + Age + Interests overlayed at bottom */}
                <div className="relative z-10 w-full bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-[rgba(30,30,30,0.5)] to-transparent px-5 pt-20 pb-5 flex flex-col items-start">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-main text-2xl font-bold drop-shadow-md">Kiara</span>
                    <span className="text-main text-xl font-semibold drop-shadow-md">21</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full pb-1">
                    {interests.map((interest) => (
                      <span key={interest} className="bg-main/80 text-main px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border border-purple shadow-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            {!dislikeAnim && !likeAnim && !starAnim && (
              <motion.div
                key={cardKey}
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{}}
                className="absolute inset-0 flex flex-col justify-end"
              >
                {/* Profile Image Placeholder with label */}
                <div className="absolute inset-0 flex items-center justify-center bg-main">
                  {/* Label in top-right */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="bg-cta text-main px-3 py-1 rounded-full text-xs font-semibold shadow border border-purple">
                      In cerca di passione
                    </span>
                  </div>
                  <span className="text-purple text-8xl sm:text-9xl">👤</span>
                </div>
                {/* Name + Age + Interests overlayed at bottom */}
                <div className="relative z-10 w-full bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-[rgba(30,30,30,0.5)] to-transparent px-5 pt-20 pb-5 flex flex-col items-start">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-main text-2xl font-bold drop-shadow-md">Kiara</span>
                    <span className="text-main text-xl font-semibold drop-shadow-md">21</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full pb-1">
                    {interests.map((interest) => (
                      <span key={interest} className="bg-main/80 text-main px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border border-purple shadow-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            {/* LIKE animation: beat, then slide right + hearts */}
            {likeAnim && (
              <motion.div
                key={cardKey + "like"}
                initial={{ scale: 1, x: 0, opacity: 1, rotate: 0 }}
                animate={{
                  scale: [0.92, 1, 0.94, 1],
                  x:    [0,    0,    0, 400],
                  opacity: [1, 1, 1, 0.7],
                  rotate: [0, 0, 0, 10],
                }}
                transition={{
                  duration: 1.1,
                  times: [0, 0.18, 0.36, 1],
                  ease: "easeInOut"
                }}
                exit={{}}
                className="absolute inset-0 flex flex-col justify-end"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-main">
                  <span className="text-purple text-8xl sm:text-9xl">👤</span>
                </div>
                <div className="relative z-10 w-full bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-[rgba(30,30,30,0.5)] to-transparent px-5 pt-20 pb-5 flex flex-col items-start">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-main text-2xl font-bold drop-shadow-md">Kiara</span>
                    <span className="text-main text-xl font-semibold drop-shadow-md">21</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full pb-1">
                    {interests.map((interest) => (
                      <span key={interest} className="bg-main/80 text-main px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border border-purple shadow-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            {/* DISLIKE animation: slide left + shatter (15 pieces) */}
            {dislikeAnim && (
              <motion.div
                key={cardKey + "dislike"}
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: -400, opacity: 0.7, rotate: -10 }}
                exit={{}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-end"
              >
                {/* Shatter effect: 15 blocks */}
                {Array.from({ length: SHATTER_BLOCKS }).map((_, b) => {
                  const row = Math.floor(b / SHATTER_COLS);
                  const col = b % SHATTER_COLS;
                  const left = `${(col * 100) / SHATTER_COLS}%`;
                  const top = `${(row * 100) / SHATTER_ROWS}%`;
                  const width = `${100 / SHATTER_COLS}%`;
                  const height = `${100 / SHATTER_ROWS}%`;
                  return (
                    <motion.div
                      key={b}
                      className="absolute bg-container border border-purple"
                      style={{ left, top, width, height }}
                      initial={{ y: 0, opacity: 1, rotate: 0 }}
                      animate={{
                        y: 120 + Math.random() * 60,
                        opacity: 0,
                        rotate: (col % 2 === 0 ? -1 : 1) * (20 + Math.random() * 20),
                        x: (Math.random() - 0.5) * 60,
                      }}
                      transition={{ duration: 0.7 + b * 0.02, ease: "easeIn" }}
                    />
                  );
                })}
                {/* Overlay the card content faded */}
                <div className="absolute inset-0 flex flex-col justify-end opacity-40 pointer-events-none">
                  <div className="absolute inset-0 flex items-center justify-center bg-main">
                    <span className="text-purple text-8xl sm:text-9xl">👤</span>
                  </div>
                  <div className="relative z-10 w-full bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-[rgba(30,30,30,0.5)] to-transparent px-5 pt-20 pb-5 flex flex-col items-start">
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-main text-2xl font-bold drop-shadow-md">Kiara</span>
                      <span className="text-main text-xl font-semibold drop-shadow-md">21</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full pb-1">
                      {interests.map((interest) => (
                        <span key={interest} className="bg-main/80 text-main px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border border-purple shadow-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="fixed bottom-24 left-0 w-full flex justify-center items-center gap-6 z-30 px-4 pointer-events-none">
        <button
          className="w-14 h-14 bg-container rounded-full flex items-center justify-center text-purple text-2xl shadow-lg hover:bg-main active:scale-90 transition-all duration-150 pointer-events-auto"
          title="Undo"
        >
          <Undo2 size={28} />
        </button>
        <button
          className="w-16 h-16 bg-main rounded-full flex items-center justify-center text-danger text-3xl shadow-xl border-4 border-container hover:bg-danger/10 active:scale-90 transition-all duration-150 pointer-events-auto"
          title="Dislike"
          onClick={handleDislike}
          disabled={animating}
        >
          <X size={36} />
        </button>
        <button
          className="w-14 h-14 bg-main rounded-full flex items-center justify-center text-purple text-2xl shadow-lg border-4 border-container hover:bg-purple/10 active:scale-90 transition-all duration-150 pointer-events-auto"
          title="Superlike"
          onClick={handleStar}
          disabled={animating}
        >
          <Star size={28} />
        </button>
        <button
          className="w-16 h-16 bg-main rounded-full flex items-center justify-center text-green text-3xl shadow-xl border-4 border-container hover:bg-green/10 active:scale-90 transition-all duration-150 pointer-events-auto"
          title="Like"
          onClick={handleLike}
          disabled={animating}
        >
          <Heart size={36} />
        </button>
        <button
          className="w-14 h-14 bg-main rounded-full flex items-center justify-center text-cta text-2xl shadow-lg border-4 border-container hover:bg-cta/10 active:scale-90 transition-all duration-150 pointer-events-auto"
          title="Boost"
        >
          <Send size={28} />
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-container border-t border-purple flex justify-around items-center h-16 z-50 max-w-[430px] mx-auto">
        <a href="/" className="flex flex-col items-center text-cta" title="Match">
          <Flame size={26} />
        </a>
        <a href="/advice" className="flex flex-col items-center text-purple" title="Advice">
          <Lightbulb size={26} />
        </a>
        <a href="/like" className="flex flex-col items-center text-danger" title="Like">
          <Heart size={26} />
        </a>
        <a href="/chat" className="flex flex-col items-center text-green" title="Chat">
          <MessageCircle size={26} />
        </a>
        <a href="/account" className="flex flex-col items-center text-main" title="Account">
          <User size={26} />
        </a>
      </nav>
    </div>
  );
} 