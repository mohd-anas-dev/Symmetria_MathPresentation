import React, { useState } from 'react';
import "../WebPageStyling/Combinatorics.css"
import NavBar from '../Components/NavBar';
import ButtomTransitions from "../Components/ButtomTransitions.jsx"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin, SplitText } from 'gsap/all';

const FlagArrangement = () => {
    const [redCount, setRedCount] = useState(4);
    const [whiteCount, setWhiteCount] = useState(3);
    const [blueCount, setBlueCount] = useState(1);
    const [flags, setFlags] = useState([
        'red', 'red', 'red', 'red',
        'white', 'white', 'white',
        'blue'
    ]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [isStepMode, setIsStepMode] = useState(false);

    const totalFlags = redCount + whiteCount + blueCount;
    const maxFlags = 8;

    const generateFlags = (red, white, blue) => {
        const newFlags = [];
        for (let i = 0; i < red; i++) newFlags.push('red');
        for (let i = 0; i < white; i++) newFlags.push('white');
        for (let i = 0; i < blue; i++) newFlags.push('blue');
        return newFlags;
    };

    const handleCountChange = (color, value) => {
        const num = parseInt(value) || 0;
        const clampedNum = Math.max(0, Math.min(num, maxFlags));

        let newRed = redCount;
        let newWhite = whiteCount;
        let newBlue = blueCount;

        if (color === 'red') newRed = clampedNum;
        if (color === 'white') newWhite = clampedNum;
        if (color === 'blue') newBlue = clampedNum;

        const total = newRed + newWhite + newBlue;

        if (total <= maxFlags) {
            setRedCount(newRed);
            setWhiteCount(newWhite);
            setBlueCount(newBlue);
            setFlags(generateFlags(newRed, newWhite, newBlue));
            setIsStepMode(false);
            setStepIndex(0);
        }
    };

    const shuffleFlags = () => {
        setIsShuffling(true);
        const shuffled = [...flags].sort(() => Math.random() - 0.5);

        setTimeout(() => {
            setFlags(shuffled);
            setIsShuffling(false);
        }, 300);
    };

    const stepThroughArrangement = () => {
        if (!isStepMode) {
            setIsStepMode(true);
            setStepIndex(0);
        }

        setIsShuffling(true);
        const shuffled = [...flags].sort(() => Math.random() - 0.5);

        setTimeout(() => {
            setFlags(shuffled);
            setStepIndex(prev => prev + 1);
            setIsShuffling(false);
        }, 300);
    };

    const resetArrangement = () => {
        setRedCount(4);
        setWhiteCount(3);
        setBlueCount(1);
        setFlags(['red', 'red', 'red', 'red', 'white', 'white', 'white', 'blue']);
        setIsStepMode(false);
        setStepIndex(0);
    };

    const factorial = (n) => {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    };

    const calculateArrangements = () => {
        const total = redCount + whiteCount + blueCount;
        if (total === 0) return 0;

        return factorial(total) / (factorial(redCount) * factorial(whiteCount) * factorial(blueCount));
    };

    const totalArrangements = calculateArrangements();

    //* GSAP Animations


    //* Text Animations -- Introduction
    useGSAP(() => {
        gsap.registerPlugin(SplitText)
        const SplittedTexts = gsap.utils.toArray(".section-title")
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

    //* Text Animations -- Introduction Defination
    useGSAP(() => {
        // gsap.registerPlugin(ScrollTrigger)
        const SplittedTexts = gsap.utils.toArray(".introP")
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

    //* Text Animations -- Introduction List
    useGSAP(() => {
        // gsap.registerPlugin(ScrollTrigger)
        const SplittedTexts = gsap.utils.toArray(".concept-list")
        SplittedTexts.forEach((splits) => {
            SplitText.create(splits, {
                type: "lines, words",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    return gsap.from(instance.lines, {
                        y: 100,
                        delay: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                    })
                }
            })
        })
    })

    //* Text Animations -- Understanding .......
    useGSAP(() => {
        // gsap.registerPlugin(ScrollTrigger)
        const SplittedTexts = gsap.utils.toArray(".understanding")
        SplittedTexts.forEach((splits) => {
            SplitText.create(splits, {
                type: "lines, words",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    return gsap.from(instance.lines, {
                        y: 100,
                        delay: 0.9,
                        stagger: 0.1,
                        ease: "power2.out",
                    })
                }
            })
        })
    })



    //* SVG Animations -- Ellipse
    useGSAP(() => {
        gsap.registerPlugin(DrawSVGPlugin)

        gsap.set(".ellipse", {
            drawSVG: "0%"
        })
        gsap.to(".ellipse", {
            drawSVG: "100%",
            scrollTrigger: {
                trigger: ".title",
                start: "top 90%",
                end: "bottom 90%",
                // scrub: 2,
                scrub: false,
                // markers: true,
            },
            ease: "power1.out"
        })

        // gsap.fromTo(".ellipse", {
        //     drawSVG: "0",
        //     repeat: -1,
        //     yoyo: true,
        // }, {
        //     drawSVG: "100%",
        //     ease: "power1.out",
        //     delay: 0.4,
        //     yoyo: true,
        //     duration: 1,
        //     repeatDelay: 1
        // })
    })

    //* SVG Animations -- Flag
    useGSAP(() => {
        gsap.registerPlugin(DrawSVGPlugin)
        gsap.set(".flagSVG", {
            drawSVG: "0%"
        })
        gsap.to(".flagSVG", {
            drawSVG: "100%",
            scrollTrigger: {
                trigger: ".title",
                start: "top 90%",
                end: "bottom 90%",
                scrub: 2,
            },
            ease: "power1.out"
        })
        // gsap.fromTo(".flagSVG", {
        //     drawSVG: "30% 30%",
        //     repeat: -1,
        //     yoyo: true,
        // }, {
        //     drawSVG: "0% 100%",
        //     ease: "power1.out",
        //     yoyo: true,
        //     repeat: -1,
        //     delay: 1,
        //     duration: 1,
        //     repeatDelay: 1,
        // })
    })

    //* Text Animations -- Heading (FlagArrangement)
    useGSAP(() => {
        gsap.registerPlugin(SplitText)
        const SplittedTexts = gsap.utils.toArray(".title")
        SplittedTexts.forEach((splits) => {
            SplitText.create(splits, {
                type: "lines, words",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    return gsap.from(instance.words, {
                        y: 70,
                        ease: "power1.out"
                    })
                }
            })
        })
    })


    return (
        <>
            <NavBar />
            <div className="container">
                {/* Combinatorics Introduction Section */}
                <section className="introduction-section">
                    <h2 className="section-title">Combinatorics</h2>
                    <div className="intro-content">
                        <p className='introP'>
                            <strong>Combinatorics</strong> is a branch of mathematics that deals with counting, arranging,
                            and combining objects in specific ways. It is fundamental in fields like probability,
                            algorithms, cryptography, and many real-world applications.
                            <br />
                            In combinatorics, we often deal with concepts like:
                        </p>

                        <ul className="concept-list">
                            <li><strong>Permutation:</strong> Arranging objects in order where the sequence matters.</li>
                            <li><strong>Combination:</strong> Selecting objects where order does not matter.</li>
                            <li><strong>Repetition:</strong> Some objects may be identical, which affects counting.</li>
                        </ul>

                        <p className='understanding'>
                            Understanding these concepts helps solve practical problems, such as arranging flags
                            for signals, generating secure passwords, or analyzing DNA sequences.
                        </p>

                        {/* <div className="intro-animation">
                            <svg width="100%" height="20" viewBox="0 0 600 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <path d="M0 10 C50 0, 100 20, 150 10 C200 0, 250 20, 300 10 C350 0, 400 20, 450 10 C500 0, 550 20, 600 10"
                                    stroke="#000"
                                    strokeWidth="2"
                                    fill="transparent"
                                    className="intro-ellipse"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div> */}
                    </div>
                </section>

                {/* Header Section */}
                <header className="header">
                    <div className="header-content">
                        <h1 className="title">
                            <svg width="100%" className='onSVG' height="15" viewBox="0 0 600 15" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <path d="M0 7 C50 0, 100 14, 150 7 C200 0, 250 14, 300 7 C350 0, 400 14, 450 7 C500 0, 550 14, 600 7"
                                    stroke="#000"
                                    strokeWidth="2"
                                    fill="transparent"
                                    className='ellipse'
                                    strokeLinecap="round" />
                            </svg>

                            Flag Arrangement Problem
                            <div className="flag-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flag-icon lucide-flag">
                                    <path className='flagSVG' d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
                                </svg>
                            </div>
                        </h1>
                        <p className="problem-description">
                            How many different signals can be made with {redCount} red flag{redCount !== 1 ? 's' : ''}, {whiteCount} white flag{whiteCount !== 1 ? 's' : ''}, and {blueCount} blue flag{blueCount !== 1 ? 's' : ''} arranged in a row?
                        </p>
                    </div>
                </header>

                {/* Flag Visualization Section */}
                <section className="visualization-section">
                    <h2 className="section-title">Flag Arrangement Visualizer</h2>
                    <div className={`flags-container ${isShuffling ? 'shuffling' : ''}`}>
                        {flags.map((color, index) => (
                            <div
                                key={`${color}-${index}`}
                                className={`flag flag-${color}`}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="flag-pole"></div>
                                <div className="flag-cloth"></div>
                            </div>
                        ))}
                    </div>

                    {isStepMode && (
                        <div className="arrangement-counter">
                            Arrangement #{stepIndex} of {totalArrangements} possible
                        </div>
                    )}
                </section>
                {/* Controls Section */}
                <section className="controls-section">
                    <button
                        className="control-btn shuffle-btn"
                        onClick={shuffleFlags}
                        disabled={isShuffling}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4L9.5 9.5M14.5 14.5L21 21M21 21H16M21 21V16M4 20L21 3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg> Shuffle Flags
                    </button>
                    <button
                        className="control-btn step-btn"
                        onClick={stepThroughArrangement}
                        disabled={isShuffling}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-right-icon lucide-arrow-big-right"><path d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" /></svg>Next Arrangement
                    </button>
                    <button
                        className="control-btn reset-btn"
                        onClick={resetArrangement}
                        disabled={isShuffling}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 14.0001L4 18.0001M4 18.0001L8 22.0001M4 18.0001H17C18.6569 18.0001 20 16.6569 20 15.0001V12M16 9.99951L20 5.99951M20 5.99951L16 1.99951M20 5.99951H7C5.34315 5.99951 4 7.34266 4 8.99951V12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg> Reset
                    </button>
                </section>

                {/* Flag Count Customizer */}
                <section className="customizer-section">
                    <h2 className="section-title">Customize Flag Counts</h2>
                    <div className="customizer-container">
                        <div className="input-group">
                            <label htmlFor="red-input" className="input-label">
                                <span className="color-dot red-dot"></span>
                                Red Flags:
                            </label>
                            <input
                                id="red-input"
                                type="number"
                                min="0"
                                max={maxFlags}
                                value={redCount}
                                onChange={(e) => handleCountChange('red', e.target.value)}
                                className="flag-input"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="white-input" className="input-label">
                                <span className="color-dot white-dot"></span>
                                White Flags:
                            </label>
                            <input
                                id="white-input"
                                type="number"
                                min="0"
                                max={maxFlags}
                                value={whiteCount}
                                onChange={(e) => handleCountChange('white', e.target.value)}
                                className="flag-input"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="blue-input" className="input-label">
                                <span className="color-dot blue-dot"></span>
                                Blue Flags:
                            </label>
                            <input
                                id="blue-input"
                                type="number"
                                min="0"
                                max={maxFlags}
                                value={blueCount}
                                onChange={(e) => handleCountChange('blue', e.target.value)}
                                className="flag-input"
                            />
                        </div>

                        <div className="total-display">
                            <span className={`total-text ${totalFlags > maxFlags ? 'error' : ''}`}>
                                Total: {totalFlags} / {maxFlags} flags
                            </span>
                            {totalFlags > maxFlags && (
                                <span className="error-message">Maximum {maxFlags} flags allowed</span>
                            )}
                        </div>
                    </div>
                </section>





                {/* Step-by-Step Explanation */}
                <section className="explanation-section">
                    <h2 className="section-title">Solution Breakdown</h2>

                    <div className="step-card">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3 className="step-title">Calculate Total Permutations</h3>
                            <p className="step-text">
                                If all {totalFlags} flags were unique, we would have <strong>{totalFlags}!</strong> ({totalFlags} factorial) arrangements.
                            </p>
                            <div className="calculation">
                                {totalFlags}! = {Array.from({ length: totalFlags }, (_, i) => totalFlags - i).join(' × ')} = <span className="result">{factorial(totalFlags).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="step-arrow">↓</div>

                    <div className="step-card">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3 className="step-title">Account for Repeated Colors</h3>
                            <p className="step-text">
                                Since we have identical flags of the same color, we must divide by the factorials of each color group:
                            </p>
                            <div className="calculation">
                                {redCount > 0 && <><span className="flag-label red-label">{redCount} Red flag{redCount !== 1 ? 's' : ''}</span>: {redCount}! = {factorial(redCount)}<br /></>}
                                {whiteCount > 0 && <><span className="flag-label white-label">{whiteCount} White flag{whiteCount !== 1 ? 's' : ''}</span>: {whiteCount}! = {factorial(whiteCount)}<br /></>}
                                {blueCount > 0 && <><span className="flag-label blue-label">{blueCount} Blue flag{blueCount !== 1 ? 's' : ''}</span>: {blueCount}! = {factorial(blueCount)}</>}
                            </div>
                        </div>
                    </div>

                    <div className="step-arrow">↓</div>

                    <div className="step-card">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3 className="step-title">Apply the Formula</h3>
                            <p className="step-text">
                                The number of unique arrangements is given by:
                            </p>
                            <div className="formula">
                                <div className="formula-line">
                                    Arrangements = <span className="fraction">
                                        <span className="numerator">{totalFlags}!</span>
                                        <span className="denominator">{redCount > 0 && `${redCount}!`}{whiteCount > 0 && ` × ${whiteCount}!`}{blueCount > 0 && ` × ${blueCount}!`}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="step-arrow">↓</div>

                    <div className="step-card highlight-card">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3 className="step-title">Final Answer</h3>
                            <p className="step-text">
                                Computing the final result:
                            </p>
                            <div className="calculation">
                                <span className="fraction">
                                    <span className="numerator">{factorial(totalFlags).toLocaleString()}</span>
                                    <span className="denominator">{factorial(redCount)} × {factorial(whiteCount)} × {factorial(blueCount)}</span>
                                </span> = <span className="fraction">
                                    <span className="numerator">{factorial(totalFlags).toLocaleString()}</span>
                                    <span className="denominator">{(factorial(redCount) * factorial(whiteCount) * factorial(blueCount)).toLocaleString()}</span>
                                </span> = <span className="final-result">{totalArrangements.toLocaleString()}</span>
                            </div>
                            <p className="step-text conclusion">
                                There are <strong>{totalArrangements.toLocaleString()} different signals</strong> that can be made with these flags!
                            </p>
                        </div>
                    </div>
                </section>

                {/* Applications Section */}
                <section className="applications-section">
                    <h2 className="section-title">Real-World Applications</h2>
                    <div className="applications-grid">
                        <div className="application-card">
                            <div className="app-icon">📡</div>
                            <h3 className="app-title">Signal Communication</h3>
                            <p className="app-text">
                                Naval and maritime communication systems use flag combinations to send messages between ships.
                            </p>
                        </div>

                        <div className="application-card">
                            <div className="app-icon">🎲</div>
                            <h3 className="app-title">Probability Theory</h3>
                            <p className="app-text">
                                Understanding permutations with repetition is fundamental to calculating probabilities in complex scenarios.
                            </p>
                        </div>

                        <div className="application-card">
                            <div className="app-icon">🧬</div>
                            <h3 className="app-title">Genetics & Biology</h3>
                            <p className="app-text">
                                Similar principles apply to counting DNA sequences and protein arrangements with repeated amino acids.
                            </p>
                        </div>

                        <div className="application-card">
                            <div className="app-icon">💻</div>
                            <h3 className="app-title">Computer Science</h3>
                            <p className="app-text">
                                Algorithms for generating unique permutations are used in cryptography, data compression, and optimization.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <p>Interactive Combinatorics Learning Tool • Understanding Permutations with Repetition</p>
                </footer>
            </div>
        </>
    );
};

const WrappedFlagArrangement = ButtomTransitions(FlagArrangement)
export default WrappedFlagArrangement;

