import { PaginationProps } from "@/types/pokeapi";


const Pagination: React.FC<PaginationProps> = ({
  paginationData,
  setPaginationData,
}) => {
  const { limit, offset, total } = paginationData;

  const handlePrevPage = () => {
    setPaginationData((prev) => ({
      ...prev,
      offset: prev.offset - prev.limit,
    }));
  };

  const handleNextPage = () => {
    setPaginationData((prev) => ({
      ...prev,
      offset: prev.offset + prev.limit,
    }));
  };

  return (
    <div>
      {offset > 0 && <button onClick={handlePrevPage}>Prev</button>}
      {offset + limit < total && <button onClick={handleNextPage}>Next</button>}
    </div>
  );
};
