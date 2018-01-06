import { getVersion } from './get-version';

// export { getVersion } from './get-version';

async function main() {
  let info = await getVersion('node');
  console.log('node=', info);
  let info2 = await getVersion('openssl');
  console.log('openssl=', info2);
  let info3 = await getVersion('sass');
  console.log('sass=', info3);
}

main();
