##### :heavy_exclamation_mark: Elin Gunner Patch Info :heavy_exclamation_mark:
This module should be working with the latest https://github.com/meishuu/tera-data.  
Please always keep your tera-data up-to-date.   

# Teabagger  
A tera-proxy module that lets you teabag people. Why bm?  
Activating the script changes your sit command (yes, the key works too) to a teabag.  
You can adjust the default speed by changing the TEABAGGING_DELAY value on the top of "index.js".  
  
## Usage  
While in game, open a proxy chat session by typing "/proxy" or "/8" in chat and hitting the space bar.  
This serves as the script's command interface.  
The following commands are supported:  
  
* tbag - enable/disable Teabagger  
* tbag [x] - change teabagging delay to x, e.g. "tbag 100"  
  
Any other input, starting with "tbag", will return a summary of above commands in the chat.  
  
## Safety
Whatever you send to the proxy chat in game is intercepted client-side. The chat is NOT sent to the server.  
  
## Changelog
### 1.2.0
* [*] Some code cleanup
* [*] Full conversion to Pinkie Pie's command module which is now a requirement
### 1.1.0
* [*] Improved teabagging algorithm
* [+] Added !tbagdelay option
### 1.0.0
* [*] Initial Release
