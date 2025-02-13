#!/usr/bin/env python3
"""Render the template."""

import re
from functools import partial
from sys import argv

import yaml
from jinja2 import Environment

MD = {
    "tex": {"it": r"\\emph{\1}", "bd": r"\\textbf{\1}", "tt": r"\\texttt{\1}"},
    "html": {"it": r"<i>\1</i>", "bd": r"<b>\1</b>", "tt": r"<var>\1</var>"},
}


def md2tex(text: str, kind: str = "tex") -> str:
    """Convert simple markdown to latex."""
    if not isinstance(text, str):
        return text
    # code
    newtext = re.sub(r"`([^`]*)`", MD[kind]["tt"], text)
    # bold
    newtext = re.sub(r"\*\*([^\*]*)\*\*", MD[kind]["bd"], newtext)
    newtext = re.sub(r"__([^\*]*)__", MD[kind]["bd"], newtext)
    # italic
    newtext = re.sub(r"\*([^\*]*)\*", MD[kind]["it"], newtext)
    newtext = re.sub(r"_([^\*]*)_", MD[kind]["it"], newtext)
    return newtext


yam = argv[1]
tmp = argv[2]
with open(yam) as fd:
    data = yaml.safe_load(fd.read())

with open(tmp) as fd:
    template = fd.read()

env = Environment(lstrip_blocks=True, trim_blocks=True)

if tmp.endswith("tex.jinja"):
    env.block_start_string = "[[%"
    env.block_end_string = "%]]"
    env.variable_start_string = "[["
    env.variable_end_string = "]]"
    env.comment_start_string = "[[="
    env.comment_end_string = "=]]"
    env.filters["md"] = partial(md2tex, kind="tex")
elif tmp.endswith("html.jinja"):
    env.filters["md"] = partial(md2tex, kind="html")

render = env.from_string(template)
print(render.render(data))
