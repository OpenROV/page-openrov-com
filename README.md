OpenROV website using GitHub pages
==========


Pages are generated with Jekyll


For the development we recommend using a Jekyll docker instance:


    docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll -it -p 127.0.0.1:4000:4000 jekyll/jekyll:pages
    
    
