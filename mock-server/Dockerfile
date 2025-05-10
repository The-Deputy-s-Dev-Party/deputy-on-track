FROM rust:latest AS builder

WORKDIR /usr/src/app

COPY ./mock-server .

RUN cargo build --release

CMD ["cargo", "run", "--release"]
