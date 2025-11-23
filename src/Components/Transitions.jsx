// import React from 'react'
// import { motion } from 'framer-motion'


// const Transitions = (OgComponent) => {
//   return () => {
//     return (
//         <>
//             <OgComponent/>
//             <motion.div className='slide-in'
//             initial={{scaleY: 1}}
//             animate={{scaleY: 0}}
//             exit={{scaleY: 1}}
//             transition={{duration: 0.8, ease : [0.4, 0.6, 0.36, 1], delay: 0.1}}
//             />


//             <motion.div className='slide-out'
//             initial={{scaleY: 1}}
//             animate={{scaleY: 0}}
//             exit={{scaleY: 1}}
//             transition={{duration: 0.8, ease: [0.4, 0.6, 0.36, 1], delay: 0.1}}
//             />
//         </>
//     )
//   }
// }

// export default Transitions






// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Transitions = (OgComponent) => {
//   return () => {
//     const [count, setCount] = useState(0);
//     const [showCountdown, setShowCountdown] = useState(true);

//     useEffect(() => {
//       if (showCountdown) {
//         let start = 0;
//         const interval = setInterval(() => {
//           start += 1;
//           setCount(start);
//           if (start >= 100) {
//             clearInterval(interval);
//             setTimeout(() => setShowCountdown(false), 500); // slight delay before words split
//           }
//         }, 40); // 4s total (100 * 40ms = 4000ms)
//         return () => clearInterval(interval);
//       }
//     }, [showCountdown]);

//     // Split animation variants
//     const splitVariant = {
//       hidden: { y: 50, opacity: 0 },
//       visible: { y: 0, opacity: 1, transition: { staggerChildren: 0.1 } },
//     };

//     const wordVariant = {
//       hidden: { y: 50, opacity: 0 },
//       visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
//     };

//     return (
//       <>
//         <OgComponent />

//         <AnimatePresence>
//           {showCountdown && (
//             <motion.div className="transition-overlay"
//               initial={{ opacity: 1 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <div className="countdown-container">
//                 <h1 className="title">SYMMETRIA</h1>
//                 <p className="subtitle">Explore the fascinating world of Group Theory, Combinatorics, and Graph Theory through interactive visuals.</p>
//                 <div className="countdown">{count}%</div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {!showCountdown && (
//           <motion.div className="split-words" variants={splitVariant} initial="hidden" animate="visible">
//             {["Explore", "the", "fascinating", "world", "of", "Group", "Theory,", "Combinatorics,", "and", "Graph", "Theory"].map((word, idx) => (
//               <motion.span key={idx} className="split-word" variants={wordVariant}>
//                 {word}
//               </motion.span>
//             ))}
//           </motion.div>
//         )}

//         <motion.div className='slide-in'
//           initial={{ scaleY: 1 }}
//           animate={{ scaleY: 0 }}
//           exit={{ scaleY: 1 }}
//           transition={{ duration: 0.8, ease: [0.4, 0.6, 0.36, 1], delay: 5 }}
//         />

//         <motion.div className='slide-out'
//           initial={{ scaleY: 1 }}
//           animate={{ scaleY: 0 }}
//           exit={{ scaleY: 1 }}
//           transition={{ duration: 0.8, ease: [0.4, 0.6, 0.36, 1], delay: 5 }}
//         />
//       </>
//     );
//   };
// };

