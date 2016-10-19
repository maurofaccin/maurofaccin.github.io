GH-PAGES = ${HOME}/dev/urubu-gh-pages/
# Static Site Generator
BUILD_DIR=_build/
TIME=$(shell date -Iseconds)
SASS_OPTS=--cache-location /tmp/ssg --trace --sourcemap=none

USERNAME=$(shell git config --get user.name)
USEREMAIL=$(shell git config --get user.email)

# Git server remote
ORIGIN="git@bitbucket.org:maurofaccin/maurofaccin.bitbucket.org"

THEME=academic
SASS_SRC=./_sass/
SASS_STC=./css/

all: build

build: sassc
	mkdir -p $(BUILD_DIR)
	vex urubu urubu build

sassc:
	mkdir -p $(SASS_STC)
	sassc -t compressed $(SASS_SRC)style.scss $(SASS_STC)style.css

deploy: clean build
	touch $(BUILD_DIR).nojekyll
	bash _deploy.sh

clean:
	rm -rf $(SASS_STC)
	rm -rf $(BUILD_DIR)

serve: 
	@ echo "Serving on port 8000"
	vex urubu urubu serve

stop:
	@ for i in $$(cat /tmp/c23459serve.pid); do echo killing pid: $$i; kill $$i; done

publish:
	git subtree push --prefix _build origin master    


.PHONY: all build sassc clean serve stop publish
