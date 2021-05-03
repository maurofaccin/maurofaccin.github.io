# Static Site Generator
BUILD_DIR=public/

CV_SRC=./src/cv/

all: build

build: cv
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

.PHONY: all build clean serve deploy
