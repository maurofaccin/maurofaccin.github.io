#!/usr/bin/env python3
from sys import argv

from jinja2 import Environment
from yaml import load

yam = argv[1]
tmp = argv[2]
with open(yam) as fd:
    data = load(fd.read())

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
render = env.from_string(template)
print(render.render(data))
