// Version 1.2.5

'use strict'

module.exports = function teabagger(mod) {

	let interval = null,
		sitting = false,
		enabled = false,
		teabagging = false,
		TEABAGGING_DELAY = 60	// Teabagging delay in ms

	// ############# //
	// ### Hooks ### //
	// ############# //

	mod.game.on('enter_loading_screen', () => {
		stop()
		sitting = teabagging = false
	})

	mod.hook('C_SOCIAL', 1, event => { 
		clearInterval(interval)
		if(enabled && event.emote == 38 && !teabagging) teabag()
	})

	mod.hook('C_PLAYER_LOCATION', 'raw', stop)
	mod.hook('C_PRESS_SKILL', 'raw', stop)
	mod.hook('C_START_SKILL', 'raw', stop)

	// ################# //
	// ### Functions ### //
	// ################# //

	function teabag() {
		if(!enabled) return
		teabagging = true
		interval = setInterval(() => {
			if(sitting) {
				mod.toServer('C_SOCIAL', 1, { emote: 39, unk: 0 })
				sitting = false
			}
			else {
				mod.toServer('C_SOCIAL', 1, { emote: 38, unk: 0 })
				sitting = true
			}
		}, TEABAGGING_DELAY)
	}

	function stop() {
		clearInterval(interval)
		teabagging = false
	}

	// ################ //
	// ### Commands ### //
	// ################ //

	mod.command.add('tbag', (param) => {
		if(param == null) {
			enabled = !enabled
			mod.command.message((enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Teabagger] ' + (enabled ? 'enabled' : 'disabled'))
		}
		else if(param != null) {
			TEABAGGING_DELAY = Number(param)
			mod.command.message('delay set to <font color="#F0E442">' + TEABAGGING_DELAY + '</font>.')
		}
		else mod.command.message('Commands:\n'
								+ ' "tbag" (enable/disable Teabagger),\n'
								+ ' "tbag [x]" (change teabagging delay to x, e.g. "tbag 100")'
		)
	})
}