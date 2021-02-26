case "$(uname -s)" in

   Darwin)
     echo 'Mac OS X' && npm i
     ;;

   Linux)
     echo 'Linux' && npm i
     ;;

   CYGWIN*|MINGW32*|MSYS*|MINGW*)
     echo 'MS Windows' && npm i && npm i windows-build-tools && npm i ffmpeg-static
     ;;

   # Add here more strings to compare
   # See correspondence table at the bottom of this answer

   *)
     echo 'Other OS' 
     ;;
esac