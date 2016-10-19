
for f in slides.*; do
	pdftocairo -png -scale-to-x 1200 -scale-to-y -1 slides.pdf slide
done
for f in poster.*; do
	pdftocairo -png -scale-to-x 1200 -scale-to-y -1 poster.pdf poster
done

trimage -d .

ls
