// Version 1.2.3

'use strict'

const Command = require('command'),
	GameState = require('tera-game-state')

module.exports = function teabagger(dispatch) {
	const command = Command(dispatch),
		game = GameState(dispatch)

	let interval = null,
		sitting = false,
		enabled = false,
		teabagging = false,
		TEABAGGING_DELAY = 60	// Teabagging delay in ms

	// ############# //
	// ### Hooks ### //
	// ############# //

	game.on('enter_loading_screen', () => {
		stop()
		sitting = teabagging = false
	})

	dispatch.hook('C_SOCIAL', 1, event => { 
		clearInterval(interval)
		if(enabled && event.emote == 38 && !teabagging) teabag()
	})

	dispatch.hook('C_PLAYER_LOCATION', 'raw', stop)
	dispatch.hook('C_PRESS_SKILL', 'raw', stop)
	dispatch.hook('C_START_SKILL', 'raw', stop)

	// ################# //
	// ### Functions ### //
	// ################# //

	function teabag() {
		if(!enabled) return
		teabagging = true
		interval = setInterval(() => {
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

	function stop() {
		clearInterval(interval)
		teabagging = false
	}

	// ################ //
	// ### Commands ### //
	// ################ //

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