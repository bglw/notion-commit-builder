export default (data) => {
    let commitData = [], author = '', authors = [];

    data = data.replace(/bigelowcc/g, "Liam Bigelow");
    data = data.split(`:<>:`);

    for (let section of data) {
        let authorData = section.match(/^author:(.+)/i);
        if (authorData) {
            author = authorData[1];
            continue;
        }
        
        section = section.match(/^([a-z]+\/)(.+)/i);
        if (!section) continue;

        let [,repo,commits] = section;

        commits = commits.split(`:{}:`).filter(c => c.length);
        for (let i = 0; i < commits.length; i++) {
            let commitinfo = commits[i].split(`:>`);
            commits[i] = {
                hash: commitinfo[0],
                author: commitinfo[1],
                date: commitinfo[2],
                relative_date: commitinfo[3],
                message: commitinfo[4]
            };
            if (authors.indexOf(commits[i].author) === -1) {
                authors.push(commits[i].author);
            }
        }
        commitData.push({
            repo,
            commits
        });
    }

    return {
        commitData,
        author,
        authors
    }
}