// export default Transitions;

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Transitions = (OgComponent) => {
//   return () => {
//     const [count, setCount] = useState(0);
//     const [showCountdown, setShowCountdown] = useState(true);

//     useEffect(() => {
//       if (showCountdown) {
//         const minDuration = 1000; // minimum 3 seconds display
//         const startTime = Date.now();

//         // Collect all images in the page
//         const images = Array.from(document.images);
//         const totalImages = images.length;
//         let loadedCount = 0;

//         const updateCount = () => {
//           loadedCount++;
//           const targetPercent = Math.round((loadedCount / totalImages) * 100);
//           setCount(targetPercent);

//           if (loadedCount >= totalImages) {
//             const elapsed = Date.now() - startTime;
//             const remaining = minDuration - elapsed;
//             setTimeout(() => setShowCountdown(false), remaining > 0 ? remaining : 500);
//           }
//         };

//         if (totalImages === 0) {
//           // No images → still show preloader for minDuration
//           setTimeout(() => setShowCountdown(false), minDuration);
//           return;
//         }

//         images.forEach((img) => {
//           if (img.complete) {
//             updateCount();
//           } else {
//             img.addEventListener('load', updateCount);
//             img.addEventListener('error', updateCount);
//           }
//         });

//         return () => {
//           images.forEach((img) => {
//             img.removeEventListener('load', updateCount);
//             img.removeEventListener('error', updateCount);
//           });
//         };
//       }
//     }, [showCountdown]);

//     // Split animation variants
//     const splitVariant = {
//       hidden: { y: 50, opacity: 0 },
//       visible: { y: 0, opacity: 1, transition: { staggerChildren: 0.1 } },
//     };

//     const wordVariant = {
//       hidden: { y: 50, opacity: 0 },
//       visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
//     };

//     return (
//       <>
//         <OgComponent />

//         <AnimatePresence>
//           {showCountdown && (
//             <motion.div
//               className="transition-overlay"
//               initial={{ opacity: 1 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <div className="countdown-container">
//                 <h1 className="title">SYMMETRIA</h1>
//                 <p className="subtitle">
//                   Explore the fascinating world of Group Theory, Combinatorics, and Graph Theory through interactive visuals.
//                 </p>
//                 <div className="countdown">{count}%</div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {!showCountdown && (
//           <motion.div className="split-words" variants={splitVariant} initial="hidden" animate="visible">
//             {["Explore", "the", "fascinating", "world", "of", "Group", "Theory,", "Combinatorics,", "and", "Graph", "Theory"].map(
//               (word, idx) => (
//                 <motion.span key={idx} className="split-word" variants={wordVariant}>
//                   {word}
//                 </motion.span>
//               )
//             )}
//           </motion.div>
//         )}

//         <motion.div
//           className='slide-in'
//           initial={{ scaleY: 1 }}
//           animate={{ scaleY: 0 }}
//           exit={{ scaleY: 1 }}
//           transition={{ duration: 0.8, ease: [0.4, 0.6, 0.36, 1], delay: 0}}
//         />

//         <motion.div
//           className='slide-out'
//           initial={{ scaleY: 1 }}
//           animate={{ scaleY: 0 }}
//           exit={{ scaleY: 1 }}
//           transition={{ duration: 0.8, ease: [0.4, 0.6, 0.36, 1], delay: 0 }}
//         />
//       </>
//     );
//   };
// };

// export default Transitions;







import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = (OgComponent) => {
  return () => {
    const [count, setCount] = useState(0);
    const [showCountdown, setShowCountdown] = useState(true);
    const [showSplitWords, setShowSplitWords] = useState(false);
    const [showSlides, setShowSlides] = useState(false);
    const [preloaderComplete, setPreloaderComplete] = useState(false);

    useEffect(() => {
      if (showCountdown) {
        let start = 0;
        const interval = setInterval(() => {
          start += 1;
          setCount(start);
          if (start >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowCountdown(false);
              setShowSplitWords(true);
            }, 500);
          }
        }, 30); // 3s total (100 * 30ms = 3000ms)
        return () => clearInterval(interval);
      }
    }, [showCountdown]);

    // After split words animation completes, trigger slides
    useEffect(() => {
      if (showSplitWords) {
        // Wait for split animation to complete (stagger + duration)
        // 11 words * 0.1s stagger + 0.6s duration ≈ 1.7s + small buffer
        setTimeout(() => {
          setShowSplitWords(false);
          setShowSlides(true);
        }, 2000);
      }
    }, [showSplitWords]);

    // After slides complete, mark preloader as done
    useEffect(() => {
      if (showSlides) {
        // Slide duration is 0.8s
        setTimeout(() => {
          setPreloaderComplete(true);
        }, 800);
      }
    }, [showSlides]);

    const splitVariant = {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const wordVariant = {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };

    return (
      <>
        {/* Only render homepage content after preloader is complete */}
        {preloaderComplete && <OgComponent />}

        <AnimatePresence mode="wait">
          {showCountdown && (
            <motion.div
              className="transition-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="countdown-container">
                <h1 className="title">SYMMETRIA</h1>
                <p className="subtitle">
                  Explore the fascinating world of Group Theory, Combinatorics, and Graph Theory through interactive visuals.
                </p>
                <div className="countdown">{count}%</div>
              </div>
            </motion.div>
          )}

          {showSplitWords && (
            <motion.div
              className="transition-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
            >
              <motion.div
                className="split-words"
                variants={splitVariant}
                initial="hidden"
                animate="visible"
              >
                {["Explore", "the", "fascinating", "world", "of", "Group", "Theory,", "Combinatorics,", "and", "Graph", "Theory"].map((word, idx) => (
                  <motion.span key={idx} className="split-word" variants={wordVariant}>
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showSlides && (
          <>
            <motion.div
              className="slide-in"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0.6, 0.36, 1] }}
            />

            <motion.div
              className="slide-out"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0.6, 0.36, 1] }}
            />
          </>
        )}
      </>
    );
  };
};

