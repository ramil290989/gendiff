install: #первый запуск
	npm ci

test:
	npm test

gendiff: 
	node bin/gendiff.js

publish:
	npm publish --dry-run
	
make lint:
	npx eslint .
