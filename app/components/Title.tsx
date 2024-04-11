'use client';
import { restartTest } from "../utils/utils";
import AboutModal from "./AboutModal";
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';


export function Title() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showAboutModal = () => {
        setIsModalOpen(true);
    };

    const closeAboutModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='max-w-4xl mx-auto justify-center text-center mt-2'>
            <span className="inline-flex">
                <h1 className='title text-xl md:text-2xl lg:text-3xl align-middle mt-1 ' onClick={() => restartTest()}>Human Visual Processing Test</h1>
                <button
                    onClick={showAboutModal}
                    className="text-sky-500 hover:text-sky-300 focus:outline-none inline transition-all duration-300"
                >
                    <QuestionMarkCircledIcon className='m-1.5 inline scale-125 md:scale-[1.5] md:m-3 lg:scale-[2] lg:m-4 align-middle' />
                </button>
            </span>
            <div className='divider' />
            {isModalOpen && <AboutModal isOpen={isModalOpen} onRequestClose={closeAboutModal} />}
        </div>
    );
}