export default Preloader;





// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Preloader = (OgComponent) => {
//   return () => {
//     const [count, setCount] = useState(0);
//     const [showCountdown, setShowCountdown] = useState(true);
//     const [showSplitWords, setShowSplitWords] = useState(false);
//     const [showSlides, setShowSlides] = useState(false);

//     useEffect(() => {
//       if (showCountdown) {
//         let start = 0;
//         const interval = setInterval(() => {
//           start += 1;
//           setCount(start);
//           if (start >= 100) {
//             clearInterval(interval);
//             setTimeout(() => {
//               setShowCountdown(false);
//               setShowSplitWords(true);
//             }, 500);
//           }
//         }, 30); // 3s total (100 * 30ms = 3000ms)
//         return () => clearInterval(interval);
//       }
//     }, [showCountdown]);

//     // After split words animation completes, trigger slides
//     useEffect(() => {
//       if (showSplitWords) {
//         // Wait for split animation to complete (stagger + duration)
//         // 11 words * 0.1s stagger + 0.6s duration ≈ 1.7s + small buffer
//         setTimeout(() => {
//           setShowSlides(true);
//         }, 2000);
//       }
//     }, [showSplitWords]);

//     const splitVariant = {
//       hidden: { y: 50, opacity: 0 },
//       visible: { y: 0, opacity: 1, transition: { staggerChildren: 0.1 } },
//     };

//     const wordVariant = {
//       hidden: { y: 50, opacity: 0 },
//       visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
//     };

//     return (
//       <>
//         <OgComponent />

//         <AnimatePresence mode="wait">
//           {showCountdown && (
//             <motion.div
//               className="transition-overlay"
//               initial={{ opacity: 1 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="countdown-container">
//                 <h1 className="title">SYMMETRIA</h1>
//                 <p className="subtitle">
//                   Explore the fascinating world of Group Theory, Combinatorics, and Graph Theory through interactive visuals.
//                 </p>
//                 <div className="countdown">{count}%</div>
//               </div>
//             </motion.div>
//           )}

//           {showSplitWords && !showSlides && (
//             <motion.div
//               className="transition-overlay"
//               initial={{ opacity: 1 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 1 }}
//             >
//               <motion.div
//                 className="split-words"
//                 variants={splitVariant}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 {["Explore", "the", "fascinating", "world", "of", "Group", "Theory,", "Combinatorics,", "and", "Graph", "Theory"].map((word, idx) => (
//                   <motion.span key={idx} className="split-word" variants={wordVariant}>
//                     {word}{" "}
//                   </motion.span>
//                 ))}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {showSlides && (
//           <>
//             <motion.div
//               className="slide-in"
//               initial={{ scaleY: 1 }}
//               animate={{ scaleY: 0 }}
//               transition={{ duration: 0.8, ease: [0.4, 0.6, 0.36, 1] }}
//             />

