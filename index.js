$(document).ready(function (){




});

function displayError(){
	document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again."

}

function searchRepositories(){		

	$.ajax({
			url: `https:\/\/api.github.com/search/repositories?q=${document.getElementById("searchTerms").value}`, 
			method: 'GET',
			success: function(repos) {
				console.log(repos)
				const githubDataLIs = repos.items.map(repo => `<li>${repo.name}, ${repo.description}, ${repo.html_url}, ${repo.owner.login}, ${repo.owner.html_url}, ${repo.avatar_url}, <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></li>`).join('')
				let template = 
				`<ul>
				${githubDataLIs}
				</ul>
				`

				document.getElementById("results").innerHTML = template

			},
			error: displayError()
		})
}



function showCommits(el){		
	let repo = el.dataset.repository
	let owner = el.dataset.owner 

	$.ajax({
			url: "https://api.github.com/repos/" + owner + "/" + repo +"/commits", 
			method: 'GET',
			success: function(commits) {
				console.log(commits)
				const commitLIs = commits.map(commit => `<li>${commit.sha}, ${commit.author.login}, ${commit.commit.author.name}, ${commit.author.avatar_url}</li>`).join('')
				let template = 
				`<ul>
				${commitLIs}
				</ul>
				`

				document.getElementById("details").innerHTML = template

			},
			error: displayError()
		})

	
}

