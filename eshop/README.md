FE: Angular
BE: Express + node.js
DB: mySQL

spustenie:
    do terminalu v priecinku backend:
        - npm install
        - npm run start
    do terminalu v priecinku frontend:
        - npm install
        - npm install -g @angular/cli
        - ng serve
    
    express bezi na porte 8080
    frontend na porte 4200

v projekte som neimplementoval E2E testovanie ani docker
vsetky frontend subory sa nachadzaju v priecinku frontend/src/app

cela inicializacia databazy je riesena v JS suboroch na backende 
ak DB neexistuje, tak sa vytvori, to iste plati pre tabulky 
po restarte programu sa obsah tabuliek uchovava

.vscode folder je tam iba na to, aby nevyskakovali git upozornenia