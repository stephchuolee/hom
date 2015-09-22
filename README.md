<h2>Readme</h2>
Must install imagemagick in order to run Image Upload feature

<h2>Installation Instructions for ImageMagick</h2>
<h3>For OSX:</h3>

In terminal, run: 
<tt>$ brew install imagemagick</tt>

If you do not have homebrew, please install first:

<tt>$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</tt>

<h3>For Linux:</h3>

In terminal, run:
<tt>$ sudo apt-get install imagemagick</tt>

Once you have installed Image Magick, run <tt>$ bundle install</tt> in the repo before starting the server.

Database - connecting to heroku postgresql \n
<tt>$ heroku pg:psql --app hom-database HEROKU_POSTGRESQL_ORANGE</tt>

