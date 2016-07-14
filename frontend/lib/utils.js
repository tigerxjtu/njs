
import marked from 'marked';
import HighLight from 'highlight.js';
import xss from 'xss';

export function redirectUrl(url){
	window.location=url;
}

marked.setOptions({
	highlight: function(code){
		return HighLight.highLightAuto(code).value;
	}
});

export function renderMarkdown(text){
	return xss(marked(text));
}