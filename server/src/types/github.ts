export interface GitHubCommit {
    sha: string;
    message: string;
    url: string;
}

export interface GitHubRepo {
    id: number;
    name: string;
    url: string;
}

export interface GitHubPushEvent {
    type: string;
    repo: GitHubRepo;
    payload: {
        commits: GitHubCommit[];
    };
    created_at: string;
}
