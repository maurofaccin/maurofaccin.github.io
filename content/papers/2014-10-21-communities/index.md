---
date: 2014-10-21
title: Community Detection in Quantum Complex Networks
tags:
    - quantum-networks
    - community
authors:
    - Faccin
    - Migdał
    - Johnson
    - Bergholm
    - Biamonte
journal: Phys. Rev. X 4, 041012 (2014)
journallink: http://journals.aps.org/prx/abstract/10.1103/PhysRevX.4.041012
pdf: faccin_quantum-community-detection_PRX2014.pdf
arxiv: http://arxiv.org/abs/1310.6638
image: community.png
abstract: "Determining community structure is a central topic in the study of complex networks, be it technological, social, biological or chemical, static or in interacting systems. In this paper, we extend the concept of community detection from classical to quantum systems—a crucial missing component of a theory of complex networks based on quantum mechanics. We demonstrate that certain quantum mechanical effects cannot be captured using current classical complex network tools and provide new methods that overcome these problems. Our approaches are based on defining closeness measures between nodes, and then maximizing modularity with hierarchical clustering. Our closeness functions are based on quantum transport probability and state fidelity, two important quantities in quantum information theory. To illustrate the effectiveness of our approach in detecting community structure in quantum systems, we provide several examples, including a naturally occurring light-harvesting complex, LHCII. The prediction of our simplest algorithm, semiclassical in nature, mostly agrees with a proposed partitioning for the LHCII found in quantum chemistry literature, whereas our fully quantum treatment of the problem uncovers a new, consistent, and appropriately quantum community structure."
bibtex: |-
    @article{faccin2014community,
      title = {Community Detection in Quantum Complex Networks},
      author = {Faccin, Mauro and Migda\\l{}, Piotr and Johnson, Tomi H. and Bergholm, Ville and Biamonte, Jacob D.},
      journal = {Phys. Rev. X},
      volume = {4},
      issue = {4},
      pages = {041012},
      numpages = {11},
      year = {2014},
      month = {Oct},
      publisher = {American Physical Society},
      doi = {10.1103/PhysRevX.4.041012},
      url = {http://link.aps.org/doi/10.1103/PhysRevX.4.041012},
        eprinttype  = {arxiv},
        eprint      = {1310.6638},
        primaryClass  = {quant-ph},
    }
---


We extend the concept of community detection from classical to quantum systems, which provides a crucial missing tool for analyzing quantum systems with a network structure. As well as for analysis, we argue that breaking down a quantum system into strongly correlated parts, i.e., a form of community partitioning, is an essential precursor for any simulation that aims to use this partitioning to reduce computational cost.

To achieve the above goals we adapt traditional community detection methods that, as their starting point, use a measure of 'closeness' for any two nodes. For quantum systems we naturally ensure that the closeness measure captures relevant quantum effects, which can therefore lead to partitionings that are significantly different to those expected from a classical analysis.

