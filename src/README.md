# 🚚 SMOCR - Sistema de Monitoramento e Otimização da Coleta de Resíduos

Plataforma web responsiva voltada à transformação digital da zeladoria urbana e ao monitoramento em tempo real da coleta de lixo na **Rua Comendador José Gomes**, no município de **Parelhas - RN**. 

Projeto desenvolvido como requisito prático para a disciplina de **Projeto Integrador de Tecnologia da Informação II** do curso de Tecnologia da Informação (UFMS Digital).

---

## 🌐 Acesso Rápido (Sem Instalação)

Acesse a demonstração online e responsiva diretamente no seu navegador ou celular:

👉 **[Clique aqui para abrir a aplicação online](https://smocr-web-app.vercel.app/)**

---

## 🛠️ Tecnologias Utilizadas

- **React.js (v18+)**: Biblioteca para construção de interfaces orientadas a componentes.
- **Tailwind CSS**: Framework CSS de estilização utilitária via CDN.
- **Lucide React**: Biblioteca de ícones vetoriais modernos.
- **Banco de Dados (Módulo 3)**: SQL / PostgreSQL (DDL e DML normalizados).
- **Vite**: Ferramenta de build e servidor de desenvolvimento local rápido.

---

## 🛢️ Estrutura do Banco de Dados (SQL)

O projeto conta com um modelo relacional normalizado localizado na pasta `/database/schema.sql`:

- **`usuarios`**: Cadastro dos moradores.
- **`rotas_coleta`**: Ruas ativas e horários (Terças e Sextas às 07:00).
- **`lixeiras_residenciais`**: Registro do nível de ocupação da lixeira (0% a 100%).
- **`denuncias`**: Registro de ocorrências com geolocalização e status de resolução.

---

## 🚀 Funcionalidades Principais

- **Status da Coleta em Tempo Real**: Indicador visual dinâmico com barra de progresso ajustável de acordo com o nível da lixeira.
- **Contagem Regressiva Viva**: Cronômetro de precisão que calcula dias, horas, minutos e segundos restantes para a próxima coleta (**Terças e Sextas às 07:00**).
- **Personalização Dinâmica**: Edição direta do nome do morador (padrão: João) e nome da rua (padrão: Centro).
- **Ouvidoria Visual Comunitária**: Módulo em popup para registro de denúncias ambientais com suporte a upload de fotos e marcação GPS.
- **Design Responsivo**: Layout otimizado para celulares, tablets e desktops.

---

## 📁 Estrutura do Repositório

```text
SMOCR-Web-App/
├── database/
│   └── schema.sql    # Scripts DDL/DML de criação e carga do banco de dados
├── index.html        # Página principal
├── package.json      # Dependências e scripts do projeto
├── README.md         # Documentação completa
└── src/
    ├── App.jsx       # Componente React principal
    └── main.jsx      # Entrada e renderização do React

```

---

## 🔧 Como Executar o Projeto Localmente

### Pré-requisito:

Possuir o **[Node.js](https://nodejs.org/)** instalado no computador.

### Passo a Passo:

1. **Baixe o projeto:**
- [📥 Clique aqui para baixar o projeto (.ZIP)](https://github.com/lucasdev190/SMOCR-Web-App/archive/refs/heads/main.zip) e extraia o arquivo no seu computador.


2. **Acesse a pasta do projeto pelo Gerenciador de Arquivos::**

- Abra a pasta onde o projeto foi extraído (exemplo: `C:\Users\0\Downloads\SMOCR-Web-App-main\SMOCR-Web-App-main`).
- Clique no espaço em branco da **barra de endereço** no topo da janela do Windows, digite `cmd` e aperte **Enter** (o terminal abrirá apontando direto para a pasta do projeto).



3. **Instale as dependências necessárias:**
```bash
npm install react react-dom lucide-react vite @vitejs/plugin-react

```


4. **Inicie o servidor local de desenvolvimento:**
```bash
npm run dev

```


5. **Acesse no navegador:**
Abra a URL exibida no terminal (geralmente `http://localhost:5173/`).

---

## 👨‍💻 Autor

**Lucas Barros de Macedo**

Estudante de Tecnologia da Informação - UFMS Digital

Repositório Oficial: [github.com/lucasdev190/SMOCR-Web-App](https://github.com/lucasdev190/SMOCR-Web-App.git)

Local de Aplicação: Parelhas - RN

