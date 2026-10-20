PREFIX=compiled
PRETMP=template
TMPLT=$(wildcard $(PRETMP)*.jinja)
CMPLD=$(patsubst $(PRETMP)%.jinja, $(PREFIX)%, $(TMPLT))
PDFs=$(patsubst %.tex,%.pdf,$(wildcard $(PREFIX)*.tex))

DATA=curriculum.yaml

.PHONY: compile send clear templates all

all: templates $(PDFs)

compile:
	latexmk -pdf cv.tex

clear:
	latexmk -C
	rm -r $(CMPLD)


$(PDFs): %.pdf: %.tex cv-template.tex $(DATA)
	latexmk -lualatex $<

templates: $(CMPLD) $(DATA)
	@echo Compiling


$(PREFIX)%: $(DATA) $(PRETMP)%.jinja render_jinja.py
	echo ciao $(PREFIX) $@
	python3 render_jinja.py $^ > $@
