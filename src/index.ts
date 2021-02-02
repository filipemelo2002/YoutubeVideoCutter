import Downloader from './modules/Download';
import Cutter from './modules/Cutter';
(async () => {
  const downloader = new Downloader('');
  const videoInfo = await downloader.exec();
  const cutter = new Cutter();
  await cutter.exec({
    start: '00:00:00',
    interval: 60,
    end: videoInfo._duration_hms,
  });
})();
