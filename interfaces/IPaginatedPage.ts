export default interface IPaginatedPage<T> {
  page: number;
  hasMore: boolean;
  items: T[];
}
