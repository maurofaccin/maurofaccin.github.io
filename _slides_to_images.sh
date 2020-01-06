#!/usr/bin/eval bash

if [ -e slides.pdf ]; then
    pdftocairo -png -scale-to-x 1200 -scale-to-y -1 slides.pdf slide
elif [ -e poster.pdf ]; then
    pdftocairo -png -scale-to-x 1200 -scale-to-y -1 poster.pdf poster
fi

# for f in slides.*; do
#     pdftocairo -png -scale-to-x 1200 -scale-to-y -1 slides.pdf slide
# done
# for f in poster.*; do
#     pdftocairo -png -scale-to-x 1200 -scale-to-y -1 poster.pdf poster
# done

for f in *.png; do
    echo $f
    pngquant --output temp.png $f
    mv temp.png $f
done
# trimage -d .

ls
