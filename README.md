# WEDIA DOCUMENTATION GENERATOR

Creates documentations sites for any wedia repository easily. 

## How to use

Edit your `.env` file with desired documentation, then execute `npm run docs:dev:dist`

Example :
 
```
GIT_REPO=git@bitbucket.org:wediaproduct/portal.git
GIT_BRANCH=testing-documentation
```

TODO / ideas :

- creates configuration files with repositories and retrieve the good config via .env (ie : PROJECT=portal)
- programmatically creates TOC (with folders or files names)
- default branch to master
- enable the creation of mixed documentation (i.e : portal + wedia-vue)
- enable on site modification (see codemirror for the implementation)
- creates proof of concept branchs
- integrates bootstrap and other things