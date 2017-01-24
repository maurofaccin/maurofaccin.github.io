# Static Site Generator
BUILD_DIR=_build/

SASS_SRC=./_sass/
SASS_STC=./css/

all: build

build: sassc
	mkdir -p $(BUILD_DIR)
	vex uru urubu build

sassc:
	mkdir -p $(SASS_STC)
	sassc -t compressed $(SASS_SRC)style.scss $(SASS_STC)style.css

deploy: clean build
	touch $(BUILD_DIR).nojekyll
	# bash _deploy.sh
	rm -f $(BUILD_DIR)/CNAME
	echo maurofaccin.bitibucket.org > $(BUILD_DIR)/CNAME
	bash _deploy.sh -c .env-bb
	rm -f $(BUILD_DIR)/CNAME
	bash _deploy.sh -c .env-gh

clean:
	rm -rf $(SASS_STC)
	rm -rf $(BUILD_DIR)

serve: 
	@ echo "Serving on port 8000"
	vex uru urubu serve

.PHONY: all build sassc clean serve
