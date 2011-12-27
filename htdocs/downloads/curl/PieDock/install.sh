#!/bin/bash

readonly SRC="PieDock-1.4.2"
readonly TAR="${SRC}.tar.bz2"
readonly URL="http://markusfisch.de/downloads/"

which curl &>/dev/null || {
	cat <<EOF
error: missing curl, please download

${URL}${TAR}

manually and run

tar xjvf ${TAR}
cd $SRC
sh/deploy

EOF
	exit
}

curl "${URL}${TAR}" > $TAR || {
	echo "error: cannot get source tarball"
	exit -1
}

which tar &>/dev/null || {
	echo "error: missing tar"
	exit -1
}

tar xjvf $TAR || {
	echo "error: cannot unpack source tarball"
	exit -1
}

cd $SRC || {
	echo "error: cannot find source directory"
	exit -1
}

# kill any running instances if this is a update
which pkill &>/dev/null && pkill PieDock

sh/deploy || {
	echo "error: cannot invoke compilation"
	exit -1
}
