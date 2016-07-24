
import marked from 'marked';
import HighLight from 'highlight.js';
import xss from 'xss';
import "babel-polyfill";

export function redirectUrl(url){
	window.location=url;
}

marked.setOptions({
	highlight: function(code){
		return HighLight.highLightAuto(code).value;
	}
});


const xssOptions = {
  whiteList: Object.assign({}, xss.whiteList)
};

xssOptions.whiteList.code = ['class'];
xssOptions.whiteList.span = ['class'];
const myxss = new xss.FilterXSS(xssOptions);

//console.log(myxss);

export function renderMarkdown(text){
	//return xss(marked(text));
	return myxss.process(marked(text));
}