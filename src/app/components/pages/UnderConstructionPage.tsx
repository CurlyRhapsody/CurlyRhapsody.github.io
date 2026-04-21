"use client"

import Image from "next/image";
import { useState } from "react";
import UnderConstruction from "../../assets/images/UnderConstruction.png"

const UnderConstructionPage = () => {
    const [isAccordionHovered, setIsAccordionHovered] = useState<boolean>(false);
    const [isAccordionOpened, setIsAccordionOpened] = useState<boolean>(false);

    const buttonStyle: React.CSSProperties = {
        backgroundColor: isAccordionHovered ? "rgb(176, 176, 176)" : "rgb(212, 212, 212)",
        transition: "500ms",
        animationTimingFunction: "linear",
        padding: "1rem",
        borderRadius: "0.375rem",
        width: "100%",
        cursor: "pointer",
        fontSize: "1rem"
    }

    const accordionStyle: React.CSSProperties = {
        transition: "all 0.5s ease",
        overflow: "hidden",
        ...(isAccordionOpened ? {
            opacity: 1,
            marginTop: 0,
            maxHeight: "200rem",
        } : {
            opacity: 0,
            marginTop: "-0.5rem",
            maxHeight: 0,
        })
    }

    function togglePrompt() {
        setIsAccordionOpened(!isAccordionOpened);
    }

    return (
        <div className="flex flex-col items-center gap-[0.5rem] py-[2rem] font-sans bg-[#add8e6] h-[max(100%, 100dvh)]">
            <div className="text-3xl font-semibold">Under Construction</div>
            <div><b>curlyrhapsody.github.io</b> is under re-construction right now.</div>
            <div>New version is expected to be constructed under Next.js, stay tuned!</div>
            <div className="flex flex-col items-center p-[0.5rem] gap-[0.5rem] mt-2rem w-1/2">
                <div className="flex flex-col bg-white p-[1rem] rounded-2xl w-[calc(100% - 2rem)] gap-[0.5rem]">
                    <div
                        style={buttonStyle}
                        onMouseEnter={() => setIsAccordionHovered(true)}
                        onMouseLeave={() => setIsAccordionHovered(false)}
                        onClick={() => togglePrompt()}
                    >
                        In case you wonder the prompt
                    </div>
                    <div style={accordionStyle}>
                        A 1920x1080 comical art style image with no captions or other supportive texts.<br />
                        <br />
                        A coder is wearing construction helmet and typing code into his computer.<br />
                        His computer has two screens, one showing a VS Code IDE, full of codes written in React Next.JS, and another screen shows the preview of his website. The website is mainly constructed using Material UI components.<br />
                        For the hardware the coder is using, he is using Aula F75 in Thunder Black color scheme as keyboard, and a Logitech MX Master 3S as mouse.<br />
                        <br />
                        On the wall behind the computer, there is a blueprint showing a website. On his desk, there is a cup of coffee, a Rubik's cube, and a figure of Rowlet from Pokemon.<br />
                        <br />
                        Please make sure the posture of the coder is correct. He should be facing the screens.<br />
                    </div>
                </div>
                <Image src={UnderConstruction.src} alt="RIP" width={1920} height={1080} style={{ width: "100%" }} />
                <div className="text-center">※ Displayed image is purely imagination and does not reflect acutal website construction scene.</div>
            </div>
            <div className="italic text-gray-600">This page is now reconstructed under Next.js and is just a placeholder. Code is expected to be bad.</div>
        </div>
    );
}

export default UnderConstructionPage