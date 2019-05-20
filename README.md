# OmniSci Tweetmap v2


**Note** that the above script will install several libraries as `git submodules` in `./lib`. This requires that you have configured an [SSH connection with Github](https://help.github.com/articles/testing-your-ssh-connection/), so that `git clone` may use `ssh` and not `https`.


This is MapD's Tweetmap demo. Use it as an example for building custom visualizations with our open source libraries:
* [MapD Charting](https://github.com/mapd/mapd-charting)
* [MapD CrossFilter](https://github.com/mapd/mapd-crossfilter)
* [MapD Connector](https://github.com/mapd/mapd-connector)

![Tweetmap](https://user-images.githubusercontent.com/4845281/28989306-42d34c62-7929-11e7-8bf4-e342687d73fe.png)
# Quickstart
### Requirements
* nvm
* npm 3.8.6+
* node v5.12.0+
```
nvm use
npm install
npm start
```
# Testing
```
npm run lint
npm run test
```
# Contributing
Interested in contributing? We'd love for you to help! Check out [Contributing.MD](.github/CONTRIBUTING.md)
