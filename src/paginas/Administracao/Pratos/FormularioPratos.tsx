import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import ITags from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPratos = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState<ITags[]>([])
    const [tag, setTag] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    const selecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setImagem(e.target.files[0])
        } else {
            setImagem(null)
        }
    }

    useEffect(() => {
        http.get<{ tags: ITags[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))

    }, [])

    const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }
    return (
        <>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                            <Typography component='h1' variant='h6'>Formulario Restaurantes</Typography>
                            <Box component='form' sx={{ width: "50%" }} onSubmit={aoSubmeterForm}>
                                <TextField
                                    value={nomePrato}
                                    onChange={e => setNomePrato(e.target.value)}
                                    id="standard-basic"
                                    label="Nome do Prato"
                                    variant="standard"
                                    fullWidth
                                    required
                                    margin="dense"
                                />
                                <TextField
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                    id="standard-basic"
                                    label="Descrição do Prato"
                                    variant="standard"
                                    fullWidth
                                    required
                                    margin="dense"
                                />
                                <FormControl
                                    margin="dense"
                                    fullWidth
                                >
                                    <InputLabel id="select-tag">Tag</InputLabel>
                                    <Select labelId="select-tag" value={tag} onChange={e => setTag(e.target.value)}>
                                        {tags.map(tag =>
                                            <MenuItem value={tag.id} key={tag.id}>
                                                {tag.value}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    margin="dense"
                                    fullWidth
                                >
                                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                    <Select labelId="select-restaurante" value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                                        {restaurantes.map(restaurante =>
                                            <MenuItem value={restaurante.id} key={restaurante.id}>
                                                {restaurante.nome}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>

                                <input type="file" onChange={selecionarArquivo} />
                                <Button sx={{ marginTop: 2 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default FormularioPratos;