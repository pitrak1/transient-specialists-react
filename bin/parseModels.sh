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
echo "INSERT INTO Models (id, name, oem_id) VALUES" > $OUTPUT
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

    NAME=${COLUMNS[1]}
    printf "'$NAME'" >> $OUTPUT
    printf ', ' >> $OUTPUT

    OEMID=${COLUMNS[2]//\"/}
    printf "'$OEMID'" >> $OUTPUT

    printf ")" >> $OUTPUT

  fi
  LINENUMBER=$((LINENUMBER+1))
done < $INPUT

printf ";" >> $OUTPUT

# E421 (18) conflicts with E421 (19)
# E421 (19) points to null OEM, just delete it

# CCL (40) conflicts with CCL (41)
# They're the same and pointing to the same OEM, just delete 41

# IMN2 (1097) conflicts with IMN2 (1101)
# Confirmed only EM Test has IMN2, delete 1097

# laptop (21), lap top (22), laptop (17), lap top (18) conflict
# change names to reflect OEM
# laptop (17) => Lenovo Laptop (17)
# lap top (18) => Toshiba Laptop (18)
# laptop (21) => IBM Laptop (21)
# lap top (22) => Dell Laptop (22)

# NX5 bsp (3127), NX5 bsp (3128), and NX5 bsp (3129) conflict
# all point to the same OEM
# delete last 2, 3128 has one equipment pointing to it, so we'll need to change that over

# ESD Table (3154) conflicts with ESD Table (3156)
# same OEM
# Delete last one, but has an equipment pointing to it that will need to be corrected