# Static Site Generator
BUILD_DIR=public/

CV_SRC=./src/cv/

BACKGROUND_SOURCES = $(wildcard src/bg-*-small.jpg)
BACKGROUND_TARGETS = $(patsubst src/%.jpg,static/images/%.webp,$(BACKGROUND_SOURCES))

all: build

build: cv $(BACKGROUND_TARGETS)
	zola build

cv:
	$(MAKE) -C $(CV_SRC)
	cp $(CV_SRC)/compiled.pdf ./static/files/faccin-cv.pdf

deploy: clean build
	touch $(BUILD_DIR).nojekyll
	# bash _deploy.sh
	# rm -f $(BUILD_DIR)/CNAME
	# echo maurofaccin.bitibucket.org > $(BUILD_DIR)/CNAME
	# bash _deploy.sh -c .env-bb
	# rm -f $(BUILD_DIR)/CNAME
	bash _deploy.sh -c .env-gh

clean:
	rm -rf $(BUILD_DIR)

serve:
	@ echo "Serving on port 8000"
	zola serve

$(BACKGROUND_TARGETS): static/images/%.webp: src/%.jpg
	@echo $^
	@echo $@
	convert "$^"\
		-colorspace sRGB\
		-alpha set -background none -channel A\
		-sparse-color barycentric '0,0 white 0,%[h] none'\
		+channel\
		"$@"

test: $(BACKGROUND_TARGETS)
	@echo $(BACKGROUND_SOURCES)

.PHONY: all build clean serve deploy
