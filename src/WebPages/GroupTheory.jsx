import React from 'react'
import "../WebPageStyling/GroupTheory.css"
import NavBar from "../Components/NavBar.jsx"
import { useRef, useEffect } from 'react'
// import Transitions from "../Components/Transitions.jsx"
import TopTransitions from "../Components/TopTransitions.jsx"

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, SplitText, DrawSVGPlugin } from 'gsap/all'
import Footer from '../Components/Footer.jsx'

const GroupTheory = () => {
  const coset1Ref = useRef(null);
  const coset2Ref = useRef(null);
  const coset3Ref = useRef(null);
  const coset4Ref = useRef(null);
  const formulaRef = useRef(null);


  useEffect(() => {
    const animateCosets = () => {
      const cosets = [coset1Ref, coset2Ref, coset3Ref, coset4Ref];


      cosets.forEach((ref, index) => {
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.opacity = "1";
            ref.current.style.transform = "scale(1)";
          }
        }, index * 400);
      });


      setTimeout(() => {
        if (formulaRef.current) {
          formulaRef.current.style.opacity = "1";
          formulaRef.current.style.transform = "translateY(0)";
        }
      }, 1800);
    };


    animateCosets();
  }, []);

  const isoRef = useRef(null)
  const homoRef = useRef(null)
  const autoRef = useRef(null)
  //* Page Over Animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.create({
      trigger: isoRef.current,
      start: "top top",
      end: "60% -30%",
      // end: "bottom top",
      pin: true,
      // pinSpacing: true,
      scrub: 1,
    }, gsap.to(isoRef.current, {
      filter: "blur(10px)",
      ease: "power3.inOut"
    }))
    ScrollTrigger.create({
      trigger: homoRef.current,
      start: "top top",
      end: "60% -30%",
      // end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    }, gsap.to(homoRef.current, {
      filter: "blur(10px)",
      ease: "power3.inOut"
    }))
    ScrollTrigger.create({
      trigger: autoRef.current,
      start: "top top",
      end: "60% -30%",
      // end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    }, gsap.to(autoRef.current, {
      filter: "blur(10px)",
      ease: "power3.inOut"
    }))
  })

  //* Text Animations -- Langrange Theorem Heading
  useGSAP(() => {
    gsap.registerPlugin(SplitText)
    const SplittedTexts = gsap.utils.toArray(".lagrange")
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.words, {
            delay: 0.3,
            y: 100,
            ease: "power1.out"
          })
        }
      })

    })
  })

  //* Text Animations -- Lagrange Theorem Defination
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    const SplittedTexts = gsap.utils.toArray(".lagrangeP")
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            y: 100,
            delay: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          })
        }
      })
    })


  })


  //*Text Animations -- Lagrange Theorem Defination (2)
  useGSAP(() => {
    const SplittedTexts = gsap.utils.toArray(".lagrangeh2")
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

  //* SVG Scroll Animation -- Lagrange Proof & Numerical
  useGSAP(() => {
    gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)
    gsap.set(".Langnotes", {
      drawSVG: "0"
    })
    gsap.to(".Langnotes", {
      drawSVG: "100%",
      scrollTrigger: {

        trigger: ".Langnotes",
        scrub: 3,
        start: "top 60%",
        end: "bottom 70%",
        // markers: true,
        // trigger: ".notes",
        // start: "top 60%", // when it comes into view
        // toggleActions: "play none none none",

      },
      duration: 1.5,
      ease: "power1.out"
    })


  })
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)
    gsap.set(".Langpencil", {
      drawSVG: "0%"
    })
    gsap.to(".Langpencil", {
      drawSVG: "100%",
      scrollTrigger: {

        trigger: ".Langnotes",
        scrub: 3,
        start: "top 10%",
        end: "bottom 20%",
        // markers: true,
        // trigger: ".notes",
        // start: "top 10%",
        // toggleActions: "play none none none",
        // markers: true,
      },
      // duration: 1.5,
      ease: "power1.out"


    })
  })

  //* Text Animation -- Lagrange Importance & Applications
  useGSAP(() => {
    gsap.set(".FooterLangH1", {
      color: "black"
    })

    const SplittedTexts = gsap.utils.toArray(".FooterLangH1")
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines,chars",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.chars, {
            // yPercent: 40,
            color: "#bfbfbf42",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".TopFooter",
              scrub: 0.5,
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


  useGSAP(() => {
    gsap.set(".importance-list", {
      color: "black"
    })

    const splittedTexts = gsap.utils.toArray(".importance-list")
    splittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            color: "#858585",
            y: 18,
            stagger: 0.1,
            scrollTrigger: {
              trigger: splittedTexts,
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.5,
              // markers: true
            },
            ease: "power1.out"
            // ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
          })
        }
      })
    })
  })


  //* Image Scale Animation -- Proof And Numerical
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(() => {

    gsap.from(".LeftMiddleLagrange", {
      scrollTrigger: {
        trigger: ".LeftMiddleLagrange",
        start: "top 90%",
        end: "bottom 50%",
        // scrub: true,
        // markers: true ,
      },
      // scaleY: 0,
      opacity: 0,
      x: -100,
      // y: 50,
      ease: "power1.out"
    })
  })
  useGSAP(() => {

    gsap.from(".RightMiddleLagrange", {
      scrollTrigger: {
        trigger: ".RightMiddleLagrange",
        start: "top 90%",
        end: "bottom 50%",
        // scrub: true, 
        // markers: true ,
      },
      opacity: 0,
      x: 100,
      ease: "power1.out"
    })
  })

  //! Isomorphism GSAP Animations
  //* Text Animations -- Isomorphism Heading
  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    const SplittedTexts = gsap.utils.toArray(".isomorphismHeading"); // your <h1> class
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.words, {
            y: 100,
            ease: "power1.out",
            scrollTrigger: {
              trigger: ".isomorphismHeading",
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.6
            }
          });
        }
      });
    });
  });

  //* Text Animations -- Isomorphism Definition
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const SplittedTexts = gsap.utils.toArray(".isomorphismDef"); // your <p> class
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
            scrollTrigger: {
              trigger: ".isomorphismDef",
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.6
            }
          });
        }
      });
    });
  });

  //* Text Animations -- Isomorphism Extra Definition/Formula
  useGSAP(() => {
    const SplittedTexts = gsap.utils.toArray(".isomorphismExtraDef"); // your <h2> or <span> class
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            y: 100,
            delay: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          });
        }
      });
    });
  });

  //* SVG Scroll Animation -- Isomorphism Proof & Numerical
  useGSAP(() => {
    gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);
    gsap.utils.toArray(".Isonotes").forEach((el) => {
      gsap.set(el, { drawSVG: "0" });
      gsap.to(el, {
        drawSVG: "100%",
        scrollTrigger: {
          trigger: el,
          scrub: 3,
          start: "top 60%",
          end: "bottom 70%",
        },
        ease: "power1.out"
      });
    });

    gsap.utils.toArray(".Isopencil").forEach((el) => {
      gsap.set(el, { drawSVG: "0%" });
      gsap.to(el, {
        drawSVG: "100%",
        scrollTrigger: {
          trigger: el,
          scrub: 3,
          start: "top 80%",
          end: "bottom 80%",
          // markers: true ,
        },
        ease: "power1.out"
      });
    });
  });

  //* Text Animation -- Isomorphism Importance & Applications Heading
  useGSAP(() => {
    gsap.set(".FooterIsoH1", { color: "black" });
    const SplittedTexts = gsap.utils.toArray(".FooterIsoH1");
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines,chars",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.chars, {
            color: "#bfbfbf42",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".TopIsomorphismFooter",
              scrub: 0.5,
              start: "top 95%",
              end: "bottom 95%",
            },
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
          });
        }
      });
    });
  });

  //* Text Animation -- Isomorphism Importance List
  useGSAP(() => {
    gsap.set(".IsoImportanceList", { color: "black" });
    const splittedTexts = gsap.utils.toArray(".IsoImportanceList");
    splittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            color: "#858585",
            y: 18,
            stagger: 0.1,
            scrollTrigger: {
              trigger: splittedTexts,
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.5,
            },
            ease: "power1.out"
          });
        }
      });
    });
  });


  //* Image Animation
  useGSAP(() => {

    gsap.from(".LeftMiddleIsomorphism", {
      scrollTrigger: {
        trigger: ".LeftMiddleIsomorphism",
        start: "top 90%",
        end: "bottom 50%",
        // scrub: true,
        // markers: true ,
      },
      // scaleY: 0,
      opacity: 0,
      x: -100,
      // y: 50,
      ease: "power1.out"
    })
  })
  useGSAP(() => {

    gsap.from(".RightMiddleIsomorphism", {
      scrollTrigger: {
        trigger: ".RightMiddleIsomorphism",
        start: "top 90%",
        end: "bottom 50%",
        // scrub: true, 
        // markers: true ,
      },
      opacity: 0,
      x: 100,
      ease: "power1.out"
    })
  })


  //! Homomorphism GSAP Animations

  //* Text Animations -- Homomorphism Heading
  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    const SplittedTexts = gsap.utils.toArray(".homomorphismHeading"); // <h1> heading
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.words, {
            y: 100,
            ease: "power1.out",
            scrollTrigger: {
              trigger: ".homomorphismHeading",
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.6
            }
          });
        }
      });
    });
  });

  //* Text Animations -- Homomorphism Definition
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const SplittedTexts = gsap.utils.toArray(".homomorphismDef"); // <p> description
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
            scrollTrigger: {
              trigger: ".homomorphismDef",
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.6
            }
          });
        }
      });
    });
  });

  //* Text Animations -- Homomorphism Extra Definition/Formula
  useGSAP(() => {
    const SplittedTexts = gsap.utils.toArray(".homomorphismExtraDef"); // optional <span>/<h2>
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            y: 100,
            delay: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          });
        }
      });
    });
  });

  //* SVG Scroll Animation -- Homomorphism Numerical Examples
  useGSAP(() => {
    gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

    gsap.utils.toArray(".Homnotes").forEach((el) => {
      gsap.set(el, { drawSVG: "0" });
      gsap.to(el, {
        drawSVG: "100%",
        scrollTrigger: {
          trigger: el,
          scrub: 3,
          start: "top 60%",
          end: "bottom 70%",
        },
        ease: "power1.out"
      });
    });

    gsap.utils.toArray(".Hompencil").forEach((el) => {
      gsap.set(el, { drawSVG: "0%" });
      gsap.to(el, {
        drawSVG: "100%",
        scrollTrigger: {
          trigger: el,
          scrub: 3,
          start: "top 80%",
          end: "bottom 80%",
        },
        ease: "power1.out"
      });
    });
  });

  //* Text Animation -- Homomorphism Properties Heading
  useGSAP(() => {
    gsap.set(".FooterHomH1", { color: "black" });
    const SplittedTexts = gsap.utils.toArray(".FooterHomH1"); // footer heading
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines,chars",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.chars, {
            color: "#bfbfbf42",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".TopHomomorphismFooter",
              scrub: 0.5,
              start: "top 95%",
              end: "bottom 95%",
            },
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
          });
        }
      });
    });
  });

  //* Text Animation -- Homomorphism Properties List
  useGSAP(() => {
    gsap.set(".HomImportanceList", { color: "black" });
    const splittedTexts = gsap.utils.toArray(".HomImportanceList"); // <ul> list
    splittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            color: "#858585",
            y: 18,
            stagger: 0.1,
            scrollTrigger: {
              trigger: splittedTexts,
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.5,
            },
            ease: "power1.out"
          });
        }
      });
    });
  });

  //* Image Animation
  useGSAP(() => {
    gsap.from(".LeftMiddleHomomorphism", {
      scrollTrigger: {
        trigger: ".LeftMiddleHomomorphism",
        start: "top 90%",
        end: "bottom 50%",
        // scrub: true,
        // markers: true ,
      },
      // scaleY: 0,
      opacity: 0,
      x: -100,
      // y: 50,
      ease: "power1.out"
    })
  })
  useGSAP(() => {

    gsap.from(".RightMiddleHomorphism", {
      scrollTrigger: {
        trigger: ".RightMiddleHomorphism",
        start: "top 90%",
        end: "bottom 50%",
        // scrub: true, 
        // markers: true ,
      },
      opacity: 0,
      x: 100,
      ease: "power1.out"
    })
  })


  //! Automorphism GSAP Animations

  //* Text Animations -- Automorphism Heading
  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    const SplittedTexts = gsap.utils.toArray(".automorphismHeading"); // <h1> heading
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.words, {
            y: 100,
            ease: "power1.out",
            scrollTrigger: {
              trigger: ".automorphismHeading",
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.6
            }
          });
        }
      });
    });
  });

  //* Text Animations -- Automorphism Definition
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const SplittedTexts = gsap.utils.toArray(".automorphismDef"); // <p> description
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
            scrollTrigger: {
              trigger: ".automorphismDef",
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.6
            }
          });
        }
      });
    });
  });

  //* Text Animations -- Automorphism Extra Definition/Formula
  useGSAP(() => {
    const SplittedTexts = gsap.utils.toArray(".automorphismExtraDef"); // optional <span>/<h2>
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            y: 100,
            delay: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          });
        }
      });
    });
  });

  //* SVG Scroll Animation -- Automorphism Numerical Examples
  useGSAP(() => {
    gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

    gsap.utils.toArray(".Autnotes").forEach((el) => {
      gsap.set(el, { drawSVG: "0" });
      gsap.to(el, {
        drawSVG: "100%",
        scrollTrigger: {
          trigger: el,
          scrub: 3,
          start: "top 60%",
          end: "bottom 70%",
        },
        ease: "power1.out"
      });
    });

    gsap.utils.toArray(".Autpencil").forEach((el) => {
      gsap.set(el, { drawSVG: "0%" });
      gsap.to(el, {
        drawSVG: "100%",
        scrollTrigger: {
          trigger: el,
          scrub: 3,
          start: "top 80%",
          end: "bottom 80%",
        },
        ease: "power1.out"
      });
    });
  });

  //* Text Animation -- Automorphism Properties Heading
  useGSAP(() => {
    gsap.set(".FooterAutH1", { color: "black" });
    const SplittedTexts = gsap.utils.toArray(".FooterAutH1"); // footer heading
    SplittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "lines,chars",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.chars, {
            color: "#bfbfbf42",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".TopAutomorphismFooter",
              scrub: 0.5,
              start: "top 95%",
              end: "bottom 95%",
            },
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
          });
        }
      });
    });
  });

  //* Text Animation -- Automorphism Importance List
  useGSAP(() => {
    gsap.set(".AutImportanceList", { color: "black" });
    const splittedTexts = gsap.utils.toArray(".AutImportanceList"); // <ul> list
    splittedTexts.forEach((splits) => {
      SplitText.create(splits, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            color: "#858585",
            y: 18,
            stagger: 0.1,
            scrollTrigger: {
              trigger: splittedTexts,
              start: "top 90%",
              end: "bottom 90%",
              scrub: 0.5,
            },
            ease: "power1.out"
          });
        }
      });
    });
  });


  //* Image Animation
  useGSAP(() => {
    gsap.from(".LeftMiddleAutomorphism", {
      scrollTrigger: {
        trigger: ".LeftMiddleAutomorphism",
        start: "top 90%",
        end: "bottom 50%",
        // scrub: true,
        // markers: true ,
      },
      // scaleY: 0,
      opacity: 0,
      x: -100,
      // y: 50,
      ease: "power1.out"
    })
  })
  useGSAP(() => {

    gsap.from(".RightMiddleAutomorphism", {
      scrollTrigger: {
        trigger: ".RightMiddleAutomorphism",
        start: "top 90%",
        end: "bottom 50%",
        // scrub: true, 
        // markers: true ,
      },
      opacity: 0,
      x: 100,
      ease: "power1.out"
    })
  })



  return (
    <>
      <NavBar />
      <div className="GroupTheory">
        <div className="GroupTheoryContainer">
          <div className="LagrangeTheorem" >
            <div className="LagrangeTheoremContainer">
              <div className="TopLagrange">
                <div className="LeftTopLagrange">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="692" height="149" className='SvgAbs'>
                    <g>
                      <title>Layer 1</title>
                      <ellipse fill="none" className='ellipse' stroke="#e8e8e0" cx="346" cy="74.5" id="svg_1" rx="346" ry="74.5" />
                    </g>
                  </svg> */}
                  <h1 className='lagrange'>Lagrange Theorem</h1>
                  <p className='lagrangeP'>The Lagrange Theorem states that you cannot have a subgroup with an impossible size.
                    Every subgroup must divide the size of the whole group.</p>
                  <h2 className='lagrangeh2'>Hence, If G is a finite group and H is a subgroup of G, then <br /> <span className='thenSpan'>∣G∣=[G:H]⋅∣H∣.</span> <br /><h3>In Particular, <span className='thenSpan'> ∣H∣ divides ∣G∣.</span></h3><br /><h3>Lets look at the proof and example question</h3></h2>

                </div>
                <div className="circle-wrapper">
                  <div className="main-circle">
                    <span className="g-label">G</span>
                    <span className="g-order">|G| = 12</span>
                  </div>


                  <div ref={coset1Ref} className="coset coset1">
                    <div>
                      <div className="coset-title">H</div>
                      <div className="coset-size">|H| = 3</div>
                    </div>
                  </div>


                  <div ref={coset2Ref} className="coset coset2">
                    <div>
                      <div className="coset-title">g₁H</div>
                      <div className="coset-size">|g₁H| = 3</div>
                    </div>
                  </div>


                  <div ref={coset3Ref} className="coset coset3">
                    <div>
                      <div className="coset-title">g₂H</div>
                      <div className="coset-size">|g₂H| = 3</div>
                    </div>
                  </div>


                  <div ref={coset4Ref} className="coset coset4">
                    <div>
                      <div className="coset-title">g₃H</div>
                      <div className="coset-size">|g₃H| = 3</div>
                    </div>
                  </div>
                  {/* <div ref={formulaRef} className="formula-box">
                    <div className="formula-text">|G| = [G : H] × |H|</div>
                    <div className="formula-sub">12 = 4 × 3</div>
                    <div className="formula-note">
                      The order of G equals the number of cosets times the order of H
                    </div>
                  </div> */}
                </div>


              </div>

              <div className="MiddleLagrange" >
                <div className="LeftMiddleLagrange">
                  <img className='leftImageLag' src="https://th.bing.com/th/id/R.709f3ad038acd24957a627c778305974?rik=u3d2LlZiZJR9Iw&pid=ImgRaw&r=0" alt="" />
                  <h1>Proof</h1>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='Langnotes' d="M8 6H16M8 10H16M8 14H11M6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22Z" stroke="#000000" stroke-width="0.50" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
                <div className="RightMiddleLagrange">
                  <img src="https://tse2.mm.bing.net/th/id/OIP.5eQEu2HQNvQV41PGTaY2uAHaKz?w=1096&h=1599&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
                  <h1>Numerical</h1>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='Langpencil' d="M15 6L18 9M17.4029 3.61716L3.9933 17.0268L3 21L6.97322 20.0067L20.3828 6.59708C21.2057 5.7742 21.2057 4.44004 20.3828 3.61716C19.56 2.79428 18.2258 2.79428 17.4029 3.61716Z" stroke="#000000" stroke-width="0.50" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
              </div>

              <div className="FooterLagrange" ref={isoRef}>
                <div className="TopFooter">
                  <h1 className='FooterLangH1'>Importance and Applications</h1>
                </div>
                <div className="EndFooter" >
                  <ul className="importance-list">
                    <li>Helps compute possible sizes of subgroups.</li>
                    <li>Useful for checking whether a subgroup of a given order exists.</li>
                    <li>Assists in classifying small groups and understanding group structure.</li>
                    <li>Provides foundation for further results, e.g., Fermat’s Little Theorem.</li>
                    <li>Supports understanding of coset partitions and group symmetry.</li>
                  </ul>
                </div>
              </div>


            </div>
          </div>


          <div className="Isomorphism">
            <div className="IsomorphismContainer">
              <div className="TopIsomorphism">
                <h1 className='isomorphismHeading'>Isomorphism In Groups</h1>
                <p className='isomorphismDef'>An isomorphism is a bijective (one-to-one and onto) mapping between two groups that preserves the group operation.If <br /><span className="spaceSpan">𝜙:𝐺→𝐻ϕ:G→H</span> <br />is an isomorphism, then for all 𝑎,𝑏∈𝐺a,b∈G: <br /><span className='spaceSpan'>  φ(a ⋅ b) = φ(a) * φ(b)</span><br /><h3>Lets Look at the proof and a Example</h3></p>
              </div>

              <div className="MiddleIsomorphism">
                <div className="LeftMiddleIsomorphism">
                  <img src="https://th.bing.com/th/id/R.709f3ad038acd24957a627c778305974?rik=u3d2LlZiZJR9Iw&pid=ImgRaw&r=0" alt="" />
                  <h1>Numerical One</h1>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='Isonotes' d="M8 6H16M8 10H16M8 14H11M6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22Z" stroke="#000000" stroke-width="0.50" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
                <div className="RightMiddleIsomorphism">
                  <img src="https://tse2.mm.bing.net/th/id/OIP.5eQEu2HQNvQV41PGTaY2uAHaKz?w=1096&h=1599&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
                  <h1>Numerical Two</h1>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='Isopencil' d="M15 6L18 9M17.4029 3.61716L3.9933 17.0268L3 21L6.97322 20.0067L20.3828 6.59708C21.2057 5.7742 21.2057 4.44004 20.3828 3.61716C19.56 2.79428 18.2258 2.79428 17.4029 3.61716Z" stroke="#000000" stroke-width="0.50" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
              </div>


              <div className="FooterIsomorphism" ref={homoRef}>
                <div className="TopIsomorphismFooter">
                  <h1 className='FooterIsoH1'>Importance and Applications</h1>
                </div>
                <div className="EndIsomorphism">
                  <ul className="IsoImportanceList">
                    <li>Isomorphisms preserve the group structure.</li>
                    <li>Two isomorphic groups are essentially identical in terms of group theory.</li>
                    <li>Helps in classifying groups by structure, not element labels.</li>
                    <li>Notation: 𝐺≅𝐻</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


          <div className="Homomorphism">
            <div className="HomomorphismContainer">
              <div className="TopHomorphism">
                <h1 className='homomorphismHeading'>Homomorphism in Groups</h1>
                <p className='homomorphismDef'>A homomorphism is a mapping between two groups that preserves the group operation. If <br />
                  <span className="spaceSpan">𝜙:𝐺→𝐻ϕ:G→H </span>  is a homomorphism, then for all 𝑎,𝑏∈𝐺a,b∈G: <br />
                  <span className="spaceSpan">
                    ϕ(a⋅b)=ϕ(a)∗ϕ(b) </span><br />
                  <h3>Note: Unlike isomorphisms, a homomorphism doesn’t have to be one-to-one or onto.</h3><br /></p>
              </div>

              <div className="MiddleHomomorphism">
                <div className="LeftMiddleHomomorphism">
                  <img src="https://th.bing.com/th/id/R.709f3ad038acd24957a627c778305974?rik=u3d2LlZiZJR9Iw&pid=ImgRaw&r=0" alt="" />
                  <h1>Numerical One</h1>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='Homnotes' d="M8 6H16M8 10H16M8 14H11M6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22Z" stroke="#000000" stroke-width="0.50" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
                <div className="RightMiddleHomorphism">
                  <img src="https://tse2.mm.bing.net/th/id/OIP.5eQEu2HQNvQV41PGTaY2uAHaKz?w=1096&h=1599&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
                  <h1>Numerical Two</h1>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='Hompencil' d="M15 6L18 9M17.4029 3.61716L3.9933 17.0268L3 21L6.97322 20.0067L20.3828 6.59708C21.2057 5.7742 21.2057 4.44004 20.3828 3.61716C19.56 2.79428 18.2258 2.79428 17.4029 3.61716Z" stroke="#000000" stroke-width="0.50" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
              </div>

              <div className="FooterHomomorphism">
                <div className="TopHomomorphismFooter">
                  <h1 className='FooterHomH1'>Properties</h1>
                </div>
                <div className="EndHomomorphism" ref={autoRef}>
                  <ul className="HomImportanceList">
                    <li>Homomorphisms preserve structure, even if not bijective.</li>
                    <li>The kernel of a homomorphism is all elements mapped to the identity of H.</li>
                    <li>The image is all elements in H that have pre-images.</li>
                    {/* <li>Notation: 𝐺≅𝐻</li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>


          <div className="Automorphism">
            <div className="AutomorphismContainer">

              {/* ------------ TOP SECTION ------------ */}
              <div className="TopAutomorphism">
                <h1 className='automorphismHeading'>Automorphism in Groups</h1>
                <p className='automorphismDef'>
                  An automorphism is an isomorphism from a group to itself. <br />
                  It is a bijective map
                  <span className="spaceSpan"> ϕ: G → G </span>
                  that preserves the group operation. <br />
                  This means that for all a, b ∈ G: <br />
                  <span className="spaceSpan"> ϕ(a ⋅ b) = ϕ(a) ∗ ϕ(b)</span>
                  <br />
                  <h3>Automorphisms show the internal symmetry of a group.</h3>
                </p>
              </div>

              {/* ------------ MIDDLE SECTION ------------ */}
              <div className="MiddleAutomorphism">
                <div className="LeftMiddleAutomorphism">
                  <img
                    src="https://th.bing.com/th/id/R.709f3ad038acd24957a627c778305974?rik=u3d2LlZiZJR9Iw&pid=ImgRaw&r=0"
                    alt=""
                  />
                  <h1>Numerical One</h1>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className='Autnotes'
                      d="M8 6H16M8 10H16M8 14H11M6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22Z"
                      stroke="#000000"
                      strokeWidth="0.50"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                    </path>
                  </svg>
                </div>

                <div className="RightMiddleAutomorphism">
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP.5eQEu2HQNvQV41PGTaY2uAHaKz?w=1096&h=1599&rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt=""
                  />
                  <h1>Numerical Two</h1>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className='Autpencil'
                      d="M15 6L18 9M17.4029 3.61716L3.9933 17.0268L3 21L6.97322 20.0067L20.3828 6.59708C21.2057 5.7742 21.2057 4.44004 20.3828 3.61716C19.56 2.79428 18.2258 2.79428 17.4029 3.61716Z"
                      stroke="#000000"
                      strokeWidth="0.50"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                    </path>
                  </svg>
                </div>
              </div>

              {/* ------------ FOOTER SECTION ------------ */}
              <div className="FooterAutomorphism">
                <div className="TopAutomorphismFooter">
                  <h1 className='FooterAutH1'>Importance and Applications</h1>
                </div>

                <div className="EndAutomorphism">
                  <ul className="AutImportanceList">
                    <li>Automorphisms reveal the internal symmetry of a group.</li>
                    <li>The set of all automorphisms of a group forms a group itself, called Aut(G).</li>
                    <li>Used to classify groups based on their symmetry behavior.</li>
                    <li>Essential in studying cyclic groups, symmetric groups, and field extensions.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  )
}

const WrappedGroupTheory = TopTransitions(GroupTheory)
export default WrappedGroupTheory
