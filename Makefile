# phaser project

NPM = $(which npm || echo "npm")
MING_NPM_URL = https://nodejs.org/download/release/v7.4.0/node-v7.4.0-win-x64.zip
MING_NPM_FILE = $(basename $(MING_NPMURL))

all: node_modules

start: node_modules
	npm start </dev/null

stop:
	killall npm webpack-serve

dist:
	npm run dist </dev/null

audiosprite:
	npm run audiosprite </dev/null

node_modules: package.json $(NPM)
	npm install

clean:
	rm -rf node_modules

butler_push:
	butler push dist/dist-latest.zip dashbangsplat/misadventure:latest

butler_status:
	butler status dashbangsplat/misadventure:latest

$(NPM):
	@echo "Need to install npm!"
	@[ ! -e /etc/centos-release ] || make INSTALL_CENTOS
	@uname -a | grep -vi darwin || make INSTALL_OSX
	@uname -a | grep -vi MING || make INSTALL_MING
	@which npm || exit 1
	@sleep 2
	make $*

INSTALL_CENTOS:
	@echo Installing epel ...
	@[ -e /etc/yum.repos.d/epel.repo ] || sudo yum install epel-release
	@echo Installing nodejs ...
	@[ ! -e /etc/yum.repos.d/epel.repo ] || sudo yum install nodejs

INSTALL_OSX:
	@echo Installing brew ...
	@which brew || /usr/bin/ruby -e "$$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	@which brew || exit 1
	@echo Installing npm ...
	@which npm || brew install node

INSTALL_MING: $(MING_NPM_FILE)
	@echo READY TO INSTALL NPM ...
	exit 1

$(MING_NPM_FILE):
	@curl -o $(MING_NPM_FILE) $(MING_NPM_URL)
	@[ !-z $(MING_NPM_FILE) ]
	@echo Downloaded NPM successfully ...
	@exit 1

.PHONY: all start stop dist audiosprite clean butler_push butler_status