//             <motion.div
//               className="slide-out"
//               initial={{ scaleY: 1 }}
//               animate={{ scaleY: 0 }}
//               transition={{ duration: 0.8, ease: [0.4, 0.6, 0.36, 1] }}
//             />
//           </>
//         )}
//       </>
//     );
//   };
// };

// export default Preloader;






// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Preloader = (OgComponent) => {
//   const PreloaderComponent = () => {
//     const [count, setCount] = useState(0);
//     const [showCountdown, setShowCountdown] = useState(true);
//     const [showSplitWords, setShowSplitWords] = useState(false);
//     const [showSlides, setShowSlides] = useState(false);
//     const [preloaderComplete, setPreloaderComplete] = useState(false);

//     /* ---------------- COUNTDOWN ---------------- */
//     useEffect(() => {
//       if (!showCountdown) return;

//       let value = 0;

//       const interval = setInterval(() => {
//         value += 1;
//         setCount(value);

//         if (value >= 100) {
//           clearInterval(interval);

//           setTimeout(() => {
//             setShowCountdown(false);
//             setShowSplitWords(true);
//           }, 500);
//         }
//       }, 30);

//       return () => clearInterval(interval);
//     }, [showCountdown]);

//     /* ----------- SPLIT WORDS → SLIDES ----------- */
//     useEffect(() => {
//       if (!showSplitWords) return;

//       const timeout = setTimeout(() => {
//         setShowSplitWords(false);
//         setShowSlides(true);
//       }, 1700);

//       return () => clearTimeout(timeout);
//     }, [showSplitWords]);

//     /* ------------------ SLIDES → DONE ------------------ */
//     useEffect(() => {
//       if (!showSlides) return;

//       const timeout = setTimeout(() => {
//         setPreloaderComplete(true);
//       }, 800);

//       return () => clearTimeout(timeout);
//     }, [showSlides]);

//     /* ------------------ VARIANTS ------------------ */
//     const splitVariant = {
//       hidden: { opacity: 1 },
//       visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//     };

//     const wordVariant = {
//       hidden: { y: 60, opacity: 0 },
//       visible: {
//         y: 0,
//         opacity: 1,
//         transition: { duration: 0.6 },
//       },
//     };

//     /* ------------------ RENDER ------------------ */
//     return (
//       <>
//         {/* MAIN PAGE */}
//         {preloaderComplete && <OgComponent />}

//         {/* COUNTDOWN */}
//         <AnimatePresence>
//           {showCountdown && (
//             <motion.div
//               className="transition-overlay"
//               initial={{ opacity: 1 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="countdown-container">
//                 <h1 className="title">SYMMETRIA</h1>
//                 <p className="subtitle">
//                   Explore the fascinating world of Group Theory, Combinatorics, and Graph Theory.
//                 </p>
//                 <div className="countdown">{count}%</div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* SPLIT WORDS */}
//         <AnimatePresence>
//           {showSplitWords && (
//             <motion.div className="transition-overlay">
//               <motion.div
//                 className="split-words"
//                 variants={splitVariant}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 {[
//                   "Explore",
//                   "the",
//                   "fascinating",
//                   "world",
//                   "of",
//                   "Group",
//                   "Theory,",
//                   "Combinatorics,",
//                   "and",
//                   "Graph",
//                   "Theory.",
//                 ].map((w, i) => (
//                   <motion.span key={i} className="split-word" variants={wordVariant}>
//                     {w}&nbsp;
//                   </motion.span>
//                 ))}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* SLIDE-IN / SLIDE-OUT */}
//         {showSlides && (
//           <>
//             <motion.div
//               className="slide-in"
//               initial={{ scaleY: 1 }}
//               animate={{ scaleY: 0 }}
//               transition={{ duration: 0.8 }}
//             />

//             <motion.div
//               className="slide-out"
//               initial={{ scaleY: 1 }}
//               animate={{ scaleY: 0 }}
//               transition={{ duration: 0.8 }}
//             />
//           </>
//         )}
//       </>
//     );
//   };

//   return PreloaderComponent;
// };

// export default Preloader;



