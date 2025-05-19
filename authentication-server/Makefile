# Makefile

# Compiler settings
CC      := gcc
CFLAGS  := -std=c11 -Wall -Wextra

# Directories and target
BINDIR  := build
TARGET  := $(BINDIR)/authentication-server.exe
SRC     := main.c

.PHONY: all a run clean

# Default: same as 'a'
all: a

# 'a' always rebuilds the EXE
a: clean $(TARGET)

# Run the program (rebuild if needed)
run: a
	@echo "Running $(TARGET)..."
	$(TARGET)

# Ensure build directory exists
$(BINDIR):
	mkdir -p $(BINDIR)

# Build the EXE into build/
$(TARGET): $(SRC) | $(BINDIR)
	$(CC) $(CFLAGS) -o $@ $<

# 'clean' removes only the .exe, keeps build/ folder
clean:
	rm -f $(TARGET)