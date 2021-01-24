import fs from 'fs';
import path from 'path';
import youtubedl from 'youtube-dl';
import Config from '../../config/output';

class Downloader {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  async exec(): Promise<void> {
    const video = youtubedl(this.url, ['--format=18'], {
      cwd: Config.outputPath,
    });
    video.on('info', function (info) {
      console.log('DOWNLOADING....');
      console.log('ARQUIVO ', info._filename);
      console.log('TAMANHO', info.size);
    });

    video.pipe(
      fs.createWriteStream(
        path.resolve(Config.outputPath, Config.outputFileName),
      ),
    );
  }
}

export default Downloader;
