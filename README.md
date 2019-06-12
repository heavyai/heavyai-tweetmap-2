# OmniSci Tweetmap V2


**Note** that the above script will install several libraries as `git submodules` in `./lib`. This requires that you have configured an [SSH connection with Github](https://help.github.com/articles/testing-your-ssh-connection/), so that `git clone` may use `ssh` and not `https`.


This is OmniSci's Tweetmap demo. Use it as an example for building custom visualizations with our open source libraries:
* [MapD Charting](https://github.com/mapd/mapd-charting)
* [MapD CrossFilter](https://github.com/mapd/mapd-crossfilter)
* [MapD Connector](https://github.com/mapd/mapd-connector)

![Tweetmap](https://user-images.githubusercontent.com/14284310/59374439-d9d7ad00-8d19-11e9-8240-dea1ab418fda.png)
# Quickstart
### Requirements
* nvm
* npm 3.8.6+
* node v8.0.0+
```
nvm use
npm install
cp src/servers.conf.example.json src/servers.conf.json
npm start
```
*Windows users: replace the above `cp` command with `copy`*

# Testing
```
npm run lint
npm run test
```
# Contributing
Interested in contributing? We'd love for you to help! Check out [Contributing.MD](.github/CONTRIBUTING.md)
