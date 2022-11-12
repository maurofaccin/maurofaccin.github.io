#!/usr/bin/env bash

if [ -e slides.pdf ]; then
    pdftocairo -png -scale-to-x 1200 -scale-to-y -1 slides.pdf slide
elif [ -e poster.pdf ]; then
    pdftocairo -png -scale-to-x 1200 -scale-to-y -1 poster.pdf poster
fi

for f in *.png; do
    echo "$f"
    convert "${f}" "${f%.png}.webp"
    # pngquant --output temp.png "$f"
    # mv temp.png "$f"
    rm temp.png
done

ls
