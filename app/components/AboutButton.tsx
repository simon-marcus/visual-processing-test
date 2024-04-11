'use client';

import { useState } from "react";
import AboutModal from "./AboutModal";


export function AboutButton() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showAboutModal = () => {
        setIsModalOpen(true);
    };

    const closeAboutModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <a onClick={showAboutModal}>
                &nbsp;About
            </a>
            {isModalOpen && <AboutModal isOpen={isModalOpen} onRequestClose={closeAboutModal} />}
        </>
    );
}