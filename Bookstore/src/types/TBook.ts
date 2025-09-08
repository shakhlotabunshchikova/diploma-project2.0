export interface BookListItem {
title: string;
subtitle?: string;
isbn13: string;
price: string;
image: string;
url:string;
}

export interface BookDetails {
  error:string;
  title:string;
  subtitle: string;
  authors:string;
  publisher: string;
  language?:string;
  isbn10:string;
  isbn13:string;
  pages:string;
  year:string;
  rating:string;
  desc:string;
  image:string;
  price:string;
  url: string;
  pdf?: Record <string, string>;
}
