# Verified Commit
> :white_check_mark: Create a _verified_ commit with GitHub Actions

 ![](https://github.com/tohgarashi/verified-commit/workflows/tests/badge.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## About
This action allows you to create a commit with GitHub Actions. Commits created with this actions will be marked as _verified_.

This repo is forked from https://github.com/swinton/commit.

![image](https://user-images.githubusercontent.com/27806/102705224-ab118f80-424a-11eb-94c5-ab7396ccba13.png)

## Usage
In your workflow, to commit a file `./myfile`, include a step like this:

```yaml
    - name: Commit file
      uses: tohgarashi/verified-commit@v2.x
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        files: |
          myfile
        commit-message: Committing ./myfile
        ref: refs/heads/my-branch
```

Note, the `GH_TOKEN` environment variable is _required_, since commits are created using GitHub's [Git Database API](https://docs.github.com/rest/reference/git).

To commit multiple files in a single commit, pass each file on a newline to the `files` input:

```yaml
    - name: Commit files
      uses: tohgarashi/verified-commit@v2.x
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        files: |
          path/to/myfile1
          path/to/myfile2
          path/to/myfile3
        commit-message: Committing files
        ref: refs/heads/my-branch
```

### detect-changed

To detect changed files automatically and commit them, set `detect-changed` input to `true`:

```yaml
    - name: Commit files
      uses: tohgarashi/verified-commit@v2.x
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        detect-changed: true
        commit-message: Committing files
        ref: refs/heads/my-branch
```

### No files

If `files` input is not set and changed files are not detected, this action do nothing.

## Inputs

- `detect-changed`: If true, this action automatically detects files that have been changed.
- `files`: Newline-separated list of files to be committed, relative to root of repository, e.g. <pre>myfile1<br>myfile2<br>...<br>myfileN</pre>
- `commit-message`: Commit message to be used, e.g. `Add ./myfile`
- `ref`: Fully qualified name of reference to be updated with commit, e.g. `refs/heads/production`. This reference _must_ already exist. Defaults to the repository's default branch ref.

## Outputs
This action provides the following outputs:

- `commit-sha`: SHA of created commit
