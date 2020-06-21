# How to deploy Node.js & MongoDB apps to DigitalOcean

First create a DigitalOcean droplet and choose Ubuntu for your server. To get into your server type:<br />
`ssh root@<your ip address>`

## Installing MongoDB

Now where in! But we need to set up first our environment. First we need to install MongoDB type the following commands:<br />
`cd`<br />
`sudo apt update`<br />
`sudo apt install -y mongodb`<br />

To check if mongodb status is ok type:<br />
`sudo systemctl status mongodb`

If it's ok type `mongo` to setup your database, but if you use this public repo you don't need to do that.

## Installing Node.js

To install node.js write:<br />
`curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`<br />
`sudo apt install nodejs`

To check if it's installed with npm write:<br />
`node -v`<br />
`npm -v`

## Starting our project

Start the project by cloning your github repo:<br />
`git clone yourproject.git`<br />
`cd yourproject`
However you can clone this repo for testing.
You can write `npm start` to start your server and checkout the project at _youripaddress:yourport_

## Setup pm2

But we don't want to always write npm start to start the server. For that we need somehing pm2(process manager). For that type:<br />
`npm i -g pm2`<br />
`pm2 start app.js(whatever is your entry point)`
That will work but we need then to reboot to continue:<br />
`pm2 startup ubuntu`<br />
`reboot`

This will get out of your ubuntu server to get back write again `ssh root@<your ip address>`.
It will take a while to get in, if you're prompted close your terminal and open it again.

## Setup firewall

Now we need to setup firewall, because now we are running only on the port of your project, we need to run it with no port. Write:<br />
`sudo ufw enable`<br />
`sudo ufw status`<br />
`sudo ufw allow ssh (Port 22)`<br />
`sudo ufw allow http (Port 80)`<br />
`sudo ufw allow https (Port 443)`

This will make our app to crash because we are running on no port. Now we need nginx to get our app back.

## Setup nginx

Nginx is a web server that will enable us to get our app running, install it by typing:<br />
`sudo apt install nginx`
To get our server running we need to edit a nginx file:<br />
`sudo nano /etc/nginx/sites-available/default`

This will open a file, scroll down to the 'location / {}' place and write in:<br />
`

    location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
`

Save by typing ctrl-X and will ask you if you want to save, press 'y' and then 'enter'.
Start nginx by typing:<br />
`sudo nginx -t`<br />
`sudo service nginx restart`

Now you should be able to visit your app at your ip address with no port!


