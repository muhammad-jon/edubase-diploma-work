export const captureException = (err, ...rest) => console.log(`ERROR: ${err?.message}`, ...rest);
