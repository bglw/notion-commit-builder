import header from './header';
import callout from './callout';
import toggle from './toggle';
    
export default (commitData) => {
    let blocks = [];
    blocks.push(header(`Supporting Information for Testing`));

    let callouts = [];
    for (let data of commitData) {
        let bucket = {
            repo: data.repo,
            commits: []
        }
        for (let c of data.commits) {
            if (c.selected) {
                bucket.commits.push(c);
            }
        }
        if (bucket.commits.length) {
            callouts.push(callout(bucket, callouts.length));
        }
    }

    if (!callouts.length) {
        return false;
    }

    blocks.push(toggle(`ℹ️  Relevant Commits`, callouts));

    return JSON.stringify(blocks);
}