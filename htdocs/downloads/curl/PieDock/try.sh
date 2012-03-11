#!/bin/bash

readonly ARCH=`uname -m`
readonly BIN="piedock-instant-${ARCH}.bin"
readonly SRC="piedock-1.5.0"
readonly TAR="${SRC}.tar.bz2"
readonly URL="http://markusfisch.de/downloads/"

which curl &>/dev/null || {
	cat <<EOF
error: missing curl, please download

${URL}${BIN}

manually and run

sh $BIN

EOF
	exit -1
}

case $ARCH in
	i686|x86_64)
		curl "${URL}${BIN}" > $BIN && sh $BIN
		exit
		;;
esac

cat <<EOF
Unfortunately there is no precompiled binary for your system available.

Do you want to install from source? (y/n)

EOF

read ANSWER && case "$ANSWER" in
	y*|Y*|"")
		;;
	*)
		exit
		;;
esac

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

sh/deploy || {
	echo "error: cannot invoke compilation"
	exit -1
}
