<script>
	import { onMount } from 'svelte';
	import header from './bits/notion_templates/header';
	import callout from './bits/notion_templates/callout';
	import toggle from './bits/notion_templates/toggle';

	let commitData = [];

	onMount(() => {
		let u = new URL(window.location);
		let data = decodeURIComponent(u.hash.substr(1)).replace(/\n/g, '').split(`:<>:`);

		for (let section of data) {
			section = section.match(/^([a-z]+\/)(.+)/i)
			if (!section) continue;

			let [,repo,commits] = section;

			commits = commits.split(`:{}:`).filter(c => c.length);
			for (let i = 0; i < commits.length; i++) {
				commits[i] = commits[i].split(`:>`);
			}
			commitData.push({
				repo,
				commits
			});
		}

		commitData = [...commitData];

		window.addEventListener('copy', (event) => {
			const blocks = buildNotionBlocks();
			event.clipboardData.setData('text/plain', 'Sorry, this paste only works into Notion (for now)');
			event.clipboardData.setData('text/_notion-blocks-v2-production', blocks);
			console.log(blocks);
			event.preventDefault();
		});
	});

	const buildNotionBlocks = () => {
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

		blocks.push(toggle(`ℹ️  Relevant Commits`, callouts));

		return JSON.stringify(blocks);
	}
</script>

<div class="c-app">
{#each commitData as cd}
	<h2>{cd.repo.replace(/\/$/, '')}</h2>
	<ul class="c-app__commitlist">
	{#each cd.commits as c}
		<li class="c-app__commit" class:is-selected={c.selected} on:click={() => {
			c.selected = !c.selected;
			cd.commits = [...cd.commits]
			commitData = [...commitData];
		}}>
			<span class="commitinfo">
			<kbd class="when">{c[3]}</kbd>
			<bold class="author">{c[1].split(' ')[0]}</bold>
			</span>
			<code>{c[4]}</code>
		</li>
	{/each}
	</ul>
{/each}
</div>

