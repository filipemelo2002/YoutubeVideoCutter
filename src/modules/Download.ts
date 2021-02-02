import fs from 'fs';
import path from 'path';
import youtubedl from 'youtube-dl';
import Config from '../../config/output';
import ora from 'ora';
import { decodedTextSpanIntersectsWith } from 'typescript';

class Downloader {
  url: string;
  filename: string;
  path: string;
  constructor(url: string) {
    this.url = url;
    this.filename = '';
    this.path = path.resolve(Config.outputPath, Config.outputFileName);
  }

  async exec(): Promise<youtubedl.Info> {
    const spinner = ora('Creating output folder...').start();
    spinner.prefixText = '[DOWNLOAD MODULE]';
    await fs.promises.mkdir(Config.outputPath, { recursive: true });
    spinner.stopAndPersist();
    spinner.start("Getting video's information");
    spinner.text = "Getting video's information";
    const videoInfo = await new Promise<youtubedl.Info>(resolve =>
      youtubedl.getInfo(this.url, (erro, info) => resolve(info)),
    );
    spinner.stopAndPersist();
    console.log(`\n${'title:'.padEnd(15, ' ')}${videoInfo.title}`);
    console.log(
      `${'duration:'.padEnd(15, ' ')}${videoInfo.duration}, ${
        videoInfo._duration_hms
      }`,
    );
    console.log(`${'link:'.padEnd(15, ' ')}${videoInfo.webpage_url}`);
    console.log(`${'thumbnail:'.padEnd(15, ' ')}${videoInfo.thumbnail}`);
    console.log(`${'uploader:'.padEnd(15, ' ')}${videoInfo.uploader}\n`);
    const video = youtubedl(this.url, ['--format=18'], {
      cwd: Config.outputPath,
    });
    spinner.stopAndPersist();
    spinner.start('Downloading video...');
    await new Promise<youtubedl.Info>(resolve => {
      video.on('info', info => {
        resolve(info);
      });
    });
    spinner.stopAndPersist();
    spinner.start('Saving video into folder...');
    video.pipe(fs.createWriteStream(this.path));
    spinner.stopAndPersist();
    return videoInfo;
  }
}

export default Downloader;
