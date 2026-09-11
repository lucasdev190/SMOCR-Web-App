# 🚚 SMOCR - Sistema de Monitoramento e Otimização da Coleta de Resíduos

Plataforma web responsiva voltada à transformação digital da zeladoria urbana e ao monitoramento em tempo real da coleta de lixo na **Rua Comendador José Gomes**, no município de **Parelhas - RN**. 

Projeto desenvolvido como requisito prático para a disciplina de **Projeto Integrador de Tecnologia da Informação II** do curso de Tecnologia da Informação (UFMS Digital).

---

## 🛠️ Tecnologias Utilizadas

- **React.js (v18+)**: Biblioteca para construção de interfaces orientadas a componentes.
- **Tailwind CSS**: Framework CSS de estilização utilitária via CDN.
- **Lucide React**: Biblioteca de ícones vetoriais modernos.
- **Vite**: Ferramenta de build e servidor de desenvolvimento local rápido.

---

## 🚀 Funcionalidades Principais

- **Status da Coleta em Tempo Real**: Indicador visual dinâmico com barra de progresso do deslocamento do caminhão coletor.
- **Alertas de Proximidade**: Notificações sonoras configuráveis antes da chegada do veículo no trecho.
- **Ouvidoria Visual Comunitária**: Módulo em popup para registro de denúncias ambientais com suporte a upload de fotos e marcação GPS.
- **Design Responsivo**: Layout otimizado para celulares, tablets e desktops.

---

## 📁 Estrutura dos Arquivos no Repositório

```text
SMOCR-Web-App/
├── index.html        # Página principal com carregamento do Tailwind CSS
├── package.json      # Configuração de scripts e dependências do Node/Vite
├── README.md         # Documentação completa do projeto
└── src/
    ├── App.jsx       # Componente React principal do Painel do Cidadão
    └── main.jsx      # Ponto de entrada e renderização do React DOM

```

---

## 🔧 Como Executar o Projeto Localmente

### Pré-requisito:

Possuir o **[Node.js](https://nodejs.org/)** instalado no computador.

### Passo a Passo:

1. **Baixe o projeto:**
Extraia o arquivo no seu computador.
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

