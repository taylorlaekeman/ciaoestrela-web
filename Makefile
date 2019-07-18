install:
	npm install
	npm install react-scripts@3.0.1

build-app:
	npm run build

run:
	npm install -g serve
	serve -s build

lint:
	npx eslint src/
