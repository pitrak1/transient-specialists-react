#! /bin/bash

# NOTE: before continuing, run three replacements on the CSV:
# "" => "null"
# "," => `
# % => ~
# ' =>

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
echo "INSERT INTO Events (id, status, job_number, updated_at, equipment_id, company_notes, start_date, end_date) VALUES" > $OUTPUT
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

    STATUS=${COLUMNS[1]}
    if [ "$STATUS" != "IN" -a "$STATUS" != "OUT" -a "$STATUS" != "READY" ]
    then
      printf "'OUT'" >> $OUTPUT
      printf ', ' >> $OUTPUT
      printf "'$STATUS'" >> $OUTPUT
    else
      printf "'$STATUS'" >> $OUTPUT
      printf ', ' >> $OUTPUT
      printf "null" >> $OUTPUT
    fi
    printf ', ' >> $OUTPUT

    UPDATEDAT=${COLUMNS[2]}
    printf "'$UPDATEDAT'" >> $OUTPUT
    printf ', ' >> $OUTPUT

    EQUIPMENTID=${COLUMNS[3]}
    printf "$EQUIPMENTID" >> $OUTPUT
    printf ', ' >> $OUTPUT

    COMPANYNOTES=${COLUMNS[4]}
    if [ "$COMPANYNOTES" == "null" ]
    then
      printf "${COMPANYNOTES}" >> $OUTPUT
    else
      printf "'${COMPANYNOTES}'" >> $OUTPUT
    fi
    printf ', ' >> $OUTPUT

    STARTDATE=${COLUMNS[5]}
    if [ "$STARTDATE" == "null" ]
    then
      printf "'${STARTDATE}'" >> $OUTPUT
    else
      printf "'${STARTDATE}'" >> $OUTPUT
    fi
    printf ', ' >> $OUTPUT

    ENDDATE=${COLUMNS[6]//\"/}
    if [ "$ENDDATE" == "null" ]
    then
      printf "${ENDDATE}" >> $OUTPUT
    else
      printf "'${ENDDATE}'" >> $OUTPUT
    fi

    printf ")" >> $OUTPUT

  fi
  LINENUMBER=$((LINENUMBER+1))
done < $INPUT

printf ";" >> $OUTPUT

# had to replace 'null' with null in the result, a parsing error on my part