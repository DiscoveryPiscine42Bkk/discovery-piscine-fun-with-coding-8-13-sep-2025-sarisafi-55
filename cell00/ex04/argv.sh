#!/bin/bash

if [ $# -eq 0 ]; then
  echo "No arguments supplied"
else
  # แสดง argument สูงสุด 3 ตัว (ถ้ามีน้อยกว่าก็แสดงเท่าที่มี)
  for i in $(seq 1 3)
  do
    eval arg=\$$i
    if [ -n "$arg" ]; then
      echo "$arg"
    fi
  done
fi
