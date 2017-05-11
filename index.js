const TEABAGGING_DELAY = 100

module.exports = function teabagger(dispatch) {
	let cid = null,
		player = '',
		interval = null,
		sitting = false,
		enabled = false

	dispatch.hook('S_LOGIN', 1, event => {
		({cid} = event)
		player = event.name
		enabled = false
		sitting = false
		interval = null
	})

	function teabag() {
		if(sitting) {
			dispatch.toServer('C_SOCIAL', 1, { emote: 39, unk: 0 })
			sitting = false
		}
		else {
			dispatch.toServer('C_SOCIAL', 1, { emote: 38, unk: 0 })
			sitting = true
		}
	}
	
	dispatch.hook('C_SOCIAL', 1, event => { 
		if(!enabled) return
		if(event.emote == 38) {
			clearInterval(interval)
			interval = setInterval(teabag, TEABAGGING_DELAY)
		}
	})
	
	dispatch.hook('C_PLAYER_LOCATION', 1, () => { clearInterval(interval) })
	dispatch.hook('C_PRESS_SKILL', 1, () => { clearInterval(interval) })
	dispatch.hook('C_START_SKILL', 1, () => { clearInterval(interval) })
	dispatch.hook('S_LOAD_TOPO', 1, () => { clearInterval(interval) })
	dispatch.hook('S_RETURN_TO_LOBBY', 1, () => { clearInterval(interval) })
	
	// ################# //
	// ### Chat Hook ### //
	// ################# //
	
	dispatch.hook('C_WHISPER', 1, (event) => {
		if(event.target.toUpperCase() === "!teabagger".toUpperCase()) {
			if (/^<FONT>on?<\/FONT>$/i.test(event.message)) {
				enabled = true
				message('Teabagger <font color="#00EE00">enabled</font>.')
			}
			else if (/^<FONT>off?<\/FONT>$/i.test(event.message)) {
				enabled = false
				clearInterval(interval)
				message('Teabagger <font color="#DC143C">disabled</font>.')
			}
			else message('Commands: "on" (changes normal sit to teabagging),'
								+ ' "off" (change sit back to normal behavior)'
						)
			return false
		}
	})
	
	function message(msg) {
		dispatch.toClient('S_WHISPER', 1, {
			player: cid,
			unk1: 0,
			gm: 0,
			unk2: 0,
			author: '!Teabagger',
			recipient: player,
			message: msg
		})
	}
}
