# App para o InovaTech 2024 (nome a decidir)

## Descrição

Projeto dedicado a criação de um app para monitoramento, avisos, suporte a queimadas.

## Pré-requisitos

Para rodar este projeto, você precisará de:

- [Node.js](https://nodejs.org/) (versão recomendada: 14.x ou superior)
- [NPM](https://www.npmjs.com/) (instalado junto com o Node.js)
- [Android Studio](https://developer.android.com/studio) (para emular um dispositivo Android)
- [Visual Studio Code (VSCode)](https://code.visualstudio.com/)

## Passos para rodar o projeto

### 1. Instalar o Android Studio e configurar a máquina virtual

1. Baixe e instale o [Android Studio](https://developer.android.com/studio).
2. Após a instalação, abra o Android Studio.
3. Vá para a aba **"AVD Manager"** (Android Virtual Device Manager) no Android Studio.
4. Clique em **"Create Virtual Device"** para configurar um dispositivo virtual.
5. Escolha o dispositivo desejado (recomendo um com Android 10 ou superior).
6. Faça o download da imagem do sistema Android correspondente e siga as instruções de instalação.
7. Após criar o dispositivo, clique em **"Play"** para iniciar o emulador.

### 2. Configurar o Visual Studio Code (VSCode)

1. Abra o **VSCode** e navegue até o diretório do projeto.
2. Certifique-se de que o emulador Android está rodando corretamente.

### 3. Instalar as dependências do projeto

1. No terminal do VSCode, execute o seguinte comando para instalar as dependências:

   **`npm install`**

2. Caso ocorra algum erro ou dependência faltando, execute o comando forçado:

   **`npm install --force`**

3. Após todas as dependências serem instaladas, inicie o projeto com o comando:

   **`npm start `**

 
### 4. Rodar o projeto no dispositivo móvel ou emulador

Após executar o comando `npm start`, o terminal irá exibir um painel de controle do **Expo**, mostrando algumas opções para rodar o aplicativo.

#### Opções:

1. **Emulador Android (recomendado):**
   - Certifique-se de que o emulador Android já está em execução.
   - O Expo detectará automaticamente o emulador rodando e conectará o app a ele.
   

2. **Dispositivo móvel físico:**
   - Caso prefira rodar o projeto em um dispositivo real, siga estas instruções:
     - Baixe o aplicativo **Expo Go**:
       - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
       - [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)
     - Após instalar o **Expo Go** no seu celular, abra o aplicativo.
     - No terminal, um QR code será gerado. Escaneie esse QR code usando o aplicativo **Expo Go** para rodar o app diretamente no seu dispositivo móvel.

#### Observação:

- **Uso recomendado:** O ideal é utilizar o emulador Android, uma vez que proporciona um ambiente de teste mais controlado e evita possíveis problemas de compatibilidade com diferentes dispositivos móveis.
- Certifique-se de que o emulador Android ou o aplicativo **Expo Go** estão corretamente configurados antes de rodar o aplicativo.
- Se encontrar problemas com a conexão ou carregamento do app, tente reiniciar o emulador ou o Expo.

---



## Contribuição

Sinta-se à vontade para contribuir com o projeto através de pull requests ou relatando problemas.

---
