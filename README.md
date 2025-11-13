# RBC Personal Banking: Data Extractor Firefox Extension

A simple way to deal with the lack of open banking from the [Royal Bank of Canada](https://www.rbcroyalbank.com/personal.html). This extension reads all of the tables (lists, actually) in your personal banking portal and saves it to a CSV. There is no data transmitted anywhere. 

## Usage

The data gets timestamped in the filename and downloaded to a specified location. This data can then be parsed into a wealth management system.

When logged in to [RBC Personal Banking](https://www.rbcroyalbank.com/personal.html), clicking the extension will open up a file saving prompt for a timestamped CSV.

## Installation

This is a very personal piece of code, no I haven't published it in any official channel.

### Installation as Experimental/Temporary Extension

- Download the repository.
- Load the extension by opening `about:debugging#/runtime/this-firefox` on Firefox.

### Installation as Permanent Extension

- Download the repository.
- Compress the files in a Zip archive.
- Load the extension by opening `about:addons` on Firefox and from the cog wheel options menu select `Install Add-on From File...`.


## Notes

This project is out of frustration and need for convenience rather that product design. We were actually told by RBC Enterprise teams to disable 2FA if we wanted any sort of RBC Express automation or Quickbooks integration. 

Use at your own risk.