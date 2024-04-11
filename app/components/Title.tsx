'use client';
import { restartTest } from "../utils/utils";
import InfoModal from "./InfoModal";

export function Title() {
    return (
        <div className='max-w-xl mx-auto justify-center text-center'>
            <span className="inline-flex">
                <h1 className='title' onClick={() => restartTest()}>Human Visual Processing Test</h1>
                <InfoModal />
            </span>
                <div className='divider' />
        </div>
    );
}