import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {

        if (parametros.id) {
            e.preventDefault();
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })
        } else {
            e.preventDefault();
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso!')
                })
        }

    }

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
            <Typography component='h1' variant='h6'>Formulario Restaurantes</Typography>
            <Box component='form' onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomeRestaurante}
                    onChange={e => setNomeRestaurante(e.target.value)}
                    id="standard-basic"
                    label="Nome do Restaurante"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 2 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante;