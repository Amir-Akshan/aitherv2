export interface DocsNavItem {
  title: string;
  href: string;
  isCategory?: boolean;
  items?: DocsNavItem[];
}
