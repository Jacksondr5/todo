#!/bin/bash

if [ -n "$(git status --porcelain)" ]; then
  echo "Migrations are not committed"
  exit 1
else
  echo "Migrations are committed"
fi