import React, { useEffect, useRef, useState } from 'react';
// import './IsomorphismMapping.css';

const IsomorphismMapping = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const elementsG = ['0', '1', '2', '3'];
  const elementsH = ['1', 'i', '-1', '-i'];
  const mappingLabels = ['φ(0) = 1', 'φ(1) = i', 'φ(2) = -1', 'φ(3) = -i'];
  
  const circleRefsG = useRef([]);
  const circleRefsH = useRef([]);
  const arrowRefs = useRef([]);
  const labelRefs = useRef([]);

  useEffect(() => {
    // Animate circles appearing
    circleRefsG.current.forEach((ref, index) => {
      setTimeout(() => {
        if (ref) {
          ref.style.opacity = '1';
          ref.style.transform = 'scale(1)';
        }
      }, index * 200);
    });

    circleRefsH.current.forEach((ref, index) => {
      setTimeout(() => {
        if (ref) {
          ref.style.opacity = '1';
          ref.style.transform = 'scale(1)';
        }
      }, index * 200 + 100);
    });

    // Animate arrows appearing
    arrowRefs.current.forEach((ref, index) => {
      setTimeout(() => {
        if (ref) {
          ref.style.opacity = '1';
          ref.style.strokeDashoffset = '0';
        }
      }, 800 + index * 400);
    });

    // Animate labels appearing
    labelRefs.current.forEach((ref, index) => {
      setTimeout(() => {
        if (ref) {
          ref.style.opacity = '1';
        }
      }, 1000 + index * 400);
    });
  }, []);

  const getYPosition = (index) => 100 + index * 120;

  return (
    <div className="IsomorphismMapping">
      <div className="mb-8 text-center">
        <h1>Isomorphism Mapping</h1>
        <p>φ: ℤ₄ → {'{1, i, -1, -i}'}</p>
        <p>Groups with different elements but identical structure</p>
      </div>

      <div className="MappingContainer">
        <svg className="MappingSVG">
          {elementsG.map((_, index) => {
            const y = getYPosition(index);
            const isHighlighted = hoveredIndex === index;

            return (
              <g key={index}>
                <defs>
                  <marker
                    id={`arrowhead-${index}`}
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3, 0 6"
                      fill={isHighlighted ? '#f59e0b' : '#374151'}
                    />
                  </marker>
                </defs>
                <path
                  ref={el => arrowRefs.current[index] = el}
                  d={`M 220 ${y} L 500 ${y}`}
                  stroke={isHighlighted ? '#f59e0b' : '#374151'}
                  strokeWidth={isHighlighted ? '3' : '2'}
                  fill="none"
                  markerEnd={`url(#arrowhead-${index})`}
                  className="Arrow"
                />
                <text
                  ref={el => labelRefs.current[index] = el}
                  x="360"
                  y={y - 10}
                  className={`Label ${isHighlighted ? 'highlight' : ''}`}
                >
                  {mappingLabels[index]}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="GroupColumn left">
          <div>
            <h2>G = ℤ₄</h2>
            <p>Addition mod 4</p>
          </div>
          {elementsG.map((element, index) => (
            <div
              key={index}
              ref={el => circleRefsG.current[index] = el}
              className="Circle CircleG"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                border: hoveredIndex === index ? '4px solid #f59e0b' : '4px solid transparent'
              }}
            >
              {element}
            </div>
          ))}
        </div>

        <div className="GroupColumn right">
          <div>
            <h2>H = {'{1, i, -1, -i}'}</h2>
            <p>Complex multiplication</p>
          </div>
          {elementsH.map((element, index) => (
            <div
              key={index}
              ref={el => circleRefsH.current[index] = el}
              className="Circle CircleH"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                border: hoveredIndex === index ? '4px solid #f59e0b' : '4px solid transparent'
              }}
            >
              {element}
            </div>
          ))}
        </div>
      </div>

      <div className="InfoBox">
        <h3>What is an Isomorphism?</h3>
        <p><span className="mono">φ: G → H</span> preserves the group operation:</p>
        <p className="mono">φ(a + b) = φ(a) · φ(b)</p>
        <p style={{marginTop: '1rem'}}>These groups look different but have identical algebraic structure</p>
      </div>
    </div>
  );
};

export default IsomorphismMapping;
