import { useEffect, useMemo, useState } from "react";
import $ from "jquery"
import { MaterialReactTable } from "material-react-table";

const DataTableHistorial = (props) => {
    const [data,setData]=useState([])
    useEffect(()=>{
        $.ajax({
            url: "https://0kopbq8q5e.execute-api.us-east-2.amazonaws.com/getallhistorialprestamos",//URL AWS
            jsonp: "callback",
            method: 'GET',
            async: false,
            success: (response) => {
                setData(response)
                
           
            }
          })
    },[])
    const columns = useMemo(
        () => [
          {

            accessorKey: "id_prestamo", //simple recommended way to define a column
            header: "Número de préstamo",
            muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
             Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> //optional custom cell render
          },
          {

            accessorKey: "id_libro", //simple recommended way to define a column
            header: "Número del libro",
            muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
             Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> //optional custom cell render
          },
          {

           accessorKey:"titulo",
            header: "Título del libro",
            Header: <strong style={{ color: "black" }}> Título del Libro</strong> //optional custom markup
          },
          {

            accessorKey:"nombre",
             header: "Nombre del alumno",
             Header: <strong style={{ color: "black" }}>Nombre del alumno </strong>  //optional custom markup
           },
           {

             accessorKey:"apellidopaterno",
              header: "Apellido Paterno",
              Header: <strong style={{ color: "black" }}>Apellido Paterno</strong> //optional custom markup
            }
            ,
           {

             accessorKey:"apellidomaterno",
              header: "Apellido Materno",
              Header: <strong style={{ color: "black" }}>Apellido Materno</strong>//optional custom markup
            }
            ,
           {

             accessorKey:"grado",
              header: "Grado",
              Header: <strong style={{ color: "black" }}>Grado</strong> //optional custom markup
            }
            ,
            {

              accessorKey:"grupo",
               header: "Grupo",
               Header:<strong style={{ color: "black" }}>Grupo</strong> //optional custom markup
             },
             {

                accessorKey:"numero_de_telefono",
                 header: "Número de Teléfono",
                 Header:<strong style={{ color: "black" }}>Número de Teléfono</strong> //optional custom markup
               },
               {

                accessorKey:"fecha_inicio",
                 header: "Fecha Inicio ",
                 Header:<strong style={{ color: "black" }}>Fecha de Inicio</strong> //optional custom markup
               },
               {

                accessorKey:"fecha_final",
                 header: "Fecha Final",
                 Header:<strong style={{ color: "black" }}>Fecha Final</strong> //optional custom markup
               },
               {

                accessorKey:"entregado",
                 header: "Estatus",
                 Header:<strong style={{ color: "black" }}>Estatus</strong> //optional custom markup
               },
        ],
        [],
      );
  return (
    <div>
        <MaterialReactTable data={data} columns={columns}>
        </MaterialReactTable>
    </div>
  )
}

export default DataTableHistorial