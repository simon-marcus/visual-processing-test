'use client';

import { useState } from "react";
import InstructionsModal from "./InstructionsModal";

export function InstructionsButton() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showInstructionsModal = () => {
        setIsModalOpen(true);
    };

    const closeInstructionsModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <a onClick={showInstructionsModal}>
                &nbsp;Instructions
            </a>
            {isModalOpen && <InstructionsModal isOpen={isModalOpen} onRequestClose={closeInstructionsModal} />}
        </>
    );
}