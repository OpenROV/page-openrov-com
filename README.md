OpenROV website using GitHub pages
==========


Pages are generated with Jekyll;
 Style sheets are writen in Sass and Jekyll translates it to CSS.


For the development we recommend using a Jekyll docker instance:


    docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll -it -p 127.0.0.1:4000:4000 jekyll/jekyll:pages
    
    
For developent, you might want to istall browser-sync:

    npm install -g browser-sync

And run it:

    browser-sync start --proxy "localhost:4000" --files "_site/**/*.*"

Then connecto to http://localhost:3000/