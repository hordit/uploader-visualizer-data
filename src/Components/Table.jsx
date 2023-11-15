import { useTable } from "react-table";
import PropTypes from "prop-types";
import { StyledTable } from "./Table.styled";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column.id} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              key={row.id}
              {...row.getRowProps()}
              style={{ borderBottom: "1px solid #ddd" }}
            >
              {row.cells.map((cell) => (
                <td key={cell.id} {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
