import { useMemo } from "react";

interface ISettings {
  currentPage: number;
  totalPages: number;
  siblingsCount?: number;
}

const DOTS = "...";

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }).map(
    (_, index) => index + start
  );
}

/**
 * This hook returns pagination array.
 * @param {ISettings} settings Object with properties `currentPage`, `totalPages` and optionally `siblingsCount`
 * @returns {(string|number)[]} Array of strings (for dots) or numbers (for pages)
 * @example const pagination = usePagination({ currentPage: 1, totalPages: 10, siblingsCount: 1 });
 */
export default function usePagination({
  currentPage,
  totalPages,
  siblingsCount = 1,
}: ISettings) {
  return useMemo(() => {
    const elementsCount = siblingsCount + 5;

    if (elementsCount >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
    const sideItemsCount = 3 + 2 * siblingsCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      return [...range(1, sideItemsCount), DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      return [1, DOTS, ...range(totalPages - sideItemsCount + 1, totalPages)];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      return [
        1,
        DOTS,
        ...range(leftSiblingIndex, rightSiblingIndex),
        DOTS,
        totalPages,
      ];
    }

    return [];
  }, [currentPage, totalPages, siblingsCount]);
}
