#!/bin/bash

if [ -n "$(git status --porcelain)" ]; then
  echo "Migrations not committed"
  exit 1
else
  echo "Migrations committed"
fi