import fs from 'fs';
import path from 'path';
import youtubedl from 'youtube-dl';
import Config from '../../config/output';
import ora from 'ora';

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
    const spinner = ora('Creating output folder').start();
    await fs.promises.mkdir(Config.outputPath, { recursive: true });
    spinner.text = "Getting video's information";
    const videoInfo = await new Promise<youtubedl.Info>(resolve =>
      youtubedl.getInfo(this.url, (erro, info) => resolve(info)),
    );
    spinner.stop();
    console.log(`${'title:'.padEnd(15, ' ')}${videoInfo.title}`);
    console.log(
      `${'duration:'.padEnd(15, ' ')}${videoInfo.duration}, ${
        videoInfo._duration_hms
      }`,
    );
    console.log(`${'link:'.padEnd(15, ' ')}${videoInfo.webpage_url}`);
    console.log(`${'thumbnail:'.padEnd(15, ' ')}${videoInfo.thumbnail}`);
    console.log(`${'uploader:'.padEnd(15, ' ')}${videoInfo.uploader}`);
    const video = youtubedl(this.url, ['--format=18'], {
      cwd: Config.outputPath,
    });
    spinner.start();
    spinner.text = 'Downloading video';
    await new Promise<youtubedl.Info>(resolve => {
      video.on('info', info => {
        resolve(info);
      });
    });
    spinner.text = 'Saving video into folder';
    video.pipe(fs.createWriteStream(this.path));
    spinner.stop();
    return videoInfo;
  }
}

export default Downloader;
