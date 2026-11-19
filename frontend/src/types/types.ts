export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  total_copies: number;
  available_copies: number;
}

export interface Loan {
  id: number;
  book_id: number;
  member_id: number;
  loan_date: string;
  due_date: string;
  return_date: string | null;
  book_title: string;
  book_author: string;
  member_name: string;
  member_email: string;
  is_overdue: boolean;
}
