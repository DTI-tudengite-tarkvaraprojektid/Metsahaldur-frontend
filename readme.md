# Metsahaldur 

<p align="center">
  <img src="http://www.tlu.ee/~kroots/Ekraanipilt.png"/ width="500px">
</p>

Projekt on loodud Tallinna Ülikooli Digitehnoloogiate instituudis, tarkvaraarenduse praktika (IFI6213.DT) suvetöö raames. 

Metsahalduri veebilehekülg on loodud Metsahaldur OÜ tellimusel ning mõeldud kasutamiseks Metsahaldur OÜ töötajatele ning klientidele. Veebilehestiku eesmärk on muuta metsa haldamine metsahalduri firma jaoks lihtsaks ja veebipõhiseks. Rakendus lihtsustab Metsahaldur OÜ klientide ja ettevõtte vahelist andmevahetust ning seega hõlbustab suuresti metsahalduri töötajate töövoogu. 

## Kasutatud tehnoloogiad
### Front end
* React 15.4.2
* Redux 3.6.0
### Back end
* Node.js 7.8.0
* MongoDB 3.4.4

## Projekti panustasid
###### Meie tiim: 
* Greg Nesselmann
* Henry Savi
* Karoliina Roots
* Toomas Thetloff
* Veljo Lasn

###### Tiimiväline abi: 
* Erko Soolmann
* Romil Robtsenkov

## Litsents
Tarkvara kasutab MIT litsentsi

## Isikliku testserveri setup:

Alustuseks, installi omale VirtualBox ja sinna sisse vaikeseadetega Ubuntu Server 16.04.
Kui installatsioon lõppenud, sule virtuaalmasin. Lisa jagatud kaust - esmalt virtualBoxi pool - settings, shared folders, add. Read-only ja auto mount. 
Tee oma kausta uus kaust nimega www, sinna sisse app, appi sisse public ja publicu sisse index.html.
Minu oma asetseb desktopil ja on nimega "mets" - näited on selle peale samamoodi üles ehitatud.
Forwardi pordid 3022->22 ja 3080->80

1) Käivita virtuaalmasin uuesti.

2) `sudo apt-get update && sudo apt-get install openssh-server`

3) **!!!Veendu, et virtualbox guest additions on mounted!!!** Host-masinast, käsurealt (windowsis Putty kaudu):

`ssh -p 3022 mets@localhost`

4) logi oma parooliga (siin näitel "mets") sisse ja jooksuta korraga järgmine käsk:
```
sudo apt-get update && sudo apt-get install nodejs npm &&
sudo npm cache clean -f && sudo npm install -g n && sudo n stable &&
sudo apt-get install git nginx && sudo mount /dev/cdrom /media/cdrom &&
sudo sh /media/cdrom/VBoxLinuxAdditions.run &&
sudo usermod -a -G vboxsf www-data && sudo usermod -a -G vboxsf mets &&
sudo reboot
```

Vahepeal küsitakse Sult su parooli ja palutakse "Y" vajutada.

5) Kui masin uuesti üles buudib, ssh uuesti sisse ja
```
sudo rm -rf /var/www &&
sudo ln -s /media/sf_mets/www /var &&
sudo mv /etc/nginx/sites-available/default /etc/nginx/sites-available/default-backup &&
sudo nano /etc/nginx/sites-available/default
```

6) Copy-paste avanenud tekstiredaktoriaknasse:

```

server {
    listen 80;

    root /var/www/app/public;

    server_name localhost;
    index index.html index.html;

    location ~* \.(?:manifest|appcache|html?|xml|json)$ {
         expires -1;
         # access_log logs/static.log; # remove the # from the start of the line to enable static logging
    }
    location ~* \.(?:css|js)$ {
      try_files $uri =404;
      expires 1y;
      access_log off;
      add_header Cache-Control "public";
      sendfile off;
    }

    # Any route containing a file extension
    location ~ ^.+\..+$ {
      try_files $uri =404;
    }

    # Any route that doesn't have a file extension
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API url-s
    location /api {
        proxy_pass http://localhost:3000;
    }
}
```

7) Peale seda ctrl+o, enter, ctrl+x ja

`sudo service nginx restart`

Siis navigeeri browseris http://localhost:3080


MongoDB install:

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6 &&
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list &&
sudo apt-get update &&
sudo apt-get install -y mongodb-org &&
sudo service mongod start
```

Käsud frontendis:

`npm run dev` - käivitab webpack-dev-serveri ja hot-reloadingu - ei vaja virtualboxi käivitamist et ainult visuaali kallal tööd teha.

`npm run build` - development build - kompileerib ja bundleb kogu javascripti & cssi kahte faili, ligipääsetav VM-i kaudu.

`npm run prod` - production build - minify + uglify JS & CSS. vt. ka webpack.config.js-is olevaid minificationi käske.

