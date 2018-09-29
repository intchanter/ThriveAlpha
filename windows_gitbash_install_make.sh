#/usr/bin/env sh

# Use latest version
export WINDOWS_MAKE_URL=https://versaweb.dl.sourceforge.net/project/gnuwin32/make/3.81/make-3.81-bin.zip
export WINDOWS_MAKE_BASE=`basename $WINDOWS_MAKE_URL`
# Find Ming folder
export DST=`echo /c/Program*/Git/ming*`
[ !-z $WINDOWS_MAKE_BASE ] || curl -o $WINDOWS_MAKE_BASE $WINDOWS_MAKE_URL
unzip -d "$DST" "$WINDOWS_MAKE_BASE"
