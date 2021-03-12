<script>
	import { onMount } from 'svelte';
	import buildNotionBlocks from './bits/notion_templates/build';
	import processHashData from './bits/processData';

	let commitData = [];
	let author = '';
	let authors = [];
	let app = '';
	let apps = [];

	let failed = false;
	let copied = false;

	onMount(() => {
		let u = new URL(window.location);
		let data = decodeURIComponent(u.hash.substr(1)).replace(/\n/g, '');
		({ commitData, author, authors, apps } = processHashData(data));


		window.addEventListener('copy', (event) => {
			event.preventDefault();

			const blocks = buildNotionBlocks(commitData);
			if (!blocks) {
				copied = false;
				failed = true;
				return;
			}

			event.clipboardData.setData('text/plain', 'Sorry, this paste only works into Notion (for now)');
			event.clipboardData.setData('text/_notion-blocks-v2-production', blocks);
			console.log(blocks);

			failed = false;
			copied = true;
			commitData = [...commitData];
		});
	});

	const toggle = (commit) => {
		if (copied) return;
		commit.selected = !commit.selected;
		commitData = [...commitData];
	}

	$: {
		for (let cd of commitData) {
			cd.shown = false;
			for (let c of cd.commits) {
				if (c.selected) cd.shown = true;
				if (copied) continue;
				if (!author || c.author === author) cd.shown = true;
			}
		}
		apps = commitData.map(cd => cd.repo.replace(/\/$/, ''));
	}
</script>

<h1>Hi{author ? ` ${author}` : ''}!<br/>Here are recent commits.</h1>

{#if copied}
<hr>
<p><b>Nice!</b> That's been copied. Go paste it into your Notion ticket :)</p>
{:else if failed}
<hr>
<p>Sorry, you need to select some commits first. (click on them)</p>
{:else}
<p>Click to select the relevant commits, then Cmd + C to copy.</p>
{/if}

<hr>

{#if !copied}

<p>Author&nbsp;&nbsp;|&nbsp;&nbsp;
<button class:is-selected={!author} on:click={() => {author = false}}>All</button>
{#each authors as a}
	<button class:is-selected={author === a} on:click={() => {if (author === a) {author = false} else {author = a}; commitData = [...commitData];}}>{a}</button>
{/each}
</p>

<p>Apps&nbsp;&nbsp;|&nbsp;&nbsp;
<button class:is-selected={!app} on:click={() => {app = false}}>All</button>
{#each apps as a}
	<button class:is-selected={app === a} on:click={() => {if (app === a) {app = false} else {app = a}; commitData = [...commitData];}}>{a}</button>
{/each}
</p>

{/if}

<div class="c-app" class:is-copied={copied}>
{#each commitData as cd}
{#if cd.shown && (!app || app === cd.repo.replace(/\/$/, ''))}
{#if !copied}
	<h2>{cd.repo.replace(/\/$/, '')}</h2>
{/if}
	<ul class="c-app__commitlist">
	{#each cd.commits as c}
		<li class="c-app__commit" 
			class:is-selected={c.selected} 
			class:is-author={!author || c.author === author} 
			on:click={() => {toggle(c)}}>

			<span class="commitinfo">
			<kbd class="when">{c.relative_date}</kbd>
			<bold class="author">{c.author.split(' ')[0]}</bold>
			</span>
			<code>{c.message}</code>
		</li>
	{/each}
	</ul>
{/if}
{/each}
</div>

