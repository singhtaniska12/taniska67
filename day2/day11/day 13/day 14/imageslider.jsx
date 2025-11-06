import React, { useState } from "react";

/**
 * ImageSlider
 * - Previous / Next navigation (wraps around)
 * - Rotate button (rotates current image 90° clockwise each click)
 *
 * Usage: place this file at src/imageslider.jsx and import <ImageSlider /> in your app.
 */

const images = [
    // Replace these URLs with local imports or your own images if needed
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80",
];

export default function ImageSlider() {
    const [index, setIndex] = useState(0);
    // store rotation angle per image so rotating one image doesn't affect others
    const [rotations, setRotations] = useState(images.map(() => 0));

    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setIndex((i) => (i + 1) % images.length);

    const rotate = () =>
        setRotations((prev) => {
            const copy = [...prev];
            copy[index] = (copy[index] + 90) % 360;
            return copy;
        });

    const resetRotation = () =>
        setRotations((prev) => {
            const copy = [...prev];
            copy[index] = 0;
            return copy;
        });

    return (
        <div
            style={{
                maxWidth: 800,
                margin: "24px auto",
                textAlign: "center",
                fontFamily: "sans-serif",
            }}
        >
            <div
                style={{
                    position: "relative",
                    height: 480,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f3f3f3",
                    borderRadius: 8,
                    overflow: "hidden",
                }}
            >
                <img
                    src={images[index]}
                    alt={`slide-${index}`}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        transition: "transform 300ms ease",
                        transform: `rotate(${rotations[index]}deg)`,
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
                <button onClick={prev} aria-label="Previous" style={buttonStyle}>
                    ◀ Previous
                </button>

                <button onClick={rotate} aria-label="Rotate" style={buttonStyle}>
                    ↻ Rotate
                </button>

                <button onClick={resetRotation} aria-label="Reset rotation" style={buttonStyle}>
                    Reset
                </button>

                <button onClick={next} aria-label="Next" style={buttonStyle}>
                    Next ▶
                </button>
            </div>

            <div style={{ marginTop: 10, color: "#555" }}>
                <span>
                    {index + 1} / {images.length}
                </span>
            </div>
        </div>
    );
}

const buttonStyle = {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: 14,
};