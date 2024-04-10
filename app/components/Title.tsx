'use client';
import { restartTest } from "../utils/utils";

export function Title () {
    return (
        <div className='max-w-xl mx-auto justify-center text-center'>
          <h1 className='title' onClick={() => restartTest()}>Human Visual Processing Test</h1>
          <div className='divider' />
        </div>
    );
}