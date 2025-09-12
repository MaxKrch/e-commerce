const getPageNumbers = (
    currentPage: number,
    pageCount: number,
    countLinks: number
): number[] => {
    const pages = new Set<number>();

    pages.add(1);
    pages.add(pageCount);

    const start = Math.max(2, currentPage - countLinks);
    const end = Math.min(pageCount - 1, currentPage + countLinks);

    for (let i = start; i <= end; i++) {
        pages.add(i);
    }

    return Array.from(pages).sort((a, b) => a - b);
};

export default getPageNumbers
