import { GitHubProvider } from "../src/github-provider";
import { PullRequest } from "../src/pull-request";
import * as core from "@actions/core";

// jest spy on to silence output
jest.spyOn(core, "info").mockImplementation(() => {});
jest.spyOn(core, "error").mockImplementation(() => {});
jest.spyOn(core, "warning").mockImplementation(() => {});
jest.spyOn(core, "debug").mockImplementation(() => {});
jest.spyOn(core, "setFailed").mockImplementation(() => {});
jest.spyOn(core, "setOutput").mockImplementation(() => {});

test("We can create a review", async () => {
  let provider = new GitHubProvider("token");
  let spy = jest.spyOn(provider, "createReview").mockImplementation(() => true);
  expect(provider.createReview()).toBe(true);

  let pullRequest = new PullRequest(provider);
  let approval = await pullRequest.approve();
  expect(approval).toStrictEqual(undefined);
});

test("We can list commits", async () => {
  let prCommits = [
    { author: { login: "robot" } },
    { author: { login: "danhoerst" } },
  ];
  let provider = new GitHubProvider("token");
  let spy = jest
    .spyOn(provider, "listPRCommits")
    .mockImplementation(() => prCommits);
  expect(provider.listPRCommits()).toBe(prCommits);

  let pullRequest = new PullRequest(provider);
  let commits = await pullRequest.listCommits();
  expect(commits).toStrictEqual(prCommits);
});

test("We can list labels", async () => {
  let prLabels = [{ name: "bug" }, { name: "feature-request" }];
  let provider = new GitHubProvider("token");
  let spy = jest
    .spyOn(provider, "listLabelsOnPR")
    .mockImplementation(() => prLabels);
  expect(provider.listLabelsOnPR()).toBe(prLabels);

  let pullRequest = new PullRequest(provider);
  let labels = await pullRequest.listLabels();
  expect(labels).toStrictEqual(prLabels);
});
