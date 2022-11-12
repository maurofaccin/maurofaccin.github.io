#!/usr/bin/env bash

DIR=static/images
ME=$(dirname "$0")

for source in "${ME}/bg-"*;
do
    echo "$source"
    fname=$(basename "${source}")
    convert "${source}"\
        -colorspace sRGB\
        -alpha set -background none -channel A\
        -sparse-color barycentric '0,0 white 0,%[h] none'\
        +channel\
        "${DIR}/${fname%.jpg}.webp"
done


