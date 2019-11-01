#! /bin/bash

# NOTE: before continuing, run three replacements on the CSV:
# "" => "null"
# "," => `
# % => ~

if [ -z "$1" ]
then
    echo "no input filename provided"
    exit 1
fi

if [ -z "$2" ]
then
    echo "no output filename provided"
    exit 1
fi

INPUT="$1"
OUTPUT="$2"
LINENUMBER=1
echo "INSERT INTO Types (id, name) VALUES" > $OUTPUT
while read LINE
do
  if [ $LINENUMBER -ge 2 ]
  then
    if [ $LINENUMBER -ge 3 ]
    then
      echo "," >> $OUTPUT
    fi


    IFS='`' read -ra COLUMNS <<< "$LINE"

    printf "(" >> $OUTPUT

    ID=${COLUMNS[0]//\"/}
    printf "$ID" >> $OUTPUT
    printf ', ' >> $OUTPUT

    NAME=${COLUMNS[1]//\"/}
    printf "'$NAME'" >> $OUTPUT

    printf ")" >> $OUTPUT

  fi
  LINENUMBER=$((LINENUMBER+1))
done < $INPUT

printf ";" >> $OUTPUT

# 5kV (1022) and 5kV (1023) conflict
# No equipment on 1023, just remove it