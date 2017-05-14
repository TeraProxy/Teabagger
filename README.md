# Teabagger  
A tera-proxy module that lets you teabag people. Why bm?  
Activating the script changes your sit command (yes, the key works too) to a teabag.  
You can adjust the speed by changing the TEABAGGING_DELAY value on the top of "index.js".  
  
## Usage  
While in game, open a whisper chat session with "!Teabagger" by typing "/w !teabagger" in chat and hitting the space bar.
This serves as the script's command interface. 
The following commands are supported:  
  
* on - Enables the script  
* off - Disables the script  
* delay [x] - Changes delay between teabags to x in milliseconds, e.g. delay 100  
  
Any other input returns a summary of above commands in the game.  
  
Alternative commands in all other chats:  
* !tbag - Toggles between "on" and "off" state  
* !tbagdelay [x] - Changes delay between teabags to x in milliseconds, e.g. !tbagdelay 100  
  
## Safety
Whatever you send to "!Teabagger" in game is intercepted client-side. The chat is NOT sent to the server.