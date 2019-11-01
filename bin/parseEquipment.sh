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
echo "INSERT INTO Equipments (id, serial_number, notes, cal_company, cal_due, type_id, model_id) VALUES" > $OUTPUT
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

# 162 (1141) has a ' in the serial number, have to remove that
# 155 (1188) has a ' in the serial number, have to remove that
# 36096 (1209) has a ' in the serial number, have to remove that
# 1512 (6247) has a ' in the serial number, have to remove that
# 1502 (10322) has a ' in the serial number, have to remove that
# 1508 (1206) has a ' in the serial number, have to remove that


# 1563 (9280) has a ' in the notes, have to remove that
# 1102225 (1205) has a ' in the notes, have to remove that

# Change model 3128 to 3127
# Change model 3156 to 3154

# 162 (1127) conflicts with 162 (1141)
# change 1141 to 162x

# 155 (1185) conflicts with 155 (1188)
# change 1188 to 155x

# 1508 (1206) conflicts with 1508 (1123)
# change 1206 to 1508x

# 1512 (6247) conflicts with 1512 (1129)
# change 6247 to 1512x

# 1502 (6220) conflicts with 1502 (10322)
# change 10332 to 1502x