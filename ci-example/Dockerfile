FROM rust:latest AS builder

WORKDIR /usr/src/app

COPY ./ci-example .

RUN cargo test --no-run

CMD ["cargo", "test"]
