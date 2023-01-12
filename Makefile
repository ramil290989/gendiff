install: #первый запуск
	npm ci

build:
	rm -rf dist
	npm run build

gendiff: 
	node bin/gendiff.js

publish:
	npm publish --dry-run
	
lint:
	npx eslint .
	
test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: test
