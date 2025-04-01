## GitHub Copilot Chat

- Extension Version: 0.25.1 (prod)
- VS Code: vscode/1.98.2
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 140.82.121.6 (17 ms)
- DNS ipv6 Lookup: Error (15 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (22 ms)
- Electron fetch (configured): HTTP 200 (292 ms)
- Node.js https: HTTP 200 (199 ms)
- Node.js fetch: HTTP 200 (180 ms)
- Helix fetch: HTTP 200 (223 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.112.22 (18 ms)
- DNS ipv6 Lookup: Error (22 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (6 ms)
- Electron fetch (configured): HTTP 200 (132 ms)
- Node.js https: HTTP 200 (418 ms)
- Node.js fetch: HTTP 200 (407 ms)
- Helix fetch: HTTP 200 (404 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).