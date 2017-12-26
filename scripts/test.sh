#!/bin/bash
for D in `find ./packages -type d -depth 1`
do
  cd $D; npm test; cd -
done