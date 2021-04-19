PREFIX=compiled
PRETMP=template
TMPLT=$(wildcard $(PRETMP)*.jinja)
CMPLD=$(patsubst $(PRETMP)%.jinja, $(PREFIX)%, $(TMPLT))
TEX=$(PREFIX).tex
PDF=$(PREFIX).pdf

DATA=curriculum.yaml

.PHONY: compile send clear templates all

all: templates $(PDF)

compile:
	latexmk -pdf cv.tex

clear:
	latexmk -C
	rm -r $(CMPLD)


$(PDF): $(TEX) cv-template.tex
	latexmk -lualatex $<


templates: $(CMPLD) $(DATA)
	@echo Compiling


$(PREFIX)%: $(DATA) $(PRETMP)%.jinja
	python render_jinja.py $^ > $@
