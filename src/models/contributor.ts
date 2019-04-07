export interface RawContributor {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
}

export class Contributor {
  public readonly username: string;
  public readonly avatar: string;
  public readonly url: string;
  public readonly contributions: number;

  public constructor(c: RawContributor) {
    this.username = c.login;
    this.avatar = c.avatar_url;
    this.url = c.html_url;
    this.contributions = c.contributions;
  }
}
