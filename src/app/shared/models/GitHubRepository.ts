export interface GitHubSearchResult {
  total_count: number;
  items: GitHubRepository[];
}

export interface GitHubRepository {
  id: number;
  name?: string;
  description?: string;
  stargazers_count?: number;
  html_url?: string;
}

