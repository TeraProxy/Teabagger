##### :heavy_exclamation_mark: Status :heavy_exclamation_mark:
Should work on all regions as long as the opcodes are mapped. Thanks to EME's recent unjustified DMCA actions against developers, opcodes for NA are no longer mapped.

##### :heavy_exclamation_mark: Installation for Caali's tera-proxy :heavy_exclamation_mark:
1) Download Teabagger: https://github.com/TeraProxy/Teabagger/archive/master.zip
2) Extract the contents of the zip file into "\tera-proxy\bin\node_modules\"
3) Done! (the module will auto-update when a new version is released)

If you enjoy my work and wish to support future development, feel free to drop me a small donation: [![Donate](https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=A3KBZUCSEQ5RJ&lc=US&item_name=TeraProxy&curency_code=USD&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)

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
<details>

### 1.2.4
* [~] Code changes due to Caali's recent tera-proxy updates
* [-] Removed support for Pinkie Pie's tera-proxy
### 1.2.3
* [*] Fixed a weird case-sensitivity issue
### 1.2.2
* [+] Rewrote code to use Caali's "tera-game-state" module in order to reduce overhead
* [+] Now supports auto-updating via Caali's tera-proxy
### 1.2.1
* [*] Updated hook versions for compatibility with the latest tera-proxy
### 1.2.0
* [*] Some code cleanup
* [*] Full conversion to Pinkie Pie's command module which is now a requirement
### 1.1.0
* [*] Improved teabagging algorithm
* [+] Added !tbagdelay option
### 1.0.0
* [~] Initial Release

</details>