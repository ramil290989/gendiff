install: #первый запуск
	npm ci

test:
	npm test

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
