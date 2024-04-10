mkdir -p small
log_file="error_log.txt"

# Clear the log file at the beginning of the script
echo "" > $log_file

# Count the number of .jpg files
total_files=$(ls *.jpg | wc -l)
echo "Total files to process: $total_files"

# Initialize a counter for processed files
processed_files=0

for file in *.jpg; do
    # Increment and display the number of processed files
    ((processed_files++))
    
     # Calculate the percentage of completion
    percentage=$((processed_files * 100 / total_files))

    # Print the progress bar
    printf "\rProcessing files: [%-50s] %d%% - (%d/%d)" $(printf "#%.0s" $(seq 1 $((percentage / 2)))) $percentage $processed_files $total_files

    # Get image width and height
    dimensions=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$file")
    width=$(echo $dimensions | cut -d',' -f1)
    height=$(echo $dimensions | cut -d',' -f2)

    # Calculate the expected height after resizing the width to 600px
    expected_height=$((height * 600 / width))

    if [ $expected_height -lt 400 ]; then
        # If the expected height is less than or equal to 400px, set height to 400 and crop width to 600px
        ffmpeg -i "$file" -vf "scale=-1:400,crop=600:400" -qscale:v 2 small/"$file" 2>/dev/null
    else
        # If the expected height is greater, proceed with setting width to 600px and cropping height to 400px
        ffmpeg -i "$file" -vf "scale=600:-1,crop=600:400" -qscale:v 2 small/"$file" 2>/dev/null
    fi


    if [ $? -ne 0 ]; then
        echo "Error processing $file during initial conversion" >> $log_file
        continue
    fi

done

echo "\nProcessing complete. Processed $processed_files files."
