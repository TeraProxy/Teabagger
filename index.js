const Command = require('command')

module.exports = function Teabagger(dispatch) {
	let interval = null,
		sitting = false,
		enabled = false,
		teabagging = false,
		TEABAGGING_DELAY = 80	// Teabagging delay in ms

	dispatch.hook('S_LOGIN', 2, event => {
		sitting = false
		teabagging = false
		interval = null
	})
	
	dispatch.hook('C_SOCIAL', 1, event => { 
		clearInterval(interval)
		if(enabled && event.emote == 38 && !teabagging) teabag()
	})
	
	dispatch.hook('C_PLAYER_LOCATION', 1, () => { clearInterval(interval); teabagging = false })
	dispatch.hook('C_PRESS_SKILL', 1, () => { clearInterval(interval); teabagging = false })
	dispatch.hook('C_START_SKILL', 1, () => { clearInterval(interval); teabagging = false })
	dispatch.hook('S_LOAD_TOPO', 1, () => { clearInterval(interval); teabagging = false })
	dispatch.hook('S_RETURN_TO_LOBBY', 1, () => { clearInterval(interval); teabagging = false })
	
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
	
	// ################# //
	// ### Chat Hook ### //
	// ################# //
	
	const command = Command(dispatch)
	command.add('tbag', (param) => {
		if(param == null) {
			enabled = !enabled
			command.message('[Teabagger] ' + (enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Teabagger] ' + (enabled ? 'enabled' : 'disabled'))
		}
		else if(param != null) {
			TEABAGGING_DELAY = Number(param)
			command.message('[Teabagger] delay set to <font color="#F0E442">' + TEABAGGING_DELAY + '</font>.')
		}
		else command.message('Commands:<br>'
								+ ' "tbag" (enable/disable Teabagger),<br>'
								+ ' "tbag [x]" (change teabagging delay to x, e.g. "tbag 100")'
			)
	})
}
