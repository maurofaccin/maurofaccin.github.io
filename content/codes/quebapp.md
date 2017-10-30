---
title: QuEBApp
description: A python module to find communities in complex quantum systems
date: 2014-02-16
image: quebapp.svg
lang: Python
tags:
  - quantum
  - community
layout: standalone
---

Quantum Effects Based Approach to community detection.
This sofware compute the community structure of a Quantum System based
on its Hamiltonian, on the preferred basis.

For details see:
[/papers/2014-10-21-communities]

{{< figure src="codes/quebapp/quebapp-dendro-wide.png" caption="Dendrogram" alt="Community Detection Dendrogram" >}}

## Requirements

- Python3 (it should work in python2 too, not sure about that)
- matplotlib (only for dendrogram plots)
- numpy, scipy

## Install

Clone the repository somewhere

- `git clone git@bitbucket.org:maurofaccin/quebapp.git`

go to the folder

- `cd quebapp`

install (use `--user` if you don't have root privileges or you want a local
install)

- `./setup.py install [--user]`

## Usage

Use `quebapp -h` for help.

```bash
usage: quebapp [-h] [--edgelist] [-0] 
               [-t {fidelity,transport,purity}] [-d]
               network

QuEBApp: Quantum Community Detection

positional arguments:
  network               Network file [default=Hamiltonian matrix]

optional arguments:
  -h, --help            show this help message and exit
  --edgelist            Read Hamiltonian as list of edges [i j
                        weight(optional)]
  -0, --time0           Closeness measure with short-time limit [default:
                        long-time limit]
  -t {fidelity,transport,purity}, --type {fidelity,transport,purity}
                        Use a specific closeness measure [default: fidelity]
  -d, --dendrogram      Outputs the resulting dendrogram and modularity
```

The network representing the quantum system needs to be a Hermitian matrix
(the Hamiltonian). It can be given in matrix form:

```python
h_11  h_12  h_13  ...
h_21  h_22  h_23  ...
h_31  h_32  h_33  ...
...   ...   ...   ...
```
with `h_ij` complex conjugate of `h_ji`.
The matrix can be given as an edge list:

```
i    j    h_ij
...  ...  ...
```

where `i` and `j` are indexes and `h_ij` the Hamiltonian entry (`h_ji` will
be computed automatically).

## License

Copyright: Mauro Faccin (2014)

QuEBApp is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

QuEBApp is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

Check LICENSE.txt for details.
