DC ?= docker compose
DC_FLAGS = "--remove-orphans"

.PHONY: build-server run-server stop-server run-uts

build-server:
	$(DC) build
	touch .make/build-completed

run-server: .make/build-completed
	$(DC) up mock-server $(DC_FLAGS)

stop-server:
	$(DC) down mock-server $(DC_FLAGS)

run-uts:
	@UTS_FAILED=0; 																											\
	@UTS_FLAGS="--force-recreate"; 																							\
																															\
	$(DC) -f docker-compose-ci.yml build; 																					\
	$(DC) -f docker-compose-ci.yml up ci_example  $(DC_FLAGS) $(UTS_FLAGS) --exit-code-from ci_example  || UTS_FAILED=1; 	\
	$(DC) -f docker-compose-ci.yml up ci_example2 $(DC_FLAGS) $(UTS_FLAGS) --exit-code-from ci_example2 || UTS_FAILED=1; 	\
																															\
	if [ $$UTS_FAILED -eq 1 ]; then 																						\
		echo "UTs failed"; 																									\
		exit 1; 																											\
	else 																													\
		echo "UTs passed"; 																									\
		exit 0; 																											\
	fi
