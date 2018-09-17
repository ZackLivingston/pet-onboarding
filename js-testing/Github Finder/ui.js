class UI {
    constructor() {
        this.profileDisplay = document.getElementById('profile')
    }

    showUser(profile, repos) {
        this.clearUser()

        const name = document.createElement('h3')
        name.innerText = profile.login
        const avatar = document.createElement('img')
        avatar.setAttribute('src', profile.avatar_url)
        const bio = document.createElement('p')
        bio.innerText = profile.bio
        const repoCount = document.createElement('p')
        repoCount.innerText = `Public Repositories: ${profile.public_repos}`

        this.profileDisplay.appendChild(name)
        this.profileDisplay.appendChild(avatar)
        this.profileDisplay.appendChild(bio)
        this.profileDisplay.appendChild(repoCount)

        repos.forEach((repo) => {
            const repoDisplay = document.createElement('div')
            const repoTitle = document.createElement('h3')
            repoTitle.innerText = repo.name
            const repoLink = document.createElement('a')
            repoLink.setAttribute('href', repo.html_url)
            repoLink.setAttribute('target', '_blank')
            repoLink.innerText = 'Link'

            repoDisplay.appendChild(repoTitle)
            repoDisplay.appendChild(repoTitle)
            repoDisplay.appendChild(repoLink)

            this.profileDisplay.appendChild(repoDisplay)
        })
    }

    clearUser() {
        this.profileDisplay.innerHTML = ''
    }
}