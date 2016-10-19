#!/usr/bin/env bash

while true
do
  # get current window
  CID=`xdotool getactivewindow`
  make build
  # get firefox window
  WID=`xdotool search --name "Mozilla Firefox" | head -1`
  # refresh firefox
  xdotool windowactivate $WID
  xdotool key F5
  # return to current window
  xdotool windowactivate $CID
  # wait for next event
  inotifywait -r --exclude _build/* -e modify,close_write,move,create,delete ./
done
