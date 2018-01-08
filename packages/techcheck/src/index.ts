(async function() {
  await new Promise((res, rej) => {
    setTimeout(() => {
      process.stdout.write('Checking some other things');
    }, 2000);
  });
})();
