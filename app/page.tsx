'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { restartTest } from './utils/utils';
import InstructionsModal from './components/InstructionsModal';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Home = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [images, setImages] = useState<{ id: number; url: string, contains_animal: boolean }[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState(2);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [tabulatedResults, setTabulatedResults] = useState<{ imageId: number; userChoice: boolean | null; reactionTime: number }[]>([]);
  const [keysPressed, setKeysPressed] = useState({ a: false, l: false });
  const [showImage, setShowImage] = useState(false);
  const [isDemoQuestion, setIsDemoQuestion] = useState(true);
  const [showKeys, setShowKeys] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const showInstructionsModal = () => {
    setIsInstructionsModalOpen(true);
  };

  const closeInstructionsModal = () => {
    setIsInstructionsModalOpen(false);
  };



  const startTest = () => {
    setTestStarted(true);
    setCurrentImageIndex(0);
  };

  // Fetch user ID
  useEffect(() => {
    const fetchData = async () => {
      let { data: user } = await supabase.auth.getUser();
      if (user.user) {
        setUserId(user.user?.id ?? null);
      } else {
        let { data, error } = await supabase.auth.signInAnonymously();
        setUserId(data?.user?.id ?? null);
      }
    };
    fetchData();
  }, [userId]);

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      const { data: images, error } = await supabase
        .from('images')
        .select('id, url, contains_animal');

      if (error) {
        console.error('Error fetching images:', error);
      } else {
        const imageSet = selectTwentyRandomImages(images)
        setImages(imageSet);
        setTabulatedResults(imageSet.map((image) => ({ imageId: image.id, userChoice: null, reactionTime: 0 })));
      }
    };

    fetchImages();
  }, []);

  function selectTwentyRandomImages(images: { id: number; url: string; contains_animal: boolean }[]) {
    const shuffledImages = images.sort(() => 0.5 - Math.random());
    return shuffledImages.slice(0, 20);
  }
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleResponse = useCallback(async (response: boolean) => {
    if (!testStarted || testEnded) return;


    if (!isDemoQuestion && !countdownRunning) {
      const reactionTime = performance.now() - startTime;
      setUserChoice(response);
      
      tabulatedResults[currentImageIndex] = {
        imageId: images[currentImageIndex].id,
        userChoice: response,
        reactionTime,
      };

      await supabase.from('results').insert({
        user_id: userId,
        image_id: images[currentImageIndex].id,
        response,
        reaction_time: reactionTime.toFixed(0),
      });

      startCountdownAndImage();
      setCountdown(2);
      setCurrentImageIndex((prev) => prev + 1);
    }

    if (isDemoQuestion && response) {
      setIsDemoQuestion(false);
      setCurrentImageIndex(0);
      setCountdownRunning(true)
      startCountdownAndImage();
    }

  }, [testStarted, testEnded, startTime, userId, images, currentImageIndex, isDemoQuestion]);


  // Function to start countdown and image display
  const startCountdownAndImage = useCallback(() => {
    setCountdownRunning(true); // Set to true at the start
    
    const startTime = performance.now();
    setCountdown(2);
    const countdownInterval = setInterval(() => {
      const elapsedTime = performance.now() - startTime;
      const remainingCountdown = 2 - Math.floor(elapsedTime / 1000);
      setCountdown(remainingCountdown);

      if (remainingCountdown <= 0) {
        clearInterval(countdownInterval);
        setShowImage(true);
        setTimeout(() => {
          setShowImage(false);
          setShowKeys(true);
          setStartTime(performance.now()); // Start measuring reaction time
          setCountdownRunning(false); // Set to false after image display
        }, 20); // Show image for 20ms
      }
    }, 100); // Update countdown every 10ms for smoother experience
  }, []);


  useEffect(() => {
    if (!testStarted || testEnded) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        setKeysPressed((prev) => ({ ...prev, a: true }));
        handleResponse(true);
      } else if (event.code === 'KeyL' || event.code === 'ArrowRight') {
        setKeysPressed((prev) => ({ ...prev, l: true }));
        handleResponse(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [testStarted, testEnded, handleResponse]);


  // Introduction screen
  if (!testStarted) {
    return (
      <>
        <div className='text-slate-300 text-sm font-normal md:hidden border-orange-400 border p-4 rounded-lg bg-slate-300/15'>
          <b>📱 Looks like you may be on a phone or mobile device. </b>
          It is recommended that you complete this test on a computer with a keyboard in a focused environment in order to see the images and record your responses correctly.
        </div>
        <div className='max-w-xl mx-auto justify-center p-3 '>
          <h4 className='text-slate-300 text-lg  font-normal '>In each question, you will very briefly be shown an image. <br /><br />
            <b>If the image contains an animal</b>, press the left arrow
            <span className='keyboard-key m-1.5'>←</span>
            on your keyboard. If the image does not contain an animal, press the
            <span className='keyboard-key m-1.5'>→</span>
            right arrow.<br /><br />
            Each image will be displayed for <b>only 20 milliseconds</b> (a fiftieth of a second), so please keep your eyes on the screen.
          </h4>
        </div>
        <div className='flex justify-center text-center mt-10 '>
          <button className='button' onClick={startTest}>Continue</button>
        </div>
      </>
    );
  }

  // Results screen
  if (testStarted && currentImageIndex >= images.length) {
    if (!testEnded) {
      setTestEnded(true);
    }
    const numCorrect = tabulatedResults.filter((result) => result.userChoice === images.filter((image) => image.id === result.imageId)[0].contains_animal).length;
    return (
      <div className='max-w-xl mx-auto justify-center text-center mt-2'>
        <h2 className='text-sky-600 text-5xl md:text-6xl  '>{numCorrect} / {tabulatedResults.length}</h2>
        <h3 className='text-slate-400 text-lg sm:text-xl md:text-2xl font-normal'>You correctly identified {numCorrect} out of {tabulatedResults.length} images.</h3>
        {testEnded && tabulatedResults.length > 0 && (
          <div className='flex justify-center text-center mt-4 results-table'>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Image ID</th>
                  <th>Your Answer</th>
                  <th>Reaction Time (ms)</th>
                  <th>Correct?</th>
                </tr>
              </thead>
              <tbody>
                {tabulatedResults.map((result) => (
                  <tr key={result.imageId}>
                    <td>
                      <a href={images.filter((image) => image.id === result.imageId)[0].url} target="_blank" rel="noopener noreferrer">
                        <Image src={images.filter((image) => image.id === result.imageId)[0].url} alt="Test Image" width={75} height={75} />
                      </a>
                    </td>
                    <td>{result.imageId}</td>
                    <td>{result.userChoice ? 'YES' : 'NO'}</td>
                    <td>{result.reactionTime.toLocaleString( undefined, { maximumFractionDigits: 0 })}</td>
                    <td>{result.userChoice === images.filter((image) => image.id === result.imageId)[0].contains_animal ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='mt-8 text-center'>
          <button className='button' onClick={restartTest}>Restart Test</button>
        </div>
        <div className='mt-8 text-center'>
          <h5 className='text-slate-300 text-base font-normal'>Thank you. See something wrong, like a misclassified image? Email me at <a href="mailto:simon@simonmarcus.org">simon@simonmarcus.org</a> with your feedback.</h5>
        </div>
      </div>
    );
  }


  return (
    <div className='max-w-xl mx-auto justify-center text-center'>
      {isDemoQuestion ? ( // DEMO QUESTION SCREEN
        <div className='mx-auto mt-4 h-80 w-full relative'>
          <h2 className='text-gray-500 animate-fade delay-500'>Demo Question</h2>
          <div className='w-full max-w-xl'>
            <Image src={images[currentImageIndex].url} alt="Test Image" layout='fill' objectFit='cover' className='opacity-0' />
            <Image src="https://qqvhixaarirsmydgqoqq.supabase.co/storage/v1/object/public/images/babka.jpg" priority alt="Demo Image" width={400} height={400} objectFit='cover' className='mx-auto animate-fade' />
            <h4 className='m-2 text-slate-200'>Does this image contain an animal?</h4>
            <div className=' max-w-[400px] justify-between flex mx-auto'>
              <span className='keyboard-key animate-bounce animation-delay-[2000ms]' onClick={() => handleResponse(true)}>← YES</span>
              <span className='keyboard-key'>NO →</span>
            </div>
          </div>
          <h4 className='mt-4 text-slate-400'>Press the left arrow on your keyboard to begin.</h4>
        </div>
      ) : (
        <div className='mx-auto mt-4 h-80 w-full relative'>
          <h3 className='text-gray-600 text-lg'>Image {currentImageIndex + 1} of {images.length}</h3>
          {
            /* Hidden image in order to preload the next image */
            currentImageIndex + 1 < images.length && <Image src={images[currentImageIndex + 1].url} alt="Test Image" layout='fill' objectFit='cover' className='opacity-0' />
          }
          {
            /* Hidden image in order to preload the next image */
            currentImageIndex + 2 < images.length && <Image src={images[currentImageIndex + 2].url} alt="Test Image" layout='fill' objectFit='cover' className='opacity-0' />
          }
          {countdown > 0 ? (
            <div className='w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500'>
              {countdown}
            </div>
          ) : (
            <>
              {showImage ? (
                <Image src={images[currentImageIndex].url} alt="Test Image" layout='fill' objectFit='cover' onLoad={handleImageLoad} />
              ) : (
                <>
                  <div className='w-full h-full bg-transparent'></div>
                  {showKeys && (
                    <div className='max-w-[400px] justify-between flex mx-auto'>
                      <span className='darker-keyboard-key animate-fade' onClick={() => handleResponse(true)}>← YES</span>
                      <span className='text-slate-600 mt-2 hover:text-slate-400 transition-all' onClick={() => showInstructionsModal()}>INSTRUCTIONS</span>
                      <span className='darker-keyboard-key animate-fade' onClick={() => handleResponse(false)}>NO →</span>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
      {isInstructionsModalOpen && <InstructionsModal isOpen={isInstructionsModalOpen} onRequestClose={closeInstructionsModal} />}
    </div>

  );
};
export default Home;