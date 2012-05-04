test:
	npm test

.PHONY: test

deploy:
	git push heroku master

.PHONY: deploy
