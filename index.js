
module.exports = function teabagger(dispatch) {
	
	let emoteNumber = 38 // sit
	const RETRY_TIME = 800 // time to spam emote at in milliseconds
	
	let interval = null

	function doEmote() {
		dispatch.toServer('C_SOCIAL', 1, { emote: emoteNumber, unk: 0 })
	}
	
	dispatch.hook('C_WHISPER', 1, (event) => {
		if (/^<FONT>!teabag?<\/FONT>$/i.test(event.message)) {
			
			emoteNumber = 38
			interval = setInterval(doEmote, RETRY_TIME)

			return false
		}
	})
	
	dispatch.hook('C_PLAYER_LOCATION', 1, () => { clearInterval(interval); emoteNumber = 0; doEmote()  })
	dispatch.hook('C_PRESS_SKILL', 1, () => { clearInterval(interval); emoteNumber = 0; doEmote() })
	dispatch.hook('C_SOCIAL', 1, () => { clearInterval(interval); emoteNumber = 0; doEmote() })
	dispatch.hook('C_START_SKILL', 1, () => { clearInterval(interval); emoteNumber = 0; doEmote() })
	dispatch.hook('S_LOAD_TOPO', 1, () => { clearInterval(interval); emoteNumber = 0; doEmote() })
	dispatch.hook('S_RETURN_TO_LOBBY', 1, () => { clearInterval(interval); emoteNumber = 0; doEmote() })
}
