// Initialize
const github = new GitHub()
const ui = new UI()

// set up variables
const search = document.getElementById('search')
const profile = document.getElementById('profile')

search.addEventListener('keyup', (event) => {
    if (search.value !== '') {
        github.getUser(event.target.value)
        .then(data => {
            if (data.user.message === 'Not Found') {
                console.log('user not found')
            } else {
                console.log(data)
                ui.showUser(data.user, data.repos)
            }
        })
    } else {
        ui.clearUser()
    }
})




// functions