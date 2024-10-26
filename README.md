## Welcome again to another TypeScript project! 👋

# AlFood Page!

## Test the project yourself: [Teste the project here!!!](https://typescript-plus-api.vercel.app/)

### Home Page

<img src="screencapture.png" alt="Imagem do Alfood" width="50%">

## Some code that I'm proud of
```js
const [pratos, setPratos] = useState<IPrato[]>([])

useEffect(() => {
    http.get<IPrato[]>('pratos/')
        .then(resposta => setPratos(resposta.data))
}, [])

const excluir = (restauranteAhSerExcluido: IPrato) => {
    http.delete(`pratos/${restauranteAhSerExcluido.id}/`)
        .then(() => {
            const listaPratos = pratos.filter(prato => prato.id !== restauranteAhSerExcluido.id)
            setPratos([...listaPratos])
        })
}
```

## Built with

- `React`
- `React Hooks`
- `TypeScript`
- `axios`

## Author

- Website - [My GitHub](https://github.com/lucasbailo)
- Frontend Mentor - [@lucasbailo](https://www.frontendmentor.io/profile/lucasbailo)
- Instagram - [@lucassbailo](https://www.instagram.com/lucassbailo/)
- LinkedIn - [Lucas Bailo](https://www.linkedin.com/in/lcsbailo)