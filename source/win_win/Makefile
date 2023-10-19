SHELL = /bin/bash

.PHONY: all
all: install

.PHONY: node_modules
.SILENT: node_modules
node_modules:
	pushd src/frontend; npm install; popd

.PHONY: install
.SILENT: install
install: 
	./scripts/install.sh

.PHONY: install-frontend
.SILENT: install-frontend
install-frontend: 
	./scripts/install_frontend.sh

.PHONY: update
.SILENT: update
update: 
	./scripts/update.sh