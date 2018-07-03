start:
	gulp && docker build -t l3mncakes/survival-sim . && docker run --name survival-sim -d -p 1234:80 -v `pwd`/dist/:/usr/share/nginx/html:ro l3mncakes/survival-sim

stop:
	docker stop survival-sim && docker rm survival-sim

restart:
	make stop && make start
