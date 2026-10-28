# Site Mayki Hashimoto

Site estático em HTML, CSS e JavaScript puro, mobile first, pronto para a Vercel.

## Estrutura

```
index.html                  Home (foco em criação de sites)
social-media.html           Social Mídia Estratégico
criacao-de-sites.html       Criação de Sites
edicao-de-video.html        Edição de Vídeo
copywriting.html            Copywriting
design-grafico.html         Design Gráfico
filmmaker-fotografia.html   Filmmaker e Fotografia
404.html                    Página não encontrada
css/style.css               Todos os estilos (tokens no topo)
js/main.js                  Menu, formulário → WhatsApp, FAQ, ajuste do nome no hero
assets/                     Ícones (favicon, app) e imagem de compartilhamento (og-image.jpg)
assets/img/                 Foto do Mayki (sem fundo) e logo MH Gestor (símbolo e completa)
sitemap.xml, robots.txt     SEO
site.webmanifest            Ícone ao salvar na tela inicial
vercel.json                 URLs limpas (/social-media), cache e cabeçalhos de segurança
```

## Antes de publicar

1. **Foto**: `assets/img/mayki-hashimoto.png` (PNG sem fundo). Para trocar, mantenha o mesmo nome.
2. **Instagram**: em `js/main.js`, troque `instagram: "https://www.instagram.com/"`
   pelo endereço do perfil. O WhatsApp também é configurado ali.

## Publicar na Vercel

1. Suba a pasta para um repositório no GitHub (ou arraste a pasta em vercel.com/new).
2. Framework preset: **Other**. Sem comando de build. Output: raiz do projeto.
3. Em *Settings → Domains*, adicione `www.maykihashimoto.com.br` e `maykihashimoto.com.br`.

Para testar no computador com as URLs limpas: `npx serve .` dentro da pasta.

## SEO incluído

- Título, descrição e palavras-chave únicos por página
- URL canônica, Open Graph e Twitter Card com imagem 1200 × 630
- Dados estruturados (JSON-LD): Person, ProfessionalService, Service, FAQPage e BreadcrumbList
- `sitemap.xml` e `robots.txt`
- HTML semântico, um H1 por página, textos alternativos e região MT

Depois de publicar, cadastre o domínio no **Google Search Console**, envie
`https://www.maykihashimoto.com.br/sitemap.xml` e crie/vincule o **Perfil da Empresa no Google**
com o mesmo nome, telefone e site. Isso é o que mais ajuda a aparecer em buscas locais.

Se o domínio for outro, troque `https://www.maykihashimoto.com.br` em todos os HTML, no `sitemap.xml` e no `robots.txt`.
