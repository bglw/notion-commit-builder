export default (commitData) => {
    let output = ``;

    for (let data of commitData) {
        let commits = [];
        for (let c of data.commits) {
            if (c.selected) {
                console.log(c.date);
                commits.push(formatCommit(c, data.repo.replace(/\/$/, '')));
            }
        }
        if (commits.length) {
            output = `${output}

---

${commits.join(`\n\n---\n\n`)}


`
        }
    }

    return `# Relevant Commits

${output}

---`;
}

const formatCommit = (commit, repo) => {
    return `**${repo} →** *${commit.author} committed [${commit.hash.substr(0, 7)}](https://us-west-1.console.aws.amazon.com/codesuite/codecommit/repositories/${repo}/commit/${commit.hash}) on ${new Date(commit.date).toDateString()}*
    
\`${commit.message}\``
}