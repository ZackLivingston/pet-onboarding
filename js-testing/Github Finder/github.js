class GitHub {
    constructor() {
        this.client = '1349d7b609f68fa29fc7'
        this.secret = '6f35128799cd44da3edbfb1e2baf71c9ecf649d9'
    }

    async getUser(user) {
        const findUser = await fetch(`https://api.github.com/users/${user}?client_id=${this.client}&client_secret=${this.secret}`)
        const userProfile = await findUser.json()
        
        const getRepos = await fetch(`https://api.github.com/users/${user}/repos?per_page=5&sort=create: asc&client_id=${this.client}&client_secret=${this.secret}`)
        const userRepos = await getRepos.json()
        return {user: userProfile, repos: userRepos}
    }
}