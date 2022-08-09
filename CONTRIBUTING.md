## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide a minimal reproduction scenario using a repository or [Gist](https://gist.github.com/). Having a live, reproducible scenario gives us wealth of important information without going back & forth to you with additional questions like:

- version of NestJS or React used
- 3rd-party libraries and their versions
- and most importantly - a use-case that fails

<!--
// TODO we need to create a playground, similar to plunkr

A minimal reproduce scenario using a repository or Gist allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem. If neither of these are not a suitable way to demonstrate the problem (for example for issues related to our npm packaging), please create a standalone git repository demonstrating the problem. -->

<!-- We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal plunk. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it. -->

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that doesn't have enough info to be reproduced.

You can new issue.

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

<!--
To the first point

1. Please sign our [Contributor License Agreement (CLA)](#cla) before sending PRs.
We cannot accept code without this.
-->

1. Fork this repository.
1. Make your changes in a new git branch:

   ```shell
   git checkout -b my-fix-branch master
   ```

1. Create your patch, **including appropriate test cases**.
1. Follow our [Coding Rules](#rules).
1. Run the full test suite,
   and ensure that all tests pass.
1. Commit your changes using a descriptive commit message.

   ```shell
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

   ```shell
   git push origin my-fix-branch
   ```

1. In GitHub, send a pull request to `Kalian:main`.

- If we suggest changes then:

  - Make the required updates.
  - Re-run the Nest test suites to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase main -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Check out the main branch:

  ```shell
  git checkout main -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

- Update your master with the latest upstream version:

  ```shell
  git pull --ff upstream main
  ```
  
  ## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

<!--
// We're working on auto-documentation.
* All public API methods **must be documented**. (Details TBC). -->

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- We follow [Google's JavaScript Style Guide][js-style-guide], but wrap all code at
  **100 characters**.
