module.exports = function Teabagger(dispatch) {
	let cid = null,
		player = '',
		interval = null,
		sitting = false,
		enabled = false,
		teabagging = false,
		TEABAGGING_DELAY = 30	// Teabagging speed

	dispatch.hook('S_LOGIN', 1, event => {
		({cid} = event)
		player = event.name
		enabled = false
		sitting = false
		teabagging = false
		interval = null
	})

	function teabag() {
		if(!enabled) return
		teabagging = true
		interval = setInterval(function() {
			if(sitting) {
			dispatch.toServer('C_SOCIAL', 1, { emote: 39, unk: 0 })
			sitting = false
			}
			else {
				dispatch.toServer('C_SOCIAL', 1, { emote: 38, unk: 0 })
				sitting = true
			}
		}, TEABAGGING_DELAY)
	}
	
	dispatch.hook('C_SOCIAL', 1, event => { 
		clearInterval(interval)
		if(enabled && event.emote == 38 && !teabagging) teabag()
	})
	
	dispatch.hook('C_PLAYER_LOCATION', 1, () => { clearInterval(interval); teabagging = false })
	dispatch.hook('C_PRESS_SKILL', 1, () => { clearInterval(interval); teabagging = false })
	dispatch.hook('C_START_SKILL', 1, () => { clearInterval(interval); teabagging = false })
	dispatch.hook('S_LOAD_TOPO', 1, () => { clearInterval(interval); teabagging = false })
	dispatch.hook('S_RETURN_TO_LOBBY', 1, () => { clearInterval(interval); teabagging = false })
	
	// ################# //
	// ### Chat Hook ### //
	// ################# //
	
	dispatch.hook('C_WHISPER', 1, (event) => {
		let cmd = null
		if(event.target.toUpperCase() === "!teabagger".toUpperCase()) {
			if (/^<FONT>on?<\/FONT>$/i.test(event.message)) {
				enabled = true
				message('Teabagger <font color="#56B4E9">enabled</font>.')
			}
			else if (/^<FONT>off?<\/FONT>$/i.test(event.message)) {
				enabled = false
				clearInterval(interval)
				message('Teabagger <font color="#E69F00">disabled</font>.')
			}
			else if (cmd = /^<FONT>delay (.+?)<\/FONT>$/i.exec(event.message)) {
				TEABAGGING_DELAY = Number(cmd[1])
				message('Teabagger delay set to <font color="#F0E442">' + TEABAGGING_DELAY + '</font>.')
			}
			else message('Commands:<br>'
								+ ' "on" (changes normal sit to teabagging),<br>'
								+ ' "off" (change sit back to normal behavior),<br>'
								+ ' "delay [x]" (change teabagging delay to x, e.g. delay 100)'
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
	
	dispatch.hook('C_CHAT', 1, event => {
		let cmd = null
		if(/^<FONT>!tbag<\/FONT>$/i.test(event.message)) {
			if(!enabled) {
				enabled = true
				message('Teabagger <font color="#56B4E9">enabled</font>.')
				console.log('Teabagger enabled.')
			}
			else {
				enabled = false
				message('Teabagger <font color="#E69F00">disabled</font>.')
				console.log('Teabagger disabled.')
			}
			return false
		}
		else if (cmd = /^<FONT>!tbagdelay (.+?)<\/FONT>$/i.exec(event.message)) {
			TEABAGGING_DELAY = Number(cmd[1])
			message('Teabagger delay set to <font color="#F0E442">' + TEABAGGING_DELAY + '</font>.')
			return false
		}
	})
}
