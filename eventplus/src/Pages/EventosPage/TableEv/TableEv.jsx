import React from "react";
import "./TableEv.css"
import editPen from "../../../Assets/images/edit-pen.svg";
import trashDelete from "../../../Assets/images/trash-delete.svg";
import { dateFormatDbToView } from "../../../Utils/stringFunctions";

const TableEv = ({ dados, fnDelete = null, fnUpdate = null }) => {
    return (
        <table className="table-data">
            {/* {cabeçalho} */}
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    {/* <th className="table-data__head-title table-data__head-title--big">
                        Instituição
                    </th> */}
                    <th className="table-data__head-title table-data__head-title--big">
                        Evento
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Descrição
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Tipo Evento
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Data
                    </th>
                    <th className="table-data__head-title table-data__head-title--little">
                        Editar
                    </th>
                    <th className="table-data__head-title table-data__head-title--little">
                        Deletar
                    </th>
                </tr>
            </thead>

            {/*Para poder listar os dados na página, é necessário dar um console.log logo depois do return na EventosPage
                para poder ver como os dados são chamados lá  no console (qual o nome que aparece lá) para só assim chamar esses */}
            <tbody>
                {dados.map((tp) => {
                    return (
                        <tr className="table-data__head-row">
                            <td className="table-data__data table-data__data--big">
                                {tp.nomeEvento}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {tp.descricao}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {tp.tiposEvento.titulo}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {dateFormatDbToView(tp.dataEvento)}
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img
                                    className="table-data__icon"
                                    src={editPen}
                                    alt=""
                                    onClick={(e) => {
                                        fnUpdate({
                                            idEvento: tp.idTipoEvento,
                                            nomeEvento: tp.nomeEvento,
                                            dataEvento: tp.dataEvento,
                                            descricao: tp.descricao,
                                            idInstituicao: tp.idInstituicao,
                                            idTipoEvento: tp.idTipoEvento,
                                        });
                                    }}
                                />
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img
                                    className="table-data__icon"
                                    src={trashDelete}
                                    alt=""
                                    onClick={() => {
                                        fnDelete(tp.idTipoEvento);
                                    }}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableEv;
