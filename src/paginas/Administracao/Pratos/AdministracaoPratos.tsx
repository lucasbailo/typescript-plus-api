import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {


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

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Deletar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => <TableRow key={prato.id}>
                        <TableCell>
                            {prato.nome}
                        </TableCell>
                        <TableCell>
                            {prato.tag}
                        </TableCell>
                        <TableCell>
                            <a href={prato.imagem} target="_blank" rel="noreferrer">Abrir Imagem</a>
                        </TableCell>
                        <TableCell>
                            [ <RouterLink to={`/admin/pratos/${prato.id}`}>editar</RouterLink> ]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(prato)}> Excluir </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPratos;