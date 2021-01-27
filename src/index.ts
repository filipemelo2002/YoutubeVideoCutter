import Downloader from './modules/Download';
(async () => {
  const downloader = new Downloader(
    'https://www.youtube.com/watch?v=CICIOJqEb5c',
  );
  await downloader.exec();
})();
