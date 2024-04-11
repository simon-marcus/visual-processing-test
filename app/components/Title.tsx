'use client';
import { restartTest } from "../utils/utils";
import InfoModal from "./InfoModal";

export function Title() {
    return (
        <div className='max-w-4xl mx-auto justify-center text-center'>
            <span className="inline-flex">
                <h1 className='title text-xl sm:text-3xl md:text-4xl lg:text-5xl align-middle mt-1 ' onClick={() => restartTest()}>Human Visual Processing Test</h1>
                <InfoModal />
            </span>
                <div className='divider' />
        </div>
    );
}