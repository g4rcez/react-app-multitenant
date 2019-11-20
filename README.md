# react-app-multitenant

### Adicionando telas ao projeto

Em `src/model/menu.ts` basta adicionar o seguinte trecho de código:

```javascript
{
    // Definir todos os tenants que poderam acessar essa tela
    tenants: [Tenants.XPTO, Tenants.ABCD],
    // Título dá página
    title: "Dashboard",
    // Key para identificar o menu no antd
    key: "root",
    // Path para acesso através do react-router
    path: Links.root,
    // Ícone exibido no menu 
    icon: "home",
    // Todos os perfis que podem acessar essa tela
    allowedProfiles: [Profile.ADMIN, Profile.COMPANY],
    // Sub itens, caso existam
    subItems: [],
    /*
        Uma função que entrega um import dinâmico com o path para o componente
        a ser acessado na rota criada.
        profile é a string do alias de um dos perfis que podem acessar a tela
    */
    component: (profile: string) => import(`../dashboard/${profile}.page`)
}
```