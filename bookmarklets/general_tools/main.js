(function () {
  function loadModule(path, type) {
    if (type == 'css') {
      let s = document.createElement('link');
      s.setAttribute('rel', 'stylesheet');
      s.setAttribute('type', 'text/css');
      s.setAttribute('href',path+'?'+new Date);
      document.getElementsByTagName('head')[0].appendChild(s);
    } else if (type == 'js') {
      let s=document.createElement('script');
      s.src=path+'?'+new Date;
      document.body.appendChild(s);
    }
  }
  /* external variable */
  TGYBookmarkletThingLoadModule = loadModule;



  loadModule('https://nottgy.github.io/einstain/bookmarklets/general_tools/basicModule.js','js');
  loadModule('https://nottgy.github.io/einstain/bookmarklets/general_tools/style.css', 'css');
  /* add new modules as you like */

})();
