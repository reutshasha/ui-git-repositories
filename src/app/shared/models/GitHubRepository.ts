export interface GitHubSearchResult {
  total_count: number;
  items: GitHubRepository[];
}

export interface GitHubRepository {
  id: number;
  name?: string;
  description?: string;
  stargazers_count?: number;
  owner?: GitHubOwner;
}

export interface GitHubOwner {
  avatar_url: string;
}

