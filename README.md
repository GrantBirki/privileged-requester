# Privileged Requester

This GitHub Action will automatically approve pull requests based off of requester criteria defined in the target repository.

## Workflow Configuration

The workflow should be configured like:

> Where `vX.X.X` is the latest release version found on the releases page

```yaml
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
    # checkout the repository
    - uses: actions/checkout@v3

    # run privileged-requester
    - uses: DanHoerst/privileged-requester@vX.X.X
```

See the example in [the workflow folder](.github/workflows/privileged-requester.yml)

## Requester Configuration

In the target repo, the privileged requester functionality should be configured like so:

```yaml
---
requesters:
  danhoerst:
    labels:
      - testing
  dependabot[bot]:
    labels:
      - dependencies
      - github_actions
```

See the example in the [config folder](config/privileged-requester.yaml).

The location of this file in the target repo should be the path used in the workflow configuration `path`

## Reviewer

This Action runs, by default, with the built-in `GITHUB_TOKEN` and so approves the PRs as the `github-actions[bot]` user.

However, you can configure the Action to run with a different repo scoped token - a bot user of your own - by defining the Workflow configuration option `robotUserToken` pointing to the repo secret for that token.

## Configuration

Here are the configuration options for this Action:

## Inputs 📥

| Input | Required? | Default | Description |
| ----- | --------- | ------- | ----------- |
| myToken | yes | ${{ github.token }} | The GitHub token used to create an authenticated client - Provided for you by default! |
| robotUserToken | no | - | An alternative robot user PAT to be used instead of the built-in Actions token |
| path | yes | config/privileged-requester.yaml | Path where the privileged requester configuration can be found |
| prCreator | yes | ${{ github.event.pull_request.user.login }} | The creator of the PR for this pull request event |
| prNumber | yes | ${{ github.event.pull_request.number }} | The number of the PR for this pull request event |

## Outputs 📤

| Output | Description |
| ------ | ----------- |
| approved | The string "true" if the privileged-requester approved the pull request |
