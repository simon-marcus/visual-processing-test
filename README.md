# Human Visual Processing Test
#### Simon Marcus, April 2024

This project is a web-based version of a simple test of human visual processing, similar to that initially presented in _Nature_ by [Simon Thorpe, Denis Fize & Catherine Marlot](https://rdcu.be/dD6z4) (1996). The test participant is shown an image only extremely briefly (in the original study, it was 20 milliseconds) and asked if the image contains an animal. Remarkably, in the original study, the average particicipant was able to classify 19 out of 20 images correctly, with each response taking about half a second.

This strongly evidenced some of the computational power and conceptual dexterity of the human brain—features which are essential to the ability for humans to navigate the world, and which strongly inform our approaches to building AI. But while large language models (like GPT, Llama, Claude etc.) have revolutionized the field and AI agents can deliver fluent prose, code, and other linguistic outputs, it is believed that this is limited to some extent by the relatively low "bandwidth" of linguistic data, i.e., the ability to parse written text.

By contrast, the ability to parse visual data in a three-dimensional space—say, retrieving a fallen object, packing a bag—is something that human toddlers can do with almost no guidance. Yet owing to the collossal quantum of data delivered through the visual cortex (the high bandwidth), even seemingly simple tasks like object recognition remain computationally expensive and conceptually challenging for artificial intelligence systems.

This test helps to quantify the impressive speed and accuracy of the human central processing system:
>Despite the very high demands made on the visual system by such a task (the subjects had no apriori information about the type of animal to look for, its position or size, or even the number of animals present), performance was remarkably good. The average proportion of correct responses was 94%, with one of the fifteen subjects achieving 98% correct responses... This remarkable level of performance was possible despite the very brief presentations, which effectively rule out the use of eye movements during image processing [...and] each stimulus was only ever seen once, thus eliminating the possibility of stimulus-specific learning effects.

This kind of test has significance for our development of machine learning, specifcally in the field of computer vision through one shot learning.

I am presently working on a more detailed analysis of the "world model" that underpins human cognition and its implications for artificial intelligence. If you have any questions or comments, please reach out: simon@simonmarcus.org

<hr>

## Technical notes

- This is a [Next.js](https://nextjs.org/) project using the App Router, bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- It is deployed on Vercel.
- It uses [Supabase](https://supabase.com) as a postgres database and for the object storage of images. 
- Users are created anonymously using Supabase auth with local cookies, and only an anonymous UUID is stored
- The images are all color photographs with dimensions 600w x 400h in medium quality JPEG format. A custom [ffmpeg bash script is included](https://github.com/simon-marcus/visual-processing-test/blob/main/app/utils/image_processing.sh) to resize and crop any images in a folder.

### Running locally
After cloning this repo, run the development server:
```bash
npm run dev
```

The application is available at [http://localhost:3000](http://localhost:3000)

## Improvements and limitations
- As a web application, this has the benefit of being widely available across many different kinds of devices, thus enabling the collection of many more responses than in a formally controlled academic or scientific setting, where the lab conditions and hardware are highly specific. But this does come with certain technical tradeoffs that are worth considering:
  - The application currently uses JavaScript's `[setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)` API for (1) displaying the image for a predetermined period, e.g., 20 milliseconds, and (2) measuring how long it takes the user to respond. However, as [many](https://johnresig.com/blog/accuracy-of-javascript-time/) [have](https://stackoverflow.com/questions/21097421/what-is-the-reason-javascript-settimeout-is-so-inaccurate) [noted](https://stackoverflow.com/questions/51916637/settimeout-timing-precision), `setTimeout` is not perfectly accurate or consistent for timing at the millisecond level, owing to a variety of issues, including managing asynchronous operations, multithreading, and other idiosyncrasies of the specific browser and OS.
  - The exact degree of 'flex' or the margin of error this introduces may be acceptable, but I think it is worth investigating switching to the newer High precision timing [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/High_precision_timing): using [`Performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) vs. [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) should considerably improve the accuracy of these measures.
  


