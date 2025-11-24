import React, { useRef, useEffect, useState } from 'react';
import "../WebPageStyling/z7Group.css"
import NavBar from '../Components/NavBar';
import { gsap } from "gsap";
import ButtomTransitions from "../Components/ButtomTransitions.jsx"
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger, DrawSVGPlugin, SplitText } from 'gsap/all';
import Footer from '../Components/Footer.jsx';

// Register the plugin
gsap.registerPlugin(ScrollToPlugin);

const Z7Multiplication = () => {
  const [z7ActiveProperty, setZ7ActiveProperty] = useState(null);
  const [z7HoveredNode, setZ7HoveredNode] = useState(null);
  const [z7TableAnimation, setZ7TableAnimation] = useState({ row: -1, col: -1 });
  const [z7IsPlaying, setZ7IsPlaying] = useState(false);
  const [z7IsPaused, setZ7IsPaused] = useState(false); // New state for pause
  const [z7CurrentStep, setZ7CurrentStep] = useState(0);
  const [z7InverseAnimation, setZ7InverseAnimation] = useState(false);
  const [z7AssociativityStep, setZ7AssociativityStep] = useState(null);
  const z7CircleRef = useRef(null);
  const z7TableRef = useRef(null);
  const z7Elements = [1, 2, 3, 4, 5, 6];
  const z7Inverses = { 1: 1, 2: 4, 3: 5, 4: 2, 5: 3, 6: 6 };

  // Calculate multiplication modulo 7
  const z7MultiplyMod7 = (a, b) => (a * b) % 7;

  // Generate multiplication table
  const z7GenerateTable = () => {
    const table = [];
    for (let i of z7Elements) {
      const row = [];
      for (let j of z7Elements) {
        row.push(z7MultiplyMod7(i, j));
      }
      table.push(row);
    }
    return table;
  };
  const z7Table = z7GenerateTable();

  // Calculate node positions on circle
  const z7GetNodePosition = (index, total = 6, radius = 150) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: 250 + radius * Math.cos(angle),
      y: 250 + radius * Math.sin(angle)
    };
  };

  // Scroll to table when property is activated
  useEffect(() => {
    if (z7ActiveProperty && z7TableRef.current) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: z7TableRef.current,
          offsetY: 100
        },
        ease: "power2.inOut"
      });
    }
  }, [z7ActiveProperty]);

  // Animation for table filling with circle synchronization
  useEffect(() => {
    if (z7IsPlaying && !z7IsPaused) { // Check both playing and not paused
      const totalSteps = z7Elements.length * z7Elements.length;
      if (z7CurrentStep < totalSteps) {
        const timer = setTimeout(() => {
          const row = Math.floor(z7CurrentStep / z7Elements.length);
          const col = z7CurrentStep % z7Elements.length;
          setZ7TableAnimation({ row, col });
          setZ7CurrentStep(z7CurrentStep + 1);
        }, 400);
        return () => clearTimeout(timer);
      } else {
        setZ7IsPlaying(false); // Animation finished
        setZ7IsPaused(false); // Reset pause state when finished
      }
    }
  }, [z7IsPlaying, z7IsPaused, z7CurrentStep]); // Added z7IsPaused to dependency array

  // Automatic inverse animation
  useEffect(() => {
    if (z7ActiveProperty === 'inverse') {
      setZ7InverseAnimation(true);
      const timer = setTimeout(() => {
        setZ7InverseAnimation(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [z7ActiveProperty]);

  // Associativity animation
  useEffect(() => {
    if (z7ActiveProperty === 'associativity') {
      const a = 2, b = 3, c = 4;
      let step = 0;
      const animationSteps = [
        { type: 'highlight', nodes: [a, b], label: '(2 ₇ 3)', operation: [a, b] },
        { type: 'result', from: a, to: b, result: z7MultiplyMod7(a, b), label: '= 6', operation: [a, b] },
        { type: 'highlight', nodes: [z7MultiplyMod7(a, b), c], label: '6 ₇ 4', operation: [z7MultiplyMod7(a, b), c] },
        { type: 'result', from: z7MultiplyMod7(a, b), to: c, result: z7MultiplyMod7(z7MultiplyMod7(a, b), c), label: '= 3', operation: [z7MultiplyMod7(a, b), c] },
        { type: 'reset' },
        { type: 'highlight', nodes: [b, c], label: '(3 ₇ 4)', operation: [b, c] },
        { type: 'result', from: b, to: c, result: z7MultiplyMod7(b, c), label: '= 5', operation: [b, c] },
        { type: 'highlight', nodes: [a, z7MultiplyMod7(b, c)], label: '2 ₇ 5', operation: [a, z7MultiplyMod7(b, c)] },
        { type: 'result', from: a, to: z7MultiplyMod7(b, c), result: z7MultiplyMod7(a, z7MultiplyMod7(b, c)), label: '= 3', operation: [a, z7MultiplyMod7(b, c)] },
      ];
      const interval = setInterval(() => {
        if (step < animationSteps.length) {
          setZ7AssociativityStep(animationSteps[step]);
          step++;
        } else {
          clearInterval(interval);
          setZ7AssociativityStep(null);
        }
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setZ7AssociativityStep(null);
    }
  }, [z7ActiveProperty]);

  const z7HandlePlay = () => {
    const totalSteps = z7Elements.length * z7Elements.length;

    if (z7IsPlaying) {
      // Animation is currently active (playing or paused)
      if (z7IsPaused) {
        // If it's paused, resume it
        setZ7IsPaused(false);
      } else {
        // If it's playing (not paused), pause it
        setZ7IsPaused(true);
      }
    } else {
      // Animation is not active (stopped or finished)
      if (z7CurrentStep >= totalSteps) {
        // If finished, restart from the beginning
        setZ7CurrentStep(0);
        setZ7TableAnimation({ row: -1, col: -1 });
      }
      // Start playing (or resume from current step if not at end)
      setZ7IsPlaying(true);
      setZ7IsPaused(false); // Ensure paused state is off when starting/resuming
    }
  };
  const z7HandleReset = () => {
    setZ7IsPlaying(false);
    setZ7IsPaused(false); // Reset pause state
    setZ7CurrentStep(0);
    setZ7TableAnimation({ row: -1, col: -1 });
    setZ7ActiveProperty(null);
    setZ7HoveredNode(null);
    setZ7InverseAnimation(false);
    setZ7AssociativityStep(null);
  };

  const z7HandleStepForward = () => {
    const totalSteps = z7Elements.length * z7Elements.length;
    if (z7CurrentStep < totalSteps) {
      const row = Math.floor(z7CurrentStep / z7Elements.length);
      const col = z7CurrentStep % z7Elements.length;
      setZ7TableAnimation({ row, col });
      setZ7CurrentStep(z7CurrentStep + 1);
    }
  };

  const z7HandleStepBackward = () => {
    if (z7CurrentStep > 0) {
      setZ7CurrentStep(z7CurrentStep - 1);
      const row = Math.floor((z7CurrentStep - 1) / z7Elements.length);
      const col = (z7CurrentStep - 1) % z7Elements.length;
      setZ7TableAnimation({ row, col });
    }
  };

  // Get current multiplication from table animation
  const z7GetCurrentMultiplication = () => {
    if (z7TableAnimation.row >= 0 && z7TableAnimation.col >= 0) {
      const a = z7Elements[z7TableAnimation.row];
      const b = z7Elements[z7TableAnimation.col];
      const result = z7Table[z7TableAnimation.row][z7TableAnimation.col];
      return { a, b, result };
    }
    return null;
  };
  const z7CurrentMult = z7GetCurrentMultiplication();



  //* GSAP Animations
  //* Text Animation -- Heading Z7 Group
  useGSAP(() => {
    gsap.registerPlugin(SplitText)
    const SplittedTexts = gsap.utils.toArray(".z7-page-title")
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.words, {
            // delay: 0.5,
            y: 100,
            ease: "power1.out"
          })
        }
      })

    })
  })

  //* Text Animations -- Defination Z7 Group
  useGSAP(() => {
    // gsap.registerPlugin(ScrollTrigger)
    const SplittedTexts = gsap.utils.toArray(".z7-page-intro-text")
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            y: 100,
            delay: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          })
        }
      })
    })


  })

  //* Box Animation -- Z7 Group
  useGSAP(() => {
    // gsap.from(".z7-definition-box", {
    //   x: 90,
    //   opacity: 0,
    //   ease: "power1.out",
    //   duration: 0.5,
    //   delay: 0.9,
    // })


    const BoxTL = gsap.timeline()
    BoxTL.from(".z7-definition-box", {
      x: 90,
      opacity: 0,
      ease: "power1.out",
      duration: 0.4,
      delay: 0.9,
    })

    //* Text Animation Defination Heading H3
    const SplittedTexts = gsap.utils.toArray(".z7-definition-H3, .z7-definition-P")
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return BoxTL.from(instance.lines, {
            y: 60,
            stagger: 0.1,
            ease: "power2.out",
          })
        }
      })
    })

  })


  //* Group Properties Animation -- Z7 Group
  useGSAP(() => {
    gsap.set(".z7-properties-title", {
      color: "black"
    })

    const SplittedTexts = gsap.utils.toArray(".z7-properties-title")
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines,chars",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.chars, {
            yPercent: -40,
            color: "#bfbfbf42",

            stagger: 0.5,
            scrollTrigger: {
              trigger: ".z7-properties-title",
              scrub: 1,
              start: "top 95%",
              end: "bottom 95%",
              // markers: true,
            },
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
          })
        }
      })
    })
  })

  //* SVG Path Animation -- Group Properties
  useGSAP(() => {
    gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)
    gsap.set(".closureSVG, .IdentitySVG, .InverseSVG", {
      drawSVG: "0%"
    })

    gsap.to(".closureSVG, .IdentitySVG, .InverseSVG", {
      drawSVG: "100%",
      scrollTrigger: {
        trigger: ".z7-prop-icon",
        start: "top 95%",
        end: "bottom 95%",
        scrub: 1,
      },
      ease: "power1.out"
    })
  })



  //* Text Animation -- Quick Recap List & Application List
  //   useGSAP(() => {
  //     gsap.set(".z7-recap-items, .z7-ULSLIST", {
  //         color: "black"
  //     })

  //     const splittedTexts = gsap.utils.toArray(".z7-recap-items, .z7-ULSLIST")
  //     splittedTexts.forEach((splits) => {
  //         SplitText.create(splits, {
  //             type: "words,lines",
  //             mask: "lines",
  //             linesClass: "line",
  //             autoSplit: true,
  //             onSplit: (instance) => {
  //                 return gsap.from(instance.lines, {
  //                     color: "#858585",
  //                     y: 25,
  //                     stagger: 0.1,
  //                     scrollTrigger: {
  //                         trigger: splittedTexts,
  //                         start: "top 40%",
  //                         end: "bottom 40%",
  //                         scrub: 0.4,
  //                         markers: true,
  //                     },
  //                     ease: "power4.inOut"
  //                 })
  //             }
  //         })
  //     })

  //     // gsap.to(".HeadingText", {
  //     //     color: "#ed590d",
  //     //     scrollTrigger: {
  //     //         trigger: ".HeadingText",
  //     //         start: "top 60%",
  //     //         end: "top 30%",
  //     //         scrub: true, 
  //     //         markers: true
  //     //     }
  //     // })
  // })

  useGSAP(() => {
    const QRtimeLine = gsap.timeline()

    QRtimeLine.set(".z7-footer-title, .z7-footer-Appli", {
      color: "black"
    })

    const splittedTexts = gsap.utils.toArray(".z7-footer-title, .z7-footer-Appli")
    splittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return QRtimeLine.from(instance.lines, {
            color: "#858585",
            y: 25,
            stagger: 0.1,
            scrollTrigger: {
              trigger: splittedTexts,
              start: "top 90%",
              end: "bottom 50%",
              scrub: 0.4,
            },
            ease: "power1.out"
          })
        }
      })
    })


    const SplittedTextsQR = gsap.utils.toArray(".z7-recap-items, .z7-ULSLIST")
    SplittedTextsQR.forEach((splits) => {
      SplitText.create(splits, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return QRtimeLine.from(instance.lines, {
            color: "#858585",
            y: 25,
            stagger: 0.1,
            scrollTrigger: {
              trigger: splittedTexts,
              start: "top 40%",
              end: "bottom 40%",
              scrub: 0.4,
            },
            ease: "power1.out"
          })
        }
      })
    })



  })








  return (
    <>
      <NavBar />
      <div className="z7-main-wrapper">
        {/* Introduction Section */}
        <div className="z7-intro-block">
          <h1 className="z7-page-title">Z₇ Under Multiplication</h1>
          <p className="z7-page-intro-text">
            Z₇ is the set of integers {`{1, 2, 3, 4, 5, 6}`} under multiplication modulo 7.
            This page visualizes the structure of Z₇ as a group, demonstrating multiplication,
            closure, identity, inverses, and associativity.
          </p>
          <div className="z7-definition-box">
            <h3 className='z7-definition-H3'>Definition of Z₇</h3>
            <p className='z7-definition-P'>
              Z₇ = {`{1, 2, 3, 4, 5, 6}`} with multiplication mod 7 - that is, multiply normally then take the remainder when dividing by 7. We exclude 0 because 0 has no multiplicative inverse.
            </p>
            <br />
            <p className='z7-definition-P'>Take the numbers 1–6. Multiply two of them, then reduce mod 7 (keep remainder 0..6).
              Example (step-by-step): 3 × 5 = 15. Divide 15 by 7 → 15 = 2·7 + 1. Remainder = 1. So 3 ×₇ 5 = 1.

              Think of it as multiplication on a 7-tick wheel (but 0 is missing because it can’t be undone).</p>
          </div>
        </div>
        {/* Circular Visualization & Table */}
        <div className="z7-visual-block">
          <div className="z7-graph-wrapper" ref={z7CircleRef}>
            <svg width="500" height="500" className="z7-graph-svg">
              {/* Draw connections when hovering */}
              {z7HoveredNode !== null && z7Elements.map((elem, idx) => {
                if (elem === z7HoveredNode) return null;
                const from = z7GetNodePosition(z7Elements.indexOf(z7HoveredNode));
                const to = z7GetNodePosition(idx);
                const result = z7MultiplyMod7(z7HoveredNode, elem);
                const resultPos = z7GetNodePosition(z7Elements.indexOf(result));
                return (
                  <g key={`z7-hover-conn-${z7HoveredNode}-${elem}`}>
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={resultPos.x}
                      y2={resultPos.y}
                      className="z7-connect-line z7-hover-active"
                      strokeDasharray="5,5"
                    />
                  </g>
                );
              })}
              {/* Draw table animation connections */}
              {z7CurrentMult && (
                <g key="z7-table-conn">
                  <line
                    x1={z7GetNodePosition(z7Elements.indexOf(z7CurrentMult.a)).x}
                    y1={z7GetNodePosition(z7Elements.indexOf(z7CurrentMult.a)).y}
                    x2={z7GetNodePosition(z7Elements.indexOf(z7CurrentMult.result)).x}
                    y2={z7GetNodePosition(z7Elements.indexOf(z7CurrentMult.result)).y}
                    className="z7-connect-line z7-table-sync-line"
                    strokeDasharray="5,5"
                  />
                  <text
                    x="250"
                    y="30"
                    className="z7-operation-text"
                    textAnchor="middle"
                  >
                    {z7CurrentMult.a} ₇ {z7CurrentMult.b} = {z7CurrentMult.result}
                  </text>
                </g>
              )}
              {/* Draw inverse connections */}
              {(z7ActiveProperty === 'inverse' || z7InverseAnimation) && z7Elements.map((elem) => {
                const inv = z7Inverses[elem];
                if (elem === inv) {
                  // Self-inverse elements (like 1 and 6) - draw a loop
                  const pos = z7GetNodePosition(z7Elements.indexOf(elem));
                  return (
                    <g key={`z7-inverse-${elem}-${inv}`}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="40"
                        fill="none"
                        stroke="#ff6b6b"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="z7-inverse-loop"
                      />
                    </g>
                  );
                } else if (elem < inv) {
                  // Only draw each pair once (to avoid duplicates)
                  const from = z7GetNodePosition(z7Elements.indexOf(elem));
                  const to = z7GetNodePosition(z7Elements.indexOf(inv));
                  return (
                    <g key={`z7-inverse-${elem}-${inv}`}>
                      <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        className="z7-connect-line z7-inverse-link"
                      />
                    </g>
                  );
                }
                return null;
              })}
              {/* Draw associativity connections */}
              {z7AssociativityStep && z7AssociativityStep.type === 'result' && z7AssociativityStep.operation && (
                <g key="z7-assoc-conn">
                  {/* First multiplication line (e.g., 2 to 3) */}
                  <line
                    x1={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.operation[0])).x}
                    y1={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.operation[0])).y}
                    x2={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.operation[1])).x}
                    y2={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.operation[1])).y}
                    className="z7-connect-line z7-assoc-operation"
                  />
                  {/* Result multiplication line (e.g., result of first operation to next element) */}
                  <line
                    x1={z7GetNodePosition(z7Elements.indexOf(z7MultiplyMod7(z7AssociativityStep.operation[0], z7AssociativityStep.operation[1]))).x}
                    y1={z7GetNodePosition(z7Elements.indexOf(z7MultiplyMod7(z7AssociativityStep.operation[0], z7AssociativityStep.operation[1]))).y}
                    x2={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.result)).x}
                    y2={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.result)).y}
                    className="z7-connect-line z7-assoc-result"
                  />
                  <text
                    x="250"
                    y="30"
                    className="z7-operation-text z7-assoc-text"
                    textAnchor="middle"
                  >
                    {z7AssociativityStep.label}
                  </text>
                </g>
              )}
              {/* Draw associativity highlight connections */}
              {z7AssociativityStep && z7AssociativityStep.type === 'highlight' && z7AssociativityStep.operation && (
                <g key="z7-assoc-highlight">
                  <line
                    x1={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.operation[0])).x}
                    y1={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.operation[0])).y}
                    x2={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.operation[1])).x}
                    y2={z7GetNodePosition(z7Elements.indexOf(z7AssociativityStep.operation[1])).y}
                    className="z7-connect-line z7-assoc-operation"
                  />
                  <text
                    x="250"
                    y="30"
                    className="z7-operation-text z7-assoc-text"
                    textAnchor="middle"
                  >
                    {z7AssociativityStep.label}
                  </text>
                </g>
              )}
              {/* Draw nodes */}
              {z7Elements.map((elem, index) => {
                const pos = z7GetNodePosition(index);
                const isActive = z7HoveredNode === elem ||
                  (z7ActiveProperty === 'identity' && elem === 1) ||
                  (z7ActiveProperty === 'inverse' && z7InverseAnimation) ||
                  (z7CurrentMult && (elem === z7CurrentMult.a || elem === z7CurrentMult.result)) ||
                  (z7AssociativityStep && z7AssociativityStep.nodes && z7AssociativityStep.nodes.includes(elem));
                return (
                  <g key={`z7-node-${elem}`} className={`z7-node-wrapper ${isActive ? 'z7-node-highlighted' : ''}`}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="30"
                      className={`z7-graph-node ${isActive ? 'z7-node-highlighted' : ''} ${(z7ActiveProperty === 'inverse' || z7InverseAnimation) && z7Inverses[elem] === elem ? 'z7-node-self-inverse' : ''}`}
                      onMouseEnter={() => setZ7HoveredNode(elem)}
                      onMouseLeave={() => setZ7HoveredNode(null)}
                    />
                    <text
                      x={pos.x}
                      y={pos.y}
                      className="z7-node-text"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {elem}
                    </text>
                  </g>
                );
              })}
            </svg>
            {/* Display associativity step label */}
            {z7AssociativityStep && z7AssociativityStep.label && (
              <div className="z7-assoc-display-box">
                {z7AssociativityStep.label}
              </div>
            )}
          </div>
          <div className="z7-table-wrapper" ref={z7TableRef}>
            <h3>Multiplication Table (mod 7)</h3>
            <table className="z7-mult-grid">
              <thead>
                <tr>
                  <th>×</th>
                  {z7Elements.map(e => <th key={`z7-head-${e}`}>{e}</th>)}
                </tr>
              </thead>
              <tbody>
                {z7Elements.map((row, i) => (
                  <tr key={`z7-row-${row}`}>
                    <th>{row}</th>
                    {z7Elements.map((col, j) => (
                      <td
                        key={`z7-cell-${row}-${col}`}
                        className={`
                        ${z7TableAnimation.row === i && z7TableAnimation.col === j ? 'z7-cell-animating' : ''}
                        ${z7TableAnimation.row > i || (z7TableAnimation.row === i && z7TableAnimation.col >= j) ? 'z7-cell-filled' : ''}
                      `}
                      >
                        {z7Table[i][j]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Interactive Controls */}
        <div className="z7-controls-block">
          <h3>Animation Controls</h3>
          <div className="z7-control-btns">
            <button onClick={z7HandlePlay} disabled={z7CurrentStep >= 36 && z7IsPlaying && !z7IsPaused} className="z7-ctrl-btn"> {/* Disabled when finished playing */}
              {z7IsPaused ? 'Resume' : (z7IsPlaying ? 'Playing...' : 'Play')}
            </button>
            {!z7IsPaused && z7IsPlaying && ( // Show Pause button only when playing and not paused
              <button onClick={z7HandlePlay} className="z7-ctrl-btn">
                Pause
              </button>
            )}
            <button onClick={z7HandleStepBackward} disabled={z7IsPlaying || z7CurrentStep === 0} className="z7-ctrl-btn">
              Step Back
            </button>
            <button onClick={z7HandleStepForward} disabled={z7IsPlaying || z7CurrentStep >= 36} className="z7-ctrl-btn">
              Step Forward
            </button>
            <button onClick={z7HandleReset} className="z7-ctrl-btn">Reset</button>
          </div>
        </div>
        {/* Group Properties */}
        <div className="z7-properties-block">
          <h2 className="z7-properties-title">Group Properties</h2>
          <div className="z7-prop-card" onClick={() => setZ7ActiveProperty('closure')}>
            <div className="z7-prop-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className='closureSVG' d="M7 11.0001V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11.0001M5 22.0001H19C20.1046 22.0001 21 21.1046 21 20.0001V13.0001C21 11.8955 20.1046 11.0001 19 11.0001H5C3.89543 11.0001 3 11.8955 3 13.0001V20.0001C3 21.1046 3.89543 22.0001 5 22.0001Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg> <h3>Closure</h3></div>
            {/* <h3>Closure</h3> */}
            <p>{"All multiplication results modulo 7 remain within Z₇."}<br />
              {"{For any a, b ∈ Z₇, a × b (mod 7) ∈ Z₇}"}</p>
          </div>
          <div className="z7-prop-card" onClick={() => { setZ7ActiveProperty('identity'); setZ7HoveredNode(1); }}>
            <div className="z7-prop-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className='IdentitySVG' d="M13 2.04938C12.6711 2.01672 12.3375 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6625 21.9833 11.3289 21.9506 11M16 8V5L19 2L20.125 3.875L22 5L19 8H16ZM16 8L12 12M12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg><h3>Identity Element</h3></div>
            <p>Identity — 1 is the multiplicative identity because 1 · a = a (mod 7). <br />
            <p>Demo: 1 ×₇ 5 = 5.</p>
              </p>
          </div>
          <div className="z7-prop-card" onClick={() => setZ7ActiveProperty('inverse')}>
            <div className="z7-prop-icon"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path className='InverseSVG' d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="m21 8-4-4-4 4" /><path d="M17 4v16" /></svg><h3>Inverse Elements</h3></div>

            <p>Each element has a multiplicative inverse modulo 7:</p>
            <div className="z7-inverse-grid">
              {z7Elements.map(e => (
                <span key={`z7-inv-${e}`} className="z7-inverse-item">
                  {e} × {z7Inverses[e]} ≡ 1
                </span>
              ))}
            </div>
          </div>
          <div className="z7-prop-card" onClick={() => setZ7ActiveProperty('associativity')}>
            <div className="z7-prop-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 14.0001L4 18.0001M4 18.0001L8 22.0001M4 18.0001H17C18.6569 18.0001 20 16.6569 20 15.0001V12M16 9.99951L20 5.99951M20 5.99951L16 1.99951M20 5.99951H7C5.34315 5.99951 4 7.34266 4 8.99951V12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg> <h3>Associativity</h3></div>

            <p>(a × b) × c ≡ a × (b × c) (mod 7) for all a, b, c ∈ Z₇.</p>
            <p className="z7-prop-example">Example: (2 × 3) × 4 ≡ 2 × (3 × 4) ≡ 3 (mod 7)</p>
          </div>
        </div>
        {/* Property Highlight Buttons */}
        <div className="z7-highlight-btns">
          <button
            onClick={() => setZ7ActiveProperty('closure')}
            className={`z7-highlight-btn ${z7ActiveProperty === 'closure' ? 'z7-btn-active' : ''}`}
          >
            Highlight Closure
          </button>
          <button
            onClick={() => { setZ7ActiveProperty('identity'); setZ7HoveredNode(1); }}
            className={`z7-highlight-btn ${z7ActiveProperty === 'identity' ? 'z7-btn-active' : ''}`}
          >
            Highlight Identity
          </button>
          <button
            onClick={() => setZ7ActiveProperty('inverse')}
            className={`z7-highlight-btn ${z7ActiveProperty === 'inverse' ? 'z7-btn-active' : ''}`}
          >
            Animate Inverses
          </button>
          <button
            onClick={() => setZ7ActiveProperty('associativity')}
            className={`z7-highlight-btn ${z7ActiveProperty === 'associativity' ? 'z7-btn-active' : ''}`}
          >
            Animate Associativity
          </button>
        </div>
        {/* Footer */}
        <div className="z7-footer-block">
          <h2 className="z7-footer-title">Quick Recap</h2>
          <div className="z7-footer-content">
            <ul className="z7-recap-items">
              <li>Z₇ is a cyclic group under multiplication modulo 7</li>
              <li>All group axioms (closure, identity, inverses, associativity) are satisfied</li>
              <li>Every non-zero element has a multiplicative inverse</li>
              <li>The group has order 6 (contains 6 elements)</li>
            </ul>
            <div className="z7-applications">
              <h3 className='z7-footer-Appli'>Applications</h3>
              <ul className='z7-ULSLIST'>
                <li>Modular arithmetic and number theory</li>
                <li>Cryptographic algorithms (RSA, Diffie-Hellman)</li>
                <li>Error detection and correction codes</li>
                <li>Hash functions and digital signatures</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const WrappedZ7Multiplication = ButtomTransitions(Z7Multiplication)
export default WrappedZ7Multiplication;