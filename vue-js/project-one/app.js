new Vue({
    el: '#game',
    data: {
        playing: false,
        playerHealth: 100,
        enemyHealth: 100,
        specialCooldown: 0,
        healCooldown: 0,
        log: ['test', 'test2']
    },
    methods: {
        play: function() {
            this.playerHealth = 100
            this.enemyHealth = 100
            this.specialCooldown = 0
            this.healCooldown = 0
            this.playing = true
            this.log = []
        },
        playerTurn: function(action) {
            if (action === 'attack') {
                var amount = this.attack('player')
            } else if (action === 'special') {
                var amount = this.special('player')
            } else if (action === 'heal') {
                var amount = this.heal('player')
            } else { // quit
                this.quit()
            }

            if (this.specialCooldown > 0) {
                this.specialCooldown--
            }
            if (this.healCooldown > 0) {
                this.healCooldown--
            }
            this.enemyTurn({action: action, amount: amount})
        },
        enemyTurn: function(playerTurn) {
            const decision = Math.random()
            if (decision < 0.65) {
                var amount = this.attack('enemy')
                var action = 'attack'
            } else if (decision < 0.85) {
                var amount = this.heal('enemy')
                var action = 'heal'
            } else {
                var amount = this.special('enemy')
                var action = 'special'
            }
            this.createLog(playerTurn, {action: action, amount: amount})
        },
        hurt: function(user, amount) {
            if (user === 'player') {
                if ((this.enemyHealth - amount) < 0) {
                    this.enemyHealth = 0
                } else {
                    this.enemyHealth -= amount
                }
            } else {
                if ((this.playerHealth - amount) < 0) {
                    this.playerHealth = 0
                } else {
                    this.playerHealth -= amount
                }   
            }
        },
        attack: function(user) {
            const damage = Math.floor(Math.random() * 6) + 8
            this.hurt(user, damage)
            return damage
        },
        special: function(user) {
            const damage = Math.floor(Math.random() * 15) + 20
            this.hurt(user, damage)
            if (user === 'player') {
                this.specialCooldown = 5
            }
            return damage
        },
        heal: function(user) {
            const healing = Math.floor(Math.random() * 15) + 15
            if (user === 'player') {
                if ((this.playerHealth + healing) > 100) {
                    this.playerHealth = 100
                } else {
                    this.playerHealth += healing
                }
                this.healCooldown = 4
            } else {
                if ((this.enemyHealth + healing) > 100) {
                    this.enemyHealth = 100
                } else {
                    this.enemyHealth += healing
                }
            }
            return healing
        },
        quit: function() {
            this.playerHealth = 100
            this.enemyHealth = 100
            this.specialCooldown = 0
            this.healCooldown = 0
            this.playing = false
            this.log = []
        },
        createLog: function(playerTurn, enemyTurn) {
            const turnLog = {player: '', enemy: ''}
            if (playerTurn.action === 'attack' || playerTurn.action === 'heal') {
                turnLog.player = `You ${playerTurn.action}ed for ${playerTurn.amount}.`
            } else {
                turnLog.player = `You used a special attack for ${playerTurn.amount}.`
            }

            if (enemyTurn.action === 'attack' || enemyTurn.action === 'heal') {
                turnLog.enemy = `The enemy ${enemyTurn.action}ed for ${enemyTurn.amount}.`
            } else {
                turnLog.enemy = `The enemy used a special attack for ${enemyTurn.amount}.`
            }
            this.log.push(turnLog)
        }
    },
    computed: {
        playerVictory: function() {
            if (this.enemyHealth === 0) {
                this.quit()
                return true
            }
            else {
                return false
            }
        },
        enemyVictory: function() {
            if (this.playerHealth === 0 && !playerVictory) {
                this.quit()
                return true
            }
            else {
                return false
            }
        },
        playerHealthBar: function() {
            if (this.playerHealth > 30) {
                var bgc = 'green'
            } else {
                var bgc = 'red'
            }
            return {
                backgroundColor: bgc,
                width: `${this.playerHealth}%`
            }
        },
        enemyHealthBar: function() {
            if (this.enemyHealth > 30) {
                var bgc = 'green'
            } else {
                var bgc = 'red'
            }
            return {
                backgroundColor: bgc,
                width: `${this.enemyHealth}%`
            }
        },
        displayedLog: function() {
            return this.log.reverse()
        }
    }
})