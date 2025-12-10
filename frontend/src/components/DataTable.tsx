interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  data: any[];
}

export default function DataTable({ columns, data }: Props) {
  return (
    <table className="table table-bordered mt-3">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.key}>{String(row[col.key]).slice(0, 80)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
