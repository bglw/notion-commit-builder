import * as svelteSlabs from "svelte-slabs-renderer";

import * as stores from './includes/helpers/store.js';

/**
 * Convert a component path (like in bookshop) to a component name.
 * Removes duplicate file/folder name, stops at components folder or dotpath.
 * @param  {String} filepath Raw filepath that was imported
 * @return {String}          Component name, as per bookshop conventions
 */
const rewriteSvelteComponent = (filepath) => {
  const fp = filepath.toLowerCase().split('/').reverse();
  const componentName = [fp[0].replace(/\..*$/, '')];
  const startAt = fp[1] === componentName[0] ? 2 : 1;
  for (let i = startAt; i < fp.length; i++) {
    if (fp[i] === 'components') break;
    if (/\./.test(fp[i])) break;
    componentName.unshift(fp[i]);
  }
  return componentName.join('/');
};

/**
 * Turn a raw import-glob-keyed object into a map of components
 * @param  {Object} importedObj Output from import-glob-keyed
 * @param  {Object} appObj      Object to insert components into
 */
const mapSvelteFiles = (importedObj, appObj) => {
	for (let [file, component] of Object.entries(importedObj)) {
		file = rewriteSvelteComponent(file);
		appObj[file] = component.default;
	}
}

/**
 * Turn store prop strings into usable Svelte stores.
 * Also pull encrypted details out of a DOM form for CloudCannon.
 * @param {Object} props Raw properties being passed to the component
 * @param {DOM Node} target Target element we're hydrating/replacing
 */
const transformProps = (props, target) => {
  stores.hydrate(props);

  if (!props.wrapper && props._wrapper) props.wrapper = target;

  if (props.cloudcannon_encrypted_details || props._cloudcannon_encrypted_details) {
    const existingEncryptedDetails = target.querySelector("[name=\"_encrypted_details\"]");
    if (existingEncryptedDetails) {
      props.cloudcannon_encrypted_details = existingEncryptedDetails.value;
    }
  }
}

const findComponentAssetPath = () => {
  const script = document.currentScript;
  const currentUrl = script.src;
  return currentUrl.replace('app.js', 'components.js');
}

(function() {
  import(/* webpackIgnore: true */ findComponentAssetPath()).then(m => {
    const usableApps = {};
    if (window.bookshop_components) mapSvelteFiles(window.bookshop_components.default, usableApps);
    if (typeof THEME_COMPONENTS !== 'undefined') mapSvelteFiles(THEME_COMPONENTS, usableApps);

    svelteSlabs.renderSlabs(usableApps, {
      transformProps
    });
  })
}());
