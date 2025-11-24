import React from 'react'
import "../WebPageStyling/HomePage.css"
import NavBar from '../Components/NavBar'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { SplitText } from 'gsap/all'
import CompleteTransitions from "../Components/CompleteTransitions.jsx"
import CustomEase from 'gsap/CustomEase'
import { useEffect } from 'react'
import GroupTheoryImg from "../Components/LangTheorem.png"
import Footer from '../Components/Footer.jsx'
import { useNavigate } from 'react-router-dom'

CustomEase.create(
    "hop",
    "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
)
const HomePage = () => {
    gsap.registerPlugin(ScrollTrigger)
    const navigate = useNavigate()
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".main",
                start: "50% 50%",
                end: "100% 50%",
                scrub: 2,
                pin: true,
                // markers: true
            }
        })

        gsap.set(".CenterWelcome", {
            opacity: 1
        })

        gsap.set(".leftEnter, .rightEnter, .left2Enter", {
            opacity: 1
        })


        tl.to(".top", {
            top: "-50%"
        }, "a")
            .to(".bottom", {
                bottom: "-50%"
            }, "a")
            .to(".h1top", {
                bottom: "30%"
            }, "a")
            .to(".h1bottom", {
                bottom: "-20%"
            }, "a")
            .from(".CenterWelcome", {
                y: 100,
                opacity: 0
            }, "a")

        // const ctl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: ".leftEnter, .rightEnter, .left2Enter",
        //         start: "0%",
        //         end: "100%",
        //         // markers: true,
        //         scrub: 1,
        //     }
        // })

        // ctl.from(".leftEnter", {
        //     opacity: 0,
        //     x: -100
        // }, "p").from(".rightEnter", {
        //     opacity: 0,
        //     x: 100
        // }, "p").from(".left2Enter", {
        //     opacity: 0,
        //     x: -100
        // }, "p")

    })


    // useGSAP(() => {
    //     gsap.registerPlugin(SplitText)
    //     gsap.set(".LeftHomeP", {
    //         opacity: 1,
    //     })

    //     const SplittedTexts = gsap.utils.toArray(".LeftHomeP")
    //     SplittedTexts.forEach((splits) => {
    //         SplitText.create(splits, {
    //             type: "lines, words",
    //             mask: "lines",
    //             linesClass: "line",
    //             autoSplit: true,
    //             onSplit: (instance) => {
    //                 return gsap.from(instance.lines, {
    //                     y: 100,
    //                     // x: -100,
    //                     delay: 7,
    //                     stagger: 0.178,
    //                     opacity: 0,
    //                     ease: "hop"
    //                 }, "g")
    //             }
    //         })
    //     })
    //     const SplittedTextsH1 = gsap.utils.toArray(".RightHomeH1")
    //     SplittedTextsH1.forEach((splits) => {
    //         SplitText.create(splits, {
    //             type: "lines, words",
    //             mask: "lines",
    //             linesClass: "line",
    //             autoSplit: true,
    //             onSplit: (instance) => {
    //                 return gsap.from(instance.lines, {
    //                     y: 100,
    //                     // x: -100,
    //                     // stagger: 0.178,
    //                     delay: 7,
    //                     opacity: 0,
    //                     ease: "hop"
    //                 }, "g")
    //             }
    //         })
    //     })
    // })

    useGSAP(() => {
        gsap.registerPlugin(SplitText);

        gsap.set(".LeftHomeP", { opacity: 1 });

        // Create a single timeline for both animations
        const HomePageTimeline = gsap.timeline({ defaults: { ease: "hop", delay: 0.4 } });
        HomePageTimeline.addLabel("textStart");

        // Animate LeftHomeP
        const leftElements = gsap.utils.toArray(".LeftHomeP");
        leftElements.forEach((el) => {
            SplitText.create(el, {
                type: "lines, words",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    HomePageTimeline.from(instance.lines, {
                        y: 100,
                        opacity: 0,
                        stagger: 0.178
                    }, "textStart"); // 0 = start at beginning of timeline
                }
            });
        });

        // Animate RightHomeH1
        const rightElements = gsap.utils.toArray(".RightHomeH1");
        rightElements.forEach((el) => {
            SplitText.create(el, {
                type: "lines, words",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    HomePageTimeline.from(instance.lines, {
                        y: 100,
                        opacity: 0,
                        stagger: 0.178
                    }, "textStart"); // 0 = start at beginning too for simultaneous animation
                }
            });
        });

        const ImageCards = gsap.utils.toArray(".group .card")

        gsap.from(ImageCards, {
            delay: 1,
            scaleY: 0,
            transformOrigin: "top top",
            // stagger: 0.079,
            duration: 0.8,
            ease: "hop"
        });


        // HomePageTimeline.from(".imgsCar", {
        //     scaleY: 0,
        //     ease: "hop",
        // }, 0)
    });

    useGSAP(() => {
        const cards = gsap.utils.toArray(".card");

        cards.forEach((card) => {
            const h1 = card.querySelector("h1");
            const h2 = card.querySelector("h2")
            // initially hide h1
            gsap.set(h1, { y: -100, opacity: 0, visibility: "hidden" });
            gsap.set(h2, { y: 100, opacity: 0, visibility: "hidden" });

            card.addEventListener("mouseenter", () => {
                gsap.to(h1, {
                    y: 0,
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.8,
                    ease: "power4.out",
                });
            });
            card.addEventListener("mouseenter", () => {
                gsap.to(h2, {
                    y: 0,
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.8,
                    ease: "power4.out",
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(h1, {
                    y: -100,
                    opacity: 0,
                    visibility: "hidden",
                    duration: 0.8,
                    ease: "power3.in",
                });
            });
            card.addEventListener("mouseleave", () => {
                gsap.to(h2, {
                    y: 100,
                    opacity: 0,
                    visibility: "hidden",
                    duration: 0.8,
                    ease: "power3.in",
                });
            });
        });
    });


    // useGSAP(() => {
    //     const elemC = document.querySelector(".TeamMates")
    //     const images = document.querySelector(".TeamMateImages")
    //     elemC.addEventListener("mouseenter",() => {
    //         images.style.visibility = "visible"
    //     })
    //     elemC.addEventListener("mouseleave",() => {
    //         images.style.visibility = "hidden"
    //     })

    //     const team1 = document.querySelector(".Imageone")
    //     team1.addEventListener("mouseenter", () => {
    //         const imageTeam1 = team1.getAttribute("data-image")
    //         images.style.backgroundImage = `url(${imageTeam1})`
    //     })

    // })


    useEffect(() => {
        const images = document.querySelector(".TeamMateImages");
        const teamMembers = document.querySelectorAll(".TeamComp");

        if (!images || !teamMembers.length) return;

        teamMembers.forEach((team, i) => {
            team.addEventListener("mouseenter", () => {
                const imgSrc = document.querySelectorAll(".Imageone")[i].getAttribute("data-image");
                images.style.backgroundImage = `url(${imgSrc})`;
                images.style.visibility = "visible";
            });
            team.addEventListener("mouseleave", () => {
                images.style.visibility = "hidden";
            });
        });

        return () => {
            teamMembers.forEach((team, i) => {
                team.removeEventListener("mouseenter", () => { });
                team.removeEventListener("mouseleave", () => { });
            });
        };
    }, []);



    return (
        <>
            <NavBar />
            <div className="HomePage">
                <div className="HomePageContainer">
                    <div className="HomePageOne">
                        <div className="HomePageOneHeader">
                            <div className="LeftHomePageOne">
                                <p className='LeftHomeP'>Explore the fascinating world of Group Theory, Combinatorics, and Graph Theory through interactive visuals.</p>
                            </div>
                            <div className="RightHomePageOne">
                                <h1 className='RightHomeH1'>Maths Presentation</h1>
                            </div>
                        </div>
                        <div className="HomePageOneBottom">
                            <div className="carousel">
                                <div className="group">
                                    <div className="card" onClick={() => window.open("https://www.math.kent.edu/~white/qual/list/group.pdf", "_blank")}><img className='imgsCar' src='https://uwaterloo.ca/math/sites/default/files/uploads/images/apparatus-and-hand-dali.jpg' alt="" /><h1>Group Theory</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://www.math.toronto.edu/barbeau/elemcomb.pdf", "_blank")}><img className='imgsCar' src="https://old.maa.org/sites/default/files/images/upload_library/46/Smithsonian/NMAH-2008-2519.jpg" alt="" /><h1>Combinatorics</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://web.mat.upc.edu/fib/matematiques1/docs/pm1_graphs.pdf", "_blank")}><img className='imgsCar' src="https://ids.si.edu/ids/deliveryService?id=NMAH-2008-2546&max_w=550" alt="" /><h1>Graph Theory</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card"><img className='imgsCar' src="https://i0.wp.com/www.guggenheim.org/wp-content/uploads/2016/07/artwork-vasily-kandinsky-composition-8-37.262.jpg" alt="" /><h1>Z₇ Group</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://www.math.kent.edu/~white/qual/list/group.pdf", "_blank")}><img className='imgsCar' src="https://uwaterloo.ca/math/sites/default/files/uploads/images/apparatus-and-hand-dali.jpg" alt="" /><h1>Group Theory</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://www.math.toronto.edu/barbeau/elemcomb.pdf", "_blank")}><img className='imgsCar' src="https://old.maa.org/sites/default/files/images/upload_library/46/Smithsonian/NMAH-2008-2519.jpg" alt="" /><h1>Combinatorics</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                </div>
                                <div className="group" aria-hidden>
                                    <div className="card" onClick={() => window.open("https://www.math.kent.edu/~white/qual/list/group.pdf", "_blank")}><img className='imgsCar' src='https://uwaterloo.ca/math/sites/default/files/uploads/images/apparatus-and-hand-dali.jpg' alt="" /><h1 className='H1GTH'>Group Theory</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://www.math.toronto.edu/barbeau/elemcomb.pdf", "_blank")}><img className='imgsCar' src="https://old.maa.org/sites/default/files/images/upload_library/46/Smithsonian/NMAH-2008-2519.jpg" alt="" /><h1>Combinatorics</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://web.mat.upc.edu/fib/matematiques1/docs/pm1_graphs.pdf", "_blank")}><img className='imgsCar' src="https://ids.si.edu/ids/deliveryService?id=NMAH-2008-2546&max_w=550" alt="" /><h1>Graph Theory</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card"><img className='imgsCar' src="https://i0.wp.com/www.guggenheim.org/wp-content/uploads/2016/07/artwork-vasily-kandinsky-composition-8-37.262.jpg" alt="" /><h1>Z₇ Group</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://www.math.kent.edu/~white/qual/list/group.pdf", "_blank")}><img className='imgsCar' src="https://uwaterloo.ca/math/sites/default/files/uploads/images/apparatus-and-hand-dali.jpg" alt="" /><h1>Group Theory</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://www.math.toronto.edu/barbeau/elemcomb.pdf", "_blank")}><img className='imgsCar' src="https://old.maa.org/sites/default/files/images/upload_library/46/Smithsonian/NMAH-2008-2519.jpg" alt="" /><h1>Combinatorics</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                </div>
                                <div className="group" aria-hidden>
                                    <div className="card" onClick={() => window.open("https://www.math.kent.edu/~white/qual/list/group.pdf", "_blank")}><img className='imgsCar' src='https://uwaterloo.ca/math/sites/default/files/uploads/images/apparatus-and-hand-dali.jpg' alt="" /><h1>Group Theory</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://www.math.toronto.edu/barbeau/elemcomb.pdf", "_blank")}><img className='imgsCar' src="https://old.maa.org/sites/default/files/images/upload_library/46/Smithsonian/NMAH-2008-2519.jpg" alt="" /><h1>Combinatorics</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://web.mat.upc.edu/fib/matematiques1/docs/pm1_graphs.pdf", "_blank")}><img className='imgsCar' src="https://ids.si.edu/ids/deliveryService?id=NMAH-2008-2546&max_w=550" alt="" /><h1>Graph Theory</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card"><img className='imgsCar' src="https://i0.wp.com/www.guggenheim.org/wp-content/uploads/2016/07/artwork-vasily-kandinsky-composition-8-37.262.jpg" alt="" /><h1>Z₇ Group</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://www.math.kent.edu/~white/qual/list/group.pdf", "_blank")}><img className='imgsCar' src="https://uwaterloo.ca/math/sites/default/files/uploads/images/apparatus-and-hand-dali.jpg" alt="" /><h1>Group Theory</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                    <div className="card" onClick={() => window.open("https://www.math.toronto.edu/barbeau/elemcomb.pdf", "_blank")}><img className='imgsCar' src="https://old.maa.org/sites/default/files/images/upload_library/46/Smithsonian/NMAH-2008-2519.jpg" alt="" /><h1>Combinatorics</h1><h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>Explore</h2></div>
                                </div>
                                {/* <div className="group" aria-hidden>
                                    <div className="card"><img className='imgsCar' src="https://images.pexels.com/photos/33930807/pexels-photo-33930807.jpeg?cs=srgb&dl=pexels-thistefan-istefan-2155860114-33930807.jpg&fm=jpg" alt="" /></div>
                                    <div className="card"><img className='imgsCar' src="https://i.pinimg.com/originals/32/f7/0e/32f70ea9f5c24b4152c3db659c31512c.jpg" alt="" /></div>
                                    <div className="card"><img className='imgsCar' src="https://tse4.mm.bing.net/th/id/OIP.-_XBiWxSht_1XpIT0ZDKeQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" /></div>
                                    <div className="card"><img className='imgsCar' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ba9d2657436635.59d5a448a02e4.jpg" alt="" /></div>
                                    <div className="card"><img className='imgsCar' src="https://tse1.mm.bing.net/th/id/OIF.wooZ6ztkJLBD6hdHtGhLxQ?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" /></div>
                                    <div className="card"><img className='imgsCar' src="https://images.pexels.com/photos/6226956/pexels-photo-6226956.jpeg?cs=srgb&dl=pexels-gaurav-ranjitkar-6226956.jpg&fm=jpg" alt="" /></div>
                                </div> */}
                            </div>
                        </div>

                    </div>


                    <div className="HomePageOurTopics">
                        <div className="TeamMates">

                            {/* <div className="TeamMateImages">
                                <div className="Imageone" data-image="https://clariospace-frontend.onrender.com/assets/Zuhaib-sjmuE5XL-BIRXKHFt.jpg">
                                </div>
                                <div className="Imageone" data-image="https://i.postimg.cc/NG3Bq46y/image.png">
                                </div>
                                <div className="Imageone" data-image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOjm1S6UfcX3hhCqpOvOIaBmoC2iiR-MbwdbocpBfuS9u--zmg_jSD9NgnlmO9JCRISRyG6PLTTRsquZ_KnwKASuhWEJRXlyvhzdsSG0&s=10">
                                </div>
                                <div className="Imageone" data-image="https://i.postimg.cc/xCkDBJcn/image.png">
                                </div>
                                <div className="Imageone" data-image="https://i.postimg.cc/LXgwNcbM/image.png">
                                </div>
                                <div className="Imageone" data-image="https://i.postimg.cc/15s7qVsR/Sayed-Anas.jpg">
                                </div>
                            </div> */}
                            {/* <div className="ImageOverLay1">
                    <img src="https://i.pinimg.com/736x/c6/c3/62/c6c36212286d7a97c0eb2940408161f0.jpg" alt="" />
                </div> */}
                            <div className="OurTopicHeading">
                                <h1>Team & Topics</h1>
                            </div>
                            <div className="TeamComp" onClick={() => { navigate("/grouptheory") }}>
                                <div className="overlay"></div>
                                <div className="TeamLeft">
                                    <h4>Zuhaib Mohammed Ahsan Khan</h4>
                                </div>
                                <div className="TeamRight">
                                    <h4>Group Theory<sup className='raiseTo'>/01</sup></h4>
                                </div>
                            </div>
                            <div className="TeamComp" onClick={() => { navigate("/grouptheory") }}>
                                <div className="overlay"></div>
                                <div className="TeamLeft">
                                    <h4>Shane William</h4>
                                </div>
                                <div className="TeamRight">
                                    <h4>Group Theory<sup className='raiseTo'>/02</sup></h4>
                                </div>
                            </div>
                            <div className="TeamComp" onClick={() => { navigate("/combinatorics") }}>
                                <div className="overlay"></div>
                                <div className="TeamLeft">
                                    <h4>Mohammed Anas</h4>
                                </div>
                                <div className="TeamRight">
                                    <h4>Combinatorics<sup className='raiseTo'>/01</sup></h4>
                                </div>
                            </div>
                            <div className="TeamComp" onClick={() => { navigate("/graphtheory") }}>
                                <div className="overlay"></div>
                                <div className="TeamLeft">
                                    <h4>Mohammed Aleef</h4>
                                </div>
                                <div className="TeamRight">
                                    <h4>Graph Theory <sup className='raiseTo'>/01</sup></h4>
                                </div>
                            </div>
                            <div className="TeamComp" onClick={() => { navigate("/graphtheory") }}>
                                <div className="overlay"></div>
                                <div className="TeamLeft">
                                    <h4>Hersh Shukla</h4>
                                </div>
                                <div className="TeamRight">
                                    <h4>Graph Theory<sup className='raiseTo'>/02</sup></h4>
                                </div>
                            </div>
                            <div className="TeamComp" onClick={() => { navigate("/z7group") }}>
                                <div className="overlay"></div>
                                <div className="TeamLeft">
                                    <h4>Sayed Muhammed Anas</h4>
                                </div>
                                <div className="TeamRight">
                                    <h4>Z₇ Group<sup className='raiseTo'>/01</sup></h4>
                                </div>
                            </div>
                            {/* <div className="TeamComp">
                                <div className="overlay"></div>
                                <div className="TeamLeft">
                                    <h4>Lorem, ipsum dolor.</h4>
                                </div>
                                <div className="TeamRight">
                                    <h4>Lorem, ipsum.</h4>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* <div className="HomePageTwo">
                        <div className="main">
                            <div className="top"><h1 className='h1top'>Mathematics Beyond the Classroom</h1></div>
                            <div className="center"></div>
                            <div className="bottom" ><h1 className='h1bottom'>Mathematics Beyond the Classroom</h1></div>
                        </div>
                        <div className="ExtraPage"></div>
                    </div> */}
                </div>
            </div>
            <Footer />
        </>

    )
}

const WrappedHomePage = CompleteTransitions(HomePage)
export default WrappedHomePage
