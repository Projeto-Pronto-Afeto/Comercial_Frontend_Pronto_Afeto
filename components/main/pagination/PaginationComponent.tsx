"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

export function PaginationComponent({
  totalPages,
  currentPage,
  domain,
}: {
  totalPages: number;
  currentPage: number;
  domain: string;
}) {
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  const search = searchParams.get("search");

  // Função para gerar a URL correta, incluindo parâmetros extras
  const generateUrl = (page: number) => {
    let url = `${domain}/?page=${page}`;
    if (status) {
      url += `&status=${status}`;
    }
    if (search) {
      url += `&search=${search}`;
    }
    return url;
  };

  // Função para renderizar os números de páginas
  const renderPaginationItems = () => {
    const pages = [];

    for (let i = 0; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            className={clsx(
              i === currentPage ? "bg-purple rounded-2xl text-white" : ""
            )}
            href={generateUrl(i)}
            isActive={i === currentPage}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  // Lógica para calcular a página anterior e próxima
  const previousPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          {/* Desabilita o botão "Voltar" na primeira página */}
          {currentPage > 1 && (
            <PaginationPrevious href={generateUrl(currentPage - 1)} />
          )}
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          {/* Desabilita o botão "Próximo" na última página */}
          {currentPage < totalPages && (
            <PaginationNext href={generateUrl(nextPage)} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
