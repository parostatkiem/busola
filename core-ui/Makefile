APP_NAME = busola-core-ui
APP_PATH = busola-core-ui
BUILDPACK = eu.gcr.io/kyma-project/test-infra/buildpack-node:v20200428-02dd40a1
SCRIPTS_DIR = $(realpath $(shell pwd)/..)/scripts

include $(SCRIPTS_DIR)/makefile-node-common.mk

install-dependencies: install-root build-shared install-app
