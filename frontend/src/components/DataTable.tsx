interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function DataTable({ columns, data, onRowClick }: Props) {
  return (
    <table className="table table-hover table-bordered mt-3">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            onClick={() => onRowClick?.(row)}
            style={{ cursor: onRowClick ? "pointer" : "default" }}
          >
            {columns.map(col => (
              <td key={col.key}>{String(row[col.key] ?? "").slice(0, 120)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
