# SpaceInvaderDetection Application

**Table of Content**

- [Introduction](#introduction)
- [How it works](#how-it-works)
- [Install dependencies](#install-dependencies)
- [Run the application](#run-the-application)

## Introduction

The application is focusing on detecting all ‘o’ characters within invader radar image witch is divided into sub-images witch size will equal the size of the invader witch will be considered as matching character. Matching must satisfied default or specified value.
Each ‘o’ character coming from radar sub-image segment will be will be checked if it is a match, noise, or junk.

All the ‘o’ characters of sub-image that do not match the invader image characters will be treated as Noise or Junk. If invader image character ‘o’ has neighbor on positions (top, top-left, top-right, left, right, bottom, bottom-left, bottom-right) on the radar sub-image it will be treated as Noise. Other ‘o’ characters coming from radar sub-image that does not have positive matching with invaders image ‘o’ characters will be treated as Junk.

## How it works

The application is based on matching percentage of input arguments witch need to match minimum required percentage of image within radar image segment. The minimum value of 80% match will be set by default if input argument is not specified. Paths to invaders and radar image are located in “files” directory. Once loaded program will generate each image to matrix object and will start detection process with default 80% match if not specified differently. The application will return each matching result containing following informations: Position of the invader on radar image, Invader matrix size, noise, junk.

## Install dependencies

You need to heve Node.js installed on your machine.
If you do not have it installed here is a link to download it https://nodejs.org/en/.

Nodemon has to be installed globaly:
`npm install -g nodemon`

After that go to the application folder and run:
`npm install`

## Run the application

You can run the application with next command:
`npm start --match={number of percentage}`