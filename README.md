# Avatar Test

Complete a project setup and avatar component as per the design and acceptance criteria.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To run the project you will need to have the following installed:
- NodeJS - v10
- NPM - v6
- Yarn (can use npm too but untested) - latest

### Installing

You must first install all dependencies (including development dependencies to build and run in dev mode), to do this please run `yarn`.
For production you only need to install the core dependencies, to do this please run `yarn --prod`.

## Running unit tests

To run tests all dependencies and developer dependencies must be first installed.
Following this please run `yarn test` or `yarn test:coverage` to also see the coverage.

## Deployment

Deployment should be completed through a CI/CD.
The master branch should be the source for all deployments.

For the CI/CD the following steps should be completed:
- Sonar - code quality tool
- Unit tests - minimum thresholds must be reached
- Docker image build
- Temporary instance built - this should provide a URI to run BDDs against
- BDDs
- Accessibility and UX testing
  - Linting A11y
  - Axe
  - Lighthouse
  - Jaws Inspector
- Clean up - destroy temporary instance
- Push to development URI

### Promotion / Environments

The codebase should go through multiple environments to confirm code quality and to gain sign off.
These environments are explained below:
- Dev - Instance for deploying completed code to be verifier by QE/QA
- UAT - Sign off from product owner or required approvers
- Pre-Prod - Integration with CMS copy from production. Final checks to confirm integration of codebase works as expected.
- Prod - Live instance

## Built With

* [React](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
