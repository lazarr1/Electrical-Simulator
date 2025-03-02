FROM alpine:3.17.0 AS build

RUN apk update && \
    apk add --no-cache \
        # build-base=0.5-r3 \
        # cmake=3.24.4-r0 \
        # boost1.80-dev=1.80.0-r3 \
		build-base \
		cmake \
		gcc \
		g++ \
		boost-dev \
		make \
		musl-dev
	# RUN apk add --no-cache make gcc g++ musl-dev

WORKDIR /app
COPY . .
# RUN cmake && make && make install
RUN cmake .
RUN make
RUN make install

EXPOSE 8080

CMD ["./bin/websocket"]
