# Feed Reader Project with Testing
This is Feed Reader app that gets news feed from four different news sources.
## Installation
Installation is not required. Simply open the index.html with any browser to start using it.

## How it works
Simply click on the news sources on the sidebar to load the latest feeds from them. After the feeds are loaded, click on the articles that interest you and it'll take you to that article! It's that simple!

## Tests
The most essential features of the app are tested using the Jasmine BDD framework. What follows outline the main tests written for this app:

#### Testing that the feeds are good to go, which includes
* the feeds are well-defined
* the URLs are non-empty
* the names are non-empty

#### The sidebar is RWD and works properly, which includes
* the sidebar is hidden by default
* the sidebar shows up when you click on the hamburger icon

#### The entry column is not empty on load, which means
* there is at least a single article present

#### When you select a new feed, the entry column changes accordingly, which means
* when a new feed is loaded, the content actually changes


## License
Feed Reader Project with Testing is Copyright © from 2016 Calvin Ku. It is free software, and may be redistributed under the terms specified as below:

The MIT License (MIT)

Copyright (c) 2016 Calvin Ku

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
