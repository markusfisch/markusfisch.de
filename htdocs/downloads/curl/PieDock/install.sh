#!/bin/bash

readonly SRC='piedock-1.6.6'
readonly TAR="${SRC}.tar.bz2"
readonly URL='http://markusfisch.de/downloads/'

throw()
{
	echo 'error:' "$@"
	exit 1
}

which tar &>/dev/null || throw 'missing tar'
which curl &>/dev/null || throw "missing curl, please download

${URL}${TAR}

manually and run

tar xjvf ${TAR}
cd $SRC
sh/deploy
"

curl "${URL}${TAR}" > $TAR || throw 'cannot get source tarball'
tar xjvf $TAR || throw 'cannot unpack source tarball'
cd $SRC || throw 'cannot find source directory'

# kill any running instances if this is a update
which pkill &>/dev/null && pkill piedock

sh/deploy || throw 'cannot invoke compilation'
