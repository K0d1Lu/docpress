# DOCPRESS

Creates documentations sites for any repository easily. 

## How to use

Edit `script/docs.js` file with desired documentation, then execute `npm run import && npm run docs:dev`

### For developement (local testing)

Edit your `script/docs.js` file with desired **local** documentation

### Generate particular documentation

You can prefix your documentation files to filtered on documentation generation. For instance you can creates a file named `__rd_deploy`, a file named `__ps_deploy` and a file named `__ci_deploy`.

Then in `.env` file you can add a `DOC_TYPE` variable with value `"rd"`. Therefore only files prefixed with `rd` or without prefix will be included in the generated documentation.

If you you want include files with different prefixs you must define your `DOC_TYPE` environment variable with those prefix separated with comas (i.e : `DOC_TYPE="rd, ci"`).

The default value for `DOC_TYPE` is `"all"` wich means all files are included.

**Important :** Experimental functionnality => needs to work on configuration handling for this feature, especially if we want to include several prefix.

TODO / ideas :

- creates configuration files with repositories and retrieve the good config via .env (ie : PROJECT=portal or PROJECT="portal, wedia-vue")
- ~~multi langue~~
- allow to put files in others directory (useful for project s documentation)
- programmatically creates TOC (with folders or files names)
- default branch to master
- enable the creation of mixed documentation (i.e : portal + wedia-vue)
- enable on site modification (see codemirror for the implementation)
- creates proof of concept branchs
- integrates bootstrap and other things
- integrates mermaid and show architecture diagram
- allow to fetch different versions (with branches or tag on portal ?)
- config to use components
- give a hook to copy files in /public and use links in markdowns
- give projects possibility to add thair favicon and images
