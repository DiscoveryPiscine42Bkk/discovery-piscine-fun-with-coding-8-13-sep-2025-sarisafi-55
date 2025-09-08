#!/bin/bash
count_files=$(find . -maxdepth 1 -type f | wc -l)
count_dirs=$(find . -maxdepth 1 -type d | wc -l)
count_dirs=$((count_dirs - 1))
total=$((count_files + count_dirs))
echo "$total"
