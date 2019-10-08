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
echo "INSERT INTO Equipment (id, serial_number, notes, cal_company, cal_due, type_id, model_id) VALUES" > $OUTPUT
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

    SERIALNUMBER=${COLUMNS[1]}
    printf "'$SERIALNUMBER'" >> $OUTPUT
    printf ', ' >> $OUTPUT

    NOTES=${COLUMNS[2]}
    if [ "$NOTES" == "null" ]
    then
      printf "null" >> $OUTPUT
    else
      printf "'${NOTES}'" >> $OUTPUT
    fi
    printf ', ' >> $OUTPUT

    CALCOMPANY=${COLUMNS[4]}
    if [ "$CALCOMPANY" == "null" ]
    then
      printf "${CALCOMPANY}" >> $OUTPUT
    else
      printf "'${CALCOMPANY}'" >> $OUTPUT
    fi
    printf ', ' >> $OUTPUT

    CALDUE=${COLUMNS[5]}
    if [ "$CALDUE" == "null" ]
    then
      printf "${CALDUE}" >> $OUTPUT
    else
      printf "'${CALDUE}'" >> $OUTPUT
    fi
    printf ', ' >> $OUTPUT

    TYPEID=${COLUMNS[6]}
    printf "$TYPEID" >> $OUTPUT
    printf ', ' >> $OUTPUT

    MODELID=${COLUMNS[7]//\"/}
    printf "$MODELID" >> $OUTPUT

    printf ")" >> $OUTPUT
  fi
  LINENUMBER=$((LINENUMBER+1))
done < $INPUT

printf ";" >> $OUTPUT

