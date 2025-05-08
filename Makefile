DC ?= docker compose

.PHONY: run-uts

run-uts:
	$(DC) -f docker-compose-ci.yml up --build --remove-orphans --force-recreate
