import React, { useState, useRef, useEffect, useCallback } from 'react';
import NavBar from "../Components/NavBar.jsx";
import TopTransitions from "../Components/TopTransitions.jsx"
import "../WebPageStyling/GraphTheory.css";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin, ScrollTrigger, SplitText } from 'gsap/all';
import Footer from '../Components/Footer.jsx';

const GraphTheory = () => {
    const [activeTab, setActiveTab] = useState('introduction');
    const [graphNodes, setGraphNodes] = useState([
        { id: 1, x: 150, y: 100, color: '#ffffff', label: 'A' },
        { id: 2, x: 250, y: 150, color: '#ffffff', label: 'B' },
        { id: 3, x: 200, y: 250, color: '#ffffff', label: 'C' },
        { id: 4, x: 100, y: 200, color: '#ffffff', label: 'D' },
    ]);
    const [graphEdges, setGraphEdges] = useState([
        { id: 1, source: 1, target: 2 },
        { id: 2, source: 2, target: 3 },
        { id: 3, source: 3, target: 4 },
        { id: 4, source: 4, target: 1 },
    ]);
    const [selectedColor, setSelectedColor] = useState('#ff0000');
    const [isDragging, setIsDragging] = useState(null);
    const [coloringErrors, setColoringErrors] = useState(new Set());
    const [nodeCount, setNodeCount] = useState(4);
    const [planarNodes, setPlanarNodes] = useState([]);
    const [planarEdges, setPlanarEdges] = useState([]);
    const [planarResult, setPlanarResult] = useState('');
    const [crossingEdges, setCrossingEdges] = useState(new Set());
    const [labelingNodes, setLabelingNodes] = useState([]);
    const [labelingEdges, setLabelingEdges] = useState([]);
    const canvasRef = useRef(null);

    // Initialize planar nodes/edges when component mounts
    useEffect(() => {
        setPlanarNodes(graphNodes.map(node => ({ ...node })));
        setPlanarEdges(graphEdges.map(edge => ({ ...edge })));
        setLabelingNodes(graphNodes.map(node => ({ ...node })));
        setLabelingEdges(graphEdges.map(edge => ({ ...edge })));
    }, []);

    // Separate state for each section to prevent cross-contamination
    // Check for coloring conflicts when a node is colored
    const checkColoringConflicts = (nodes, edges) => {
        const errors = new Set();

        edges.forEach(edge => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);

            if (sourceNode && targetNode && sourceNode.color === targetNode.color && sourceNode.color !== '#ffffff') {
                errors.add(sourceNode.id);
                errors.add(targetNode.id);
            }
        });

        return errors;
    };

    // Check if a graph contains K5 as a subgraph
    const containsK5 = (nodes, edges) => {
        const n = nodes.length;
        if (n < 5) return false;

        // Check all combinations of 5 nodes
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                for (let k = j + 1; k < n; k++) {
                    for (let l = k + 1; l < n; l++) {
                        for (let m = l + 1; m < n; m++) {
                            const ids = [i, j, k, l, m];
                            const nodeIds = ids.map(idx => nodes[idx].id);
                            let edgeCount = 0;

                            // Count edges between these 5 nodes
                            for (let a = 0; a < 5; a++) {
                                for (let b = a + 1; b < 5; b++) {
                                    const source = nodeIds[a];
                                    const target = nodeIds[b];

                                    if (edges.some(e =>
                                        (e.source === source && e.target === target) ||
                                        (e.source === target && e.target === source)
                                    )) {
                                        edgeCount++;
                                    }
                                }
                            }

                            // K5 has 10 edges (5 choose 2)
                            if (edgeCount === 10) return true;
                        }
                    }
                }
            }
        }

        return false;
    };

    // Check if a graph contains K3,3 as a subgraph
    const containsK33 = (nodes, edges) => {
        const n = nodes.length;
        if (n < 6) return false;

        // Check all combinations of 6 nodes
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                for (let k = j + 1; k < n; k++) {
                    for (let l = k + 1; l < n; l++) {
                        for (let m = l + 1; m < n; m++) {
                            for (let o = m + 1; o < n; o++) {
                                const ids = [i, j, k, l, m, o];
                                const nodeIds = ids.map(idx => nodes[idx].id);

                                // Try all possible bipartitions of these 6 nodes
                                // We need to check if we can partition them into two sets of 3
                                // such that every node in one set connects to every node in the other
                                const bipartitions = [
                                    [[0, 1, 2], [3, 4, 5]], // First 3 vs last 3
                                    [[0, 1, 3], [2, 4, 5]], // etc.
                                    [[0, 1, 4], [2, 3, 5]],
                                    [[0, 1, 5], [2, 3, 4]],
                                    [[0, 2, 3], [1, 4, 5]],
                                    [[0, 2, 4], [1, 3, 5]],
                                    [[0, 2, 5], [1, 3, 4]],
                                    [[0, 3, 4], [1, 2, 5]],
                                    [[0, 3, 5], [1, 2, 4]],
                                    [[0, 4, 5], [1, 2, 3]],
                                ];

                                for (const [setA, setB] of bipartitions) {
                                    let validBipartition = true;
                                    let edgeCount = 0;

                                    for (const aIdx of setA) {
                                        for (const bIdx of setB) {
                                            const source = nodeIds[aIdx];
                                            const target = nodeIds[bIdx];

                                            if (edges.some(e =>
                                                (e.source === source && e.target === target) ||
                                                (e.source === target && e.target === source)
                                            )) {
                                                edgeCount++;
                                            } else {
                                                validBipartition = false;
                                                break;
                                            }
                                        }
                                        if (!validBipartition) break;
                                    }

                                    if (validBipartition && edgeCount === 9) return true;
                                }
                            }
                        }
                    }
                }
            }
        }

        return false;
    };

    // Check if graph satisfies Euler's inequality (E ≤ 3V - 6)
    const violatesEulerInequality = (nodes, edges) => {
        return edges.length > 3 * nodes.length - 6;
    };

    // Check for edge crossings in the current drawing
    const checkEdgeCrossings = () => {
        const crossingIds = new Set();

        for (let i = 0; i < planarEdges.length; i++) {
            for (let j = i + 1; j < planarEdges.length; j++) {
                const edge1 = planarEdges[i];
                const edge2 = planarEdges[j];

                // Skip if edges share a common vertex
                if (edge1.source === edge2.source ||
                    edge1.source === edge2.target ||
                    edge1.target === edge2.source ||
                    edge1.target === edge2.target) {
                    continue;
                }

                // Get node positions
                const node1 = planarNodes.find(n => n.id === edge1.source);
                const node2 = planarNodes.find(n => n.id === edge1.target);
                const node3 = planarNodes.find(n => n.id === edge2.source);
                const node4 = planarNodes.find(n => n.id === edge2.target);

                // Check if the edges intersect
                if (doLinesIntersect(node1, node2, node3, node4)) {
                    crossingIds.add(edge1.id);
                    crossingIds.add(edge2.id);
                }
            }
        }

        return crossingIds;
    };

    // Check if two line segments intersect
    const doLinesIntersect = (p1, p2, p3, p4) => {
        const [x1, y1] = [p1.x, p1.y];
        const [x2, y2] = [p2.x, p2.y];
        const [x3, y3] = [p3.x, p3.y];
        const [x4, y4] = [p4.x, p4.y];

        // Calculate direction vectors
        const d1 = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
        const d2 = (x2 - x1) * (y4 - y1) - (x4 - x1) * (y2 - y1);
        const d3 = (x4 - x3) * (y1 - y3) - (x1 - x3) * (y4 - y3);
        const d4 = (x4 - x3) * (y2 - y3) - (x2 - x3) * (y4 - y3);

        // Check if the lines intersect
        return d1 * d2 < 0 && d3 * d4 < 0;
    };

    // Check for planarity using Kuratowski's theorem and Euler's inequality
    const checkPlanarity = () => {
        // Check Euler's inequality first (quick filter)
        if (violatesEulerInequality(planarNodes, planarEdges)) {
            setPlanarResult('This is not a planar Graph (violates Euler\'s inequality)');
            setCrossingEdges(checkEdgeCrossings());
            return;
        }

        // Check for K5 and K3,3
        if (containsK5(planarNodes, planarEdges)) {
            setPlanarResult('This is not a planar Graph (contains K₅)');
            setCrossingEdges(checkEdgeCrossings());
            return;
        }

        if (containsK33(planarNodes, planarEdges)) {
            setPlanarResult('This is not a planar Graph (contains K₃,₃)');
            setCrossingEdges(checkEdgeCrossings());
            return;
        }

        // If no forbidden subgraphs found, it's planar
        setPlanarResult('This is a planar Graph');
        setCrossingEdges(new Set());
    };

    // Generate a new graph based on node count
    const generateGraph = (count) => {
        if (count < 2) return;

        const newNodes = [];
        const newEdges = [];

        // Create nodes in a circle, centered in the canvas
        const centerX = 200;
        const centerY = 150;
        const radius = 100;

        for (let i = 0; i < count; i++) {
            const angle = (i * 2 * Math.PI) / count;
            newNodes.push({
                id: i + 1,
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
                color: '#ffffff',
                label: `v${i + 1}` // Vertex labels as v1, v2, ...
            });
        }

        // Create edges to form a cycle
        for (let i = 0; i < count; i++) {
            newEdges.push({
                id: i + 1,
                source: i + 1,
                target: (i + 1) % count + 1,
                label: `e${i + 1}` // Edge labels as e1, e2, ...
            });
        }

        setGraphNodes(newNodes);
        setGraphEdges(newEdges);
        setPlanarNodes(newNodes.map(node => ({ ...node })));
        setPlanarEdges(newEdges.map(edge => ({ ...edge })));
        setLabelingNodes(newNodes.map(node => ({ ...node })));
        setLabelingEdges(newEdges.map(edge => ({ ...edge })));
        setColoringErrors(new Set());
        setPlanarResult('');
        setCrossingEdges(new Set());
    };

    const handleNodeClick = (nodeId) => {
        if (activeTab === 'coloring') {
            setGraphNodes(prevNodes => {
                const updatedNodes = prevNodes.map(node =>
                    node.id === nodeId
                        ? { ...node, color: selectedColor }
                        : node
                );

                // Check for conflicts after coloring
                const errors = checkColoringConflicts(updatedNodes, graphEdges);
                setColoringErrors(errors);
                return updatedNodes;
            });
        }
    };

    const handleMouseDown = (e, nodeId) => {
        if (activeTab === 'coloring') {
            setIsDragging(nodeId);
        } else if (activeTab === 'planar') {
            setIsDragging(nodeId);
        } else if (activeTab === 'labeling') {
            setIsDragging(nodeId);
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            // Boundary constraints
            const boundary = 15; // Margin from edges
            x = Math.max(boundary, Math.min(400 - boundary, x));
            y = Math.max(boundary, Math.min(300 - boundary, y));

            if (activeTab === 'coloring') {
                setGraphNodes(prevNodes =>
                    prevNodes.map(node =>
                        node.id === isDragging
                            ? { ...node, x, y }
                            : node
                    )
                );
            } else if (activeTab === 'planar') {
                setPlanarNodes(prevNodes =>
                    prevNodes.map(node =>
                        node.id === isDragging
                            ? { ...node, x, y }
                            : node
                    )
                );
            } else if (activeTab === 'labeling') {
                setLabelingNodes(prevNodes =>
                    prevNodes.map(node =>
                        node.id === isDragging
                            ? { ...node, x, y }
                            : node
                    )
                );
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(null);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    // Reset coloring when switching tabs
    useEffect(() => {
        if (activeTab !== 'coloring') {
            setColoringErrors(new Set());
        } else {
            // Re-evaluate conflicts when returning to coloring tab
            const errors = checkColoringConflicts(graphNodes, graphEdges);
            setColoringErrors(errors);
        }

        if (activeTab !== 'planar') {
            setPlanarResult('');
            setCrossingEdges(new Set());
        }
    }, [activeTab, graphNodes, graphEdges]);

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];






    //* GSAP Animations

    //* Text Animations -- Heading 
    useGSAP(() => {
        gsap.registerPlugin(SplitText)
        const SplittedTexts = gsap.utils.toArray(".graphH1")
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

    //* Text Animations -- Graph Theory Defination
    useGSAP(() => {
        // gsap.registerPlugin(ScrollTrigger)
        const SplittedTexts = gsap.utils.toArray(".graphH2")
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

    //* Text Animations --Graph Theory List
    useGSAP(() => {
        // gsap.registerPlugin(ScrollTrigger)
        const SplittedTexts = gsap.utils.toArray(".graphLIST")
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

    //* Text Animation -- Graph Theory H3 (Follwoing are types)
    useGSAP(() => {
        // gsap.registerPlugin(ScrollTrigger)
        const SplittedTexts = gsap.utils.toArray(".graphH3")
        SplittedTexts.forEach((splits) => {
            SplitText.create(splits, {
                type: "lines, words",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    return gsap.from(instance.lines, {
                        y: 100,
                        delay: 1.1,
                        stagger: 0.1,
                        ease: "power2.out",
                    })
                }
            })
        })
    })

    //* SVG Animation -- Graph SVG
    useGSAP(() => {
        gsap.registerPlugin(DrawSVGPlugin)
        gsap.fromTo(".graphSVG", {
            drawSVG: "0%",
            delay: 0.4,
            repeat: -1,
            yoyo: true,
            repeatDelay: 1
        }, {
            delay: 0.4,
            drawSVG: "100%",
            repeat: -1,
            yoyo: true,
            duration: 2.1,
            repeatDelay: 1,
            ease: "power1.out"
        })
    })





    //* Split Page Animation
    // useGSAP(() => {
    //     gsap.set(".CenterWelcome", {
    //         opacity: 1
    //     })

    //     gsap.set(".leftEnter, .rightEnter, .left2Enter", {
    //         opacity: 1
    //     })


    //     const tl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: ".main",
    //             start: "50% 50%",
    //             end: "100% 50%",
    //             scrub: 2,
    //             pin: true,
    //             // markers: true
    //         }
    //     })

    //     tl.to(".top", {
    //         top: "-50%"
    //     }, "a")
    //         .to(".bottom", {
    //             bottom: "-50%"
    //         }, "a")
    //         .to(".h1top", {
    //             bottom: "30%"
    //         }, "a")
    //         .to(".h1bottom", {
    //             bottom: "-20%"
    //         }, "a")
    //         .from(".CenterWelcome", {
    //             y: 100,
    //             opacity: 0
    //         }, "a")
    //     //     .fromTo(".simpleGraphSVG, .directedGraphSVG, .WeightedGraphSVG, .CompleteGraphSVG", {
    //     //         drawSVG: "0%",
    //     //     }, {
    //     //         drawSVG: "100%",
    //     //         ease: "power1.out",
    //     //         // duration: 3,
    //     //     }, "l")
    //     // const SplittedTexts = gsap.utils.toArray(".GraphTypeH2")
    //     // SplittedTexts.forEach((splits) => {
    //     //     SplitText.create(splits, {
    //     //         type: "lines, words",
    //     //         mask: "lines",
    //     //         linesClass: "line",
    //     //         autoSplit: true,
    //     //         onSplit: (instance) => {
    //     //             return tl.from(instance.lines, {
    //     //                 y: 20,
    //     //                 // opacity: 0,
    //     //                 stagger: 0.1,
    //     //                 ease: "power2.out",
    //     //             }, "l")
    //     //         }
    //     //     })
    //     // })

    //     // const ctl = gsap.timeline({
    //     //     scrollTrigger: {
    //     //         trigger: ".GraphTypeH2",
    //     //         start: "0%",
    //     //         end: "100%",
    //     //         // markers: true,
    //     //         scrub: 1,
    //     //     }
    //     // })

    //     // ctl.from(".GraphTypeH2", {
    //     //     opacity: 0,
    //     //     y: 30,
    //     // }, "p").from(".rightEnter", {
    //     //     opacity: 0,
    //     //     x: 100
    //     // }, "p").from(".left2Enter", {
    //     //     opacity: 0,
    //     //     x: -100
    //     // }, "p")

    // })
    useGSAP(() => {
        gsap.set(".CenterWelcome", { opacity: 1 });
        gsap.set(".leftEnter, .rightEnter, .left2Enter", { opacity: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".main",
                start: "50% 50%",
                end: "100% 50%",
                scrub: 2,
                pin: true,
                // markers: true
            }
        });

        // ----------------------------------------------------
        // 1. Your existing scroll animations
        // ----------------------------------------------------
        tl.to(".top", { top: "-50%" }, "a")
            .to(".bottom", { bottom: "-50%" }, "a")
            .to(".h1top", { bottom: "30%" }, "a")
            .to(".h1bottom", { bottom: "-20%" }, "a")
            .from(".CenterWelcome", { y: 100, opacity: 0 }, "a");

        // ----------------------------------------------------
        // 2. SVG DRAWING (Simple + Directed + Weighted + Complete)
        //     All synced with SAME LABEL "a"
        // ----------------------------------------------------
        tl.fromTo(
            ".simpleGraphSVG, .directedGraphSVG, .WeightedGraphSVG, .CompleteGraphSVG",
            { drawSVG: "0%" },
            {
                drawSVG: "100%",
                ease: "power1.out",
            },
            "a+=0.2"
        );

        // ----------------------------------------------------
        // 3. SplitText animation for .GraphTypeH2
        //     Also synced to EXACT same start label "a"
        // ----------------------------------------------------
        const SplittedTexts = gsap.utils.toArray(".GraphTypeH2");

        SplittedTexts.forEach((splits) => {
            SplitText.create(splits, {
                type: "lines, words",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    tl.from(
                        instance.lines,
                        {
                            y: 20,
                            opacity: 0,
                            stagger: 0.1,
                            ease: "power2.out",
                        },
                        "a+=0.2" // <-- All start at same time
                    );
                }
            });
        });

        // ----------------------------------------------------
        // 4. Your second timeline (fade-in H2 + left/right elements)
        // ----------------------------------------------------

        const ctl = gsap.timeline({
            scrollTrigger: {
                trigger: ".GraphTypeH2",
                start: "0%",
                end: "100%",
                scrub: 1,
                // markers: true,
            }
        });

        ctl.from(".GraphTypeH2", {
            opacity: 0,
            y: 30,
        }, "p")
            .from(".rightEnter", {
                opacity: 0,
                x: 100
            }, "p")
            .from(".left2Enter", {
                opacity: 0,
                x: -100
            }, "p");
    });


    // useGSAP(() => {
    //     gsap.fromTo(".simpleGraphSVG", {
    //         drawSVG: "0%",

    //     }, {
    //         drawSVG: "100%",
    //         ease: "power1.out",
    //         duration: 3,
    //     })
    // })

    return (
        <>
            <NavBar />
            <div className="GraphTheory">
                <div className="GraphTheoryContainer">

                    {/* Introduction Section */}
                    <div className="IntroductionGraphTheory">
                        <div className="TopIntroductionGraphTheory">
                            <div className="LeftTopIntroductionGraphTheory">
                                <h1 className='graphH1'>Graph Theory</h1>
                                <h2 className='graphH2'>
                                    Graph Theory is a branch of mathematics that studies graphs, which are abstract representations of relationships between objects.
                                </h2>
                                <ul className="graphLIST">
                                    <li><strong>Vertex (Node):</strong> A vertex represents an individual object or entity in a graph, such as a city in a map, a person in a social network, or a computer in a network.</li>
                                    <li><strong>Edge (Connection):</strong> An edge represents a relationship or connection between two vertices. It can be directed or undirected, weighted or unweighted, depending on the type of graph.</li>
                                </ul>
                                <h3 className='graphH3'>Graphs can be classified into several types, depending on their properties and the nature of their edges. Some common types include:</h3>
                            </div>

                            <div className="InteractiveCanvas" ref={canvasRef}>
                                <svg width="400" height="300">
                                    {graphEdges.map(edge => {
                                        const sourceNode = graphNodes.find(n => n.id === edge.source);
                                        const targetNode = graphNodes.find(n => n.id === edge.target);
                                        return (
                                            <line
                                                className='graphSVG'
                                                key={edge.id}
                                                x1={sourceNode.x}
                                                y1={sourceNode.y}
                                                x2={targetNode.x}
                                                y2={targetNode.y}
                                                stroke="#000"
                                                strokeWidth="2"
                                            />
                                        );
                                    })}
                                    {graphNodes.map(node => (
                                        <circle

                                            key={node.id}
                                            cx={node.x}
                                            cy={node.y}
                                            r="20"
                                            fill={activeTab === 'coloring' && coloringErrors.has(node.id) ? '#ffcccc' : node.color}
                                            stroke={activeTab === 'coloring' && coloringErrors.has(node.id) ? '#ff0000' : '#000'}
                                            strokeWidth="2"
                                            className="node graphSVG"
                                            onMouseDown={(e) => handleMouseDown(e, node.id)}
                                            onClick={() => handleNodeClick(node.id)}
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>

                        {/* Types of Graphs Section */}
                        {/* <div className="TypesOfGraphs">
                            <h1>Types of Graphs</h1>

                            <div className="GraphType">
                                <h2>1. Simple Graph</h2>
                                <p>A graph with no loops (edges connecting a vertex to itself) and no multiple edges between the same pair of vertices.</p>
                                <p>Example: A pentagon-shaped graph where each vertex connects to its neighbor.</p>
                                <div className="SimpleGraph">
                                    <svg width="200" height="200">
                                        <circle cx="100" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="170" cy="80" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="150" cy="160" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="50" cy="160" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="30" cy="80" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                        <line x1="100" y1="50" x2="170" y2="80" stroke="#000" strokeWidth="2" />
                                        <line x1="170" y1="80" x2="150" y2="160" stroke="#000" strokeWidth="2" />
                                        <line x1="150" y1="160" x2="50" y2="160" stroke="#000" strokeWidth="2" />
                                        <line x1="50" y1="160" x2="30" y2="80" stroke="#000" strokeWidth="2" />
                                        <line x1="30" y1="80" x2="100" y2="50" stroke="#000" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>

                            <div className="GraphType">
                                <h2>2. Directed Graph (Digraph)</h2>
                                <p>Edges have a direction (arrows). Shows relationships like: A → B (one-way).</p>
                                <p>Example: A follows B, but B may not follow A.</p>
                                <div className="DirectedGraph">
                                    <svg width="200" height="200">
                                        <circle cx="50" cy="100" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="150" cy="100" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                        <line x1="60" y1="100" x2="140" y2="100" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)" />

                                        <defs>
                                            <marker id="arrowhead" markerWidth="10" markerHeight="7"
                                                refX="9" refY="3.5" orient="auto">
                                                <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
                                            </marker>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            <div className="GraphType">
                                <h2>3. Weighted Graph</h2>
                                <p>Each edge has a weight/value associated with it. Represents cost, distance, or capacity.</p>
                                <p>Example: Road map where edges are distances between cities.</p>
                                <div className="WeightedGraph">
                                    <svg width="200" height="200">
                                        <circle cx="50" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="150" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="100" cy="150" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                        <line x1="50" y1="50" x2="150" y2="50" stroke="#000" strokeWidth="2" />
                                        <line x1="50" y1="50" x2="100" y2="150" stroke="#000" strokeWidth="2" />
                                        <line x1="150" y1="50" x2="100" y2="150" stroke="#000" strokeWidth="2" />

                                        <text x="100" y="45" textAnchor="middle" fill="#000" fontSize="12">5</text>
                                        <text x="70" y="105" textAnchor="middle" fill="#000" fontSize="12">3</text>
                                        <text x="130" y="105" textAnchor="middle" fill="#000" fontSize="12">4</text>
                                    </svg>
                                </div>
                            </div>

                            <div className="GraphType">
                                <h2>4. Complete Graph</h2>
                                <p>Every pair of vertices is connected by an edge.</p>
                                <p>Example: 4 vertices fully connected → 6 edges.</p>
                                <div className="CompleteGraph">
                                    <svg width="200" height="200">
                                        <circle cx="50" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="150" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="150" cy="150" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                        <circle cx="50" cy="150" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                        <line x1="50" y1="50" x2="150" y2="50" stroke="#000" strokeWidth="2" />
                                        <line x1="150" y1="50" x2="150" y2="150" stroke="#000" strokeWidth="2" />
                                        <line x1="150" y1="150" x2="50" y2="150" stroke="#000" strokeWidth="2" />
                                        <line x1="50" y1="150" x2="50" y2="50" stroke="#000" strokeWidth="2" />
                                        <line x1="50" y1="50" x2="150" y2="150" stroke="#000" strokeWidth="2" />
                                        <line x1="50" y1="150" x2="150" y2="50" stroke="#000" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        </div> */}

                        <div className="HomePageTwo">
                            <div className="main">
                                <div className="top"><h1 className='h1top'>GraphTypes</h1></div>
                                <div className="center">
                                    {/* <div className="TypesOfGraphs">
                                        <h1>Types of Graphs</h1>

                                        <div className="GraphType">
                                            <h2>1. Simple Graph</h2>
                                            <p>A graph with no loops (edges connecting a vertex to itself) and no multiple edges between the same pair of vertices.</p>
                                            <p>Example: A pentagon-shaped graph where each vertex connects to its neighbor.</p>
                                            <div className="SimpleGraph">
                                                <svg width="200" height="200">
                                                    <circle cx="100" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="170" cy="80" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="150" cy="160" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="50" cy="160" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="30" cy="80" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                                    <line x1="100" y1="50" x2="170" y2="80" stroke="#000" strokeWidth="2" />
                                                    <line x1="170" y1="80" x2="150" y2="160" stroke="#000" strokeWidth="2" />
                                                    <line x1="150" y1="160" x2="50" y2="160" stroke="#000" strokeWidth="2" />
                                                    <line x1="50" y1="160" x2="30" y2="80" stroke="#000" strokeWidth="2" />
                                                    <line x1="30" y1="80" x2="100" y2="50" stroke="#000" strokeWidth="2" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="GraphType">
                                            <h2>2. Directed Graph (Digraph)</h2>
                                            <p>Edges have a direction (arrows). Shows relationships like: A → B (one-way).</p>
                                            <p>Example: A follows B, but B may not follow A.</p>
                                            <div className="DirectedGraph">
                                                <svg width="200" height="200">
                                                    <circle cx="50" cy="100" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="150" cy="100" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                                    <line x1="60" y1="100" x2="140" y2="100" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)" />

                                                    <defs>
                                                        <marker id="arrowhead" markerWidth="10" markerHeight="7"
                                                            refX="9" refY="3.5" orient="auto">
                                                            <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
                                                        </marker>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="GraphType">
                                            <h2>3. Weighted Graph</h2>
                                            <p>Each edge has a weight/value associated with it. Represents cost, distance, or capacity.</p>
                                            <p>Example: Road map where edges are distances between cities.</p>
                                            <div className="WeightedGraph">
                                                <svg width="200" height="200">
                                                    <circle cx="50" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="150" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="100" cy="150" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                                    <line x1="50" y1="50" x2="150" y2="50" stroke="#000" strokeWidth="2" />
                                                    <line x1="50" y1="50" x2="100" y2="150" stroke="#000" strokeWidth="2" />
                                                    <line x1="150" y1="50" x2="100" y2="150" stroke="#000" strokeWidth="2" />

                                                    <text x="100" y="45" textAnchor="middle" fill="#000" fontSize="12">5</text>
                                                    <text x="70" y="105" textAnchor="middle" fill="#000" fontSize="12">3</text>
                                                    <text x="130" y="105" textAnchor="middle" fill="#000" fontSize="12">4</text>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="GraphType">
                                            <h2>4. Complete Graph</h2>
                                            <p>Every pair of vertices is connected by an edge.</p>
                                            <p>Example: 4 vertices fully connected → 6 edges.</p>
                                            <div className="CompleteGraph">
                                                <svg width="200" height="200">
                                                    <circle cx="50" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="150" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="150" cy="150" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                    <circle cx="50" cy="150" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                                    <line x1="50" y1="50" x2="150" y2="50" stroke="#000" strokeWidth="2" />
                                                    <line x1="150" y1="50" x2="150" y2="150" stroke="#000" strokeWidth="2" />
                                                    <line x1="150" y1="150" x2="50" y2="150" stroke="#000" strokeWidth="2" />
                                                    <line x1="50" y1="150" x2="50" y2="50" stroke="#000" strokeWidth="2" />
                                                    <line x1="50" y1="50" x2="150" y2="150" stroke="#000" strokeWidth="2" />
                                                    <line x1="50" y1="150" x2="150" y2="50" stroke="#000" strokeWidth="2" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="TypesOfGraphsPage">
                                        {/* <h1 className="pageHeading">Types of Graphs</h1> */}
                                        <div className="GraphsGrid">
                                            <div className="GraphType">
                                                <h2 className='GraphTypeH2'>1. Simple Graph</h2>
                                                <p className='GraphTypeH2'>A graph with no loops (edges connecting a vertex to itself) and no multiple edges between the same pair of vertices.</p>
                                                <p className='GraphTypeH2'>Example: A pentagon-shaped graph where each vertex connects to its neighbor.</p>
                                                <div className="SimpleGraph">
                                                    <svg width="200px" height="200px">
                                                        <circle className='simpleGraphSVG' cx="100" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='simpleGraphSVG' cx="170" cy="80" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='simpleGraphSVG' cx="150" cy="160" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='simpleGraphSVG' cx="50" cy="160" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='simpleGraphSVG' cx="30" cy="80" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                                        <line className='simpleGraphSVG' x1="100" y1="50" x2="170" y2="80" stroke="#000" strokeWidth="2" />
                                                        <line className='simpleGraphSVG' x1="170" y1="80" x2="150" y2="160" stroke="#000" strokeWidth="2" />
                                                        <line className='simpleGraphSVG' x1="150" y1="160" x2="50" y2="160" stroke="#000" strokeWidth="2" />
                                                        <line className='simpleGraphSVG' x1="50" y1="160" x2="30" y2="80" stroke="#000" strokeWidth="2" />
                                                        <line className='simpleGraphSVG' x1="30" y1="80" x2="100" y2="50" stroke="#000" strokeWidth="2" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="GraphType">
                                                <h2 className='GraphTypeH2'>2. Directed Graph (Digraph)</h2>
                                                <p className='GraphTypeH2'>Edges have a direction (arrows). Shows relationships like: A → B (one-way).</p>
                                                <p className='GraphTypeH2'>Example: A follows B, but B may not follow A.</p>
                                                <div className="DirectedGraph">
                                                    <svg width="200px" height="200px">
                                                        <circle className='directedGraphSVG' cx="50" cy="100" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='directedGraphSVG' cx="150" cy="100" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <line className='directedGraphSVG' x1="60" y1="100" x2="140" y2="100" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                                        <defs>
                                                            <marker className='directedGraphSVG' id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                                                <polygon className='directedGraphSVG' points="0 0, 10 3.5, 0 7" fill="#000" />
                                                            </marker>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="GraphType">
                                                <h2 className='GraphTypeH2'>3. Weighted Graph</h2>
                                                <p className='GraphTypeH2'>Each edge has a weight/value associated with it. Represents cost, distance, or capacity.</p>
                                                <p className='GraphTypeH2'>Example: Road map where edges are distances between cities.</p>
                                                <div className="WeightedGraph">
                                                    <svg width="200px" height="200px">
                                                        <circle className='WeightedGraphSVG' cx="50" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='WeightedGraphSVG' cx="150" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='WeightedGraphSVG' cx="100" cy="150" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                                        <line className='WeightedGraphSVG' x1="50" y1="50" x2="150" y2="50" stroke="#000" strokeWidth="2" />
                                                        <line className='WeightedGraphSVG' x1="50" y1="50" x2="100" y2="150" stroke="#000" strokeWidth="2" />
                                                        <line className='WeightedGraphSVG' x1="150" y1="50" x2="100" y2="150" stroke="#000" strokeWidth="2" />

                                                        <text className='WeightedGraphSVG' x="100" y="45" textAnchor="middle" fill="#000" fontSize="12">5</text>
                                                        <text className='WeightedGraphSVG' x="70" y="105" textAnchor="middle" fill="#000" fontSize="12">3</text>
                                                        <text className='WeightedGraphSVG' x="130" y="105" textAnchor="middle" fill="#000" fontSize="12">4</text>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="GraphType">
                                                <h2 className='GraphTypeH2'>4. Complete Graph</h2>
                                                <p className='GraphTypeH2'>Every pair of vertices is connected by an edge.</p>
                                                <p >Example: 4 vertices fully connected → 6 edges.</p>
                                                <div className="CompleteGraph">
                                                    <svg width="200px" height="200px">
                                                        <circle className='CompleteGraphSVG' cx="50" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='CompleteGraphSVG' cx="150" cy="50" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='CompleteGraphSVG' cx="150" cy="150" r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                                                        <circle className='CompleteGraphSVG' cx="50" cy="150" r="10" fill="#fff" stroke="#000" strokeWidth="2" />

                                                        <line className='CompleteGraphSVG' x1="50" y1="50" x2="150" y2="50" stroke="#000" strokeWidth="2" />
                                                        <line className='CompleteGraphSVG' x1="150" y1="50" x2="150" y2="150" stroke="#000" strokeWidth="2" />
                                                        <line className='CompleteGraphSVG' x1="150" y1="150" x2="50" y2="150" stroke="#000" strokeWidth="2" />
                                                        <line className='CompleteGraphSVG' x1="50" y1="150" x2="50" y2="50" stroke="#000" strokeWidth="2" />
                                                        <line className='CompleteGraphSVG' x1="50" y1="50" x2="150" y2="150" stroke="#000" strokeWidth="2" />
                                                        <line className='CompleteGraphSVG' x1="50" y1="150" x2="150" y2="50" stroke="#000" strokeWidth="2" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom" ><h1 className='h1bottom'>GraphTypes</h1></div>
                            </div>
                            {/* <div className="ExtraPage"></div> */}
                        </div>

                        <div className="FooterIntroductionGraphTheory">
                            <div className="TopFooterIntroduction">
                                <h1>Key Concepts</h1>
                            </div>
                            <div className="EndFooterIntroduction">
                                <ul>
                                    <li>Vertices and Edges</li>
                                    <li>Graph Types</li>
                                    <li>Applications</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Subtopics Tabs */}
                    <div className="SubtopicsTabs">
                        <button
                            className={`tab-button ${activeTab === 'introduction' ? 'active' : ''}`}
                            onClick={() => setActiveTab('introduction')}
                        >
                            Concepts
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'coloring' ? 'active' : ''}`}
                            onClick={() => setActiveTab('coloring')}
                        >
                            Graph Coloring
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'planar' ? 'active' : ''}`}
                            onClick={() => setActiveTab('planar')}
                        >
                            Planar Graphs
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'labeling' ? 'active' : ''}`}
                            onClick={() => setActiveTab('labeling')}
                        >
                            Graph Labeling
                        </button>
                    </div>

                    {/* Graph Coloring Section */}
                    {activeTab === 'coloring' && (
                        <div className="GraphColoring">
                            <div className="GraphColoringContainer">
                                <div className="TopGraphColoring">
                                    <h1>Graph Coloring</h1>
                                    <p>Vertex coloring with proper coloring rules</p>
                                    <div className="NodeCountInput">
                                        <label htmlFor="nodeCount">Number of Vertices:</label>
                                        <input
                                            id="nodeCount"
                                            type="number"
                                            min="2"
                                            max="10"
                                            value={nodeCount}
                                            onChange={(e) => {
                                                const count = parseInt(e.target.value) || 2;
                                                setNodeCount(count);
                                                generateGraph(count);
                                            }}
                                        />
                                    </div>
                                    <div className="ColorPicker">
                                        {colors.map(color => (
                                            <div
                                                key={color}
                                                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => setSelectedColor(color)}
                                            />
                                        ))}
                                    </div>
                                    {coloringErrors.size > 0 && (
                                        <p className="error-message">Conflict detected! Adjacent vertices have the same color.</p>
                                    )}
                                </div>

                                <div className="MiddleGraphColoring">
                                    <div className="LeftMiddleGraphColoring">
                                        <div className="InteractiveCanvas" ref={canvasRef}>
                                            <svg width="400" height="300">
                                                {graphEdges.map(edge => {
                                                    const sourceNode = graphNodes.find(n => n.id === edge.source);
                                                    const targetNode = graphNodes.find(n => n.id === edge.target);
                                                    return (
                                                        <line
                                                            key={edge.id}
                                                            x1={sourceNode.x}
                                                            y1={sourceNode.y}
                                                            x2={targetNode.x}
                                                            y2={targetNode.y}
                                                            stroke="#000"
                                                            strokeWidth="2"
                                                        />
                                                    );
                                                })}
                                                {graphNodes.map(node => (
                                                    <circle
                                                        key={node.id}
                                                        cx={node.x}
                                                        cy={node.y}
                                                        r="20"
                                                        fill={coloringErrors.has(node.id) ? '#ffcccc' : node.color}
                                                        stroke={coloringErrors.has(node.id) ? '#ff0000' : '#000'}
                                                        strokeWidth="2"
                                                        className="node"
                                                        onMouseDown={(e) => handleMouseDown(e, node.id)}
                                                        onClick={() => handleNodeClick(node.id)}
                                                    />
                                                ))}
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="RightMiddleGraphColoring">
                                        <h3>Coloring Rules</h3>
                                        <p>No two adjacent vertices can have the same color</p>
                                        <p>Chromatic number: minimum number of colors needed</p>
                                        <p>Current conflicts: {coloringErrors.size}</p>
                                    </div>
                                </div>

                                <div className="FooterGraphColoring">
                                    <div className="TopGraphColoringFooter">
                                        <h1>Coloring Applications</h1>
                                    </div>
                                    <div className="EndGraphColoring">
                                        <ul>
                                            <li>Map Coloring</li>
                                            <li>Scheduling</li>
                                            <li>Register Allocation</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Planar Graphs Section */}
                    {activeTab === 'planar' && (
                        <div className="PlanarGraphs">
                            <div className="PlanarGraphsContainer">
                                <div className="TopPlanarGraphs">
                                    <h1>Planar Graphs</h1>
                                    <p>Graphs that can be drawn without edge crossings</p>
                                    <div className="NodeCountInput">
                                        <label htmlFor="planarNodeCount">Number of Vertices:</label>
                                        <input
                                            id="planarNodeCount"
                                            type="number"
                                            min="2"
                                            max="10"
                                            value={nodeCount}
                                            onChange={(e) => {
                                                const count = parseInt(e.target.value) || 2;
                                                setNodeCount(count);
                                                generateGraph(count);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="MiddlePlanarGraphs">
                                    <div className="LeftMiddlePlanarGraphs">
                                        <div className="InteractiveCanvas" ref={canvasRef}>
                                            <svg width="400" height="300">
                                                {planarEdges.map(edge => {
                                                    const sourceNode = planarNodes.find(n => n.id === edge.source);
                                                    const targetNode = planarNodes.find(n => n.id === edge.target);
                                                    return (
                                                        <line
                                                            key={edge.id}
                                                            x1={sourceNode.x}
                                                            y1={sourceNode.y}
                                                            x2={targetNode.x}
                                                            y2={targetNode.y}
                                                            stroke={
                                                                crossingEdges.has(edge.id)
                                                                    ? '#ff0000'
                                                                    : '#000'
                                                            }
                                                            strokeWidth={
                                                                crossingEdges.has(edge.id)
                                                                    ? '3'
                                                                    : '2'
                                                            }
                                                            className={
                                                                crossingEdges.has(edge.id)
                                                                    ? 'crossing-edge'
                                                                    : ''
                                                            }
                                                        />
                                                    );
                                                })}
                                                {planarNodes.map(node => (
                                                    <circle
                                                        key={node.id}
                                                        cx={node.x}
                                                        cy={node.y}
                                                        r="20"
                                                        fill={node.color}
                                                        stroke="#000"
                                                        strokeWidth="2"
                                                        className="node"
                                                        onMouseDown={(e) => handleMouseDown(e, node.id)}
                                                        onClick={() => handleNodeClick(node.id)}
                                                    />
                                                ))}
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="RightMiddlePlanarGraphs">
                                        <h3>Planar Properties</h3>
                                        <p>Euler's Formula: V - E + F = 2</p>
                                        <p>Kuratowski's Theorem</p>
                                        <p>No edge crossings</p>

                                        <div className="PlanarControls">
                                            <button
                                                className="planar-btn"
                                                onClick={checkPlanarity}
                                            >
                                                Check Planarity
                                            </button>
                                            {planarResult && (
                                                <p className={`planar-result ${planarResult.includes('not') ? 'error' : 'success'}`}>
                                                    {planarResult}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="FooterPlanarGraphs">
                                    <div className="TopPlanarGraphsFooter">
                                        <h1>Planar Applications</h1>
                                    </div>
                                    <div className="EndPlanarGraphs">
                                        <ul>
                                            <li>Circuit Design</li>
                                            <li>Map Drawing</li>
                                            <li>Network Layout</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Graph Labeling Section */}
                    {activeTab === 'labeling' && (
                        <div className="GraphLabeling">
                            <div className="GraphLabelingContainer">
                                <div className="TopGraphLabeling">
                                    <h1>Graph Labeling</h1>
                                    <p>Assigning numbers/labels to vertices or edges</p>
                                    <div className="NodeCountInput">
                                        <label htmlFor="labelingNodeCount">Number of Vertices:</label>
                                        <input
                                            id="labelingNodeCount"
                                            type="number"
                                            min="2"
                                            max="10"
                                            value={nodeCount}
                                            onChange={(e) => {
                                                const count = parseInt(e.target.value) || 2;
                                                setNodeCount(count);
                                                generateGraph(count);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="MiddleGraphLabeling">
                                    <div className="LeftMiddleGraphLabeling">
                                        <div className="InteractiveCanvas" ref={canvasRef}>
                                            <svg width="400" height="300">
                                                {labelingEdges.map(edge => {
                                                    const sourceNode = labelingNodes.find(n => n.id === edge.source);
                                                    const targetNode = labelingNodes.find(n => n.id === edge.target);
                                                    return (
                                                        <g key={edge.id}>
                                                            <line
                                                                x1={sourceNode.x}
                                                                y1={sourceNode.y}
                                                                x2={targetNode.x}
                                                                y2={targetNode.y}
                                                                stroke="#000"
                                                                strokeWidth="2"
                                                            />
                                                            {/* Edge label positioned slightly offset from the center */}
                                                            <text
                                                                x={(sourceNode.x + targetNode.x) / 2 + 10}
                                                                y={(sourceNode.y + targetNode.y) / 2 - 10}
                                                                textAnchor="middle"
                                                                fill="#000"
                                                                fontSize="12"
                                                                fontWeight="bold"
                                                            >
                                                                {edge.label}
                                                            </text>
                                                        </g>
                                                    );
                                                })}
                                                {labelingNodes.map(node => (
                                                    <g key={node.id}>
                                                        <circle
                                                            cx={node.x}
                                                            cy={node.y}
                                                            r="20"
                                                            fill={node.color}
                                                            stroke="#000"
                                                            strokeWidth="2"
                                                            className="node"
                                                            onMouseDown={(e) => handleMouseDown(e, node.id)}
                                                            onClick={() => handleNodeClick(node.id)}
                                                        />
                                                        {/* Vertex label centered inside the circle */}
                                                        <text
                                                            x={node.x}
                                                            y={node.y}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                            fill="#000"
                                                            fontSize="12"
                                                            fontWeight="bold"
                                                        >
                                                            {node.label}
                                                        </text>
                                                    </g>
                                                ))}
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="RightMiddleGraphLabeling">
                                        <h3>Labeling Types</h3>
                                        <p>Vertex Labeling: v1, v2, ..., v<sub>n</sub></p>
                                        <p>Edge Labeling: e1, e2, ..., e<sub>m</sub></p>
                                        <p>Graceful Labeling</p>
                                    </div>
                                </div>

                                <div className="FooterGraphLabeling">
                                    <div className="TopGraphLabelingFooter">
                                        <h1>Labeling Applications</h1>
                                    </div>
                                    <div className="EndGraphLabeling">
                                        <ul>
                                            <li>Network Addressing</li>
                                            <li>Scheduling</li>
                                            <li>Resource Assignment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Real World Applications */}
                    <div className="RealWorldApplications">
                        <div className="RealWorldApplicationsContainer">
                            <div className="TopRealWorldApplications">
                                <h1>Real World Applications</h1>
                                <p>How Graph Theory applies to various fields</p>
                            </div>

                            <div className="MiddleRealWorldApplications">
                                <div className="LeftMiddleRealWorldApplications">
                                    <h1>Networking</h1>
                                    <p>Social media graphs, routing algorithms</p>
                                </div>
                                <div className="RightMiddleRealWorldApplications">
                                    <h1>Computer Science</h1>
                                    <p>Dependency graphs, memory allocation</p>
                                </div>
                            </div>

                            <div className="FooterRealWorldApplications">
                                <div className="TopRealWorldApplicationsFooter">
                                    <h1>Other Applications</h1>
                                </div>
                                <div className="EndRealWorldApplications">
                                    <ul>
                                        <li>Map Coloring</li>
                                        <li>Scheduling Tasks</li>
                                        <li>Resource Allocation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    );
};

const WrappedTopTransitions = TopTransitions(GraphTheory)
export default WrappedTopTransitions;