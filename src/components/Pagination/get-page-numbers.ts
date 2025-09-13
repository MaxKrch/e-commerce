const getPageNumbers = (
    currentPage: number,
    pageCount: number,
    visiblePageArround: number
): number[] => {
    const pages = new Set<number>();

    pages.add(1);
    pages.add(pageCount);

    const start = Math.max(2, currentPage - visiblePageArround);
    const end = Math.min(pageCount - 1, currentPage + visiblePageArround);

    for (let i = start; i <= end; i++) {
        pages.add(i);
    }

    return Array.from(pages).sort((a, b) => a - b);
};

export default getPageNumbers
