import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import Config from '../../config/output';
import ora from 'ora';
import { stringHHMMSSToDateObject } from '../utils/stringToHHMMSS';
class Cutter {
  path: string;
  filename: string;
  constructor() {
    this.path = Config.outputPath;
    this.filename = Config.outputFileName;
  }

  async exec({ start = '00:00:00', interval, end }: ExecProps): Promise<void> {
    const spinner = ora('Processing Video...').start();
    spinner.prefixText = '[CUTTING MODULE]';
    ffmpeg.setFfmpegPath(ffmpegPath.path);
    let count = 1;
    const startDateObj = stringHHMMSSToDateObject(start);
    const endDateObj = stringHHMMSSToDateObject(end);

    const recursiveCutting = async () => {
      spinner.start('Processing PART ' + count);
      if (
        startDateObj.getTime() <
        endDateObj.getTime() - (endDateObj.getSeconds() - Number(interval))
      ) {
        const auxNewIntervalDurtationDiff =
          (endDateObj.getTime() - startDateObj.getTime()) / 1000;
        const auxInterval =
          auxNewIntervalDurtationDiff < interval
            ? auxNewIntervalDurtationDiff
            : interval;
        await new Promise((resolve, reject) => {
          ffmpeg(path.resolve(this.path, this.filename))
            .setStartTime(startDateObj.toString().substr(16, 8))
            .setDuration(String(auxInterval))
            .output(
              path.resolve(
                this.path,
                `${this.filename.split('.')[0]}-PART${count}.${
                  this.filename.split('.')[1]
                }`,
              ),
            )
            .on('end', resolve)
            .on('error', error => {
              console.log('ERROR', error);
              reject(error);
            })
            .run();
        });
        spinner.stopAndPersist();
        console.log(
          `\nPart ${count}`,
          `${this.filename.split('.')[0]}-PART${count}.${
            this.filename.split('.')[1]
          }`,
          startDateObj.toString().substr(16, 8),
          `${auxInterval}s`,
        );
        startDateObj.setSeconds(startDateObj.getSeconds() + Number(interval));
        count++;
        recursiveCutting();
      }
    };
    recursiveCutting();
  }
}

export default Cutter;
