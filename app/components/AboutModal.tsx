import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        border: 'none',
        boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.2)',
        height: '80vh',
        maxHeight: '80vh',
        width: '90vw',
        zIndex: 20, // Add a higher z-index value for the modal
    },
};

// Modal.setAppElement('#__next');

const AboutModal = ({ isOpen, onRequestClose }: { isOpen: boolean, onRequestClose: () => void }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="About this project"
        >
            <div className="space-y-3 p-4 md:px-16 md:py-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-slate-800">Human Visual Processing Test</h2>
                    <p className="text-sm font-normal text-right text-slate-600">Simon Marcus, April 2024</p>
                </div>
                <div className="overflow-y-auto max-h-[60vh] px-0 py-2 space-y-2">
                    <p className="text-sm md:text-base text-slate-700">
                        This project is a web-based version of a simple test of human visual processing, similar to that initially presented in <i>Nature</i> by <a rel="noopener" target="_blank" href="https://rdcu.be/dD6z4">Simon Thorpe, Denis Fize & Catherine Marlot (1996)</a>. The test participant is shown an image only extremely briefly (in the original study, it was 20 milliseconds) and asked if the image contains an animal. Remarkably, in the original study, the average particicipant was able to classify 19 out of 20 images correctly, with each response taking about half a second.
                        <br /><br />
                        This strongly evidenced some of the computational power and conceptual dexterity of the human brain—features which are essential to the ability for humans to navigate the world, and which strongly inform our approaches to building AI. But while large language models (like GPT, Llama, Claude etc.) have revolutionized the field and AI agents can deliver fluent prose, code, and other linguistic outputs, it is believed that this is limited to some extent by the relatively low &quot;bandwidth&quot; of linguistic data, i.e., the ability to parse written text.
                        <br /><br />
                        By contrast, the ability to parse <i>visual</i> data in a three-dimensional space—say, retrieving a fallen object, packing a bag—is something that human toddlers can do with almost no guidance. Yet owing to the collossal quantum of data delivered through the visual cortex (the high bandwidth), even seemingly simple tasks like object recognition remain computationally expensive and conceptually challenging for artificial intelligence systems.
                        <br /><br />
                        This test helps to quantify the impressive speed and accuracy of the human central processing system:
                        <br />
                        <figure className="quote">
                            <blockquote>
                                Despite the very high demands made on the visual system by such a task (the subjects had no apriori information about the type of animal to look for, its position or size, or even the number of animals present), performance was remarkably good. The average proportion of correct responses was 94%, with one of the fifteen subjects achieving 98% correct responses... This remarkable level of performance was possible despite the very brief presentations, which effectively rule out the use of eye movements during image processing [...and] each stimulus was only ever seen once, thus eliminating the possibility of stimulus-specific learning effects.
                            </blockquote>
                        </figure>
                        This kind of test has significance for our development of machine learning, specifically in the field of computer vision through <a className="hover:text-sky-500 text-sky-800 transition-all delay-100" href="https://en.wikipedia.org/wiki/One-shot_learning_(computer_vision)">one shot</a> learning. 

                        <br /><br />
                        <b>Thank you.</b> My code for this project can be found <a className="hover:text-sky-500 text-sky-800 transition-all delay-100" href="https://github.com/simon-marcus/visual-processing-test" target="_blank" rel="noopener">at GitHub</a>. I am presently working on a more detailed analysis of the &quot;world model&quot; that underpins human cognition and its implications for artificial intelligence. If you have any questions or comments, please reach out: <a className="hover:text-sky-500 text-sky-800 transition-all delay-100" href="mailto:simon@simonmarcus.org">simon@simonmarcus.org</a>
                    </p>


                </div>
                <button
                    onClick={onRequestClose}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                    Close
                </button>
            </div>
        </Modal>

    );
};

export default AboutModal;
