### Youtube Video Cutter :computer:
![](https://img.shields.io/github/v/release/filipemelo2002/YoutubeVideoCutter)
![](https://img.shields.io/codeclimate/issues/filipemelo2002/YoutubeVideoCutter)
![](https://img.shields.io/github/forks/filipemelo2002/YoutubeVideoCutter?style=social)
![](https://img.shields.io/github/stars/filipemelo2002/YoutubeVideoCutter?style=social)
#### About this project :eyes:
I've developed this project in order to practive a bit more about [Typescript](https://classic.yarnpkg.com/en/docs/install/) into [NodeJS](https://nodejs.org/en/) projects, also, to improve my skills concerning scalable applications' architecture.

#### Getting started

```bash
  git clone https://github.com/filipemelo2002/YoutubeVideoCutter.git
  cd YoutubeVideoCutter
```
From here, you can either use [NPM](https://www.npmjs.com/get-npm) or [Yarn](https://classic.yarnpkg.com/en/docs/install/) to install the dependencies.
```bash
npm install
yarn install
```
#### How to use
Inside `src/index.ts`, you can see that there is an instance of the [Download Module](https://github.com/filipemelo2002/YoutubeVideoCutter/blob/9ebffbf4249cfd451c29f8ec95a1df7ab872f356/src/index.ts#L4); It recieves as an argument into the [constructor](https://github.com/filipemelo2002/YoutubeVideoCutter/blob/9ebffbf4249cfd451c29f8ec95a1df7ab872f356/src/modules/Download.ts#L12) an String, which has to be the Youtube video URL.
```JavaScript
...
 const downloader = new Downloader('URL_COMES_HERE');
...
```
After that, you can see an instance of the [Cutter Module](https://github.com/filipemelo2002/YoutubeVideoCutter/blob/9ebffbf4249cfd451c29f8ec95a1df7ab872f356/src/index.ts#L6), which by calling the method `.exec`, you can pass the start timeStamp into `HH:MM:SS` format as String, the interval which the videos will be cut into, and lastly, the duration of the video (or here you want it to consider to be end of the video):

```JavaScript
 await cutter.exec({
    start: '00:00:00',
    interval: 60,
    end: videoInfo._duration_hms,
  });
```
There is also a config file called [output.ts](https://github.com/filipemelo2002/YoutubeVideoCutter/blob/master/config/output.ts) which you can use to configure the path and the filename that the video will be saved into.

#### Final Considerations
I am not responsible for any misuse of this application. It was made only with educational purpose.
Feel free to open Pull Requests.
