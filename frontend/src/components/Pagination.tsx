interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, limit, total, onPageChange }: Props) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="d-flex justify-content-center mt-3 gap-3">
      <button
        className="btn btn-outline-primary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ◀ 이전
      </button>

      <span className="align-self-center fw-bold">
        {page} / {totalPages}
      </span>

      <button
        className="btn btn-outline-primary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        다음 ▶
      </button>
    </div>
  );
}
