O Sangue Bom foi uma aplicação idealizada e prototipada na disciplina Interação Humano Computador durante o curso de Ciência da Computação no segundo período. A ideia era projetar um sistema direcionado para a área da saúde e para atender pessoas acima dos 60 anos. Ele busca auxiliar pessoas que estão nessa faixa etária no controle dos níveis de colesterol por meio de uma aplicação que apresenta uma interface simples, procurando proporcionar, para estas pessoas, uma maior facilidade em utilizá-la. 

Os objetivos da disciplina não incluiam a construção da aplicação utilizando algum tipo de tecnologia e/ou ferramenta, no entanto foi desenvolvida uma pequena aplicação Web para fins de estudo e prática utilizando as seguintes tecnologias: 

- NodeJS
- ReactJS 
- SQLite3

Para executar a aplicação primeiramente certifique-se que você tem o Node Package Manager(NPM) e o React instalados em sua máquina. Em seguida abra o seu terminal e execute o comando "npm install" nos diretórios do backend e do frontend, para instalar as dependências necessárias para a execução da api e da interface respectivamente. Feito isso, execute o comando "npm start" também em ambos os diretórios para iniciar a execução da aplicação.

Para a funcionalidade de recuperação de senha por envio de email funcionar, crie um arquivo "config.json" dentro do diretório "backend/src" da seguinte forma:

{
    "user": "seuemail@servidor.com",
    "pass": "suasenha"
}

Pode ser necesário que você faça alterações na função "forgotPasswordSendMail" dentro do diretório "src/utils" para definir as configurações do envio de acordo com o servidor de email utilizado. No link abaixo você encontra como configurar para servidores Gmail e Outlook. Você pode acessar também a documentação oficial da biblioteca nodemailer, utilizada para enviar emails (segundo link).

https://ourcodeworld.com/articles/read/264/how-to-send-an-email-gmail-outlook-and-zoho-using-nodemailer-in-node-js

https://nodemailer.com/about/
