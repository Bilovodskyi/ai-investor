import React, { useEffect, useState } from "react";

const TypingTextAnimation = ({
    text,
    typingSpeed = 15,
}: {
    text: string;
    typingSpeed?: number;
}) => {
    const [typedText, setTypedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (charIndex < text.length) {
            const typingTimeout = setTimeout(() => {
                setTypedText((prev) => prev + text.charAt(charIndex));
                setCharIndex((prev) => prev + 1);
            }, typingSpeed);

            return () => clearTimeout(typingTimeout);
        }
    }, [charIndex, text, typingSpeed]);

    return (
        <div className="mb-4">
            <h1>{typedText}</h1>
        </div>
    );
};

export default TypingTextAnimation;
